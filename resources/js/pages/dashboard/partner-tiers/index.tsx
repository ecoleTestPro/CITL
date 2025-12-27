import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowLeft, Edit, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface PartnerTier {
    id: number;
    name: string;
    name_en: string | null;
    slug: string;
    color: string;
    icon: string | null;
    description: string | null;
    description_en: string | null;
    is_active: boolean;
    partners_count: number;
    created_at: string;
}

interface Props {
    tiers: PartnerTier[];
}

interface FormData {
    name: string;
    name_en: string;
    color: string;
    icon: string;
    description: string;
    description_en: string;
    is_active: boolean;
}

export default function PartnerTiersIndex({ tiers }: Props) {
    const { t } = useTranslation();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tierToDelete, setTierToDelete] = useState<PartnerTier | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [tierToEdit, setTierToEdit] = useState<PartnerTier | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        name: '',
        name_en: '',
        color: '#e36c19',
        icon: '',
        description: '',
        description_en: '',
        is_active: true,
    });

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['tiers'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!tierToDelete) return;

        router.delete(`/dashboard/partner-tiers/${tierToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Catégorie supprimée avec succès');
                setShowDeleteModal(false);
                setTierToDelete(null);
            },
            onError: (errors) => {
                toast.error(errors.message || 'Erreur lors de la suppression');
            },
        });
    };

    const openCreateModal = () => {
        reset();
        setTierToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (tier: PartnerTier) => {
        setTierToEdit(tier);
        setData({
            name: tier.name,
            name_en: tier.name_en || '',
            color: tier.color,
            icon: tier.icon || '',
            description: tier.description || '',
            description_en: tier.description_en || '',
            is_active: tier.is_active,
        });
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setTierToEdit(null);
        reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (tierToEdit) {
            put(`/dashboard/partner-tiers/${tierToEdit.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Catégorie mise à jour avec succès');
                    closeFormModal();
                },
                onError: () => {
                    toast.error('Erreur lors de la mise à jour');
                },
            });
        } else {
            post('/dashboard/partner-tiers', {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Catégorie créée avec succès');
                    closeFormModal();
                },
                onError: () => {
                    toast.error('Erreur lors de la création');
                },
            });
        }
    };

    const handleToggleActive = (tier: PartnerTier) => {
        router.post(
            `/dashboard/partner-tiers/${tier.id}/toggle-active`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Statut mis à jour');
                },
                onError: () => {
                    toast.error('Erreur lors de la mise à jour du statut');
                },
            }
        );
    };

    const columns: ColumnDef<PartnerTier>[] = [
        {
            accessorKey: 'name',
            header: 'Nom',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: row.original.color }} />
                    <div>
                        <p className="font-medium">{row.original.name}</p>
                        {row.original.name_en && <p className="text-sm text-gray-500">{row.original.name_en}</p>}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'partners_count',
            header: 'Partenaires',
            cell: ({ row }) => (
                <Badge variant="secondary">{row.original.partners_count} partenaire(s)</Badge>
            ),
        },
        {
            accessorKey: 'is_active',
            header: 'Statut',
            cell: ({ row }) => (
                <Switch checked={row.original.is_active} onCheckedChange={() => handleToggleActive(row.original)} />
            ),
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
                            setTierToDelete(row.original);
                            setShowDeleteModal(true);
                        }}
                        className="rounded p-1 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        title="Supprimer"
                        disabled={row.original.partners_count > 0}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: tiers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: { sorting },
    });

    return (
        <AppLayout>
            <Head title="Catégories de partenaires" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/dashboard/partners">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Catégories de partenaires</h1>
                            <p className="text-muted-foreground">Gérez les niveaux de partenariat (Platine, Gold, Silver, etc.)</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
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
                                        Aucune catégorie de partenaire
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
            </div>

            {/* Form Modal */}
            <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{tierToEdit ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom (FR) *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ex: Platine"
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name_en">Nom (EN)</Label>
                                <Input
                                    id="name_en"
                                    value={data.name_en}
                                    onChange={(e) => setData('name_en', e.target.value)}
                                    placeholder="Ex: Platinum"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Couleur</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="color"
                                    type="color"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                    className="h-10 w-14 cursor-pointer p-1"
                                />
                                <Input value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="#e36c19" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (FR)</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description de cette catégorie..."
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description_en">Description (EN)</Label>
                            <Textarea
                                id="description_en"
                                value={data.description_en}
                                onChange={(e) => setData('description_en', e.target.value)}
                                placeholder="Description in English..."
                                rows={2}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                            <Label htmlFor="is_active">Actif</Label>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={closeFormModal}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : tierToEdit ? 'Mettre à jour' : 'Créer'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setTierToDelete(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer la catégorie"
                message={`Êtes-vous sûr de vouloir supprimer la catégorie "${tierToDelete?.name}" ?`}
            />
        </AppLayout>
    );
}
