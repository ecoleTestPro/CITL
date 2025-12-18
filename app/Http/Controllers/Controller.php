<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    /**
     * Return a JSON response with consistent format
     */
    protected function json(string $message, ?array $data = null, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => $statusCode >= 200 && $statusCode < 300,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}
