import HeroCommon from '@/components/common/common-hero';
import { TableSection } from '@/components/common/table-section';
import { useImage } from '@/hooks/use-image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

// Taux de conversion (1 EUR = 655.957 XOF, approximation courante)
const EUR_TO_XOF = 656;
// Taux EUR/USD approximatif
const EUR_TO_USD = 1.08;

// Formatage des montants avec espace comme séparateur de milliers
function formatCurrency(amount: number, decimals: number = 0): string {
    return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

interface PriceWithTooltipProps {
    euroAmount: number;
}

function PriceWithTooltip({ euroAmount }: PriceWithTooltipProps) {
    const xofAmount = euroAmount * EUR_TO_XOF;
    const usdAmount = euroAmount * EUR_TO_USD;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help border-b border-dashed border-gray-400 font-semibold text-citl-orange dark:border-gray-500">
                        {formatCurrency(xofAmount)} FCFA
                    </span>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
                    <div className="space-y-1 text-sm">
                        <p>{formatCurrency(euroAmount)} € EUR</p>
                        <p>{formatCurrency(usdAmount, 2)} $ USD</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function ExamFees() {
    const { t } = useTranslation();
    const bgSharp2 = useImage('global', 'bg_sharp_2', '/assets/images/bg/sharp-2.png');

    const feeColumns = [
        { key: 'level', header: t('exams.fees.column_level'), align: 'left' as const },
        { key: 'flex', header: t('exams.fees.column_flex'), align: 'center' as const },
        { key: 'pearson', header: t('exams.fees.column_pearson'), align: 'center' as const },
    ];

    const feeData = [
        { level: t('exams.fees.level_foundation'), flex: <PriceWithTooltip euroAmount={100} />, pearson: <PriceWithTooltip euroAmount={100} /> },
        { level: t('exams.fees.level_advanced'), flex: <PriceWithTooltip euroAmount={120} />, pearson: <PriceWithTooltip euroAmount={120} /> },
        { level: t('exams.fees.level_specialist'), flex: <PriceWithTooltip euroAmount={120} />, pearson: <PriceWithTooltip euroAmount={120} /> },
        { level: t('exams.fees.level_expert'), flex: <PriceWithTooltip euroAmount={155} />, pearson: <PriceWithTooltip euroAmount={155} /> },
    ];

    return (
        <PublicLayout>
            <Head>
                <title>{t('seo.exam_fees.title')}</title>
                <meta name="description" content={t('seo.exam_fees.description')} />
                <meta name="keywords" content={t('seo.exam_fees.keywords')} />
                <meta property="og:title" content={t('seo.exam_fees.title')} />
                <meta property="og:description" content={t('seo.exam_fees.description')} />
                <meta property="og:type" content="website" />
            </Head>
            <HeroCommon
                badge={t('nav.exam_fees')}
                title={t('exams.fees.title')}
                description={t('exams.fees.description')}
                backgroundImage={bgSharp2}
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
