import { FadeIn, ScaleIn } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Structure hiérarchique: Niveaux et Certifications
interface Certification {
    id: string;
    name: string;
    fullName: string;
    description: string;
    color: string;
    level: number; // Profondeur dans la hiérarchie (0 = centre, 1, 2, 3...)
    parent?: string; // ID de la certification parente
}

const certifications: Certification[] = [
    // Niveau 0: Centre - Base CTFL
    {
        id: 'ctfl',
        name: 'CTFL',
        fullName: 'Certified Tester Foundation Level',
        description: "Le niveau Foundation est le point d'entrée pour toutes les certifications ISTQB®. Il fournit les bases essentielles du testing logiciel.",
        color: 'oklch(0.4 0.15 250)', // Bleu marine
        level: 0,
    },

    // Niveau 1: Premier cercle - Foundation (cercle complet)
    {
        id: 'foundation',
        name: 'Foundation',
        fullName: 'Niveau Foundation',
        description: 'Le niveau Foundation fournit les bases essentielles du testing logiciel pour tous les professionnels.',
        color: 'oklch(0.4 0.15 250)', // Bleu marine
        level: 1,
        parent: 'ctfl',
    },

    // Niveau 2: Deuxième cercle - Core Advanced & Specialist (2 secteurs)
    {
        id: 'ctal-ta',
        name: 'TA',
        fullName: 'Test Analyst',
        description: "Cette certification s'adresse aux analystes de tests expérimentés qui souhaitent approfondir leurs compétences en conception de tests.",
        color: 'oklch(0.62 0.18 45)', // Orange CITL
        level: 2,
        parent: 'foundation',
    },
    {
        id: 'ctal-tm',
        name: 'TM',
        fullName: 'Test Manager',
        description: 'Cette certification est destinée aux gestionnaires de tests qui dirigent des équipes et des projets de test.',
        color: 'oklch(0.64 0.17 50)', // Orange légèrement différent
        level: 2,
        parent: 'foundation',
    },
    {
        id: 'ctal-tae',
        name: 'TAE',
        fullName: 'Test Automation Engineer',
        description: "Conçue pour les ingénieurs qui souhaitent maîtriser l'automatisation des tests et les frameworks de test.",
        color: 'oklch(0.66 0.16 40)', // Orange variation
        level: 2,
        parent: 'foundation',
    },
    {
        id: 'specialist-agile',
        name: 'Agile',
        fullName: 'Agile Tester',
        description: 'Certification spécialisée pour les testeurs travaillant dans des environnements agiles.',
        color: 'oklch(0.7 0.1 200)', // Bleu clair
        level: 2,
        parent: 'foundation',
    },

    // Niveau 3: Troisième cercle - Expert Level (sur les certifications Advanced)
    {
        id: 'expert-tm',
        name: 'Expert TM',
        fullName: 'Expert Test Manager',
        description: "Le niveau Expert Test Manager représente le plus haut niveau de maîtrise en gestion de test.",
        color: 'oklch(0.58 0.15 145)', // Vert CITL
        level: 3,
        parent: 'ctal-tm',
    },
    {
        id: 'expert-ta',
        name: 'Expert TA',
        fullName: 'Expert Test Analyst',
        description: "Le niveau Expert Test Analyst pour les analystes de tests hautement qualifiés.",
        color: 'oklch(0.56 0.14 150)', // Vert variation
        level: 3,
        parent: 'ctal-ta',
    },
];

// Fonction pour obtenir les certifications d'un niveau donné
const getCertificationsAtLevel = (level: number): Certification[] => {
    return certifications.filter((cert) => cert.level === level);
};

// Fonction pour calculer le nombre maximum de niveaux
const getMaxLevel = (): number => {
    return Math.max(...certifications.map((cert) => cert.level));
};

// Fonction pour obtenir les enfants d'une certification
const getChildren = (parentId: string): Certification[] => {
    return certifications.filter((cert) => cert.parent === parentId);
};

const CertificationWheel = () => {
    const [selectedCert, setSelectedCert] = useState<Certification>(certifications[0]);
    const { t } = useTranslation();

    // Configuration des cercles
    const CENTER_X = 250;
    const CENTER_Y = 250;
    const BASE_RADIUS = 70; // Rayon du cercle central
    const RING_WIDTH = 50; // Largeur de chaque anneau

    // Fonction pour calculer le rayon d'un niveau
    const getRadiusForLevel = (level: number): number => {
        if (level === 0) return BASE_RADIUS;
        return BASE_RADIUS + level * RING_WIDTH;
    };

    // Fonction pour obtenir les angles d'une certification en fonction de sa position et de son parent
    const getCertificationAngles = (cert: Certification, index: number, certsAtLevel: Certification[]): { startAngle: number; endAngle: number } => {
        // Niveau 1: cercle complet
        if (cert.level === 1) {
            return { startAngle: -90, endAngle: 270 };
        }

        // Pour les niveaux supérieurs: calculer en fonction du parent
        if (cert.parent) {
            const parent = certifications.find(c => c.id === cert.parent);
            if (parent && parent.level > 0) {
                // Obtenir les angles du parent
                const parentCertsAtLevel = getCertificationsAtLevel(parent.level);
                const parentIndex = parentCertsAtLevel.findIndex(c => c.id === parent.id);
                const parentAngles = getCertificationAngles(parent, parentIndex, parentCertsAtLevel);

                // Les enfants du même parent se partagent l'espace du parent
                const siblings = getChildren(cert.parent);
                const angleSpan = parentAngles.endAngle - parentAngles.startAngle;
                const angleStep = angleSpan / siblings.length;
                const siblingIndex = siblings.findIndex(c => c.id === cert.id);

                const startAngle = parentAngles.startAngle + (siblingIndex * angleStep);
                const endAngle = startAngle + angleStep;

                return { startAngle, endAngle };
            }
        }

        // Par défaut: répartition égale pour les certifications sans parent (niveau 2 depuis foundation)
        const angleStep = 360 / certsAtLevel.length;
        const startAngle = index * angleStep - 90;
        const endAngle = startAngle + angleStep;
        return { startAngle, endAngle };
    };

    // Fonction pour générer les secteurs d'un anneau
    const generateRingSectors = (level: number) => {
        const certs = getCertificationsAtLevel(level);
        if (certs.length === 0) return null;

        const innerRadius = getRadiusForLevel(level - 1);
        const outerRadius = getRadiusForLevel(level);

        return certs.map((cert, index) => {
            const { startAngle, endAngle } = getCertificationAngles(cert, index, certs);
            const angleSpan = endAngle - startAngle;

            // Conversion en radians
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            // Points du secteur
            const x1 = CENTER_X + innerRadius * Math.cos(startRad);
            const y1 = CENTER_Y + innerRadius * Math.sin(startRad);
            const x2 = CENTER_X + outerRadius * Math.cos(startRad);
            const y2 = CENTER_Y + outerRadius * Math.sin(startRad);
            const x3 = CENTER_X + outerRadius * Math.cos(endRad);
            const y3 = CENTER_Y + outerRadius * Math.sin(endRad);
            const x4 = CENTER_X + innerRadius * Math.cos(endRad);
            const y4 = CENTER_Y + innerRadius * Math.sin(endRad);

            const largeArcFlag = angleSpan > 180 ? 1 : 0;

            // Construction du path
            const pathData = `
                M ${x1} ${y1}
                L ${x2} ${y2}
                A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
                L ${x4} ${y4}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
                Z
            `;

            // Position du texte (au milieu du secteur)
            const midAngle = (startAngle + endAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const textRadius = (innerRadius + outerRadius) / 2;
            const textX = CENTER_X + textRadius * Math.cos(midRad);
            const textY = CENTER_Y + textRadius * Math.sin(midRad);

            // Calculer la rotation du texte pour améliorer la lisibilité
            let textRotation = 0;
            if (cert.level >= 2 && angleSpan < 180) {
                // Rotation pour les petits secteurs
                textRotation = midAngle + 90;
                // Correction si le texte est à l'envers
                if (textRotation > 90 && textRotation < 270) {
                    textRotation -= 180;
                }
            }

            return (
                <g key={cert.id}>
                    <path
                        d={pathData}
                        fill={cert.color}
                        className="cursor-pointer certification-wheel-hover"
                        onClick={() => setSelectedCert(cert)}
                    />
                    <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={textRotation !== 0 ? `rotate(${textRotation}, ${textX}, ${textY})` : undefined}
                        className="fill-white text-xs font-bold pointer-events-none"
                        style={{ fontSize: cert.level === 1 ? '14px' : cert.level === 2 ? '10px' : '9px' }}
                    >
                        {cert.name}
                    </text>
                </g>
            );
        });
    };

    return (
        <div className="bg-white p-6 dark:bg-gray-900">
            <style>{`
                .certification-wheel-hover {
                    transition: opacity 0.3s ease;
                }
                .certification-wheel-hover:hover {
                    opacity: 0.9;
                }
            `}</style>
            <div className="mx-auto container">
                <FadeIn duration={1} delay={0} blur={12} className="w-2/3">
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t('home.certification_wheel_title')}</h2>
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                        {t('home.certification_wheel_description')}
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                    {/* Section gauche - Texte et description */}
                    <div className="flex h-full items-center bg-white p-6 lg:col-span-2 dark:bg-gray-900">
                        <FadeIn duration={0.8} delay={0.2} blur={10} className="sticky top-8">
                            {/* Card de la certification sélectionnée */}
                            <div className="">
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
                                    {t('home.level')} {selectedCert.level}
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-foreground">{selectedCert.fullName}</h3>
                                <p className="mb-6 text-base leading-relaxed text-muted-foreground">{selectedCert.description}</p>
                                <Button asChild>
                                    <a href="/certifications">{t('home.explore_certifications')}</a>
                                </Button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Section droite - Roue des certifications */}
                    <div className="flex items-center justify-center bg-[#f2f2f2] lg:col-span-3">
                        <ScaleIn duration={1.2} delay={0.3} blur={10} className="relative aspect-square w-full max-w-[600px]">
                            <svg viewBox="0 0 500 500" className="h-full w-full">
                                {/* Cercle central - Niveau 0 */}
                                {(() => {
                                    const centralCert = getCertificationsAtLevel(0)[0];
                                    if (!centralCert) return null;
                                    return (
                                        <g>
                                            <circle
                                                cx={CENTER_X}
                                                cy={CENTER_Y}
                                                r={BASE_RADIUS}
                                                fill={centralCert.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedCert(centralCert)}
                                            />
                                            {/* Piques triangulaires du cercle central */}
                                            {/* Pique en haut */}
                                            <path
                                                d={`M ${CENTER_X} ${CENTER_Y - BASE_RADIUS - 15} L ${CENTER_X - 15} ${CENTER_Y - BASE_RADIUS + 15} L ${CENTER_X + 15} ${CENTER_Y - BASE_RADIUS + 15} Z`}
                                                fill={centralCert.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedCert(centralCert)}
                                            />
                                            {/* Pique en bas */}
                                            <path
                                                d={`M ${CENTER_X} ${CENTER_Y + BASE_RADIUS + 15} L ${CENTER_X - 15} ${CENTER_Y + BASE_RADIUS - 15} L ${CENTER_X + 15} ${CENTER_Y + BASE_RADIUS - 15} Z`}
                                                fill={centralCert.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedCert(centralCert)}
                                            />
                                            <text
                                                x={CENTER_X}
                                                y={CENTER_Y}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="fill-white text-2xl font-bold pointer-events-none"
                                            >
                                                {centralCert.name}
                                            </text>
                                        </g>
                                    );
                                })()}

                                {/* Anneaux concentriques - Niveaux 1, 2, 3... */}
                                {Array.from({ length: getMaxLevel() }, (_, i) => i + 1).map((level) =>
                                    generateRingSectors(level)
                                )}
                            </svg>
                        </ScaleIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationWheel;
