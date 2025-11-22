import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent';
    fullWidth?: boolean;
}

export function AnimatedButton({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: AnimatedButtonProps) {
    const baseClasses = "shadow-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-center font-normal text-nowrap transition-all duration-500 ease-in-out group-hover:scale-101 md:h-12";

    const variantClasses = {
        primary: "bg-primary-500 text-white hover:bg-secondary dark:hover:bg-accent",
        secondary: "bg-secondary text-white hover:bg-primary-500 dark:bg-accent dark:hover:bg-primary-500",
        accent: "bg-accent text-white hover:bg-primary-500 dark:bg-secondary dark:hover:bg-primary-500"
    };

    const widthClass = fullWidth ? "w-full" : "md:w-auto";

    return (
        <div className={`group inline-block ${fullWidth ? 'w-full' : 'w-full md:w-auto'}`}>
            <button
                className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
                {...props}
            >
                <span className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase lowercase">
                    {children}
                </span>

                <div className="relative size-6 overflow-hidden">
                    <span className="absolute inset-0 -translate-x-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 5H13V7H11V5Z" fill="currentColor" />
                            <path d="M5 5H7V7H5V5Z" fill="currentColor" />
                            <path d="M14 8H16V10H14V8Z" fill="currentColor" />
                            <path d="M8 8H10V10H8V8Z" fill="currentColor" />
                            <path d="M17 11H19V13H17V11Z" fill="currentColor" />
                            <path d="M11 11H13V13H11V11Z" fill="currentColor" />
                            <path d="M14 14H16V16H14V14Z" fill="currentColor" />
                            <path d="M8 14H10V16H8V14Z" fill="currentColor" />
                            <path d="M11 17H13V19H11V17Z" fill="currentColor" />
                            <path d="M5 17H7V19H5V17Z" fill="currentColor" />
                        </svg>
                    </span>

                    <span className="absolute -translate-x-2 transition-transform duration-300 ease-in-out group-hover:translate-x-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 5H13V7H11V5Z" fill="currentColor" />
                            <path d="M5 5H7V7H5V5Z" fill="currentColor" />
                            <path d="M14 8H16V10H14V8Z" fill="currentColor" />
                            <path d="M8 8H10V10H8V8Z" fill="currentColor" />
                            <path d="M17 11H19V13H17V11Z" fill="currentColor" />
                            <path d="M11 11H13V13H11V11Z" fill="currentColor" />
                            <path d="M14 14H16V16H14V14Z" fill="currentColor" />
                            <path d="M8 14H10V16H8V14Z" fill="currentColor" />
                            <path d="M11 17H13V19H11V17Z" fill="currentColor" />
                            <path d="M5 17H7V19H5V17Z" fill="currentColor" />
                        </svg>
                    </span>
                </div>
            </button>
        </div>
    );
}
