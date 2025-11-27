<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Glossary extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'term',
        'definition',
        'category',
        'letter',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope to filter by letter
     */
    public function scopeByLetter($query, $letter)
    {
        return $query->where('letter', strtoupper($letter));
    }

    /**
     * Scope to filter active glossaries
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by custom order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('term');
    }
}
