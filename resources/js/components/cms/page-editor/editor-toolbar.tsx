import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Eye,
    Save,
    Settings,
    Smartphone,
    Monitor,
    Tablet,
} from 'lucide-react';

interface EditorToolbarProps {
    pageTitle: string;
    status: 'draft' | 'published';
    isSubmitting: boolean;
    onBack?: () => void;
    onPreview?: () => void;
    onSave?: () => void;
    onSettingsToggle?: () => void;
    settingsOpen?: boolean;
}

export function EditorToolbar({
    pageTitle,
    status,
    isSubmitting,
    onBack,
    onPreview,
    onSave,
    onSettingsToggle,
    settingsOpen = false,
}: EditorToolbarProps) {
    return (
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4">
                {/* Left section */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack || (() => window.history.back())}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold">{pageTitle}</h1>
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-xs ${
                                    status === 'published'
                                        ? 'text-green-600'
                                        : 'text-orange-600'
                                }`}
                            >
                                {status === 'published' ? 'Publié' : 'Brouillon'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Center section - Device preview (optional) */}
                <div className="hidden md:flex items-center gap-1 rounded-lg border p-1">
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Tablet className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onPreview}
                        className="hidden md:flex"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Aperçu
                    </Button>

                    <Button
                        variant={settingsOpen ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={onSettingsToggle}
                    >
                        <Settings className="h-4 w-4" />
                    </Button>

                    <Button
                        size="sm"
                        onClick={onSave}
                        disabled={isSubmitting}
                        className="bg-primary"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
