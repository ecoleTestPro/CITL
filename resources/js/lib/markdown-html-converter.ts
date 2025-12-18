/**
 * Bidirectional Markdown ↔ HTML converter
 * Supports: bold, italic, underline, strikethrough, links, lists, headings
 *
 * JSON format (Markdown-like):
 * - **bold** → <strong>bold</strong>
 * - *italic* or _italic_ → <em>italic</em>
 * - __underline__ → <u>underline</u>
 * - ~~strikethrough~~ → <s>strikethrough</s>
 * - [text](url) → <a href="url">text</a>
 * - # Heading → <h1>Heading</h1>
 * - ## Heading → <h2>Heading</h2>
 * - ### Heading → <h3>Heading</h3>
 * - \n → <br> or <p>
 */

/**
 * Convert Markdown-like format to HTML (for TipTap editor)
 */
export function markdownToHtml(markdown: string): string {
    if (!markdown) return '';

    let html = markdown;

    // Escape HTML entities first (except for already existing HTML)
    if (!html.includes('<')) {
        html = html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // Bold: **text** → <strong>text</strong>
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic: *text* or _text_ → <em>text</em> (but not ** or __)
    html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
    html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');

    // Underline: __text__ → <u>text</u>
    html = html.replace(/__([^_]+)__/g, '<u>$1</u>');

    // Strikethrough: ~~text~~ → <s>text</s>
    html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');

    // Links: [text](url) → <a href="url">text</a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Headings (at start of line or after newline)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Unordered lists: - item or * item
    html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');

    // Ordered lists: 1. item
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> in <ul> or <ol>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return `<ul>${match}</ul>`;
    });

    // Convert double newlines to paragraphs
    const paragraphs = html.split(/\n\n+/);
    if (paragraphs.length > 1) {
        html = paragraphs
            .map((p) => {
                p = p.trim();
                if (!p) return '';
                // Don't wrap if already wrapped in block elements
                if (/^<(h[1-6]|ul|ol|li|p|div|blockquote)/.test(p)) {
                    return p;
                }
                return `<p>${p}</p>`;
            })
            .filter(Boolean)
            .join('');
    }

    // Convert single newlines to <br> within paragraphs
    html = html.replace(/(?<!>)\n(?!<)/g, '<br>');

    return html;
}

/**
 * Convert HTML to Markdown-like format (for JSON storage)
 */
export function htmlToMarkdown(html: string): string {
    if (!html) return '';

    let markdown = html;

    // Remove wrapper paragraph if it's the only content
    markdown = markdown.replace(/^<p>(.*)<\/p>$/s, '$1');

    // Bold: <strong>text</strong> or <b>text</b> → **text**
    markdown = markdown.replace(/<(strong|b)>([^<]+)<\/\1>/gi, '**$2**');

    // Italic: <em>text</em> or <i>text</i> → *text*
    markdown = markdown.replace(/<(em|i)>([^<]+)<\/\1>/gi, '*$2*');

    // Underline: <u>text</u> → __text__
    markdown = markdown.replace(/<u>([^<]+)<\/u>/gi, '__$1__');

    // Strikethrough: <s>text</s> or <del>text</del> or <strike>text</strike> → ~~text~~
    markdown = markdown.replace(/<(s|del|strike)>([^<]+)<\/\1>/gi, '~~$2~~');

    // Links: <a href="url">text</a> → [text](url)
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)');

    // Headings
    markdown = markdown.replace(/<h1[^>]*>([^<]+)<\/h1>/gi, '# $1');
    markdown = markdown.replace(/<h2[^>]*>([^<]+)<\/h2>/gi, '## $1');
    markdown = markdown.replace(/<h3[^>]*>([^<]+)<\/h3>/gi, '### $1');

    // List items
    markdown = markdown.replace(/<li[^>]*>([^<]+)<\/li>/gi, '- $1');

    // Remove ul/ol wrappers
    markdown = markdown.replace(/<\/?[uo]l[^>]*>/gi, '');

    // Paragraphs to double newlines
    markdown = markdown.replace(/<\/p>\s*<p[^>]*>/gi, '\n\n');
    markdown = markdown.replace(/<p[^>]*>/gi, '');
    markdown = markdown.replace(/<\/p>/gi, '');

    // Line breaks
    markdown = markdown.replace(/<br\s*\/?>/gi, '\n');

    // Remove remaining HTML tags
    markdown = markdown.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    markdown = markdown
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');

    // Clean up extra whitespace
    markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

    return markdown;
}

/**
 * Check if a string contains HTML tags
 */
export function containsHtml(text: string): boolean {
    return /<[^>]+>/.test(text);
}

/**
 * Check if a string contains Markdown formatting
 */
export function containsMarkdown(text: string): boolean {
    return /(\*\*|__|~~|\[.*\]\(.*\)|^#+\s|^[-*]\s|^\d+\.\s)/m.test(text);
}

/**
 * Auto-detect format and convert to HTML for editor
 */
export function toEditorFormat(text: string): string {
    if (!text) return '';

    // If already HTML, return as-is
    if (containsHtml(text)) {
        return text;
    }

    // If contains Markdown, convert to HTML
    if (containsMarkdown(text)) {
        return markdownToHtml(text);
    }

    // Plain text - wrap in paragraph if multiline
    if (text.includes('\n')) {
        return text
            .split(/\n\n+/)
            .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    return text;
}

/**
 * Convert from editor format to storage format (Markdown)
 */
export function toStorageFormat(html: string): string {
    if (!html) return '';

    // If it's just plain text without HTML, return as-is
    if (!containsHtml(html)) {
        return html;
    }

    return htmlToMarkdown(html);
}
