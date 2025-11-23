import { cn } from '@/lib/utils';

interface Column {
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

interface PublicTableProps {
    columns: Column[];
    data: Record<string, any>[];
    className?: string;
    striped?: boolean;
    bordered?: boolean;
    animated?: boolean;
}

export function PublicTable({ columns, data, className, striped = true, bordered = true, animated = true }: PublicTableProps) {
    return (
        <div className={cn('overflow-x-auto rounded-lg', bordered && 'border border-gray-200 dark:border-gray-700', className)} data-ns-animate={animated} data-delay="0.3">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    'px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300',
                                    column.align === 'center' && 'text-center',
                                    column.align === 'right' && 'text-right',
                                    column.align === 'left' && 'text-left',
                                    !column.align && 'text-left',
                                    column.className,
                                )}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={cn(
                                'transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
                                striped && rowIndex % 2 === 1 && 'bg-gray-50/50 dark:bg-gray-800/30',
                            )}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={cn(
                                        'px-6 py-4 text-sm text-gray-900 dark:text-gray-100',
                                        column.align === 'center' && 'text-center',
                                        column.align === 'right' && 'text-right',
                                        column.align === 'left' && 'text-left',
                                        !column.align && 'text-left',
                                    )}
                                >
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
