import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    onPageChange?: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, baseUrl, onPageChange }: PaginationProps) => {
    const getPageUrl = (page: number) => {
        if (onPageChange) {
            return '#';
        }
        return `${baseUrl}?page=${page}`;
    };

    const handlePageClick = (e: React.MouseEvent, page: number) => {
        if (onPageChange) {
            e.preventDefault();
            onPageChange(page);
        }
    };

    // Générer les numéros de page à afficher
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Si on a moins de 5 pages, on les affiche toutes
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logique pour afficher les pages avec ellipses
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <ul data-ns-animate data-delay="0.2" className="mt-14 flex items-center justify-center gap-2">
            {/* Bouton précédent */}
            <li className="group">
                {currentPage > 1 ? (
                    <Link
                        href={getPageUrl(currentPage - 1)}
                        onClick={(e) => handlePageClick(e, currentPage - 1)}
                        className="border-stroke-3 dark:border-stroke-7 hover:bg-primary-500 group flex h-10 w-10 items-center justify-center rounded-full border duration-300"
                    >
                        <ChevronLeft className="h-4 w-4 stroke-secondary duration-300 group-hover:stroke-white dark:stroke-accent" />
                    </Link>
                ) : (
                    <div className="border-stroke-3 dark:border-stroke-7 flex h-10 w-10 items-center justify-center rounded-full border opacity-50">
                        <ChevronLeft className="h-4 w-4 stroke-secondary dark:stroke-accent" />
                    </div>
                )}
            </li>

            {/* Numéros de page */}
            {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                        <li key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center">
                            <span className="text-secondary dark:text-accent">...</span>
                        </li>
                    );
                }

                const pageNumber = page as number;
                const isActive = pageNumber === currentPage;

                return (
                    <li key={pageNumber} className={`group ${isActive ? 'page-active' : ''}`}>
                        <Link
                            href={getPageUrl(pageNumber)}
                            onClick={(e) => handlePageClick(e, pageNumber)}
                            className={`text-tagline-2 hover:bg-primary-500 flex h-10 w-10 items-center justify-center rounded-full font-medium duration-300 hover:text-accent dark:text-accent ${
                                isActive ? 'bg-primary-500 text-accent' : ''
                            }`}
                        >
                            {pageNumber}
                        </Link>
                    </li>
                );
            })}

            {/* Bouton suivant */}
            <li className="group">
                {currentPage < totalPages ? (
                    <Link
                        href={getPageUrl(currentPage + 1)}
                        onClick={(e) => handlePageClick(e, currentPage + 1)}
                        className="border-stroke-3 dark:border-stroke-7 hover:bg-primary-500 group flex h-10 w-10 items-center justify-center rounded-full border duration-300"
                    >
                        <ChevronRight className="h-4 w-4 stroke-secondary duration-300 group-hover:stroke-white dark:stroke-accent" />
                    </Link>
                ) : (
                    <div className="border-stroke-3 dark:border-stroke-7 flex h-10 w-10 items-center justify-center rounded-full border opacity-50">
                        <ChevronRight className="h-4 w-4 stroke-secondary dark:stroke-accent" />
                    </div>
                )}
            </li>
        </ul>
    );
};
