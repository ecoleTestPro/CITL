import { FormField } from '@/components/forms/form-field';
import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface CertifiedTesterRegistrationFormProps {
    onSuccess?: () => void;
    submitUrl?: string;
    className?: string;
}

export function CertifiedTesterRegistrationForm({
    onSuccess,
    submitUrl = '/registration/certified-testers',
    className = '',
}: CertifiedTesterRegistrationFormProps) {
    const { t } = useTranslation();
    const form = useForm({
        consent: false,
        full_name: '',
        address: '',
        date_of_birth: '',
        email: '',
        phone: '',
        certification_obtained: '',
        certificate_number: '',
        test_center: '',
        exam_date: '',
    });

    const certificationOptions = [
        { value: 'foundation', label: 'ISTQB Certified Tester Foundation Level (CTFL)' },
        { value: 'advanced-test-analyst', label: 'ISTQB Advanced Level Test Analyst (CTAL-TA)' },
        { value: 'advanced-test-manager', label: 'ISTQB Advanced Level Test Manager (CTAL-TM)' },
        { value: 'advanced-technical-test-analyst', label: 'ISTQB Advanced Level Technical Test Analyst (CTAL-TTA)' },
        { value: 'agile-tester', label: 'ISTQB Certified Tester Foundation Level - Agile Tester' },
        { value: 'test-automation-engineer', label: 'ISTQB Advanced Level Test Automation Engineer (CTAL-TAE)' },
        { value: 'security-tester', label: 'ISTQB Advanced Level Security Tester (CTAL-SEC)' },
        { value: 'performance-testing', label: 'ISTQB Certified Tester Performance Testing' },
        { value: 'mobile-application-testing', label: 'ISTQB Certified Tester Mobile Application Testing' },
        { value: 'ai-testing', label: 'ISTQB Certified Tester AI Testing' },
    ];

    const testCenterOptions = [
        { value: 'citl-abidjan', label: 'CITL - Abidjan' },
        { value: 'pearson-vue', label: 'Pearson VUE' },
        { value: 'isqi-remote', label: 'iSQI - Remote Exam' },
        { value: 'other', label: t('certified_tester_registration.other') },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!form.data.consent) {
            toast.error(t('certified_tester_registration.consent_required'));
            return;
        }

        form.post(submitUrl, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('certified_tester_registration.success'));
                form.reset();
                onSuccess?.();
            },
            onError: () => {
                toast.error(t('certified_tester_registration.error'));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className={`flex h-full flex-col ${className}`}>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                {/* Consent Checkbox */}
                <div className="rounded-lg border border-citl-orange/30 bg-citl-orange/5 p-4">
                    <div className="flex items-start space-x-3">
                        <Checkbox
                            id="consent"
                            checked={form.data.consent}
                            onCheckedChange={(checked) => form.setData('consent', checked as boolean)}
                            className="mt-1"
                        />
                        <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {t('certified_tester_registration.consent_label')}
                        </Label>
                    </div>
                    {form.errors.consent && <p className="mt-2 text-sm text-red-500">{form.errors.consent}</p>}
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {t('certified_tester_registration.personal_info')}
                    </h3>

                    <FormField
                        label={t('certified_tester_registration.full_name')}
                        name="full_name"
                        required
                        error={form.errors.full_name}
                    >
                        <FormInput
                            type="text"
                            name="full_name"
                            placeholder={t('certified_tester_registration.full_name_placeholder')}
                            value={form.data.full_name}
                            onChange={(e) => form.setData('full_name', e.target.value)}
                            error={form.errors.full_name}
                            required
                        />
                    </FormField>

                    <FormField
                        label={t('certified_tester_registration.address')}
                        name="address"
                        required
                        error={form.errors.address}
                    >
                        <FormInput
                            type="text"
                            name="address"
                            placeholder={t('certified_tester_registration.address_placeholder')}
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.target.value)}
                            error={form.errors.address}
                            required
                        />
                    </FormField>

                    <FormField
                        label={t('certified_tester_registration.date_of_birth')}
                        name="date_of_birth"
                        required
                        error={form.errors.date_of_birth}
                    >
                        <FormInput
                            type="date"
                            name="date_of_birth"
                            value={form.data.date_of_birth}
                            onChange={(e) => form.setData('date_of_birth', e.target.value)}
                            error={form.errors.date_of_birth}
                            required
                        />
                    </FormField>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {t('certified_tester_registration.contact_info')}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t('certified_tester_registration.email')} name="email" required error={form.errors.email}>
                            <FormInput
                                type="email"
                                name="email"
                                placeholder={t('certified_tester_registration.email_placeholder')}
                                value={form.data.email}
                                onChange={(e) => form.setData('email', e.target.value)}
                                error={form.errors.email}
                                required
                            />
                        </FormField>

                        <FormField label={t('certified_tester_registration.phone')} name="phone" required error={form.errors.phone}>
                            <FormInput
                                type="tel"
                                name="phone"
                                placeholder={t('certified_tester_registration.phone_placeholder')}
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                error={form.errors.phone}
                                required
                            />
                        </FormField>
                    </div>
                </div>

                {/* Certification Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {t('certified_tester_registration.certification_info')}
                    </h3>

                    <FormField
                        label={t('certified_tester_registration.certification_obtained')}
                        name="certification_obtained"
                        required
                        error={form.errors.certification_obtained}
                    >
                        <Select
                            value={form.data.certification_obtained}
                            onValueChange={(value) => form.setData('certification_obtained', value)}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('certified_tester_registration.select_certification')} />
                            </SelectTrigger>
                            <SelectContent>
                                {certificationOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    <FormField
                        label={t('certified_tester_registration.certificate_number')}
                        name="certificate_number"
                        required
                        error={form.errors.certificate_number}
                    >
                        <FormInput
                            type="text"
                            name="certificate_number"
                            placeholder={t('certified_tester_registration.certificate_number_placeholder')}
                            value={form.data.certificate_number}
                            onChange={(e) => form.setData('certificate_number', e.target.value)}
                            error={form.errors.certificate_number}
                            required
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            label={t('certified_tester_registration.test_center')}
                            name="test_center"
                            required
                            error={form.errors.test_center}
                        >
                            <Select
                                value={form.data.test_center}
                                onValueChange={(value) => form.setData('test_center', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('certified_tester_registration.select_test_center')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {testCenterOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>

                        <FormField
                            label={t('certified_tester_registration.exam_date')}
                            name="exam_date"
                            required
                            error={form.errors.exam_date}
                        >
                            <FormInput
                                type="date"
                                name="exam_date"
                                value={form.data.exam_date}
                                onChange={(e) => form.setData('exam_date', e.target.value)}
                                error={form.errors.exam_date}
                                required
                            />
                        </FormField>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end border-t border-border pt-4">
                <Button
                    type="submit"
                    disabled={form.processing || !form.data.consent}
                    className="w-full bg-secondary px-8 py-3 text-white transition-colors hover:bg-secondary/90 disabled:opacity-50 md:w-auto"
                >
                    {form.processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('certified_tester_registration.submitting')}
                        </>
                    ) : (
                        t('certified_tester_registration.submit')
                    )}
                </Button>
            </div>
        </form>
    );
}
