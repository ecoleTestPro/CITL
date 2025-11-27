import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface InfoAlertSectionProps {
    title: string;
    icon?: LucideIcon;
    children: ReactNode;
    iconColor?: string;
    bgColor?: string;
    bgColorDark?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    className?: string;
    delay?: string;
}

export function InfoAlertSection({
    title,
    icon: Icon,
    children,
    iconColor = 'text-citl-orange',
    bgColor = 'bg-citl-orange/10',
    bgColorDark = 'dark:bg-citl-orange/20',
    maxWidth = '4xl',
    className,
    delay = '0.1',
}: InfoAlertSectionProps) {
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
        <section className={cn('bg-white py-16 md:py-24 dark:bg-gray-900', className)} data-ns-animate data-delay={delay}>
            <div className="container mx-auto px-4">
                <div className={cn('mx-auto', maxWidthClass)}>
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>

                    <div className={cn('mb-8 rounded-lg p-6', bgColor, bgColorDark)}>
                        <div className="flex items-start gap-4">
                            {Icon && <Icon className={cn('mt-1 h-6 w-6 shrink-0', iconColor)} />}
                            <div className="text-gray-700 dark:text-gray-300">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
