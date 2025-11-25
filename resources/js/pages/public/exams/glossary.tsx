import GlossaryBlock from '@/components/blocks/glossary/glossary-block';
import HeroCommon from '@/components/common/common-hero';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function Glossary() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.exams'), href: '#' },
        { title: t('nav.glossary'), href: '/glossary' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge={t('exams.glossary.hero_badge')}
                title={t('exams.glossary.hero_title')}
                description={t('exams.glossary.hero_description')}
            />
            <GlossaryBlock />
        </PublicLayout>
    );
}

export default Glossary;
