import { SupportedLanguage } from '@/types';
import { Check, Globe, Loader2, Sparkles } from 'lucide-react';

interface LanguageSwitcherProps {
    currentLanguage: SupportedLanguage;
    onLanguageChange: (lang: SupportedLanguage) => void;
    onAutoTranslate?: () => void;
    isTranslating?: boolean;
    showTranslateButton?: boolean;
}

export function LanguageSwitcher({
    currentLanguage,
    onLanguageChange,
    onAutoTranslate,
    isTranslating = false,
    showTranslateButton = true,
}: LanguageSwitcherProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            {/* Sélecteur de langue */}
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex items-center rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
                    <button
                        type="button"
                        onClick={() => onLanguageChange('fr')}
                        className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            currentLanguage === 'fr'
                                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                        }`}
                    >
                        <span className="text-base">🇫🇷</span>
                        <span>Français</span>
                        {currentLanguage === 'fr' && <Check className="h-4 w-4 text-green-500" />}
                    </button>
                    <button
                        type="button"
                        onClick={() => onLanguageChange('en')}
                        className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            currentLanguage === 'en'
                                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                        }`}
                    >
                        <span className="text-base">🇬🇧</span>
                        <span>English</span>
                        {currentLanguage === 'en' && <Check className="h-4 w-4 text-green-500" />}
                    </button>
                </div>
            </div>

            {/* Bouton de traduction automatique */}
            {showTranslateButton && onAutoTranslate && (
                <button
                    type="button"
                    onClick={onAutoTranslate}
                    disabled={isTranslating}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                    {isTranslating ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Traduction en cours...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            <span>Traduire vers {currentLanguage === 'fr' ? '🇬🇧 English' : '🇫🇷 Français'}</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
