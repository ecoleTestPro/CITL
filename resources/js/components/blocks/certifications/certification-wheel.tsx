import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Certification {
    id: string;
    name: string;
    fullName: string;
    description: string;
    level: 'foundation' | 'advanced' | 'expert' | 'specialist';
    link: string;
}

const certifications: Certification[] = [
    {
        id: 'ctfl',
        name: 'CTFL',
        fullName: 'Certified Tester Foundation Level',
        description:
            "Le niveau Foundation est le point d'entrée pour toutes les certifications ISTQB®. Il fournit les bases essentielles du testing logiciel.",
        level: 'foundation',
        link: '/core-foundation',
    },
    {
        id: 'ctal-ta',
        name: 'TA',
        fullName: 'Certified Tester Advanced Level - Test Analyst',
        description: "Cette certification s'adresse aux analystes de tests expérimentés qui souhaitent approfondir leurs compétences en conception de tests.",
        level: 'advanced',
        link: '/core-advanced',
    },
    {
        id: 'ctal-tae',
        name: 'TAE',
        fullName: 'Certified Tester Advanced Level - Test Automation Engineer',
        description: "Conçue pour les ingénieurs qui souhaitent maîtriser l'automatisation des tests et les frameworks de test.",
        level: 'advanced',
        link: '/core-advanced',
    },
    {
        id: 'ctal-tm',
        name: 'TM',
        fullName: 'Certified Tester Advanced Level - Test Manager',
        description: 'Cette certification est destinée aux gestionnaires de tests qui dirigent des équipes et des projets de test.',
        level: 'advanced',
        link: '/core-advanced',
    },
    {
        id: 'ctel',
        name: 'Expert Level',
        fullName: 'Certified Tester Expert Level',
        description: "Le niveau Expert représente le plus haut niveau de maîtrise dans le domaine du test logiciel selon l'ISTQB®.",
        level: 'expert',
        link: '/expert-level',
    },
    {
        id: 'specialist',
        name: 'Specialist',
        fullName: 'Certifications Spécialisées',
        description: 'Les certifications spécialisées couvrent des domaines spécifiques comme les tests mobiles, agiles, gaming, etc.',
        level: 'specialist',
        link: '/specialist',
    },
];

// Configuration des secteurs Core Advanced (niveau avancé)
interface AdvancedSector {
    certIndex: number;
    path: string;
    textX: number;
    textY: number;
    color: string;
}

const ADVANCED_SECTORS: AdvancedSector[] = [
    {
        certIndex: 1, // TA
        path: 'M 250 250 L 340 160 A 127 127 0 0 1 410 250 L 250 250 Z',
        textX: 340,
        textY: 200,
        color: 'url(#advancedGradient)',
    },
    {
        certIndex: 2, // TAE
        path: 'M 250 250 L 410 250 A 127 127 0 0 1 340 340 L 250 250 Z',
        textX: 350,
        textY: 300,
        color: 'oklch(0.6 0.17 50)',
    },
    {
        certIndex: 3, // TM
        path: 'M 250 250 L 160 160 A 127 127 0 0 1 340 160 L 250 250 Z',
        textX: 250,
        textY: 150,
        color: 'oklch(0.58 0.16 40)',
    },
];

const CertificationWheel = () => {
    const [selectedCert, setSelectedCert] = useState<Certification>(certifications[0]);

    const getCertification = (idRow: number): Certification => {
        const defualt: Certification = {
            id: 'ctfl',
            name: 'CTFL',
            fullName: 'Certified Tester Foundation Level',
            description:
                "Le niveau Foundation est le point d'entrée pour toutes les certifications ISTQB®. Il fournit les bases essentielles du testing logiciel.",
            level: 'foundation',
            link: '/core-foundation',
        };

        try {
            const certif = certifications.find((cert) => cert.id === idRow.toString())! ?? defualt;
            return certif;
        } catch (error) {
            return defualt;
        }
    };

    return (
        <div className="bg-white p-6 dark:bg-gray-900">
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
                            {/* Card de certification sélectionnée */}
                            <div className="">
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
                                    {selectedCert.level}
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-foreground">{selectedCert.fullName}</h3>
                                <p className="mb-6 text-base leading-relaxed text-muted-foreground">{selectedCert.description}</p>
                                <Button asChild>
                                    <a href={selectedCert.link}>En savoir plus →</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Section droite - Roue des certifications */}
                    <div className="flex items-center justify-center bg-[#f2f2f2] lg:col-span-3">
                        <div className="relative aspect-square w-full max-w-[600px]">
                            <svg viewBox="0 0 500 500" className="h-full w-full">
                                {/* Définition des dégradés */}
                                <defs>
                                    <radialGradient id="centerGradient">
                                        <stop offset="0%" stopColor="oklch(0.4 0.15 250)" />
                                        <stop offset="100%" stopColor="oklch(0.3 0.15 250)" />
                                    </radialGradient>
                                    <radialGradient id="advancedGradient">
                                        <stop offset="0%" stopColor="oklch(0.62 0.18 45)" />
                                        <stop offset="100%" stopColor="oklch(0.55 0.16 45)" />
                                    </radialGradient>
                                    <radialGradient id="expertGradient">
                                        <stop offset="0%" stopColor="oklch(0.58 0.15 145)" />
                                        <stop offset="100%" stopColor="oklch(0.52 0.13 145)" />
                                    </radialGradient>
                                    <radialGradient id="specialistGradient">
                                        <stop offset="0%" stopColor="oklch(0.7 0.1 200)" />
                                        <stop offset="100%" stopColor="oklch(0.65 0.08 200)" />
                                    </radialGradient>
                                </defs>

                                {/* Cercle central - CTFL Foundation */}
                                <circle
                                    cx="250"
                                    cy="250"
                                    r="70"
                                    fill="url(#centerGradient)"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    onClick={() => setSelectedCert(certifications[0])}
                                />

                                {/* Piques triangulaires du cercle CITL (dessinés après le cercle pour être visibles) */}
                                {/* Pique en haut */}
                                <path
                                    d="M 250 180 L 240 200 L 260 200 Z"
                                    fill="url(#centerGradient)"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    onClick={() => setSelectedCert(certifications[0])}
                                />
                                {/* Pique en bas */}
                                <path
                                    d="M 250 320 L 240 300 L 260 300 Z"
                                    fill="url(#centerGradient)"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    onClick={() => setSelectedCert(certifications[0])}
                                />

                                <text x="250" y="260" textAnchor="middle" className="fill-white text-2xl font-bold pointer-events-none">
                                    {getCertification(0).name}
                                </text>

                                {/* Anneau Advanced Level - 3 secteurs (dynamique) */}
                                {/* {ADVANCED_SECTORS.map((sector) => (
                                    <g key={certifications[sector.certIndex].id}>
                                        <path
                                            d={sector.path}
                                            fill={sector.color}
                                            className="cursor-pointer transition-all hover:opacity-80"
                                            onClick={() => setSelectedCert(certifications[sector.certIndex])}
                                        />
                                        <text
                                            x={sector.textX}
                                            y={sector.textY}
                                            textAnchor="middle"
                                            className="fill-white text-sm font-bold pointer-events-none"
                                        >
                                            {certifications[sector.certIndex].name}
                                        </text>
                                    </g>
                                ))} */}

                                {/* <path
                                    d="M 430 250 L 420 245 L 420 255 Z"
                                    fill="url(#expertGradient)"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    onClick={() => setSelectedCert(certifications[4])}
                                />
                                <circle
                                    cx="250"
                                    cy="250"
                                    r="180"
                                    fill="none"
                                    stroke="url(#expertGradient)"
                                    strokeWidth="30"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    strokeDasharray="40 20"
                                    onClick={() => setSelectedCert(certifications[4])}
                                />
                                <circle cx="465" cy="250" r="18" fill="url(#expertGradient)" className="cursor-pointer" onClick={() => setSelectedCert(certifications[4])} />
                                <text x="465" y="254" textAnchor="middle" className="fill-white text-[8px] font-bold uppercase">
                                    EXPERT
                                </text>

                                <path
                                    d="M 30 250 L 40 245 L 40 255 Z"
                                    fill="url(#specialistGradient)"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    onClick={() => setSelectedCert(certifications[5])}
                                />
                                <circle
                                    cx="250"
                                    cy="250"
                                    r="220"
                                    fill="none"
                                    stroke="url(#specialistGradient)"
                                    strokeWidth="25"
                                    className="cursor-pointer transition-all hover:opacity-80"
                                    strokeDasharray="30 15"
                                    onClick={() => setSelectedCert(certifications[5])}
                                /> */}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationWheel;
