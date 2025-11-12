import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import type { SectionSettings } from '@/types/page-builder';

interface SectionProps {
    children?: React.ReactNode;
    settings?: Partial<SectionSettings>;
}

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
            ref={(ref) => ref && connect(drag(ref))}
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
            {children}
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
        settings: () => import('./SectionSettings').then((m) => m.SectionSettings),
    },
};
