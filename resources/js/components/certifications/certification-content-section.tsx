import { FadeIn } from '@/components/animations';
import { ReactNode } from 'react';

interface CertificationContentSectionProps {
    id: string;
    title: string;
    delay?: number;
    richContent?: string | null;
    fallbackContent: ReactNode;
}

export function CertificationContentSection({ id, title, delay = 0.3, richContent, fallbackContent }: CertificationContentSectionProps) {
    return (
        <FadeIn delay={delay}>
            <div className="group">
                <h2 className="text-heading-4 mb-4 transition-colors duration-300 group-hover:text-secondary dark:group-hover:text-accent" id={id}>
                    {title}
                </h2>
                {richContent ? (
                    <div
                        className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:text-secondary prose-headings:dark:text-accent prose-a:text-secondary prose-a:dark:text-accent prose-strong:text-secondary prose-strong:dark:text-accent"
                        dangerouslySetInnerHTML={{ __html: richContent }}
                    />
                ) : (
                    fallbackContent
                )}
            </div>
        </FadeIn>
    );
}
