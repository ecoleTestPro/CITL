import { HeroCommon, AboutKeyTakeaways, AboutOverview } from '@/components/blocks/about';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function AboutIstqb() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.citl'), href: '#' },
        { title: t('nav.about_istqb'), href: '/about-istqb' },
    ];

    const overviewItems = [
        { text: t('about.istqb.overview_item_1') },
        { text: t('about.istqb.overview_item_2') },
        { text: t('about.istqb.overview_item_3') },
        { text: t('about.istqb.overview_item_4') },
    ];

    const takeaways = [
        { number: 1, text: t('about.istqb.takeaway_1') },
        { number: 2, text: t('about.istqb.takeaway_2') },
        { number: 3, text: t('about.istqb.takeaway_3') },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <main>
                <HeroCommon
                    badge={t('about.istqb.badge')}
                    title={t('about.istqb.hero_title')}
                    description={t('about.istqb.hero_description')}
                    backgroundImage="/assets/images/bg/sharp-2.png"
                />

                <AboutOverview
                    title={t('about.istqb.overview_title')}
                    description={t('about.istqb.overview_description')}
                    learnTitle={t('about.istqb.learn_title')}
                    items={overviewItems}
                    imageSrc="/assets/images/pages/about/istqb.png"
                    imageAlt="ISTQB - International Software Testing Qualifications Board"
                />

                <AboutKeyTakeaways
                    title={t('about.istqb.takeaways_title')}
                    takeaways={takeaways}
                    conclusion={t('about.istqb.conclusion')}
                    ctaText={t('about.istqb.cta_text')}
                    ctaLink="/certifications"
                />
            </main>
        </PublicLayout>
    );
}

export default AboutIstqb;
