import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { BookOpen, FileText, Hash, Loader2, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    variant?: 'icon' | 'full';
    className?: string;
}

interface SearchResult {
    pages: Array<{
        title: string;
        slug: string;
        url: string;
        content: string;
        category: string;
    }>;
    certifications: Array<{
        name: string;
        short_name: string;
        category: string;
        level: string;
        url: string;
        content: string;
    }>;
    glossary: Array<{
        id: number;
        term: string;
        definition: string;
        letter: string;
        url: string;
    }>;
    total: number;
    query: string;
}

export const SearchBar = ({ variant = 'icon', className }: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const { t } = useTranslation();
    const searchRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout>();

    // Fermer le dropdown quand on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Recherche avec debounce (400ms)
    useEffect(() => {
        // Nettoyer le timer précédent
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Si la requête a moins de 2 caractères, ne rien faire
        if (searchQuery.trim().length < 2) {
            setResults(null);
            setShowResults(false);
            return;
        }

        // Définir un nouveau timer
        debounceTimerRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<{
                    success: boolean;
                    data: SearchResult;
                }>('/api/search', {
                    params: { q: searchQuery, limit: 5 },
                });

                if (response.data.success) {
                    setResults(response.data.data);
                    setShowResults(true);
                }
            } catch (error) {
                console.error('Erreur de recherche:', error);
            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Optionnel: rediriger vers une page de résultats
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery('');
        setResults(null);
        setShowResults(false);
    };

    const handleResultClick = () => {
        setShowResults(false);
        setSearchQuery('');
        if (variant === 'icon') {
            setIsOpen(false);
        }
    };

    // Rendu du dropdown de résultats
    const renderResultsDropdown = () => {
        if (!showResults || !results || searchQuery.length < 2) return null;

        const hasResults = results.total > 0;

        return (
            <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-lg border bg-background shadow-lg">
                <div className="max-h-[500px] overflow-y-auto p-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            <span className="ml-2 text-sm text-muted-foreground">Recherche...</span>
                        </div>
                    ) : !hasResults ? (
                        <div className="py-8 text-center">
                            <p className="text-sm text-muted-foreground">Aucun résultat trouvé pour "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Pages */}
                            {results.pages.length > 0 && (
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        Pages ({results.pages.length})
                                    </div>
                                    <div className="space-y-1">
                                        {results.pages.map((page, index) => (
                                            <Link
                                                key={index}
                                                href={page.url}
                                                onClick={handleResultClick}
                                                className="block rounded-md p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="font-medium">{page.title}</div>
                                                <div className="mt-1 text-xs text-muted-foreground">{page.category}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certifications */}
                            {results.certifications.length > 0 && (
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <BookOpen className="h-4 w-4" />
                                        Certifications ({results.certifications.length})
                                    </div>
                                    <div className="space-y-1">
                                        {results.certifications.map((cert, index) => (
                                            <Link
                                                key={index}
                                                href={cert.url}
                                                onClick={handleResultClick}
                                                className="block rounded-md p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="font-medium">{cert.name}</div>
                                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                                                        {cert.short_name}
                                                    </span>
                                                    <span>{cert.level}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Glossaire */}
                            {results.glossary.length > 0 && (
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <Hash className="h-4 w-4" />
                                        Glossaire ({results.glossary.length})
                                    </div>
                                    <div className="space-y-1">
                                        {results.glossary.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={item.url}
                                                onClick={handleResultClick}
                                                className="block rounded-md p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="font-medium">{item.term}</div>
                                                <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.definition}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Variant icône - Ouvre un modal de recherche
    if (variant === 'icon') {
        return (
            <>
                <Button size="icon" variant="ghost" className={cn('rounded-full hover:bg-accent', className)} onClick={() => setIsOpen(true)}>
                    <Search className="h-4 w-4" />
                    <span className="sr-only">{t('nav.search')}</span>
                </Button>

                {/* Modal de recherche */}
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/95 px-4 pt-20 backdrop-blur-lg" onClick={handleClose}>
                        <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()} ref={searchRef}>
                            {/* Barre de recherche */}
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('nav.search')}
                                    className="h-14 rounded-2xl border-2 pr-12 pl-12 text-lg focus-visible:ring-2 focus-visible:ring-primary"
                                    autoFocus
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
                                    onClick={handleClose}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </form>

                            {/* Résultats de recherche */}
                            {renderResultsDropdown()}

                            {/* Suggestions (si pas de recherche) */}
                            {!searchQuery && (
                                <div className="mt-6 rounded-2xl border bg-background p-6">
                                    <h3 className="mb-4 text-sm font-medium">Recherches populaires</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Certifications', 'Examens', 'Formation', 'CTFL', 'Glossaire'].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setSearchQuery(term)}
                                                className="rounded-full bg-accent/50 px-4 py-2 text-sm transition-colors hover:bg-accent"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Variant full - Barre de recherche complète avec dropdown
    return (
        <div className={cn('relative', className)} ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('nav.search')}
                    className="w-full rounded-full border-none bg-muted pl-10 pr-10 shadow-none focus-visible:ring-1"
                />
                {isLoading && <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />}
            </form>

            {/* Résultats */}
            {renderResultsDropdown()}
        </div>
    );
};
