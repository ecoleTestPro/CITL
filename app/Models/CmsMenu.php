<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsMenu extends Model
{
    protected $fillable = ['name', 'location', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
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
