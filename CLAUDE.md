# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Learning Management System (LMS) built with Laravel 12, React 19, and TypeScript. The system provides comprehensive course management, user authentication with 2FA, assessments, certificates, blog functionality, and a CMS with visual page builder.

**Core Stack:**
- Backend: Laravel 12 (PHP 8.2+) with Inertia.js
- Frontend: React 19 + TypeScript (strict mode)
- Styling: Tailwind CSS v4 with Radix UI components
- Database: MySQL/SQLite with Eloquent ORM
- Authentication: Laravel Fortify with 2FA support
- Testing: Pest PHP
- Build: Vite with React Compiler and optional SSR

## Essential Commands

### Initial Setup
```bash
# Complete setup: installs dependencies, creates .env, generates key, migrates DB, builds assets
composer run setup
```

### Development
```bash
# Start all services (PHP server:8000, queue worker, Laravel Pail logs, Vite dev server)
composer run dev

# With Server-Side Rendering
composer run dev:ssr
```

### Testing
```bash
# Run all tests (uses SQLite in-memory)
composer run test
./vendor/bin/pest

# Run specific test
./vendor/bin/pest --filter AuthenticationTest

# With coverage
./vendor/bin/pest --coverage
```

### Code Quality
```bash
# PHP (Laravel Pint - PSR-12)
vendor/bin/pint              # Auto-fix
vendor/bin/pint --test       # Check only

# JavaScript/TypeScript
npm run lint                 # ESLint with auto-fix
npm run format               # Prettier format
npm run format:check         # Check formatting
npm run types                # TypeScript type check
```

### Database
```bash
php artisan migrate
php artisan migrate:fresh
php artisan migrate:fresh --seed
./reset-database.sh          # Custom reset script
```

### TypeScript Routes Generation
```bash
# MUST run after any route changes to regenerate typed routes
php artisan wayfinder:generate
```

### Production Build
```bash
npm run build                          # Standard build
npm run build:ssr                      # With SSR
composer install --optimize-autoloader --no-dev
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Architecture Overview

### Repository Pattern (Critical)

**All database access must go through repositories** - controllers never query models directly.

```
app/Repositories/
├── BaseRepository.php              # Abstract base with CRUD operations
├── BaseRepositoryInterface.php
└── [Module]/                       # User/, Course/, Assessment/, etc.
```

**Base Repository Methods:**
- `all()` - Get all records
- `find($id)` - Find by ID
- `create(array $data)` - Create record
- `update($id, array $data)` - Update record
- `delete($id)` - Delete record
- `findBy(array $criteria)` - Find by criteria
- `paginate($perPage = 15)` - Paginated results

**Controller Example:**
```php
public function index(CourseRepository $courseRepo)
{
    $courses = $courseRepo->all();
    return $this->json('Courses found', ['courses' => $courses], 200);
}
```

### Module Organization

The application is organized by business domains:

```
app/
├── Models/
│   ├── User/          # User, Instructor, Education, Experience
│   ├── Course/        # Course, Chapter, Content, Category, Review, Enrollment
│   ├── Assessment/    # Exam, Quiz, Question, Answer, ExamSession, QuizSession
│   ├── Certificate/   # ManageCertificate
│   ├── Blog/          # Blog models
│   └── Cms*.php       # CmsPage, CmsMenu, CmsMenuItem
├── Repositories/      # Mirrors model structure by module
├── Http/
│   ├── Controllers/   # Organized by module + MasterController
│   └── Resources/     # API resource transformers
```

### Frontend Architecture

```
resources/js/
├── app.tsx                    # Inertia app entry point
├── ssr.tsx                    # SSR entry (optional)
├── pages/                     # Inertia pages (route-based)
│   ├── auth/                  # Login, register, 2FA, password flows
│   ├── settings/              # Profile, appearance, 2FA, password
│   ├── cms/                   # CMS management (pages + menus)
│   │   ├── pages/            # Page CRUD + visual builder
│   │   └── menus/            # Menu management with drag-and-drop
│   ├── dashboard.tsx
│   └── home.tsx
├── layouts/                   # Layout components
│   ├── app/                   # Authenticated app layout
│   ├── auth/                  # Auth pages layout
│   ├── settings/              # Settings pages layout
│   └── public-layout.tsx
├── components/
│   ├── ui/                    # Radix UI components (shadcn pattern)
│   ├── cms/                   # CMS-specific components
│   ├── page-builder/          # Craft.js page builder components
│   └── frontend/              # Public-facing components
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript definitions
└── routes/                    # Auto-generated typed routes (Wayfinder)
```

### TypeScript Routes (Laravel Wayfinder)

Routes are **type-safe and auto-generated**. After modifying Laravel routes:
```bash
php artisan wayfinder:generate
```

**Usage Pattern:**
```tsx
import { login, dashboard, cms } from '@/routes';
import { Link } from '@inertiajs/react';

// Simple routes
<Link href={login().url}>Login</Link>

// With parameters
<Link href={cms.pages.show({ page: 123 }).url}>View Page</Link>

// With query params
<Link href={dashboard({ filter: 'active' }).url}>Dashboard</Link>
```

### MasterController Pattern

`MasterController` provides global application configuration via JSON API. It aggregates settings, social media, payment gateways, instructors, and other app-wide data for frontend consumption.

### CMS System

**Components:**
- `CmsPage` - Dynamic pages with slug routing, homepage designation, visual builder
- `CmsMenu` - Hierarchical navigation menus
- `CmsMenuItem` - Menu items with drag-and-drop ordering (`@minoru/react-dnd-treeview`)

**Key Features:**
- Visual page builder using Craft.js (`@craftjs/core`)
- Dynamic homepage via `CmsPageController::setAsHomepage()`
- Public page routing via catch-all route (must be registered last in `routes/web.php`)

**Route Structure:**
```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('cms')->name('cms.')->group(function () {
        Route::resource('pages', CmsPageController::class);
        Route::post('pages/{page}/set-homepage', [CmsPageController::class, 'setAsHomepage']);
        Route::resource('menus', CmsMenuController::class);
    });
});

// Catch-all MUST be last to avoid conflicts
Route::get('{slug}', [CmsPageController::class, 'show'])
    ->where('slug', '^(?!admin|dashboard|login|register|...).*$')
    ->name('page.show');
```

### Authentication Flow

Laravel Fortify handles auth with 2FA:
- Login/Register: `resources/js/pages/auth/`
- Two-Factor: QR codes + recovery codes
- Email verification
- Password reset
- Settings: `resources/js/pages/settings/` (profile, password, 2FA, appearance)

## Key Technical Features

### React Compiler
Vite configured with `babel-plugin-react-compiler` for automatic memoization. Manual `useMemo`/`useCallback` often unnecessary.

### Server-Side Rendering (Optional)
- Entry: `resources/js/ssr.tsx`
- Build: `npm run build:ssr`
- Start: `composer run dev:ssr` or `php artisan inertia:start-ssr`
- Enable: Set `INERTIA_SSR_ENABLED=true` in `.env`

### Media Management
Spatie Media Library integrated for file uploads and media handling.

### Slugs
Spatie Laravel Sluggable provides automatic slug generation for models.

## Code Conventions

### PHP
- **PSR-12** compliance (enforced by Laravel Pint)
- **Type hints** and **return types** required
- **DocBlocks** for public methods
- **Repository pattern** mandatory - no direct model queries in controllers
- **Resource classes** for API responses

### TypeScript
- **Strict mode** enabled
- **Interfaces** for all component props
- **No `any`** unless justified
- Use **typed routes** from `@/routes`
- **Functional components** with hooks

### Naming Conventions
- Controllers: `PascalCase` with `Controller` suffix
- Models: Organized in module folders (`Models/User/Instructor.php`)
- React components: `PascalCase` (`.tsx`)
- Directories: `kebab-case` for frontend, `PascalCase` for backend modules
- Routes: Generated TypeScript routes use camelCase

### Commit Messages
Format: `type: description` (English)

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Development Workflow

### Branch Strategy
- `main` - Production
- `develop` - Development (PR target)
- `feature/*` - Feature branches

### CI/CD (GitHub Actions)
Workflows in `.github/workflows/`:
- **linter.yml** - Laravel Pint, Prettier, ESLint (on `main`/`develop`)
- **tests.yml** - Dependencies, asset build, Pest tests (PHP 8.4 + Node 22)

### After Route Changes
Always regenerate TypeScript routes:
```bash
php artisan wayfinder:generate
```

### Concurrent Development Server
`composer run dev` uses `concurrently` to run 4 processes:
1. PHP server (port 8000)
2. Queue worker
3. Laravel Pail (logs)
4. Vite dev server

Stop all with `Ctrl+C`.

## Important Notes

### AGENTS.md File
The `AGENTS.md` file contains **Next.js rules** which are **NOT applicable** to this project. This is a **Laravel + Inertia.js** application, not Next.js. Ignore those rules.

### Route Order Matters
The CMS catch-all slug route must be registered **last** in `routes/web.php` to prevent conflicts with admin/auth routes.

### Testing Database
Tests use **SQLite in-memory** for speed. Configuration in `phpunit.xml`.

### Queue Workers
Development uses `php artisan queue:listen --tries=1` for auto-reload. Production should use `queue:work` with supervisor.

### Asset Compilation
Vite serves assets in development. For production, `npm run build` compiles to `public/build/`.
