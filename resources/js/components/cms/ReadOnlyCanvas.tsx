/**
 * Canvas en lecture seule pour afficher les pages CMS
 * Version simplifiée sans les fonctionnalités d'édition
 */
export const ReadOnlyCanvas = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background">
            {children ? (
                <div className="flex flex-col gap-4">{children}</div>
            ) : (
                <div className="flex min-h-[400px] items-center justify-center">
                    <p className="text-muted-foreground">
                        Cette page n'a pas de contenu.
                    </p>
                </div>
            )}
        </div>
    );
};

ReadOnlyCanvas.craft = {
    displayName: 'Canvas',
    rules: {
        canDrag: () => false,
    },
};
