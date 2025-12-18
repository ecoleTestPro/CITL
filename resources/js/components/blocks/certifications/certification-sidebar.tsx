import { CertificationCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { Award, ExternalLink, GraduationCap, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CertificationTreeView from './certification-tree-view';

interface CertificationSidebarProps {
    categories: CertificationCategory[];
    categorySlug?: string;
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

function CertificationSidebar({ categories, categorySlug, searchQuery, onSearchChange }: CertificationSidebarProps) {
    const { t } = useTranslation();

    // Category slug to route mapping
    const getCategoryRoute = (slug: string): string => {
        const routeMap: Record<string, string> = {
            'core-foundation': '/core-foundation',
            'core-advanced': '/core-advanced',
            specialist: '/specialist',
            'expert-level': '/expert-level',
            'requirements-engineering': '/requirements-engineering',
            a4q: '/a4q-practical-tester',
        };
        return routeMap[slug] || `/certifications/${slug}`;
    };

    return (
        <aside className="space-y-6">
            {/* Search */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <Search className="h-4 w-4" />
                    {t('certifications.sidebar.search')}
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t('certifications.sidebar.search_placeholder')}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary dark:focus:bg-gray-900"
                    />
                    <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Certifications Tree View */}
            {categories.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                        <Award className="h-4 w-4" />
                        {t('nav.certifications')}
                    </h3>
                    <CertificationTreeView categories={categories} categorySlug={categorySlug} getCategoryRoute={getCategoryRoute} />
                </div>
            )}

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <GraduationCap className="h-4 w-4" />
                    {t('certifications.sidebar.quick_links')}
                </h3>
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/accredited-organizations"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            preserveScroll
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.find_training')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/exam-registration"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            preserveScroll
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.register_exam')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/why-certification"
                            className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            preserveScroll
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {t('certifications.sidebar.why_certify')}
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default CertificationSidebar;
