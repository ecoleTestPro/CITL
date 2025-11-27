import RichTextEditor from '@/components/rich-text-editor';
import { CertificationFormData } from '@/types';
import { UseFormReturn } from '@inertiajs/react';

interface CertificationContentFormProps {
    form: UseFormReturn<CertificationFormData>;
}

export function CertificationContentForm({ form }: CertificationContentFormProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Vue d'ensemble</label>
                <RichTextEditor
                    content={form.data.overview}
                    onChange={(content) => form.setData('overview', content)}
                    placeholder="Décrivez la vue d'ensemble de la certification..."
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Public cible</label>
                <RichTextEditor
                    content={form.data.target_audience}
                    onChange={(content) => form.setData('target_audience', content)}
                    placeholder="Décrivez le public cible..."
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contenu de la formation
                </label>
                <RichTextEditor
                    content={form.data.training_content}
                    onChange={(content) => form.setData('training_content', content)}
                    placeholder="Décrivez le contenu de la formation..."
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Structure de l'examen (détails)
                </label>
                <RichTextEditor
                    content={form.data.exam_structure_details}
                    onChange={(content) => form.setData('exam_structure_details', content)}
                    placeholder="Détaillez la structure de l'examen..."
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bénéfices professionnels
                </label>
                <RichTextEditor
                    content={form.data.business_outcomes}
                    onChange={(content) => form.setData('business_outcomes', content)}
                    placeholder="Décrivez les bénéfices professionnels..."
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Informations complémentaires
                </label>
                <RichTextEditor
                    content={form.data.additional_information}
                    onChange={(content) => form.setData('additional_information', content)}
                    placeholder="Ajoutez des informations complémentaires..."
                />
            </div>
        </div>
    );
}
