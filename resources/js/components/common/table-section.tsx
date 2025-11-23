import { PublicTable } from '@/components/ui/public-table';
import { cn } from '@/lib/utils';

interface Column {
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

interface TableSectionProps {
    title: string;
    description?: string;
    columns: Column[];
    data: Record<string, any>[];
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    bgColor?: string;
    className?: string;
    delay?: string;
}

export function TableSection({
    title,
    description,
    columns,
    data,
    maxWidth = '6xl',
    bgColor = 'bg-gray-50 dark:bg-gray-800/50',
    className,
    delay = '0.2',
}: TableSectionProps) {
    const maxWidthClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
    }[maxWidth];

    return (
        <section className={cn('py-16 md:py-24', bgColor, className)} data-ns-animate data-delay={delay}>
            <div className="container mx-auto px-4">
                <div className={cn('mx-auto', maxWidthClass)}>
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                        {description && <p className="mt-4 text-gray-600 dark:text-gray-400">{description}</p>}
                    </div>

                    <PublicTable columns={columns} data={data} />
                </div>
            </div>
        </section>
    );
}
