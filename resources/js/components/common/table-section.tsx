import { PublicTable } from '@/components/ui/public-table';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
}: TableSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const notesRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Animation de la description
            if (descriptionRef.current) {
                gsap.fromTo(
                    descriptionRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 0.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            // Animation des notes
            if (notesRef.current) {
                gsap.fromTo(
                    notesRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: notesRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={cn('py-16 md:py-24', bgColor, className)}>
            <div className="container mx-auto px-4">
                <div className={cn('mx-auto', maxWidthClass)}>
                    <div className="mb-12 text-center">
                        <h2 ref={titleRef} className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {title}
                        </h2>
                        {description && (
                            <p ref={descriptionRef} className="mt-4 text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        )}
                    </div>

                    <PublicTable columns={columns} data={data} />

                    {notes && notes.length > 0 && (
                        <div ref={notesRef} className={cn('mt-8 rounded-lg p-6', notesBgColor, notesBgColorDark)}>
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
