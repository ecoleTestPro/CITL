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
import { ArrowUpDown, Award, Building, Calendar, Eye, Mail, MapPin, Phone, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CertifiedTesterRegistration {
    id: number;
    full_name: string;
    address: string;
    date_of_birth: string;
    email: string;
    phone: string;
    certification_obtained: string;
    certificate_number: string;
    test_center: string;
    exam_date: string;
    consent: boolean;
    admin_notes: string | null;
    created_at: string;
}

interface Props {
    registrations: CertifiedTesterRegistration[];
}

export default function CertifiedTesterRegistrationsIndex({ registrations }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [registrationToDelete, setRegistrationToDelete] = useState<CertifiedTesterRegistration | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState<CertifiedTesterRegistration | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['registrations'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!registrationToDelete) return;

        router.delete(`/dashboard/certified-tester-registrations/${registrationToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Inscription supprimée avec succès');
                setShowDeleteModal(false);
                setRegistrationToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const columns: ColumnDef<CertifiedTesterRegistration>[] = [
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
            accessorKey: 'full_name',
            header: 'Nom complet',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.full_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'certification_obtained',
            header: 'Certification',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.certification_obtained}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">N° {row.original.certificate_number}</p>
                </div>
            ),
        },
        {
            accessorKey: 'exam_date',
            header: 'Date examen',
            cell: ({ row }) => <div className="text-sm">{format(new Date(row.original.exam_date), 'dd MMM yyyy', { locale: fr })}</div>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSelectedRegistration(row.original);
                            setShowDetailsModal(true);
                        }}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="Voir les détails"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            setRegistrationToDelete(row.original);
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
        data: registrations,
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
            <Head title="Inscriptions testeurs certifiés" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inscriptions testeurs certifiés</h1>
                        <p className="text-muted-foreground">
                            Gérez les inscriptions à la liste des testeurs certifiés CITL
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
                            {registrations.length} inscription(s)
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
                                            Aucune inscription
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
                        <DialogTitle>Détails de l'inscription</DialogTitle>
                    </DialogHeader>
                    {selectedRegistration && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Nom complet</p>
                                    <p className="font-medium">{selectedRegistration.full_name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {format(new Date(selectedRegistration.date_of_birth), 'dd MMMM yyyy', { locale: fr })}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <a href={`mailto:${selectedRegistration.email}`} className="text-blue-600 hover:underline">
                                            {selectedRegistration.email}
                                        </a>
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Téléphone</p>
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {selectedRegistration.phone}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Certification</p>
                                    <p className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        {selectedRegistration.certification_obtained}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Numéro de certificat</p>
                                    <p>{selectedRegistration.certificate_number}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Centre d'examen</p>
                                    <p className="flex items-center gap-2">
                                        <Building className="h-4 w-4" />
                                        {selectedRegistration.test_center}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Date d'examen</p>
                                    <p className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {format(new Date(selectedRegistration.exam_date), 'dd MMMM yyyy', { locale: fr })}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Adresse</p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {selectedRegistration.address}
                                </p>
                            </div>
                            {selectedRegistration.admin_notes && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Notes administrateur</p>
                                    <p className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">{selectedRegistration.admin_notes}</p>
                                </div>
                            )}
                            <div className="flex items-center justify-end pt-4 border-t">
                                <p className="text-sm text-gray-500">
                                    Reçue le {format(new Date(selectedRegistration.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
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
                    setRegistrationToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer l'inscription"
                message={`Êtes-vous sûr de vouloir supprimer l'inscription de ${registrationToDelete?.full_name} ?`}
            />
        </AppLayout>
    );
}
