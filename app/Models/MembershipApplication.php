<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'membership_type',
        'first_name',
        'surname',
        'phone',
        'email',
        'address',
        'company',
        'job_title',
        'years_of_experience',
        'membership_level',
        'qualification',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
