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
import { ArrowUpDown, CheckCircle, Eye, Mail, Phone, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MembershipApplication {
    id: number;
    membership_type: 'new' | 'renewal';
    first_name: string;
    surname: string;
    phone: string;
    email: string;
    address: string;
    company: string;
    job_title: string;
    years_of_experience: string;
    membership_level: 'student' | 'professional' | 'expert';
    qualification: string | null;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

interface Props {
    applications: MembershipApplication[];
}

export default function MembershipApplicationsIndex({ applications }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState<MembershipApplication | null>(null);
    const [selectedApplication, setSelectedApplication] = useState<MembershipApplication | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleDelete = () => {
        if (!applicationToDelete) return;

        router.delete(`/dashboard/membership-applications/${applicationToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Demande supprimée avec succès');
                setShowDeleteModal(false);
                setApplicationToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const handleStatusChange = (id: number, status: 'approved' | 'rejected') => {
        router.post(`/dashboard/membership-applications/${id}/status`, { status }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Statut mis à jour: ${status === 'approved' ? 'Approuvé' : 'Rejeté'}`);
            },
            onError: () => {
                toast.error('Erreur lors de la mise à jour du statut');
            },
        });
    };

    const confirmDelete = (application: MembershipApplication) => {
        setApplicationToDelete(application);
        setShowDeleteModal(true);
    };

    const viewDetails = (application: MembershipApplication) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: 'default' | 'destructive' | 'outline' | 'secondary', label: string }> = {
            pending: { variant: 'outline', label: 'En attente' },
            approved: { variant: 'default', label: 'Approuvé' },
            rejected: { variant: 'destructive', label: 'Rejeté' },
        };
        const config = variants[status] || variants.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const getLevelBadge = (level: string) => {
        const colors: Record<string, string> = {
            student: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            professional: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            expert: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        };
        return (
            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${colors[level] || colors.student}`}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
        );
    };

    const columns: ColumnDef<MembershipApplication>[] = [
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
                    <p className="font-medium">{row.original.first_name} {row.original.surname}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.company}</p>
                </div>
            ),
        },
        {
            accessorKey: 'membership_type',
            header: 'Type',
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.getValue('membership_type') === 'new' ? 'Nouveau' : 'Renouvellement'}
                </Badge>
            ),
        },
        {
            accessorKey: 'membership_level',
            header: 'Niveau',
            cell: ({ row }) => getLevelBadge(row.getValue('membership_level')),
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
                            <button
                                onClick={() => handleStatusChange(row.original.id, 'approved')}
                                className="rounded p-1 text-green-600 transition-colors hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                title="Approuver"
                            >
                                <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleStatusChange(row.original.id, 'rejected')}
                                className="rounded p-1 text-orange-600 transition-colors hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                                title="Rejeter"
                            >
                                <XCircle className="h-4 w-4" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => viewDetails(row.original)}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="Voir les détails"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
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
        data: applications,
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
            <Head title="Demandes d'adhésion" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Demandes d'adhésion</h1>
                        <p className="text-muted-foreground">
                            Gérez les demandes d'adhésion au CITL
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
                            placeholder="Rechercher par nom, email, entreprise..."
                            className="w-96 rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {applications.length} demande{applications.length > 1 ? 's' : ''}
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
                                            Aucune demande d'adhésion trouvée
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

            {/* Details Modal */}
            {selectedApplication && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${showDetailsModal ? '' : 'hidden'}`}>
                    <div className="fixed inset-0 bg-black/50" onClick={() => setShowDetailsModal(false)}></div>
                    <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-bold">Détails de la demande</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Nom complet</p>
                                    <p>{selectedApplication.first_name} {selectedApplication.surname}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Type</p>
                                    <p>{selectedApplication.membership_type === 'new' ? 'Nouveau membre' : 'Renouvellement'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email</p>
                                    <p>{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Téléphone</p>
                                    <p>{selectedApplication.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Entreprise</p>
                                    <p>{selectedApplication.company}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Poste</p>
                                    <p>{selectedApplication.job_title}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Expérience</p>
                                    <p>{selectedApplication.years_of_experience}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Niveau</p>
                                    <p>{selectedApplication.membership_level}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Adresse</p>
                                    <p>{selectedApplication.address}</p>
                                </div>
                                {selectedApplication.qualification && (
                                    <div className="col-span-2">
                                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Qualification</p>
                                        <p>{selectedApplication.qualification}</p>
                                    </div>
                                )}
                                <div className="col-span-2">
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Statut</p>
                                    {getStatusBadge(selectedApplication.status)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button onClick={() => setShowDetailsModal(false)}>Fermer</Button>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setApplicationToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer la demande"
                message={`Êtes-vous sûr de vouloir supprimer la demande de ${applicationToDelete?.first_name} ${applicationToDelete?.surname} ?`}
            />
        </AppLayout>
    );
}
