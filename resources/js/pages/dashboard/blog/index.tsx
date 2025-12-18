import { BlogFormModal } from '@/components/blog/blog-form-modal';
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
import { ArrowUpDown, Edit, Eye, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    blog_category_id: number | null;
    category: {
        id: number;
        name: string;
    } | null;
    author: {
        id: number;
        name: string;
    };
    tags: string[] | null;
    views: number;
    read_time: number;
    is_published: boolean;
    published_at: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string[] | null;
    created_at: string;
    updated_at: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    blogs: {
        data: Blog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        category_id: string | null;
        search: string | null;
        is_published: string | null;
    };
}

export default function BlogIndex({ blogs, categories, filters }: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.is_published || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [blogToEdit, setBlogToEdit] = useState<Blog | null>(null);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: ['blogs'],
            onFinish: () => {
                setIsRefreshing(false);
                toast.success('Liste actualisée');
            },
        });
    };

    const handleDelete = () => {
        if (!blogToDelete) return;

        router.delete(`/dashboard/blog/${blogToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Article supprimé avec succès');
                setShowDeleteModal(false);
                setBlogToDelete(null);
            },
            onError: () => {
                toast.error('Erreur lors de la suppression');
            },
        });
    };

    const confirmDelete = (blog: Blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
    };

    const openCreateModal = () => {
        setBlogToEdit(null);
        setShowFormModal(true);
    };

    const openEditModal = (blog: Blog) => {
        setBlogToEdit(blog);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setBlogToEdit(null);
    };

    const handleFormSuccess = () => {
        router.reload({ only: ['blogs'] });
    };

    // Auto-apply filters when they change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/dashboard/blog',
                {
                    search: globalFilter || undefined,
                    category_id: categoryFilter || undefined,
                    is_published: statusFilter || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timeoutId);
    }, [globalFilter, categoryFilter, statusFilter]);

    const handlePreview = (slug: string) => {
        window.open(`/blog/${slug}`, '_blank');
    };

    const columns: ColumnDef<Blog>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Titre
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue('title')}</div>
                    <div className="text-xs text-gray-500">{row.original.slug}</div>
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Catégorie',
            cell: ({ row }) => {
                const category = row.original.category;
                return category ? <Badge variant="secondary">{category.name}</Badge> : <span className="text-sm text-gray-400">-</span>;
            },
        },
        {
            accessorKey: 'author',
            header: 'Auteur',
            cell: ({ row }) => <div className="text-sm">{row.original.author.name}</div>,
        },
        {
            accessorKey: 'views',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Vues
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => <div className="text-center">{row.getValue('views')}</div>,
        },
        {
            accessorKey: 'is_published',
            header: 'Statut',
            cell: ({ row }) => {
                const isPublished = row.getValue('is_published') as boolean;
                return (
                    <Badge variant={isPublished ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => handleTogglePublish(row.original)}>
                        {isPublished ? 'Publié' : 'Brouillon'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'published_at',
            header: ({ column }) => (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="flex items-center gap-1 font-medium">
                    Date de publication
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            ),
            cell: ({ row }) => {
                const publishedAt = row.getValue('published_at') as string | null;
                return publishedAt ? (
                    <div className="text-sm">
                        {new Date(publishedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                ) : (
                    <span className="text-sm text-gray-400">-</span>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const blog = row.original;
                return (
                    <div className="flex items-center gap-2">
                        {blog.is_published && (
                            <Button variant="ghost" size="sm" onClick={() => handlePreview(blog.slug)} title="Prévisualiser">
                                <Eye className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(blog)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => confirmDelete(blog)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: blogs.data,
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
            <Head title="Gestion des Articles" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des Articles</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Total: {blogs.total} articles</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                        <Button onClick={openCreateModal}>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvel article
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-lg border bg-card p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Rechercher</label>
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input placeholder="Rechercher un article..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="pl-9" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Catégorie</label>
                            <Select value={categoryFilter || 'all'} onValueChange={(value) => setCategoryFilter(value === 'all' ? '' : value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Toutes les catégories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les catégories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
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
                                    <SelectItem value="1">Publié</SelectItem>
                                    <SelectItem value="0">Brouillon</SelectItem>
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
                                            Aucun article trouvé
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
                            Page {blogs.current_page} sur {blogs.last_page}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.get(`/dashboard/blog?page=${blogs.current_page - 1}`)} disabled={blogs.current_page === 1}>
                                Précédent
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.get(`/dashboard/blog?page=${blogs.current_page + 1}`)} disabled={blogs.current_page === blogs.last_page}>
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
                title="Supprimer l'article"
                message={`Êtes-vous sûr de vouloir supprimer l'article "${blogToDelete?.title}" ? Cette action est irréversible.`}
            />

            <BlogFormModal isOpen={showFormModal} onClose={closeFormModal} blog={blogToEdit} categories={categories} onSuccess={handleFormSuccess} />
        </AppLayout>
    );
}
