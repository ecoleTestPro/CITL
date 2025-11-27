import { LegalPageLayout, type LegalSection } from '@/components/legal/legal-page-layout';
import { AlertTriangle, BookOpen, Copyright, FileCheck, Gavel, Scale, ScrollText, ShieldCheck, UserX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Terms() {
    const { t } = useTranslation();

    const sections: LegalSection[] = [
        {
            id: 'acceptance',
            icon: <FileCheck className="h-5 w-5" />,
            title: t('terms.sections.acceptance.title'),
            content: [
                t('terms.sections.acceptance.content_1'),
                t('terms.sections.acceptance.content_2'),
            ],
        },
        {
            id: 'services',
            icon: <BookOpen className="h-5 w-5" />,
            title: t('terms.sections.services.title'),
            content: [
                t('terms.sections.services.content_1'),
                t('terms.sections.services.content_2'),
                t('terms.sections.services.content_3'),
            ],
        },
        {
            id: 'user-obligations',
            icon: <ScrollText className="h-5 w-5" />,
            title: t('terms.sections.user_obligations.title'),
            content: [
                t('terms.sections.user_obligations.content_1'),
                t('terms.sections.user_obligations.content_2'),
                t('terms.sections.user_obligations.content_3'),
            ],
        },
        {
            id: 'intellectual-property',
            icon: <Copyright className="h-5 w-5" />,
            title: t('terms.sections.intellectual_property.title'),
            content: [
                t('terms.sections.intellectual_property.content_1'),
                t('terms.sections.intellectual_property.content_2'),
            ],
        },
        {
            id: 'certifications',
            icon: <ShieldCheck className="h-5 w-5" />,
            title: t('terms.sections.certifications.title'),
            content: [
                t('terms.sections.certifications.content_1'),
                t('terms.sections.certifications.content_2'),
                t('terms.sections.certifications.content_3'),
            ],
        },
        {
            id: 'liability',
            icon: <AlertTriangle className="h-5 w-5" />,
            title: t('terms.sections.liability.title'),
            content: [
                t('terms.sections.liability.content_1'),
                t('terms.sections.liability.content_2'),
            ],
        },
        {
            id: 'termination',
            icon: <UserX className="h-5 w-5" />,
            title: t('terms.sections.termination.title'),
            content: [
                t('terms.sections.termination.content_1'),
                t('terms.sections.termination.content_2'),
            ],
        },
        {
            id: 'modifications',
            icon: <Scale className="h-5 w-5" />,
            title: t('terms.sections.modifications.title'),
            content: [
                t('terms.sections.modifications.content_1'),
                t('terms.sections.modifications.content_2'),
            ],
        },
        {
            id: 'governing-law',
            icon: <Gavel className="h-5 w-5" />,
            title: t('terms.sections.governing_law.title'),
            content: [
                t('terms.sections.governing_law.content_1'),
                t('terms.sections.governing_law.content_2'),
            ],
        },
    ];

    return (
        <LegalPageLayout
            seo={{
                title: t('terms.seo.title'),
                description: t('terms.seo.description'),
            }}
            title={t('terms.hero_title').replace(/\*\*/g, '')}
            lastUpdated={t('terms.last_updated')}
            tableOfContentsLabel={t('terms.table_of_contents')}
            sectionLabel={t('terms.article')}
            sections={sections}
            footerNote={t('terms.footer_note')}
        />
    );
}

export default Terms;
