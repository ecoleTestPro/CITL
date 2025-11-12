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
} from 'lucide-react';

export const Toolbox = () => {
    const { connectors } = useEditor();

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
        <div className="w-80 border-r bg-background p-4">
            <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold">Sections & Widgets</h2>
                <p className="text-sm text-muted-foreground">
                    Glissez-déposez pour construire votre page
                </p>
            </div>

            <div className="space-y-6">
                {/* Add Section */}
                <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase text-muted-foreground">
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
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase text-muted-foreground">
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
                                        <div className="font-medium">
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
                    <p className="text-sm text-muted-foreground">
                        Plus de widgets bientôt...
                    </p>
                </div>
            </div>
        </div>
    );
};
