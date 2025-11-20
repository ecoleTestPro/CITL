import { type BreadcrumbItem } from '@/types';
import BreadcrumbsWithBackground from '../breadcrumbs-with-background';

interface HeroStandardProps {
    breadcrumbs: BreadcrumbItem[];
}

const HeroStandard = ({ breadcrumbs }: HeroStandardProps) => {
    return (
        <div className="border-b bg-white/25 backdrop-blur-sm dark:bg-gray-900/45 dark:backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <BreadcrumbsWithBackground breadcrumbs={breadcrumbs} />
            </div>
        </div>
    );
};

export default HeroStandard;
