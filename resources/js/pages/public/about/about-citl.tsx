import { AboutHero, AboutKeyTakeaways, AboutOverview } from '@/components/blocks/about';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function AboutCitl() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.citl'), href: '#' },
        { title: t('nav.about_citl'), href: '/about-citl' },
    ];

    const overviewItems = [
        { text: t('about.citl.overview_item_1') },
        { text: t('about.citl.overview_item_2') },
        { text: t('about.citl.overview_item_3') },
        { text: t('about.citl.overview_item_4') },
    ];

    const takeaways = [
        { number: 1, text: t('about.citl.takeaway_1') },
        { number: 2, text: t('about.citl.takeaway_2') },
        { number: 3, text: t('about.citl.takeaway_3') },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <main>
                <AboutHero
                    badge={t('about.citl.badge')}
                    title={t('about.citl.hero_title')}
                    description={t('about.citl.hero_description')}
                    backgroundImage="/assets/images/bg/sharp-2.png"
                />

                <AboutOverview
                    title={t('about.citl.overview_title')}
                    description={t('about.citl.overview_description')}
                    learnTitle={t('about.citl.learn_title')}
                    items={overviewItems}
                    imageSrc="/assets/images/pages/about/citl-overview.jpg"
                    imageAlt="CITL - Comité Ivoirien des Tests Logiciels"
                />

                <AboutKeyTakeaways
                    title={t('about.citl.takeaways_title')}
                    takeaways={takeaways}
                    conclusion={t('about.citl.conclusion')}
                    ctaText={t('about.citl.cta_text')}
                    ctaLink="/certifications"
                />
                {/* <SpotlightStories /> */}
            </main>
        </PublicLayout>
    );
}

export default AboutCitl;
