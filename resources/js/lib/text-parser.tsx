import { markdownToHtml, containsMarkdown, containsHtml as checkHtml } from './markdown-html-converter';

/**
 * Vérifie si le texte contient du HTML
 * @param text - Le texte à vérifier
 * @returns true si le texte contient des balises HTML
 */
function containsHtml(text: string | null | undefined): boolean {
    if (!text) return false;
    return checkHtml(text);
}

/**
 * Convertit le texte Markdown en HTML si nécessaire
 * @param text - Le texte à convertir
 * @returns Le texte converti en HTML ou le texte original
 */
function convertToHtml(text: string): string {
    if (containsHtml(text)) {
        return text; // Déjà du HTML
    }
    if (containsMarkdown(text)) {
        return markdownToHtml(text);
    }
    return text;
}

/**
 * Parse le texte et remplace les patterns **texte** par du texte en gras
 * @param text - Le texte à parser (peut contenir **mot** pour le gras)
 * @returns Un tableau de ReactNode avec les parties en gras
 */
export function parseTextWithBold(text: string | null | undefined): React.ReactNode {
    // Si le texte est null ou undefined, retourner une chaîne vide
    if (!text) return '';

    // Regex pour capturer le texte entre **
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = boldPattern.exec(text)) !== null) {
        // Ajouter le texte avant le match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        // Ajouter le texte en gras
        parts.push(
            <strong key={match.index} className="font-bold">
                {match[1]}
            </strong>
        );

        lastIndex = match.index + match[0].length;
    }

    // Ajouter le texte restant
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
}

/**
 * Composant pour afficher du texte avec support du gras via ** ou HTML
 * Détecte automatiquement si le contenu est du HTML et utilise dangerouslySetInnerHTML
 * @param text - Le texte à afficher (peut contenir **mot** pour le gras ou du HTML)
 * @param className - Classes CSS optionnelles
 * @param as - Élément HTML à utiliser (par défaut: span)
 */
interface RichTextProps {
    text: string | null | undefined;
    className?: string;
    as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'td' | 'th' | 'label';
}

export function RichText({ text, className = '', as = 'span' }: RichTextProps) {
    // Si le texte est null ou undefined, retourner un élément vide
    if (!text) {
        return null;
    }

    // Convertir le Markdown en HTML si nécessaire
    const htmlContent = convertToHtml(text);
    const hasFormatting = containsHtml(htmlContent) || containsMarkdown(text);

    // Si le texte contient du formatage (HTML ou Markdown converti), utiliser dangerouslySetInnerHTML
    if (hasFormatting) {
        const Element = as;
        return <Element className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }

    // Sinon, retourner le texte brut
    const Element = as;
    return <Element className={className}>{text}</Element>;
}
