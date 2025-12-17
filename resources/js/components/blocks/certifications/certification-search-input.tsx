import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CertificationSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

function CertificationSearchInput({ value, onChange, className = '' }: CertificationSearchInputProps) {
    const { t } = useTranslation();

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t('certifications.sidebar.search_placeholder')}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary"
            />
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
    );
}

export default CertificationSearchInput;
