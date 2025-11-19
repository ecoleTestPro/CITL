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
import { useState } from 'react';

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

// Configuration du menu - Partie gauche (navigation principale)
const MENU_LEFT: MenuSection[] = [
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
        title: 'Inscription',
        type: 'dropdown',
        items: [
            { label: "S'inscrire sur la liste officielle", href: '/register-certified-testers' },
            { label: 'Liste officielle des testeurs', href: '/certified-testers-list' },
            { label: 'Registre ISTQB', href: '/istqb-registry' },
        ],
    },
];

// Configuration du menu - Partie droite (liens secondaires)
const MENU_RIGHT: MenuSection[] = [
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
        title: 'Contact',
        type: 'link',
        href: '/contact',
    },
];

const NavMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Rendu d'un élément de menu dropdown
    const renderDropdownItem = (item: MenuItem) => (
        <li key={item.href}>
            <NavigationMenuLink asChild>
                <Link
                    href={item.href}
                    className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="text-sm leading-none font-medium">{item.label}</div>
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
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{section.title}</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            );
        }

        // Type dropdown
        const gridClass = section.gridCols === 2 ? 'grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2' : 'grid w-[400px] gap-3 p-4';

        return (
            <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className={gridClass}>{section.items?.map(renderDropdownItem)}</ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    };

    return (
        <div className="flex items-center justify-between">
            {/* Desktop Navigation - Partie gauche */}
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>{MENU_LEFT.map(renderMenuSection)}</NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Navigation - Partie droite */}
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>{MENU_RIGHT.map(renderMenuSection)}</NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavMenu;
