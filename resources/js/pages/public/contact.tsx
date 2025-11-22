import HeroCommon from '@/components/common/common-hero';
import { ContactForm } from '@/components/contact/contact-form';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();

    return (
        <PublicLayout>
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
