import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { ExamRegistrationDetailsModal } from '@/components/exams/exam-registration-details-modal';
import { Badge } from '@/components/ui/badge';
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
import { ArrowUpDown, Eye, Mail, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [registrationToDelete, setRegistrationToDelete] = useState<ExamRegistration | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState<ExamRegistration | null>(null);

    const handleDelete = () => {
        if (!registrationToDelete) return;

        router.delete(`/dashboard/exam-registrations/${registrationToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('exam.dashboard.delete_success'));
                setShowDeleteModal(false);
                setRegistrationToDelete(null);
            },
            onError: () => {
                toast.error(t('exam.dashboard.delete_error'));
            },
        });
    };

    const confirmDelete = (registration: ExamRegistration) => {
        setRegistrationToDelete(registration);
        setShowDeleteModal(true);
    };

    const viewDetails = (registration: ExamRegistration) => {
        setSelectedRegistration(registration);
        setShowDetailsModal(true);
    };

    const columns: ColumnDef<ExamRegistration>[] = [
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    {t('exam.dashboard.date')}
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-sm">{format(new Date(row.getValue('created_at')), 'dd MMM yyyy', { locale: fr })}</div>,
        },
        {
            accessorKey: 'first_name',
            header: t('exam.dashboard.candidate'),
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.first_name} {row.original.last_name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.company}</p>
                </div>
            ),
        },
        {
            accessorKey: 'exam_name',
            header: t('exam.dashboard.exam'),
            cell: ({ row }) => <div className="text-sm">{row.getValue('exam_name')}</div>,
        },
        {
            accessorKey: 'email',
            header: t('exam.dashboard.contact'),
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
            header: t('exam.dashboard.type'),
            cell: ({ row }) => (
                <Badge variant="outline">
                    {row.getValue('purchase_type') === 'individual' ? t('exam.dashboard.individual') : t('exam.dashboard.group')}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: t('exam.dashboard.actions'),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => viewDetails(row.original)}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title={t('exam.dashboard.view_details')}
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => confirmDelete(row.original)}
                        className="rounded p-1 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        title={t('exam.dashboard.delete')}
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
            <Head title={t('exam.dashboard.page_title')} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('exam.dashboard.title')}</h1>
                        <p className="text-muted-foreground">
                            {t('exam.dashboard.subtitle')}
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
                            placeholder={t('exam.dashboard.search_placeholder')}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {registrations.length} {t('exam.dashboard.registration_count', { count: registrations.length })}
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
                                            {t('exam.dashboard.no_registrations')}
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
                                {t('exam.dashboard.page_info', {
                                    current: table.getState().pagination.pageIndex + 1,
                                    total: table.getPageCount()
                                })}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    {t('exam.dashboard.previous')}
                                </button>
                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    {t('exam.dashboard.next')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ExamRegistrationDetailsModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                registration={selectedRegistration}
            />

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setRegistrationToDelete(null);
                }}
                onConfirm={handleDelete}
                title={t('exam.dashboard.delete_modal_title')}
                message={t('exam.dashboard.delete_modal_description', {
                    name: `${registrationToDelete?.first_name} ${registrationToDelete?.last_name}`
                })}
            />
        </AppLayout>
    );
}
