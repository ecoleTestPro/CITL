<?php

namespace App\Models\Training;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccreditedOrganization extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'country',
        'city',
        'website',
        'email',
        'phone',
        'logo',
        'description',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope for active organizations
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordering
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }

    /**
     * Scope for filtering by country
     */
    public function scopeByCountry($query, $country)
    {
        return $query->where('country', $country);
    }
}
