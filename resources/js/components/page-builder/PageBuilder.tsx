import { Editor, Frame, Element } from '@craftjs/core';
import { Toolbox } from './toolbox/Toolbox';
import { SettingsPanel } from './settings/SettingsPanel';
import { Canvas } from './Canvas';
import { Section } from './sections/Section';
import { HeroWidget } from './widgets/HeroWidget';
import { ServiceWidget } from './widgets/ServiceWidget';

interface PageBuilderProps {
    initialData?: string;
    onSave?: (data: string) => void;
}

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
                {/* Toolbox - Left Sidebar */}
                <Toolbox />

                {/* Canvas - Main Area */}
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
