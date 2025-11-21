import AboutBlockOne from '@/components/blocks/about-us/about-block-one';
import HeroCommon from '@/components/common/common-hero';
import CommonTextBlock from '@/components/common/common-text-block';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function ExamQuestions() {
    const { t } = useTranslation();

    const breadcrumbs = [
        { title: t('nav.home'), href: '/' },
        { title: t('nav.certifications'), href: '#' },
        { title: t('nav.exam_questions'), href: '/exam-questions' },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <HeroCommon
                badge="Examens ISTQB®"
                title="Questions sur les examens et taux de réussite"
                description="Découvrez tout ce que vous devez savoir sur le déroulement des examens ISTQB®, les taux de réussite et les stratégies pour réussir votre certification"
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <CommonTextBlock
                image={{ src: '/assets/images/pages/certification/exam-success.png', alt: 'Exam Success', width: 300 }}
                title="Comprendre les examens ISTQB®"
                description="Les examens ISTQB® sont conçus pour évaluer vos compétences réelles en testing logiciel. Ils combinent des questions théoriques et pratiques pour garantir que les candidats maîtrisent les concepts essentiels du testing professionnel."
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

            <div className="bg-white dark:bg-gray-500/20">
                <AboutBlockOne
                    title="Format des examens par niveau"
                    description="Chaque niveau de certification ISTQB® a ses propres caractéristiques d'examen, adaptées à la complexité des compétences évaluées."
                    subtitle="Foundation Level"
                    subtitleContent="40 questions en 60 minutes, score requis : 26/40 (65%). Questions à choix multiples et réponses multiples."
                    items={[
                        { text: 'Format : QCM (Questions à Choix Multiple)' },
                        { text: 'Durée : 60 minutes (+25% pour non-natifs)' },
                        { text: 'Score requis : 65% (26/40 points)' },
                        { text: 'Taux de réussite moyen : 75-80%' },
                    ]}
                    imageSrc="/assets/images/pages/certification/exam-format.png"
                    imageAlt="Exam Format"
                />
            </div>
        </PublicLayout>
    );
}

export default ExamQuestions;
