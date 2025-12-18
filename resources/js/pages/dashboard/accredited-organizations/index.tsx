import { AccreditedOrganizationFormModal } from '@/components/accredited-organizations/accredited-organization-form-modal';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
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
import { ArrowUpDown, Edit, ExternalLink, Globe, Mail, Phone, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AccreditedOrganization {
    id: number;
    name: string;
    country: string;
    city: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    logo: string | null;
    description: string | null;
    certifications: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    organizations: {
        data: AccreditedOrganization[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        country: string | null;
        search: string | null;
        is_active: string | null;
    };
    countries: string[];
}

export default function AccreditedOrganizationsIndex({ organizations, filters, countries }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [countryFilter, setCountryFilter] = useState(filters.country || '');
    const [statusFilter, setStatusFilter] = useState(filters.is_active || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [organizationToDelete, setOrganizationToDelete] = useState<AccreditedOrganization | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [organizationToEdit, setOrganizationToEdit] = useState<AccreditedOrganization | null>(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['organizations'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!organizationToDelete) return;

        router.delete(`/dashboard/accredited-organizations/${organizationToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Organisme supprimé avec succès');
                setShowDeleteModal(false);
                setOrganizationToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const confirmDelete = (organization: AccreditedOrganization) => {
        setOrganizationToDelete(organization);
        setShowDeleteModal(true);
    };

    const openCreateModal = () => {
        setOrganizationToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (organization: AccreditedOrganization) => {
        setOrganizationToEdit(organization);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setOrganizationToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['organizations', 'countries'] });
    };

    // Auto-apply filters when they change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/dashboard/accredited-organizations',
                {
                    search: globalFilter || undefined,
                    country: countryFilter || undefined,
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
    }, [globalFilter, countryFilter, statusFilter]);

    const columns: ColumnDef<AccreditedOrganization>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Organisme
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => {
                const org = row.original;
                // Helper to get the correct image URL
                const getImageSrc = (src: string) => {
                    if (src.startsWith('http') || src.startsWith('https')) return src;
                    if (src.startsWith('/storage')) return src;
                    return `/storage/${src}`;
                };
                return (
                    <div className="flex items-center gap-3">
                        {org.logo ? (
                            <img src={getImageSrc(org.logo)} alt={org.name} className="h-10 w-10 rounded object-cover" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
                                <Globe className="h-5 w-5" />
                            </div>
                        )}
                        <div>
                            <div className="font-medium">{org.name}</div>
                            {org.city && <div className="text-sm text-gray-500">{org.city}</div>}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'country',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Pays
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <Badge variant="secondary">{row.getValue('country')}</Badge>,
        },
        {
            accessorKey: 'contact',
            header: 'Contact',
            cell: ({ row }) => {
                const org = row.original;
                return (
                    <div className="space-y-1">
                        {org.website && (
                            <a
                                href={org.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                            >
                                <ExternalLink className="h-3 w-3" />
                                Site web
                            </a>
                        )}
                        {org.email && (
                            <a href={`mailto:${org.email}`} className="flex items-center gap-1 text-sm text-gray-600 hover:underline dark:text-gray-400">
                                <Mail className="h-3 w-3" />
                                {org.email}
                            </a>
                        )}
                        {org.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="h-3 w-3" />
                                {org.phone}
                            </div>
                        )}
                        {!org.website && !org.email && !org.phone && <span className="text-sm text-gray-400">-</span>}
                    </div>
                );
            },
        },
        {
            accessorKey: 'certifications',
            header: 'Certifications',
            cell: ({ row }) => {
                const certs = row.getValue('certifications') as string | null;
                if (!certs) return <span className="text-sm text-gray-400">-</span>;

                const containsHtml = /<[^>]+>/.test(certs);

                if (containsHtml) {
                    return <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: certs }} />;
                }

                // Fallback: plain text with newlines
                return (
                    <div className="space-y-1">
                        {certs.split(/\r?\n/).map((line, idx) => (
                            line.trim() ? (
                                <div key={idx} className="text-sm text-gray-700">
                                    {line}
                                </div>
                            ) : null
                        ))}
                    </div>
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
                const organization = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(organization)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => confirmDelete(organization)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: organizations.data,
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
            <Head title="Organismes de formation accrédités" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Organismes de formation accrédités</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Total: {organizations.total} organismes</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un organisme
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Rechercher</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Rechercher un organisme..."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Pays</label>
                            <Select value={countryFilter || 'all'} onValueChange={(value) => setCountryFilter(value === 'all' ? '' : value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les pays" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les pays</SelectItem>
                                    {countries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                            {country}
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
                                            Aucun organisme trouvé
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
                            Page {organizations.current_page} sur {organizations.last_page}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/accredited-organizations?page=${organizations.current_page - 1}`)}
                                disabled={organizations.current_page === 1}
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(`/dashboard/accredited-organizations?page=${organizations.current_page + 1}`)}
                                disabled={organizations.current_page === organizations.last_page}
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
                title="Supprimer l'organisme"
                message={`Êtes-vous sûr de vouloir supprimer "${organizationToDelete?.name}" ? Cette action est irréversible.`}
            />

            <AccreditedOrganizationFormModal
                isOpen={showFormModal}
                onClose={closeFormModal}
                organization={organizationToEdit}
                onSuccess={handleFormSuccess}
            />
        </AppLayout>
    );
}
