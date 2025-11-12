import { Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Section } from '../sections/Section';
import { HeroWidget } from '../widgets/HeroWidget';
import { ServiceWidget } from '../widgets/ServiceWidget';
import {
    Plus,
    Layout,
    Type,
    Image,
    Square,
    Zap,
    Grid3x3,
    PanelLeftClose,
    PanelLeftOpen,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Toolbox flottant du page builder - Bibliothèque de sections et widgets
 *
 * Panneau flottant en bas à gauche contenant tous les éléments disponibles
 * pour construire une page. Peut être masqué/affiché pour libérer de l'espace.
 *
 * Fonctionnalités :
 * - Bouton toggle circulaire fixe en bas à gauche
 * - Panneau avec animation slide et fade
 * - Liste scrollable des sections et widgets disponibles
 * - Drag depuis le panneau ou clic pour ajouter au canvas
 *
 * Organisation :
 * - Sections : Conteneurs pouvant accueillir des widgets
 * - Widgets : Éléments de contenu (Hero, Service, etc.)
 *
 * @returns Panneau flottant avec bouton toggle et liste des composants
 */
export const Toolbox = () => {
    const { connectors } = useEditor();
    const [isOpen, setIsOpen] = useState(true);

    const widgets = [
        {
            name: 'Hero',
            icon: Layout,
            component: HeroWidget,
            description: 'Section hero avec titre, sous-titre et CTA',
        },
        {
            name: 'Service',
            icon: Zap,
            component: ServiceWidget,
            description: 'Carte de service avec icône',
        },
    ];

    return (
        <>
            {/* Toggle Button - Fixed Position */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                size="icon"
                className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full shadow-lg"
                title={isOpen ? 'Masquer le panneau' : 'Afficher le panneau'}
            >
                {isOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                )}
            </Button>

            {/* Floating Panel */}
            <div
                className={cn(
                    'fixed bottom-20 left-4 z-40 w-80 max-h-[calc(100vh-10rem)] overflow-hidden',
                    'rounded-xl border bg-background shadow-2xl',
                    'transition-all duration-300 ease-in-out',
                    isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0 pointer-events-none'
                )}
            >
                <div className="p-4 border-b bg-muted/50">
                    <h2 className="mb-1 text-lg font-semibold">Sections & Widgets</h2>
                    <p className="text-xs text-muted-foreground">
                        Glissez-déposez pour construire votre page
                    </p>
                </div>

                <ScrollArea className="h-[calc(100vh-18rem)]">
                    <div className="space-y-6 p-4">
                        {/* Add Section */}
                        <div>
                            <h3 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Grid3x3 className="h-4 w-4" />
                                Sections
                            </h3>
                            <Button
                                ref={(ref) =>
                                    ref &&
                                    connectors.create(
                                        ref,
                                        <Element is={Section} canvas />
                                    )
                                }
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter une section
                            </Button>
                            <p className="mt-2 text-xs text-muted-foreground">
                                Une section peut contenir plusieurs widgets
                            </p>
                        </div>

                        {/* Widgets */}
                        <div>
                            <h3 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Square className="h-4 w-4" />
                                Widgets
                            </h3>
                            <div className="space-y-2">
                                {widgets.map((widget) => (
                                    <button
                                        key={widget.name}
                                        ref={(ref) =>
                                            ref &&
                                            connectors.create(
                                                ref,
                                                <Element is={widget.component} />
                                            )
                                        }
                                        className="w-full rounded-lg border bg-card p-3 text-left transition-all hover:border-primary hover:shadow-sm"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-md bg-primary/10 p-2">
                                                <widget.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">
                                                    {widget.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {widget.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Coming Soon */}
                        <div className="rounded-lg border border-dashed p-4 text-center">
                            <p className="text-xs text-muted-foreground">
                                Plus de widgets bientôt...
                            </p>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    );
};
