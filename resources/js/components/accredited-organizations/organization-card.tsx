import { Card, CardContent } from '@/components/ui/card';
import { Building2, ExternalLink, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AccreditedOrganization {
    id: number;
    name: string;
    country: string;
    city: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    logo: string | null;
    description: string | null;
}

interface OrganizationCardProps {
    organization: AccreditedOrganization;
}

// Helper to get the correct image URL
function getImageSrc(src: string): string {
    if (src.startsWith('http') || src.startsWith('https')) {
        return src;
    }
    if (src.startsWith('/storage')) {
        return src;
    }
    return `/storage/${src}`;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="org-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
                <div className="mb-4 flex items-start gap-4">
                    {organization.logo ? (
                        <img
                            src={getImageSrc(organization.logo)}
                            alt={organization.name}
                            className="h-16 w-16 rounded-lg object-contain"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-citl-orange/10">
                            <Building2 className="h-8 w-8 text-citl-orange" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{organization.name}</h3>
                        {organization.city && <p className="text-sm text-gray-500 dark:text-gray-400">{organization.city}</p>}
                    </div>
                </div>

                {organization.description && (
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{organization.description}</p>
                )}

                <div className="space-y-2">
                    {organization.website && (
                        <a
                            href={organization.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <ExternalLink className="h-4 w-4" />
                            {t('training.visit_website')}
                        </a>
                    )}
                    {organization.email && (
                        <a
                            href={`mailto:${organization.email}`}
                            className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <Mail className="h-4 w-4" />
                            {organization.email}
                        </a>
                    )}
                    {organization.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="h-4 w-4" />
                            {organization.phone}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
