import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface GlossarySidebarProps {
    availableLetters: string[];
    activeLetter: string | null;
    onLetterClick: (letter: string) => void;
    onSearch: (term: string) => void;
}

export function GlossarySidebar({ availableLetters, activeLetter, onLetterClick, onSearch }: GlossarySidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const scrollToLetter = (letter: string) => {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
            onLetterClick(letter);
        }
    };

    return (
        <div className="sticky top-24 space-y-6">
            {/* Search Box */}
            <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Rechercher</h3>
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher un terme..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Alphabet Navigation */}
            <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Navigation alphabétique</h3>
                <div className="grid grid-cols-7 gap-2">
                    {alphabet.map((letter) => {
                        const isAvailable = availableLetters.includes(letter);
                        const isActive = activeLetter === letter;

                        return (
                            <button
                                key={letter}
                                onClick={() => isAvailable && scrollToLetter(letter)}
                                disabled={!isAvailable}
                                className={`h-10 w-10 rounded-lg font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary text-white shadow-md'
                                        : isAvailable
                                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                                          : 'cursor-not-allowed bg-gray-50 text-gray-300 dark:bg-gray-900 dark:text-gray-700'
                                } `}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
