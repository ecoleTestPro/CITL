import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SectionSettings = () => {
    const {
        actions: { setProp },
        settings,
    } = useNode((node) => ({
        settings: node.data.props.settings,
    }));

    return (
        <div className="space-y-4">
            <Tabs defaultValue="layout">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="spacing">Espacement</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="layout" className="space-y-4">
                    {/* Width */}
                    <div>
                        <Label>Largeur</Label>
                        <Select
                            value={settings.width}
                            onValueChange={(value) =>
                                setProp((props: any) => (props.settings.width = value))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full">Pleine largeur</SelectItem>
                                <SelectItem value="boxed">Conteneur</SelectItem>
                                <SelectItem value="narrow">Étroit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Layout Type */}
                    <div>
                        <Label>Type de mise en page</Label>
                        <Select
                            value={settings.layout}
                            onValueChange={(value) =>
                                setProp((props: any) => (props.settings.layout = value))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="flex">Flexbox</SelectItem>
                                <SelectItem value="grid">Grid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Flexbox Settings */}
                    {settings.layout === 'flex' && (
                        <>
                            <div>
                                <Label>Direction</Label>
                                <Select
                                    value={settings.flexDirection}
                                    onValueChange={(value) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.flexDirection = value)
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="row">Ligne</SelectItem>
                                        <SelectItem value="column">Colonne</SelectItem>
                                        <SelectItem value="row-reverse">
                                            Ligne inversée
                                        </SelectItem>
                                        <SelectItem value="column-reverse">
                                            Colonne inversée
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Justification</Label>
                                <Select
                                    value={settings.justifyContent}
                                    onValueChange={(value) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.justifyContent = value)
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="start">Début</SelectItem>
                                        <SelectItem value="center">Centre</SelectItem>
                                        <SelectItem value="end">Fin</SelectItem>
                                        <SelectItem value="between">
                                            Espacement
                                        </SelectItem>
                                        <SelectItem value="around">
                                            Autour
                                        </SelectItem>
                                        <SelectItem value="evenly">
                                            Uniforme
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Alignement</Label>
                                <Select
                                    value={settings.alignItems}
                                    onValueChange={(value) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.alignItems = value)
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="start">Début</SelectItem>
                                        <SelectItem value="center">Centre</SelectItem>
                                        <SelectItem value="end">Fin</SelectItem>
                                        <SelectItem value="stretch">
                                            Étirer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}

                    {/* Grid Settings */}
                    {settings.layout === 'grid' && (
                        <div>
                            <Label>Nombre de colonnes</Label>
                            <Input
                                type="number"
                                value={settings.gridCols}
                                onChange={(e) =>
                                    setProp(
                                        (props: any) =>
                                            (props.settings.gridCols = parseInt(
                                                e.target.value
                                            ))
                                    )
                                }
                                min={1}
                                max={12}
                            />
                        </div>
                    )}

                    {/* Gap */}
                    <div>
                        <Label>Espacement entre éléments</Label>
                        <Input
                            value={settings.gap}
                            onChange={(e) =>
                                setProp(
                                    (props: any) => (props.settings.gap = e.target.value)
                                )
                            }
                            placeholder="1rem"
                        />
                    </div>

                    {/* Min Height */}
                    <div>
                        <Label>Hauteur minimale</Label>
                        <Input
                            value={settings.minHeight}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.minHeight = e.target.value)
                                )
                            }
                            placeholder="auto"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="spacing" className="space-y-4">
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
                                                (props.settings.padding.top =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="2rem"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Droite</Label>
                                <Input
                                    value={settings.padding.right}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.padding.right =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="1rem"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Bas</Label>
                                <Input
                                    value={settings.padding.bottom}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.padding.bottom =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="2rem"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Gauche</Label>
                                <Input
                                    value={settings.padding.left}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.padding.left =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="1rem"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Margin */}
                    <div>
                        <Label className="mb-2 block">Margin</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-xs">Haut</Label>
                                <Input
                                    value={settings.margin.top}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.margin.top =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Droite</Label>
                                <Input
                                    value={settings.margin.right}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.margin.right =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Bas</Label>
                                <Input
                                    value={settings.margin.bottom}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.margin.bottom =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <Label className="text-xs">Gauche</Label>
                                <Input
                                    value={settings.margin.left}
                                    onChange={(e) =>
                                        setProp(
                                            (props: any) =>
                                                (props.settings.margin.left =
                                                    e.target.value)
                                        )
                                    }
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                    {/* Background Type */}
                    <div>
                        <Label>Type d'arrière-plan</Label>
                        <Select
                            value={settings.background.type}
                            onValueChange={(value) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.background.type = value)
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="color">Couleur</SelectItem>
                                <SelectItem value="gradient">Dégradé</SelectItem>
                                <SelectItem value="image">Image</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Background Value */}
                    <div>
                        <Label>
                            {settings.background.type === 'color'
                                ? 'Couleur'
                                : settings.background.type === 'gradient'
                                  ? 'Dégradé CSS'
                                  : 'URL de l\'image'}
                        </Label>
                        <Input
                            value={settings.background.value}
                            onChange={(e) =>
                                setProp(
                                    (props: any) =>
                                        (props.settings.background.value =
                                            e.target.value)
                                )
                            }
                            placeholder={
                                settings.background.type === 'color'
                                    ? '#ffffff'
                                    : settings.background.type === 'gradient'
                                      ? 'linear-gradient(to right, #667eea, #764ba2)'
                                      : 'https://...'
                            }
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
