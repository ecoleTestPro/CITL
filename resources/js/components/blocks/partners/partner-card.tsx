import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface PartnerCardProps {
    name: string;
    logo: string | null;
    description: string | null;
    website: string | null;
    index?: number;
}

export default function PartnerCard({ name, logo, description, website, index = 0 }: PartnerCardProps) {
    const { t } = useTranslation();
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                },
            );
        });

        return () => ctx.revert();
    }, [index]);

    return (
        <div ref={cardRef} className="space-y-6 rounded-[20px] bg-gray-50 p-6 dark:bg-gray-800">
            <figure className="relative">
                {logo ? (
                    <img
                        src={logo}
                        alt={name}
                        className="block h-64 w-full rounded-2xl bg-white object-contain p-4 dark:bg-gray-900"
                    />
                ) : (
                    <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white dark:bg-gray-900">
                        <span className="text-4xl font-bold text-gray-300 dark:text-gray-600">{name.substring(0, 2).toUpperCase()}</span>
                    </div>
                )}
            </figure>
            <div>
                <h3 className="text-heading-6 sm:text-heading-5 mb-1 font-normal sm:mb-3">{name}</h3>
                {description && (
                    <div
                        className="prose prose-sm dark:prose-invert mb-2 max-w-none text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80"
                    >
                        <ExternalLink className="h-4 w-4" />
                        {t('partners.visit', 'Visiter le site')}
                    </a>
                )}
            </div>
        </div>
    );
}
