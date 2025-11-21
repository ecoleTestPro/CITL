import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';

interface CertificationErrorProps {
    error?: string | null;
}

export function CertificationError({ error }: CertificationErrorProps) {
    return (
        <PublicLayout>
            <Head title="Erreur - CITL" />
            <div className="container mx-auto flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                        <svg className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Certification introuvable</h2>
                    <p className="text-gray-600 dark:text-gray-400">{error || "Cette certification n'existe pas"}</p>
                </div>
            </div>
        </PublicLayout>
    );
}
