'use client';

import { Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, Building2, ClipboardList, FileText, Settings2, Shield, Users } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/language-switcher';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Logo from '@/layouts/public/logo';
import appearance from '@/routes/appearance';
import profile from '@/routes/profile';
import userPassword from '@/routes/user-password';
import { type SharedData } from '@/types';

interface UserRole {
    id: number;
    name: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const currentUrl = page.url || '';
    const { t } = useTranslation();
    const user = auth?.user;

    // Check if user is admin
    const userRoles = (user as { roles?: UserRole[] })?.roles || [];
    const isAdmin = userRoles.some((role) => role.name === 'admin');

    // Configuration des données de navigation
    const data = {
        user: {
            name: user?.name || 'User',
            email: user?.email || '',
            avatar: user?.avatar || '/avatars/default.jpg',
        },
        navMain: [
            {
                title: t('sidebar.pages'),
                url: '#',
                icon: FileText,
                isActive: currentUrl.startsWith('/dashboard/pages'),
                items: [
                    // Accueil
                    {
                        title: t('sidebar.home'),
                        url: '/dashboard/pages/home',
                        isActive: currentUrl === '/dashboard/pages/home',
                    },
                    // CITL (À propos)
                    {
                        title: t('sidebar.citl'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/about') ||
                            currentUrl.includes('/vision') ||
                            currentUrl.includes('/missions') ||
                            currentUrl.includes('/executive-board'),
                        items: [
                            {
                                title: t('sidebar.about_istqb'),
                                url: '/dashboard/pages/about-istqb',
                                isActive: currentUrl === '/dashboard/pages/about-istqb',
                            },
                            {
                                title: t('sidebar.about_citl'),
                                url: '/dashboard/pages/about-citl',
                                isActive: currentUrl === '/dashboard/pages/about-citl',
                            },
                            {
                                title: t('sidebar.vision'),
                                url: '/dashboard/pages/vision',
                                isActive: currentUrl === '/dashboard/pages/vision',
                            },
                            {
                                title: t('sidebar.missions'),
                                url: '/dashboard/pages/missions',
                                isActive: currentUrl === '/dashboard/pages/missions',
                            },
                            {
                                title: t('sidebar.executive_board'),
                                url: '/dashboard/pages/executive-board',
                                isActive: currentUrl === '/dashboard/pages/executive-board',
                            },
                        ],
                    },
                    // Adhésion
                    {
                        title: t('sidebar.membership'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/members') ||
                            currentUrl.startsWith('/dashboard/pages/working-groups'),
                        items: [
                            {
                                title: t('sidebar.members'),
                                url: '/dashboard/pages/members',
                                isActive: currentUrl === '/dashboard/pages/members',
                            },
                            {
                                title: t('sidebar.working_groups'),
                                url: '/dashboard/pages/working-groups',
                                isActive: currentUrl === '/dashboard/pages/working-groups',
                            },
                        ],
                    },
                    // Certifications
                    {
                        title: t('sidebar.certifications'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/why-certification') ||
                            currentUrl.startsWith('/dashboard/pages/core-foundation') ||
                            currentUrl.startsWith('/dashboard/pages/core-advanced') ||
                            currentUrl.startsWith('/dashboard/pages/specialist') ||
                            currentUrl.startsWith('/dashboard/pages/expert-level') ||
                            currentUrl.startsWith('/dashboard/pages/a4q'),
                        items: [
                            {
                                title: t('sidebar.why_certification'),
                                url: '/dashboard/pages/why-certification',
                                isActive: currentUrl === '/dashboard/pages/why-certification',
                            },
                            // {
                            //     title: t('sidebar.core_foundation'),
                            //     url: '/dashboard/pages/core-foundation',
                            //     isActive: currentUrl === '/dashboard/pages/core-foundation',
                            // },
                            // {
                            //     title: t('sidebar.core_advanced'),
                            //     url: '/dashboard/pages/core-advanced',
                            //     isActive: currentUrl === '/dashboard/pages/core-advanced',
                            // },
                            // {
                            //     title: t('sidebar.specialist'),
                            //     url: '/dashboard/pages/specialist',
                            //     isActive: currentUrl === '/dashboard/pages/specialist',
                            // },
                            // {
                            //     title: t('sidebar.expert_level'),
                            //     url: '/dashboard/pages/expert-level',
                            //     isActive: currentUrl === '/dashboard/pages/expert-level',
                            // },
                            // {
                            //     title: t('sidebar.a4q_practical_tester'),
                            //     url: '/dashboard/pages/a4q-practical-tester',
                            //     isActive: currentUrl === '/dashboard/pages/a4q-practical-tester',
                            // },
                        ],
                    },
                    // Examens
                    {
                        title: t('sidebar.exams'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/exam') ||
                            currentUrl.startsWith('/dashboard/pages/anti-piracy') ||
                            currentUrl.startsWith('/dashboard/pages/glossary'),
                        items: [
                            {
                                title: t('sidebar.exam_questions'),
                                url: '/dashboard/pages/exam-questions',
                                isActive: currentUrl === '/dashboard/pages/exam-questions',
                            },
                            {
                                title: t('sidebar.exam_fees'),
                                url: '/dashboard/pages/exam-fees',
                                isActive: currentUrl === '/dashboard/pages/exam-fees',
                            },
                            {
                                title: t('sidebar.exam_registration_page'),
                                url: '/dashboard/pages/exam-registration',
                                isActive: currentUrl === '/dashboard/pages/exam-registration',
                            },
                            // {
                            //     title: t('sidebar.exam_faq'),
                            //     url: '/dashboard/pages/exam-faq',
                            //     isActive: currentUrl === '/dashboard/pages/exam-faq',
                            // },
                            {
                                title: t('sidebar.anti_piracy'),
                                url: '/dashboard/pages/anti-piracy',
                                isActive: currentUrl === '/dashboard/pages/anti-piracy',
                            },
                            // {
                            //     title: t('sidebar.glossary'),
                            //     url: '/dashboard/pages/glossary',
                            //     isActive: currentUrl === '/dashboard/pages/glossary',
                            // },
                        ],
                    },
                    // Formation
                    {
                        title: t('sidebar.training'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/accredited-organizations') ||
                            currentUrl.startsWith('/dashboard/pages/accreditation-request'),
                        items: [
                            {
                                title: t('sidebar.accredited_organizations'),
                                url: '/dashboard/pages/accredited-organizations',
                                isActive: currentUrl === '/dashboard/pages/accredited-organizations',
                            },
                            {
                                title: t('sidebar.accreditation_request'),
                                url: '/dashboard/pages/accreditation-request',
                                isActive: currentUrl === '/dashboard/pages/accreditation-request',
                            },
                        ],
                    },
                    // Inscription testeurs
                    {
                        title: t('sidebar.registration'),
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/register-certified-testers') ||
                            currentUrl.startsWith('/dashboard/pages/certified-testers-list') ||
                            currentUrl.startsWith('/dashboard/pages/istqb-registry'),
                        items: [
                            {
                                title: t('sidebar.register_certified_testers'),
                                url: '/dashboard/pages/register-certified-testers',
                                isActive: currentUrl === '/dashboard/pages/register-certified-testers',
                            },
                            {
                                title: t('sidebar.certified_testers_list'),
                                url: '/dashboard/pages/certified-testers-list',
                                isActive: currentUrl === '/dashboard/pages/certified-testers-list',
                            },
                            // {
                            //     title: t('sidebar.istqb_registry'),
                            //     url: '/dashboard/pages/istqb-registry',
                            //     isActive: currentUrl === '/dashboard/pages/istqb-registry',
                            // },
                        ],
                    },
                    // Événements
                    // {
                    //     title: t('sidebar.events'),
                    //     url: '/dashboard/pages/events',
                    //     isActive: currentUrl === '/dashboard/pages/events',
                    // },
                    // Blog
                    // {
                    //     title: t('sidebar.blog'),
                    //     url: '/dashboard/pages/blog',
                    //     isActive: currentUrl === '/dashboard/pages/blog',
                    // },
                    // Contact
                    {
                        title: t('sidebar.contact'),
                        url: '/dashboard/pages/contact',
                        isActive: currentUrl === '/dashboard/pages/contact',
                    },
                ],
            },
            {
                title: t('sidebar.certifications'),
                url: '/dashboard/certifications',
                icon: Award,
                isActive: currentUrl.startsWith('/dashboard/certifications'),
                items: [],
            },
            {
                title: t('sidebar.management'),
                url: '#',
                icon: BookOpen,
                isActive:
                    currentUrl.startsWith('/dashboard/glossary') ||
                    currentUrl.startsWith('/dashboard/blog') ||
                    currentUrl.startsWith('/dashboard/events') ||
                    currentUrl.startsWith('/dashboard/faqs') ||
                    currentUrl.startsWith('/dashboard/accredited-organizations'),
                items: [
                    {
                        title: t('sidebar.accredited_organizations'),
                        url: '/dashboard/accredited-organizations',
                        isActive: currentUrl.startsWith('/dashboard/accredited-organizations'),
                    },
                    {
                        title: t('sidebar.glossary'),
                        url: '/dashboard/glossary',
                        isActive: currentUrl.startsWith('/dashboard/glossary'),
                    },
                    {
                        title: t('sidebar.blog'),
                        url: '/dashboard/blog',
                        isActive: currentUrl.startsWith('/dashboard/blog'),
                    },
                    {
                        title: t('sidebar.events'),
                        url: '/dashboard/events',
                        isActive: currentUrl.startsWith('/dashboard/events'),
                    },
                    {
                        title: t('sidebar.faqs'),
                        url: '/dashboard/faqs',
                        isActive: currentUrl.startsWith('/dashboard/faqs'),
                    },
                ],
            },
            {
                title: t('sidebar.settings'),
                url: '#',
                icon: Settings2,
                isActive: currentUrl.startsWith('/settings'),
                items: [
                    {
                        title: t('sidebar.profile'),
                        url: profile.edit.url(),
                        isActive: currentUrl === profile.edit.url(),
                    },
                    {
                        title: t('sidebar.password'),
                        url: userPassword.edit.url(),
                        isActive: currentUrl === userPassword.edit.url(),
                    },
                    {
                        title: t('sidebar.appearance'),
                        url: appearance.edit.url(),
                        isActive: currentUrl === appearance.edit.url(),
                    },
                ],
            },
        ],
        navRequests: [
            {
                name: t('sidebar.exam_registrations'),
                url: '/dashboard/exam-registrations',
                icon: ClipboardList,
                isActive: currentUrl.startsWith('/dashboard/exam-registrations'),
            },
            {
                name: t('sidebar.membership_applications'),
                url: '/dashboard/membership-applications',
                icon: Users,
                isActive: currentUrl.startsWith('/dashboard/membership-applications'),
            },
        ],
        navAdmin: [
            {
                name: t('sidebar.users'),
                url: '/dashboard/users',
                icon: Users,
                isActive: currentUrl.startsWith('/dashboard/users'),
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-center px-4 py-3">
                    <Logo />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />

                {/* Demandes Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>{t('sidebar.requests')}</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navRequests.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <Link
                                    href={item.url}
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-all',
                                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                        item.isActive
                                            ? 'bg-gray-100 text-gray-700 font-semibold dark:bg-gray-900/50 dark:text-gray-300'
                                            : 'text-sidebar-foreground',
                                    )}
                                >
                                    <item.icon
                                        className={cn('h-4 w-4 shrink-0', item.isActive && 'text-gray-600 dark:text-gray-400')}
                                    />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Administration Section - Admin only */}
                {isAdmin && (
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <Shield className="mr-2 h-4 w-4" />
                            {t('sidebar.administration')}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navAdmin.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <Link
                                        href={item.url}
                                        className={cn(
                                            'flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-all',
                                            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                            item.isActive
                                                ? 'bg-gray-100 text-gray-700 font-semibold dark:bg-gray-900/50 dark:text-gray-300'
                                                : 'text-sidebar-foreground',
                                        )}
                                    >
                                        <item.icon
                                            className={cn('h-4 w-4 shrink-0', item.isActive && 'text-gray-600 dark:text-gray-400')}
                                        />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
                <div className="flex items-center justify-center gap-2 border-t border-sidebar-border p-2">
                    <LanguageSwitcher />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
