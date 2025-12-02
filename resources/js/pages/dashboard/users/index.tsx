import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserFormModal } from '@/components/users/user-form-modal';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Edit, Plus, RefreshCw, Search, Shield, Trash2, UserCog, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    roles: Role[];
    filters: {
        search: string | null;
        role: string | null;
    };
}

export default function UsersIndex({ users, roles, filters }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    // Refs to track filter changes
    const isFirstRender = useRef(true);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auto-filter with debounce when filters change
    useEffect(() => {
        // Skip first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Clear existing timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set new debounced search
        debounceTimeout.current = setTimeout(() => {
            router.get(
                '/dashboard/users',
                {
                    search: globalFilter || undefined,
                    role: roleFilter || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 400);

        // Cleanup
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [globalFilter, roleFilter]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['users'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!userToDelete) return;

        router.delete(`/dashboard/users/${userToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Utilisateur supprimé avec succès');
                setShowDeleteModal(false);
                setUserToDelete(null);
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0] || 'Erreur lors de la suppression';
                toast.error(errorMessage as string);
            },
        });
    };

    const confirmDelete = (user: User) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleReset = () => {
        setGlobalFilter('');
        setRoleFilter('');
    };

    const handleOpenCreateModal = () => {
        setUserToEdit(null);
        setShowFormModal(true);
    };

    const handleOpenEditModal = (user: User) => {
        setUserToEdit(user);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setUserToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['users'] });
    };

    const getRoleBadge = (roleName: string) => {
        switch (roleName) {
            case 'admin':
                return (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin
                    </Badge>
                );
            case 'manager':
                return (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        <UserCog className="mr-1 h-3 w-3" />
                        Manager
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{roleName}</Badge>;
        }
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Nom
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Email
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-sm text-gray-600 dark:text-gray-400">{row.getValue('email')}</div>,
        },
        {
            accessorKey: 'roles',
            header: 'Rôle',
            cell: ({ row }) => {
                const userRoles = row.original.roles;
                return (
                    <div className="flex flex-wrap gap-1">
                        {userRoles.map((role) => (
                            <span key={role.id}>{getRoleBadge(role.name)}</span>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'email_verified_at',
            header: 'Vérifié',
            cell: ({ row }) => {
                const verified = row.getValue('email_verified_at') as string | null;
                return verified ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Vérifié
                    </Badge>
                ) : (
                    <Badge variant="secondary">Non vérifié</Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Créé le
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue('created_at'));
                return <div className="text-sm">{date.toLocaleDateString('fr-FR')}</div>;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEditModal(user)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => confirmDelete(user)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: users.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
    });

    const hasActiveFilters = globalFilter || roleFilter;

    return (
        <AppLayout>
            <Head title="Gestion des utilisateurs" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Total: {users.total} utilisateurs</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={handleOpenCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un utilisateur
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Rechercher</label>
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input placeholder="Nom ou email..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="pl-9" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Rôle</label>
                            <Select value={roleFilter || 'all'} onValueChange={(value) => setRoleFilter(value === 'all' ? '' : value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les rôles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les rôles</SelectItem>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.name === 'admin' ? 'Administrateur' : role.name === 'manager' ? 'Gestionnaire' : role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            {hasActiveFilters && (
                                <Button variant="outline" onClick={handleReset} className="w-full">
                                    <X className="mr-2 h-4 w-4" />
                                    Réinitialiser les filtres
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-lg border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/50">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-4 py-3 text-left text-sm font-medium">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                                            Aucun utilisateur trouvé
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-4 py-3">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t px-4 py-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Page {users.current_page} sur {users.last_page}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/users?page=${users.current_page - 1}`)}
                                disabled={users.current_page === 1}
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/users?page=${users.current_page + 1}`)}
                                disabled={users.current_page === users.last_page}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Form Modal */}
            <UserFormModal isOpen={showFormModal} onClose={handleCloseFormModal} user={userToEdit} roles={roles} onSuccess={handleFormSuccess} />

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Supprimer l'utilisateur"
                message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userToDelete?.name}" ? Cette action est irréversible.`}
            />
        </AppLayout>
    );
}
