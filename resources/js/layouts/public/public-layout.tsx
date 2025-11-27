import { CookieConsentModal } from '@/components/cookie-consent-modal';
import { FloatingActions } from '@/components/floating-actions';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './footer';
import Hero from './hero';
import Navbar from './nav-bar';

interface PublicLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    variant?: 'home' | 'standard';
}

export default function PublicLayout({
    children,
    breadcrumbs = [],
    variant = 'standard',
}: PropsWithChildren<PublicLayoutProps>) {
    return (
        <div className="flex w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900">
            <Navbar />
            {/* <Hero variant={variant} breadcrumbs={breadcrumbs} /> */}
            <main className="flex-1 bg-[#f2f2f2] dark:bg-gray-900">
                {children}
            </main>
            <Footer />
            <FloatingActions />
            <CookieConsentModal />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#333',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </div>
    );
}
