import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface EmptyMenuStateProps {
    onAddItem: () => void;
}

export function EmptyMenuState({ onAddItem }: EmptyMenuStateProps) {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium">Aucun élément</h3>
                <p className="mb-4 text-sm text-gray-600">
                    Glissez une page depuis la sidebar
                </p>
                <Button
                    onClick={onAddItem}
                    className="bg-orange-600 hover:bg-orange-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                </Button>
            </div>
        </div>
    );
}
