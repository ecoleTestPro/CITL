'use client';

import { usePage } from '@inertiajs/react';
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    FileText,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import profile from '@/routes/profile';
import userPassword from '@/routes/user-password';
import appearance from '@/routes/appearance';
import { type SharedData } from '@/types';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, url } = usePage<SharedData>().props;
    const user = auth?.user;
    const currentUrl = url || '';

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
                        title: 'About ISTQB',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'About CITL',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Vision',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Missions',
                        url: '#',
                        isActive: false,
                    },
                    {
                        title: 'Executive Board',
                        url: '#',
                        isActive: false,
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
        projects: [
            {
                name: 'Design Engineering',
                url: '#',
                icon: Frame,
            },
            {
                name: 'Sales & Marketing',
                url: '#',
                icon: PieChart,
            },
            {
                name: 'Travel',
                url: '#',
                icon: Map,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
