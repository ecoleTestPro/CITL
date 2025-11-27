import { useTranslation } from 'react-i18next';

export function useLanguage() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return {
        t,
        i18n,
        currentLanguage: i18n.language,
        changeLanguage,
    };
}
