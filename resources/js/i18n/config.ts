import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Récupérer la langue depuis l'URL (paramètre ?lang=), localStorage ou utiliser 'fr' par défaut
const getInitialLanguage = (): string => {
    // Vérifier si on est côté serveur (SSR)
    if (typeof window === 'undefined') {
        return 'fr';
    }
    // Vérifier d'abord le paramètre URL (pour la préview de l'éditeur)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && ['fr', 'en'].includes(urlLang)) {
        return urlLang;
    }
    // Sinon, utiliser localStorage ou la langue par défaut
    return localStorage.getItem('language') || 'fr';
};

const savedLanguage = getInitialLanguage();

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: savedLanguage,
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en'],
        interpolation: {
            escapeValue: false,
        },
        backend: {
            // Charger les fichiers JSON depuis le dossier public/locales
            loadPath: '/locales/{{lng}}.json',
        },
        // Ne charger que la langue actuelle
        load: 'currentOnly',
        // Ne pas utiliser Suspense pour éviter les problèmes de chargement
        react: {
            useSuspense: false,
        },
    });

export default i18n;
