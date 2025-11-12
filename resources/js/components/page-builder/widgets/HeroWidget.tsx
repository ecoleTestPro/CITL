import { useNode } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HeroSettings as HeroSettingsType } from '@/types/page-builder';
import { HeroWidgetSettings } from './HeroWidgetSettings';

interface HeroWidgetProps {
    /** Configuration du widget hero (titre, texte, bouton, image, styles) */
    settings?: Partial<HeroSettingsType>;
}

/**
 * Widget Hero - Section d'en-tête impactante avec CTA
 *
 * Widget de type "hero" utilisé généralement en haut de page pour capter
 * l'attention avec un grand titre, un sous-titre et un appel à l'action.
 *
 * Fonctionnalités :
 * - Titre et sous-titre personnalisables
 * - Bouton CTA avec lien configurable
 * - Image de fond ou gradient par défaut
 * - Tailles de texte ajustables
 * - Alignement du texte (left/center/right)
 * - Padding configurable
 * - Ring visuel quand sélectionné
 *
 * Configuration disponible :
 * - title : Texte du titre principal
 * - subtitle : Texte du sous-titre
 * - buttonText : Libellé du bouton
 * - buttonLink : URL de destination
 * - backgroundImage : URL de l'image de fond
 * - textAlign : Alignement du contenu
 * - titleSize, subtitleSize : Tailles des textes
 * - padding : Espacement interne
 *
 * @param props - Propriétés du composant
 * @returns Widget hero éditable avec tous ses éléments
 */
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
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
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
        settings: HeroWidgetSettings,
    },
};
