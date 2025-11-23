import { PublicTable } from '@/components/ui/public-table';
import { cn } from '@/lib/utils';

interface Column {
    key: string;
    header: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

interface Note {
    text: string;
}

interface TableSectionProps {
    title: string;
    description?: string;
    columns: Column[];
    data: Record<string, any>[];
    notes?: Note[];
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    bgColor?: string;
    notesBgColor?: string;
    notesBgColorDark?: string;
    notesTitle?: string;
    className?: string;
    delay?: string;
}

export function TableSection({
    title,
    description,
    columns,
    data,
    notes,
    maxWidth = '6xl',
    bgColor = 'bg-gray-50 dark:bg-gray-800/50',
    notesBgColor = 'bg-blue-50',
    notesBgColorDark = 'dark:bg-blue-900/20',
    notesTitle = 'Note importante :',
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

                    {notes && notes.length > 0 && (
                        <div className={cn('mt-8 rounded-lg p-6', notesBgColor, notesBgColorDark)}>
                            <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">{notesTitle}</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {notes.map((note, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-citl-orange"></span>
                                        <span>{note.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
