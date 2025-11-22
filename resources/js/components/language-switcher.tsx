import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex w-fit justify-start bg-gray-200 px-2 dark:bg-gray-700">
                    <Languages className="h-4 w-4" />
                    <span>
                        {/* <span className="mr-2">{currentLanguage.flag}</span> */}
                        <span className="mr-2">{currentLanguage.label}</span>
                        <span className="sr-only">Changer la langue</span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`cursor-pointer ${i18n.language === language.code ? 'bg-accent' : ''}`}
                    >
                        <span className="mr-2">{language.flag}</span>
                        {language.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
