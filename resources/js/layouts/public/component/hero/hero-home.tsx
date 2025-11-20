import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroHome = () => {
    const { t } = useTranslation();
    const height = '70vh';
    return (
        <div className={'container mx-auto flex items-center justify-center overflow-hidden ' + height}>
            <AnimatedGridPattern
                numSquares={50}
                maxOpacity={0.3}
                duration={2}
                className={cn('mask-[radial-gradient(600px_circle_at_center,white,transparent)]', 'inset-0 h-full w-full')}
            />
            <div className="grid w-full gap-12 px-6 lg:grid-cols-2">
                <div className="relative my-auto overflow-hidden  py-12">
                    <div className="mx-auto container px-4 md:px-5 lg:px-5">
                        <Badge variant="secondary" className="relative rounded-full border-border" asChild>
                            <Link href="/about-citl">
                                {t('hero.foundedDate')} <ArrowUpRight className="ml-1 size-4" />
                            </Link>
                        </Badge>
                        <h1 className="relative mt-6 max-w-[20ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                            {t('hero.title')}
                        </h1>
                        <p className="relative mt-6 max-w-[60ch] text-lg text-foreground/80">
                            {t('hero.description')}
                        </p>
                        <div className="relative mt-12 flex items-center gap-4">
                            <Link href="/exam-registration">
                                <Button size="lg" className="rounded-full text-base">
                                    {t('hero.registerExam')} <ArrowUpRight className="h-5! w-5!" />
                                </Button>
                            </Link>
                            <Link href="/accredited-organizations">
                                <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
                                    <CirclePlay className="h-5! w-5!" /> {t('hero.findTraining')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={height} aria-label="Hero Image">
                    <img className="h-full w-auto object-cover" src="/assets/images/hero/pexels-theo-decker-5945814.jpg" />
                </div>
            </div>
        </div>
    );
};

export default HeroHome;
