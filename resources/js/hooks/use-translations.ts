import { useState, useEffect } from 'react';
import axios from 'axios';

interface Translations {
    [locale: string]: {
        [key: string]: string;
    };
}

interface UseTranslationsReturn {
    translations: Translations;
    selectedLocale: string;
    availableLocales: string[];
    loading: boolean;
    saving: boolean;
    setSelectedLocale: (locale: string) => void;
    handleTranslationChange: (key: string, value: string) => void;
    handleSave: () => Promise<void>;
    handleReset: () => void;
    reloadPreview: () => void;
}

export function useTranslations(pageName: string): UseTranslationsReturn {
    const [translations, setTranslations] = useState<Translations>({});
    const [selectedLocale, setSelectedLocale] = useState('fr');
    const [availableLocales, setAvailableLocales] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    useEffect(() => {
        loadTranslations();
    }, [pageName]);

    const loadTranslations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/dashboard/pages/${pageName}/translations`
            );
            setTranslations(response.data.data.translations);
            setAvailableLocales(response.data.data.locales);
        } catch (error) {
            console.error('Failed to load translations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.post('/dashboard/pages/translations', {
                locale: selectedLocale,
                translations: translations[selectedLocale],
            });

            // Reload preview to show updated content
            setPreviewKey((prev) => prev + 1);

            alert('Translations saved successfully!');
        } catch (error) {
            console.error('Failed to save translations:', error);
            alert('Failed to save translations');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        loadTranslations();
    };

    const handleTranslationChange = (key: string, value: string) => {
        setTranslations((prev) => ({
            ...prev,
            [selectedLocale]: {
                ...prev[selectedLocale],
                [key]: value,
            },
        }));
    };

    const reloadPreview = () => {
        setPreviewKey((prev) => prev + 1);
    };

    return {
        translations,
        selectedLocale,
        availableLocales,
        loading,
        saving,
        setSelectedLocale,
        handleTranslationChange,
        handleSave,
        handleReset,
        reloadPreview,
    };
}
