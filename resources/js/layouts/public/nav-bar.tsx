import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './logo';
import NavMenu from './nav-menu';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMenuSticky, setIsMenuSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Le menu devient sticky après avoir scrollé de 80px (hauteur du premier niveau)
            setIsMenuSticky(window.scrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="relative z-50 w-full">
            {/* Niveau 1: Logo + Recherche centrée + Actions */}
            <div className="border-b bg-background">
                <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Logo />
                    </Link>

                    {/* Barre de recherche centrée */}
                    <div className="relative hidden flex-1 max-w-md md:block">
                        <Search className="absolute inset-y-0 left-3 my-auto h-4 w-4 text-muted-foreground" />
                        <Input
                            className="w-full rounded-full border-none bg-muted pl-10 shadow-none focus-visible:ring-1"
                            placeholder="Rechercher..."
                        />
                    </div>

                    {/* Actions de droite */}
                    <div className="flex shrink-0 items-center gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        {/* Boutons d'authentification */}
                        <Link href="/login">
                            <Button variant="outline" className="hidden rounded-full sm:inline-flex">
                                Connexion
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="rounded-full">
                                S'inscrire
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Niveau 2: Menu de navigation */}
            <div
                className={`border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300 ${
                    isMenuSticky ? 'sticky top-0 shadow-md' : ''
                }`}
            >
                <div className="container mx-auto px-4">
                    <NavMenu />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
