import { usePage } from '@inertiajs/react';
import { MenuTemplateDefault } from '@/widgets/menu/menu-template-default';
import { MenuTemplateLogoCenterCta } from '@/widgets/menu/menu-template-logo-center-cta';
import { MenuTemplateLogoMenu } from '@/widgets/menu/menu-template-logo-menu';

interface MenuItem {
    id: number;
    title: string;
    url: string | null;
    page?: {
        id: number;
        slug: string;
    };
    children?: MenuItem[];
}

interface MenuData {
    id: number;
    name: string;
    location: string;
    style_template?: string;
    is_sticky?: boolean;
    style_config?: {
        logo?: string;
        show_search?: boolean;
        show_cta?: boolean;
        cta_text?: string;
        cta_url?: string;
    };
    items: MenuItem[];
}

export function HeaderMenu() {
    const { menus } = usePage().props as {
        menus: { header: MenuData | null; footer: MenuData | null };
    };

    if (!menus?.header?.items || menus.header.items.length === 0) {
        return null;
    }

    const template = menus.header.style_template || 'default';
    const isSticky = menus.header.is_sticky || false;

    // Render the appropriate template based on style_template
    switch (template) {
        case 'logo-center-cta':
            return (
                <MenuTemplateLogoCenterCta
                    menu={menus.header}
                    isSticky={isSticky}
                />
            );
        case 'logo-menu':
            return (
                <MenuTemplateLogoMenu
                    menu={menus.header}
                    isSticky={isSticky}
                />
            );
        case 'default':
        default:
            return (
                <MenuTemplateDefault
                    menu={menus.header}
                    isSticky={isSticky}
                />
            );
    }
}
