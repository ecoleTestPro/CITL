import { FadeIn } from '@/components/animations';
import { Certification, CertificationDocument, SupportedLanguage } from '@/types';
import { Download, ExternalLink, FileText, FolderOpen } from 'lucide-react';
import { useMemo } from 'react';

interface CertificationSidebarProps {
    certification: Certification;
    currentLanguage: SupportedLanguage;
}

// Grouper les documents par tag
function groupDocumentsByTag(documents: CertificationDocument[]): Map<string, CertificationDocument[]> {
    const grouped = new Map<string, CertificationDocument[]>();
    const uncategorized: CertificationDocument[] = [];

    documents.forEach((doc) => {
        if (doc.tags && doc.tags.length > 0) {
            // Utiliser le premier tag comme catégorie principale
            const primaryTag = doc.tags[0];
            const tagName = primaryTag.name;
            if (!grouped.has(tagName)) {
                grouped.set(tagName, []);
            }
            grouped.get(tagName)!.push(doc);
        } else {
            uncategorized.push(doc);
        }
    });

    // Ajouter les documents non catégorisés à la fin
    if (uncategorized.length > 0) {
        grouped.set('Others', uncategorized);
    }

    return grouped;
}

// Fonction pour obtenir l'icône du type de fichier
function getFileIcon(fileType: string) {
    if (fileType.includes('pdf')) {
        return <FileText className="h-4 w-4 text-red-500" />;
    }
    return <FileText className="h-4 w-4 text-primary" />;
}

// Fonction pour formater la taille du fichier
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function CertificationSidebar({ certification, currentLanguage }: CertificationSidebarProps) {
    // Labels localisés
    const labels = {
        examInfo: currentLanguage === 'fr' ? "Informations de l'examen" : 'Exam Information',
        category: currentLanguage === 'fr' ? 'Catégorie' : 'Category',
        questions: 'Questions',
        duration: currentLanguage === 'fr' ? 'Durée' : 'Duration',
        passingScore: currentLanguage === 'fr' ? 'Score requis' : 'Passing Score',
        totalPoints: currentLanguage === 'fr' ? 'Points totaux' : 'Total Points',
        syllabus: currentLanguage === 'fr' ? 'Syllabus officiel' : 'Official Syllabus',
        documents: 'Documents',
        registerExam: currentLanguage === 'fr' ? "S'inscrire à l'examen" : 'Register for Exam',
        findTraining: currentLanguage === 'fr' ? 'Trouver une formation' : 'Find Training',
        onThisPage: currentLanguage === 'fr' ? 'Sur cette page' : 'On this page',
        overview: currentLanguage === 'fr' ? "Vue d'ensemble" : 'Overview',
        audience: currentLanguage === 'fr' ? 'Public cible' : 'Target Audience',
        trainingContent: currentLanguage === 'fr' ? 'Contenu de la formation' : 'Training Content',
        examStructure: currentLanguage === 'fr' ? "Structure de l'examen" : 'Exam Structure',
        businessOutcomes: currentLanguage === 'fr' ? 'Bénéfices professionnels' : 'Business Outcomes',
        moreInfo: currentLanguage === 'fr' ? 'Informations complémentaires' : 'Additional Information',
        downloadSyllabus: currentLanguage === 'fr' ? 'Télécharger le syllabus' : 'Download Syllabus',
        others: currentLanguage === 'fr' ? 'Autres' : 'Others',
    };

    // Grouper les documents par tag
    const groupedDocuments = useMemo(() => {
        if (!certification.documents || certification.documents.length === 0) {
            return new Map<string, CertificationDocument[]>();
        }
        return groupDocumentsByTag(certification.documents);
    }, [certification.documents]);

    const hasDocuments = certification.documents && certification.documents.length > 0;
    const hasSyllabus = certification.syllabus_file || certification.syllabus_url;

    // Helper pour obtenir le nom de catégorie localisé
    const getCategoryName = (): string => {
        const category = certification.category;
        if (currentLanguage === 'en' && category.name_en) {
            return category.name_en;
        }
        return category.name_fr || category.name;
    };

    return (
        <div className="w-full lg:sticky lg:top-24 lg:w-[449px] lg:self-start">
            <FadeIn delay={0.3}>
                <div className="w-full space-y-6 rounded-[20px] border border-gray-100 bg-gray-50 p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-heading-5 text-gray-900 dark:text-white">{labels.examInfo}</h3>

                    {/* Exam Metadata */}
                    <div className="space-y-4">
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">{labels.category}</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {getCategoryName()}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">{labels.questions}</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_questions}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">{labels.duration}</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_duration}
                            </span>
                        </div>
                        <div className="group flex items-center justify-between border-b border-gray-200 pb-3 transition-colors duration-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                            <span className="text-gray-600 dark:text-gray-400">{labels.passingScore}</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_passing_score}%
                            </span>
                        </div>
                        <div className="group flex items-center justify-between transition-colors duration-300">
                            <span className="text-gray-600 dark:text-gray-400">{labels.totalPoints}</span>
                            <span className="font-semibold text-primary transition-transform duration-300 group-hover:scale-105">
                                {certification.exam_total_points}
                            </span>
                        </div>
                    </div>

                    {/* Syllabus Section */}
                    {hasSyllabus && (
                        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{labels.syllabus}</h4>
                            <a
                                href={certification.syllabus_file || certification.syllabus_url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 rounded-lg bg-primary/10 p-4 transition-all duration-300 hover:bg-primary/20 hover:shadow-md"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <span className="block font-medium text-gray-900 dark:text-white">{labels.downloadSyllabus}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">PDF</span>
                                </div>
                                <Download className="h-5 w-5 text-primary" />
                            </a>
                        </div>
                    )}

                    {/* Documents Section - Grouped by Tags */}
                    {hasDocuments && (
                        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{labels.documents}</h4>
                            <div className="space-y-5">
                                {Array.from(groupedDocuments.entries()).map(([tagName, docs]) => (
                                    <div key={tagName}>
                                        {/* Tag Header */}
                                        <div className="mb-2 flex items-center gap-2">
                                            <FolderOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                            <span className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                                {tagName === 'Others' ? labels.others : tagName}
                                            </span>
                                        </div>
                                        {/* Documents List */}
                                        <div className="space-y-2 pl-6">
                                            {docs.map((doc) => (
                                                <a
                                                    key={doc.id}
                                                    href={`/storage/${doc.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-3 rounded-lg bg-white p-3 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm dark:bg-gray-900 dark:hover:bg-gray-700"
                                                >
                                                    {getFileIcon(doc.file_type)}
                                                    <div className="min-w-0 flex-1">
                                                        <span className="block truncate text-sm font-medium text-gray-700 group-hover:text-primary dark:text-gray-300">
                                                            {doc.name}
                                                        </span>
                                                        <span className="text-xs text-gray-400">{formatFileSize(doc.file_size)}</span>
                                                    </div>
                                                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                        <a
                            href="/exam-registration"
                            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
                        >
                            {labels.registerExam}
                        </a>
                        <a
                            href="/accredited-organizations"
                            className="flex w-full items-center justify-center rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:shadow-md"
                        >
                            {labels.findTraining}
                        </a>
                    </div>

                    {/* Table of Contents */}
                    <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{labels.onThisPage}</h4>
                        <ul className="space-y-2">
                            {[
                                { href: '#overview', label: labels.overview },
                                { href: '#audience', label: labels.audience },
                                { href: '#content', label: labels.trainingContent },
                                { href: '#exam-structure', label: labels.examStructure },
                                { href: '#business-outcomes', label: labels.businessOutcomes },
                                { href: '#more-information', label: labels.moreInfo },
                            ].map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="group flex items-center text-sm text-gray-600 transition-colors duration-300 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                                    >
                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-400 transition-all duration-300 group-hover:w-4 group-hover:bg-primary"></span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
