// Exemple de données pour le composant SpotlightStories
export const spotlightStoriesData = {
    title: 'Témoignages de nos certifiés',
    subtitle: 'Des résultats concrets de professionnels certifiés',
    primaryCtaText: 'Lire les témoignages',
    primaryCtaLink: '/testimonials',
    secondaryCtaText: 'Partager votre expérience',
    secondaryCtaLink: '/contact',
    stories: [
        // Colonne 1
        [
            {
                type: 'testimonial' as const,
                logo: '/assets/images/logos/company-1.svg',
                quote: 'La certification ISTQB a transformé ma carrière. J\'ai pu accéder à des postes à responsabilités grâce aux compétences acquises.',
                author: {
                    name: 'Konan Yao',
                    role: 'Test Manager, Orange CI',
                    avatar: '/assets/images/avatars/avatar-1.jpg',
                },
                delay: 0.1,
            },
        ],
        // Colonne 2
        [
            {
                type: 'case-study' as const,
                badge: 'Étude de cas',
                quote: 'Comment une entreprise ivoirienne a amélioré sa qualité logicielle de 60% grâce aux certifications ISTQB.',
                ctaText: 'Lire maintenant',
                ctaLink: '/case-studies/quality-improvement',
                delay: 0.2,
            },
            {
                type: 'stat' as const,
                statNumber: '50%',
                statDescription: 'd\'augmentation de salaire en moyenne après la certification Foundation Level',
                backgroundColor: 'green',
                delay: 0.3,
            },
        ],
        // Colonne 3
        [
            {
                type: 'testimonial' as const,
                logo: '/assets/images/logos/company-2.svg',
                quote: 'La qualité et la rigueur de la formation m\'ont permis de réussir mon examen du premier coup.',
                author: {
                    name: 'Aya Kouassi',
                    role: 'QA Engineer, MTN CI',
                    avatar: '/assets/images/avatars/avatar-2.jpg',
                },
                delay: 0.4,
            },
            {
                type: 'testimonial' as const,
                logo: '/assets/images/logos/company-3.svg',
                quote: 'Grâce au CITL, j\'ai pu certifier toute mon équipe de testeurs avec des formateurs accrédités de qualité.',
                author: {
                    name: 'Jean-Marc Diabaté',
                    role: 'CTO, Startup Tech',
                    avatar: '/assets/images/avatars/avatar-3.jpg',
                },
                delay: 0.5,
            },
        ],
        // Colonne 4
        [
            {
                type: 'case-study' as const,
                badge: 'Étude de cas',
                badgeVariant: 'dark' as const,
                quote: 'Une banque ivoirienne réduit ses bugs de production de 70% après avoir certifié son équipe QA.',
                ctaText: 'Lire maintenant',
                ctaLink: '/case-studies/banking-success',
                backgroundColor: 'dark',
                delay: 0.4,
            },
            {
                type: 'testimonial' as const,
                logo: '/assets/images/logos/company-4.svg',
                quote: 'Le processus de certification est bien structuré et les examens sont de qualité internationale.',
                author: {
                    name: 'Mohamed Traoré',
                    role: 'Senior Tester, Fintech Inc',
                    avatar: '/assets/images/avatars/avatar-4.jpg',
                },
                delay: 0.3,
            },
        ],
    ],
};
