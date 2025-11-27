import { InputHTMLAttributes } from 'react';

interface FormRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export function FormRadio({ label, className = '', ...props }: FormRadioProps) {
    return (
        <label className={`flex items-center gap-2 ${className}`}>
            <input
                type="radio"
                className="h-4 w-4 border-gray-300 text-secondary focus:ring-2 focus:ring-secondary/20 dark:border-gray-600 dark:bg-gray-800"
                {...props}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
        </label>
    );
}
