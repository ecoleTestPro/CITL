import { cn } from '@/lib/utils';

interface EditorLayoutProps {
    children: React.ReactNode;
    settingsOpen?: boolean;
}

export function EditorLayout({ children, settingsOpen = false }: EditorLayoutProps) {
    return (
        <div
            className={cn(
                'mx-auto transition-all duration-300',
                settingsOpen ? 'max-w-4xl pr-80' : 'max-w-6xl'
            )}
        >
            <div className="min-h-[calc(100vh-3.5rem)] p-6">
                {children}
            </div>
        </div>
    );
}
