import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}

export function FormField({ label, name, error, required = false, children, className = '' }: FormFieldProps) {
    return (
        <div className={className}>
            <Label htmlFor={name}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>
            {children}
            {error && <InputError message={error} className="mt-1" />}
        </div>
    );
}
