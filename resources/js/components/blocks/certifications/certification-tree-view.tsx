import { Certification, CertificationCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CertificationTreeViewProps {
    categories: CertificationCategory[];
    categorySlug?: string;
    getCategoryRoute: (slug: string) => string;
}

function CertificationTreeView({ categories, categorySlug, getCategoryRoute }: CertificationTreeViewProps) {
    const { i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(() => {
        const currentCat = categories.find((c) => c.slug === categorySlug);
        return currentCat ? new Set([currentCat.id]) : new Set();
    });

    const toggleCategory = (categoryId: number) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const getCategoryLocalizedField = (cat: CertificationCategory, fieldBase: string): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as keyof CertificationCategory;
        const fallbackKey = `${fieldBase}_fr` as keyof CertificationCategory;
        return (cat[fieldKey] as string) || (cat[fallbackKey] as string) || '';
    };

    return (
        <ul className="space-y-1">
            {categories.map((cat) => {
                const isExpanded = expandedCategories.has(cat.id);
                const catCertifications = cat.certifications || [];
                const isCurrentCategory = cat.slug === categorySlug;

                return (
                    <li key={cat.id}>
                        {/* Category Header */}
                        <div
                            className={`group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                isCurrentCategory
                                    ? 'bg-primary/5 font-medium text-primary dark:bg-primary/10'
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                            onClick={() => toggleCategory(cat.id)}
                        >
                            {catCertifications.length > 0 ? (
                                isExpanded ? (
                                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                                )
                            ) : (
                                <span className="w-4" />
                            )}
                            <Link
                                href={getCategoryRoute(cat.slug)}
                                className="flex-1 hover:text-primary"
                                onClick={(e) => e.stopPropagation()}
                                preserveScroll
                            >
                                {getCategoryLocalizedField(cat, 'name')}
                            </Link>
                            {catCertifications.length > 0 && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                    {catCertifications.length}
                                </span>
                            )}
                        </div>

                        {/* Certifications List (Expandable) */}
                        {isExpanded && catCertifications.length > 0 && (
                            <ul className="ml-6 mt-1 space-y-0.5 border-l border-gray-200 pl-3 dark:border-gray-700">
                                {catCertifications.map((cert: Certification) => (
                                    <li key={cert.id}>
                                        <Link
                                            href={`/certifications/${cert.slug}`}
                                            className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                            preserveScroll
                                        >
                                            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                                            <span className="line-clamp-1">{(isEnglish && cert.title_en) || cert.title_fr}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default CertificationTreeView;
