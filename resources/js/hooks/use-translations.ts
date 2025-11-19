import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

interface Translations {
    [locale: string]: {
        [key: string]: string;
    };
}

interface FieldMetadata {
    label: string;
    description: string;
    type: string;
    maxLength?: number;
    placeholder?: string;
    section: string;
}

interface Section {
    key: string;
    metadata: FieldMetadata;
}

interface UseTranslationsReturn {
    translations: Translations;
    selectedLocale: string;
    availableLocales: string[];
    loading: boolean;
    saving: boolean;
    hasUnsavedChanges: boolean;
    metadata: { [key: string]: FieldMetadata };
    sections: { [section: string]: Section[] };
    setSelectedLocale: (locale: string) => void;
    handleTranslationChange: (key: string, value: string) => void;
    handleSave: () => Promise<void>;
    handleReset: () => void;
    reloadPreview: () => void;
}

export function useTranslations(pageName: string): UseTranslationsReturn {
    const [translations, setTranslations] = useState<Translations>({});
    const [originalTranslations, setOriginalTranslations] = useState<Translations>({});
    const [selectedLocale, setSelectedLocale] = useState('fr');
    const [availableLocales, setAvailableLocales] = useState<string[]>([]);
    const [metadata, setMetadata] = useState<{ [key: string]: FieldMetadata }>({});
    const [sections, setSections] = useState<{ [section: string]: Section[] }>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    useEffect(() => {
        loadTranslations();
    }, [pageName]);

    useEffect(() => {
        // Check for unsaved changes
        const hasChanges = JSON.stringify(translations) !== JSON.stringify(originalTranslations);
        setHasUnsavedChanges(hasChanges);
    }, [translations, originalTranslations]);

    const loadTranslations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/dashboard/pages/${pageName}/translations`
            );
            const loadedTranslations = response.data.data.translations;
            setTranslations(loadedTranslations);
            setOriginalTranslations(JSON.parse(JSON.stringify(loadedTranslations)));
            setAvailableLocales(response.data.data.locales);
            setMetadata(response.data.data.metadata || {});
            setSections(response.data.data.sections || {});
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

            // Update original translations to match saved state
            setOriginalTranslations(JSON.parse(JSON.stringify(translations)));

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
        if (hasUnsavedChanges) {
            if (confirm('Are you sure you want to discard all unsaved changes?')) {
                setTranslations(JSON.parse(JSON.stringify(originalTranslations)));
            }
        } else {
            loadTranslations();
        }
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
        hasUnsavedChanges,
        metadata,
        sections,
        setSelectedLocale,
        handleTranslationChange,
        handleSave,
        handleReset,
        reloadPreview,
    };
}
