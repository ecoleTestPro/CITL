'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, Moon, Monitor, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export function CookieConsentModal() {
    const { t } = useTranslation();
    const { appearance, updateAppearance } = useAppearance();
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà donné son consentement
        const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!hasConsent) {
            // Délai pour une meilleure UX
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
        };
        savePreferences(allAccepted);
    };

    const handleAcceptNecessary = () => {
        const necessaryOnly: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        savePreferences(necessaryOnly);
    };

    const handleSavePreferences = () => {
        savePreferences(preferences);
    };

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
        setIsOpen(false);
    };

    const themeOptions: { value: Appearance; icon: React.ReactNode; label: string }[] = [
        { value: 'light', icon: <Sun className="h-5 w-5" />, label: t('cookie_consent.theme_light') },
        { value: 'dark', icon: <Moon className="h-5 w-5" />, label: t('cookie_consent.theme_dark') },
        { value: 'system', icon: <Monitor className="h-5 w-5" />, label: t('cookie_consent.theme_system') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        onClick={() => {}} // Empêcher la fermeture en cliquant à l'extérieur
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 right-4 left-4 z-[101] mx-auto max-w-lg -translate-y-1/2 rounded-2xl border bg-background p-6 shadow-2xl sm:right-auto sm:left-1/2 sm:-translate-x-1/2 dark:border-gray-700 dark:bg-gray-800"
                    >
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Cookie className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">{t('cookie_consent.title')}</h2>
                                <p className="text-sm text-muted-foreground">{t('cookie_consent.subtitle')}</p>
                            </div>
                        </div>

                        {/* Theme Selection */}
                        <div className="mb-6">
                            <Label className="mb-3 block text-sm font-medium">{t('cookie_consent.choose_theme')}</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {themeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => updateAppearance(option.value)}
                                        className={cn(
                                            'flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all duration-200',
                                            appearance === option.value
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'border-border bg-background hover:border-primary/50 hover:bg-accent dark:border-gray-600 dark:hover:border-primary/50',
                                        )}
                                    >
                                        {option.icon}
                                        <span className="text-xs font-medium">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mb-6 border-t dark:border-gray-700" />

                        {/* Cookie Description */}
                        <p className="mb-4 text-sm text-muted-foreground">{t('cookie_consent.description')}</p>

                        {/* Cookie Details (Expandable) */}
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-4 overflow-hidden"
                                >
                                    <div className="space-y-3 rounded-lg bg-muted/50 p-4 dark:bg-gray-700/50">
                                        {/* Necessary Cookies */}
                                        <div className="flex items-start gap-3">
                                            <Checkbox id="necessary" checked={preferences.necessary} disabled className="mt-1" />
                                            <div className="flex-1">
                                                <Label htmlFor="necessary" className="font-medium">
                                                    {t('cookie_consent.necessary_title')}
                                                </Label>
                                                <p className="text-xs text-muted-foreground">{t('cookie_consent.necessary_desc')}</p>
                                            </div>
                                        </div>

                                        {/* Analytics Cookies */}
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="analytics"
                                                checked={preferences.analytics}
                                                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, analytics: checked as boolean }))}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="analytics" className="cursor-pointer font-medium">
                                                    {t('cookie_consent.analytics_title')}
                                                </Label>
                                                <p className="text-xs text-muted-foreground">{t('cookie_consent.analytics_desc')}</p>
                                            </div>
                                        </div>

                                        {/* Marketing Cookies */}
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="marketing"
                                                checked={preferences.marketing}
                                                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, marketing: checked as boolean }))}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor="marketing" className="cursor-pointer font-medium">
                                                    {t('cookie_consent.marketing_title')}
                                                </Label>
                                                <p className="text-xs text-muted-foreground">{t('cookie_consent.marketing_desc')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Toggle Details Button */}
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="mb-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                            {showDetails ? t('cookie_consent.hide_details') : t('cookie_consent.show_details')}
                        </button>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 sm:flex-row">
                            {showDetails ? (
                                <>
                                    <Button variant="outline" onClick={handleAcceptNecessary} className="flex-1">
                                        {t('cookie_consent.necessary_only')}
                                    </Button>
                                    <Button onClick={handleSavePreferences} className="flex-1">
                                        {t('cookie_consent.save_preferences')}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline" onClick={handleAcceptNecessary} className="flex-1">
                                        {t('cookie_consent.necessary_only')}
                                    </Button>
                                    <Button onClick={handleAcceptAll} className="flex-1">
                                        {t('cookie_consent.accept_all')}
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
