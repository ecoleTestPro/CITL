import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, ArrowUpDown, CheckCircle, Clock, Eye, Mail, RefreshCw, Send, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface EmailLog {
    id: number;
    mailable_type: string;
    mailable_id: string | null;
    request_type: string;
    recipient_email: string;
    recipient_name: string | null;
    sender_email: string | null;
    sender_name: string | null;
    subject: string;
    status: 'pending' | 'sent' | 'failed';
    error_message: string | null;
    metadata: Record<string, unknown> | null;
    sent_at: string | null;
    created_at: string;
}

interface EmailStats {
    total: number;
    sent: number;
    failed: number;
    by_type: Record<string, number>;
}

interface Props {
    logs: {
        data: EmailLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: EmailStats;
    requestTypes: Record<string, string>;
    statuses: Record<string, string>;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    sent: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const statusIcons = {
    pending: Clock,
    sent: CheckCircle,
    failed: XCircle,
};

const requestTypeColors: Record<string, string> = {
    exam_registration: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    accreditation: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    membership: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    certified_tester: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    contact: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

export default function EmailLogsIndex({ logs, stats, requestTypes, statuses }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState<EmailLog | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['logs', 'stats'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleFilterChange = () => {
        router.get('/dashboard/email-logs', {
            status: statusFilter !== 'all' ? statusFilter : undefined,
            request_type: typeFilter !== 'all' ? typeFilter : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const columns: ColumnDef<EmailLog>[] = [
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => (
                <div className="text-sm">
                    {format(new Date(row.getValue('created_at')), 'dd MMM yyyy HH:mm', { locale: fr })}
                </div>
            ),
        },
        {
            accessorKey: 'request_type',
            header: 'Type',
            cell: ({ row }) => (
                <Badge className={requestTypeColors[row.original.request_type] || 'bg-gray-100 text-gray-800'}>
                    {requestTypes[row.original.request_type] || row.original.request_type}
                </Badge>
            ),
        },
        {
            accessorKey: 'recipient_email',
            header: 'Destinataire',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.recipient_name || 'N/A'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{row.original.recipient_email}</p>
                </div>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Sujet',
            cell: ({ row }) => (
                <div className="max-w-xs truncate text-sm" title={row.original.subject}>
                    {row.original.subject}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Statut',
            cell: ({ row }) => {
                const StatusIcon = statusIcons[row.original.status];
                return (
                    <Badge className={`${statusColors[row.original.status]} flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {statuses[row.original.status]}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <button
                    onClick={() => {
                        setSelectedLog(row.original);
                        setShowDetailsModal(true);
                    }}
                    className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    title="Voir les détails"
                >
                    <Eye className="h-4 w-4" />
                </button>
            ),
        },
    ];

    const table = useReactTable({
        data: logs.data,
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

    const successRate = stats.total > 0 ? Math.round((stats.sent / stats.total) * 100) : 0;

    return (
        <AppLayout>
            <Head title="Logs des emails" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Logs des emails</h1>
                        <p className="text-muted-foreground">
                            Historique et suivi des emails envoyés par le système
                        </p>
                    </div>
                    <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm" className="gap-2">
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Actualiser
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total envoyés</CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Succès</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Échecs</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taux de succès</CardTitle>
                            <Send className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{successRate}%</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full space-y-4">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Rechercher..."
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); }}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Tous les statuts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                {Object.entries(statuses).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={typeFilter} onValueChange={(value) => { setTypeFilter(value); }}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Tous les types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les types</SelectItem>
                                {Object.entries(requestTypes).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="secondary" size="sm" onClick={handleFilterChange}>
                            Filtrer
                        </Button>
                        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                            {logs.total} email(s)
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
                                            Aucun log d'email
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                                row.original.status === 'failed' ? 'bg-red-50/30 dark:bg-red-900/10' : ''
                                            }`}
                                        >
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
                    {logs.last_page > 1 && (
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Page {logs.current_page} sur {logs.last_page}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => router.get('/dashboard/email-logs', { page: logs.current_page - 1 }, { preserveState: true })}
                                    disabled={logs.current_page <= 1}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Précédent
                                </button>
                                <button
                                    onClick={() => router.get('/dashboard/email-logs', { page: logs.current_page + 1 }, { preserveState: true })}
                                    disabled={logs.current_page >= logs.last_page}
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
                            <Mail className="h-5 w-5" />
                            Détails du log email
                        </DialogTitle>
                    </DialogHeader>
                    {selectedLog && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Type de demande</p>
                                    <Badge className={requestTypeColors[selectedLog.request_type] || 'bg-gray-100'}>
                                        {requestTypes[selectedLog.request_type] || selectedLog.request_type}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Statut</p>
                                    <Badge className={statusColors[selectedLog.status]}>
                                        {statuses[selectedLog.status]}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Destinataire</p>
                                    <p>{selectedLog.recipient_name || 'N/A'}</p>
                                    <p className="text-sm text-gray-500">{selectedLog.recipient_email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Expéditeur</p>
                                    <p>{selectedLog.sender_name || 'Système'}</p>
                                    <p className="text-sm text-gray-500">{selectedLog.sender_email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Sujet</p>
                                <p className="font-medium">{selectedLog.subject}</p>
                            </div>
                            {/* <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Classe Mailable</p>
                                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    {selectedLog.mailable_type}
                                </p>
                            </div> */}
                            {selectedLog.error_message && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        Message d'erreur
                                    </p>
                                    <p className="text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded">
                                        {selectedLog.error_message}
                                    </p>
                                </div>
                            )}
                            {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Métadonnées</p>
                                    <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto">
                                        {JSON.stringify(selectedLog.metadata, null, 2)}
                                    </pre>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t text-sm text-gray-500">
                                <span>
                                    Créé le {format(new Date(selectedLog.created_at), 'dd MMMM yyyy à HH:mm:ss', { locale: fr })}
                                </span>
                                {selectedLog.sent_at && (
                                    <span>
                                        Envoyé le {format(new Date(selectedLog.sent_at), 'dd MMMM yyyy à HH:mm:ss', { locale: fr })}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
