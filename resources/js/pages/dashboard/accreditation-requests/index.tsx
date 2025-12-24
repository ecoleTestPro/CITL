import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowUpDown, Building2, Eye, Globe, Mail, Phone, RefreshCw, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface AccreditationRequest {
    id: number;
    company_name: string;
    email: string;
    phone: string;
    city: string;
    company_address: string;
    contact_person: string;
    website: string | null;
    years_in_business: number;
    number_of_trainers: number;
    training_facilities: string;
    additional_info: string | null;
    created_at: string;
}

interface Props {
    requests: AccreditationRequest[];
}

export default function AccreditationRequestsIndex({ requests }: Props) {
    const { t } = useTranslation();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState<AccreditationRequest | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<AccreditationRequest | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['requests'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!requestToDelete) return;

        router.delete(`/dashboard/accreditation-requests/${requestToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Demande supprimée avec succès');
                setShowDeleteModal(false);
                setRequestToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const columns: ColumnDef<AccreditationRequest>[] = [
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-sm">{format(new Date(row.getValue('created_at')), 'dd MMM yyyy', { locale: fr })}</div>,
        },
        {
            accessorKey: 'company_name',
            header: 'Entreprise',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.company_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.city}</p>
                </div>
            ),
        },
        {
            accessorKey: 'contact_person',
            header: 'Contact',
            cell: ({ row }) => (
                <div className="space-y-1">
                    <p className="font-medium">{row.original.contact_person}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <Mail className="mr-1 h-3 w-3" />
                        <a href={`mailto:${row.original.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
                            {row.original.email}
                        </a>
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSelectedRequest(row.original);
                            setShowDetailsModal(true);
                        }}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="Voir les détails"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            setRequestToDelete(row.original);
                            setShowDeleteModal(true);
                        }}
                        className="rounded p-1 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        title="Supprimer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: requests,
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
            <Head title="Demandes d'accréditation" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Demandes d'accréditation</h1>
                        <p className="text-muted-foreground">
                            Gérez les demandes d'accréditation des organismes de formation
                        </p>
                    </div>
                    <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm" className="gap-2">
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Actualiser
                    </Button>
                </div>

                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Rechercher..."
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {requests.length} demande(s)
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-300"
                                            >
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                            Aucune demande d'accréditation
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {table.getPageCount() > 1 && (
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Précédent
                                </button>
                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Détails de la demande d'accréditation</DialogTitle>
                    </DialogHeader>
                    {selectedRequest && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Entreprise</p>
                                    <p className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        {selectedRequest.company_name}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Ville</p>
                                    <p>{selectedRequest.city}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Personne de contact</p>
                                    <p>{selectedRequest.contact_person}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                                            {selectedRequest.email}
                                        </a>
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Téléphone</p>
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {selectedRequest.phone}
                                    </p>
                                </div>
                                {selectedRequest.website && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Site web</p>
                                        <p className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            <a href={selectedRequest.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {selectedRequest.website}
                                            </a>
                                        </p>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Années d'activité</p>
                                    <p>{selectedRequest.years_in_business} ans</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Nombre de formateurs</p>
                                    <p className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        {selectedRequest.number_of_trainers}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Adresse</p>
                                <p>{selectedRequest.company_address}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Installations de formation</p>
                                <p className="whitespace-pre-wrap">{selectedRequest.training_facilities}</p>
                            </div>
                            {selectedRequest.additional_info && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Informations supplémentaires</p>
                                    <p className="whitespace-pre-wrap">{selectedRequest.additional_info}</p>
                                </div>
                            )}
                            <div className="flex items-center justify-end pt-4 border-t">
                                <p className="text-sm text-gray-500">
                                    Reçue le {format(new Date(selectedRequest.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setRequestToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer la demande"
                message={`Êtes-vous sûr de vouloir supprimer la demande de ${requestToDelete?.company_name} ?`}
            />
        </AppLayout>
    );
}
