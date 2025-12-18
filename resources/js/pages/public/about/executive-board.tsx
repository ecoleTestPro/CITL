import { AboutKeyTakeaways, AboutOverview, HeroCommon } from '@/components/blocks/about';
import { TeamMembers } from '@/components/blocks/team';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function ExecutiveBoard() {
    const { t } = useTranslation();
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');
    const overviewImage = useImage('about.executive_board', 'overview', '/assets/images/pages/about/executive-board.jpg');
    const member1Image = useImage('about.executive_board', 'member_1', '/assets/images/team/alexis-nana.png');
    const member2Image = useImage('about.executive_board', 'member_2', '/assets/images/team/sylviane-akpangny.jpeg');
    const member3Image = useImage('about.executive_board', 'member_3', '/assets/images/team/sekou-diabate.png');

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.citl'), href: '#' },
        { title: t('nav.executive_board'), href: '/executive-board' },
    ];

    const overviewItems = [
        { text: t('about.executive_board.overview_item_1') },
        { text: t('about.executive_board.overview_item_2') },
        { text: t('about.executive_board.overview_item_3') },
        { text: t('about.executive_board.overview_item_4') },
    ];

    const takeaways = [
        { number: 1, text: t('about.executive_board.takeaway_1') },
        { number: 2, text: t('about.executive_board.takeaway_2') },
        { number: 3, text: t('about.executive_board.takeaway_3') },
    ];

    const members = [
        {
            name: t('about.executive_board.member_1_name'),
            role: t('about.executive_board.member_1_role'),
            description: t('about.executive_board.member_1_description'),
            image: member1Image,
        },
        {
            name: t('about.executive_board.member_2_name'),
            role: t('about.executive_board.member_2_role'),
            description: t('about.executive_board.member_2_description'),
            image: member2Image,
        },
        {
            name: t('about.executive_board.member_3_name'),
            role: t('about.executive_board.member_3_role'),
            description: t('about.executive_board.member_3_description'),
            image: member3Image,
        },
    ];

    return (
        <PublicLayout variant="standard" breadcrumbs={breadcrumbs}>
            <Head>
                <title>{t('seo.executive_board.title')}</title>
                <meta name="description" content={t('seo.executive_board.description')} />
                <meta name="keywords" content={t('seo.executive_board.keywords')} />
                <meta property="og:title" content={t('seo.executive_board.title')} />
                <meta property="og:description" content={t('seo.executive_board.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <main>
                <HeroCommon
                    badge={t('about.executive_board.badge')}
                    title={t('about.executive_board.hero_title')}
                    description={t('about.executive_board.hero_description')}
                    backgroundImage={bgSharp2}
                />

                <AboutOverview
                    title={t('about.executive_board.overview_title')}
                    description={t('about.executive_board.overview_description')}
                    learnTitle={t('about.executive_board.learn_title')}
                    items={overviewItems}
                    imageSrc={overviewImage}
                    imageAlt="Bureau Exécutif - CITL"
                />

                <TeamMembers title={t('about.executive_board.team_title')} members={members} />

                <AboutKeyTakeaways
                    title={t('about.executive_board.takeaways_title')}
                    takeaways={takeaways}
                    conclusion={t('about.executive_board.conclusion')}
                    ctaText={t('about.executive_board.cta_text')}
                    ctaLink="/contact"
                />
            </main>
        </PublicLayout>
    );
}

export default ExecutiveBoard;
