import { FadeIn } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { RichText } from '@/lib/text-parser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface HeroCommonProps {
    badge?: string;
    title: string;
    description: string;
    backgroundImage?: string;
}

export default function HeroCommon({ badge, title, description, backgroundImage }: HeroCommonProps) {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bgRef.current || !backgroundImage) return;

        // Animation continue de zoom doux
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
        });

        tl.to(bgRef.current, {
            scale: 1.05,
            duration: 8,
            ease: 'power1.inOut',
        });

        return () => {
            tl.kill();
        };
    }, [backgroundImage]);

    return (
        <section className="relative overflow-hidden pt-10 pb-16 ">
            {/* Background image avec animation */}
            {backgroundImage && (
                <div
                    ref={bgRef}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            )}

            {/* Overlay pour améliorer la lisibilité du texte */}
            {backgroundImage && <div className="absolute inset-0 bg-amber-200/10 dark:bg-gray-900/80"></div>}

            <div className="relative z-10 container mx-auto px-4">
                <div className="space-y-5">
                    {badge && (
                        <FadeIn delay={0.1}>
                            <Badge
                                variant="secondary"
                                className="rounded-full bg-green-100 px-4 py-1.5 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            >
                                {badge}
                            </Badge>
                        </FadeIn>
                    )}
                    <div className="space-y-4">
                        <FadeIn delay={0.2}>
                            <h1 className="font-manrope text-5xl leading-tight font-normal text-gray-900 dark:text-gray-100">
                                <RichText text={title} />
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                <RichText text={description} />
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
