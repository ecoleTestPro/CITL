<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->get('search'),
            'role' => $request->get('role'),
        ];

        $users = $this->userRepo->getPaginatedWithRoles(15, array_filter($filters));
        $roles = Role::all();

        return Inertia::render('dashboard/users/index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $filters,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
        ]);

        $role = $validated['role'];
        unset($validated['role'], $validated['password_confirmation']);

        $this->userRepo->createWithRole($validated, $role);

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Utilisateur créé avec succès.');
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, $id)
    {
        $user = $this->userRepo->find($id);

        if (! $user) {
            return redirect()->route('dashboard.users.index')
                ->with('error', 'Utilisateur non trouvé.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
        ]);

        $role = $validated['role'];
        unset($validated['role'], $validated['password_confirmation']);

        // Remove password if not provided
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $this->userRepo->updateWithRole($id, $validated, $role);

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy($id, Request $request)
    {
        $user = $this->userRepo->find($id);

        if (! $user) {
            return redirect()->route('dashboard.users.index')
                ->with('error', 'Utilisateur non trouvé.');
        }

        // Prevent self-deletion
        if ($user->id === $request->user()->id) {
            return redirect()->route('dashboard.users.index')
                ->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }

        $this->userRepo->delete($id);

        return redirect()->route('dashboard.users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }
}
