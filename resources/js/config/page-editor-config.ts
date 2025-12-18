/**
 * Configuration centralisée pour l'éditeur de pages générique
 * Permet de définir les pages éditables et leurs configurations
 */

export interface PageEditorConfig {
    /** Nom de la page utilisé pour les traductions (ex: 'about.citl') */
    translationKey: string;
    /** Pages d'images à charger (ex: ['about.citl', 'global']) */
    imagePages: string[];
    /** Titre affiché dans l'éditeur */
    title: string;
    /** Nom de la route Laravel pour la preview */
    routeName: string;
    /** Indique si la page a des images éditables */
    hasImages: boolean;
}

/**
 * Mapping des slugs de pages vers leur configuration
 * Le slug correspond à l'URL de l'admin (ex: /dashboard/pages/about-citl)
 */
export const PAGE_EDITOR_CONFIGS: Record<string, PageEditorConfig> = {
    // Home
    home: {
        translationKey: 'home',
        imagePages: ['home', 'global'],
        title: 'Page d\'accueil',
        routeName: 'home',
        hasImages: true,
    },

    // About section
    'about-citl': {
        translationKey: 'about.citl',
        imagePages: ['about.citl', 'global'],
        title: 'À propos du CITL',
        routeName: 'about-citl',
        hasImages: true,
    },
    'about-istqb': {
        translationKey: 'about.istqb',
        imagePages: ['about.istqb', 'global'],
        title: 'À propos de l\'ISTQB',
        routeName: 'about-istqb',
        hasImages: true,
    },
    vision: {
        translationKey: 'about.vision',
        imagePages: ['about.vision', 'global'],
        title: 'Vision',
        routeName: 'vision',
        hasImages: true,
    },
    missions: {
        translationKey: 'about.missions',
        imagePages: ['about.missions', 'global'],
        title: 'Missions',
        routeName: 'missions',
        hasImages: true,
    },
    'executive-board': {
        translationKey: 'about.executive_board',
        imagePages: ['about.executive_board', 'global'],
        title: 'Bureau exécutif',
        routeName: 'executive-board',
        hasImages: true,
    },

    // Exams section
    'anti-piracy': {
        translationKey: 'exams.anti_piracy',
        imagePages: ['exams.anti_piracy', 'global'],
        title: 'Anti-piratage',
        routeName: 'anti-piracy',
        hasImages: true,
    },
    'exam-faq': {
        translationKey: 'exams.faq',
        imagePages: ['global'],
        title: 'FAQ Examens',
        routeName: 'exam-faq',
        hasImages: false,
    },
    'exam-fees': {
        translationKey: 'exams.fees',
        imagePages: ['global'],
        title: 'Frais d\'examen',
        routeName: 'exam-fees',
        hasImages: false,
    },
    'exam-questions': {
        translationKey: 'exams.questions',
        imagePages: ['exams.questions', 'global'],
        title: 'Questions d\'examen',
        routeName: 'exam-questions',
        hasImages: true,
    },
    'exam-registration': {
        translationKey: 'exams.registration',
        imagePages: ['global'],
        title: 'Inscription aux examens',
        routeName: 'exam-registration',
        hasImages: false,
    },

    // Membership section
    members: {
        translationKey: 'membership.members',
        imagePages: ['membership.members', 'global'],
        title: 'Membres',
        routeName: 'members',
        hasImages: true,
    },
    'working-groups': {
        translationKey: 'membership.working_groups',
        imagePages: ['membership.working_groups', 'global'],
        title: 'Groupes de travail',
        routeName: 'working-groups',
        hasImages: true,
    },

    // Certification section
    'certified-testers-list': {
        translationKey: 'certification.testers_list',
        imagePages: ['global'],
        title: 'Liste des testeurs certifiés',
        routeName: 'certified-testers-list',
        hasImages: false,
    },
    'istqb-registry': {
        translationKey: 'certification.registry',
        imagePages: ['global'],
        title: 'Registre ISTQB',
        routeName: 'istqb-registry',
        hasImages: false,
    },
    'register-certified-testers': {
        translationKey: 'certification.register',
        imagePages: ['global'],
        title: 'Enregistrer un testeur certifié',
        routeName: 'register-certified-testers',
        hasImages: false,
    },

    // Accreditation section
    'accreditation-request': {
        translationKey: 'accreditation.request',
        imagePages: ['global'],
        title: 'Demande d\'accréditation',
        routeName: 'accreditation-request',
        hasImages: false,
    },
    'accredited-organizations': {
        translationKey: 'accreditation.organizations',
        imagePages: ['global'],
        title: 'Organismes accrédités',
        routeName: 'accredited-organizations',
        hasImages: false,
    },

    // Other pages
    glossary: {
        translationKey: 'glossary',
        imagePages: ['global'],
        title: 'Glossaire',
        routeName: 'glossary',
        hasImages: false,
    },
};

/**
 * Récupère la configuration d'une page par son slug
 */
export function getPageConfig(slug: string): PageEditorConfig | undefined {
    return PAGE_EDITOR_CONFIGS[slug];
}

/**
 * Liste de toutes les pages éditables groupées par catégorie
 */
export const PAGE_CATEGORIES = {
    'Accueil': ['home'],
    'À propos': ['about-citl', 'about-istqb', 'vision', 'missions', 'executive-board'],
    'Examens': ['anti-piracy', 'exam-faq', 'exam-fees', 'exam-questions', 'exam-registration'],
    'Adhésion': ['members', 'working-groups'],
    'Certification': ['certified-testers-list', 'istqb-registry', 'register-certified-testers'],
    'Accréditation': ['accreditation-request', 'accredited-organizations'],
    'Autres': ['glossary'],
} as const;
