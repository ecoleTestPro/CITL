import { TableSection } from '@/components/common/table-section';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { ExternalLink, Globe, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AccreditedOrganization {
    id: number;
    name: string;
    country: string;
    city: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    logo: string | null;
    description: string | null;
    certifications: string | null;
}

// Composant pour afficher le nom avec le logo
function OrganizationName({ org }: { org: AccreditedOrganization }) {
    const { t } = useTranslation();

    return (
        <div className="flex items-start gap-3">
            {org.logo ? (
                (() => {
                    const src = String(org.logo || '');
                    const logoSrc = src.startsWith('http') || src.startsWith('https') ? src : `/storage/${src}`;
                    return <img src={logoSrc} alt={org.name} className="h-10 w-10 rounded-lg object-contain" />;
                })()
            ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-citl-orange/10">
                    <Globe className="h-5 w-5 text-citl-orange" />
                </div>
            )}
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white break-words">{org.name}</span>
                </div>
                {org.city && <p className="text-xs text-gray-500 dark:text-gray-400">{org.city}</p>}

                {org.certifications ? (
                    <div className="mt-2">
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                            {t('training.column_certifications')}
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: org.certifications }} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

// Composant pour afficher le lien du site web
function WebsiteLink({ website }: { website: string | null }) {
    if (!website) return <span className="text-gray-400">-</span>;

    return (
        <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Visiter</span>
        </a>
    );
}

// Composant pour afficher l'email
function EmailLink({ email }: { email: string | null }) {
    if (!email) return <span className="text-gray-400">-</span>;

    return (
        <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">{email}</span>
        </a>
    );
}

export function OrganizationsListSection() {
    const { t } = useTranslation();
    const [organizations, setOrganizations] = useState<AccreditedOrganization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch organizations on mount
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/accredited-organizations');
                setOrganizations(response.data.data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching organizations:', err);
                setError(t('training.error_loading') || 'Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, [t]);

    // Colonnes du tableau
    const columns = [
        { key: 'name', header: t('training.column_name'), align: 'left' as const },
        { key: 'country', header: t('training.column_country'), align: 'left' as const },
        { key: 'website', header: t('training.column_website'), align: 'center' as const },
        { key: 'email', header: t('training.column_email'), align: 'left' as const },
        // { key: 'certifications', header: t('training.column_certifications') || 'Certifications', align: 'left' as const },
    ];

    // Transformer les données pour le tableau
    const tableData = organizations.map((org) => ({
        name: <OrganizationName org={org} />,
        country: org.country,
        website: <WebsiteLink website={org.website} />,
        email: <EmailLink email={org.email} />,
        certifications: org.certifications ? (
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: org.certifications }} />
        ) : (
            <span className="text-gray-400">-</span>
        ),
    }));

    // Loading state
    if (loading) {
        return (
            <section className="bg-gray-50 py-12 sm:py-16 dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <Skeleton className="mx-auto mb-4 h-8 w-64" />
                            <Skeleton className="mx-auto h-4 w-96" />
                        </div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="bg-gray-50 py-12 sm:py-16 dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Empty state
    if (organizations.length === 0) {
        return (
            <section className="bg-gray-50 py-12 sm:py-16 dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl py-12 text-center">
                        <Globe className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <p className="text-lg text-gray-600 dark:text-gray-400">{t('training.no_organizations_found')}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <TableSection
            title={t('training.organizations_list_title')}
            description={t('training.organizations_list_subtitle')}
            columns={columns}
            data={tableData}
            maxWidth="6xl"
            bgColor="bg-gray-50 dark:bg-gray-800/50"
        />
    );
}
