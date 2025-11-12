import { useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';

/**
 * Panneau de propriétés - Settings de l'élément sélectionné
 *
 * Sidebar droit affichant les propriétés configurables de l'élément
 * actuellement sélectionné dans le builder. Charge dynamiquement le
 * composant de settings approprié via le système de "related" de Craft.js.
 *
 * Fonctionnalités :
 * - Affiche les settings de l'élément sélectionné
 * - Chargement dynamique du composant de configuration
 * - Bouton de suppression de l'élément
 * - Bouton de désélection (X)
 * - Message d'aide quand aucune sélection
 *
 * Architecture :
 * - Utilise useEditor pour accéder à l'état Craft.js
 * - Récupère le composant de settings via related.settings
 * - Affiche le composant dynamiquement chargé
 *
 * @returns Panneau fixe à droite avec les propriétés éditables
 */
export const SettingsPanel = () => {
    const { active, related, actions } = useEditor((state, query) => {
        const currentlySelectedNodeId = query.getEvent('selected').first();
        return {
            active: currentlySelectedNodeId,
            related:
                currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
        };
    });

    return (
        <div className="w-80 border-l bg-background">
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <h2 className="text-sm font-semibold">
                            {active ? 'Propriétés' : 'Aucune sélection'}
                        </h2>
                    </div>
                    {active && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => actions.selectNode(undefined)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {active && related?.settings ? (
                        <div>
                            {/* Render the settings component dynamically */}
                            {related.settings && related.settings()}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <Settings className="mx-auto mb-2 h-12 w-12 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                    Sélectionnez un élément
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Cliquez sur une section ou un widget pour modifier
                                    ses propriétés
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Button */}
                {active && (
                    <div className="border-t p-4">
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                                actions.delete(active);
                            }}
                        >
                            Supprimer l'élément
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
