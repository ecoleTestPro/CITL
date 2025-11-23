import HeroCommon from '@/components/common/common-hero';
import Timeline from '@/components/events/timeline';
import PublicLayout from '@/layouts/public/public-layout';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Events() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            {/* Hero Section */}
            <HeroCommon
                badge={t('events.page_title')}
                title={t('events.page_title')}
                description={t('events.page_description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <section>
                <Timeline />
            </section>

            {/* Events Section */}
            <section className="bg-white py-16 md:py-24 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{t('events.no_events_title')}</h2>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default Events;
