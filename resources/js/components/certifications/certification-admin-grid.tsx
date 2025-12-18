import { Certification } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { CertificationAdminCard } from './certification-admin-card';

interface CertificationAdminGridProps {
    certifications: Certification[];
    onEdit: (certification: Certification) => void;
    onDelete: (certification: Certification) => void;
}

export function CertificationAdminGrid({ certifications, onEdit, onDelete }: CertificationAdminGridProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCertifications = certifications.filter(
        (cert) =>
            cert.title_fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cert.title_en && cert.title_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
            cert.slug.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="w-full space-y-4">
            {/* Search */}
            <div className="flex items-center justify-between">
                <div className="relative w-64">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="pl-9"
                    />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredCertifications.length} certification{filteredCertifications.length > 1 ? 's' : ''}
                </div>
            </div>

            {/* Grid */}
            {filteredCertifications.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
                    <p className="text-gray-500 dark:text-gray-400">Aucune certification trouvée</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredCertifications.map((certification) => (
                        <CertificationAdminCard
                            key={certification.id}
                            certification={certification}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
