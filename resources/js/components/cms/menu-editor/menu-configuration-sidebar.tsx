import { useState } from 'react';
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuInformationCard } from './menu-information-card';
import { MenuStyleCard } from './menu-style-card';
import { AvailablePagesList } from './available-pages-list';

interface StyleConfig {
    logo: string;
    show_search: boolean;
    show_cta: boolean;
    cta_text: string;
    cta_url: string;
}

interface Page {
    id: number;
    title: string;
    slug: string;
}

interface MenuConfigurationSidebarProps {
    name: string;
    location: string;
    isActive: boolean;
    styleTemplate: string;
    isSticky: boolean;
    styleConfig: StyleConfig;
    availablePages: Page[];
    onNameChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onActiveChange: (value: boolean) => void;
    onStyleTemplateChange: (value: string) => void;
    onStickyChange: (value: boolean) => void;
    onStyleConfigChange: (config: StyleConfig) => void;
}

export function MenuConfigurationSidebar({
    name,
    location,
    isActive,
    styleTemplate,
    isSticky,
    styleConfig,
    availablePages,
    onNameChange,
    onLocationChange,
    onActiveChange,
    onStyleTemplateChange,
    onStickyChange,
    onStyleConfigChange,
}: MenuConfigurationSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`relative flex-shrink-0 border-r bg-gray-50 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'}`}>
            <div className="flex h-full flex-col">
                <div className="border-b bg-white p-4 flex items-center justify-between">
                    {!isCollapsed && (
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <Settings className="h-5 w-5" />
                            Configuration
                        </h2>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`h-8 w-8 p-0 ${isCollapsed ? 'mx-auto' : ''}`}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                {!isCollapsed && (
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <MenuInformationCard
                            name={name}
                            location={location}
                            isActive={isActive}
                            onNameChange={onNameChange}
                            onLocationChange={onLocationChange}
                            onActiveChange={onActiveChange}
                        />
                        <MenuStyleCard
                            styleTemplate={styleTemplate}
                            isSticky={isSticky}
                            styleConfig={styleConfig}
                            onStyleTemplateChange={onStyleTemplateChange}
                            onStickyChange={onStickyChange}
                            onStyleConfigChange={onStyleConfigChange}
                        />
                        <AvailablePagesList pages={availablePages} />
                    </div>
                )}
            </div>
        </div>
    );
}
