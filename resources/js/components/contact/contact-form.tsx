import { FormField } from '@/components/forms/form-field';
import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
    const { t } = useTranslation();
    const form = useForm({
        civility: '',
        name: '',
        email: '',
        subject: '',
        phone: '',
        company: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post('/contact/send', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('contact.success_message'));
                form.reset();
            },
            onError: () => {
                toast.error(t('contact.error_message'));
            },
        });
    };

    return (
        <div className={`grid grid-cols-1 gap-8 lg:grid-cols-3 ${className}`}>
            {/* Contact Information */}
            <div className="space-y-6 lg:col-span-1">
                <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{t('contact.get_in_touch')}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{t('contact.intro_text')}</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.address_label')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.address')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.phone_label')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.phone_number')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.email_label')}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.email_address')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8 dark:bg-gray-800">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">{t('contact.send_message')}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField label={t('contact.civility')} name="civility" required error={form.errors.civility}>
                                <Select
                                    value={form.data.civility}
                                    onValueChange={(value) => form.setData('civility', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('contact.civility_placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mr">{t('contact.mr')}</SelectItem>
                                        <SelectItem value="mrs">{t('contact.mrs')}</SelectItem>
                                        <SelectItem value="miss">{t('contact.miss')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormField>

                            <FormField label={t('contact.name')} name="name" required error={form.errors.name}>
                                <FormInput
                                    type="text"
                                    name="name"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    error={form.errors.name}
                                    required
                                    placeholder={t('contact.name_placeholder')}
                                />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField label={t('contact.company')} name="company" error={form.errors.company}>
                                <FormInput
                                    type="text"
                                    name="company"
                                    value={form.data.company}
                                    onChange={(e) => form.setData('company', e.target.value)}
                                    error={form.errors.company}
                                    placeholder={t('contact.company_placeholder')}
                                />
                            </FormField>

                            <FormField label={t('contact.phone')} name="phone" error={form.errors.phone}>
                                <FormInput
                                    type="tel"
                                    name="phone"
                                    value={form.data.phone}
                                    onChange={(e) => form.setData('phone', e.target.value)}
                                    error={form.errors.phone}
                                    placeholder={t('contact.phone_placeholder')}
                                />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField label={t('contact.email')} name="email" required error={form.errors.email}>
                                <FormInput
                                    type="email"
                                    name="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    error={form.errors.email}
                                    required
                                    placeholder={t('contact.email_placeholder')}
                                />
                            </FormField>

                            <FormField label={t('contact.subject')} name="subject" required error={form.errors.subject}>
                                <FormInput
                                    type="text"
                                    name="subject"
                                    value={form.data.subject}
                                    onChange={(e) => form.setData('subject', e.target.value)}
                                    error={form.errors.subject}
                                    required
                                    placeholder={t('contact.subject_placeholder')}
                                />
                            </FormField>
                        </div>

                        <FormField label={t('contact.message')} name="message" required error={form.errors.message}>
                            <textarea
                                name="message"
                                value={form.data.message}
                                onChange={(e) => form.setData('message', e.target.value)}
                                rows={6}
                                required
                                placeholder={t('contact.message_placeholder')}
                                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </FormField>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="w-full bg-primary px-8 py-3 text-white transition-colors hover:bg-primary/90 disabled:opacity-50 md:w-auto"
                            >
                                {form.processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t('contact.sending')}
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        {t('contact.send_button')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
