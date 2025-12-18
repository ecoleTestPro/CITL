import { Certification } from '@/types';
import { BookOpen, CheckCircle, Clock, Edit, Target, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CertificationAdminCardProps {
    certification: Certification;
    onEdit: (certification: Certification) => void;
    onDelete: (certification: Certification) => void;
}

export function CertificationAdminCard({ certification, onEdit, onDelete }: CertificationAdminCardProps) {
    const categoryName = certification.category?.name_fr || certification.category?.name || '-';

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10">
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        certification.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                >
                    {certification.is_active ? 'Actif' : 'Inactif'}
                </span>
            </div>

            {/* Header with Image */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-4 dark:border-gray-700">
                {/* Featured Image or Icon Fallback */}
                <div
                    className={`flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
                        certification.featured_image
                            ? 'bg-white dark:bg-gray-700'
                            : 'bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-primary/20 dark:to-primary/10'
                    }`}
                >
                    {certification.featured_image ? (
                        <img
                            src={
                                certification.featured_image.startsWith('http')
                                    ? certification.featured_image
                                    : `/storage/${certification.featured_image}`
                            }
                            alt={certification.title_fr}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <span className={`${certification.icon} text-3xl text-secondary dark:text-primary`}></span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-base leading-tight font-semibold text-gray-900 dark:text-white">
                        {certification.title_fr}
                    </h3>
                    <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {categoryName}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                {/* Exam Details Grid */}
                <div className="grid grid-cols-2 gap-2">
                    <ExamDetailItem icon={BookOpen} label="Questions" value={certification.exam_questions} />
                    <ExamDetailItem icon={Target} label="Score requis" value={`${certification.exam_passing_score}%`} />
                    <ExamDetailItem icon={Clock} label="Durée" value={certification.exam_duration} />
                    <ExamDetailItem icon={CheckCircle} label="Points" value={certification.exam_total_points} />
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2 border-t border-gray-100 p-3 dark:border-gray-700">
                <Button variant="outline" size="sm" onClick={() => onEdit(certification)} className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Modifier
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(certification)}
                    className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                </Button>
            </div>
        </article>
    );
}

interface ExamDetailItemProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
}

function ExamDetailItem({ icon: Icon, label, value }: ExamDetailItemProps) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5 dark:bg-gray-700">
            <Icon className="h-3.5 w-3.5 text-gray-400" />
            <div className="min-w-0">
                <p className="text-[10px] text-gray-500 dark:text-gray-500">{label}</p>
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}
