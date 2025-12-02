<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name'              => 'Admin CITL',
                'email'             => 'admin@citl-istqb.org',
                'password'          => 'mHbG9=}s;wIT9Y16BEDORs(iTNUufT',
                'email_verified_at' => now(),
                'role'              => 'admin',
            ],
            [
                'name'              => 'Contact CITL',
                'email'             => 'contact@citl-istqb.org',
                'password'          => 'S8i~jFuytow3$HF2wrQnQclxBF[zQb',
                'email_verified_at' => now(),
                'role'              => 'manager',
            ],
        ];

        foreach ($users as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Assign role if user doesn't have it
            if (!$user->hasRole($role)) {
                $user->assignRole($role);
            }
        }

        $this->command->info('User seeder completed with ' . count($users) . ' users.');
    }
}
