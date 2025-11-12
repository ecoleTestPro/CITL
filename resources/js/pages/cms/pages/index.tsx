import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Edit, Eye, Home } from 'lucide-react';
import type { Page, PageTypesMap } from '@/types/cms';

interface Props {
    pages: {
        data: Page[];
        current_page: number;
        last_page: number;
    };
    pageTypes: PageTypesMap;
}

export default function Index({ pages, pageTypes }: Props) {
    const handleSetHomepage = (pageId: number) => {
        if (confirm('Voulez-vous définir cette page comme page d\'accueil ?')) {
            router.post(`/cms/pages/${pageId}/set-homepage`, {}, {
                preserveScroll: true,
            });
        }
    };

    const columns = useMemo<ColumnDef<Page>[]>(
        () => [
            {
                accessorKey: 'title',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Titre" />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                            {row.getValue('title')}
                        </span>
                        {row.original.is_homepage && (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                <Home className="mr-1 h-3 w-3" />
                                Accueil
                            </Badge>
                        )}
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
                accessorKey: 'page_type',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Type" />
                ),
                cell: ({ row }) => {
                    const type = row.getValue('page_type') as string;
                    const typeLabel = pageTypes[type] || type;
                    return (
                        <Badge
                            variant="outline"
                            className={
                                type === 'custom'
                                    ? 'border-gray-300 text-gray-700'
                                    : 'border-purple-300 bg-purple-50 text-purple-700'
                            }
                        >
                            {typeLabel}
                        </Badge>
                    );
                },
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
                            {!page.is_homepage && page.status === 'published' && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSetHomepage(page.id)}
                                    className="h-8 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    <Home className="h-4 w-4" />
                                    <span className="ml-2">Définir comme accueil</span>
                                </Button>
                            )}
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
        [pageTypes],
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
