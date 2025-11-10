import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuInformationCardProps {
    name: string;
    location: string;
    isActive: boolean;
    onNameChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onActiveChange: (value: boolean) => void;
}

export function MenuInformationCard({
    name,
    location,
    isActive,
    onNameChange,
    onLocationChange,
    onActiveChange,
}: MenuInformationCardProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Informations</CardTitle>
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
                        <Label htmlFor="name" className="text-xs">
                            Nom
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className="h-8 text-sm"
                        />
                    </div>
                    <div>
                        <Label htmlFor="location" className="text-xs">
                            Emplacement
                        </Label>
                        <Select value={location} onValueChange={onLocationChange}>
                            <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="header">En-tête</SelectItem>
                                <SelectItem value="footer">Pied de page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            checked={isActive}
                            onCheckedChange={(checked) => onActiveChange(checked === true)}
                        />
                        <Label htmlFor="is_active" className="text-xs">
                            Actif
                        </Label>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
