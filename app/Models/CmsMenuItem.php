<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsMenuItem extends Model
{
    protected $fillable = [
        'menu_id',
        'parent_id',
        'title',
        'url',
        'page_id',
        'target',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function menu()
    {
        return $this->belongsTo(CmsMenu::class, 'menu_id');
    }

    public function parent()
    {
        return $this->belongsTo(CmsMenuItem::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(CmsMenuItem::class, 'parent_id')->orderBy('order');
    }

    public function page()
    {
        return $this->belongsTo(CmsPage::class, 'page_id');
    }

    public function getFullUrlAttribute()
    {
        if ($this->url) {
            return $this->url;
        }

        if ($this->page) {
            return '/' . $this->page->slug;
        }

        return null;
    }
}
