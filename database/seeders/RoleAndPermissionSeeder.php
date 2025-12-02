<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions grouped by module
        $permissions = [
            // User management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Glossary management
            'glossary.view',
            'glossary.create',
            'glossary.edit',
            'glossary.delete',

            // Certifications management
            'certifications.view',
            'certifications.create',
            'certifications.edit',
            'certifications.delete',

            // Accredited Organizations management
            'organizations.view',
            'organizations.create',
            'organizations.edit',
            'organizations.delete',

            // Blog/Articles management
            'articles.view',
            'articles.create',
            'articles.edit',
            'articles.delete',

            // Events management
            'events.view',
            'events.create',
            'events.edit',
            'events.delete',

            // Settings
            'settings.view',
            'settings.edit',

            // Dashboard access
            'dashboard.access',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Admin role with all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Create Manager role with limited permissions
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $managerRole->givePermissionTo([
            'dashboard.access',
            'glossary.view',
            'glossary.create',
            'glossary.edit',
            'certifications.view',
            'certifications.create',
            'certifications.edit',
            'organizations.view',
            'organizations.create',
            'organizations.edit',
            'articles.view',
            'articles.create',
            'articles.edit',
            'events.view',
            'events.create',
            'events.edit',
        ]);

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
