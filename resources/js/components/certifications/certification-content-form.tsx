import RichTextEditor from '@/components/rich-text-editor';
import { CertificationFormData, SupportedLanguage } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface CertificationContentFormProps {
    form: InertiaFormProps<CertificationFormData>;
    currentLanguage: SupportedLanguage;
}

export function CertificationContentForm({ form, currentLanguage }: CertificationContentFormProps) {
    const { t } = useTranslation();

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

    const languageLabel = currentLanguage === 'fr' ? '(Français)' : '(English)';

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.overview')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('overview')}
                    onChange={(content) => setFieldValue('overview', content)}
                    placeholder={currentLanguage === 'fr' ? "Décrivez la vue d'ensemble de la certification..." : 'Describe the certification overview...'}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.target_audience')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('target_audience')}
                    onChange={(content) => setFieldValue('target_audience', content)}
                    placeholder={currentLanguage === 'fr' ? 'Décrivez le public cible...' : 'Describe the target audience...'}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.training_content')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('training_content')}
                    onChange={(content) => setFieldValue('training_content', content)}
                    placeholder={currentLanguage === 'fr' ? 'Décrivez le contenu de la formation...' : 'Describe the training content...'}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.exam_structure')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('exam_structure_details')}
                    onChange={(content) => setFieldValue('exam_structure_details', content)}
                    placeholder={currentLanguage === 'fr' ? "Détaillez la structure de l'examen..." : 'Detail the exam structure...'}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.business_outcomes')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('business_outcomes')}
                    onChange={(content) => setFieldValue('business_outcomes', content)}
                    placeholder={currentLanguage === 'fr' ? 'Décrivez les bénéfices professionnels...' : 'Describe the business outcomes...'}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('dashboard.certifications.additional_info')} {languageLabel}
                </label>
                <RichTextEditor
                    content={getFieldValue('additional_information')}
                    onChange={(content) => setFieldValue('additional_information', content)}
                    placeholder={currentLanguage === 'fr' ? 'Ajoutez des informations complémentaires...' : 'Add additional information...'}
                />
            </div>
        </div>
    );
}
