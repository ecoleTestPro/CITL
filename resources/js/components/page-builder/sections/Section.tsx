import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import type { SectionSettings as SectionSettingsType } from '@/types/page-builder';
import { SectionSettings } from './SectionSettings';

interface SectionProps {
    /** Widgets enfants contenus dans cette section */
    children?: React.ReactNode;
    /** Configuration de la section (largeur, layout, styles, etc.) */
    settings?: Partial<SectionSettingsType>;
}

/**
 * Section - Conteneur flexible pour organiser les widgets
 *
 * Une section est un conteneur qui peut accueillir plusieurs widgets.
 * Elle offre des options de layout (flex/grid), de largeur (full/boxed/narrow),
 * et de styles (background, padding, margin).
 *
 * Fonctionnalités :
 * - Drag-and-drop pour réorganisation
 * - Accepte des widgets enfants (canvas)
 * - Configuration flexible (flex ou grid)
 * - Styles personnalisables (couleur, image, gradient)
 * - Ring visuel quand sélectionnée
 * - Placeholder quand vide
 *
 * Configuration disponible :
 * - width : 'full' | 'boxed' | 'narrow'
 * - layout : 'flex' | 'grid'
 * - flexDirection, justifyContent, alignItems pour flex
 * - gridCols pour grid
 * - padding, margin, background, minHeight
 *
 * @param props - Propriétés du composant
 * @returns Section configurable et éditable
 */
export const Section = ({ children, settings = {} }: SectionProps) => {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const {
        width = 'boxed',
        layout = 'flex',
        flexDirection = 'row',
        justifyContent = 'start',
        alignItems = 'start',
        gap = '1rem',
        gridCols = 3,
        padding = { top: '2rem', right: '1rem', bottom: '2rem', left: '1rem' },
        margin = { top: '0', right: '0', bottom: '0', left: '0' },
        background = { type: 'color', value: 'transparent' },
        minHeight = 'auto',
    } = settings;

    const containerClass = cn(
        'transition-all duration-200',
        width === 'full' && 'w-full',
        width === 'boxed' && 'max-w-7xl mx-auto px-4',
        width === 'narrow' && 'max-w-4xl mx-auto px-4',
        selected && 'ring-2 ring-primary ring-offset-2'
    );

    const backgroundStyle =
        background.type === 'color'
            ? { backgroundColor: background.value }
            : background.type === 'gradient'
              ? { backgroundImage: background.value }
              : { backgroundImage: `url(${background.value})`, backgroundSize: 'cover' };

    const layoutStyle =
        layout === 'flex'
            ? {
                  display: 'flex',
                  flexDirection,
                  justifyContent: justifyContent === 'start' ? 'flex-start' :
                                 justifyContent === 'end' ? 'flex-end' :
                                 justifyContent === 'between' ? 'space-between' :
                                 justifyContent === 'around' ? 'space-around' :
                                 justifyContent === 'evenly' ? 'space-evenly' : justifyContent,
                  alignItems: alignItems === 'start' ? 'flex-start' :
                             alignItems === 'end' ? 'flex-end' : alignItems,
                  gap,
              }
            : {
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gap,
              };

    return (
        <section
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={containerClass}
            style={{
                ...backgroundStyle,
                ...layoutStyle,
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
                marginTop: margin.top,
                marginRight: margin.right,
                marginBottom: margin.bottom,
                marginLeft: margin.left,
                minHeight,
            }}
        >
            {children || (
                <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background/50">
                    <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            Glissez un widget ici
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/75">
                            ou cliquez sur un widget dans la barre latérale
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

Section.craft = {
    displayName: 'Section',
    props: {
        settings: {
            width: 'boxed',
            layout: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            gap: '1rem',
            gridCols: 3,
            padding: { top: '2rem', right: '1rem', bottom: '2rem', left: '1rem' },
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
            background: { type: 'color', value: 'transparent' },
            minHeight: 'auto',
        },
    },
    related: {
        settings: SectionSettings,
    },
};
