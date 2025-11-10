import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileText,
    Search,
    Settings as SettingsIcon,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    generalSection?: React.ReactNode;
    seoSection?: React.ReactNode;
}

export function SettingsPanel({
    isOpen,
    onClose,
    generalSection,
    seoSection,
}: SettingsPanelProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-80 border-l bg-background shadow-lg">
            <div className="flex h-full flex-col">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h2 className="text-sm font-semibold">Paramètres</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="general" className="flex-1">
                    <div className="border-b px-4">
                        <TabsList className="w-full justify-start border-none bg-transparent p-0">
                            <TabsTrigger
                                value="general"
                                className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                            >
                                <FileText className="h-4 w-4" />
                                Général
                            </TabsTrigger>
                            <TabsTrigger
                                value="seo"
                                className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                            >
                                <Search className="h-4 w-4" />
                                SEO
                            </TabsTrigger>
                            <TabsTrigger
                                value="advanced"
                                className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                            >
                                <SettingsIcon className="h-4 w-4" />
                                Avancé
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="h-[calc(100vh-12rem)] overflow-y-auto">
                        <TabsContent value="general" className="p-4 space-y-4">
                            {generalSection}
                        </TabsContent>

                        <TabsContent value="seo" className="p-4 space-y-4">
                            {seoSection}
                        </TabsContent>

                        <TabsContent value="advanced" className="p-4 space-y-4">
                            <div className="text-sm text-muted-foreground">
                                Paramètres avancés à venir...
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
