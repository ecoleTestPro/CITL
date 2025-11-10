import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface MenuEditorHeaderProps {
    title: string;
    description: string;
    onCancel: () => void;
    onSave: (e: React.FormEvent) => void;
}

export function MenuEditorHeader({
    title,
    description,
    onCancel,
    onSave,
}: MenuEditorHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onCancel}>
                    Annuler
                </Button>
                <Button size="sm" onClick={onSave} className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                </Button>
            </div>
        </div>
    );
}
