import { type BreadcrumbItem } from '@/types';
import BreadcrumbsWithBackground from '../breadcrumbs-with-background';

interface HeroStandardProps {
    breadcrumbs: BreadcrumbItem[];
}

const HeroStandard = ({ breadcrumbs }: HeroStandardProps) => {
    return (
        <div className="border-b bg-background">
            <div className="container mx-auto px-4 py-8">
                <BreadcrumbsWithBackground breadcrumbs={breadcrumbs} />
            </div>
        </div>
    );
};

export default HeroStandard;
