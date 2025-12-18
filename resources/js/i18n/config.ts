import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

// Récupérer la langue depuis l'URL (paramètre ?lang=), localStorage ou utiliser 'fr' par défaut
const getInitialLanguage = (): string => {
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

i18n.use(initReactI18next).init({
    resources: {
        fr: { translation: fr },
        en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
