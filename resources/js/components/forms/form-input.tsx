import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
    return (
        <Input
            className={`mt-1 ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
        />
    );
}
