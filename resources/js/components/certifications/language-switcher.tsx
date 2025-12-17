import { SupportedLanguage } from '@/types';
import { Languages, Loader2, Wand2 } from 'lucide-react';

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
        <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div className="flex rounded-md bg-white shadow-sm dark:bg-gray-800">
                    <button
                        type="button"
                        onClick={() => onLanguageChange('fr')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            currentLanguage === 'fr'
                                ? 'rounded-md bg-primary text-white'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                        }`}
                    >
                        Français
                    </button>
                    <button
                        type="button"
                        onClick={() => onLanguageChange('en')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            currentLanguage === 'en'
                                ? 'rounded-md bg-primary text-white'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                        }`}
                    >
                        English
                    </button>
                </div>
            </div>

            {showTranslateButton && onAutoTranslate && (
                <button
                    type="button"
                    onClick={onAutoTranslate}
                    disabled={isTranslating}
                    className="flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {isTranslating ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Traduction...
                        </>
                    ) : (
                        <>
                            <Wand2 className="h-4 w-4" />
                            Traduire vers {currentLanguage === 'fr' ? 'English' : 'Français'}
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
