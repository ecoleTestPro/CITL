import HeroCommon from '@/components/common/common-hero';
import { ContactForm } from '@/components/contact/contact-form';
import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
            <Head>
                <title>{t('seo.contact.title')}</title>
                <meta name="description" content={t('seo.contact.description')} />
                <meta name="keywords" content={t('seo.contact.keywords')} />
                <meta property="og:title" content={t('seo.contact.title')} />
                <meta property="og:description" content={t('seo.contact.description')} />
                <meta property="og:type" content="website" />
            </Head>
            {/* Hero Section */}
            <HeroCommon
                badge={t('contact.page_title')}
                title={t('contact.page_title')}
                description={t('contact.page_description')}
            />

            {/* Contact Form Section */}
            <section className="bg-white py-16 md:py-24 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <ContactForm />
                </div>
            </section>
        </PublicLayout>
    );
}

export default Contact;
