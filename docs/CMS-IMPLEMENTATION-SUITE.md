# 🚀 CMS Custom - Suite de l'implémentation

## ✅ Ce qui est déjà fait

1. **Filament désinstallé** complètement
2. **Packages Spatie installés** :
   - `spatie/laravel-sluggable` (auto-génération de slugs)
   - `spatie/laravel-medialibrary` (gestion d'images)
3. **Migrations créées et exécutées** :
   - `cms_pages` - Pages avec contenu JSON Editor.js
   - `cms_menus` - Menus (header, footer)
   - `cms_menu_items` - Items de menu avec hiérarchie

## 📋 Ce qu'il reste à faire

### 1. Créer les Modèles (10 min)

```bash
php artisan make:model CmsPage
php artisan make:model CmsMenu
php artisan make:model CmsMenuItem
```

**app/Models/CmsPage.php** :
```php
<?php

namespace App\Models;

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
```

**app/Models/CmsMenu.php** :
```php
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
```

**app/Models/CmsMenuItem.php** :
```php
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
```

### 2. Créer les Controllers (15 min)

```bash
php artisan make:controller CmsPageController --resource
php artisan make:controller CmsMenuController --resource
```

**app/Http/Controllers/CmsPageController.php** :
```php
<?php

namespace App\Http\Controllers;

use App\Models\CmsPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsPageController extends Controller
{
    public function index()
    {
        $pages = CmsPage::with('creator')
            ->latest()
            ->paginate(15);

        return Inertia::render('cms/pages/index', [
            'pages' => $pages,
        ]);
    }

    public function create()
    {
        return Inertia::render('cms/pages/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|array',
            'status' => 'required|in:draft,published',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $validated['created_by'] = auth()->id();

        $page = CmsPage::create($validated);

        return redirect()->route('cms.pages.edit', $page)
            ->with('success', 'Page créée avec succès');
    }

    public function edit(CmsPage $page)
    {
        return Inertia::render('cms/pages/edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, CmsPage $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|array',
            'status' => 'required|in:draft,published',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $page->update($validated);

        return back()->with('success', 'Page mise à jour');
    }

    public function destroy(CmsPage $page)
    {
        $page->delete();

        return redirect()->route('cms.pages.index')
            ->with('success', 'Page supprimée');
    }

    // Public view
    public function show($slug)
    {
        $page = CmsPage::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('cms/page-view', [
            'page' => $page,
        ]);
    }
}
```

### 3. Ajouter les Routes (5 min)

**routes/web.php** :
```php
use App\Http\Controllers\CmsPageController;
use App\Http\Controllers\CmsMenuController;

Route::middleware(['auth', 'verified'])->prefix('cms')->name('cms.')->group(function () {
    Route::resource('pages', CmsPageController::class);
    Route::resource('menus', CmsMenuController::class);
});

// Public page view (must be last)
Route::get('{slug}', [CmsPageController::class, 'show'])
    ->where('slug', '^(?!admin|dashboard|login|register|forgot-password|reset-password|settings|cms).*$')
    ->name('page.show');
```

### 4. Installer Editor.js (10 min)

```bash
npm install @editorjs/editorjs @editorjs/header @editorjs/list @editorjs/image @editorjs/paragraph
```

### 5. Créer les Pages React (30 min)

**resources/js/pages/cms/pages/index.tsx** :
```tsx
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Index({ pages }) {
    return (
        <AppLayout>
            <Head title="Pages CMS" />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Pages</h1>
                    <Link
                        href="/cms/pages/create"
                        className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                    >
                        Nouvelle page
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Titre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {pages.data.map((page) => (
                                <tr key={page.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {page.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {page.slug}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                page.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <Link
                                            href={`/cms/pages/${page.id}/edit`}
                                            className="text-orange-600 hover:text-orange-900"
                                        >
                                            Éditer
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
```

### 6. Mettre à jour le Sidebar (2 min)

**resources/js/components/app-sidebar.tsx** - déjà fait, juste changer les liens :
```tsx
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Pages',
        href: '/cms/pages', // ← Changer ici
        icon: FileText,
    },
    {
        title: 'Menus',
        href: '/cms/menus', // ← Changer ici
        icon: MenuIcon,
    },
];
```

## 🎯 Prochaines étapes

Voulez-vous que je continue l'implémentation ou préférez-vous :
1. Que je crée les fichiers manquants un par un
2. Que je vous donne un script bash complet pour tout générer
3. Autre chose ?

Le CMS est à 40% ! Il reste principalement le frontend React + Editor.js.
