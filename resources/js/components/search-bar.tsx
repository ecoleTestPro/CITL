import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    variant?: 'icon' | 'full';
    className?: string;
}

export const SearchBar = ({ variant = 'icon', className }: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useTranslation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // TODO: Implémenter la logique de recherche
            console.log('Searching for:', searchQuery);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery('');
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
                        <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
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

                            {/* Résultats de recherche (placeholder) */}
                            {searchQuery && (
                                <div className="mt-6 rounded-2xl border bg-background p-6">
                                    <p className="text-center text-sm text-muted-foreground">Recherche de "{searchQuery}"...</p>
                                    {/* TODO: Afficher les résultats de recherche ici */}
                                </div>
                            )}

                            {/* Suggestions (si pas de recherche) */}
                            {!searchQuery && (
                                <div className="mt-6 rounded-2xl border bg-background p-6">
                                    <h3 className="mb-4 text-sm font-medium">Recherches populaires</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Certifications', 'Examens', 'Formation', 'À propos'].map((term) => (
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

    // Variant full - Barre de recherche complète
    return (
        <form onSubmit={handleSearch} className={cn('relative', className)}>
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.search')}
                className="w-full rounded-full border-none bg-muted pl-10 shadow-none focus-visible:ring-1"
            />
        </form>
    );
};
