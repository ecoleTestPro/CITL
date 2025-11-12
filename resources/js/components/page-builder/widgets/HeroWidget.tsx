import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroSettings } from '@/types/page-builder';

interface HeroWidgetProps {
    settings?: Partial<HeroSettings>;
}

export const HeroWidget = ({ settings = {} }: HeroWidgetProps) => {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const {
        title = 'Titre de votre hero',
        subtitle = 'Sous-titre accrocheur pour capter l\'attention',
        buttonText = 'En savoir plus',
        buttonLink = '#',
        backgroundImage,
        textAlign = 'center',
        titleSize = '3rem',
        subtitleSize = '1.25rem',
        padding = { top: '4rem', right: '2rem', bottom: '4rem', left: '2rem' },
    } = settings;

    return (
        <div
            ref={(ref) => ref && connect(drag(ref))}
            className={cn(
                'relative overflow-hidden rounded-lg',
                selected && 'ring-2 ring-primary ring-offset-2'
            )}
            style={{
                backgroundImage: backgroundImage
                    ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
                textAlign,
            }}
        >
            <div className="relative z-10 text-white">
                <h1
                    style={{ fontSize: titleSize }}
                    className="mb-4 font-bold leading-tight"
                >
                    {title}
                </h1>
                <p
                    style={{ fontSize: subtitleSize }}
                    className="mb-8 opacity-90"
                >
                    {subtitle}
                </p>
                <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                    onClick={(e) => {
                        e.preventDefault();
                        if (buttonLink) window.location.href = buttonLink;
                    }}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

HeroWidget.craft = {
    displayName: 'Hero',
    props: {
        settings: {
            title: 'Titre de votre hero',
            subtitle: 'Sous-titre accrocheur pour capter l\'attention',
            buttonText: 'En savoir plus',
            buttonLink: '#',
            textAlign: 'center',
            titleSize: '3rem',
            subtitleSize: '1.25rem',
            padding: { top: '4rem', right: '2rem', bottom: '4rem', left: '2rem' },
        },
    },
    related: {
        settings: () => import('./HeroWidgetSettings').then((m) => m.HeroWidgetSettings),
    },
};
