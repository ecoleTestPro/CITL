import { LegalPageLayout, type LegalSection } from '@/components/legal/legal-page-layout';
import { Cookie, Database, Eye, FileText, Lock, Mail, Shield, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
    const { t } = useTranslation();

    const sections: LegalSection[] = [
        {
            id: 'introduction',
            icon: <FileText className="h-5 w-5" />,
            title: t('privacy_policy.sections.introduction.title'),
            content: [
                t('privacy_policy.sections.introduction.content_1'),
                t('privacy_policy.sections.introduction.content_2'),
            ],
        },
        {
            id: 'data-collected',
            icon: <Database className="h-5 w-5" />,
            title: t('privacy_policy.sections.data_collected.title'),
            content: [
                t('privacy_policy.sections.data_collected.content_1'),
                t('privacy_policy.sections.data_collected.content_2'),
                t('privacy_policy.sections.data_collected.content_3'),
            ],
        },
        {
            id: 'data-usage',
            icon: <Eye className="h-5 w-5" />,
            title: t('privacy_policy.sections.data_usage.title'),
            content: [
                t('privacy_policy.sections.data_usage.content_1'),
                t('privacy_policy.sections.data_usage.content_2'),
                t('privacy_policy.sections.data_usage.content_3'),
            ],
        },
        {
            id: 'data-protection',
            icon: <Shield className="h-5 w-5" />,
            title: t('privacy_policy.sections.data_protection.title'),
            content: [
                t('privacy_policy.sections.data_protection.content_1'),
                t('privacy_policy.sections.data_protection.content_2'),
            ],
        },
        {
            id: 'cookies',
            icon: <Cookie className="h-5 w-5" />,
            title: t('privacy_policy.sections.cookies.title'),
            content: [
                t('privacy_policy.sections.cookies.content_1'),
                t('privacy_policy.sections.cookies.content_2'),
                t('privacy_policy.sections.cookies.content_3'),
            ],
        },
        {
            id: 'user-rights',
            icon: <UserCheck className="h-5 w-5" />,
            title: t('privacy_policy.sections.user_rights.title'),
            content: [
                t('privacy_policy.sections.user_rights.content_1'),
                t('privacy_policy.sections.user_rights.content_2'),
                t('privacy_policy.sections.user_rights.content_3'),
            ],
        },
        {
            id: 'data-retention',
            icon: <Lock className="h-5 w-5" />,
            title: t('privacy_policy.sections.data_retention.title'),
            content: [
                t('privacy_policy.sections.data_retention.content_1'),
                t('privacy_policy.sections.data_retention.content_2'),
            ],
        },
        {
            id: 'contact',
            icon: <Mail className="h-5 w-5" />,
            title: t('privacy_policy.sections.contact.title'),
            content: [
                t('privacy_policy.sections.contact.content_1'),
                t('privacy_policy.sections.contact.content_2'),
            ],
        },
    ];

    return (
        <LegalPageLayout
            seo={{
                title: t('privacy_policy.seo.title'),
                description: t('privacy_policy.seo.description'),
            }}
            title={t('privacy_policy.hero_title').replace(/\*\*/g, '')}
            lastUpdated={t('privacy_policy.last_updated')}
            tableOfContentsLabel={t('privacy_policy.table_of_contents')}
            sectionLabel={t('privacy_policy.section')}
            sections={sections}
            footerNote={t('privacy_policy.footer_note')}
        />
    );
}

export default PrivacyPolicy;
