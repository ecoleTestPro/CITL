import { Link, usePage } from '@inertiajs/react';

interface MenuItem {
    id: number;
    title: string;
    url: string | null;
    page?: {
        id: number;
        slug: string;
    };
}

interface MenuData {
    id: number;
    name: string;
    location: string;
    items: MenuItem[];
}

export function FooterMenu() {
    const { menus } = usePage().props as {
        menus: { header: MenuData | null; footer: MenuData | null };
    };

    if (!menus?.footer?.items || menus.footer.items.length === 0) {
        return null;
    }

    const getItemUrl = (item: MenuItem) => {
        if (item.url) return item.url;
        if (item.page?.slug) return `/${item.page.slug}`;
        return '#';
    };

    return (
        <footer className="border-t bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Logo and description */}
                    <div>
                        <h3 className="text-xl font-bold text-orange-600">
                            CITL
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Comité Ivoirien des Tests Logiciels - Représentant
                            officiel de l'ISTQB en Côte d'Ivoire
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                            Liens rapides
                        </h4>
                        <ul className="space-y-2">
                            {menus.footer.items.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={getItemUrl(item)}
                                        className="text-sm text-gray-600 hover:text-orange-600"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase text-gray-900">
                            Contact
                        </h4>
                        <p className="text-sm text-gray-600">
                            Email: contact@citl.ci
                            <br />
                            Abidjan, Côte d'Ivoire
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} CITL. Tous droits
                        réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
