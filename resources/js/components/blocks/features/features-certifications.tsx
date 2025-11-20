import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookCheck, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesCertifications = () => {
    const { t } = useTranslation();

    const certificationSteps = [
        {
            icon: BookCheck,
            title: t('home.how_to_certify'),
            description: t('home.how_to_certify_desc'),
            link: '/why-certification',
        },
        {
            icon: ClipboardCheck,
            title: t('home.find_training'),
            description: t('home.find_training_desc'),
            link: '/find-a-training-provider',
        },
    ];

    return (
        <div className="bg-background py-12">
            <div className="mx-auto container px-6">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <div className="mb-12 text-left">
                            <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.2]">
                                {t('home.develop_skills_title')}
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                                <strong>
                                    {t('home.istqb_intro')}
                                </strong>
                                , {t('home.istqb_description')}
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
                                        <div className="px-4">
                                            <Button variant={'secondary'}>
                                                {t('home.learn_more_btn')}
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
