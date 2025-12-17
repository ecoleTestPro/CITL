import { SupportedLanguage, TranslatableField } from '@/types';

/**
 * Service de traduction pour les certifications
 * Utilise l'API backend pour contourner les problèmes SSL/proxy
 */
export class TranslationService {
    private static readonly API_URL = '/api/translate';

    /**
     * Traduit un texte d'une langue source vers une langue cible
     */
    static async translate(text: string, from: SupportedLanguage, to: SupportedLanguage): Promise<string> {
        if (!text || text.trim() === '') {
            return '';
        }

        // Si le texte est identique à la source/cible
        if (from === to) {
            return text;
        }

        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    text,
                    from,
                    to,
                }),
            });

            if (!response.ok) {
                throw new Error('Translation API error');
            }

            const data = await response.json();

            if (data.success && data.translation) {
                return data.translation;
            }

            throw new Error(data.message || 'Translation failed');
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }

    /**
     * Traduit plusieurs champs à la fois
     */
    static async translateMultiple(
        fields: Partial<Record<TranslatableField, string>>,
        from: SupportedLanguage,
        to: SupportedLanguage,
    ): Promise<Partial<Record<TranslatableField, string>>> {
        try {
            const response = await fetch(`${this.API_URL}/multiple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    fields,
                    from,
                    to,
                }),
            });

            if (!response.ok) {
                throw new Error('Translation API error');
            }

            const data = await response.json();

            if (data.success && data.translations) {
                return data.translations as Partial<Record<TranslatableField, string>>;
            }

            throw new Error(data.message || 'Translation failed');
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }

    /**
     * Traduit le contenu HTML (pour les champs rich text)
     * Préserve les balises HTML tout en traduisant le texte
     */
    static async translateHtml(html: string, from: SupportedLanguage, to: SupportedLanguage): Promise<string> {
        if (!html || html.trim() === '') {
            return '';
        }

        // Pour les contenus HTML, on traduit le texte tout en préservant la structure
        return this.translate(html, from, to);
    }
}
