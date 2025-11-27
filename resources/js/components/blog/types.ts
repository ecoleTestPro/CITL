// Types pour les composants du blog

export interface BlogArticle {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    image: string;
    categories: string[];
    publishedDate: string;
    readTime: number; // en minutes
    url: string;
}

export interface Category {
    name: string;
    slug: string;
    count: number;
    url: string;
}

export interface Tag {
    name: string;
    slug: string;
    url: string;
}

export interface Archive {
    month: string;
    year: number;
    count: number;
    url: string;
}

export interface RecentArticle {
    id: number;
    title: string;
    image: string;
    publishedDate: string;
    url: string;
}
