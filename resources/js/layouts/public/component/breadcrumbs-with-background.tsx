import {
    Breadcrumb,
    BreadcrumbItem as BreadcrumbItemUI,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { type BreadcrumbItem } from '@/types';
import { ChevronsRight } from 'lucide-react';

interface BreadcrumbsWithBackgroundProps {
    breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbsWithBackground = ({
    breadcrumbs,
}: BreadcrumbsWithBackgroundProps) => {
    if (!breadcrumbs.length) return null;

    return (
        <Breadcrumb className="rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-1.5">
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                    <div key={item.href} className="contents">
                        <BreadcrumbItemUI>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={item.href}>
                                    {item.title}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItemUI>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator>
                                <ChevronsRight />
                            </BreadcrumbSeparator>
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbsWithBackground;
