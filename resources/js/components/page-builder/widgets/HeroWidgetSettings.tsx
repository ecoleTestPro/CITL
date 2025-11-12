import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const HeroWidgetSettings = () => {
    const {
        actions: { setProp },
        settings,
    } = useNode((node) => ({
        settings: node.data.props.settings,
    }));

    return (
        <div className="space-y-4">
            {/* Title */}
            <div>
                <Label>Titre</Label>
                <Input
                    value={settings.title}
                    onChange={(e) =>
                        setProp((props: any) => (props.settings.title = e.target.value))
                    }
                />
            </div>

            {/* Subtitle */}
            <div>
                <Label>Sous-titre</Label>
                <Textarea
                    value={settings.subtitle}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.subtitle = e.target.value)
                        )
                    }
                    rows={2}
                />
            </div>

            {/* Button Text */}
            <div>
                <Label>Texte du bouton</Label>
                <Input
                    value={settings.buttonText}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.buttonText = e.target.value)
                        )
                    }
                />
            </div>

            {/* Button Link */}
            <div>
                <Label>Lien du bouton</Label>
                <Input
                    value={settings.buttonLink}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.buttonLink = e.target.value)
                        )
                    }
                    placeholder="#"
                />
            </div>

            {/* Background Image */}
            <div>
                <Label>Image de fond (URL)</Label>
                <Input
                    value={settings.backgroundImage || ''}
                    onChange={(e) =>
                        setProp(
                            (props: any) =>
                                (props.settings.backgroundImage = e.target.value)
                        )
                    }
                    placeholder="https://..."
                />
            </div>

            {/* Text Align */}
            <div>
                <Label>Alignement du texte</Label>
                <Select
                    value={settings.textAlign}
                    onValueChange={(value) =>
                        setProp((props: any) => (props.settings.textAlign = value))
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Gauche</SelectItem>
                        <SelectItem value="center">Centre</SelectItem>
                        <SelectItem value="right">Droite</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Title Size */}
            <div>
                <Label>Taille du titre</Label>
                <Input
                    value={settings.titleSize}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.titleSize = e.target.value)
                        )
                    }
                    placeholder="3rem"
                />
            </div>

            {/* Subtitle Size */}
            <div>
                <Label>Taille du sous-titre</Label>
                <Input
                    value={settings.subtitleSize}
                    onChange={(e) =>
                        setProp(
                            (props: any) =>
                                (props.settings.subtitleSize = e.target.value)
                        )
                    }
                    placeholder="1.25rem"
                />
            </div>

            {/* Padding */}
            <div>
                <Label className="mb-2 block">Padding</Label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label className="text-xs">Haut</Label>
                        <Input
                            value={settings.padding.top}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.padding.top = e.target.value)
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Droite</Label>
                        <Input
                            value={settings.padding.right}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.padding.right = e.target.value)
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Bas</Label>
                        <Input
                            value={settings.padding.bottom}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.padding.bottom = e.target.value)
                                )
                            }
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Gauche</Label>
                        <Input
                            value={settings.padding.left}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.padding.left = e.target.value)
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
