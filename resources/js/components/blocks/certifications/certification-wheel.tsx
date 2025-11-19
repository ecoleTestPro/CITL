import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Structure hiérarchique des niveaux avec cercles concentriques
interface LevelNode {
    id: string;
    name: string;
    description: string;
    color: string;
    level: number; // Profondeur dans la hiérarchie (0 = centre)
    parent?: string; // ID du niveau parent
}

const levelHierarchy: LevelNode[] = [
    {
        id: 'base',
        name: 'CTFL',
        description: 'Certified Tester Foundation Level - Point d\'entrée pour toutes les certifications ISTQB®.',
        color: 'oklch(0.4 0.15 250)', // Bleu marine
        level: 0, // Cercle central
    },
    {
        id: 'foundation',
        name: 'Foundation',
        description: 'Le niveau Foundation fournit les bases essentielles du testing logiciel.',
        color: 'oklch(0.4 0.15 250)', // Bleu marine
        level: 1, // Premier cercle
        parent: 'base',
    },
    {
        id: 'advanced',
        name: 'Core Advanced',
        description: 'Le niveau Advanced s\'adresse aux professionnels expérimentés. Prérequis: Foundation.',
        color: 'oklch(0.62 0.18 45)', // Orange CITL
        level: 2, // Deuxième cercle
        parent: 'foundation',
    },
    {
        id: 'specialist',
        name: 'Specialist',
        description: 'Les certifications spécialisées couvrent des domaines spécifiques. Prérequis: Foundation.',
        color: 'oklch(0.7 0.1 200)', // Bleu clair
        level: 2, // Deuxième cercle
        parent: 'foundation',
    },
    {
        id: 'expert',
        name: 'Expert Level',
        description: 'Le niveau Expert représente le plus haut niveau de maîtrise. Prérequis: Core Advanced.',
        color: 'oklch(0.58 0.15 145)', // Vert CITL
        level: 3, // Troisième cercle
        parent: 'advanced',
    },
];

// Fonction pour obtenir les éléments d'un niveau donné
const getNodesAtLevel = (level: number): LevelNode[] => {
    return levelHierarchy.filter((node) => node.level === level);
};

// Fonction pour calculer le nombre maximum de niveaux
const getMaxLevel = (): number => {
    return Math.max(...levelHierarchy.map((node) => node.level));
};

const CertificationWheel = () => {
    const [selectedNode, setSelectedNode] = useState<LevelNode>(levelHierarchy[0]);

    // Configuration des cercles
    const CENTER_X = 250;
    const CENTER_Y = 250;
    const BASE_RADIUS = 70; // Rayon du cercle central
    const RING_WIDTH = 50; // Largeur de chaque anneau (réduit pour moins d'espace)

    // Fonction pour calculer le rayon d'un niveau
    const getRadiusForLevel = (level: number): number => {
        if (level === 0) return BASE_RADIUS;
        return BASE_RADIUS + level * RING_WIDTH;
    };

    // Fonction pour obtenir l'angle de début et fin pour un noeud en fonction de son parent
    const getNodeAngles = (node: LevelNode, index: number, nodesAtLevel: LevelNode[]): { startAngle: number; endAngle: number } => {
        if (node.level === 1) {
            // Niveau 1: cercle complet (Foundation)
            return { startAngle: -90, endAngle: 270 };
        }

        if (node.level === 2) {
            // Niveau 2: 2 secteurs égaux (Core Advanced et Specialist)
            const angleStep = 360 / nodesAtLevel.length;
            const startAngle = index * angleStep - 90;
            const endAngle = startAngle + angleStep;
            return { startAngle, endAngle };
        }

        if (node.level === 3 && node.parent === 'advanced') {
            // Niveau 3: Expert Level doit être dans la zone de Core Advanced
            // Core Advanced est à l'index 0 du niveau 2, donc de -90° à 90°
            return { startAngle: -90, endAngle: 90 };
        }

        // Par défaut: répartition égale
        const angleStep = 360 / nodesAtLevel.length;
        const startAngle = index * angleStep - 90;
        const endAngle = startAngle + angleStep;
        return { startAngle, endAngle };
    };

    // Fonction pour générer les secteurs d'un anneau
    const generateRingSectors = (level: number) => {
        const nodes = getNodesAtLevel(level);
        if (nodes.length === 0) return null;

        const innerRadius = getRadiusForLevel(level - 1);
        const outerRadius = getRadiusForLevel(level);

        return nodes.map((node, index) => {
            const { startAngle, endAngle } = getNodeAngles(node, index, nodes);
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

            // Calculer la rotation du texte pour les secteurs verticaux
            let textRotation = 0;
            if (node.level === 2) {
                // Pour Core Advanced (premier secteur): rotation vers la droite
                // Pour Specialist (deuxième secteur): rotation vers la gauche
                textRotation = midAngle + 90;
            }

            return (
                <g key={node.id}>
                    <path
                        d={pathData}
                        fill={node.color}
                        className="cursor-pointer certification-wheel-hover"
                        onClick={() => setSelectedNode(node)}
                    />
                    <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={textRotation !== 0 ? `rotate(${textRotation}, ${textX}, ${textY})` : undefined}
                        className="fill-white text-xs font-bold pointer-events-none"
                        style={{ fontSize: node.level === 1 ? '16px' : '11px' }}
                    >
                        {node.name}
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
            <div className="mx-auto w-full max-w-(--breakpoint-2xl)">
                <div className="w-2/3">
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Améliorer & Certifier vos compétences</h2>
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                        Découvrez notre portfolio de certifications et explorez ce qui soutiendra votre carrière dans le testing.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                    {/* Section gauche - Texte et description */}
                    <div className="flex h-full items-center bg-white p-6 lg:col-span-2 dark:bg-gray-900">
                        <div className="sticky top-8">
                            {/* Card du noeud sélectionné */}
                            <div className="">
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
                                    Niveau {selectedNode.level}
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-foreground">{selectedNode.name}</h3>
                                <p className="mb-6 text-base leading-relaxed text-muted-foreground">{selectedNode.description}</p>
                                <Button asChild>
                                    <a href="/certifications">Explorer les certifications →</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Section droite - Roue des certifications */}
                    <div className="flex items-center justify-center bg-[#f2f2f2] lg:col-span-3">
                        <div className="relative aspect-square w-full max-w-[600px]">
                            <svg viewBox="0 0 500 500" className="h-full w-full">
                                {/* Cercle central - Niveau 0 */}
                                {(() => {
                                    const centralNode = getNodesAtLevel(0)[0];
                                    if (!centralNode) return null;
                                    return (
                                        <g>
                                            <circle
                                                cx={CENTER_X}
                                                cy={CENTER_Y}
                                                r={BASE_RADIUS}
                                                fill={centralNode.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedNode(centralNode)}
                                            />
                                            {/* Piques triangulaires du cercle central */}
                                            {/* Pique en haut */}
                                            <path
                                                d={`M ${CENTER_X} ${CENTER_Y - BASE_RADIUS - 15} L ${CENTER_X - 15} ${CENTER_Y - BASE_RADIUS + 15} L ${CENTER_X + 15} ${CENTER_Y - BASE_RADIUS + 15} Z`}
                                                fill={centralNode.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedNode(centralNode)}
                                            />
                                            {/* Pique en bas */}
                                            <path
                                                d={`M ${CENTER_X} ${CENTER_Y + BASE_RADIUS + 15} L ${CENTER_X - 15} ${CENTER_Y + BASE_RADIUS - 15} L ${CENTER_X + 15} ${CENTER_Y + BASE_RADIUS - 15} Z`}
                                                fill={centralNode.color}
                                                className="cursor-pointer certification-wheel-hover"
                                                onClick={() => setSelectedNode(centralNode)}
                                            />
                                            <text
                                                x={CENTER_X}
                                                y={CENTER_Y}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="fill-white text-2xl font-bold pointer-events-none"
                                            >
                                                {centralNode.name}
                                            </text>
                                        </g>
                                    );
                                })()}

                                {/* Anneaux concentriques - Niveaux 1, 2, 3... */}
                                {Array.from({ length: getMaxLevel() }, (_, i) => i + 1).map((level) =>
                                    generateRingSectors(level)
                                )}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationWheel;
