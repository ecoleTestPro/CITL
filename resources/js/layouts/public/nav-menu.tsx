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
import { useTranslation } from 'react-i18next';

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

const NavMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    // Configuration du menu traduite - Partie gauche (navigation principale)
    const menuLeft: MenuSection[] = [
        {
            title: t('nav.citl'),
            type: 'dropdown',
            items: [
                { label: t('nav.about_istqb'), href: '/about-istqb' },
                { label: t('nav.about_citl'), href: '/about-citl' },
                { label: t('nav.vision'), href: '/vision' },
                { label: t('nav.missions'), href: '/missions' },
                { label: t('nav.executive_board'), href: '/executive-board' },
            ],
        },
        {
            title: t('nav.membership'),
            type: 'dropdown',
            items: [
                { label: t('nav.members'), href: '/members' },
                { label: t('nav.working_groups'), href: '/working-groups' },
            ],
        },
        {
            title: t('nav.certifications'),
            type: 'dropdown',
            gridCols: 2,
            items: [
                { label: t('nav.why_certification'), href: '/why-certification' },
                { label: t('nav.core_foundation'), href: '/core-foundation' },
                { label: t('nav.core_advanced'), href: '/core-advanced' },
                { label: t('nav.specialist'), href: '/specialist' },
                { label: t('nav.expert_level'), href: '/expert-level' },
                { label: t('nav.a4q_practical_tester'), href: '/a4q-practical-tester' },
            ],
        },
        {
            title: t('nav.exams'),
            type: 'dropdown',
            items: [
                { label: t('nav.exam_questions'), href: '/exam-questions' },
                { label: t('nav.exam_fees'), href: '/exam-fees' },
                { label: t('nav.exam_registration'), href: '/exam-registration' },
                { label: t('nav.exam_faq'), href: '/exam-faq' },
                { label: t('nav.anti_piracy'), href: '/anti-piracy' },
                { label: t('nav.glossary'), href: '/glossary' },
            ],
        },
        {
            title: t('nav.training'),
            type: 'dropdown',
            items: [
                { label: t('nav.accredited_organizations'), href: '/accredited-organizations' },
                { label: t('nav.accreditation_request'), href: '/accreditation-request' },
            ],
        },
        {
            title: t('nav.registration'),
            type: 'dropdown',
            items: [
                { label: t('nav.register_certified_testers'), href: '/register-certified-testers' },
                { label: t('nav.certified_testers_list'), href: '/certified-testers-list' },
                { label: t('nav.istqb_registry'), href: '/istqb-registry' },
            ],
        },
    ];

    // Configuration du menu traduite - Partie droite (liens secondaires)
    const menuRight: MenuSection[] = [
        {
            title: t('nav.events'),
            type: 'link',
            href: '/events',
        },
        {
            title: t('nav.blog'),
            type: 'link',
            href: '/blog',
        },
        {
            title: t('nav.contact'),
            type: 'link',
            href: '/contact',
        },
    ];

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
                <NavigationMenuList>{menuLeft.map(renderMenuSection)}</NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Navigation - Partie droite */}
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>{menuRight.map(renderMenuSection)}</NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavMenu;
