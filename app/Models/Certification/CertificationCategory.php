<?php

namespace App\Models\Certification;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertificationCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'key',
        'description',
        'order',
        'is_active',
        'can_delete',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'can_delete' => 'boolean',
        'order' => 'integer',
    ];

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
