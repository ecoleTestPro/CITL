'use client';

import { Link, usePage } from '@inertiajs/react';
import { AudioWaveform, Award, BookOpen, Building2, Calendar, ClipboardList, Command, FileText, GalleryVerticalEnd, HelpCircle, Newspaper, Settings2, Users } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/language-switcher';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import Logo from '@/layouts/public/logo';
import appearance from '@/routes/appearance';
import profile from '@/routes/profile';
import userPassword from '@/routes/user-password';
import { type SharedData } from '@/types';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, url } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const user = auth?.user;
    const currentUrl = (url || '') as string;

    // Configuration des données de navigation
    const data = {
        user: {
            name: user?.name || 'User',
            email: user?.email || '',
            avatar: user?.avatar || '/avatars/default.jpg',
        },
        teams: [
            {
                name: 'Acme Inc',
                logo: GalleryVerticalEnd,
                plan: 'Enterprise',
            },
            {
                name: 'Acme Corp.',
                logo: AudioWaveform,
                plan: 'Startup',
            },
            {
                name: 'Evil Corp.',
                logo: Command,
                plan: 'Free',
            },
        ],
        navMain: [
            {
                title: 'Pages',
                url: '#',
                icon: FileText,
                isActive: currentUrl.startsWith('/dashboard/pages'),
                items: [
                    {
                        title: 'Home',
                        url: '/dashboard/pages/home',
                        isActive: currentUrl === '/dashboard/pages/home',
                    },
                    {
                        title: 'About',
                        url: '#',
                        isActive:
                            currentUrl.startsWith('/dashboard/pages/about') ||
                            currentUrl.includes('/vision') ||
                            currentUrl.includes('/missions') ||
                            currentUrl.includes('/executive-board'),
                        items: [
                            {
                                title: 'About ISTQB',
                                url: '/dashboard/pages/about-istqb',
                                isActive: currentUrl === '/dashboard/pages/about-istqb',
                            },
                            {
                                title: 'About CITL',
                                url: '/dashboard/pages/about-citl',
                                isActive: currentUrl === '/dashboard/pages/about-citl',
                            },
                            {
                                title: 'Vision',
                                url: '/dashboard/pages/vision',
                                isActive: currentUrl === '/dashboard/pages/vision',
                            },
                            {
                                title: 'Missions',
                                url: '/dashboard/pages/missions',
                                isActive: currentUrl === '/dashboard/pages/missions',
                            },
                            {
                                title: 'Executive Board',
                                url: '/dashboard/pages/executive-board',
                                isActive: currentUrl === '/dashboard/pages/executive-board',
                            },
                        ],
                    },
                    {
                        title: 'Members',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Working Groups',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Why Certification',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Core Foundation',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Core Advanced',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Specialist',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Expert Level',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'A4Q Practical Tester',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Exam Questions',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Exam Fees',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Exam Registration',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Exam FAQ',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Anti-Piracy',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Glossary',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Accredited Organizations',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Accreditation Request',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Events',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Blog',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Register Certified Testers',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Certified Testers List',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'ISTQB Registry',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Contact',
                        url: '#',
                        isActive: false,
                    },
                ],
            },
            {
                title: 'Certifications',
                url: '/dashboard/certifications',
                icon: Award,
                isActive: currentUrl.startsWith('/dashboard/certifications'),
                items: [],
            },
            {
                title: 'Gestion',
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
                        title: 'Organismes accrédités',
                        url: '/dashboard/accredited-organizations',
                        isActive: currentUrl.startsWith('/dashboard/accredited-organizations'),
                    },
                    {
                        title: 'Glossaire',
                        url: '/dashboard/glossary',
                        isActive: currentUrl.startsWith('/dashboard/glossary'),
                    },
                    {
                        title: 'Blog',
                        url: '/dashboard/blog',
                        isActive: currentUrl.startsWith('/dashboard/blog'),
                    },
                    {
                        title: 'Événements',
                        url: '/dashboard/events',
                        isActive: currentUrl.startsWith('/dashboard/events'),
                    },
                    {
                        title: 'FAQs',
                        url: '/dashboard/faqs',
                        isActive: currentUrl.startsWith('/dashboard/faqs'),
                    },
                ],
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings2,
                isActive: currentUrl.startsWith('/settings'),
                items: [
                    {
                        title: 'Profile',
                        url: profile.edit.url(),
                        isActive: currentUrl === profile.edit.url(),
                    },
                    {
                        title: 'Password',
                        url: userPassword.edit.url(),
                        isActive: currentUrl === userPassword.edit.url(),
                    },
                    {
                        title: 'Appearance',
                        url: appearance.edit.url(),
                        isActive: currentUrl === appearance.edit.url(),
                    },
                ],
            },
        ],
        navRequests: [
            {
                name: 'Inscriptions Examens',
                url: '/dashboard/exam-registrations',
                icon: ClipboardList,
                isActive: currentUrl.startsWith('/dashboard/exam-registrations'),
            },
            {
                name: 'Demandes d\'adhésion',
                url: '/dashboard/membership-applications',
                icon: Users,
                isActive: currentUrl.startsWith('/dashboard/membership-applications'),
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <div className="flex items-center justify-center px-4 py-3">
                    <Logo />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />

                {/* Demandes Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Demandes</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navRequests.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild isActive={item.isActive}>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
                <div className="flex items-center justify-center gap-2 p-2 border-t border-sidebar-border">
                    <LanguageSwitcher />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
