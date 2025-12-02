/**
 * Vérifie si le texte contient du HTML
 * @param text - Le texte à vérifier
 * @returns true si le texte contient des balises HTML
 */
function containsHtml(text: string): boolean {
    return /<[a-z][\s\S]*>/i.test(text);
}

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
 * Composant pour afficher du texte avec support du gras via ** ou HTML
 * Détecte automatiquement si le contenu est du HTML et utilise dangerouslySetInnerHTML
 * @param text - Le texte à afficher (peut contenir **mot** pour le gras ou du HTML)
 * @param className - Classes CSS optionnelles
 * @param as - Élément HTML à utiliser (par défaut: span)
 */
interface RichTextProps {
    text: string;
    className?: string;
    as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'td' | 'th' | 'label';
}

export function RichText({ text, className = '', as = 'span' }: RichTextProps) {
    const combinedClassName = containsHtml(text) ? `prose prose-sm dark:prose-invert max-w-none ${className}` : className;

    // Si le texte contient du HTML, utiliser dangerouslySetInnerHTML
    if (containsHtml(text)) {
        switch (as) {
            case 'p':
                return <p className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'div':
                return <div className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h1':
                return <h1 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h2':
                return <h2 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h3':
                return <h3 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h4':
                return <h4 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h5':
                return <h5 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'h6':
                return <h6 className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'li':
                return <li className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'td':
                return <td className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'th':
                return <th className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            case 'label':
                return <label className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
            default:
                return <span className={combinedClassName} dangerouslySetInnerHTML={{ __html: text }} />;
        }
    }

    // Sinon, utiliser le parser markdown pour **gras**
    const content = parseTextWithBold(text);
    switch (as) {
        case 'p':
            return <p className={className}>{content}</p>;
        case 'div':
            return <div className={className}>{content}</div>;
        case 'h1':
            return <h1 className={className}>{content}</h1>;
        case 'h2':
            return <h2 className={className}>{content}</h2>;
        case 'h3':
            return <h3 className={className}>{content}</h3>;
        case 'h4':
            return <h4 className={className}>{content}</h4>;
        case 'h5':
            return <h5 className={className}>{content}</h5>;
        case 'h6':
            return <h6 className={className}>{content}</h6>;
        case 'li':
            return <li className={className}>{content}</li>;
        case 'td':
            return <td className={className}>{content}</td>;
        case 'th':
            return <th className={className}>{content}</th>;
        case 'label':
            return <label className={className}>{content}</label>;
        default:
            return <span className={className}>{content}</span>;
    }
}
