<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccreditationRequest extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_name',
        'email',
        'phone',
        'city',
        'company_address',
        'contact_person',
        'website',
        'years_in_business',
        'number_of_trainers',
        'training_facilities',
        'additional_info',
        'status',
    ];

    protected $casts = [
        'years_in_business' => 'integer',
        'number_of_trainers' => 'integer',
    ];
}
