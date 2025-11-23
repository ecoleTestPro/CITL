import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import { TableSection } from '@/components/common/table-section';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function ExamQuestions() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.exam_questions'), href: '/exam-questions' },
    ];

    const examColumns = [
        { key: 'module', header: t('exams.format.column_module'), align: 'left' as const },
        { key: 'questions', header: t('exams.format.column_questions'), align: 'center' as const },
        { key: 'duration', header: t('exams.format.column_duration'), align: 'center' as const },
        { key: 'durationNonNative', header: t('exams.format.column_duration_non_native'), align: 'center' as const },
    ];

    const examData = [
        { module: 'Foundation', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Agile Tester', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Model-Based Tester', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Advanced Test Manager', questions: '65', duration: '180', durationNonNative: '225' },
        { module: 'Advanced Test Analyst', questions: '60', duration: '180', durationNonNative: '225' },
        { module: 'Advanced Technical Test Analyst', questions: '45', duration: '120', durationNonNative: '150' },
        { module: 'Advanced Security Tester', questions: '45', duration: '120', durationNonNative: '150' },
        { module: 'Advanced Test Automation Engineer', questions: '40', duration: '90', durationNonNative: '113' },
        { module: 'Advanced Agile Technical Tester', questions: '40', duration: '90', durationNonNative: '113' },
        { module: 'Expert – Improve the Test Process Part 1 – Assessing the Test Process', questions: '40 + Essay', duration: '135', durationNonNative: '169' },
        {
            module: 'Expert – Improve the Test Process Part 2 – Implementing Test Process Improvement',
            questions: '40 + Essay',
            duration: '135',
            durationNonNative: '169',
        },
        { module: 'Expert – Test Management Part 1 – Strategic Test Management', questions: '40 + Essay', duration: '135', durationNonNative: '169' },
        { module: 'Expert – Test Management Part 2 – Operational Test Management', questions: '40 + Essay', duration: '135', durationNonNative: '169' },
        { module: 'Expert – Test Management Part 3 – Managing the Test Team', questions: '40 + Essay', duration: '135', durationNonNative: '169' },
        { module: 'Usability', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Gambling Industry Tester', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Mobile Application Testing', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Performance Testing', questions: '40', duration: '90', durationNonNative: '113' },
        { module: 'Acceptance Testing', questions: '40', duration: '60', durationNonNative: '75' },
        { module: 'Automotive Software Tester', questions: '40', duration: '60', durationNonNative: '75' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge={t('exams.hero.badge')}
                title={t('exams.hero.title')}
                description={t('exams.hero.description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CommonTextBlock
                image={{ src: '/assets/images/pages/certification/exam-success.png', alt: t('exams.understanding.image_alt'), width: 300 }}
                title={t('exams.understanding.title')}
                description={t('exams.understanding.description')}
                backgroundColor="#f8fafc"
                backgroundShapes={[
                    {
                        src: '/assets/images/bg/sharp-1.png',
                        position: 'top-right',
                        opacity: 0.05,
                    },
                    {
                        src: '/assets/images/bg/sharp-2.png',
                        position: 'bottom-left',
                        opacity: 0.03,
                    },
                ]}
            />

            {/* Tableau des examens */}
            <TableSection
                title={t('exams.format.title')}
                columns={examColumns}
                data={examData}
                delay="0.2"
            />

            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title={t('exams.level_format.title')}
                    description={t('exams.level_format.description')}
                    subtitle={t('exams.foundation.subtitle')}
                    subtitleContent={t('exams.foundation.content')}
                    items={[
                        { text: t('exams.foundation.item_1') },
                        { text: t('exams.foundation.item_2') },
                        { text: t('exams.foundation.item_3') },
                        { text: t('exams.foundation.item_4') },
                    ]}
                    imageSrc="/assets/images/pages/certification/certification-wheel.png"
                    imageAlt={t('exams.foundation.image_alt')}
                />
            </div>
        </PublicLayout>
    );
}

export default ExamQuestions;
