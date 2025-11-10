import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    items: MenuItem[];
}

export function HeaderMenu() {
    const { menus } = usePage().props as {
        menus: { header: MenuData | null; footer: MenuData | null };
    };
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    if (!menus?.header?.items || menus.header.items.length === 0) {
        return null;
    }

    const getItemUrl = (item: MenuItem) => {
        if (item.url) return item.url;
        if (item.page?.slug) return `/${item.page.slug}`;
        return '#';
    };

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-orange-600">
                            CITL
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {menus.header.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative"
                                    onMouseEnter={() =>
                                        item.children &&
                                        item.children.length > 0 &&
                                        setOpenDropdown(item.id)
                                    }
                                    onMouseLeave={() =>
                                        setOpenDropdown(null)
                                    }
                                >
                                    {item.children && item.children.length > 0 ? (
                                        <>
                                            <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                                                {item.title}
                                                <ChevronDown className="ml-1 h-4 w-4" />
                                            </button>
                                            {openDropdown === item.id && (
                                                <div className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1">
                                                        {item.children.map(
                                                            (child) => (
                                                                <Link
                                                                    key={
                                                                        child.id
                                                                    }
                                                                    href={getItemUrl(
                                                                        child,
                                                                    )}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                                                >
                                                                    {
                                                                        child.title
                                                                    }
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={getItemUrl(item)}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {menus.header.items.map((item) => (
                                <div key={item.id}>
                                    {item.children && item.children.length > 0 ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(
                                                        openDropdown === item.id
                                                            ? null
                                                            : item.id,
                                                    )
                                                }
                                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                            >
                                                {item.title}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform ${
                                                        openDropdown === item.id
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            </button>
                                            {openDropdown === item.id && (
                                                <div className="ml-4 space-y-1">
                                                    {item.children.map(
                                                        (child) => (
                                                            <Link
                                                                key={child.id}
                                                                href={getItemUrl(
                                                                    child,
                                                                )}
                                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={getItemUrl(item)}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            {item.title}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
