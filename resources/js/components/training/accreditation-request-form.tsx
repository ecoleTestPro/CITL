import { FormField } from '@/components/forms/form-field';
import { FormInput } from '@/components/forms/form-input';
import { FormTextarea } from '@/components/forms/form-textarea';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface AccreditationRequestFormProps {
    onSuccess?: () => void;
    submitUrl?: string;
    className?: string;
}

export function AccreditationRequestForm({ onSuccess, submitUrl = '/training/accreditation-request', className = '' }: AccreditationRequestFormProps) {
    const { t } = useTranslation();
    const form = useForm({
        company_name: '',
        email: '',
        phone: '',
        city: '',
        company_address: '',
        contact_person: '',
        website: '',
        years_in_business: '',
        number_of_trainers: '',
        training_facilities: '',
        additional_info: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(submitUrl, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('training.accreditation_success'));
                form.reset();
                onSuccess?.();
            },
            onError: () => {
                toast.error(t('training.accreditation_error'));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={`flex h-full flex-col ${className}`}>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                {/* Company Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('training.company_information')}</h3>

                    <FormField label={t('training.company_name')} name="company_name" required error={form.errors.company_name}>
                        <FormInput
                            type="text"
                            name="company_name"
                            placeholder={t('training.company_name_placeholder')}
                            value={form.data.company_name}
                            onChange={(e) => form.setData('company_name', e.target.value)}
                            error={form.errors.company_name}
                            required
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t('training.email')} name="email" required error={form.errors.email}>
                            <FormInput
                                type="email"
                                name="email"
                                placeholder={t('training.email_placeholder')}
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                error={form.errors.email}
                                required
                            />
                        </FormField>

                        <FormField label={t('training.phone')} name="phone" required error={form.errors.phone}>
                            <FormInput
                                type="tel"
                                name="phone"
                                placeholder={t('training.phone_placeholder')}
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                error={form.errors.phone}
                                required
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t('training.city')} name="city" required error={form.errors.city}>
                            <FormInput
                                type="text"
                                name="city"
                                placeholder={t('training.city_placeholder')}
                                value={form.data.city}
                                onChange={(e) => form.setData('city', e.target.value)}
                                error={form.errors.city}
                                required
                            />
                        </FormField>

                        <FormField label={t('training.website')} name="website" error={form.errors.website}>
                            <FormInput
                                type="url"
                                name="website"
                                placeholder={t('training.website_placeholder')}
                                value={form.data.website}
                                onChange={(e) => form.setData('website', e.target.value)}
                                error={form.errors.website}
                            />
                        </FormField>
                    </div>

                    <FormField label={t('training.company_address')} name="company_address" required error={form.errors.company_address}>
                        <FormTextarea
                            name="company_address"
                            placeholder={t('training.company_address_placeholder')}
                            value={form.data.company_address}
                            onChange={(e) => form.setData('company_address', e.target.value)}
                            error={form.errors.company_address}
                            required
                            rows={3}
                        />
                    </FormField>
                </div>

                {/* Contact Person */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('training.contact_person_section')}</h3>

                    <FormField label={t('training.contact_person')} name="contact_person" required error={form.errors.contact_person}>
                        <FormInput
                            type="text"
                            name="contact_person"
                            placeholder={t('training.contact_person_placeholder')}
                            value={form.data.contact_person}
                            onChange={(e) => form.setData('contact_person', e.target.value)}
                            error={form.errors.contact_person}
                            required
                        />
                    </FormField>
                </div>

                {/* Organization Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('training.organization_details')}</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t('training.years_in_business')} name="years_in_business" required error={form.errors.years_in_business}>
                            <FormInput
                                type="number"
                                name="years_in_business"
                                placeholder={t('training.years_in_business_placeholder')}
                                value={form.data.years_in_business}
                                onChange={(e) => form.setData('years_in_business', e.target.value)}
                                error={form.errors.years_in_business}
                                required
                                min="0"
                            />
                        </FormField>

                        <FormField label={t('training.number_of_trainers')} name="number_of_trainers" required error={form.errors.number_of_trainers}>
                            <FormInput
                                type="number"
                                name="number_of_trainers"
                                placeholder={t('training.number_of_trainers_placeholder')}
                                value={form.data.number_of_trainers}
                                onChange={(e) => form.setData('number_of_trainers', e.target.value)}
                                error={form.errors.number_of_trainers}
                                required
                                min="1"
                            />
                        </FormField>
                    </div>

                    <FormField label={t('training.training_facilities')} name="training_facilities" required error={form.errors.training_facilities}>
                        <FormTextarea
                            name="training_facilities"
                            placeholder={t('training.training_facilities_placeholder')}
                            value={form.data.training_facilities}
                            onChange={(e) => form.setData('training_facilities', e.target.value)}
                            error={form.errors.training_facilities}
                            required
                            rows={4}
                        />
                    </FormField>

                    <FormField label={t('training.additional_info')} name="additional_info" error={form.errors.additional_info}>
                        <FormTextarea
                            name="additional_info"
                            placeholder={t('training.additional_info_placeholder')}
                            value={form.data.additional_info}
                            onChange={(e) => form.setData('additional_info', e.target.value)}
                            error={form.errors.additional_info}
                            rows={5}
                        />
                    </FormField>
                </div>
            </div>

            {/* Submit Button - Always Visible */}
            <div className="mt-4 flex justify-end border-t border-border pt-4">
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="w-full bg-secondary px-8 py-3 text-white transition-colors hover:bg-secondary/90 disabled:opacity-50 md:w-auto"
                >
                    {form.processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('training.submitting')}
                        </>
                    ) : (
                        t('training.submit')
                    )}
                </Button>
            </div>
        </form>
    );
}
