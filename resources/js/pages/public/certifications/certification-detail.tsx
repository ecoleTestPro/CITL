import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Certification } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    certification: Certification;
}

function CertificationDetail({ certification }: Props) {
    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'Certifications', href: '/why-certification' },
        { title: certification.category.name, href: `/${certification.category.slug}` },
        { title: certification.title },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${certification.title} - CITL`} />

            {/* Hero Section */}
            <HeroCommon
                badge={certification.category.name}
                title={certification.title}
                description={certification.subtitle || certification.description}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            {/* Main Content Section */}
            <section className="pt-12 pb-24 sm:pt-16 md:pt-20 md:pb-36 lg:pb-44">
                <div className="container mx-auto">
                    <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-[72px]">
                        {/* Left Column - Main Content */}
                        <div className="w-full max-w-full lg:max-w-[767px]">
                            <div className="services-details-content mb-[72px] space-y-12">
                                {/* Overview Section */}
                                <div data-ns-animate data-delay="0.3">
                                    <h2 className="text-heading-4 mb-4" id="overview">
                                        Vue d'ensemble
                                    </h2>
                                    {certification.overview ? (
                                        <div
                                            className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                                            dangerouslySetInnerHTML={{ __html: certification.overview }}
                                        />
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
                                    )}
                                </div>

                                {/* Audience Section */}
                                <div data-ns-animate data-delay="0.4">
                                    <h2 className="text-heading-4 mb-4" id="audience">
                                        Public cible
                                    </h2>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        Cette certification s'adresse aux professionnels du test logiciel qui souhaitent développer leurs compétences et valider
                                        leur expertise dans le domaine.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="7"
                                                    viewBox="0 0 10 7"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className="fill-white dark:fill-secondary"
                                                >
                                                    <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                                </svg>
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">Testeurs de logiciels débutants ou expérimentés</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="7"
                                                    viewBox="0 0 10 7"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className="fill-white dark:fill-secondary"
                                                >
                                                    <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                                </svg>
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">Ingénieurs qualité et responsables de tests</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="7"
                                                    viewBox="0 0 10 7"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className="fill-white dark:fill-secondary"
                                                >
                                                    <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                                </svg>
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                Développeurs souhaitant améliorer leurs compétences en test
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="7"
                                                    viewBox="0 0 10 7"
                                                    fill="none"
                                                    aria-hidden="true"
                                                    className="fill-white dark:fill-secondary"
                                                >
                                                    <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                                </svg>
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">Chefs de projet et analystes métier</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Content Section */}
                                <div data-ns-animate data-delay="0.5">
                                    <h2 className="text-heading-4 mb-4" id="content">
                                        Contenu de la formation
                                    </h2>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        Le programme couvre l'ensemble des compétences nécessaires pour maîtriser les concepts et techniques de test logiciel
                                        selon les standards internationaux.
                                    </p>
                                    <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Fondamentaux du test logiciel</li>
                                        <li>Test tout au long du cycle de vie logiciel</li>
                                        <li>Techniques de test statique et dynamique</li>
                                        <li>Gestion des tests et outils</li>
                                        <li>Analyse des risques et stratégies de test</li>
                                    </ul>
                                </div>

                                {/* Exam Structure Section */}
                                <div data-ns-animate data-delay="0.6">
                                    <h2 className="text-heading-4 mb-4" id="exam-structure">
                                        Structure de l'examen
                                    </h2>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        L'examen est conçu pour évaluer votre compréhension des concepts et votre capacité à les appliquer dans des situations
                                        pratiques.
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="ns-shape-7 text-[32px] text-secondary dark:text-accent"></span>
                                                <span className="text-lg font-semibold text-secondary dark:text-accent">Format</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">QCM - {certification.exam_questions} questions</p>
                                        </div>
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="ns-shape-14 text-[32px] text-secondary dark:text-accent"></span>
                                                <span className="text-lg font-semibold text-secondary dark:text-accent">Durée</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{certification.exam_duration}</p>
                                        </div>
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="ns-shape-11 text-[32px] text-secondary dark:text-accent"></span>
                                                <span className="text-lg font-semibold text-secondary dark:text-accent">Score requis</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{certification.exam_passing_score}%</p>
                                        </div>
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <div className="mb-2 flex items-center gap-3">
                                                <span className="ns-shape-32 text-[32px] text-secondary dark:text-accent"></span>
                                                <span className="text-lg font-semibold text-secondary dark:text-accent">Points totaux</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{certification.exam_total_points} points</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Outcomes Section */}
                                <div data-ns-animate data-delay="0.7">
                                    <h2 className="text-heading-4 mb-4" id="business-outcomes">
                                        Bénéfices professionnels
                                    </h2>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        L'obtention de cette certification vous permettra de renforcer votre profil professionnel et d'accéder à de nouvelles
                                        opportunités de carrière.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div>
                                                <span className="ns-shape-7 text-[36px] text-secondary dark:text-accent"></span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <strong>Reconnaissance internationale</strong> - Certification reconnue dans plus de 100 pays
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div>
                                                <span className="ns-shape-14 text-[36px] text-secondary dark:text-accent"></span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <strong>Évolution de carrière</strong> - Accès à des postes à responsabilité et meilleures opportunités
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div>
                                                <span className="ns-shape-11 text-[36px] text-secondary dark:text-accent"></span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <strong>Compétences validées</strong> - Preuve de votre expertise selon les standards internationaux
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div>
                                                <span className="ns-shape-32 text-[36px] text-secondary dark:text-accent"></span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <strong>Réseau professionnel</strong> - Intégration dans une communauté mondiale de testeurs certifiés
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* More Information Section */}
                                <div data-ns-animate data-delay="0.8">
                                    <h2 className="text-heading-4 mb-4" id="more-information">
                                        Informations complémentaires
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <h3 className="mb-2 text-lg font-semibold text-secondary dark:text-accent">Prérequis</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Il est recommandé d'avoir une expérience pratique dans le développement ou le test de logiciels avant de passer
                                                l'examen.
                                            </p>
                                        </div>
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <h3 className="mb-2 text-lg font-semibold text-secondary dark:text-accent">Validité</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                La certification est valable à vie et reconnue internationalement par les organisations membres de l'ISTQB.
                                            </p>
                                        </div>
                                        <div className="bg-background-1 dark:bg-background-6 rounded-lg p-6">
                                            <h3 className="mb-2 text-lg font-semibold text-secondary dark:text-accent">Langues disponibles</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                L'examen est disponible en français, anglais et plusieurs autres langues selon les centres d'examen.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sticky Sidebar */}
                        <div className="w-full lg:sticky lg:top-24 lg:w-[449px] lg:self-start" data-ns-animate data-delay="0.3">
                            <div className="bg-background-1 dark:bg-background-6 w-full space-y-6 rounded-[20px] p-8">
                                <h3 className="text-heading-5">Informations de l'examen</h3>

                                {/* Exam Metadata */}
                                <div className="space-y-4">
                                    <div className="border-stroke-4 dark:border-stroke-7 flex items-center justify-between border-b pb-3">
                                        <span className="text-gray-600 dark:text-gray-400">Catégorie</span>
                                        <span className="font-semibold text-secondary dark:text-accent">{certification.category.name}</span>
                                    </div>
                                    <div className="border-stroke-4 dark:border-stroke-7 flex items-center justify-between border-b pb-3">
                                        <span className="text-gray-600 dark:text-gray-400">Questions</span>
                                        <span className="font-semibold text-secondary dark:text-accent">{certification.exam_questions}</span>
                                    </div>
                                    <div className="border-stroke-4 dark:border-stroke-7 flex items-center justify-between border-b pb-3">
                                        <span className="text-gray-600 dark:text-gray-400">Durée</span>
                                        <span className="font-semibold text-secondary dark:text-accent">{certification.exam_duration}</span>
                                    </div>
                                    <div className="border-stroke-4 dark:border-stroke-7 flex items-center justify-between border-b pb-3">
                                        <span className="text-gray-600 dark:text-gray-400">Score requis</span>
                                        <span className="font-semibold text-secondary dark:text-accent">{certification.exam_passing_score}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Points totaux</span>
                                        <span className="font-semibold text-secondary dark:text-accent">{certification.exam_total_points}</span>
                                    </div>
                                </div>

                                {/* Documents Section - Static for now */}
                                <div className="border-stroke-4 dark:border-stroke-7 border-t pt-6">
                                    <h4 className="mb-4 text-lg font-semibold text-secondary dark:text-accent">Documents</h4>
                                    <div className="space-y-3">
                                        <a
                                            href="#"
                                            className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-colors hover:bg-gray-50"
                                        >
                                            <span className="ns-shape-35 text-[24px] text-secondary dark:text-accent"></span>
                                            <span className="text-sm font-medium">Syllabus officiel</span>
                                        </a>
                                        <a
                                            href="#"
                                            className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-colors hover:bg-gray-50"
                                        >
                                            <span className="ns-shape-12 text-[24px] text-secondary dark:text-accent"></span>
                                            <span className="text-sm font-medium">Guide de préparation</span>
                                        </a>
                                        <a
                                            href="#"
                                            className="dark:bg-background-7 dark:hover:bg-background-8 flex items-center gap-3 rounded-lg bg-white p-3 transition-colors hover:bg-gray-50"
                                        >
                                            <span className="ns-shape-3 text-[24px] text-secondary dark:text-accent"></span>
                                            <span className="text-sm font-medium">Exemples de questions</span>
                                        </a>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="border-stroke-4 dark:border-stroke-7 space-y-3 border-t pt-6">
                                    <a
                                        href="/exam-registration"
                                        className="flex w-full items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary/90 hover:shadow-md"
                                    >
                                        S'inscrire à l'examen
                                    </a>
                                    <a
                                        href="/accredited-organizations"
                                        className="flex w-full items-center justify-center rounded-lg border border-secondary px-6 py-3 text-sm font-semibold text-secondary transition-all duration-300 hover:bg-secondary/5 dark:text-accent"
                                    >
                                        Trouver une formation
                                    </a>
                                </div>

                                {/* Table of Contents */}
                                <div className="border-stroke-4 dark:border-stroke-7 border-t pt-6">
                                    <h4 className="mb-4 text-lg font-semibold text-secondary dark:text-accent">Sur cette page</h4>
                                    <ul className="space-y-2">
                                        <li>
                                            <a
                                                href="#overview"
                                                className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                            >
                                                Vue d'ensemble
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#audience"
                                                className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                            >
                                                Public cible
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#content" className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent">
                                                Contenu de la formation
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#exam-structure"
                                                className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                            >
                                                Structure de l'examen
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#business-outcomes"
                                                className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                            >
                                                Bénéfices professionnels
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#more-information"
                                                className="text-sm text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-accent"
                                            >
                                                Informations complémentaires
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default CertificationDetail;
