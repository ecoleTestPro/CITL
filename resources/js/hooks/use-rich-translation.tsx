import { containsHtml, containsMarkdown, markdownToHtml } from '@/lib/markdown-html-converter';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that extends useTranslation to support rich text rendering.
 * Automatically converts Markdown formatting to HTML.
 *
 * Usage:
 * const { t, tRich } = useRichTranslation();
 *
 * // Plain text (no conversion)
 * <span>{t('key')}</span>
 *
 * // Rich text (converts Markdown to HTML)
 * <span dangerouslySetInnerHTML={{ __html: tRich('key') }} />
 *
 * // Or use the RichText component from @/lib/text-parser
 * import { RichText } from '@/lib/text-parser';
 * <RichText text={t('key')} />
 */
export function useRichTranslation(ns?: string) {
    const { t, i18n } = useTranslation(ns);

    /**
     * Translate and convert Markdown to HTML for rich text display
     */
    const tRich = useCallback(
        (key: string, options?: object): string => {
            const translated = t(key, options) as string;

            // If already HTML, return as-is
            if (containsHtml(translated)) {
                return translated;
            }

            // If the translation contains Markdown, convert to HTML
            if (containsMarkdown(translated)) {
                return markdownToHtml(translated);
            }

            return translated;
        },
        [t],
    );

    return {
        t,
        tRich,
        i18n,
    };
}

export default useRichTranslation;
