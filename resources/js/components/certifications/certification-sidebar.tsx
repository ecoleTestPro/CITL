import { FadeIn } from '@/components/animations';
import { Certification } from '@/types';

interface CertificationSidebarProps {
    certification: Certification;
}

export function CertificationSidebar({ certification }: CertificationSidebarProps) {
    return (
        <div className="w-full bg-white lg:sticky lg:top-24 lg:w-[449px] lg:self-start dark:bg-gray-800">
            <FadeIn delay={0.3}>
                <div className="bg-background-1 dark:bg-background-6 w-full space-y-6 rounded-[20px] p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    <h3 className="text-heading-5">Informations de l'examen</h3>

                    {/* Exam Metadata */}
                    <div className="space-y-4">
                        <div className="border-stroke-4 dark:border-stroke-7 group flex items-center justify-between border-b pb-3 transition-colors duration-300 hover:border-secondary dark:hover:border-accent">
                            <span className="text-gray-600 dark:text-gray-400">Catégorie</span>
                            <span className="font-semibold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-accent">
                                {certification.category.name}
                            </span>
                        </div>
                        <div className="border-stroke-4 dark:border-stroke-7 group flex items-center justify-between border-b pb-3 transition-colors duration-300 hover:border-secondary dark:hover:border-accent">
                            <span className="text-gray-600 dark:text-gray-400">Questions</span>
                            <span className="font-semibold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-accent">
                                {certification.exam_questions}
                            </span>
                        </div>
                        <div className="border-stroke-4 dark:border-stroke-7 group flex items-center justify-between border-b pb-3 transition-colors duration-300 hover:border-secondary dark:hover:border-accent">
                            <span className="text-gray-600 dark:text-gray-400">Durée</span>
                            <span className="font-semibold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-accent">
                                {certification.exam_duration}
                            </span>
                        </div>
                        <div className="border-stroke-4 dark:border-stroke-7 group flex items-center justify-between border-b pb-3 transition-colors duration-300 hover:border-secondary dark:hover:border-accent">
                            <span className="text-gray-600 dark:text-gray-400">Score requis</span>
                            <span className="font-semibold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-accent">
                                {certification.exam_passing_score}%
                            </span>
                        </div>
                        <div className="group flex items-center justify-between transition-colors duration-300">
                            <span className="text-gray-600 dark:text-gray-400">Points totaux</span>
                            <span className="font-semibold text-secondary transition-transform duration-300 group-hover:scale-105 dark:text-accent">
                                {certification.exam_total_points}
                            </span>
                        </div>
                    </div>

                    {/* Documents Section - Static for now */}
                    <div className="border-stroke-4 dark:border-stroke-7 border-t pt-6">
                        <h4 className="mb-4 text-lg font-semibold text-secondary dark:text-accent">Documents</h4>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-md"
                            >
                                <span className="ns-shape-35 text-[24px] text-secondary transition-transform duration-300 group-hover:rotate-12 dark:text-accent"></span>
                                <span className="text-sm font-medium">Syllabus officiel</span>
                            </a>
                            <a
                                href="#"
                                className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-md"
                            >
                                <span className="ns-shape-12 text-[24px] text-secondary transition-transform duration-300 group-hover:rotate-12 dark:text-accent"></span>
                                <span className="text-sm font-medium">Guide de préparation</span>
                            </a>
                            <a
                                href="#"
                                className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-md"
                            >
                                <span className="ns-shape-3 text-[24px] text-secondary transition-transform duration-300 group-hover:rotate-12 dark:text-accent"></span>
                                <span className="text-sm font-medium">Exemples de questions</span>
                            </a>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="border-stroke-4 dark:border-stroke-7 space-y-3 border-t pt-6">
                        <a
                            href="/exam-registration"
                            className="flex w-full items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-secondary/90 hover:shadow-lg"
                        >
                            S'inscrire à l'examen
                        </a>
                        <a
                            href="/accredited-organizations"
                            className="flex w-full items-center justify-center rounded-lg border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition-all duration-300 hover:scale-105 hover:bg-secondary/5 hover:shadow-md dark:text-accent"
                        >
                            Trouver une formation
                        </a>
                    </div>

                    {/* Table of Contents */}
                    <div className="border-stroke-4 dark:border-stroke-7 border-t pt-6">
                        <h4 className="mb-4 text-lg font-semibold text-secondary dark:text-accent">Sur cette page</h4>
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
                                        className="group flex items-center text-sm text-gray-600 transition-colors duration-300 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                    >
                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-400 transition-all duration-300 group-hover:w-4 group-hover:bg-secondary dark:group-hover:bg-accent"></span>
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
