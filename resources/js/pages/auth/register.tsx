import { Head, router } from '@inertiajs/react';
import { AlertTriangle, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { t } = useTranslation();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.visit('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <AuthLayout title={t('auth.register.unauthorized_title')} description="">
            <Head title={t('auth.register.unauthorized_title')} />

            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                    <AlertTriangle className="h-10 w-10 text-orange-500" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">
                        {t('auth.register.unauthorized_heading')}
                    </h2>
                    <p className="text-muted-foreground">
                        {t('auth.register.unauthorized_message')}
                    </p>
                </div>

                <div className="mt-4 rounded-lg border border-dashed border-orange-300 bg-orange-50 px-6 py-4 dark:border-orange-700 dark:bg-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                        {t('auth.register.redirect_message', { seconds: countdown })}
                    </p>
                </div>

                <div className="mt-2 w-full">
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${(countdown / 10) * 100}%` }}
                        />
                    </div>
                </div>

                <button
                    onClick={() => router.visit('/')}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Home className="h-4 w-4" />
                    {t('auth.register.go_home')}
                </button>
            </div>
        </AuthLayout>
    );
}
