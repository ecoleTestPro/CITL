import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';

export function CertificationLoading() {
    return (
        <PublicLayout>
            <Head title="Chargement... - CITL" />
            <div className="container mx-auto flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
                    <p className="animate-pulse text-gray-600 dark:text-gray-400">Chargement des détails de la certification...</p>
                </div>
            </div>
        </PublicLayout>
    );
}
