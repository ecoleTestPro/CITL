import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ColorShowcase() {
    return (
        <div className="container mx-auto space-y-8 px-4 py-16">
            <div className="text-center">
                <h2 className="mb-2 text-3xl font-bold text-citl-anthracite dark:text-white">
                    Palette de couleurs CITL
                </h2>
                <p className="text-muted-foreground">
                    Les couleurs officielles du Comité Ivoirien des Tests
                    Logiciels
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Orange CITL */}
                <Card>
                    <CardHeader>
                        <div className="mb-4 h-32 rounded-lg bg-citl-orange" />
                        <CardTitle className="text-citl-orange">
                            Orange CITL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">HEX</p>
                            <p className="font-mono text-sm text-muted-foreground">
                                #E36C19
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Utilisation</p>
                            <p className="text-sm text-muted-foreground">
                                Actions principales, boutons CTA
                            </p>
                        </div>
                        <Button className="w-full bg-citl-orange hover:bg-citl-orange/90">
                            Exemple de bouton
                        </Button>
                    </CardContent>
                </Card>

                {/* Vert CITL */}
                <Card>
                    <CardHeader>
                        <div className="mb-4 h-32 rounded-lg bg-citl-green" />
                        <CardTitle className="text-citl-green">
                            Vert CITL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">HEX</p>
                            <p className="font-mono text-sm text-muted-foreground">
                                #2E9E43
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Utilisation</p>
                            <p className="text-sm text-muted-foreground">
                                Succès, validations, certifications
                            </p>
                        </div>
                        <Button className="w-full bg-citl-green hover:bg-citl-green/90">
                            Exemple de bouton
                        </Button>
                    </CardContent>
                </Card>

                {/* Anthracite CITL */}
                <Card>
                    <CardHeader>
                        <div className="mb-4 h-32 rounded-lg bg-citl-anthracite" />
                        <CardTitle className="text-citl-anthracite dark:text-white">
                            Anthracite CITL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">HEX</p>
                            <p className="font-mono text-sm text-muted-foreground">
                                #2B2B2B
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Utilisation</p>
                            <p className="text-sm text-muted-foreground">
                                Structure, textes, bordures
                            </p>
                        </div>
                        <Button className="w-full bg-citl-anthracite hover:bg-citl-anthracite/90">
                            Exemple de bouton
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Exemples de combinaisons */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-citl-anthracite dark:text-white">
                    Exemples de combinaisons
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Card avec bordure orange */}
                    <Card className="border-l-4 border-citl-orange">
                        <CardHeader>
                            <CardTitle className="text-citl-orange">
                                Alerte importante
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Exemple de card avec bordure orange pour
                                attirer l'attention
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card avec bordure verte */}
                    <Card className="border-l-4 border-citl-green">
                        <CardHeader>
                            <CardTitle className="text-citl-green">
                                Succès
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Exemple de card avec bordure verte pour les
                                validations
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Gradient showcase */}
                <div className="space-y-2">
                    <div className="h-24 rounded-lg bg-gradient-to-r from-citl-orange to-citl-green p-6">
                        <h4 className="text-2xl font-bold text-white">
                            Gradient Orange vers Vert
                        </h4>
                    </div>
                    <div className="h-24 rounded-lg bg-gradient-to-br from-citl-orange/20 to-citl-green/20 p-6">
                        <h4 className="text-xl font-semibold text-citl-anthracite dark:text-white">
                            Gradient subtil avec transparence
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
