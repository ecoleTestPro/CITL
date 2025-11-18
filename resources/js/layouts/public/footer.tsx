import { Link } from '@inertiajs/react';
import {
    Facebook,
    Linkedin,
    Twitter,
    Youtube,
    Music2 as TikTok,
} from 'lucide-react';
import Logo from './logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* À propos */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-foreground">
                            À propos
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about-istqb"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    À propos de l'ISTQB
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about-citl"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    À propos du CITL
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vision"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Notre vision
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/missions"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Nos missions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/executive-board"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Le bureau exécutif
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/members"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Membres du CITL
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Formation & Examens */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-foreground">
                            Formation & Examens
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/accredited-organizations"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Trouver un organisme de formation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/exam-registration"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    S'inscrire à un examen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/accreditation-request"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Devenir organisme de formation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Informations */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-foreground">
                            Informations
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/why-certification"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Certifications
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Actualités
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Événements
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/glossary"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Glossaire
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Aide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo et informations */}
                    <div>
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                            {currentYear} CITL association à but non lucratif
                        </p>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Abidjan, Côte d'Ivoire
                        </p>
                        <div className="mb-4">
                            <Link
                                href="/contact"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Politique de confidentialité & Conditions
                                d'utilisation
                            </Link>
                            {' | '}
                            <Link
                                href="/contact"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Aide
                            </Link>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-foreground">
                                Suivez-nous
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="TikTok"
                                >
                                    <TikTok className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright bar */}
            <div className="border-t">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-center text-sm text-muted-foreground">
                        © {currentYear} CITL - Comité Ivoirien pour les Tests
                        Logiciels. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
