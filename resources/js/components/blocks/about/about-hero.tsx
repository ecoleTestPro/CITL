import { FadeIn } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { RichText } from '@/lib/text-parser';

interface AboutHeroProps {
    badge?: string;
    title: string;
    description: string;
    backgroundImage?: string;
}

export default function AboutHero({ badge, title, description, backgroundImage }: AboutHeroProps) {
    return (
        <section
            className="relative pt-[50px] pb-16 lg:pt-[70px] lg:pb-20 xl:pt-[100px] xl:pb-28"
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            } : undefined}
        >
            {/* Overlay pour améliorer la lisibilité du texte */}
            {backgroundImage && (
                <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/80"></div>
            )}

            <div className="container relative z-10 mx-auto px-4">
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
