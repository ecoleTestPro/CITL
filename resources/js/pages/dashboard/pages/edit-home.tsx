import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { router } from '@inertiajs/react';
import { Save, Eye, Undo } from 'lucide-react';

interface EditHomeProps {
    pageUrl: string;
    pageTitle: string;
}

export default function EditHome({ pageUrl, pageTitle }: EditHomeProps) {
    const handleSave = () => {
        // Action de sauvegarde à implémenter plus tard
        console.log('Save changes');
    };

    const handlePreview = () => {
        // Ouvrir la page dans un nouvel onglet
        window.open(pageUrl, '_blank');
    };

    const handleReset = () => {
        // Action de réinitialisation à implémenter plus tard
        console.log('Reset changes');
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        onClick={() =>
                                            router.visit('/dashboard')
                                        }
                                        className="cursor-pointer"
                                    >
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
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                    <div className="flex items-center gap-2 ml-auto">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                        >
                            <Undo className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreview}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Content Area with Iframe */}
                <div className="flex flex-1 flex-col p-4">
                    <div className="flex-1 rounded-lg border bg-background overflow-hidden">
                        <iframe
                            src={pageUrl}
                            className="w-full h-full min-h-[calc(100vh-200px)]"
                            title={pageTitle}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
