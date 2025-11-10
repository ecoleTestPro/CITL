import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Edit, Menu as MenuIcon } from 'lucide-react';

interface Menu {
    id: number;
    name: string;
    location: string;
    is_active: boolean;
    created_at: string;
}

interface Props {
    menus: {
        data: Menu[];
        current_page: number;
        last_page: number;
    };
}

export default function Index({ menus }: Props) {
    const columns = useMemo<ColumnDef<Menu>[]>(
        () => [
            {
                accessorKey: 'name',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Nom" />
                ),
                cell: ({ row }) => (
                    <div className="font-medium text-gray-900">
                        {row.getValue('name')}
                    </div>
                ),
            },
            {
                accessorKey: 'location',
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Emplacement"
                    />
                ),
                cell: ({ row }) => {
                    const location = row.getValue('location') as string;
                    const locationLabels: Record<string, string> = {
                        header: 'En-tête',
                        footer: 'Pied de page',
                        sidebar: 'Barre latérale',
                    };
                    return (
                        <div className="text-sm text-gray-600">
                            {locationLabels[location] || location}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'is_active',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Statut" />
                ),
                cell: ({ row }) => {
                    const isActive = row.getValue('is_active') as boolean;
                    return (
                        <Badge
                            variant={isActive ? 'default' : 'secondary'}
                            className={
                                isActive
                                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                    : ''
                            }
                        >
                            {isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                    );
                },
            },
            {
                accessorKey: 'created_at',
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Date de création"
                    />
                ),
                cell: ({ row }) => {
                    const date = new Date(row.getValue('created_at'));
                    return (
                        <div className="text-sm text-gray-600">
                            {date.toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const menu = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 hover:bg-orange-50 hover:text-orange-600"
                            >
                                <Link href={`/cms/menus/${menu.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                    <span className="ml-2">Éditer</span>
                                </Link>
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <AppLayout>
            <Head title="Menus CMS" />
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Menus
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Gérez les menus de navigation de votre site
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        <Link href="/cms/menus/create">
                            <span className="text-lg">+</span>
                            <span className="ml-2">Nouveau menu</span>
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={menus.data}
                    searchKey="name"
                    searchPlaceholder="Rechercher par nom..."
                />
            </div>
        </AppLayout>
    );
}
