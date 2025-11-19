import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookCheck, ClipboardCheck } from 'lucide-react';

const certificationSteps = [
    {
        icon: BookCheck,
        title: 'Comment obtenir la certification ?',
        description:
            "Découvrez les informations clés et téléchargez les programmes et exemples d'examens dans notre base de connaissances gratuite. ",
        link: '/why-certification',
    },
    {
        icon: ClipboardCheck,
        title: 'Trouver une formation agréée',
        description:
            "Identifiez les prestataires d'examens dans votre région qui proposent l'examen de certification que vous avez sélectionné.",
        link: '/find-a-training-provider',
    },
];

const FeaturesCertifications = () => {
    return (
        <div className="bg-background py-24">
            <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <div className="mb-12 text-left">
                            <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.2]">
                                Développez vos compétences en matière de tests
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                                <strong>
                                    L'ISTQB® International Software Testing
                                    Qualifications Board
                                </strong>
                                , fondée en 1998, est la référence mondiale en
                                certification en testing logiciel. Depuis ses
                                débuts, le programme Certified Tester de
                                l'ISTQB® a grandement contribué à
                                professionnaliser le domaine du test logiciel,
                                en établissant des standards reconnus
                                internationalement. Elle a pour mission de
                                soutenir la communauté des testeurs et de
                                promouvoir la qualité du logiciel à l’échelle
                                globale.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="mx-auto grid w-full gap-6 md:grid-cols-2">
                            {certificationSteps.map((step, index) => (
                                <Card
                                    key={step.title}
                                    className="flex flex-col overflow-hidden rounded-xl border shadow-none"
                                >
                                    <CardHeader>
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <step.icon className="h-6 w-6" />
                                        </div>
                                        <h4 className="mt-3! text-xl font-semibold tracking-tight text-foreground">
                                            {step.title}
                                        </h4>
                                        <p className="mt-1 text-[17px] text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="mt-auto px-0 pb-0">
                                        {/* <div className="ml-6 h-40 rounded-tl-xl bg-gradient-to-br from-primary/5 to-secondary/5"></div> */}

                                        <div className="px-4">
                                            <Button variant={'secondary'}>
                                                En savoir plus
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesCertifications;
