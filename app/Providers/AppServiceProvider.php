<?php

namespace App\Providers;

use App\Models\Assessment\Exam;
use App\Models\Assessment\Quiz;
use App\Models\Blog\Article;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use App\Models\Certificate\ManageCertificate;
use App\Models\Certification\Certification;
use App\Models\Certification\CertificationCategory;
use App\Models\Course\Category;
use App\Models\Course\Course;
use App\Models\Glossary;
use App\Models\User\Instructor;
use App\Models\User\User;
use App\Repositories\Assessment\ExamRepository;
use App\Repositories\Assessment\QuizRepository;
use App\Repositories\Blog\ArticleRepository;
use App\Repositories\Blog\BlogRepository;
use App\Repositories\Blog\BlogCategoryRepository;
use App\Repositories\Certificate\CertificateRepository;
use App\Repositories\Certification\CertificationCategoryRepository;
use App\Repositories\Certification\CertificationRepository;
use App\Repositories\Course\CategoryRepository;
use App\Repositories\Course\CourseRepository;
use App\Repositories\Glossary\GlossaryRepository;
use App\Repositories\Search\SearchRepository;
use App\Repositories\User\InstructorRepository;
use App\Repositories\User\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // User Module Repositories
        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository(new User());
        });

        $this->app->bind(InstructorRepository::class, function ($app) {
            return new InstructorRepository(new Instructor());
        });

        // Course Module Repositories
        $this->app->bind(CourseRepository::class, function ($app) {
            return new CourseRepository(new Course());
        });

        $this->app->bind(CategoryRepository::class, function ($app) {
            return new CategoryRepository(new Category());
        });

        // Assessment Module Repositories
        $this->app->bind(ExamRepository::class, function ($app) {
            return new ExamRepository(new Exam());
        });

        $this->app->bind(QuizRepository::class, function ($app) {
            return new QuizRepository(new Quiz());
        });

        // Certificate Module Repositories
        $this->app->bind(CertificateRepository::class, function ($app) {
            return new CertificateRepository(new ManageCertificate());
        });

        // Blog Module Repositories
        $this->app->bind(ArticleRepository::class, function ($app) {
            return new ArticleRepository(new Article());
        });

        $this->app->bind(BlogRepository::class, function ($app) {
            return new BlogRepository(new Blog());
        });

        $this->app->bind(BlogCategoryRepository::class, function ($app) {
            return new BlogCategoryRepository(new BlogCategory());
        });

        // Certification Module Repositories
        $this->app->bind(CertificationCategoryRepository::class, function ($app) {
            return new CertificationCategoryRepository(new CertificationCategory());
        });

        $this->app->bind(CertificationRepository::class, function ($app) {
            return new CertificationRepository(new Certification());
        });

        $this->app->bind(\App\Repositories\Certificate\CertificationDocumentRepository::class, function ($app) {
            return new \App\Repositories\Certificate\CertificationDocumentRepository(new \App\Models\Certificate\CertificationDocument());
        });

        $this->app->bind(\App\Repositories\Certificate\CertificationDocumentTagRepository::class, function ($app) {
            return new \App\Repositories\Certificate\CertificationDocumentTagRepository(new \App\Models\Certificate\CertificationDocumentTag());
        });

        // Search Repository
        $this->app->singleton(SearchRepository::class, function ($app) {
            return new SearchRepository();
        });

        $this->app->bind(\App\Repositories\ExamRegistrationRepository::class, function ($app) {
            return new \App\Repositories\ExamRegistrationRepository(new \App\Models\ExamRegistration());
        });

        $this->app->bind(\App\Repositories\MembershipApplicationRepository::class, function ($app) {
            return new \App\Repositories\MembershipApplicationRepository(new \App\Models\MembershipApplication());
        });

        // Glossary Repository
        $this->app->bind(GlossaryRepository::class, function ($app) {
            return new GlossaryRepository(new Glossary());
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
