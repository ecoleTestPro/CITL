import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExternalLink, Monitor, RefreshCw, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';

interface PagePreviewProps {
    pageUrl: string;
    pageTitle: string;
    previewKey?: number;
    locale?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceWidths: Record<DeviceType, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
};

export function PagePreview({ pageUrl, pageTitle, previewKey = 0, locale }: PagePreviewProps) {
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [refreshKey, setRefreshKey] = useState(previewKey);

    // Build URL with locale parameter
    const buildUrlWithLocale = (url: string, lang?: string): string => {
        if (!lang) return url;
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set('lang', lang);
        return urlObj.toString();
    };

    const previewUrl = buildUrlWithLocale(pageUrl, locale);

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const handleOpenNewTab = () => {
        window.open(previewUrl, '_blank');
    };

    return (
        <div className="flex h-full flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Aperçu</span>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDevice('desktop')}
                        className={cn('h-7 w-7', device === 'desktop' ? 'bg-white shadow-sm dark:bg-gray-700' : 'hover:bg-transparent')}
                    >
                        <Monitor className={cn('h-3.5 w-3.5', device === 'desktop' ? 'text-primary' : 'text-gray-500')} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDevice('tablet')}
                        className={cn('h-7 w-7', device === 'tablet' ? 'bg-white shadow-sm dark:bg-gray-700' : 'hover:bg-transparent')}
                    >
                        <Tablet className={cn('h-3.5 w-3.5', device === 'tablet' ? 'text-primary' : 'text-gray-500')} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDevice('mobile')}
                        className={cn('h-7 w-7', device === 'mobile' ? 'bg-white shadow-sm dark:bg-gray-700' : 'hover:bg-transparent')}
                    >
                        <Smartphone className={cn('h-3.5 w-3.5', device === 'mobile' ? 'text-primary' : 'text-gray-500')} />
                    </Button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={handleRefresh} className="h-7 w-7 text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleOpenNewTab} className="h-7 w-7 text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Preview Container */}
            <div className="flex flex-1 items-start justify-center overflow-auto bg-gray-100 p-4 dark:bg-gray-900">
                <div
                    className={cn(
                        'h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700',
                        deviceWidths[device],
                        device !== 'desktop' && 'mx-auto',
                    )}
                >
                    <iframe
                        key={`${refreshKey}-${locale}`}
                        src={previewUrl}
                        className="h-full w-full"
                        style={{ minHeight: 'calc(100vh - 220px)' }}
                        title={pageTitle}
                    />
                </div>
            </div>
        </div>
    );
}
