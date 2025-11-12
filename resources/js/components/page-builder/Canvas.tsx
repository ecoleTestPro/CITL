import { useNode, useEditor } from '@craftjs/core';
import { cn } from '@/lib/utils';

/**
 * Canvas principal du page builder - Zone de dépôt racine
 *
 * Composant conteneur qui accepte les sections et affiche le contenu
 * de la page en construction. Gère l'affichage d'un placeholder quand
 * aucun contenu n'est présent.
 *
 * Caractéristiques :
 * - Accepte uniquement les sections comme enfants directs
 * - Non déplaçable (canDrag: false)
 * - Affiche un message d'aide quand vide
 * - S'étend sur toute la hauteur disponible
 *
 * @param props - Propriétés du composant
 * @param props.children - Sections et contenu du canvas
 * @returns Zone de drop principale du builder
 */
export const Canvas = ({ children }: { children?: React.ReactNode }) => {
    const {
        connectors: { connect, drag },
        hasChildCanvases,
    } = useNode((node) => ({
        hasChildCanvases: node.data.nodes && node.data.nodes.length > 0,
    }));

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    return (
        <div
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref));
                }
            }}
            className={cn(
                'min-h-[calc(100vh-3.5rem)] bg-muted/30 p-8',
                'flex flex-col gap-4'
            )}
        >
            {children ? (
                <div className="flex flex-col gap-4">{children}</div>
            ) : (
                /* Drop zone indicator */
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
            )}
        </div>
    );
};

Canvas.craft = {
    displayName: 'Canvas',
    rules: {
        canDrag: () => false,
    },
};
