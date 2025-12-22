import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, Building2, CalendarDays, FileText, GraduationCap, LayoutDashboard, UserCheck, Users } from 'lucide-react';
import { useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

interface Stats {
    exam_registrations: {
        total: number;
        pending: number;
    };
    membership_applications: {
        total: number;
        pending: number;
    };
    accreditation_requests: {
        total: number;
        pending: number;
    };
    certified_testers: {
        total: number;
        pending: number;
    };
    content: {
        certifications: number;
        accredited_orgs: number;
        articles: number;
        events: number;
        glossary_terms: number;
    };
}

interface Props {
    stats: Stats;
}

export default function Dashboard({ stats }: Props) {
    const { t } = useTranslation();

    const fmt = useMemo(
        () => (value: number) => {
            try {
                return new Intl.NumberFormat(undefined).format(value);
            } catch (e) {
                return String(value);
            }
        },
        [],
    );

    // Get authenticated user from Inertia page props
    const page = usePage();
    const user = (page.props as any)?.auth?.user as { name?: string; avatar?: string } | undefined;

    // Welcome banner animation ref
    const welcomeRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!welcomeRef.current) return;
        const emoji = welcomeRef.current.querySelector('.welcome-emoji') as HTMLElement | null;
        if (!emoji) return;

        // Set pivot point so the hand waves from the bottom
        gsap.set(emoji, { transformOrigin: '50% 60%' });

        // Wave animation: rotate back and forth like a waving hand
        const tl = gsap.to(emoji, {
            rotation: 20,
            duration: 0.45,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            repeatDelay: 0.6,
        });

        return () => {
            tl.kill();
        };
    }, [welcomeRef]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex shrink-0 flex-col gap-2 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="flex items-center gap-2 text-sm">
                                        <LayoutDashboard className="h-4 w-4" />
                                        {t('dashboard.title')}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Page title & short description for clarity */}
                    <div className="mt-1 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('dashboard.title')}</h1>
                            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                                {t('dashboard.subtitle') || t('dashboard.description') || t('dashboard.title')}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 flex-col justify-center gap-6 p-4 pt-0 ">
                    {/* Welcome banner for authenticated user */}
                    {user && (
                        <div ref={welcomeRef} className="w-full rounded-lg bg-gradient-to-r from-citl-orange/10 to-citl-orange/5 p-4">
                            <div className="flex items-center gap-4">
                                <span className="welcome-emoji inline-block text-3xl">👋</span>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('dashboard.welcome', { name: user.name }) || `Bienvenue, ${user.name}`}</p>
                                    {/* <p className="mt-1 text-sm text-muted-foreground">{t('dashboard.welcome_sub') || 'Voici votre tableau de bord.'}</p> */}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Main Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href="/dashboard/exam-registrations"
                            className="block"
                            aria-label={t('dashboard.stats.exam_registrations') + ' - ' + stats.exam_registrations.total}
                        >
                            <Card className="transition-transform focus-within:ring-2 focus-within:ring-citl-orange/30 hover:scale-[1.02] hover:shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.exam_registrations')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{fmt(stats.exam_registrations.total)}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {fmt(stats.exam_registrations.pending)} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            href="/dashboard/membership-applications"
                            className="block"
                            aria-label={t('dashboard.stats.membership_applications') + ' - ' + stats.membership_applications.total}
                        >
                            <Card className="transition-transform focus-within:ring-2 focus-within:ring-citl-orange/30 hover:scale-[1.02] hover:shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.membership_applications')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{fmt(stats.membership_applications.total)}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {fmt(stats.membership_applications.pending)} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            href="/dashboard/accredited-organizations"
                            className="block"
                            aria-label={t('dashboard.stats.accreditation_requests') + ' - ' + stats.accreditation_requests.total}
                        >
                            <Card className="transition-transform focus-within:ring-2 focus-within:ring-citl-orange/30 hover:scale-[1.02] hover:shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.accreditation_requests')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{fmt(stats.accreditation_requests.total)}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {fmt(stats.accreditation_requests.pending)} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            href="/dashboard/certified-testers"
                            className="block"
                            aria-label={t('dashboard.stats.certified_testers') + ' - ' + stats.certified_testers.total}
                        >
                            <Card className="transition-transform focus-within:ring-2 focus-within:ring-citl-orange/30 hover:scale-[1.02] hover:shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <UserCheck className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.certified_testers')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{fmt(stats.certified_testers.total)}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {fmt(stats.certified_testers.pending)} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Content Stats */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{fmt(stats.content.certifications)}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Award className="h-4 w-4" />
                                    {t('dashboard.content.certifications')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{fmt(stats.content.accredited_orgs)}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    {t('dashboard.content.accredited_orgs')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{fmt(stats.content.articles)}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    {t('dashboard.content.articles')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{fmt(stats.content.events)}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    {t('dashboard.content.events')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{fmt(stats.content.glossary_terms)}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    {t('dashboard.content.glossary')}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
