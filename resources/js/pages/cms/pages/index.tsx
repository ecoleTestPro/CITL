import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Edit, Eye } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    created_at: string;
}

interface Props {
    pages: {
        data: Page[];
        current_page: number;
        last_page: number;
    };
}

export default function Index({ pages }: Props) {
    const columns = useMemo<ColumnDef<Page>[]>(
        () => [
            {
                accessorKey: 'title',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Titre" />
                ),
                cell: ({ row }) => (
                    <div className="font-medium text-gray-900">
                        {row.getValue('title')}
                    </div>
                ),
            },
            {
                accessorKey: 'slug',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Slug" />
                ),
                cell: ({ row }) => (
                    <div className="text-sm text-gray-600">
                        /{row.getValue('slug')}
                    </div>
                ),
            },
            {
                accessorKey: 'status',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Statut" />
                ),
                cell: ({ row }) => {
                    const status = row.getValue('status') as string;
                    return (
                        <Badge
                            variant={
                                status === 'published' ? 'default' : 'secondary'
                            }
                            className={
                                status === 'published'
                                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                    : ''
                            }
                        >
                            {status === 'published' ? 'Publié' : 'Brouillon'}
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
                    const page = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 hover:bg-orange-50 hover:text-orange-600"
                            >
                                <Link href={`/${page.slug}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                    <span className="ml-2">Voir</span>
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 hover:bg-orange-50 hover:text-orange-600"
                            >
                                <Link href={`/cms/pages/${page.id}/edit`}>
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
            <Head title="Pages CMS" />
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Pages
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Gérez les pages de contenu de votre site
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-orange-600 hover:bg-orange-700"
                    >
                        <Link href="/cms/pages/create">
                            <span className="text-lg">+</span>
                            <span className="ml-2">Nouvelle page</span>
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={pages.data}
                    searchKey="title"
                    searchPlaceholder="Rechercher par titre..."
                />
            </div>
        </AppLayout>
    );
}
