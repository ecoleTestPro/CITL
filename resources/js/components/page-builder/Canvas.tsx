import { useEditor } from '@craftjs/core';
import { cn } from '@/lib/utils';

export const Canvas = () => {
    const { connectors } = useEditor();

    return (
        <div
            ref={(ref) => ref && connectors.create(ref, <div />)}
            className={cn(
                'min-h-[calc(100vh-3.5rem)] bg-muted/30 p-8',
                'flex flex-col gap-4'
            )}
        >
            {/* Drop zone indicator */}
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background/50">
                <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        Glissez une section ici pour commencer
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/75">
                        ou cliquez sur "Ajouter une section" dans la barre latérale
                    </p>
                </div>
            </div>
        </div>
    );
};
