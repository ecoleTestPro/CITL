export interface Page {
    id: number;
    title: string;
    slug: string;
    content: any;
    status: 'draft' | 'published';
    seo_title: string | null;
    seo_description: string | null;
}

export type PageStatus = 'draft' | 'published';

export interface PageFormData {
    title: string;
    status: PageStatus;
    seo_title: string;
    seo_description: string;
    content: any;
}
