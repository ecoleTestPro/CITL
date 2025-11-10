<?php

namespace App\Models;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class CmsPage extends Model
{
    use SoftDeletes, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'status',
        'seo_title',
        'seo_description',
        'featured_image',
        'created_by',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
