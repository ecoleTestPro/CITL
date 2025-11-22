import { FadeIn, ScaleIn } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { RichText } from '@/lib/text-parser';
import { CheckCircle2 } from 'lucide-react';

interface WhyJoinSectionProps {
    badge: string;
    title: string;
    description: string;
    benefitsTitle: string;
    benefits: string[];
    ctaText: string;
    onCtaClick: () => void;
    imageSrc?: string;
    imageAlt?: string;
    imagePosition?: 'left' | 'right';
}

export default function WhyJoinSection({
    badge,
    title,
    description,
    benefitsTitle,
    benefits,
    ctaText,
    onCtaClick,
    imageSrc,
    imageAlt = 'Membership illustration',
    imagePosition = 'right',
}: WhyJoinSectionProps) {
    const contentSection = (
        <FadeIn duration={1} delay={0} blur={12} className="space-y-6">
            <div>
                <div className="mb-3 inline-block rounded-full bg-citl-orange/10 px-4 py-1.5 text-sm font-semibold text-citl-orange">
                    {badge}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
                    <RichText text={title} />
                </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
            </p>
            <div className="pt-4">
                <Button
                    onClick={onCtaClick}
                    className="bg-citl-orange px-8 py-6 text-base font-semibold hover:bg-citl-orange/90"
                    size="lg"
                >
                    {ctaText}
                </Button>
            </div>
        </FadeIn>
    );

    const benefitsSection = (
        <ScaleIn duration={0.8} delay={0.2} blur={10} className="space-y-4">
            {imageSrc && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {benefitsTitle}
            </h3>
            <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-citl-orange" />
                        <span className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                            {benefit}
                        </span>
                    </li>
                ))}
            </ul>
        </ScaleIn>
    );

    return (
        <section className="bg-white py-16 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    {imagePosition === 'left' ? (
                        <>
                            {benefitsSection}
                            {contentSection}
                        </>
                    ) : (
                        <>
                            {contentSection}
                            {benefitsSection}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
