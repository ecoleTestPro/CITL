import { Certification } from '@/types';
import { ArrowRight, BookOpen, CheckCircle, Clock, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CertificationCardProps {
    certification: Certification;
}

function CertificationCard({ certification }: CertificationCardProps) {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    // Helper to get localized field
    const getLocalizedField = (fieldBase: string): string => {
        const fieldKey = `${fieldBase}_${isEnglish ? 'en' : 'fr'}` as keyof Certification;
        const fallbackKey = `${fieldBase}_fr` as keyof Certification;
        return (certification[fieldKey] as string) || (certification[fallbackKey] as string) || '';
    };

    const title = getLocalizedField('title');
    const subtitle = getLocalizedField('subtitle');
    const description = getLocalizedField('description');

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
            {/* Icon Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-800">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-primary/20 dark:to-primary/10">
                    <span className={`${certification.icon} text-4xl text-secondary dark:text-primary`}></span>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg leading-tight font-semibold text-gray-900 dark:text-white">{title}</h3>
                    {subtitle && <p className="mt-1 text-sm leading-snug text-secondary dark:text-primary">{subtitle}</p>}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                {description && <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>}

                {/* Exam Details Grid */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <ExamDetailItem icon={BookOpen} label={t('certifications.exam_questions')} value={certification.exam_questions} />
                    <ExamDetailItem icon={Target} label={t('certifications.exam_passing_score')} value={`${certification.exam_passing_score}%`} />
                    <ExamDetailItem icon={Clock} label={t('certifications.exam_duration')} value={certification.exam_duration} />
                    <ExamDetailItem icon={CheckCircle} label={t('certifications.exam_total_points')} value={certification.exam_total_points} />
                </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-gray-100 p-4 dark:border-gray-800">
                <a
                    href={`/certifications/${certification.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary/90"
                >
                    {t('certifications.view_details')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
            </div>
        </article>
    );
}

interface ExamDetailItemProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
}

function ExamDetailItem({ icon: Icon, label, value }: ExamDetailItemProps) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
            <Icon className="h-4 w-4 text-gray-400" />
            <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-500">{label}</p>
                <p className="truncate font-medium text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}

export default CertificationCard;
