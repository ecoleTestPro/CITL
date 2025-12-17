<?php

namespace App\Models\Certification;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Certification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'certification_category_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'overview',
        'target_audience',
        'training_content',
        'exam_structure_details',
        'business_outcomes',
        'additional_information',
        'icon',
        'exam_questions',
        'exam_passing_score',
        'exam_total_points',
        'exam_duration',
        'syllabus_url',
        'syllabus_file',
        'image',
        'featured_image',
        'order',
        'is_active',
        'can_delete',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'can_delete' => 'boolean',
        'order' => 'integer',
        'exam_questions' => 'integer',
        'exam_passing_score' => 'integer',
        'exam_total_points' => 'integer',
    ];

    /**
     * Get the category that owns the certification.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(CertificationCategory::class, 'certification_category_id');
    }

    /**
     * Get exam info as array.
     */
    public function getExamInfoAttribute(): array
    {
        return [
            'questions' => $this->exam_questions,
            'passingScore' => $this->exam_passing_score,
            'totalPoints' => $this->exam_total_points,
            'duration' => $this->exam_duration,
        ];
    }
}
