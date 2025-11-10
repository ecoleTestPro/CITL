import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface GeneralInfoSectionProps {
    title: string;
    status: 'draft' | 'published';
    onTitleChange: (value: string) => void;
    onStatusChange: (value: 'draft' | 'published') => void;
    titleError?: string;
}

export function GeneralInfoSection({
    title,
    status,
    onTitleChange,
    onStatusChange,
    titleError,
}: GeneralInfoSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="title" className="text-xs font-medium uppercase text-muted-foreground">
                    Titre de la page
                </Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    required
                    className="mt-2"
                    placeholder="Entrez le titre de votre page"
                />
                {titleError && (
                    <p className="mt-1 text-sm text-destructive">
                        {titleError}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="status" className="text-xs font-medium uppercase text-muted-foreground">
                    Statut de publication
                </Label>
                <Select
                    value={status}
                    onValueChange={(value) =>
                        onStatusChange(value as 'draft' | 'published')
                    }
                >
                    <SelectTrigger className="mt-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                Brouillon
                            </div>
                        </SelectItem>
                        <SelectItem value="published">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Publié
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
