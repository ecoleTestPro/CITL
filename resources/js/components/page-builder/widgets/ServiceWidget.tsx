import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import { Icon, icons } from 'lucide-react';
import type { ServiceSettings as ServiceSettingsType } from '@/types/page-builder';
import { ServiceWidgetSettings } from './ServiceWidgetSettings';

interface ServiceWidgetProps {
    /** Configuration du widget service (titre, description, icône, styles) */
    settings?: Partial<ServiceSettingsType>;
}

/**
 * Widget Service - Carte de présentation d'un service ou fonctionnalité
 *
 * Widget sous forme de carte utilisé pour présenter un service, une fonctionnalité
 * ou un avantage de manière claire et visuelle avec une icône.
 *
 * Fonctionnalités :
 * - Titre et description personnalisables
 * - Icône configurable (bibliothèque Lucide)
 * - Couleur et taille d'icône ajustables
 * - Padding configurable
 * - Effet hover avec shadow
 * - Ring visuel quand sélectionné
 *
 * Configuration disponible :
 * - title : Titre du service
 * - description : Description détaillée
 * - icon : Nom de l'icône Lucide (ex: 'Zap', 'Star', 'Heart')
 * - iconColor : Couleur de l'icône (hex ou nom CSS)
 * - iconSize : Taille de l'icône (ex: '48px')
 * - padding : Espacement interne
 *
 * @param props - Propriétés du composant
 * @returns Widget service éditable en forme de carte
 */
export const ServiceWidget = ({ settings = {} }: ServiceWidgetProps) => {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((state) => ({
        selected: state.events.selected,
    }));

    const {
        title = 'Titre du service',
        description = 'Description détaillée de votre service ou fonctionnalité.',
        icon = 'Zap',
        iconColor = '#667eea',
        iconSize = '48px',
        padding = { top: '1.5rem', right: '1.5rem', bottom: '1.5rem', left: '1.5rem' },
    } = settings;

    // Get the icon component dynamically
    const IconComponent = (icons as Record<string, Icon>)[icon] || icons.Zap;

    return (
        <div
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={cn(
                'rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md',
                selected && 'ring-2 ring-primary ring-offset-2'
            )}
            style={{
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
            }}
        >
            <div className="mb-4">
                <IconComponent
                    style={{
                        width: iconSize,
                        height: iconSize,
                        color: iconColor,
                    }}
                />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
};

ServiceWidget.craft = {
    displayName: 'Service',
    props: {
        settings: {
            title: 'Titre du service',
            description: 'Description détaillée de votre service ou fonctionnalité.',
            icon: 'Zap',
            iconColor: '#667eea',
            iconSize: '48px',
            padding: {
                top: '1.5rem',
                right: '1.5rem',
                bottom: '1.5rem',
                left: '1.5rem',
            },
        },
    },
    related: {
        settings: ServiceWidgetSettings,
    },
};
