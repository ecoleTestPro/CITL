interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && (
                <div className="text-sm text-muted-foreground">{subtitle}</div>
            )}
        </div>
    );
}
