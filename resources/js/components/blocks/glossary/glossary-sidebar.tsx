import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GlossarySidebarProps {
    availableLetters: string[];
    filteredLetters: string[];
    activeLetter: string | null;
    onLetterClick: (letter: string) => void;
    onSearch: (term: string) => void;
}

export function GlossarySidebar({ availableLetters, filteredLetters, activeLetter, onLetterClick, onSearch }: GlossarySidebarProps) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const stickyRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [stickyStyles, setStickyStyles] = useState<React.CSSProperties>({});

    // Custom sticky behavior using scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (!placeholderRef.current || !stickyRef.current) return;

            const placeholder = placeholderRef.current;
            const sidebar = stickyRef.current;
            const placeholderRect = placeholder.getBoundingClientRect();
            const sidebarHeight = sidebar.offsetHeight;
            const topOffset = 96; // 24 * 4 = 96px (top-24)

            // Get the parent container to know the bounds
            const parentContainer = placeholder.closest('.lg\\:col-span-3')?.parentElement;
            if (!parentContainer) return;

            const parentRect = parentContainer.getBoundingClientRect();
            const maxBottom = parentRect.bottom - sidebarHeight - 20;

            // Check if we should activate sticky
            if (placeholderRect.top <= topOffset) {
                setIsSticky(true);

                // Calculate the left position based on placeholder
                const leftPosition = placeholderRect.left;
                const width = placeholderRect.width;

                // Check if we've scrolled past the content area
                if (maxBottom < topOffset) {
                    // Pin to the bottom of the content area
                    setStickyStyles({
                        position: 'fixed',
                        top: `${maxBottom}px`,
                        left: `${leftPosition}px`,
                        width: `${width}px`,
                    });
                } else {
                    // Normal sticky at top
                    setStickyStyles({
                        position: 'fixed',
                        top: `${topOffset}px`,
                        left: `${leftPosition}px`,
                        width: `${width}px`,
                    });
                }
            } else {
                setIsSticky(false);
                setStickyStyles({});
            }
        };

        // Also handle resize to recalculate positions
        const handleResize = () => {
            handleScroll();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const scrollToLetter = (letter: string) => {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
            onLetterClick(letter);
        }
    };

    return (
        <>
            {/* Placeholder to maintain layout space when sidebar is fixed */}
            <div ref={placeholderRef} style={{ height: isSticky ? stickyRef.current?.offsetHeight : 'auto' }} />

            <div ref={stickyRef} className="space-y-6" style={isSticky ? stickyStyles : {}}>
            {/* Search Box */}
            <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{t('exams.glossary.search')}</h3>
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder={t('exams.glossary.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Alphabet Navigation */}
            <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{t('exams.glossary.alphabet_nav')}</h3>
                <div className="grid grid-cols-7 gap-2">
                    {alphabet.map((letter) => {
                        const isInGlossary = availableLetters.includes(letter);
                        const isFiltered = filteredLetters.includes(letter);
                        const isActive = activeLetter === letter;
                        const isClickable = isFiltered;

                        return (
                            <button
                                key={letter}
                                onClick={() => isClickable && scrollToLetter(letter)}
                                disabled={!isClickable}
                                className={`flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary text-white shadow-md'
                                        : isClickable
                                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                                          : isInGlossary && !isFiltered
                                            ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-50 dark:bg-gray-800 dark:text-gray-500'
                                            : 'cursor-not-allowed bg-gray-50 text-gray-300 dark:bg-gray-900 dark:text-gray-700'
                                }`}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>
            </div>
        </>
    );
}
