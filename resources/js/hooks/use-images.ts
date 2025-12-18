import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface ImageMetadata {
    label: string;
    description: string;
    recommendedSize: string;
    maxSize: number;
    acceptedFormats: string[];
    section: string;
}

interface ImageSection {
    key: string;
    metadata: ImageMetadata;
}

interface UseImagesReturn {
    images: { [key: string]: string };
    originalImages: { [key: string]: string };
    loading: boolean;
    uploading: boolean;
    uploadingKey: string | null;
    hasUnsavedChanges: boolean;
    metadata: { [key: string]: ImageMetadata };
    sections: { [section: string]: ImageSection[] };
    handleUpload: (key: string, file: File, pageName?: string) => Promise<void>;
    handleReset: () => void;
    reloadImages: () => Promise<void>;
}

export function useImages(pageName: string): UseImagesReturn {
    const [images, setImages] = useState<{ [key: string]: string }>({});
    const [originalImages, setOriginalImages] = useState<{ [key: string]: string }>({});
    const [metadata, setMetadata] = useState<{ [key: string]: ImageMetadata }>({});
    const [sections, setSections] = useState<{ [section: string]: ImageSection[] }>({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const loadImages = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/dashboard/pages/${pageName}/images`);
            const loadedImages = response.data.data.images;
            setImages(loadedImages);
            setOriginalImages(JSON.parse(JSON.stringify(loadedImages)));
            setMetadata(response.data.data.metadata || {});
            setSections(response.data.data.sections || {});
        } catch (error) {
            console.error('Failed to load images:', error);
        } finally {
            setLoading(false);
        }
    }, [pageName]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    useEffect(() => {
        const hasChanges = JSON.stringify(images) !== JSON.stringify(originalImages);
        setHasUnsavedChanges(hasChanges);
    }, [images, originalImages]);

    const handleUpload = useCallback(
        async (key: string, file: File) => {
            try {
                setUploading(true);
                setUploadingKey(key);

                const formData = new FormData();
                formData.append('page', pageName);
                formData.append('key', key);
                formData.append('image', file);

                const response = await axios.post('/dashboard/pages/images/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const newPath = response.data.data.path;
                    setImages((prev) => ({
                        ...prev,
                        [key]: newPath,
                    }));
                    setOriginalImages((prev) => ({
                        ...prev,
                        [key]: newPath,
                    }));
                }
            } catch (error) {
                console.error('Failed to upload image:', error);
                throw error;
            } finally {
                setUploading(false);
                setUploadingKey(null);
            }
        },
        [pageName],
    );

    const handleReset = useCallback(() => {
        setImages(JSON.parse(JSON.stringify(originalImages)));
    }, [originalImages]);

    const reloadImages = useCallback(async () => {
        await loadImages();
    }, [loadImages]);

    return {
        images,
        originalImages,
        loading,
        uploading,
        uploadingKey,
        hasUnsavedChanges,
        metadata,
        sections,
        handleUpload,
        handleReset,
        reloadImages,
    };
}

/**
 * Hook pour charger les images de plusieurs pages à la fois
 * Utile pour les pages qui utilisent des images de différentes sections (ex: home + global)
 */
export function useMultiPageImages(pageNames: string[]): UseImagesReturn {
    const [images, setImages] = useState<{ [key: string]: string }>({});
    const [originalImages, setOriginalImages] = useState<{ [key: string]: string }>({});
    const [metadata, setMetadata] = useState<{ [key: string]: ImageMetadata }>({});
    const [sections, setSections] = useState<{ [section: string]: ImageSection[] }>({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [pageMapping, setPageMapping] = useState<{ [key: string]: string }>({});

    const loadImages = useCallback(async () => {
        try {
            setLoading(true);
            const allImages: { [key: string]: string } = {};
            const allMetadata: { [key: string]: ImageMetadata } = {};
            const allSections: { [section: string]: ImageSection[] } = {};
            const keyToPage: { [key: string]: string } = {};

            // Charger les images de chaque page
            for (const pageName of pageNames) {
                const response = await axios.get(`/dashboard/pages/${pageName}/images`);
                const pageImages = response.data.data.images || {};
                const pageSections = response.data.data.sections || {};

                // Ajouter les images avec leur clé
                for (const [key, path] of Object.entries(pageImages)) {
                    allImages[key] = path as string;
                    keyToPage[key] = pageName;
                }

                // Fusionner les métadonnées
                if (response.data.data.metadata) {
                    Object.assign(allMetadata, response.data.data.metadata);
                }

                // Fusionner les sections avec un préfixe de page pour éviter les conflits
                for (const [sectionName, fields] of Object.entries(pageSections)) {
                    const displayName = pageName === 'global' ? `Global - ${sectionName}` : sectionName;
                    if (!allSections[displayName]) {
                        allSections[displayName] = [];
                    }
                    allSections[displayName].push(...(fields as ImageSection[]));
                }
            }

            setImages(allImages);
            setOriginalImages(JSON.parse(JSON.stringify(allImages)));
            setMetadata(allMetadata);
            setSections(allSections);
            setPageMapping(keyToPage);
        } catch (error) {
            console.error('Failed to load images:', error);
        } finally {
            setLoading(false);
        }
    }, [pageNames]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    useEffect(() => {
        const hasChanges = JSON.stringify(images) !== JSON.stringify(originalImages);
        setHasUnsavedChanges(hasChanges);
    }, [images, originalImages]);

    const handleUpload = useCallback(
        async (key: string, file: File, explicitPageName?: string) => {
            try {
                setUploading(true);
                setUploadingKey(key);

                // Déterminer la page à partir du mapping ou utiliser la page explicite
                const targetPage = explicitPageName || pageMapping[key] || pageNames[0];

                const formData = new FormData();
                formData.append('page', targetPage);
                formData.append('key', key);
                formData.append('image', file);

                const response = await axios.post('/dashboard/pages/images/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const newPath = response.data.data.path;
                    setImages((prev) => ({
                        ...prev,
                        [key]: newPath,
                    }));
                    setOriginalImages((prev) => ({
                        ...prev,
                        [key]: newPath,
                    }));
                }
            } catch (error) {
                console.error('Failed to upload image:', error);
                throw error;
            } finally {
                setUploading(false);
                setUploadingKey(null);
            }
        },
        [pageMapping, pageNames],
    );

    const handleReset = useCallback(() => {
        setImages(JSON.parse(JSON.stringify(originalImages)));
    }, [originalImages]);

    const reloadImages = useCallback(async () => {
        await loadImages();
    }, [loadImages]);

    return {
        images,
        originalImages,
        loading,
        uploading,
        uploadingKey,
        hasUnsavedChanges,
        metadata,
        sections,
        handleUpload,
        handleReset,
        reloadImages,
    };
}
