import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import RichTextEditor from '@/components/rich-text-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
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
import { ArrowRight, Edit, ExternalLink, FolderCog, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface PartnerTier {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Partner {
    id: number;
    partner_tier_id: number;
    name: string;
    slug: string;
    logo: string | null;
    website: string | null;
    description: string | null;
    description_en: string | null;
    is_active: boolean;
    partnership_start_date: string | null;
    partnership_end_date: string | null;
    created_at: string;
    tier: PartnerTier;
}

interface Props {
    partners: Partner[];
    tiers: PartnerTier[];
    filters: {
        tier?: string;
        search?: string;
        is_active?: string;
    };
}

export default function PartnersIndex({ partners, tiers, filters }: Props) {
    const { t } = useTranslation();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [partnerToEdit, setPartnerToEdit] = useState<Partner | null>(null);
    const [selectedTier, setSelectedTier] = useState<string>(filters.tier || 'all');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('fr');

    const { data, setData, post, processing, errors, reset } = useForm({
        partner_tier_id: '',
        name: '',
        logo: null as File | null,
        website: '',
        description: '',
        description_en: '',
        is_active: true,
    });

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['partners'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!partnerToDelete) return;

        router.delete(`/dashboard/partners/${partnerToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Partenaire supprimé avec succès');
                setShowDeleteModal(false);
                setPartnerToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const openCreateModal = () => {
        reset();
        setLogoPreview(null);
        setPartnerToEdit(null);
        setActiveTab('fr');
        setShowFormModal(true);
    };

    const openEditModal = (partner: Partner) => {
        setPartnerToEdit(partner);
        setLogoPreview(partner.logo ? `/storage/${partner.logo}` : null);
        setData({
            partner_tier_id: String(partner.partner_tier_id),
            name: partner.name,
            logo: null,
            website: partner.website || '',
            description: partner.description || '',
            description_en: partner.description_en || '',
            is_active: partner.is_active,
        });
        setActiveTab('fr');
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setPartnerToEdit(null);
        setLogoPreview(null);
        setActiveTab('fr');
        reset();
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('partner_tier_id', data.partner_tier_id);
        formData.append('name', data.name);
        if (data.logo) formData.append('logo', data.logo);
        formData.append('website', data.website);
        formData.append('description', data.description);
        formData.append('description_en', data.description_en);
        formData.append('is_active', data.is_active ? '1' : '0');

        const url = partnerToEdit ? `/dashboard/partners/${partnerToEdit.id}` : '/dashboard/partners';

        if (partnerToEdit) {
            formData.append('_method', 'PUT');
        }

        router.post(url, formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(partnerToEdit ? 'Partenaire mis à jour avec succès' : 'Partenaire créé avec succès');
                closeFormModal();
            },
            onError: () => {
                toast.error("Erreur lors de l'enregistrement");
            },
        });
    };

    const handleToggleActive = (partner: Partner) => {
        router.post(
            `/dashboard/partners/${partner.id}/toggle-active`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Statut mis à jour');
                },
                onError: () => {
                    toast.error('Erreur lors de la mise à jour du statut');
                },
            },
        );
    };

    // Quick tier change function
    const handleQuickTierChange = (partner: Partner, newTierId: number) => {
        const formData = new FormData();
        formData.append('partner_tier_id', String(newTierId));
        formData.append('name', partner.name);
        formData.append('website', partner.website || '');
        formData.append('description', partner.description || '');
        formData.append('description_en', partner.description_en || '');
        formData.append('is_active', partner.is_active ? '1' : '0');
        formData.append('_method', 'PUT');

        router.post(`/dashboard/partners/${partner.id}`, formData, {
            preserveScroll: true,
            onSuccess: () => {
                const newTier = tiers.find((t) => t.id === newTierId);
                toast.success(`${partner.name} déplacé vers ${newTier?.name}`);
            },
            onError: () => {
                toast.error('Erreur lors du changement de catégorie');
            },
        });
    };

    const handleFilterChange = (tier: string) => {
        setSelectedTier(tier);
        const params: Record<string, string> = {};
        if (tier !== 'all') params.tier = tier;
        if (globalFilter) params.search = globalFilter;

        router.get('/dashboard/partners', params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const columns: ColumnDef<Partner>[] = [
        {
            accessorKey: 'name',
            header: 'Partenaire',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    {row.original.logo ? (
                        <img
                            src={`/storage/${row.original.logo}`}
                            alt={row.original.name}
                            className="h-10 w-10 rounded bg-gray-100 object-contain"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 text-sm font-medium text-gray-500">
                            {row.original.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <p className="font-medium">{row.original.name}</p>
                        {row.original.website && (
                            <a
                                href={row.original.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                            >
                                <ExternalLink className="h-3 w-3" />
                                Site web
                            </a>
                        )}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'tier',
            header: 'Catégorie',
            cell: ({ row }) => (
                <div className="flex flex-col gap-2">
                    <Badge style={{ backgroundColor: row.original.tier.color, color: '#fff' }}>{row.original.tier.name}</Badge>
                    {/* Quick tier change buttons */}
                    <div className="flex flex-wrap gap-1">
                        {tiers
                            .filter((t) => t.id !== row.original.partner_tier_id)
                            .map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => handleQuickTierChange(row.original, tier.id)}
                                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    title={`Déplacer vers ${tier.name}`}
                                >
                                    <ArrowRight className="h-3 w-3" />
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tier.color }} />
                                </button>
                            ))}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'is_active',
            header: 'Statut',
            cell: ({ row }) => <Switch checked={row.original.is_active} onCheckedChange={() => handleToggleActive(row.original)} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openEditModal(row.original)}
                        className="rounded p-1 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="Modifier"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            setPartnerToDelete(row.original);
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
        data: partners,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        state: { sorting, columnFilters, globalFilter },
    });

    return (
        <AppLayout>
            <Head title="Partenaires" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Partenaires</h1>
                        <p className="text-muted-foreground">Gérez les partenaires de CITL</p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="gap-2">
                            <Link href="/dashboard/partner-tiers">
                                <FolderCog className="h-4 w-4" />
                                Catégories
                            </Link>
                        </Button>
                        <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm" className="gap-2">
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Ajouter
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercher..." className="pl-9" />
                    </div>
                    <Select value={selectedTier} onValueChange={handleFilterChange}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filtrer par catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les catégories</SelectItem>
                            {tiers.map((tier) => (
                                <SelectItem key={tier.id} value={String(tier.id)}>
                                    {tier.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{partners.length} partenaire(s)</div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300"
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
                                        Aucun partenaire
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
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Précédent
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Modal with Tabs */}
            <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{partnerToEdit ? 'Modifier le partenaire' : 'Nouveau partenaire'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="partner_tier_id">Catégorie *</Label>
                                <Select value={data.partner_tier_id} onValueChange={(value) => setData('partner_tier_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tiers.map((tier) => (
                                            <SelectItem key={tier.id} value={String(tier.id)}>
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tier.color }} />
                                                    {tier.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.partner_tier_id && <p className="text-sm text-red-500">{errors.partner_tier_id}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nom du partenaire"
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo</Label>
                            <div className="flex items-center gap-4">
                                {logoPreview && <img src={logoPreview} alt="Preview" className="h-16 w-16 rounded bg-gray-100 object-contain" />}
                                <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="flex-1" />
                            </div>
                            {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                        </div>

                        {/* Website */}
                        <div className="space-y-2">
                            <Label htmlFor="website">Site web</Label>
                            <Input
                                id="website"
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>

                        {/* Description with Tabs for FR/EN */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="fr" className="gap-2">
                                        <span className="text-lg">🇫🇷</span> Français
                                    </TabsTrigger>
                                    <TabsTrigger value="en" className="gap-2">
                                        <span className="text-lg">🇬🇧</span> English
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="fr" className="mt-3">
                                    <RichTextEditor
                                        content={data.description}
                                        onChange={(content) => setData('description', content)}
                                        placeholder="Description du partenaire en français..."
                                    />
                                </TabsContent>
                                <TabsContent value="en" className="mt-3">
                                    <RichTextEditor
                                        content={data.description_en}
                                        onChange={(content) => setData('description_en', content)}
                                        placeholder="Partner description in English..."
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Active Switch */}
                        <div className="flex items-center gap-2">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                            <Label htmlFor="is_active">Actif</Label>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={closeFormModal}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : partnerToEdit ? 'Mettre à jour' : 'Créer'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setPartnerToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer le partenaire"
                message={`Êtes-vous sûr de vouloir supprimer le partenaire "${partnerToDelete?.name}" ?`}
            />
        </AppLayout>
    );
}
