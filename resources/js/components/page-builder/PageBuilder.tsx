import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from './toolbox/Toolbox';
import { SettingsPanel } from './settings/SettingsPanel';
import { Canvas } from './Canvas';
import { Section } from './sections/Section';
import { HeroWidget } from './widgets/HeroWidget';
import { ServiceWidget } from './widgets/ServiceWidget';

interface PageBuilderProps {
    /** Données JSON sérialisées du builder (format Craft.js) pour initialiser le contenu */
    initialData?: string;
    /** Callback appelé à chaque modification du builder avec les données sérialisées */
    onSave?: (data: string) => void;
}

/**
 * Composant principal du page builder visuel basé sur Craft.js
 *
 * Fournit une interface complète de construction de pages avec :
 * - Toolbox flottant (sections et widgets disponibles)
 * - Canvas central (zone de drop et édition)
 * - SettingsPanel (propriétés de l'élément sélectionné)
 *
 * Architecture :
 * - Utilise Craft.js comme moteur de drag-and-drop
 * - Enregistre tous les composants disponibles dans le resolver
 * - Sauvegarde automatique à chaque changement via onNodesChange
 *
 * @param props - Propriétés du composant
 * @returns Interface complète du page builder
 */
export const PageBuilder = ({ initialData, onSave }: PageBuilderProps) => {
    return (
        <Editor
            resolver={{
                Canvas,
                Section,
                HeroWidget,
                ServiceWidget,
            }}
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
                <div className="flex-1 overflow-auto">
                    <Frame data={initialData}>
                        <Element is={Canvas} canvas />
                    </Frame>
                </div>

                {/* Settings Panel - Right Sidebar */}
                <SettingsPanel />
            </div>
        </Editor>
    );
};
