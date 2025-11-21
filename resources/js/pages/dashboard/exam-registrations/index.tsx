import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ArrowUpDown, CheckCircle, Clock, Mail, Phone, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ExamRegistration {
    id: number;
    purchase_type: string;
    exam_name: string;
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    phone: string;
    email: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    postal_code: string;
    exam_format: string;
    register_in_registry: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

interface Props {
    registrations: ExamRegistration[];
}

export default function ExamRegistrationsIndex({ registrations }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [registrationToDelete, setRegistrationToDelete] = useState<ExamRegistration | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Confirmé
                    </Badge>
                );
            case 'cancelled':
                return (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        <XCircle className="mr-1 h-3 w-3" />
                        Annulé
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        <Clock className="mr-1 h-3 w-3" />
                        En attente
                    </Badge>
                );
        }
    };

    const handleStatusChange = (id: number, status: string) => {
        router.post(
            `/dashboard/exam-registrations/${id}/status`,
            { status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Statut mis à jour avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la mise à jour du statut');
                },
            }
        );
    };

    const handleDelete = () => {
        if (!registrationToDelete) return;

        router.delete(`/dashboard/exam-registrations/${registrationToDelete.id}`, {
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

    const confirmDelete = (registration: ExamRegistration) => {
        setRegistrationToDelete(registration);
        setShowDeleteModal(true);
    };

    const columns: ColumnDef<ExamRegistration>[] = [
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
            accessorKey: 'first_name',
            header: 'Candidat',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.first_name} {row.original.last_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.company}</p>
                </div>
            ),
        },
        {
            accessorKey: 'exam_name',
            header: 'Examen',
            cell: ({ row }) => <div className="text-sm">{row.getValue('exam_name')}</div>,
        },
        {
            accessorKey: 'email',
            header: 'Contact',
            cell: ({ row }) => (
                <div className="space-y-1">
                    <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-3 w-3" />
                        <a href={`mailto:${row.getValue('email')}`} className="text-blue-600 hover:underline dark:text-blue-400">
                            {row.getValue('email')}
                        </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="mr-2 h-3 w-3" />
                        {row.original.phone}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'purchase_type',
            header: 'Type',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.getValue('purchase_type') === 'individual' ? 'Individuel' : 'Groupe'}
                </Badge>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Statut',
            cell: ({ row }) => getStatusBadge(row.getValue('status')),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {row.original.status === 'pending' && (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(row.original.id, 'confirmed')}
                            >
                                Confirmer
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(row.original.id, 'cancelled')}
                            >
                                Annuler
                            </Button>
                        </>
                    )}
                    <button
                        onClick={() => confirmDelete(row.original)}
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
            <Head title="Inscriptions aux Examens - Dashboard" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Inscriptions aux Examens</h1>
                        <p className="text-muted-foreground">
                            Gérez les inscriptions aux examens ISTQB
                        </p>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    {/* Search */}
                    <div className="flex items-center justify-between">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Rechercher..."
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {registrations.length} inscription{registrations.length > 1 ? 's' : ''}
                        </div>
                    </div>

                    {/* Table */}
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
                                            Aucune inscription trouvée
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

                    {/* Pagination */}
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

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setRegistrationToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer l'inscription"
                description={`Êtes-vous sûr de vouloir supprimer l'inscription de ${registrationToDelete?.first_name} ${registrationToDelete?.last_name} ? Cette action est irréversible.`}
            />
        </AppLayout>
    );
}
