import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StyleConfig {
    logo: string;
    show_search: boolean;
    show_cta: boolean;
    cta_text: string;
    cta_url: string;
}

interface MenuStyleCardProps {
    styleTemplate: string;
    isSticky: boolean;
    styleConfig: StyleConfig;
    onStyleTemplateChange: (value: string) => void;
    onStickyChange: (value: boolean) => void;
    onStyleConfigChange: (config: StyleConfig) => void;
}

export function MenuStyleCard({
    styleTemplate,
    isSticky,
    styleConfig,
    onStyleTemplateChange,
    onStickyChange,
    onStyleConfigChange,
}: MenuStyleCardProps) {
    const [isOpen, setIsOpen] = useState(true);

    const updateConfig = (updates: Partial<StyleConfig>) => {
        onStyleConfigChange({ ...styleConfig, ...updates });
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Style</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-6 w-6 p-0"
                    >
                        {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            {isOpen && (
                <CardContent className="space-y-3">
                <div>
                    <Label className="text-xs">Template</Label>
                    <Select value={styleTemplate} onValueChange={onStyleTemplateChange}>
                        <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Par défaut</SelectItem>
                            <SelectItem value="logo-center-cta">Logo - Menu centré - CTA</SelectItem>
                            <SelectItem value="logo-menu">Logo - Menu aligné</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is_sticky"
                        checked={isSticky}
                        onCheckedChange={(checked) => onStickyChange(checked === true)}
                    />
                    <Label htmlFor="is_sticky" className="text-xs">
                        Menu fixe
                    </Label>
                </div>
                <div>
                    <Label className="text-xs">Logo</Label>
                    <Input
                        value={styleConfig.logo}
                        onChange={(e) => updateConfig({ logo: e.target.value })}
                        className="h-8 text-sm"
                        placeholder="CITL"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="show_cta"
                        checked={styleConfig.show_cta}
                        onCheckedChange={(checked) => updateConfig({ show_cta: checked === true })}
                    />
                    <Label htmlFor="show_cta" className="text-xs">
                        Bouton CTA
                    </Label>
                </div>
                {styleConfig.show_cta && (
                    <>
                        <Input
                            value={styleConfig.cta_text}
                            onChange={(e) => updateConfig({ cta_text: e.target.value })}
                            className="h-8 text-sm"
                            placeholder="Texte CTA"
                        />
                        <Input
                            value={styleConfig.cta_url}
                            onChange={(e) => updateConfig({ cta_url: e.target.value })}
                            className="h-8 text-sm"
                            placeholder="URL CTA"
                        />
                    </>
                )}
                </CardContent>
            )}
        </Card>
    );
}
