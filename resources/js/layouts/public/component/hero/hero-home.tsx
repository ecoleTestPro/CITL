import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, CirclePlay } from 'lucide-react';

const HeroHome = () => {
    const height = '70vh';
    return (
        <div
            className={
                'flex items-center justify-center overflow-hidden ' + height
            }
        >
            <div className="grid w-full gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
                <div className="relative my-auto overflow-hidden">
                    <AnimatedGridPattern
                        numSquares={50}
                        maxOpacity={0.3}
                        duration={2}
                        className={cn(
                            'mask-[radial-gradient(600px_circle_at_center,white,transparent)]',
                            'inset-0 h-full w-full',
                        )}
                    />
                    <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
                        <Badge
                            variant="secondary"
                            className="relative rounded-full border-border py-1"
                            asChild
                        >
                            <Link href="/about-citl">
                                Fondé le 24 octobre 2025{' '}
                                <ArrowUpRight className="ml-1 size-4" />
                            </Link>
                        </Badge>
                        <h1 className="relative mt-6 max-w-[20ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                            Comité Ivoirien des Tests Logiciels
                        </h1>
                        <p className="relative mt-6 max-w-[60ch] text-lg text-foreground/80">
                            Unique structure officielle en Côte d'Ivoire chargée
                            de représenter et de promouvoir l'ISTQB®. Nous
                            délivrons les certifications ISTQB, accréditons les
                            formateurs et participons activement aux standards
                            internationaux du testing logiciel.
                        </p>
                        <div className="relative mt-12 flex items-center gap-4">
                            <Link href="/exam-registration">
                                <Button
                                    size="lg"
                                    className="rounded-full text-base"
                                >
                                    S'inscrire à un examen{' '}
                                    <ArrowUpRight className="h-5! w-5!" />
                                </Button>
                            </Link>
                            <Link href="/accredited-organizations">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full text-base shadow-none"
                                >
                                    <CirclePlay className="h-5! w-5!" /> Trouver
                                    une formation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={height} aria-label="Hero Image">
                    <img
                        className="h-auto w-full object-cover"
                        src="/assets/images/hero/pexels-theo-decker-5945814.jpg"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroHome;
