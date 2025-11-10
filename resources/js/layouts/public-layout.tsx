import { HeaderMenu } from '@/components/frontend/header-menu';
import { FooterMenu } from '@/components/frontend/footer-menu';
import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderMenu />
            <main>{children}</main>
            <FooterMenu />
        </div>
    );
}
