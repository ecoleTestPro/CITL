import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PublicTable } from '@/components/ui/public-table';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Building2, ExternalLink, Globe, Loader2, Mail, Search } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

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
                    <span className="break-words font-medium text-gray-900 dark:text-white">{org.name}</span>
                </div>
                {org.city && <p className="text-xs text-gray-500 dark:text-gray-400">{org.city}</p>}

                {org.certifications ? (
                    <div className="mt-2">
                        <div className="mb-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {t('training.column_certifications')}
                        </div>
                        <div
                            className="prose prose-sm max-w-none text-sm text-gray-700 dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: org.certifications }}
                        />
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

export function AccreditedOrganizationSearchForm() {
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState('');
    const [organizations, setOrganizations] = useState<AccreditedOrganization[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const formRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (formRef.current) {
                gsap.fromTo(
                    formRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                        },
                    },
                );
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (resultsRef.current && hasSearched) {
            gsap.fromTo(
                resultsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                },
            );
        }
    }, [organizations, hasSearched]);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            toast.error(t('accredited_organizations_search.enter_search'));
            return;
        }

        setIsLoading(true);
        setHasSearched(true);

        try {
            const params = new URLSearchParams();
            params.append('q', searchQuery.trim());

            const response = await fetch(`/api/accredited-organizations/search?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setOrganizations(data.data);
                if (data.data.length === 0) {
                    toast.error(t('accredited_organizations_search.no_results'));
                }
            } else {
                toast.error(t('accredited_organizations_search.error'));
            }
        } catch {
            toast.error(t('accredited_organizations_search.search_error'));
        } finally {
            setIsLoading(false);
        }
    };

    // Colonnes du tableau
    const tableColumns = [
        { key: 'name', header: t('training.column_name'), align: 'left' as const },
        { key: 'country', header: t('training.column_country'), align: 'left' as const },
        { key: 'website', header: t('training.column_website'), align: 'center' as const },
        { key: 'email', header: t('training.column_email'), align: 'left' as const },
    ];

    // Transformer les données pour le tableau
    const tableData = organizations.map((org) => ({
        name: <OrganizationName org={org} />,
        country: org.country,
        website: <WebsiteLink website={org.website} />,
        email: <EmailLink email={org.email} />,
    }));

    return (
        <div className="space-y-8">
            {/* Search Form */}
            <div
                ref={formRef}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800"
            >
                <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Search className="h-6 w-6 text-citl-orange" />
                    {t('accredited_organizations_search.search_title')}
                </h2>

                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="search_query">{t('accredited_organizations_search.search_label')}</Label>
                        <Input
                            id="search_query"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('accredited_organizations_search.search_placeholder')}
                            className="w-full"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('accredited_organizations_search.search_hint')}
                        </p>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full bg-citl-orange hover:bg-citl-orange/90 md:w-auto">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('accredited_organizations_search.searching')}
                            </>
                        ) : (
                            <>
                                <Search className="mr-2 h-4 w-4" />
                                {t('accredited_organizations_search.search_button')}
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* Results Section */}
            <div ref={resultsRef}>
                {hasSearched && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
                            {t('accredited_organizations_search.results_title')}
                            {organizations.length > 0 && (
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({organizations.length} {t('accredited_organizations_search.result_count')})
                                </span>
                            )}
                        </h2>

                        {organizations.length > 0 ? (
                            <PublicTable columns={tableColumns} data={tableData} striped bordered animated />
                        ) : (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                    <AlertCircle className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">{t('accredited_organizations_search.no_results')}</p>
                            </div>
                        )}
                    </div>
                )}

                {!hasSearched && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center dark:border-gray-600 dark:bg-gray-800/50">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">{t('accredited_organizations_search.enter_search')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
