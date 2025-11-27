export const AudienceFallback = () => (
    <>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
            Cette certification s'adresse aux professionnels du test logiciel qui souhaitent développer leurs compétences et valider leur expertise dans le
            domaine.
        </p>
        <ul className="space-y-3">
            {[
                'Testeurs de logiciels débutants ou expérimentés',
                'Ingénieurs qualité et responsables de tests',
                'Développeurs souhaitant améliorer leurs compétences en test',
                'Chefs de projet et analystes métier',
            ].map((text, index) => (
                <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary dark:bg-accent">
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
                    <span className="text-gray-700 dark:text-gray-300">{text}</span>
                </li>
            ))}
        </ul>
    </>
);

export const TrainingContentFallback = () => (
    <>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
            Le programme couvre l'ensemble des compétences nécessaires pour maîtriser les concepts et techniques de test logiciel selon les standards
            internationaux.
        </p>
        <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Fondamentaux du test logiciel</li>
            <li>Test tout au long du cycle de vie logiciel</li>
            <li>Techniques de test statique et dynamique</li>
            <li>Gestion des tests et outils</li>
            <li>Analyse des risques et stratégies de test</li>
        </ul>
    </>
);

interface ExamStructureFallbackProps {
    examQuestions: number;
    examDuration: string;
    examPassingScore: number;
    examTotalPoints: number;
}

export const ExamStructureFallback = ({ examQuestions, examDuration, examPassingScore, examTotalPoints }: ExamStructureFallbackProps) => (
    <>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
            L'examen est conçu pour évaluer votre compréhension des concepts et votre capacité à les appliquer dans des situations pratiques.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
                { icon: 'ns-shape-7', label: 'Format', value: `QCM - ${examQuestions} questions` },
                { icon: 'ns-shape-14', label: 'Durée', value: examDuration },
                { icon: 'ns-shape-11', label: 'Score requis', value: `${examPassingScore}%` },
                { icon: 'ns-shape-32', label: 'Points totaux', value: `${examTotalPoints} points` },
            ].map((item, index) => (
                <div
                    key={index}
                    className="bg-background-1 dark:bg-background-6 group rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="mb-2 flex items-center gap-3">
                        <span className={`${item.icon} text-[32px] text-secondary transition-transform duration-300 group-hover:rotate-12 dark:text-accent`}></span>
                        <span className="text-lg font-semibold text-secondary dark:text-accent">{item.label}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item.value}</p>
                </div>
            ))}
        </div>
    </>
);

export const BusinessOutcomesFallback = () => (
    <>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
            L'obtention de cette certification vous permettra de renforcer votre profil professionnel et d'accéder à de nouvelles opportunités de carrière.
        </p>
        <ul className="space-y-3">
            {[
                { icon: 'ns-shape-7', title: 'Reconnaissance internationale', text: 'Certification reconnue dans plus de 100 pays' },
                { icon: 'ns-shape-14', title: 'Évolution de carrière', text: 'Accès à des postes à responsabilité et meilleures opportunités' },
                { icon: 'ns-shape-11', title: 'Compétences validées', text: 'Preuve de votre expertise selon les standards internationaux' },
                { icon: 'ns-shape-32', title: 'Réseau professionnel', text: 'Intégration dans une communauté mondiale de testeurs certifiés' },
            ].map((item, index) => (
                <li key={index} className="group flex items-start gap-3">
                    <div>
                        <span
                            className={`${item.icon} text-[36px] text-secondary transition-transform duration-300 group-hover:rotate-12 dark:text-accent`}
                        ></span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                        <strong className="text-secondary dark:text-accent">{item.title}</strong> - {item.text}
                    </span>
                </li>
            ))}
        </ul>
    </>
);

export const AdditionalInformationFallback = () => (
    <div className="space-y-4">
        {[
            {
                title: 'Prérequis',
                content: "Il est recommandé d'avoir une expérience pratique dans le développement ou le test de logiciels avant de passer l'examen.",
            },
            {
                title: 'Validité',
                content: "La certification est valable à vie et reconnue internationalement par les organisations membres de l'ISTQB.",
            },
            {
                title: 'Langues disponibles',
                content: "L'examen est disponible en français, anglais et plusieurs autres langues selon les centres d'examen.",
            },
        ].map((item, index) => (
            <div
                key={index}
                className="bg-background-1 dark:bg-background-6 group rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
                <h3 className="mb-2 text-lg font-semibold text-secondary dark:text-accent">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
            </div>
        ))}
    </div>
);
