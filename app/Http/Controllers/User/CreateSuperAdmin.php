<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class CreateSuperAdmin extends Controller
{
    public function index()
    {
        return view('create-root');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Admin User
        $localAdmin = UserRepository::create([
            'email' => $request->email,
            'phone' => '011'.rand(100000000, 999999999),
            'name' => 'Administrator',
            'is_active' => true,
            'is_admin' => true,
            'email_verified_at' => now(),
            'password' => bcrypt($request->password),
        ]);

        $localAdmin->assignRole('admin');

        // Redirect to the dashboard or any other page
        return redirect()->route('admin.login')->with('success', 'You are ready to use ReadyLMS! Please login with your credentials.');
    }
}
