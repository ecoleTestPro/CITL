import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Certification {
    id: number;
    title: string;
    slug: string;
    subtitle: string | null;
    description: string;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string | null;
    image: string | null;
    order: number;
    is_active: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Props {
    certifications: Certification[];
}

export default function CertificationsIndex({ certifications }: Props) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('dashboard.breadcrumbs.dashboard'), href: '/dashboard' },
        { title: t('dashboard.breadcrumbs.certifications'), href: '/dashboard/certifications' },
    ];

    const filteredCertifications = certifications.filter(
        (cert) => cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || cert.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('dashboard.certifications.all_certifications')}</h1>
                    <Link
                        href="/dashboard/certifications/create"
                        className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
                    >
                        {t('dashboard.certifications.add_certification')}
                    </Link>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder={t('dashboard.certifications.search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.title')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.category')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.questions')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.duration')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.status')}
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {t('dashboard.certifications.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredCertifications.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            {t('dashboard.certifications.no_certifications_found')}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCertifications.map((cert) => (
                                        <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{cert.title}</p>
                                                    {cert.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{cert.subtitle}</p>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                    {cert.category.name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{cert.exam_questions}</td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{cert.exam_duration}</td>
                                            <td className="px-4 py-4">
                                                {cert.is_active ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                        {t('dashboard.certifications.status_active')}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        {t('dashboard.certifications.status_inactive')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/certifications/${cert.id}/edit`}
                                                        className="text-sm text-primary hover:text-primary/80"
                                                    >
                                                        {t('dashboard.certifications.edit')}
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/certifications/${cert.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                        onClick={(e) => {
                                                            if (!confirm(t('dashboard.certifications.confirm_delete'))) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        {t('dashboard.certifications.delete')}
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
