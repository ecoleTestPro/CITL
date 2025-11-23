import HeroCommon from '@/components/common/common-hero';
import Timeline from '@/components/events/timeline';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

interface Event {
    id: number;
    title: string;
    organization: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string | null;
    tags: string[] | null;
    is_active: boolean;
    order: number;
}

interface Props {
    events: Event[];
}

function Events({ events }: Props) {
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

            {/* Timeline Section */}
            <section>
                <Timeline events={events} />
            </section>
        </PublicLayout>
    );
}

export default Events;
