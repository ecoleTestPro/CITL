import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { ArrowUp, Globe, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FloatingActions = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { appearance, updateAppearance } = useAppearance();
    const { i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            // Afficher les boutons après 300px de scroll
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const toggleTheme = () => {
        const newTheme = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(newTheme);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
            {/* Bouton Scroll to Top */}
            <Button
                size="icon"
                onClick={scrollToTop}
                className="h-12 w-12 rounded-full bg-citl-orange shadow-lg transition-all duration-300 hover:scale-110 hover:bg-citl-orange/90"
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5 text-white" />
            </Button>

            {/* Bouton Changement de thème */}
            {false && (
                <Button
                    size="icon"
                    onClick={toggleTheme}
                    className="h-12 w-12 rounded-full border border-border bg-background shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Toggle theme"
                >
                    {appearance === 'dark' ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
                </Button>
            )}

            {/* Bouton Changement de langue */}
            {false && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            className="h-12 w-12 rounded-full border border-border bg-background shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Change language"
                        >
                            <Globe className="h-5 w-5 text-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'bg-accent' : ''}>
                            🇫🇷 Français
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'bg-accent' : ''}>
                            🇬🇧 English
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
