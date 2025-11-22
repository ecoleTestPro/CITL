import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

interface MembershipFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function MembershipFormModal({ open, onOpenChange }: MembershipFormModalProps) {
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
            toast.error('Veuillez accepter les termes et conditions');
            return;
        }

        post(route('membership.apply'), {
            onSuccess: () => {
                toast.success('Demande d\'adhésion envoyée avec succès!');
                reset();
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Une erreur s\'est produite. Veuillez réessayer.');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            onOpenChange(isOpen);
            if (!isOpen) reset();
        }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">CITL Membership Application</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Membership Type */}
                    <div className="space-y-2">
                        <Label htmlFor="membershipType" className="text-base font-semibold">
                            Select Type <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.membership_type}
                            onValueChange={(value) => setData('membership_type', value)}
                            required
                        >
                            <SelectTrigger id="membershipType">
                                <SelectValue placeholder="Select membership type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">New Membership</SelectItem>
                                <SelectItem value="renewal">Membership Renewal</SelectItem>
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
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                        placeholder="Enter your first name"
                                    />
                                </div>

                                {/* Surname */}
                                <div className="space-y-2">
                                    <Label htmlFor="surname">
                                        Surname <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="surname"
                                        value={data.surname}
                                        onChange={(e) => setData('surname', e.target.value)}
                                        required
                                        placeholder="Enter your surname"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Phone <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        placeholder="+225 XX XX XX XX XX"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <Label htmlFor="address">
                                    Address <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    required
                                    placeholder="Enter your address"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Company */}
                                <div className="space-y-2">
                                    <Label htmlFor="company">
                                        Company <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        required
                                        placeholder="Your company name"
                                    />
                                </div>

                                {/* Job Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">
                                        Job Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="jobTitle"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        required
                                        placeholder="Your job title"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Years of Experience */}
                                <div className="space-y-2">
                                    <Label htmlFor="yearsOfExperience">
                                        Years of Experience <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.years_of_experience}
                                        onValueChange={(value) => setData('years_of_experience', value)}
                                        required
                                    >
                                        <SelectTrigger id="yearsOfExperience">
                                            <SelectValue placeholder="Select years" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0-1">0-1 year</SelectItem>
                                            <SelectItem value="1-3">1-3 years</SelectItem>
                                            <SelectItem value="3-5">3-5 years</SelectItem>
                                            <SelectItem value="5-10">5-10 years</SelectItem>
                                            <SelectItem value="10+">10+ years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Membership Level */}
                                <div className="space-y-2">
                                    <Label htmlFor="membershipLevel">
                                        Membership Level <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.membership_level}
                                        onValueChange={(value) => setData('membership_level', value)}
                                        required
                                    >
                                        <SelectTrigger id="membershipLevel">
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="professional">Professional</SelectItem>
                                            <SelectItem value="expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Qualification - Only for Professional level */}
                            {data.membership_level === 'professional' && (
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">Professional Qualification</Label>
                                    <Input
                                        id="qualification"
                                        value={data.qualification}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        placeholder="Enter your professional qualification"
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
                                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed cursor-pointer">
                                        I HEREBY AGREE AND CONFIRM THAT ALL INFORMATION AND DATA STATED ABOVE ARE ACCURATE.
                                    </Label>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <a href="/privacy-policy" target="_blank" className="text-primary hover:underline block">
                                        View Privacy Policy
                                    </a>
                                    <a href="/terms-of-use" target="_blank" className="text-primary hover:underline block">
                                        View Terms of Use
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
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-citl-orange hover:bg-citl-orange/90" disabled={processing}>
                                    {processing ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
