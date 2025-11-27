import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { FaqFormModal } from '@/components/faqs/faq-form-modal';
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
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
    is_active: boolean;
    locale: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedFaqs {
    data: Faq[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    faqs: PaginatedFaqs;
    categories: string[];
    filters: {
        category?: string;
        locale?: string;
        is_active?: boolean;
        search?: string;
    };
}

export default function FaqsIndex({ faqs, categories, filters }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState<Faq | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [faqToEdit, setFaqToEdit] = useState<Faq | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(filters.category || 'all');
    const [selectedLocale, setSelectedLocale] = useState<string>(filters.locale || 'all');
    const [selectedStatus, setSelectedStatus] = useState<string>(filters.is_active !== undefined ? String(filters.is_active) : 'all');

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['faqs', 'categories'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleFilter = () => {
        const params: any = {};

        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (selectedLocale !== 'all') params.locale = selectedLocale;
        if (selectedStatus !== 'all') params.is_active = selectedStatus === 'true';
        if (globalFilter) params.search = globalFilter;

        router.get('/dashboard/faqs', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (!faqToDelete) return;

        router.delete(`/dashboard/faqs/${faqToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('FAQ supprimée avec succès');
                setShowDeleteModal(false);
                setFaqToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const confirmDelete = (faq: Faq) => {
        setFaqToDelete(faq);
        setShowDeleteModal(true);
    };

    const openCreateModal = () => {
        setFaqToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (faq: Faq) => {
        setFaqToEdit(faq);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setFaqToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['faqs', 'categories'] });
    };

    const handleToggleActive = (faq: Faq) => {
        router.post(
            `/dashboard/faqs/${faq.id}/toggle-active`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(faq.is_active ? 'FAQ désactivée avec succès' : 'FAQ activée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la modification du statut');
                },
            },
        );
    };

    const columns: ColumnDef<Faq>[] = [
        {
            accessorKey: 'question',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Question
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => (
                <div>
                    <div className="max-w-md font-medium">{row.getValue('question')}</div>
                    <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            {row.original.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            {row.original.locale.toUpperCase()}
                        </Badge>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'answer',
            header: 'Réponse',
            cell: ({ row }) => {
                const answer = row.getValue('answer') as string;
                const plainText = answer.replace(/<[^>]*>/g, '');
                const truncated = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
                return <div className="max-w-md text-sm text-gray-600 dark:text-gray-400">{truncated}</div>;
            },
        },
        {
            accessorKey: 'is_active',
            header: 'Statut',
            cell: ({ row }) => {
                const isActive = row.getValue('is_active') as boolean;
                return (
                    <Badge variant={isActive ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => handleToggleActive(row.original)}>
                        {isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(row.original)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => confirmDelete(row.original)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: faqs.data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout>
            <Head title="Gestion des FAQs" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des FAQs</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Gérez les questions fréquemment posées</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle FAQ
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Rechercher..."
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                className="pl-9"
                            />
                        </div>

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Toutes les catégories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les catégories</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedLocale} onValueChange={setSelectedLocale}>
                            <SelectTrigger>
                                <SelectValue placeholder="Toutes les langues" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les langues</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="en">Anglais</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Tous les statuts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="true">Actif</SelectItem>
                                <SelectItem value="false">Inactif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {faqs.total} FAQ{faqs.total > 1 ? 's' : ''} au total
                        </p>
                        <Button onClick={handleFilter} size="sm">
                            Filtrer
                        </Button>
                    </div>

                    <div className="overflow-x-auto rounded-md border">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            Aucune FAQ trouvée
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-4 py-3 text-sm">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {faqs.last_page > 1 && (
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Page {faqs.current_page} sur {faqs.last_page}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(`/dashboard/faqs?page=${faqs.current_page - 1}`)}
                                    disabled={faqs.current_page === 1}
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(`/dashboard/faqs?page=${faqs.current_page + 1}`)}
                                    disabled={faqs.current_page === faqs.last_page}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showFormModal && <FaqFormModal isOpen={showFormModal} onClose={closeFormModal} onSuccess={handleFormSuccess} faq={faqToEdit} categories={categories} />}

            {showDeleteModal && (
                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    title="Supprimer la FAQ"
                    description={`Êtes-vous sûr de vouloir supprimer la FAQ "${faqToDelete?.question}" ? Cette action est irréversible.`}
                />
            )}
        </AppLayout>
    );
}
