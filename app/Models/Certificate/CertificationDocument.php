<?php

namespace App\Models\Certificate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertificationDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'certification_id',
        'name',
        'file_path',
        'file_type',
        'file_size',
        'order',
        'is_active',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the certification that owns the document.
     */
    public function certification(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Certificate\Certification::class);
    }

    /**
     * Get the tags for the document.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(
            CertificationDocumentTag::class,
            'certification_document_tag',
            'certification_document_id',
            'certification_document_tag_id'
        )->withTimestamps();
    }
}
