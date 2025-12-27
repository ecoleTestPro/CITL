import PartnerCard from '@/components/blocks/partners/partner-card';
import PartnerTierHeader from '@/components/blocks/partners/partner-tier-header';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Partner {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    website: string | null;
    description: string | null;
}

interface PartnerTier {
    id: number;
    name: string;
    slug: string;
    color: string;
    icon: string | null;
    description: string | null;
    partners: Partner[];
}

interface Props {
    tiers: PartnerTier[];
}

function PartnersPage({ tiers }: Props) {
    const { t } = useTranslation();

    // Filter tiers with partners only
    const tiersWithPartners = tiers.filter((tier) => tier.partners.length > 0);

    return (
        <PublicLayout>
            <Head>
                <title>{t('partners.seo.title', 'Nos Partenaires - CITL')}</title>
                <meta name="description" content={t('partners.seo.description', 'Découvrez nos partenaires de confiance')} />
            </Head>

            <HeroCommon
                badge={t('partners.badge', 'Partenaires')}
                title={t('partners.hero_title', 'Nos Partenaires')}
                description={t(
                    'partners.hero_description',
                    "Découvrez les entreprises qui nous font confiance et avec lesquelles nous collaborons pour promouvoir l'excellence en test logiciel.",
                )}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <section className="dark:bg-gray-800/35 bg-white py-[100px] xl:py-[200px]">
                <div className="container mx-auto">
                    {tiersWithPartners.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-lg text-gray-500">{t('partners.no_partners', 'Aucun partenaire pour le moment.')}</p>
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {tiersWithPartners.map((tier) => (
                                <div key={tier.id}>
                                    {/* Tier Header */}
                                    <PartnerTierHeader name={tier.name} icon={tier.icon} color={tier.color} />

                                    {/* Partners Grid */}
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                        {tier.partners.map((partner, partnerIndex) => (
                                            <PartnerCard
                                                key={partner.id}
                                                name={partner.name}
                                                logo={partner.logo}
                                                description={partner.description}
                                                website={partner.website}
                                                index={partnerIndex}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

export default PartnersPage;
