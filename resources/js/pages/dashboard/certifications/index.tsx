import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

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
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCertifications = certifications.filter(
        (cert) =>
            cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <AppLayout title="Gestion des Certifications">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Certifications</h1>
                    <Link
                        href="/dashboard/certifications/create"
                        className="rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary/90"
                    >
                        Ajouter une certification
                    </Link>
                </div>

                <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Rechercher une certification..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Titre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Catégorie</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Questions</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Durée</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Statut</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredCertifications.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            Aucune certification trouvée
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
                                                <span className="inline-flex rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                                                    {cert.category.name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{cert.exam_questions}</td>
                                            <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{cert.exam_duration}</td>
                                            <td className="px-4 py-4">
                                                {cert.is_active ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/certifications/${cert.id}/edit`}
                                                        className="text-sm text-secondary hover:text-secondary/80"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/certifications/${cert.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                        onClick={(e) => {
                                                            if (!confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Supprimer
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
