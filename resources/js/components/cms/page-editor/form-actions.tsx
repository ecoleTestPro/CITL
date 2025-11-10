import { Button } from '@/components/ui/button';

interface FormActionsProps {
    onCancel?: () => void;
    isSubmitting?: boolean;
    submitLabel?: string;
    submitingLabel?: string;
    cancelLabel?: string;
}

export function FormActions({
    onCancel,
    isSubmitting = false,
    submitLabel = 'Enregistrer',
    submitingLabel = 'Enregistrement...',
    cancelLabel = 'Annuler',
}: FormActionsProps) {
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            window.history.back();
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
                {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? submitingLabel : submitLabel}
            </Button>
        </div>
    );
}
