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
        'is_homepage',
        'page_type',
        'seo_title',
        'seo_description',
        'featured_image',
        'created_by',
    ];

    protected $casts = [
        'content' => 'array',
        'is_homepage' => 'boolean',
    ];

    // Page types constants
    public const TYPE_CUSTOM = 'custom';
    public const TYPE_HOME = 'home';
    public const TYPE_CONTACT = 'contact';
    public const TYPE_ABOUT = 'about';
    public const TYPE_TERMS = 'terms';
    public const TYPE_PRIVACY = 'privacy';

    public static function pageTypes(): array
    {
        return [
            self::TYPE_CUSTOM => 'Page personnalisée',
            self::TYPE_HOME => 'Page d\'accueil',
            self::TYPE_CONTACT => 'Contact',
            self::TYPE_ABOUT => 'À propos',
            self::TYPE_TERMS => 'Conditions d\'utilisation',
            self::TYPE_PRIVACY => 'Politique de confidentialité',
        ];
    }

    // Scope to get homepage
    public function scopeHomepage($query)
    {
        return $query->where('is_homepage', true)->where('status', 'published');
    }

    // Scope to get by type
    public function scopeByType($query, string $type)
    {
        return $query->where('page_type', $type);
    }

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
