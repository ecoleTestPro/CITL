<?php

namespace App\Models\Certification;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertificationCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name_fr',
        'name_en',
        'slug',
        'key',
        'description_fr',
        'description_en',
        'order',
        'is_active',
        'can_delete',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'can_delete' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = [
        'name',
        'description',
    ];

    /**
     * Accessor for backward compatibility - returns name_fr by default.
     */
    public function getNameAttribute(): string
    {
        return $this->name_fr ?? '';
    }

    /**
     * Accessor for backward compatibility - returns description_fr by default.
     */
    public function getDescriptionAttribute(): ?string
    {
        return $this->description_fr;
    }

    /**
     * Get the certifications for this category.
     */
    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class)->orderBy('order');
    }

    /**
     * Get active certifications for this category.
     */
    public function activeCertifications(): HasMany
    {
        return $this->hasMany(Certification::class)->where('is_active', true)->orderBy('order');
    }
}
