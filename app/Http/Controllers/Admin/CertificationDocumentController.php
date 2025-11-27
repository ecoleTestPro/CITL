<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Certificate\CertificationDocumentRepository;
use App\Repositories\Certificate\CertificationDocumentTagRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CertificationDocumentController extends Controller
{
    public function __construct(
        private CertificationDocumentRepository $documentRepository,
        private CertificationDocumentTagRepository $tagRepository
    ) {}

    /**
     * Upload documents for a certification
     */
    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10240', // 10MB max
            'certification_id' => 'nullable|exists:certifications,id',
        ]);

        $uploadedDocuments = [];

        foreach ($request->file('files') as $file) {
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $filename = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '_' . time() . '_' . Str::random(8) . '.' . $extension;

            // Store file in storage/app/public/certifications/documents
            $path = $file->storeAs('certifications/documents', $filename, 'public');

            $document = $this->documentRepository->createDocument([
                'certification_id' => $request->certification_id ?? null,
                'name' => $originalName,
                'file_path' => $path,
                'file_type' => $extension,
                'file_size' => $file->getSize(),
                'order' => 0,
                'is_active' => true,
            ]);

            $uploadedDocuments[] = $document->load('tags');
        }

        return $this->json('Documents uploaded successfully', ['documents' => $uploadedDocuments], 200);
    }

    /**
     * Get all documents for a certification
     */
    public function index(Request $request, int $certificationId)
    {
        $documents = $this->documentRepository->getByCertificationId($certificationId);
        return $this->json('Documents retrieved successfully', ['documents' => $documents], 200);
    }

    /**
     * Delete a document
     */
    public function delete(int $id)
    {
        $document = $this->documentRepository->find($id);

        if (!$document) {
            return $this->json('Document not found', [], 404);
        }

        // Delete file from storage
        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $this->documentRepository->delete($id);

        return $this->json('Document deleted successfully', [], 200);
    }

    /**
     * Attach tags to a document
     */
    public function attachTags(Request $request, int $documentId)
    {
        $request->validate([
            'tag_id' => 'required|exists:certification_document_tags,id',
        ]);

        $document = $this->documentRepository->attachTags($documentId, [$request->tag_id]);

        if (!$document) {
            return $this->json('Document not found', [], 404);
        }

        $tag = $this->tagRepository->find($request->tag_id);

        return $this->json('Tag attached successfully', ['tag' => $tag], 200);
    }

    /**
     * Detach a tag from a document
     */
    public function detachTag(Request $request, int $documentId)
    {
        $request->validate([
            'tag_id' => 'required|exists:certification_document_tags,id',
        ]);

        $document = $this->documentRepository->detachTag($documentId, $request->tag_id);

        if (!$document) {
            return $this->json('Document not found', [], 404);
        }

        return $this->json('Tag detached successfully', [], 200);
    }

    /**
     * Get all available tags
     */
    public function getTags()
    {
        $tags = $this->tagRepository->getAllActive();
        return $this->json('Tags retrieved successfully', ['tags' => $tags], 200);
    }

    /**
     * Create a new tag
     */
    public function createTag(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:certification_document_tags,name',
        ]);

        $tag = $this->tagRepository->createTag([
            'name' => $request->name,
            'order' => 0,
        ]);

        return $this->json('Tag created successfully', ['tag' => $tag], 201);
    }
}
