<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all users with their roles
     */
    public function getAllWithRoles()
    {
        return $this->model->with('roles')->get();
    }

    /**
     * Get paginated users with roles
     */
    public function getPaginatedWithRoles($perPage = 15, $filters = [])
    {
        $query = $this->model->with('roles');

        if (isset($filters['search']) && !empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if (isset($filters['role']) && !empty($filters['role'])) {
            $query->whereHas('roles', function ($q) use ($filters) {
                $q->where('name', $filters['role']);
            });
        }

        return $query->latest()->paginate($perPage);
    }

    /**
     * Find user by email
     */
    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    /**
     * Get users by role
     */
    public function getByRole($roleName)
    {
        return $this->model->role($roleName)->get();
    }

    /**
     * Get admins
     */
    public function getAdmins()
    {
        return $this->getByRole('admin');
    }

    /**
     * Get managers
     */
    public function getManagers()
    {
        return $this->getByRole('manager');
    }

    /**
     * Create user with role
     */
    public function createWithRole(array $data, string $role)
    {
        $user = $this->model->create($data);
        $user->assignRole($role);

        return $user;
    }

    /**
     * Update user with role
     */
    public function updateWithRole($id, array $data, ?string $role = null)
    {
        $user = $this->find($id);

        if (!$user) {
            return null;
        }

        $user->update($data);

        if ($role) {
            $user->syncRoles([$role]);
        }

        return $user;
    }
}