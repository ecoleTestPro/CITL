<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'organization',
        'description',
        'start_date',
        'end_date',
        'location',
        'tags',
        'is_active',
    ];

    protected $casts = [
        'tags' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get the period formatted string
     */
    public function getPeriodAttribute(): string
    {
        if ($this->end_date) {
            return $this->start_date->format('M Y').' - '.$this->end_date->format('M Y');
        }

        return $this->start_date->format('M Y').' - Present';
    }
}
