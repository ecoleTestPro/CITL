import { AboutKeyTakeaways, AboutOverview, HeroCommon } from '@/components/blocks/about';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function Missions() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.citl'), href: '#' },
        { title: t('nav.missions'), href: '/missions' },
    ];

    const overviewItems = [
        { text: t('about.missions.overview_item_1') },
        { text: t('about.missions.overview_item_2') },
        { text: t('about.missions.overview_item_3') },
        { text: t('about.missions.overview_item_4') },
    ];

    const takeaways = [
        { number: 1, text: t('about.missions.takeaway_1') },
        { number: 2, text: t('about.missions.takeaway_2') },
        { number: 3, text: t('about.missions.takeaway_3') },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.missions.title')}</title>
                <meta name="description" content={t('seo.missions.description')} />
                <meta name="keywords" content={t('seo.missions.keywords')} />
                <meta property="og:title" content={t('seo.missions.title')} />
                <meta property="og:description" content={t('seo.missions.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <main>
                <HeroCommon
                    badge={t('about.missions.badge')}
                    title={t('about.missions.hero_title')}
                    description={t('about.missions.hero_description')}
                    backgroundImage="/assets/images/bg/sharp-2.png"
                />

                <AboutOverview
                    title={t('about.missions.overview_title')}
                    description={t('about.missions.overview_description')}
                    learnTitle={t('about.missions.learn_title')}
                    items={overviewItems}
                    imageSrc="/assets/images/pages/about/missions-overview.jpg"
                    imageAlt="Nos Missions - CITL"
                />

                <AboutKeyTakeaways
                    title={t('about.missions.takeaways_title')}
                    takeaways={takeaways}
                    conclusion={t('about.missions.conclusion')}
                    ctaText={t('about.missions.cta_text')}
                    ctaLink="/certifications"
                />
            </main>
        </PublicLayout>
    );
}

export default Missions;
