import FaqBlockOne from '@/components/blocks/faq/faq-block-one';
import HeroCommon from '@/components/common/common-hero';
import { useImage } from '@/hooks/use-image';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    id: string;
    name: string;
    items: FaqItem[];
}

function ExamFaq() {
    const { t, i18n } = useTranslation();
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');
    const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/faqs', {
                    params: { locale: i18n.language },
                });

                if (response.data.success) {
                    setFaqCategories(response.data.data.faqs);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [i18n.language]);

    return (
        <PublicLayout>
            <Head>
                <title>{t('seo.exam_faq.title')}</title>
                <meta name="description" content={t('seo.exam_faq.description')} />
                <meta name="keywords" content={t('seo.exam_faq.keywords')} />
                <meta property="og:title" content={t('seo.exam_faq.title')} />
                <meta property="og:description" content={t('seo.exam_faq.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('exams.faq.hero_badge')}
                title={t('exams.faq.hero_title')}
                description={t('exams.faq.hero_description')}
                backgroundImage={bgSharp2}
            />

            {loading ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-citl-orange border-t-transparent"></div>
                </div>
            ) : faqCategories.length > 0 ? (
                <FaqBlockOne badge="" title="" description="" categories={faqCategories} className="bg-white dark:bg-gray-900" />
            ) : (
                <div className="flex min-h-[400px] items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">{t('common.no_data')}</p>
                </div>
            )}
        </PublicLayout>
    );
}

export default ExamFaq;
