import { FormField } from '@/components/forms/form-field';
import { FormInput } from '@/components/forms/form-input';
import { FormRadio } from '@/components/forms/form-radio';
import { FormSelect } from '@/components/forms/form-select';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ExamRegistrationFormProps {
    onSuccess?: () => void;
    submitUrl?: string;
    className?: string;
}

export function ExamRegistrationForm({
    onSuccess,
    submitUrl = '/exams/register',
    className = '',
}: ExamRegistrationFormProps) {
    const { t } = useTranslation();
    const form = useForm({
        purchase_type: 'individual',
        exam_name: '',
        first_name: '',
        last_name: '',
        job_title: '',
        company: '',
        phone: '',
        email: '',
        address_line1: '',
        address_line2: '',
        city: '',
        postal_code: '',
        exam_format: 'online',
        register_in_registry: 'yes',
    });

    const examOptions = [
        { value: '', label: t('exam.select_exam') },
        { value: 'foundation', label: t('exam.foundation_level') },
        { value: 'advanced-test-analyst', label: t('exam.advanced_test_analyst') },
        { value: 'advanced-test-manager', label: t('exam.advanced_test_manager') },
        { value: 'advanced-technical-test-analyst', label: t('exam.advanced_technical_test_analyst') },
        { value: 'agile-tester', label: t('exam.agile_tester') },
        { value: 'test-automation-engineer', label: t('exam.test_automation_engineer') },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(submitUrl, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('exam.registration_success'));
                form.reset();
                onSuccess?.();
            },
            onError: () => {
                toast.error(t('exam.registration_error'));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
            {/* Type d'Achat */}
            <FormField label={t('exam.purchase_type')} name="purchase_type" required error={form.errors.purchase_type}>
                <div className="mt-2 space-y-2">
                    <FormRadio
                        label={t('exam.purchase_individual')}
                        name="purchase_type"
                        value="individual"
                        checked={form.data.purchase_type === 'individual'}
                        onChange={(e) => form.setData('purchase_type', e.target.value)}
                    />
                    <FormRadio
                        label={t('exam.purchase_group')}
                        name="purchase_type"
                        value="group"
                        checked={form.data.purchase_type === 'group'}
                        onChange={(e) => form.setData('purchase_type', e.target.value)}
                    />
                </div>
            </FormField>

            {/* Nom de l'Examen */}
            <FormField label={t('exam.exam_name')} name="exam_name" required error={form.errors.exam_name}>
                <FormSelect
                    name="exam_name"
                    value={form.data.exam_name}
                    onChange={(e) => form.setData('exam_name', e.target.value)}
                    options={examOptions}
                    error={form.errors.exam_name}
                    required
                />
            </FormField>

            {/* Coordonnées */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('exam.contact_info')}</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        label={t('exam.first_name')}
                        name="first_name"
                        required
                        error={form.errors.first_name}
                    >
                        <FormInput
                            type="text"
                            name="first_name"
                            value={form.data.first_name}
                            onChange={(e) => form.setData('first_name', e.target.value)}
                            error={form.errors.first_name}
                            required
                        />
                    </FormField>

                    <FormField
                        label={t('exam.last_name')}
                        name="last_name"
                        required
                        error={form.errors.last_name}
                    >
                        <FormInput
                            type="text"
                            name="last_name"
                            value={form.data.last_name}
                            onChange={(e) => form.setData('last_name', e.target.value)}
                            error={form.errors.last_name}
                            required
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label={t('exam.job_title')} name="job_title" required error={form.errors.job_title}>
                        <FormInput
                            type="text"
                            name="job_title"
                            value={form.data.job_title}
                            onChange={(e) => form.setData('job_title', e.target.value)}
                            error={form.errors.job_title}
                            required
                        />
                    </FormField>

                    <FormField label={t('exam.company')} name="company" required error={form.errors.company}>
                        <FormInput
                            type="text"
                            name="company"
                            value={form.data.company}
                            onChange={(e) => form.setData('company', e.target.value)}
                            error={form.errors.company}
                            required
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label={t('exam.phone')} name="phone" required error={form.errors.phone}>
                        <FormInput
                            type="tel"
                            name="phone"
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            error={form.errors.phone}
                            required
                        />
                    </FormField>

                    <FormField label={t('exam.email')} name="email" required error={form.errors.email}>
                        <FormInput
                            type="email"
                            name="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            error={form.errors.email}
                            required
                        />
                    </FormField>
                </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('exam.address')}</h3>

                <FormField label={t('exam.address_line1')} name="address_line1" required error={form.errors.address_line1}>
                    <FormInput
                        type="text"
                        name="address_line1"
                        value={form.data.address_line1}
                        onChange={(e) => form.setData('address_line1', e.target.value)}
                        error={form.errors.address_line1}
                        required
                    />
                </FormField>

                <FormField label={t('exam.address_line2')} name="address_line2" error={form.errors.address_line2}>
                    <FormInput
                        type="text"
                        name="address_line2"
                        value={form.data.address_line2}
                        onChange={(e) => form.setData('address_line2', e.target.value)}
                        error={form.errors.address_line2}
                    />
                </FormField>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label={t('exam.city')} name="city" required error={form.errors.city}>
                        <FormInput
                            type="text"
                            name="city"
                            value={form.data.city}
                            onChange={(e) => form.setData('city', e.target.value)}
                            error={form.errors.city}
                            required
                        />
                    </FormField>

                    <FormField label={t('exam.postal_code')} name="postal_code" required error={form.errors.postal_code}>
                        <FormInput
                            type="text"
                            name="postal_code"
                            value={form.data.postal_code}
                            onChange={(e) => form.setData('postal_code', e.target.value)}
                            error={form.errors.postal_code}
                            required
                        />
                    </FormField>
                </div>
            </div>

            {/* Format de l'Examen */}
            <FormField label={t('exam.exam_format')} name="exam_format" required error={form.errors.exam_format}>
                <div className="mt-2">
                    <FormRadio
                        label={t('exam.online_exam')}
                        name="exam_format"
                        value="online"
                        checked={form.data.exam_format === 'online'}
                        onChange={(e) => form.setData('exam_format', e.target.value)}
                    />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {t('exam.exam_format_note')}
                    </p>
                </div>
            </FormField>

            {/* Inscription au Registre */}
            <FormField
                label={t('exam.registry_question')}
                name="register_in_registry"
                required
                error={form.errors.register_in_registry}
            >
                <div className="mt-2 space-y-2">
                    <FormRadio
                        label={t('exam.yes')}
                        name="register_in_registry"
                        value="yes"
                        checked={form.data.register_in_registry === 'yes'}
                        onChange={(e) => form.setData('register_in_registry', e.target.value)}
                    />
                    <FormRadio
                        label={t('exam.no')}
                        name="register_in_registry"
                        value="no"
                        checked={form.data.register_in_registry === 'no'}
                        onChange={(e) => form.setData('register_in_registry', e.target.value)}
                    />
                </div>
            </FormField>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="w-full bg-secondary px-8 py-3 text-white transition-colors hover:bg-secondary/90 disabled:opacity-50 md:w-auto"
                >
                    {form.processing ? t('exam.submitting') : t('exam.submit')}
                </Button>
            </div>
        </form>
    );
}
