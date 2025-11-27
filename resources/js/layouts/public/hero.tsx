import { type BreadcrumbItem } from '@/types';
import HeroHome from './component/hero/hero-home';
import HeroStandard from './component/hero/hero-standard';

interface HeroProps {
    variant?: 'home' | 'standard';
    breadcrumbs?: BreadcrumbItem[];
}

export default function Hero({ variant = 'home', breadcrumbs = [] }: HeroProps) {
    if (variant === 'home') {
        return <HeroHome />;
    }

    return <HeroStandard breadcrumbs={breadcrumbs} />;
}
