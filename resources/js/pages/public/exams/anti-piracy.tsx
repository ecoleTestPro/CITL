import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function AntiPiracy() {
    const { t } = useTranslation();
    const bgSharp1 = useImage('global', 'bg_sharp_1', '/assets/images/bg/sharp-1.png');
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');
    const shieldMain = useImage('exams.anti_piracy', 'shield_main', '/assets/images/pages/certification/shield-2.png');
    const shieldVerification = useImage('exams.anti_piracy', 'shield_verification', '/assets/images/pages/certification/shield.png');

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.anti_piracy'), href: '/anti-piracy' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.anti_piracy.title')}</title>
                <meta name="description" content={t('seo.anti_piracy.description')} />
                <meta name="keywords" content={t('seo.anti_piracy.keywords')} />
                <meta property="og:title" content={t('seo.anti_piracy.title')} />
                <meta property="og:description" content={t('seo.anti_piracy.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('exams.anti_piracy.hero_badge')}
                title={t('exams.anti_piracy.hero_title')}
                description={t('exams.anti_piracy.hero_description')}
            />

            <CommonTextBlock
                image={{ src: shieldMain, alt: 'Protection Shield', width: 300 }}
                title={t('exams.anti_piracy.warning_title')}
                description={t('exams.anti_piracy.warning_text')}
                backgroundColor="#f8fafc"
                backgroundShapes={[
                    {
                        src: bgSharp1,
                        position: 'top-right',
                        opacity: 0.05,
                    },
                    {
                        src: bgSharp2,
                        position: 'bottom-left',
                        opacity: 0.03,
                    },
                ]}
            />

            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title={t('exams.anti_piracy.verification_title')}
                    description={t('exams.anti_piracy.verification_text')}
                    subtitle={t('exams.anti_piracy.what_to_verify')}
                    subtitleContent={t('exams.anti_piracy.contact_text')}
                    items={[
                        { text: t('exams.anti_piracy.verify_training_provider') },
                        { text: t('exams.anti_piracy.verify_exam_provider') },
                        { text: t('exams.anti_piracy.verify_certificate') },
                    ]}
                    imageSrc={shieldVerification}
                    imageAlt="Online Verification Tool"
                />
            </div>
        </PublicLayout>
    );
}

export default AntiPiracy;
