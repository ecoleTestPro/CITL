import { Link } from '@inertiajs/react';
import { Archive } from '../types';

interface ArchiveListProps {
    archives: Archive[];
}

export const ArchiveList = ({ archives }: ArchiveListProps) => {
    return (
        <div>
            <h3 className="text-heading-5 text-secondary dark:text-foreground">Past records</h3>
            <div className="mt-2.5 space-y-2">
                {archives.map((archive, index) => (
                    <Link
                        key={`${archive.year}-${archive.month}-${index}`}
                        href={archive.url}
                        className="text-tagline-1 text-secondary hover:text-primary flex items-center justify-between py-1.5 transition-colors duration-300 dark:text-foreground dark:hover:text-primary"
                    >
                        <span>
                            {archive.month} {archive.year}
                        </span>
                        <span>({String(archive.count).padStart(2, '0')})</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
