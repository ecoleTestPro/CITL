<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsMenu extends Model
{
    protected $fillable = [
        'name',
        'location',
        'is_active',
        'style_template',
        'is_sticky',
        'style_config',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_sticky' => 'boolean',
        'style_config' => 'array',
    ];

    public function items()
    {
        return $this->hasMany(CmsMenuItem::class, 'menu_id')
            ->whereNull('parent_id')
            ->orderBy('order');
    }

    public function allItems()
    {
        return $this->hasMany(CmsMenuItem::class, 'menu_id')->orderBy('order');
    }
}
