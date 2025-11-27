import { AnimatedButton } from '@/components/ui/animated-button';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroHome = () => {
    const { t } = useTranslation();

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
        <div className={'container mx-auto flex items-center justify-center overflow-hidden min-h-[70vh] py-8 lg:py-0'}>
            <div className="grid w-full gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
                <motion.div className="relative my-auto overflow-hidden py-6 lg:py-12" variants={containerVariants} initial="hidden" animate="visible">
                    <AnimatedGridPattern
                        numSquares={50}
                        maxOpacity={0.3}
                        duration={2}
                        className={cn('mask-[radial-gradient(600px_circle_at_center,white,transparent)]', 'inset-0 h-full w-full')}
                    />
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
                            className="relative mt-4 max-w-[20ch] text-3xl leading-[1.2]! font-semibold tracking-tighter sm:mt-6 sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
                        >
                            {t('hero.title')}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="relative mt-4 max-w-[60ch] text-base text-foreground/80 sm:mt-6 sm:text-lg">
                            {t('hero.description')}
                        </motion.p>

                        <motion.div variants={itemVariants} className="relative mt-8 flex flex-col items-start gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
                            <Link href="/exam-registration" className="w-full sm:w-auto">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <AnimatedButton className="w-full rounded-full sm:w-auto">
                                        <span className="flex items-center justify-center gap-2">
                                            {t('hero.registerExam')} <ArrowUpRight className="h-5! w-5!" />
                                        </span>
                                    </AnimatedButton>
                                </motion.div>
                            </Link>
                            <Link href="/why-certification" className="w-full sm:w-auto">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <AnimatedButton variant="primaryOutlined" className="w-full rounded-full bg-white shadow-none sm:w-auto">
                                        <span className="flex items-center justify-center gap-2">
                                            <Trophy className="h-5! w-5!" /> {t('hero.findCertification')}
                                        </span>
                                    </AnimatedButton>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div className="hidden h-[50vh] lg:block lg:h-[70vh]" aria-label="Hero Image" variants={imageVariants} initial="hidden" animate="visible">
                    <img className="h-full w-full rounded-2xl object-cover" src="/assets/images/hero/hero-bg-01.jpg" alt={t('hero.imageAlt', 'CITL - Certification ISTQB')} />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroHome;
