import { Search } from 'lucide-react';
import { FormEvent } from 'react';

interface SearchFormProps {
    onSearch?: (query: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search') as string;
        onSearch?.(query);
    };

    return (
        <form onSubmit={handleSubmit} role="search" aria-label="Search articles" className="relative flex items-center justify-start gap-3">
            <input
                type="search"
                name="search"
                id="searchArticles"
                placeholder="Search articles"
                required
                aria-label="Search articles"
                className="focus:outline-primary-500 border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 h-11 w-full rounded-[360px] border px-[18px] py-3 font-normal placeholder:font-normal placeholder:text-secondary/60 focus:outline-1 max-md:max-w-full dark:text-foreground dark:placeholder:text-foreground/60"
            />
            <button type="submit" aria-label="Submit search" className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                <Search className="h-5 w-5 stroke-secondary dark:stroke-foreground" />
            </button>
        </form>
    );
};
