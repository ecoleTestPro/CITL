import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroHome = () => {
    const { t } = useTranslation();
    const height = '70vh';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.1, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <div className={'container mx-auto flex items-center justify-center overflow-hidden ' + height}>
            <AnimatedGridPattern
                numSquares={50}
                maxOpacity={0.3}
                duration={2}
                className={cn('mask-[radial-gradient(600px_circle_at_center,white,transparent)]', 'inset-0 h-full w-full')}
            />
            <div className="grid w-full gap-12 px-6 lg:grid-cols-2">
                <motion.div
                    className="relative my-auto overflow-hidden py-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="container mx-auto px-4 md:px-5 lg:px-5">
                        <motion.div variants={badgeVariants}>
                            <Badge variant="secondary" className="relative rounded-full border-border" asChild>
                                <Link href="/about-citl">
                                    {t('hero.foundedDate')} <ArrowUpRight className="ml-1 size-4" />
                                </Link>
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="relative mt-6 max-w-[20ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
                        >
                            {t('hero.title')}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="relative mt-6 max-w-[60ch] text-lg text-foreground/80">
                            {t('hero.description')}
                        </motion.p>

                        <motion.div variants={itemVariants} className="relative mt-12 flex items-center gap-4">
                            <Link href="/exam-registration">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" className="rounded-full text-base">
                                        {t('hero.registerExam')} <ArrowUpRight className="h-5! w-5!" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/accredited-organizations">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
                                        <CirclePlay className="h-5! w-5!" /> {t('hero.findTraining')}
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className={height}
                    aria-label="Hero Image"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img className="h-full w-auto object-cover" src="/assets/images/hero/pexels-theo-decker-5945814.jpg" />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroHome;
