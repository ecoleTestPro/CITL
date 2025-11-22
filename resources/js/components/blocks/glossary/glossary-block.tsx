import axios from 'axios';
import { useEffect, useState } from 'react';
import { GlossarySidebar } from './glossary-sidebar';

interface GlossaryTerm {
    id: number;
    term: string;
    definition: string;
    letter: string;
}

interface GroupedGlossary {
    [letter: string]: GlossaryTerm[];
}

function GlossaryBlock() {
    const [glossary, setGlossary] = useState<GroupedGlossary>({});
    const [filteredGlossary, setFilteredGlossary] = useState<GroupedGlossary>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGlossary = async () => {
            try {
                const response = await axios.get('/api/glossary/grouped');
                setGlossary(response.data.data);
                setFilteredGlossary(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement du glossaire');
                setLoading(false);
                console.error('Error fetching glossary:', err);
            }
        };

        fetchGlossary();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredGlossary(glossary);
            return;
        }

        const filtered: GroupedGlossary = {};
        Object.keys(glossary).forEach((letter) => {
            const matchingTerms = glossary[letter].filter((term) =>
                term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                term.definition.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (matchingTerms.length > 0) {
                filtered[letter] = matchingTerms;
            }
        });
        setFilteredGlossary(filtered);
    }, [searchTerm, glossary]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleLetterClick = (letter: string) => {
        setActiveLetter(letter);
    };

    if (loading) {
        return (
            <section className="bg-white/80 dark:bg-gray-800 pt-12 pb-16">
                <div className="container mx-auto text-center py-16">
                    <p className="text-lg text-gray-600 dark:text-gray-400">Chargement du glossaire...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-white/80 dark:bg-gray-800 pt-12 pb-16">
                <div className="container mx-auto text-center py-16">
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    const availableLetters = Object.keys(glossary).sort();

    return (
        <section className="bg-white/80 dark:bg-gray-800 pt-12 pb-16">
            <section className="pb-16 xl:pb-28">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-3">
                            <GlossarySidebar
                                availableLetters={availableLetters}
                                activeLetter={activeLetter}
                                onLetterClick={handleLetterClick}
                                onSearch={handleSearch}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9">
                            {Object.keys(filteredGlossary).length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {searchTerm ? 'Aucun terme trouvé pour votre recherche.' : 'Aucun terme disponible.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {Object.keys(filteredGlossary)
                                        .sort()
                                        .map((letter, letterIndex) => (
                                            <div key={letter} className="border-b-stroke-1 dark:border-b-stroke-7 border-b pb-8" id={`letter-${letter}`}>
                                                <div className="flex items-start justify-start gap-x-6 md:gap-x-14">
                                                    <h2
                                                        data-ns-animate
                                                        data-delay={`${letterIndex * 0.1}`}
                                                        className="text-heading-3 sticky top-25 w-full max-w-[50px] font-normal md:max-w-[180px] lg:max-w-[467px]"
                                                    >
                                                        {letter}
                                                    </h2>
                                                    <div className="flex-1">
                                                        {filteredGlossary[letter].map((term, termIndex) => (
                                                            <div
                                                                key={term.id}
                                                                data-ns-animate
                                                                data-delay={`${(letterIndex * 0.1) + ((termIndex + 1) * 0.1)}`}
                                                                className="border-b-stroke-1 dark:border-b-stroke-7 w-full space-y-2 border-b px-3 py-4"
                                                            >
                                                                <h3 className="text-heading-5 font-normal">{term.term}</h3>
                                                                <p className="font-normal text-secondary/80 dark:text-accent/80">{term.definition}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default GlossaryBlock;
