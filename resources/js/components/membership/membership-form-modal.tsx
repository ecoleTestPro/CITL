import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface MembershipFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type MembershipType = 'new' | 'renewal' | '';

interface FormData {
    membershipType: MembershipType;
    firstName: string;
    surname: string;
    phone: string;
    email: string;
    address: string;
    company: string;
    jobTitle: string;
    yearsOfExperience: string;
    membershipLevel: string;
    qualification: string;
    agreeToTerms: boolean;
}

export default function MembershipFormModal({ open, onOpenChange }: MembershipFormModalProps) {
    const [formData, setFormData] = useState<FormData>({
        membershipType: '',
        firstName: '',
        surname: '',
        phone: '',
        email: '',
        address: '',
        company: '',
        jobTitle: '',
        yearsOfExperience: '',
        membershipLevel: '',
        qualification: '',
        agreeToTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        // Handle form submission
        console.log('Form submitted:', formData);
        // TODO: Add actual submission logic (API call)
        onOpenChange(false);
    };

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({
            membershipType: '',
            firstName: '',
            surname: '',
            phone: '',
            email: '',
            address: '',
            company: '',
            jobTitle: '',
            yearsOfExperience: '',
            membershipLevel: '',
            qualification: '',
            agreeToTerms: false,
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            onOpenChange(isOpen);
            if (!isOpen) resetForm();
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
                            value={formData.membershipType}
                            onValueChange={(value) => handleInputChange('membershipType', value as MembershipType)}
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
                    {formData.membershipType && (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
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
                                        value={formData.surname}
                                        onChange={(e) => handleInputChange('surname', e.target.value)}
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
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
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
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
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
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
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
                                        value={formData.jobTitle}
                                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
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
                                        value={formData.yearsOfExperience}
                                        onValueChange={(value) => handleInputChange('yearsOfExperience', value)}
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
                                        value={formData.membershipLevel}
                                        onValueChange={(value) => handleInputChange('membershipLevel', value)}
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
                            {formData.membershipLevel === 'professional' && (
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">Professional Qualification</Label>
                                    <Input
                                        id="qualification"
                                        value={formData.qualification}
                                        onChange={(e) => handleInputChange('qualification', e.target.value)}
                                        placeholder="Enter your professional qualification"
                                    />
                                </div>
                            )}

                            {/* Agreement Checkbox */}
                            <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
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
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-citl-orange hover:bg-citl-orange/90">
                                    Submit Application
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
