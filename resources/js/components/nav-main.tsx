'use client';

import { Link } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type SubItem = {
    title: string;
    url: string;
    isActive?: boolean;
    items?: SubItem[];
};

type NavItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: SubItem[];
};

// Styles communs
const activeStyles = 'bg-orange-100 text-orange-700 font-semibold dark:bg-orange-900/50 dark:text-orange-300';
const inactiveStyles = 'text-sidebar-foreground';
const baseButtonStyles = 'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer';
const baseSubButtonStyles = 'relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer';

// Composant pour les sous-menus imbriqués (3ème niveau)
function NestedSubMenu({ subItem }: { subItem: SubItem }) {
    const [isOpen, setIsOpen] = React.useState(subItem.isActive || false);

    return (
        <SidebarMenuSubItem>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(baseSubButtonStyles, subItem.isActive ? activeStyles : inactiveStyles)}
            >
                <span className="truncate">{subItem.title}</span>
                <ChevronRight
                    className={cn(
                        'ml-auto h-4 w-4 shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-90',
                    )}
                />
            </button>
            {isOpen && subItem.items && (
                <SidebarMenuSub className="ml-2 mt-1 border-l border-sidebar-border pl-2">
                    {subItem.items.map((nestedItem) => (
                        <SidebarMenuSubItem key={nestedItem.title}>
                            <Link
                                href={nestedItem.url}
                                className={cn(baseSubButtonStyles, nestedItem.isActive ? activeStyles : inactiveStyles)}
                            >
                                {nestedItem.isActive && (
                                    <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange-500 dark:bg-orange-400" />
                                )}
                                <span className="truncate">{nestedItem.title}</span>
                            </Link>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuSubItem>
    );
}

// Composant pour les menus principaux avec sous-menus
function MainMenuItem({ item }: { item: NavItem }) {
    const [isOpen, setIsOpen] = React.useState(item.isActive || false);
    const Icon = item.icon;

    return (
        <SidebarMenuItem>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(baseButtonStyles, item.isActive ? activeStyles : inactiveStyles)}
            >
                {Icon && <Icon className={cn('h-4 w-4 shrink-0', item.isActive && 'text-orange-600 dark:text-orange-400')} />}
                <span className="truncate">{item.title}</span>
                <ChevronRight
                    className={cn(
                        'ml-auto h-4 w-4 shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-90',
                    )}
                />
            </button>
            {isOpen && item.items && (
                <SidebarMenuSub className="mt-1">
                    {item.items.map((subItem) =>
                        subItem.items && subItem.items.length > 0 ? (
                            <NestedSubMenu key={subItem.title} subItem={subItem} />
                        ) : (
                            <SidebarMenuSubItem key={subItem.title}>
                                <Link
                                    href={subItem.url}
                                    className={cn(baseSubButtonStyles, subItem.isActive ? activeStyles : inactiveStyles)}
                                >
                                    {subItem.isActive && (
                                        <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange-500 dark:bg-orange-400" />
                                    )}
                                    <span className="truncate">{subItem.title}</span>
                                </Link>
                            </SidebarMenuSubItem>
                        ),
                    )}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );
}

export function NavMain({ items }: { items: NavItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.items && item.items.length > 0 ? (
                        <MainMenuItem key={item.title} item={item} />
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <Link
                                href={item.url}
                                className={cn(baseButtonStyles, item.isActive ? activeStyles : inactiveStyles)}
                            >
                                {item.icon && (
                                    <item.icon
                                        className={cn('h-4 w-4 shrink-0', item.isActive && 'text-orange-600 dark:text-orange-400')}
                                    />
                                )}
                                <span className="truncate">{item.title}</span>
                            </Link>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
