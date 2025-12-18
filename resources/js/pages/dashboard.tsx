import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Award, BookOpen, Building2, CalendarDays, FileText, GraduationCap, LayoutDashboard, UserCheck, Users } from 'lucide-react';
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

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="flex items-center gap-2">
                                        <LayoutDashboard className="h-4 w-4" />
                                        {t('dashboard.title')}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                    {/* Main Stats */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Link href="/dashboard/exam-registrations">
                            <Card className="transition-colors hover:bg-muted/50">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.exam_registrations')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{stats.exam_registrations.total}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {stats.exam_registrations.pending} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/dashboard/membership-applications">
                            <Card className="transition-colors hover:bg-muted/50">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.membership_applications')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{stats.membership_applications.total}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {stats.membership_applications.pending} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/dashboard/accredited-organizations">
                            <Card className="transition-colors hover:bg-muted/50">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{t('dashboard.stats.accreditation_requests')}</span>
                                    </div>
                                    <p className="mt-2 text-3xl font-semibold">{stats.accreditation_requests.total}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {stats.accreditation_requests.pending} {t('dashboard.pending')}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <UserCheck className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{t('dashboard.stats.certified_testers')}</span>
                                </div>
                                <p className="mt-2 text-3xl font-semibold">{stats.certified_testers.total}</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {stats.certified_testers.pending} {t('dashboard.pending')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Stats */}
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{stats.content.certifications}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Award className="h-4 w-4" />
                                    {t('dashboard.content.certifications')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{stats.content.accredited_orgs}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Building2 className="h-4 w-4" />
                                    {t('dashboard.content.accredited_orgs')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{stats.content.articles}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    {t('dashboard.content.articles')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{stats.content.events}</p>
                                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    {t('dashboard.content.events')}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <p className="text-2xl font-semibold">{stats.content.glossary_terms}</p>
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
