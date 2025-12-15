<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Glossary extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'term_en',
        'term_fr',
        'definition_en',
        'definition_fr',
        'category',
        'letter',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
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
     * Get term based on locale
     */
    public function getTerm(string $locale = 'fr'): string
    {
        return $locale === 'en' ? $this->term_en : $this->term_fr;
    }

    /**
     * Get definition based on locale
     */
    public function getDefinition(string $locale = 'fr'): string
    {
        return $locale === 'en' ? $this->definition_en : $this->definition_fr;
    }
}
