<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_type',
        'exam_name',
        'first_name',
        'last_name',
        'job_title',
        'company',
        'phone',
        'email',
        'address_line1',
        'address_line2',
        'city',
        'postal_code',
        'exam_format',
        'register_in_registry',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
