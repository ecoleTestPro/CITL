<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslationController extends Controller
{
    /**
     * Translate text using Google Translate (free tier)
     */
    public function translate(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'from' => 'required|string|in:fr,en',
            'to' => 'required|string|in:fr,en',
        ]);

        if ($validated['from'] === $validated['to']) {
            return response()->json([
                'success' => true,
                'translation' => $validated['text'],
            ]);
        }

        if (empty(trim($validated['text']))) {
            return response()->json([
                'success' => true,
                'translation' => '',
            ]);
        }

        try {
            $translation = $this->translateWithGoogle($validated['text'], $validated['from'], $validated['to']);

            return response()->json([
                'success' => true,
                'translation' => $translation,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Translation error: '.$e->getMessage(),
                'translation' => $validated['text'],
            ], 500);
        }
    }

    /**
     * Translate multiple fields at once
     */
    public function translateMultiple(Request $request)
    {
        $validated = $request->validate([
            'fields' => 'required|array',
            'fields.*' => 'nullable|string',
            'from' => 'required|string|in:fr,en',
            'to' => 'required|string|in:fr,en',
        ]);

        if ($validated['from'] === $validated['to']) {
            return response()->json([
                'success' => true,
                'translations' => $validated['fields'],
            ]);
        }

        $translations = [];

        foreach ($validated['fields'] as $key => $text) {
            if (empty(trim($text ?? ''))) {
                $translations[$key] = '';

                continue;
            }

            try {
                $translations[$key] = $this->translateWithGoogle($text, $validated['from'], $validated['to']);
            } catch (\Exception $e) {
                $translations[$key] = $text; // Fallback to original on error
            }
        }

        return response()->json([
            'success' => true,
            'translations' => $translations,
        ]);
    }

    /**
     * Translate text using Google Translate free API
     */
    private function translateWithGoogle(string $text, string $from, string $to): string
    {
        $url = 'https://translate.googleapis.com/translate_a/single';

        $response = Http::timeout(30)
            ->withOptions([
                'verify' => false,
            ])
            ->get($url, [
                'client' => 'gtx',
                'sl' => $from,
                'tl' => $to,
                'dt' => 't',
                'q' => $text,
            ]);

        if ($response->successful()) {
            $data = $response->json();

            // Google Translate returns nested arrays like [[["translated text","original text",null,null,10]],null,"fr",...]
            if (is_array($data) && isset($data[0])) {
                $translatedParts = [];
                foreach ($data[0] as $part) {
                    if (isset($part[0])) {
                        $translatedParts[] = $part[0];
                    }
                }

                return implode('', $translatedParts);
            }
        }

        throw new \Exception('Google Translate API error');
    }
}
