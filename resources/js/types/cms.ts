export interface Page {
    id: number;
    title: string;
    slug: string;
    content: any;
    status: 'draft' | 'published';
    is_homepage: boolean;
    page_type: PageType;
    seo_title: string | null;
    seo_description: string | null;
    created_at?: string;
    updated_at?: string;
}

export type PageStatus = 'draft' | 'published';
export type PageType = 'custom' | 'home' | 'contact' | 'about' | 'terms' | 'privacy';

export interface PageFormData {
    title: string;
    status: PageStatus;
    page_type: PageType;
    seo_title: string;
    seo_description: string;
    content: any;
}

export interface PageTypesMap {
    [key: string]: string;
}
