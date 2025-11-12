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

const popularIcons = [
    'Zap',
    'Heart',
    'Star',
    'Shield',
    'Globe',
    'Rocket',
    'Target',
    'Trophy',
    'Users',
    'Settings',
    'CheckCircle',
    'AlertCircle',
];

export const ServiceWidgetSettings = () => {
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

            {/* Description */}
            <div>
                <Label>Description</Label>
                <Textarea
                    value={settings.description}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.description = e.target.value)
                        )
                    }
                    rows={3}
                />
            </div>

            {/* Icon */}
            <div>
                <Label>Icône</Label>
                <Select
                    value={settings.icon}
                    onValueChange={(value) =>
                        setProp((props: any) => (props.settings.icon = value))
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {popularIcons.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                                {icon}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Icon Color */}
            <div>
                <Label>Couleur de l'icône</Label>
                <div className="flex gap-2">
                    <Input
                        type="color"
                        value={settings.iconColor}
                        onChange={(e) =>
                            setProp(
                                (props: any) => (props.settings.iconColor = e.target.value)
                            )
                        }
                        className="h-10 w-20"
                    />
                    <Input
                        value={settings.iconColor}
                        onChange={(e) =>
                            setProp(
                                (props: any) => (props.settings.iconColor = e.target.value)
                            )
                        }
                        placeholder="#667eea"
                    />
                </div>
            </div>

            {/* Icon Size */}
            <div>
                <Label>Taille de l'icône</Label>
                <Input
                    value={settings.iconSize}
                    onChange={(e) =>
                        setProp(
                            (props: any) => (props.settings.iconSize = e.target.value)
                        )
                    }
                    placeholder="48px"
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
