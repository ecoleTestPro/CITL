import { FadeIn } from '@/components/animations';
import { Certification } from '@/types';

interface CertificationSidebarProps {
    certification: Certification;
}

export function CertificationSidebar({ certification }: CertificationSidebarProps) {
    return (
        <div className="w-full lg:sticky lg:top-24 lg:w-[449px] lg:self-start">
            <FadeIn delay={0.3}>
                <div className="w-full space-y-6 rounded-[20px] border border-gray-100 bg-gray-50 p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-heading-5 text-gray-900 dark:text-white">Informations de l'examen</h3>

                    {/* Exam Metadata */}
                    <div className="space-y-4">
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">Catégorie</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.category.name}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">Questions</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_questions}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">Durée</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_duration}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">Score requis</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_passing_score}%
                            </span>
                        </div>
                        <div className="group flex items-center justify-between transition-colors duration-300">
                            <span className="text-gray-600 dark:text-gray-400">Points totaux</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_total_points}
                            </span>
                        </div>
                    </div>

                    {/* Documents Section - Static for now */}
                    <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Documents</h4>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-700"
                            >
                                <span className="ns-shape-35 text-[24px] text-primary"></span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Syllabus officiel</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-700"
                            >
                                <span className="ns-shape-12 text-[24px] text-primary"></span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Guide de préparation</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-700"
                            >
                                <span className="ns-shape-3 text-[24px] text-primary"></span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exemples de questions</span>
                            </a>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                        <a
                            href="/exam-registration"
                            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                        >
                            S'inscrire à l'examen
                        </a>
                        <a
                            href="/accredited-organizations"
                            className="flex w-full items-center justify-center rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:shadow-md"
                        >
                            Trouver une formation
                        </a>
                    </div>

                    {/* Table of Contents */}
                    <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sur cette page</h4>
                        <ul className="space-y-2">
                            {[
                                { href: '#overview', label: "Vue d'ensemble" },
                                { href: '#audience', label: 'Public cible' },
                                { href: '#content', label: 'Contenu de la formation' },
                                { href: '#exam-structure', label: "Structure de l'examen" },
                                { href: '#business-outcomes', label: 'Bénéfices professionnels' },
                                { href: '#more-information', label: 'Informations complémentaires' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="group flex items-center text-sm text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                                    >
                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-400 transition-all duration-300 group-hover:w-4 group-hover:bg-primary"></span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
