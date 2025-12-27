<?php

namespace App\Models\Partner;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'partner_tier_id',
        'name',
        'slug',
        'logo',
        'website',
        'description',
        'description_en',
        'is_active',
        'partnership_start_date',
        'partnership_end_date',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'partnership_start_date' => 'date',
        'partnership_end_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($partner) {
            if (empty($partner->slug)) {
                $partner->slug = Str::slug($partner->name);
            }
        });
    }

    public function tier(): BelongsTo
    {
        return $this->belongsTo(PartnerTier::class, 'partner_tier_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByTier($query, $tierSlug)
    {
        return $query->whereHas('tier', function ($q) use ($tierSlug) {
            $q->where('slug', $tierSlug);
        });
    }

    public function getLocalizedDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();
        if ($locale === 'en' && $this->description_en) {
            return $this->description_en;
        }
        return $this->description;
    }

    public function getLogoUrlAttribute(): ?string
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        return null;
    }

    public function isPartnershipActive(): bool
    {
        $now = now();

        if ($this->partnership_start_date && $now->lt($this->partnership_start_date)) {
            return false;
        }

        if ($this->partnership_end_date && $now->gt($this->partnership_end_date)) {
            return false;
        }

        return $this->is_active;
    }
}
