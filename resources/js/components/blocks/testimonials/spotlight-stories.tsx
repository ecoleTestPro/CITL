import { FadeIn, SlideIn } from '@/components/animations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Author {
    name: string;
    role: string;
    avatar: string;
}

interface Story {
    type: 'testimonial' | 'case-study' | 'stat';
    logo?: string;
    quote?: string;
    author?: Author;
    badge?: string;
    badgeVariant?: 'default' | 'dark';
    ctaText?: string;
    ctaLink?: string;
    statNumber?: string;
    statDescription?: string;
    backgroundColor?: 'default' | 'green' | 'dark';
    delay?: number;
}

interface SpotlightStoriesProps {
    title: string;
    subtitle: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    stories: Story[][];
}

export default function SpotlightStories({
    title,
    subtitle,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
    stories,
}: SpotlightStoriesProps) {
    const getBackgroundColor = (bg?: string) => {
        switch (bg) {
            case 'green':
                return 'bg-green-500';
            case 'dark':
                return 'bg-gray-900 dark:bg-gray-800';
            default:
                return 'bg-gray-100 dark:bg-gray-800';
        }
    };

    const getTextColor = (bg?: string) => {
        switch (bg) {
            case 'green':
            case 'dark':
                return 'text-white';
            default:
                return 'text-gray-900 dark:text-gray-100';
        }
    };

    const renderStory = (story: Story, index: number) => {
        const bgColor = getBackgroundColor(story.backgroundColor);
        const textColor = getTextColor(story.backgroundColor);

        // Testimonial card
        if (story.type === 'testimonial' && story.author) {
            return (
                <FadeIn key={index} delay={story.delay || 0.1}>
                    <div className={`rounded-xl p-6 xl:max-w-[316px] ${bgColor}`}>
                        {story.logo && (
                            <figure>
                                <img src={story.logo} alt="Company logo" className="h-8" />
                            </figure>
                        )}
                        <p className={`${story.logo ? 'pt-16' : 'pt-6'} pb-8 ${textColor}`}>{story.quote}</p>
                        <figure className="flex items-center gap-3">
                            <img
                                src={story.author.avatar}
                                className="size-11 rounded-full object-cover object-center"
                                alt={`${story.author.name}'s avatar`}
                                width="44"
                                height="44"
                                loading="lazy"
                            />
                            <div>
                                <h3 className={`text-lg leading-[1.5] font-semibold ${textColor}`}>{story.author.name}</h3>
                                <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{story.author.role}</p>
                            </div>
                        </figure>
                    </div>
                </FadeIn>
            );
        }

        // Case study card
        if (story.type === 'case-study') {
            return (
                <FadeIn key={index} delay={story.delay || 0.2}>
                    <div className={`rounded-xl p-6 xl:max-w-[316px] ${bgColor}`}>
                        {story.badge && (
                            <Badge
                                variant={story.badgeVariant === 'dark' ? 'secondary' : 'default'}
                                className="rounded-full bg-gray-200 px-5 py-1.5 text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            >
                                {story.badge}
                            </Badge>
                        )}
                        <p className={`pt-16 pb-8 ${textColor}`}>{story.quote}</p>
                        {story.ctaText && story.ctaLink && (
                            <div className="w-[90%] md:w-auto">
                                <Link href={story.ctaLink}>
                                    <Button
                                        className={`w-full rounded-full px-6 py-3 transition-all duration-300 md:w-auto ${
                                            story.backgroundColor === 'dark'
                                                ? 'bg-white text-gray-900 hover:bg-gray-100'
                                                : 'bg-citl-orange text-white hover:bg-citl-orange/90'
                                        }`}
                                    >
                                        {story.ctaText}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </FadeIn>
            );
        }

        // Stat card
        if (story.type === 'stat') {
            return (
                <FadeIn key={index} delay={story.delay || 0.3}>
                    <div className={`space-y-3 rounded-xl p-6 xl:max-w-[316px] ${bgColor}`}>
                        <h2 className="pt-6 text-4xl leading-[110%] font-light text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl dark:text-gray-100">
                            {story.statNumber}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">{story.statDescription}</p>
                    </div>
                </FadeIn>
            );
        }

        return null;
    };

    return (
        <section className="py-12 md:py-18 lg:pb-24 xl:py-28" aria-label="spotlight stories section">
            <div className="container mx-auto space-y-17.5 px-4">
                {/* Header */}
                <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:justify-between md:space-y-0">
                    <div>
                        <FadeIn delay={0.1}>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
                        </FadeIn>
                    </div>

                    {/* CTA Buttons */}
                    <ul className="flex flex-col items-center justify-start gap-x-4 gap-y-3 max-md:w-full md:flex-row md:gap-y-0">
                        <li className="w-[90%] md:w-auto">
                            <SlideIn direction="left" delay={0.3} duration={0.6}>
                                <Link href={primaryCtaLink}>
                                    <Button className="mx-auto w-full rounded-full bg-citl-orange px-6 py-3 text-lg text-white transition-all duration-300 hover:bg-citl-orange/90 md:mx-0 md:w-auto">
                                        {primaryCtaText}
                                    </Button>
                                </Link>
                            </SlideIn>
                        </li>
                        <li className="w-[90%] list-none md:w-auto">
                            <SlideIn direction="left" delay={0.4} duration={0.6}>
                                <Link href={secondaryCtaLink}>
                                    <Button
                                        variant="outline"
                                        className="mx-auto w-full rounded-full border-2 px-6 py-3 text-lg transition-all duration-300 hover:bg-gray-100 md:mx-0 md:w-auto dark:hover:bg-gray-800"
                                    >
                                        {secondaryCtaText}
                                    </Button>
                                </Link>
                            </SlideIn>
                        </li>
                    </ul>
                </div>

                {/* Stories Grid */}
                <article className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-2">
                    {stories.map((column, columnIndex) => (
                        <div key={columnIndex} className="max-w-full space-y-5 max-lg:w-full lg:space-y-2">
                            {column.map((story, storyIndex) => renderStory(story, storyIndex))}
                        </div>
                    ))}
                </article>
            </div>
        </section>
    );
}
