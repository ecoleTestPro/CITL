import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = 'Rechercher...',
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-full space-y-4">
            {/* Search Input */}
            {searchKey && (
                <div className="flex items-center">
                    <Input
                        placeholder={searchPlaceholder}
                        value={
                            (table
                                .getColumn(searchKey)
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchKey)
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
            )}

            {/* Desktop Table */}
            <div className="hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b border-gray-200 bg-gray-50"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className="border-b border-gray-100 transition-colors hover:bg-orange-50/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-6 py-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    Aucun résultat trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <div
                            key={row.id}
                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            {row.getVisibleCells().map((cell) => {
                                const header = cell.column.columnDef.header;
                                return (
                                    <div
                                        key={cell.id}
                                        className="mb-3 last:mb-0"
                                    >
                                        {typeof header === 'string' && (
                                            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                {header}
                                            </div>
                                        )}
                                        <div className="text-sm text-gray-900">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                        Aucun résultat trouvé.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-gray-600">
                    {table.getFilteredRowModel().rows.length} résultat(s) au
                    total
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border-gray-300 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50"
                    >
                        Précédent
                    </Button>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-600">
                            Page{' '}
                            <span className="font-semibold">
                                {table.getState().pagination.pageIndex + 1}
                            </span>{' '}
                            sur{' '}
                            <span className="font-semibold">
                                {table.getPageCount()}
                            </span>
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border-gray-300 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-50"
                    >
                        Suivant
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Export sortable header component
interface DataTableColumnHeaderProps<TData, TValue> {
    column: any;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div>{title}</div>;
    }

    return (
        <button
            className="flex items-center gap-2 hover:text-orange-600"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {title}
            {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="h-4 w-4" />
            ) : (
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
            )}
        </button>
    );
}
