<?php

namespace App\Repositories\Certificate;

use App\Models\Certificate\CertificationDocument;
use App\Repositories\BaseRepository;

class CertificationDocumentRepository extends BaseRepository
{
    public function __construct(CertificationDocument $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all documents for a certification
     */
    public function getByCertificationId(int $certificationId)
    {
        return $this->model
            ->where('certification_id', $certificationId)
            ->where('is_active', true)
            ->with('tags')
            ->orderBy('order')
            ->get();
    }

    /**
     * Create a new document
     */
    public function createDocument(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Attach tags to a document
     */
    public function attachTags(int $documentId, array $tagIds)
    {
        $document = $this->find($documentId);
        if ($document) {
            $document->tags()->syncWithoutDetaching($tagIds);

            return $document->load('tags');
        }

        return null;
    }

    /**
     * Detach a tag from a document
     */
    public function detachTag(int $documentId, int $tagId)
    {
        $document = $this->find($documentId);
        if ($document) {
            $document->tags()->detach($tagId);

            return $document->load('tags');
        }

        return null;
    }
}
