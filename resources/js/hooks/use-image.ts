import { useEffect, useState } from 'react';
import imagesConfig from '@/i18n/images.json';

type ImagesConfig = {
    [page: string]: {
        [key: string]: string;
    };
};

const images: ImagesConfig = imagesConfig;

/**
 * Hook to get an image path from the images configuration.
 *
 * Usage:
 * const heroImage = useImage('home', 'hero_background');
 * // or with fallback
 * const heroImage = useImage('home', 'hero_background', '/assets/images/default.jpg');
 *
 * @param page - The page name (e.g., 'home', 'about.citl')
 * @param key - The image key within the page (e.g., 'hero_background')
 * @param fallback - Optional fallback image path
 * @returns The image path or fallback
 */
export function useImage(page: string, key: string, fallback?: string): string {
    const [imagePath, setImagePath] = useState<string>(() => {
        return images[page]?.[key] || fallback || '';
    });

    useEffect(() => {
        const path = images[page]?.[key] || fallback || '';
        setImagePath(path);
    }, [page, key, fallback]);

    return imagePath;
}

/**
 * Get an image path synchronously (for use outside React components).
 *
 * @param page - The page name
 * @param key - The image key
 * @param fallback - Optional fallback
 * @returns The image path
 */
export function getImage(page: string, key: string, fallback?: string): string {
    return images[page]?.[key] || fallback || '';
}

/**
 * Get all images for a specific page.
 *
 * @param page - The page name
 * @returns Object with all image paths for the page
 */
export function getPageImages(page: string): { [key: string]: string } {
    return images[page] || {};
}

export default useImage;
