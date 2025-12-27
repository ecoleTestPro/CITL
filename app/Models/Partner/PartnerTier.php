<?php

namespace App\Models\Partner;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class PartnerTier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_en',
        'slug',
        'color',
        'icon',
        'description',
        'description_en',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tier) {
            if (empty($tier->slug)) {
                $tier->slug = Str::slug($tier->name);
            }
        });
    }

    public function partners(): HasMany
    {
        return $this->hasMany(Partner::class);
    }

    public function activePartners(): HasMany
    {
        return $this->hasMany(Partner::class)
            ->where('is_active', true)
            ->orderBy('name');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getLocalizedNameAttribute(): string
    {
        $locale = app()->getLocale();
        if ($locale === 'en' && $this->name_en) {
            return $this->name_en;
        }
        return $this->name;
    }

    public function getLocalizedDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();
        if ($locale === 'en' && $this->description_en) {
            return $this->description_en;
        }
        return $this->description;
    }
}
