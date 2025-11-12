// Types for page builder
export interface SectionSettings {
    width: 'full' | 'boxed' | 'narrow';
    layout: 'flex' | 'grid';
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    gap?: string;
    gridCols?: number;
    gridRows?: number;
    padding?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    margin?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    background?: {
        type: 'color' | 'gradient' | 'image';
        value: string;
    };
    minHeight?: string;
    customCSS?: string;
}

export interface WidgetSettings {
    margin?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    padding?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    width?: string;
    height?: string;
}

export interface HeroSettings extends WidgetSettings {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage?: string;
    textAlign: 'left' | 'center' | 'right';
    titleSize: string;
    subtitleSize: string;
}

export interface ServiceSettings extends WidgetSettings {
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    iconSize: string;
}

export interface PageBuilderData {
    sections: any[]; // Craft.js serialized data
}
