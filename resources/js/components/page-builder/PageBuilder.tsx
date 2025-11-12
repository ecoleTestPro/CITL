import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from './toolbox/Toolbox';
import { SettingsPanel } from './settings/SettingsPanel';
import { Canvas } from './Canvas';
import { Section } from './sections/Section';
import { HeroWidget } from './widgets/HeroWidget';
import { ServiceWidget } from './widgets/ServiceWidget';
import { HeaderMenu } from '@/components/frontend/header-menu';
import { FooterMenu } from '@/components/frontend/footer-menu';

interface PageBuilderProps {
    /** Données JSON sérialisées du builder (format Craft.js) pour initialiser le contenu */
    initialData?: string;
    /** Callback appelé à chaque modification du builder avec les données sérialisées */
    onSave?: (data: string) => void;
    /** Afficher le header/footer en lecture seule (défaut: true) */
    showLayout?: boolean;
}

/**
 * Composant principal du page builder visuel basé sur Craft.js
 *
 * Fournit une interface complète de construction de pages avec :
 * - Header/Footer en lecture seule (aperçu du layout)
 * - Toolbox flottant (sections et widgets disponibles)
 * - Canvas central (zone de drop et édition)
 * - SettingsPanel (propriétés de l'élément sélectionné)
 *
 * Architecture :
 * - Utilise Craft.js comme moteur de drag-and-drop
 * - Enregistre tous les composants disponibles dans le resolver
 * - Sauvegarde automatique à chaque changement via onNodesChange
 * - Header/Footer affichés mais non éditables (pointer-events: none)
 *
 * @param props - Propriétés du composant
 * @returns Interface complète du page builder
 */
export const PageBuilder = ({ initialData, onSave, showLayout = true }: PageBuilderProps) => {
    return (
        <Editor
            resolver={{
                Canvas,
                Section,
                HeroWidget,
                ServiceWidget,
            }}
            enabled={true}
            onNodesChange={(query) => {
                if (onSave) {
                    const json = query.serialize();
                    onSave(json);
                }
            }}
        >
            <div className="flex h-[calc(100vh-3.5rem)]">
                {/* Toolbox - Floating Panel */}
                <Toolbox />

                {/* Canvas - Main Area (now full width) */}
                <div className="flex-1 overflow-auto bg-muted/20">
                    {showLayout && (
                        /* Header Preview - Non-editable */
                        <div className="pointer-events-none relative border-b-2 border-dashed border-primary/30 bg-background">
                            <div className="absolute right-2 top-2 z-10 rounded bg-primary/90 px-2 py-1 text-xs text-white shadow-lg">
                                Header (lecture seule)
                            </div>
                            <div className="opacity-70">
                                <HeaderMenu />
                            </div>
                        </div>
                    )}

                    {/* Editable Content Area */}
                    <Frame data={initialData}>
                        <Element is={Canvas} canvas />
                    </Frame>

                    {showLayout && (
                        /* Footer Preview - Non-editable */
                        <div className="pointer-events-none relative border-t-2 border-dashed border-primary/30 bg-background">
                            <div className="absolute right-2 top-2 z-10 rounded bg-primary/90 px-2 py-1 text-xs text-white shadow-lg">
                                Footer (lecture seule)
                            </div>
                            <div className="opacity-70">
                                <FooterMenu />
                            </div>
                        </div>
                    )}
                </div>

                {/* Settings Panel - Right Sidebar */}
                <SettingsPanel />
            </div>
        </Editor>
    );
};
