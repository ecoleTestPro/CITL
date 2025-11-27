import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface MembershipFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function MembershipFormModal({ open, onOpenChange }: MembershipFormModalProps) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        membership_type: '',
        first_name: '',
        surname: '',
        phone: '',
        email: '',
        address: '',
        company: '',
        job_title: '',
        years_of_experience: '',
        membership_level: '',
        qualification: '',
        agreeToTerms: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.agreeToTerms) {
            toast.error(t('membership_form.accept_terms_error'));
            return;
        }

        post('/membership/apply', {
            onSuccess: () => {
                toast.success(t('membership_form.success_message'));
                reset();
                onOpenChange(false);
            },
            onError: () => {
                toast.error(t('membership_form.error_message'));
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                onOpenChange(isOpen);
                if (!isOpen) reset();
            }}
        >
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{t('membership_form.title')}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Membership Type */}
                    <div className="space-y-2">
                        <Label htmlFor="membershipType" className="text-base font-semibold">
                            {t('membership_form.select_type')} <span className="text-red-500">*</span>
                        </Label>
                        <Select value={data.membership_type} onValueChange={(value) => setData('membership_type', value)} required>
                            <SelectTrigger id="membershipType">
                                <SelectValue placeholder={t('membership_form.select_membership_type')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">{t('membership_form.new_membership')}</SelectItem>
                                <SelectItem value="renewal">{t('membership_form.membership_renewal')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Step 2: Show form fields if membership type is selected */}
                    {data.membership_type && (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        {t('membership_form.first_name')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                        placeholder={t('membership_form.first_name_placeholder')}
                                    />
                                </div>

                                {/* Surname */}
                                <div className="space-y-2">
                                    <Label htmlFor="surname">
                                        {t('membership_form.surname')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="surname"
                                        value={data.surname}
                                        onChange={(e) => setData('surname', e.target.value)}
                                        required
                                        placeholder={t('membership_form.surname_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        {t('membership_form.phone')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        placeholder={t('membership_form.phone_placeholder')}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        {t('membership_form.email')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder={t('membership_form.email_placeholder')}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <Label htmlFor="address">
                                    {t('membership_form.address')} <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    required
                                    placeholder={t('membership_form.address_placeholder')}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Company */}
                                <div className="space-y-2">
                                    <Label htmlFor="company">
                                        {t('membership_form.company')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        required
                                        placeholder={t('membership_form.company_placeholder')}
                                    />
                                </div>

                                {/* Job Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">
                                        {t('membership_form.job_title')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jobTitle"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        required
                                        placeholder={t('membership_form.job_title_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Years of Experience */}
                                <div className="space-y-2">
                                    <Label htmlFor="yearsOfExperience">
                                        {t('membership_form.years_of_experience')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={data.years_of_experience} onValueChange={(value) => setData('years_of_experience', value)} required>
                                        <SelectTrigger id="yearsOfExperience">
                                            <SelectValue placeholder={t('membership_form.select_years')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-1">{t('membership_form.experience_0_1')}</SelectItem>
                                            <SelectItem value="1-3">{t('membership_form.experience_1_3')}</SelectItem>
                                            <SelectItem value="3-5">{t('membership_form.experience_3_5')}</SelectItem>
                                            <SelectItem value="5-10">{t('membership_form.experience_5_10')}</SelectItem>
                                            <SelectItem value="10+">{t('membership_form.experience_10_plus')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Membership Level */}
                                <div className="space-y-2">
                                    <Label htmlFor="membershipLevel">
                                        {t('membership_form.membership_level')} <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={data.membership_level} onValueChange={(value) => setData('membership_level', value)} required>
                                        <SelectTrigger id="membershipLevel">
                                            <SelectValue placeholder={t('membership_form.select_level')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">{t('membership_form.level_student')}</SelectItem>
                                            <SelectItem value="professional">{t('membership_form.level_professional')}</SelectItem>
                                            <SelectItem value="expert">{t('membership_form.level_expert')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Qualification - Only for Professional level */}
                            {data.membership_level === 'professional' && (
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">{t('membership_form.qualification')}</Label>
                                    <Input
                                        id="qualification"
                                        value={data.qualification}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        placeholder={t('membership_form.qualification_placeholder')}
                                    />
                                </div>
                            )}

                            {/* Agreement Checkbox */}
                            <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="agreeToTerms"
                                        checked={data.agreeToTerms}
                                        onCheckedChange={(checked) => setData('agreeToTerms', checked as boolean)}
                                        required
                                    />
                                    <Label htmlFor="agreeToTerms" className="cursor-pointer text-sm leading-relaxed">
                                        {t('membership_form.agreement_text')}
                                    </Label>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <a href="/privacy-policy" target="_blank" className="block text-primary hover:underline">
                                        {t('membership_form.view_privacy_policy')}
                                    </a>
                                    <a href="/terms-of-use" target="_blank" className="block text-primary hover:underline">
                                        {t('membership_form.view_terms_of_use')}
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        onOpenChange(false);
                                        reset();
                                    }}
                                    disabled={processing}
                                >
                                    {t('membership_form.cancel')}
                                </Button>
                                <Button type="submit" className="bg-citl-orange hover:bg-citl-orange/90" disabled={processing}>
                                    {processing ? t('membership_form.submitting') : t('membership_form.submit')}
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
