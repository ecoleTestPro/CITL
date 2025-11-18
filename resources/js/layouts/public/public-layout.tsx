import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import Footer from './footer';
import Navbar from './nav-bar';

export default function PublicLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
