import HeroCommon from '@/components/common/common-hero';
import { TableSection } from '@/components/common/table-section';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function ExamFees() {
    const { t } = useTranslation();

    const feeColumns = [
        { key: 'level', header: t('exams.fees.column_level'), align: 'left' as const },
        { key: 'flex', header: t('exams.fees.column_flex'), align: 'center' as const },
        { key: 'pearson', header: t('exams.fees.column_pearson'), align: 'center' as const },
    ];

    const feeData = [
        { level: t('exams.fees.level_foundation'), flex: '€100', pearson: '€100' },
        { level: t('exams.fees.level_advanced'), flex: '€120', pearson: '€120' },
        { level: t('exams.fees.level_specialist'), flex: '€120', pearson: '€120' },
        { level: t('exams.fees.level_expert'), flex: '€155', pearson: '€155' },
    ];

    return (
        <PublicLayout>
            <HeroCommon
                badge={t('nav.exam_fees')}
                title={t('exams.fees.title')}
                description={t('exams.fees.description')}
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <TableSection
                title={t('exams.fees.pricing_table_title')}
                description={t('exams.fees.pricing_table_description')}
                columns={feeColumns}
                data={feeData}
                delay="0.2"
            />
        </PublicLayout>
    );
}

export default ExamFees;
