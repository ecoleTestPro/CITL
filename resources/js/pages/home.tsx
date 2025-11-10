import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Accueil - CITL" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Comité Ivoirien des Tests Logiciels
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-xl text-orange-100">
                            Représentant officiel de l'ISTQB en Côte d'Ivoire.
                            Certifications, formations et promotion de
                            l'excellence en tests logiciels.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-orange-600 hover:bg-gray-100"
                            >
                                <Link href="/a-propos-du-citl">
                                    Découvrir le CITL
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-orange-600"
                            >
                                <Link href="/pourquoi-obtenir-la-certification-istqb">
                                    Les certifications
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border bg-white p-6 shadow-sm">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                Certifications ISTQB
                            </h3>
                            <p className="text-gray-600">
                                Obtenez des certifications reconnues
                                internationalement en tests logiciels.
                            </p>
                        </div>

                        <div className="rounded-lg border bg-white p-6 shadow-sm">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                Formations
                            </h3>
                            <p className="text-gray-600">
                                Formations dispensées par des organismes
                                accrédités par le CITL.
                            </p>
                        </div>

                        <div className="rounded-lg border bg-white p-6 shadow-sm">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                Communauté
                            </h3>
                            <p className="text-gray-600">
                                Rejoignez une communauté dynamique de
                                professionnels du test logiciel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Prêt à passer votre certification ?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                        Inscrivez-vous dès aujourd'hui aux examens de
                        certification ISTQB et boostez votre carrière.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg">
                            <Link href="/sinscrire-a-lexamen">
                                S'inscrire à un examen
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
