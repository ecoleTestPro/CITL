import { AboutKeyTakeaways, HeroCommon } from '@/components/blocks/about';
import { WhyJoinSection } from '@/components/blocks/membership';
import MembershipFormModal from '@/components/membership/membership-form-modal';
import PublicLayout from '@/layouts/public/public-layout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Members() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.membership'), href: '#' },
        { title: t('nav.members'), href: '/members' },
    ];

    const membershipBenefits = [
        t('about.members.benefit_1'),
        t('about.members.benefit_2'),
        t('about.members.benefit_3'),
        t('about.members.benefit_4'),
        t('about.members.benefit_5'),
        t('about.members.benefit_6'),
        t('about.members.benefit_7'),
        t('about.members.benefit_8'),
    ];

    const takeaways = [
        {
            number: 1,
            text: t('about.members.takeaway_1'),
        },
        {
            number: 2,
            text: t('about.members.takeaway_2'),
        },
        {
            number: 3,
            text: t('about.members.takeaway_3'),
        },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <main>
                {/* Hero Section */}
                <HeroCommon
                    badge={t('about.members.badge')}
                    title={t('about.members.hero_title')}
                    description={t('about.members.hero_description')}
                    backgroundImage="/assets/images/bg/sharp-2.png"
                />

                {/* Why Join CITL Section */}
                <WhyJoinSection
                    badge={t('about.members.why_join_badge')}
                    title={t('about.members.why_join_title')}
                    description={t('about.members.why_join_description')}
                    benefitsTitle={t('about.members.benefits_title')}
                    benefits={membershipBenefits}
                    ctaText={t('about.members.join_now')}
                    onCtaClick={() => setIsModalOpen(true)}
                    imageSrc="/assets/images/pages/membership/membership-benefits.jpg"
                    imageAlt="CITL Membership Benefits"
                    imagePosition="right"
                />

                {/* Key Takeaways */}
                <AboutKeyTakeaways
                    title={t('about.members.why_matters_title')}
                    takeaways={takeaways}
                    conclusion={t('about.members.conclusion')}
                    ctaText={t('about.members.cta_text')}
                    ctaLink="#"
                    onCtaClick={() => setIsModalOpen(true)}
                />
            </main>

            {/* Membership Form Modal */}
            <MembershipFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </PublicLayout>
    );
}

export default Members;
