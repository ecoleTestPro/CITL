import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DraggablePageItem } from '@/components/cms/draggable-page-item';

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface AvailablePagesListProps {
    pages: Page[];
}

export function AvailablePagesList({ pages }: AvailablePagesListProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="rounded-lg border bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <h3 className="text-sm font-semibold">Pages disponibles</h3>
                    <span className="text-xs text-gray-500">({pages.length})</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-6 w-6 p-0"
                >
                    {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </Button>
            </div>
            {isOpen && (
                <>
                    <p className="mb-3 text-xs text-gray-600">
                        Glissez-déposez une page vers le menu
                    </p>
                    <div className="max-h-96 space-y-2 overflow-y-auto">
                        {pages.length === 0 ? (
                            <div className="rounded-md border-2 border-dashed p-4 text-center">
                                <p className="text-xs text-gray-500">Toutes les pages sont ajoutées</p>
                            </div>
                        ) : (
                            pages.map((page) => <DraggablePageItem key={page.id} page={page} />)
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
