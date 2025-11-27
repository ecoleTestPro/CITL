import { AboutKeyTakeaways, AboutOverview, HeroCommon } from '@/components/blocks/about';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function Vision() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.citl'), href: '#' },
        { title: t('nav.vision'), href: '/vision' },
    ];

    const overviewItems = [
        { text: t('about.vision.overview_item_1') },
        { text: t('about.vision.overview_item_2') },
        { text: t('about.vision.overview_item_3') },
        { text: t('about.vision.overview_item_4') },
        { text: t('about.vision.overview_item_5') },
        { text: t('about.vision.overview_item_6') },
    ];

    const takeaways = [
        { number: 1, text: t('about.vision.takeaway_1') },
        { number: 2, text: t('about.vision.takeaway_2') },
        { number: 3, text: t('about.vision.takeaway_3') },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.vision.title')}</title>
                <meta name="description" content={t('seo.vision.description')} />
                <meta name="keywords" content={t('seo.vision.keywords')} />
                <meta property="og:title" content={t('seo.vision.title')} />
                <meta property="og:description" content={t('seo.vision.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <main>
                <HeroCommon
                    badge={t('about.vision.badge')}
                    title={t('about.vision.hero_title')}
                    description={t('about.vision.hero_description')}
                    backgroundImage="/assets/images/bg/sharp-2.png"
                />

                <AboutOverview
                    title={t('about.vision.overview_title')}
                    description={t('about.vision.overview_description')}
                    learnTitle={t('about.vision.learn_title')}
                    items={overviewItems}
                    imageSrc="/assets/images/pages/about/vision-overview.jpg"
                    imageAlt="Notre Vision - CITL"
                />

                <AboutKeyTakeaways
                    title={t('about.vision.takeaways_title')}
                    takeaways={takeaways}
                    conclusion={t('about.vision.conclusion')}
                    ctaText={t('about.vision.cta_text')}
                    ctaLink="/contact"
                />
            </main>
        </PublicLayout>
    );
}

export default Vision;
