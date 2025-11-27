import { Fragment } from 'react';

/**
 * Parse le texte et remplace les patterns **texte** par du texte en gras
 * @param text - Le texte à parser (peut contenir **mot** pour le gras)
 * @returns Un tableau de ReactNode avec les parties en gras
 */
export function parseTextWithBold(text: string): React.ReactNode {
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
 * Composant pour afficher du texte avec support du gras via **
 * @param text - Le texte à afficher
 * @param className - Classes CSS optionnelles
 */
interface RichTextProps {
    text: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export function RichText({ text, className = '', as: Component = 'span' }: RichTextProps) {
    return <Component className={className}>{parseTextWithBold(text)}</Component>;
}
