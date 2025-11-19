import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Textarea } from '@headlessui/react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Eye, Loader2, Save, Undo } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditHomeProps {
    pageUrl: string;
    pageTitle: string;
    pageName: string;
}

interface Translations {
    [locale: string]: {
        [key: string]: string;
    };
}

export default function EditHome({ pageUrl, pageTitle, pageName }: EditHomeProps) {
    const [translations, setTranslations] = useState<Translations>({});
    const [selectedLocale, setSelectedLocale] = useState('fr');
    const [availableLocales, setAvailableLocales] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        loadTranslations();
    }, [pageName]);

    const loadTranslations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/dashboard/pages/${pageName}/translations`);
            setTranslations(response.data.data.translations);
            setAvailableLocales(response.data.data.locales);
        } catch (error) {
            console.error('Failed to load translations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.post('/dashboard/pages/translations', {
                locale: selectedLocale,
                translations: translations[selectedLocale],
            });

            // Reload iframe to show updated content
            setIframeKey((prev) => prev + 1);

            alert('Translations saved successfully!');
        } catch (error) {
            console.error('Failed to save translations:', error);
            alert('Failed to save translations');
        } finally {
            setSaving(false);
        }
    };

    const handlePreview = () => {
        window.open(pageUrl, '_blank');
    };

    const handleReset = () => {
        loadTranslations();
    };

    const handleTranslationChange = (key: string, value: string) => {
        setTranslations((prev) => ({
            ...prev,
            [selectedLocale]: {
                ...prev[selectedLocale],
                [key]: value,
            },
        }));
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex w-full items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink onClick={() => router.visit('/dashboard')} className="cursor-pointer">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink>Pages</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="locale-select" className="text-sm">
                            Language:
                        </Label>
                        <Select value={selectedLocale} onValueChange={setSelectedLocale}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {availableLocales.map((locale) => (
                                    <SelectItem key={locale} value={locale}>
                                        {locale.toUpperCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleReset} disabled={loading}>
                            <Undo className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                        <Button variant="outline" size="sm" onClick={handlePreview}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 gap-4 p-4">
                    {/* Translation Editor */}
                    <div className="flex max-h-[calc(100vh-200px)] w-1/2 flex-col gap-4 overflow-auto">
                        <h3 className="text-lg font-semibold">Edit Translations ({selectedLocale.toUpperCase()})</h3>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {translations[selectedLocale] &&
                                    Object.entries(translations[selectedLocale]).map(([key, value]) => (
                                        <div key={key} className="space-y-2 rounded-lg border p-4">
                                            <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                                                {key}
                                            </Label>
                                            {value.length > 100 ? (
                                                <Textarea
                                                    id={key}
                                                    value={value}
                                                    onChange={(e) => handleTranslationChange(key, e.target.value)}
                                                    rows={4}
                                                    className="resize-none"
                                                />
                                            ) : (
                                                <Input id={key} value={value} onChange={(e) => handleTranslationChange(key, e.target.value)} />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Preview Iframe */}
                    <div className="flex w-1/2 flex-col">
                        <h3 className="mb-4 text-lg font-semibold">Live Preview</h3>
                        <div className="flex-1 overflow-hidden rounded-lg border bg-background">
                            <iframe key={iframeKey} src={pageUrl} className="h-full min-h-[calc(100vh-250px)] w-full" title={pageTitle} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
