import RichTextEditor from '@/components/rich-text-editor';
import { CertificationFormData, SupportedLanguage } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { BookOpen, Briefcase, ChevronDown, ChevronUp, FileQuestion, Info, Lightbulb, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CertificationContentFormProps {
    form: InertiaFormProps<CertificationFormData>;
    currentLanguage: SupportedLanguage;
}

interface ContentSectionProps {
    title: string;
    icon: React.ElementType;
    hint: string;
    example?: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    hasContent: boolean;
}

function ContentSection({ title, icon: Icon, hint, example, isExpanded, onToggle, children, hasContent }: ContentSectionProps) {
    return (
        <div
            className={`overflow-hidden rounded-xl border transition-all ${
                isExpanded
                    ? 'border-primary/30 bg-white shadow-md dark:border-primary/20 dark:bg-gray-800'
                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                            hasContent
                                ? 'bg-green-100 dark:bg-green-900/30'
                                : isExpanded
                                  ? 'bg-primary/10 dark:bg-primary/20'
                                  : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                    >
                        <Icon className={`h-5 w-5 ${hasContent ? 'text-green-600 dark:text-green-400' : isExpanded ? 'text-primary' : 'text-gray-500'}`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                            {hasContent && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    Rempli
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </div>
            </button>

            {isExpanded && (
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    {example && (
                        <div className="mb-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                            <div className="flex items-start gap-2">
                                <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                                <div>
                                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Conseil</p>
                                    <p className="text-xs text-amber-700 dark:text-amber-400">{example}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {children}
                </div>
            )}
        </div>
    );
}

export function CertificationContentForm({ form, currentLanguage }: CertificationContentFormProps) {
    const { t } = useTranslation();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        overview: true,
        target_audience: false,
        training_content: false,
        exam_structure_details: false,
        business_outcomes: false,
        additional_information: false,
    });

    // Helper pour obtenir la clé du champ en fonction de la langue
    const getFieldKey = (field: string) => `${field}_${currentLanguage}` as keyof CertificationFormData;

    // Helper pour obtenir la valeur d'un champ traduisible
    const getFieldValue = (field: string): string => {
        const key = getFieldKey(field);
        return (form.data[key] as string) || '';
    };

    // Helper pour définir la valeur d'un champ traduisible
    const setFieldValue = (field: string, value: string) => {
        const key = getFieldKey(field);
        form.setData({ ...form.data, [key]: value });
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const hasContent = (field: string): boolean => {
        const value = getFieldValue(field);
        // Vérifier si le contenu n'est pas vide (en ignorant les balises HTML vides)
        const strippedContent = value.replace(/<[^>]*>/g, '').trim();
        return strippedContent.length > 0;
    };

    // Calculer le nombre de sections remplies
    const sections = ['overview', 'target_audience', 'training_content', 'exam_structure_details', 'business_outcomes', 'additional_information'];
    const filledSections = sections.filter((s) => hasContent(s)).length;

    const languageIndicator = (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                currentLanguage === 'fr'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}
        >
            {currentLanguage === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
        </span>
    );

    return (
        <div className="space-y-4">
            {/* Header avec progression */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                        <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Contenu détaillé</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {filledSections} / {sections.length} sections remplies
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {languageIndicator}
                    <div className="flex h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="bg-primary transition-all"
                            style={{ width: `${(filledSections / sections.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Sections de contenu */}
            <div className="space-y-3">
                <ContentSection
                    title={t('dashboard.certifications.overview')}
                    icon={Info}
                    hint="Vue d'ensemble et présentation générale"
                    example="Décrivez ce qu'est la certification, son objectif principal et pourquoi elle est importante dans le domaine professionnel."
                    isExpanded={expandedSections.overview}
                    onToggle={() => toggleSection('overview')}
                    hasContent={hasContent('overview')}
                >
                    <RichTextEditor
                        content={getFieldValue('overview')}
                        onChange={(content) => setFieldValue('overview', content)}
                        placeholder={
                            currentLanguage === 'fr'
                                ? "Décrivez la vue d'ensemble de la certification..."
                                : 'Describe the certification overview...'
                        }
                    />
                </ContentSection>

                <ContentSection
                    title={t('dashboard.certifications.target_audience')}
                    icon={Users}
                    hint="Public cible et prérequis"
                    example="Listez les profils professionnels concernés (testeurs débutants, développeurs, chefs de projet...) et les prérequis recommandés."
                    isExpanded={expandedSections.target_audience}
                    onToggle={() => toggleSection('target_audience')}
                    hasContent={hasContent('target_audience')}
                >
                    <RichTextEditor
                        content={getFieldValue('target_audience')}
                        onChange={(content) => setFieldValue('target_audience', content)}
                        placeholder={currentLanguage === 'fr' ? 'Décrivez le public cible...' : 'Describe the target audience...'}
                    />
                </ContentSection>

                <ContentSection
                    title={t('dashboard.certifications.training_content')}
                    icon={BookOpen}
                    hint="Programme et modules de formation"
                    example="Détaillez les chapitres ou modules couverts, les compétences acquises et le volume horaire recommandé."
                    isExpanded={expandedSections.training_content}
                    onToggle={() => toggleSection('training_content')}
                    hasContent={hasContent('training_content')}
                >
                    <RichTextEditor
                        content={getFieldValue('training_content')}
                        onChange={(content) => setFieldValue('training_content', content)}
                        placeholder={
                            currentLanguage === 'fr' ? 'Décrivez le contenu de la formation...' : 'Describe the training content...'
                        }
                    />
                </ContentSection>

                <ContentSection
                    title={t('dashboard.certifications.exam_structure')}
                    icon={FileQuestion}
                    hint="Format et structure de l'examen"
                    example="Précisez le nombre de questions, le format (QCM, texte ouvert), la durée, le score de passage et les conditions d'examen."
                    isExpanded={expandedSections.exam_structure_details}
                    onToggle={() => toggleSection('exam_structure_details')}
                    hasContent={hasContent('exam_structure_details')}
                >
                    <RichTextEditor
                        content={getFieldValue('exam_structure_details')}
                        onChange={(content) => setFieldValue('exam_structure_details', content)}
                        placeholder={
                            currentLanguage === 'fr' ? "Détaillez la structure de l'examen..." : 'Detail the exam structure...'
                        }
                    />
                </ContentSection>

                <ContentSection
                    title={t('dashboard.certifications.business_outcomes')}
                    icon={Briefcase}
                    hint="Bénéfices professionnels et carrière"
                    example="Décrivez les opportunités de carrière, l'évolution salariale potentielle, la reconnaissance internationale et les compétences validées."
                    isExpanded={expandedSections.business_outcomes}
                    onToggle={() => toggleSection('business_outcomes')}
                    hasContent={hasContent('business_outcomes')}
                >
                    <RichTextEditor
                        content={getFieldValue('business_outcomes')}
                        onChange={(content) => setFieldValue('business_outcomes', content)}
                        placeholder={
                            currentLanguage === 'fr' ? 'Décrivez les bénéfices professionnels...' : 'Describe the business outcomes...'
                        }
                    />
                </ContentSection>

                <ContentSection
                    title={t('dashboard.certifications.additional_info')}
                    icon={Target}
                    hint="Informations complémentaires"
                    example="Ajoutez des informations sur la validité du certificat, les possibilités de repassage, les langues disponibles, etc."
                    isExpanded={expandedSections.additional_information}
                    onToggle={() => toggleSection('additional_information')}
                    hasContent={hasContent('additional_information')}
                >
                    <RichTextEditor
                        content={getFieldValue('additional_information')}
                        onChange={(content) => setFieldValue('additional_information', content)}
                        placeholder={
                            currentLanguage === 'fr' ? 'Ajoutez des informations complémentaires...' : 'Add additional information...'
                        }
                    />
                </ContentSection>
            </div>

            {/* Actions rapides */}
            <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4" />
                    <span>Cliquez sur une section pour la développer et ajouter du contenu</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            const allExpanded = Object.values(expandedSections).every((v) => v);
                            const newState: Record<string, boolean> = {};
                            sections.forEach((s) => {
                                newState[s] = !allExpanded;
                            });
                            setExpandedSections(newState);
                        }}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        {Object.values(expandedSections).every((v) => v) ? 'Tout réduire' : 'Tout développer'}
                    </button>
                </div>
            </div>
        </div>
    );
}
