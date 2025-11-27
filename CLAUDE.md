# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern full-stack learning management system built with:
- **Backend**: Laravel 12 (PHP 8.2+) with Inertia.js
- **Frontend**: React 19 + TypeScript with Tailwind CSS v4
- **Database**: MySQL/SQLite with Eloquent ORM
- **Auth**: Laravel Fortify with 2FA support
- **Testing**: Pest PHP
- **Build**: Vite with SSR support
- **i18n**: react-i18next (French/English support)
- **Animations**: GSAP + Motion (Framer Motion)
- **Rich Text**: TipTap editor

## Development Commands

### Initial Setup
```bash
composer run setup  # Install deps, copy .env, generate key, migrate, build assets
```

### Development Server
```bash
composer run dev  # Starts all services: server, queue, logs, vite (concurrently)
```

This starts 4 concurrent processes:
- PHP dev server (port 8000)
- Queue worker
- Laravel Pail logs
- Vite dev server

### Development with SSR
```bash
composer run dev:ssr  # Build SSR bundle and start SSR server
```

### Testing
```bash
composer run test           # Run all Pest tests
./vendor/bin/pest          # Run tests directly
./vendor/bin/pest --filter AuthenticationTest  # Run specific test file
```

### Code Quality
```bash
# PHP
vendor/bin/pint            # Fix PHP code style (Laravel Pint)

# JavaScript/TypeScript
npm run lint               # ESLint with auto-fix
npm run format             # Format with Prettier
npm run format:check       # Check formatting without fixing
npm run types              # TypeScript type checking
```

### Building
```bash
npm run build              # Build frontend assets for production
npm run build:ssr          # Build with SSR support
```

## Architecture

### Modular Domain Organization

The application is organized into 7+ business domain modules:

1. **User Module** (`app/Models/User/`, `app/Repositories/User/`)
   - User authentication, profiles, instructor management
   - Models: User, Instructor, Education, Experience

2. **Course Module** (`app/Models/Course/`, `app/Repositories/Course/`)
   - Core course management, enrollment, reviews
   - Models: Course, Category, Chapter, Content, Enrollment, Review

3. **Assessment Module** (`app/Models/Assessment/`, `app/Repositories/Assessment/`)
   - Exam and quiz management with session tracking
   - Models: Exam, Quiz, Question, ExamSession, QuizSession, Answer
   - ExamRegistration for external exam enrollment

4. **Certificate Module** (`app/Models/Certificate/`, `app/Repositories/Certificate/`)
   - Course completion certificates
   - Models: ManageCertificate, CertificationDocument, CertificationDocumentTag

5. **Certification Module** (`app/Models/Certification/`, `app/Repositories/Certification/`)
   - Professional certifications (distinct from course certificates)
   - Models: Certification, CertificationCategory

6. **Blog Module** (`app/Models/Blog/`, `app/Repositories/Blog/`)
   - Blog article management
   - Models: Article

7. **Admin/Reporting Module** (`app/Http/Controllers/Admin/`, `app/Http/Controllers/WebAdmin/`)
   - Admin operations, report generation, filtering, PDF/CSV export

### Repository Pattern

All database access uses the Repository pattern:

- **Base**: `app/Repositories/BaseRepository.php` (abstract class with CRUD methods)
- **Interface**: `app/Repositories/BaseRepositoryInterface.php` defines repository contract
- **Implementation**: Module-specific repositories extend BaseRepository
- **Registration**: Repositories bound in `AppServiceProvider::register()` and injected into controllers

Example:
```php
class CourseController extends Controller
{
    public function index(CourseRepository $courseRepo)
    {
        $courses = $courseRepo->all();
        return $this->json('Courses found', ['courses' => $courses], 200);
    }
}
```

### Inertia.js Integration

- **Routes**: Defined in `routes/web.php` and `routes/settings.php`
- **Controllers**: Return data via `Inertia::render('page-name', ['data' => $value])`
- **Pages**: Located in `resources/js/pages/` (TypeScript + React)
- **Layouts**: `resources/js/layouts/` (AppLayout, AuthLayout)
- **SSR**: Configured in `config/inertia.php` (runs on port 13714)

### Wayfinder Route Helpers

Laravel routes are automatically converted to type-safe TypeScript helpers:

- Generated routes: `resources/js/routes/index.ts`
- Import in components: `import { login, dashboard } from '@/routes'`
- Usage: `<Link href={login().url}>Login</Link>`

Regenerated automatically during Vite builds via the Wayfinder plugin.

### Frontend Component Structure

```
resources/js/
├── pages/                 # Inertia page components
│   ├── auth/             # Login, register, 2FA, etc.
│   ├── settings/         # Profile, password, appearance
│   ├── public/           # Public-facing pages
│   └── dashboard.tsx
├── layouts/              # Layout wrappers (AppLayout, AuthLayout)
├── components/           # Shared React components
│   ├── ui/              # Radix UI primitives with Tailwind (shadcn-style)
│   ├── blocks/          # Reusable page sections/blocks
│   │   ├── about/       # About section variants
│   │   ├── certifications/  # Certification displays
│   │   ├── testimonials/    # Testimonial sections
│   │   ├── cta/         # Call-to-action blocks
│   │   ├── faq/         # FAQ sections
│   │   └── ...          # Other block types
│   └── *.tsx            # App-specific components
├── hooks/               # Custom React hooks
│   ├── use-appearance.tsx    # Theme management
│   ├── use-two-factor-auth.ts  # 2FA setup
│   └── *.ts
├── i18n/                # Internationalization
│   ├── config.ts        # i18next configuration
│   └── locales/         # Translation files (fr.json, en.json)
├── types/               # TypeScript type definitions
└── routes/              # Generated Wayfinder routes
```

### Authentication (Fortify)

- **Provider**: `app/Providers/FortifyServiceProvider.php`
- **Actions**: `app/Actions/Fortify/` (CreateNewUser, ResetUserPassword)
- **Features**: Email verification, password reset, 2FA (TOTP + recovery codes)
- **Routes**: Auto-registered by Fortify, rendered via Inertia views

All auth pages return Inertia components:
```php
Fortify::loginView(fn() => Inertia::render('auth/login', [...]));
```

## Database Conventions

- **Migrations**: Follow modular structure (e.g., `create_courses_table`, `create_enrollments_table`)
- **Foreign Keys**: Use `constrained()` with `onDelete('cascade')` for relationships
- **Soft Deletes**: Enabled on most models via `SoftDeletes` trait
- **Timestamps**: All tables have `created_at` and `updated_at`

Key relationships:
- Courses → Instructor (user_id), Category, Chapters
- Chapters → Contents
- Enrollments → User, Course (tracks progress percentage)
- Exams/Quizzes → Course, Questions
- Sessions → Exam/Quiz, User (tracks attempts and scores)

## Testing with Pest

- **Location**: `tests/Feature/` and `tests/Unit/`
- **Config**: `tests/Pest.php`
- **Database**: Uses SQLite with `RefreshDatabase` trait
- **Factories**: Model factories in `database/factories/`

Test structure:
```php
uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());
    $this->get(route('dashboard'))->assertOk();
});
```

## CI/CD Workflows

### Linter Workflow (`.github/workflows/lint.yml`)
Runs on push/PR to `develop` and `main`:
1. Laravel Pint (PHP)
2. Prettier (JS/TS)
3. ESLint (JS/TS)

### Tests Workflow (`.github/workflows/tests.yml`)
Runs on push/PR to `develop` and `main`:
1. Setup PHP 8.4 + Node 22
2. Install dependencies
3. Build assets
4. Run Pest tests

## Key File Locations

- **Routes**: `routes/web.php`, `routes/settings.php`
- **Controllers**: `app/Http/Controllers/` (organized by module)
- **Models**: `app/Models/` (organized by module)
- **Repositories**: `app/Repositories/` (organized by module)
- **Migrations**: `database/migrations/`
- **Seeders**: `database/seeders/`
- **Factories**: `database/factories/`
- **Frontend Entry**: `resources/js/app.tsx`
- **Vite Config**: `vite.config.ts`
- **Tailwind Config**: Embedded in `vite.config.ts` (Tailwind v4)

## Important Patterns

### Controller Response Pattern
All controllers extend `app/Http/Controllers/Controller.php` which provides a consistent JSON response method:
```php
return $this->json($message, $data, $statusCode);
```

Returns:
```json
{
    "success": true,
    "message": "Success message",
    "data": { "key": "value" }
}
```

The `success` field is automatically set based on status code (2xx = true).

### Form Request Validation
Use Form Request classes in `app/Http/Requests/` for validation:
```php
public function store(CreateCourseRequest $request)
{
    // $request is already validated
}
```

### Resource Transformation
Use API Resources for consistent data formatting:
```php
return CourseResource::make($course);
return CourseResource::collection($courses);
```

## Development Notes

### Working with Migrations
```bash
php artisan migrate              # Run pending migrations
php artisan migrate:fresh        # Drop all tables and re-migrate
php artisan migrate:fresh --seed # Re-migrate and seed data
php artisan migrate:rollback     # Rollback last batch
```

### Queue Management
```bash
php artisan queue:work           # Start queue worker
php artisan queue:listen --tries=1  # Used in dev mode
```

### Generating Files
```bash
php artisan make:model Course -mfsc  # Model + migration, factory, seeder, controller
php artisan make:controller CourseController --resource
php artisan make:request StoreCourseRequest
```

### Wayfinder Route Generation
Routes are auto-generated during Vite builds. To manually regenerate:
```bash
php artisan wayfinder:generate
```

### Theme/Appearance System
- Managed via `use-appearance.tsx` hook
- Stores theme in localStorage
- Supports: light, dark, system
- Applied via `data-appearance` attribute on `<html>`

### Two-Factor Authentication
- Setup flow in `resources/js/hooks/use-two-factor-auth.ts`
- QR code generation for authenticator apps
- Recovery codes stored encrypted
- Challenge page for login verification

## Branch Strategy

- **main**: Production branch (triggers CI/CD)
- **develop**: Development branch (triggers CI/CD)
- **feature/***: Feature branches (create PRs to develop)

## Environment Variables

Key variables in `.env`:
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
QUEUE_CONNECTION=sync
INERTIA_SSR_URL=http://127.0.0.1:13714
INERTIA_SSR_ENABLED=false  # Set to true for SSR
```

## Performance Considerations

- **React Compiler**: Enabled via Babel plugin for automatic memoization
- **SSR Support**: Available but optional (set `INERTIA_SSR_ENABLED=true`)
- **Queue Jobs**: Use for long-running tasks (report generation, emails)
- **Eager Loading**: Use repository methods that eager-load relationships to avoid N+1 queries

## Common Tasks

### Adding a New Module
1. Create models in `app/Models/{ModuleName}/`
2. Create repository in `app/Repositories/{ModuleName}/` extending BaseRepository
3. Register repository in `AppServiceProvider::boot()`
4. Create controller in `app/Http/Controllers/{ModuleName}/`
5. Add routes to `routes/web.php`
6. Create Inertia page component in `resources/js/pages/`

### Adding a New Inertia Page
1. Create component in `resources/js/pages/`
2. Add route in `routes/web.php` using `Inertia::render()`
3. Wayfinder will auto-generate route helper on next build

### Adding UI Components
- Use Radix UI primitives from `@radix-ui/react-*`
- Follow existing patterns in `resources/js/components/ui/` (shadcn-compatible)
- Apply Tailwind styles using `class-variance-authority` for variants
- Use `shadcn` CLI for adding new UI components: `npx shadcn@latest add [component]`

### Working with Block Components
Block components (`resources/js/components/blocks/`) are reusable page sections designed for marketing/public pages:
- Each block is self-contained with its own styles and logic
- Blocks are composed into pages for flexible layouts
- Common block types: about, certifications, testimonials, cta, faq, features, team
- Animations often use GSAP or Motion for smooth transitions

### Internationalization (i18n)
The app uses react-i18next for multilingual support:
- Default language: French (`fr`)
- Supported languages: French (`fr`), English (`en`)
- Language preference stored in localStorage
- Translation files: `resources/js/i18n/locales/{lang}.json`
- Usage in components:
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const { t, i18n } = useTranslation();
    return <h1>{t('welcome.title')}</h1>;
}
```

### Rich Text Editing
The app uses TipTap (based on ProseMirror) for rich text editing:
- Extensions enabled: Color, Image, Link, TextAlign, TextStyle, Underline
- Starter kit provides basic formatting (bold, italic, lists, etc.)
- TipTap components located in `resources/js/components/` (search for tiptap usage)
