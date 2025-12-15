import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { GlossaryFormModal } from '@/components/glossary/glossary-form-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { ArrowUpDown, Edit, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Glossary {
    id: number;
    term: string;
    definition: string;
    category: string | null;
    letter: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    glossaries: {
        data: Glossary[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        letter: string | null;
        search: string | null;
        is_active: string | null;
    };
}

export default function GlossaryIndex({ glossaries, filters }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [letterFilter, setLetterFilter] = useState(filters.letter || '');
    const [statusFilter, setStatusFilter] = useState(filters.is_active || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [glossaryToDelete, setGlossaryToDelete] = useState<Glossary | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [glossaryToEdit, setGlossaryToEdit] = useState<Glossary | null>(null);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['glossaries'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!glossaryToDelete) return;

        router.delete(`/dashboard/glossary/${glossaryToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Terme supprimé avec succès');
                setShowDeleteModal(false);
                setGlossaryToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const confirmDelete = (glossary: Glossary) => {
        setGlossaryToDelete(glossary);
        setShowDeleteModal(true);
    };

    const openCreateModal = () => {
        setGlossaryToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (glossary: Glossary) => {
        setGlossaryToEdit(glossary);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setGlossaryToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['glossaries'] });
    };

    // Auto-apply filters when they change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/dashboard/glossary',
                {
                    search: globalFilter || undefined,
                    letter: letterFilter || undefined,
                    is_active: statusFilter || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timeoutId);
    }, [globalFilter, letterFilter, statusFilter]);

    const columns: ColumnDef<Glossary>[] = [
        {
            accessorKey: 'letter',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Lettre
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-center text-lg font-bold">{row.getValue('letter')}</div>,
        },
        {
            accessorKey: 'term',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Terme
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('term')}</div>,
        },
        {
            accessorKey: 'definition',
            header: 'Définition',
            cell: ({ row }) => <div className="max-w-md truncate text-sm text-gray-600 dark:text-gray-400">{row.getValue('definition')}</div>,
        },
        {
            accessorKey: 'category',
            header: 'Catégorie',
            cell: ({ row }) => {
                const category = row.getValue('category') as string | null;
                return category ? <Badge variant="secondary">{category}</Badge> : <span className="text-sm text-gray-400">-</span>;
            },
        },
        {
            accessorKey: 'order',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Ordre
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-center">{row.getValue('order')}</div>,
        },
        {
            accessorKey: 'is_active',
            header: 'Statut',
            cell: ({ row }) => {
                const isActive = row.getValue('is_active') as boolean;
                return <Badge variant={isActive ? 'default' : 'secondary'}>{isActive ? 'Actif' : 'Inactif'}</Badge>;
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const glossary = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(glossary)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => confirmDelete(glossary)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: glossaries.data,
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

    return (
        <AppLayout>
            <Head title="Gestion du Glossaire" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion du Glossaire</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Total: {glossaries.total} termes</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un terme
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
                                <Input
                                    placeholder="Rechercher un terme..."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Lettre</label>
                            <Select value={letterFilter || 'all'} onValueChange={(value) => setLetterFilter(value === 'all' ? '' : value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Toutes les lettres" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les lettres</SelectItem>
                                    {alphabet.map((letter) => (
                                        <SelectItem key={letter} value={letter}>
                                            {letter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Statut</label>
                            <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? '' : value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les statuts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="1">Actif</SelectItem>
                                    <SelectItem value="0">Inactif</SelectItem>
                                </SelectContent>
                            </Select>
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
                                            Aucun terme trouvé
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
                            Page {glossaries.current_page} sur {glossaries.last_page}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/glossary?page=${glossaries.current_page - 1}`)}
                                disabled={glossaries.current_page === 1}
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/glossary?page=${glossaries.current_page + 1}`)}
                                disabled={glossaries.current_page === glossaries.last_page}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Supprimer le terme"
                message={`Êtes-vous sûr de vouloir supprimer le terme "${glossaryToDelete?.term}" ? Cette action est irréversible.`}
            />

            <GlossaryFormModal isOpen={showFormModal} onClose={closeFormModal} glossary={glossaryToEdit} onSuccess={handleFormSuccess} />
        </AppLayout>
    );
}
