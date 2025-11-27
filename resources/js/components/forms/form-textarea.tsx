import { Textarea } from '@/components/ui/textarea';
import { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export function FormTextarea({ error, className = '', ...props }: FormTextareaProps) {
    return (
        <Textarea
            className={`mt-1 ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
        />
    );
}
