import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from './logo';
import NavMenu from './nav-menu';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className="relative z-50 w-full border-b bg-background dark:border-gray-700 dark:bg-gray-900">
                <div>
                    {/* Niveau 1: Logo + Barre de recherche centrée + Actions */}
                    <div className="w-full border-b bg-background backdrop-blur-md dark:border-gray-800 dark:bg-gray-900">
                        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
                            {/* Logo */}
                            <Link href="/" className="shrink-0 px-2 py-5">
                                <Logo width={110} />
                            </Link>

                            {/* Barre de recherche centrée - Version complète */}
                            <div className="hidden max-w-md flex-1 md:block">
                                <SearchBar variant="full" />
                            </div>

                            {/* Actions de droite */}
                            <div className="flex shrink-0 items-center gap-2">
                                {/* Boutons d'authentification */}
                                <Link href="/exam-registration" className="hidden lg:inline-flex">
                                    <Button variant="ghost" className="rounded-full border border-border transition-colors hover:border-foreground/20">
                                        {t('nav.exam_registration')}
                                    </Button>
                                </Link>
                                <Link href="/contact" className="hidden sm:inline-flex">
                                    <Button className="rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                                        {t('nav.contact')}
                                    </Button>
                                </Link>

                                {/* Bouton menu mobile */}
                                <Button size="icon" variant="ghost" className="rounded-full xl:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Niveau 2: Menu de navigation */}
                    <div
                        className={`hidden w-full bg-background backdrop-blur-md transition-all duration-300 xl:block dark:bg-gray-900 ${
                            isScrolled ? 'fixed top-0 z-40 border-b shadow-md dark:border-gray-800' : ''
                        }`}
                    >
                        <div className="container mx-auto px-4 py-0">
                            <NavMenu />
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer pour éviter que le contenu ne passe sous le header sticky */}
            <div className={isScrolled ? 'h-14' : ''} />

            {/* Menu mobile */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 pt-20 backdrop-blur-lg xl:hidden dark:bg-gray-900/95">
                    <div className="container mx-auto px-4 py-6">
                        <NavMenu mobile onNavigate={() => setMobileMenuOpen(false)} />

                        {/* Actions mobiles */}
                        <div className="mt-6 space-y-3 border-t pt-6 dark:border-gray-800">
                            <div className="flex flex-col gap-3">
                                <Link href="/exam-registration" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full rounded-full">
                                        {t('nav.exam_registration')}
                                    </Button>
                                </Link>
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-full">{t('nav.contact')}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
