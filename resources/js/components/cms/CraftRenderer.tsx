import { Editor, Frame } from '@craftjs/core';
import { ReadOnlyCanvas } from './ReadOnlyCanvas';
import { Section } from '@/components/page-builder/sections/Section';
import { HeroWidget } from '@/components/page-builder/widgets/HeroWidget';
import { ServiceWidget } from '@/components/page-builder/widgets/ServiceWidget';

interface CraftRendererProps {
    content: Record<string, any>;
}

/**
 * Read-only Craft.js renderer for displaying published pages
 * No editing capabilities, just renders the saved content
 *
 * The Frame component will automatically deserialize the content JSON
 * and render the ROOT Canvas node with all its children.
 */
export function CraftRenderer({ content }: CraftRendererProps) {
    return (
        <Editor
            enabled={false}
            resolver={{
                Canvas: ReadOnlyCanvas,
                Section,
                HeroWidget,
                ServiceWidget,
            }}
        >
            <Frame data={content} />
        </Editor>
    );
}
