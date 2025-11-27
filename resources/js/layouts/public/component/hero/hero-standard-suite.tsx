import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { JSX } from 'react';

interface HeroStandardSuiteProps {
    badge?: string;
    title: string;
    description: string;
    imageFeature?: string;
    buttons: JSX.Element[];
}

const HeroStandardSuite = ({
    badge,
    title,
    description,
    imageFeature,
    buttons,
}: HeroStandardSuiteProps) => {
    return (
        <div className="flex items-center justify-center overflow-hidden">
            <div className="grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
                <div className="my-auto">
                    {badge ? (
                        <Badge
                            variant="secondary"
                            className="rounded-full border-border py-1"
                            asChild
                        >
                            <Link href="#">
                                Just released v1.0.0{' '}
                                <ArrowUpRight className="ml-1 size-4" />
                            </Link>
                        </Badge>
                    ) : (
                        ''
                    )}
                    <h1 className="mt-6 max-w-[17ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                        {title}
                    </h1>
                    {description && description != '' ? (
                        <p className="mt-6 max-w-[60ch] text-lg text-foreground/80">
                            {description}
                        </p>
                    ) : (
                        ''
                    )}
                    {buttons && buttons.length > 0 && (
                        <div className="mt-12 flex items-center gap-4">
                            <Button
                                size="lg"
                                className="rounded-full text-base"
                            >
                                Get Started{' '}
                                <ArrowUpRight className="h-5! w-5!" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full text-base shadow-none"
                            >
                                <CirclePlay className="h-5! w-5!" /> Watch Demo
                            </Button>
                        </div>
                    )}
                </div>
                {imageFeature && (
                    <div className="aspect-video w-full rounded-xl bg-accent lg:aspect-auto lg:h-[calc(40vh-4rem)] lg:w-[1000px]" />
                )}
            </div>
        </div>
    );
};

export default HeroStandardSuite;
