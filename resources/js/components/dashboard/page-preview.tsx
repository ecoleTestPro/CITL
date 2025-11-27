interface PagePreviewProps {
    pageUrl: string;
    pageTitle: string;
    previewKey?: number;
}

export function PagePreview({
    pageUrl,
    pageTitle,
    previewKey = 0,
}: PagePreviewProps) {
    return (
        <div className="flex w-full flex-col">
            <h3 className="mb-4 text-lg font-semibold">Live Preview</h3>
            <div className="flex-1 overflow-hidden rounded-lg border bg-background">
                <iframe
                    key={previewKey}
                    src={pageUrl}
                    className="h-full min-h-[calc(100vh-250px)] w-full"
                    title={pageTitle}
                />
            </div>
        </div>
    );
}
