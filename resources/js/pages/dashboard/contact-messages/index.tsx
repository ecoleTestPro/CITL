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
import { ArrowUpDown, Building2, Eye, Mail, MessageSquare, Phone, RefreshCw, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ContactMessage {
    id: number;
    civility: string | null;
    sender_name: string;
    sender_email: string;
    sender_phone: string | null;
    company: string | null;
    subject: string;
    message: string;
    admin_notes: string | null;
    created_at: string;
}

interface Props {
    messages: ContactMessage[];
}

const civilityLabels: Record<string, string> = {
    mr: 'M.',
    mrs: 'Mme',
    miss: 'Mlle',
};

export default function ContactMessagesIndex({ messages }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['messages'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!messageToDelete) return;

        router.delete(`/dashboard/contact-messages/${messageToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message supprimé avec succès');
                setShowDeleteModal(false);
                setMessageToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const viewDetails = (message: ContactMessage) => {
        setSelectedMessage(message);
        setShowDetailsModal(true);
    };

    const columns: ColumnDef<ContactMessage>[] = [
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-sm">{format(new Date(row.getValue('created_at')), 'dd MMM yyyy HH:mm', { locale: fr })}</div>,
        },
        {
            accessorKey: 'sender_name',
            header: 'Expéditeur',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">
                        {row.original.civility ? civilityLabels[row.original.civility] + ' ' : ''}
                        {row.original.sender_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.sender_email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Sujet',
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <p className="font-medium truncate">{row.original.subject}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{row.original.message.substring(0, 50)}...</p>
                </div>
            ),
        },
        {
            accessorKey: 'company',
            header: 'Entreprise',
            cell: ({ row }) => row.original.company ? (
                <span className="text-sm">{row.original.company}</span>
            ) : (
                <span className="text-sm text-gray-400">-</span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => viewDetails(row.original)}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="Voir le message"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            setMessageToDelete(row.original);
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
        data: messages,
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
            <Head title="Messages de contact" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Messages de contact</h1>
                        <p className="text-muted-foreground">Gérez les messages reçus via le formulaire de contact</p>
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
                        <div className="text-sm text-gray-600 dark:text-gray-400">{messages.length} message(s)</div>
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
                                            Aucun message
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
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Message de contact
                        </DialogTitle>
                    </DialogHeader>
                    {selectedMessage && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Expéditeur</p>
                                    <p className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {selectedMessage.civility ? civilityLabels[selectedMessage.civility] + ' ' : ''}
                                        {selectedMessage.sender_name}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        <a href={`mailto:${selectedMessage.sender_email}`} className="text-blue-600 hover:underline">
                                            {selectedMessage.sender_email}
                                        </a>
                                    </p>
                                </div>
                                {selectedMessage.sender_phone && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Téléphone</p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {selectedMessage.sender_phone}
                                        </p>
                                    </div>
                                )}
                                {selectedMessage.company && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-500">Entreprise</p>
                                        <p className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />
                                            {selectedMessage.company}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Sujet</p>
                                <p className="font-medium">{selectedMessage.subject}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Message</p>
                                <div className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                    {selectedMessage.message}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <Button
                                    onClick={() => window.open(`mailto:${selectedMessage.sender_email}?subject=Re: ${selectedMessage.subject}`)}
                                    className="gap-2"
                                >
                                    <Mail className="h-4 w-4" />
                                    Répondre par email
                                </Button>
                                <p className="text-sm text-gray-500">
                                    Reçu le {format(new Date(selectedMessage.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
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
                    setMessageToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer le message"
                message={`Êtes-vous sûr de vouloir supprimer le message de ${messageToDelete?.sender_name} ?`}
            />
        </AppLayout>
    );
}
