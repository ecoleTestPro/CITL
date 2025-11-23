import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { EventFormModal } from '@/components/events/event-form-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ArrowUpDown, Calendar, Edit, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Event {
    id: number;
    title: string;
    organization: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string | null;
    tags: string[] | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    events: Event[];
}

export default function EventsIndex({ events }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['events'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!eventToDelete) return;

        router.delete(`/dashboard/events/${eventToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Événement supprimé avec succès');
                setShowDeleteModal(false);
                setEventToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const confirmDelete = (event: Event) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    };

    const openCreateModal = () => {
        setEventToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (event: Event) => {
        setEventToEdit(event);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setEventToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['events'] });
    };

    const handleToggleActive = (event: Event) => {
        router.post(
            `/dashboard/events/${event.id}/toggle-active`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(event.is_active ? 'Événement désactivé avec succès' : 'Événement activé avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la modification du statut');
                },
            },
        );
    };

    const columns: ColumnDef<Event>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Titre
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue('title')}</div>
                    <div className="text-xs text-gray-500">{row.original.organization}</div>
                </div>
            ),
        },
        {
            accessorKey: 'start_date',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Date de début
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => {
                const startDate = row.getValue('start_date') as string;
                return <div className="text-sm">{new Date(startDate).toLocaleDateString('fr-FR')}</div>;
            },
        },
        {
            accessorKey: 'end_date',
            header: 'Date de fin',
            cell: ({ row }) => {
                const endDate = row.getValue('end_date') as string | null;
                return endDate ? <div className="text-sm">{new Date(endDate).toLocaleDateString('fr-FR')}</div> : <span className="text-sm text-gray-400">-</span>;
            },
        },
        {
            accessorKey: 'location',
            header: 'Localisation',
            cell: ({ row }) => {
                const location = row.getValue('location') as string | null;
                return location ? <div className="text-sm">{location}</div> : <span className="text-sm text-gray-400">-</span>;
            },
        },
        {
            accessorKey: 'tags',
            header: 'Tags',
            cell: ({ row }) => {
                const tags = row.getValue('tags') as string[] | null;
                return tags && tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                                +{tags.length - 2}
                            </Badge>
                        )}
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                );
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
            id: 'actions',
            cell: ({ row }) => {
                const event = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(event)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => confirmDelete(event)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: events,
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
            <Head title="Gestion des Événements" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des Événements</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Total: {events.length} événements</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvel événement
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input placeholder="Rechercher un événement..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="pl-9" />
                        </div>
                        <Button variant="outline" onClick={() => setGlobalFilter('')}>
                            Réinitialiser
                        </Button>
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
                                            Aucun événement trouvé
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
                            Affichage de {table.getRowModel().rows.length} événement(s)
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Précédent
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
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
                title="Supprimer l'événement"
                message={`Êtes-vous sûr de vouloir supprimer l'événement "${eventToDelete?.title}" ? Cette action est irréversible.`}
            />

            <EventFormModal isOpen={showFormModal} onClose={closeFormModal} event={eventToEdit} onSuccess={handleFormSuccess} />
        </AppLayout>
    );
}
