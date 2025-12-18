import AboutUsOne from '@/components/blocks/about-us/about-us-one';
import CertificationWheel from '@/components/blocks/certifications/certification-wheel';
import CertificationWheelTwo from '@/components/blocks/certifications/certification-wheel-two';
import CtaSectionOne from '@/components/blocks/cta/cta-section-one';
import FeaturesCertifications from '@/components/blocks/features/features-certifications';
import FeaturesSection from '@/components/blocks/features/features-section';
import HeroHome from '@/layouts/public/component/hero/hero-home';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('seo.home.title')}</title>
                <meta name="description" content={t('seo.home.description')} />
                <meta name="keywords" content={t('seo.home.keywords')} />
                <meta property="og:title" content={t('seo.home.title')} />
                <meta property="og:description" content={t('seo.home.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroHome />
            <AboutUsOne />
            <FeaturesCertifications />
            <CertificationWheelTwo />
            {false && <CertificationWheel />}
            <FeaturesSection />
            <CtaSectionOne />
            {/* <AboutUsTwo /> */}
        </PublicLayout>
    );
}

export default Home;
