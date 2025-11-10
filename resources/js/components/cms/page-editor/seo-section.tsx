import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SeoSectionProps {
    seoTitle: string;
    seoDescription: string;
    onSeoTitleChange: (value: string) => void;
    onSeoDescriptionChange: (value: string) => void;
}

export function SeoSection({
    seoTitle,
    seoDescription,
    onSeoTitleChange,
    onSeoDescriptionChange,
}: SeoSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="seo_title" className="text-xs font-medium uppercase text-muted-foreground">
                    Titre SEO
                </Label>
                <Input
                    id="seo_title"
                    value={seoTitle}
                    onChange={(e) => onSeoTitleChange(e.target.value)}
                    className="mt-2"
                    placeholder="Optimisé pour les moteurs de recherche"
                    maxLength={60}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                    {seoTitle.length}/60 caractères
                </p>
            </div>

            <div>
                <Label htmlFor="seo_description" className="text-xs font-medium uppercase text-muted-foreground">
                    Description SEO
                </Label>
                <Textarea
                    id="seo_description"
                    value={seoDescription}
                    onChange={(e) => onSeoDescriptionChange(e.target.value)}
                    className="mt-2"
                    placeholder="Description qui apparaîtra dans les résultats de recherche"
                    maxLength={160}
                    rows={3}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                    {seoDescription.length}/160 caractères
                </p>
            </div>
        </div>
    );
}
