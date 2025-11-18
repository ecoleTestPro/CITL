import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from '@inertiajs/react';
import { Menu, Search } from 'lucide-react';
import { useState } from 'react';
import Logo from './logo';

// Types pour la structure du menu
interface MenuItem {
    label: string;
    href: string;
}

interface MenuSection {
    title: string;
    type: 'dropdown' | 'link';
    href?: string;
    items?: MenuItem[];
    gridCols?: number;
}

// Configuration du menu - Facile à maintenir !
const MENU_CONFIG: MenuSection[] = [
    {
        title: 'CITL',
        type: 'dropdown',
        items: [
            { label: "À propos de l'ISTQB", href: '/about-istqb' },
            { label: 'À propos du CITL', href: '/about-citl' },
            { label: 'Notre vision', href: '/vision' },
            { label: 'Nos missions', href: '/missions' },
            { label: 'Le bureau exécutif', href: '/executive-board' },
        ],
    },
    {
        title: 'Adhésion',
        type: 'dropdown',
        items: [
            { label: 'Membres du CITL', href: '/members' },
            { label: 'Les groupes de travail', href: '/working-groups' },
        ],
    },
    {
        title: 'Certifications',
        type: 'dropdown',
        gridCols: 2,
        items: [
            { label: 'Pourquoi obtenir la certification', href: '/why-certification' },
            { label: 'Core Foundation', href: '/core-foundation' },
            { label: 'Core Advanced', href: '/core-advanced' },
            { label: 'Specialist', href: '/specialist' },
            { label: 'Expert Level', href: '/expert-level' },
            { label: 'A4Q - Testeur Pratique', href: '/a4q-practical-tester' },
        ],
    },
    {
        title: 'Examens',
        type: 'dropdown',
        items: [
            { label: 'Questions et taux de réussite', href: '/exam-questions' },
            { label: "Frais d'examen", href: '/exam-fees' },
            { label: "S'inscrire à l'examen", href: '/exam-registration' },
            { label: 'FAQ sur les examens', href: '/exam-faq' },
            { label: 'Avertissement contre la contrefaçon', href: '/anti-piracy' },
            { label: 'Glossaire', href: '/glossary' },
        ],
    },
    {
        title: 'Formation',
        type: 'dropdown',
        items: [
            { label: 'Organismes accrédités', href: '/accredited-organizations' },
            { label: "Demande d'accréditation", href: '/accreditation-request' },
        ],
    },
    {
        title: 'Événements',
        type: 'link',
        href: '/events',
    },
    {
        title: 'Blog',
        type: 'link',
        href: '/blog',
    },
    {
        title: 'Inscription',
        type: 'dropdown',
        items: [
            { label: "S'inscrire sur la liste officielle", href: '/register-certified-testers' },
            { label: 'Liste officielle des testeurs', href: '/certified-testers-list' },
            { label: 'Registre ISTQB', href: '/istqb-registry' },
        ],
    },
    {
        title: 'Contact',
        type: 'link',
        href: '/contact',
    },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Rendu d'un élément de menu dropdown
    const renderDropdownItem = (item: MenuItem) => (
        <li key={item.href}>
            <NavigationMenuLink asChild>
                <Link
                    href={item.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="text-sm font-medium leading-none">
                        {item.label}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );

    // Rendu d'une section de menu
    const renderMenuSection = (section: MenuSection) => {
        if (section.type === 'link') {
            return (
                <NavigationMenuItem key={section.title}>
                    <Link href={section.href!}>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            {section.title}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            );
        }

        // Type dropdown
        const gridClass = section.gridCols === 2
            ? 'grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2'
            : 'grid w-[400px] gap-3 p-4';

        return (
            <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className={gridClass}>
                        {section.items?.map(renderDropdownItem)}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <Logo className="shrink-0" />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            {MENU_CONFIG.map(renderMenuSection)}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="relative hidden md:block">
                        <Search className="absolute inset-y-0 left-2.5 my-auto h-4 w-4" />
                        <Input
                            className="w-[200px] rounded-full border-none bg-muted pl-9 shadow-none"
                            placeholder="Rechercher..."
                        />
                    </div>
                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="hidden rounded-full sm:inline-flex"
                        >
                            Connexion
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-full">S'inscrire</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
