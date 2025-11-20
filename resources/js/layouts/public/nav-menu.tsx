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
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface NavMenuProps {
    mobile?: boolean;
    onNavigate?: () => void;
}

const NavMenu = ({ mobile = false, onNavigate }: NavMenuProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

    // Rendu d'un élément de menu dropdown - Version améliorée
    const renderDropdownItem = (item: MenuItem) => (
        <li key={item.href}>
            <NavigationMenuLink asChild>
                <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="group relative block space-y-1 rounded-xl p-3 leading-none no-underline transition-all duration-200 outline-none select-none hover:bg-accent/50"
                >
                    {/* Effet de fond au hover */}
                    <div className="absolute inset-0 rounded-xl bg-accent/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 -z-10" />
                    <div className="relative text-sm leading-tight font-medium text-foreground/80 group-hover:text-foreground">
                        {item.label}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );

    // Rendu d'une section de menu - Desktop
    const renderDesktopMenuSection = (section: MenuSection) => {
        if (section.type === 'link') {
            return (
                <NavigationMenuItem key={section.title}>
                    <Link href={section.href!}>
                        <NavigationMenuLink
                            className={cn(
                                'group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
                            )}
                        >
                            {section.title}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            );
        }

        // Type dropdown avec nouveau style
        const gridClass = section.gridCols === 2 ? 'grid w-[500px] gap-2 p-4 md:w-[600px] md:grid-cols-2' : 'grid w-[400px] gap-2 p-4';

        return (
            <NavigationMenuItem key={section.title}>
                <NavigationMenuTrigger className="rounded-full hover:bg-accent/50 data-[state=open]:bg-accent/50">
                    {section.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className={cn(gridClass, 'rounded-2xl')}>{section.items?.map(renderDropdownItem)}</ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    };

    // Rendu d'une section de menu - Mobile
    const renderMobileMenuSection = (section: MenuSection) => {
        const isOpen = openDropdown === section.title;

        if (section.type === 'link') {
            return (
                <div key={section.title} className="border-b border-border/50">
                    <Link
                        href={section.href!}
                        onClick={onNavigate}
                        className="flex items-center justify-between py-4 text-base font-medium hover:text-primary transition-colors"
                    >
                        {section.title}
                    </Link>
                </div>
            );
        }

        return (
            <div key={section.title} className="border-b border-border/50">
                <button
                    onClick={() => setOpenDropdown(isOpen ? null : section.title)}
                    className="flex w-full items-center justify-between py-4 text-base font-medium hover:text-primary transition-colors"
                >
                    {section.title}
                    <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                    <div className="pb-4 pl-4 space-y-2">
                        {section.items?.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className="block py-2 text-sm text-foreground/70 hover:text-foreground hover:translate-x-1 transition-all"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Version mobile
    if (mobile) {
        return (
            <div className="space-y-1">
                {[...menuLeft, ...menuRight].map(renderMobileMenuSection)}
            </div>
        );
    }

    // Version desktop
    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-1">
                {[...menuLeft, ...menuRight].map(renderDesktopMenuSection)}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavMenu;
