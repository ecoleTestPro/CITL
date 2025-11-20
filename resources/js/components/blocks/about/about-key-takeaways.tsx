import { FadeIn, SlideIn } from '@/components/animations';
import { Button } from '@/components/ui/button';
import { RichText } from '@/lib/text-parser';
import { Link } from '@inertiajs/react';

interface Takeaway {
    number: number;
    text: string;
}

interface AboutKeyTakeawaysProps {
    title: string;
    takeaways: Takeaway[];
    conclusion: string;
    ctaText: string;
    ctaLink: string;
}

export default function AboutKeyTakeaways({ title, takeaways, conclusion, ctaText, ctaLink }: AboutKeyTakeawaysProps) {
    return (
        <FadeIn delay={0.5}>
            <section className="bg-white py-16 xl:py-19 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-normal text-gray-900 dark:text-gray-100">
                        <RichText text={title} />
                    </h2>
                    <ul className="py-6">
                        {takeaways.map((takeaway, index) => (
                            <div key={index}>
                                <li className="flex items-center gap-2 p-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-800">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-medium text-gray-900 shadow-[0_1px_2px_0_rgba(0,0,0,0.15)] dark:bg-gray-700 dark:text-gray-100">
                                            {takeaway.number}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <RichText text={takeaway.text} />
                                    </p>
                                </li>
                                {index < takeaways.length - 1 && <li className="h-px w-full bg-gray-200 dark:bg-gray-800"></li>}
                            </div>
                        ))}
                    </ul>
                    <p className="w-full max-w-3xl text-gray-600 dark:text-gray-400">
                        <RichText text={conclusion} />
                    </p>
                    <div className="mt-14">
                        <SlideIn direction="left" delay={0.4} duration={0.6} className="max-w-max">
                            <Link href={ctaLink}>
                                <Button
                                    size="lg"
                                    className="mx-auto w-full rounded-full bg-citl-orange px-8 py-6 text-lg text-white transition-all duration-300 hover:bg-citl-orange/90 md:mx-0 md:w-auto"
                                >
                                    {ctaText}
                                </Button>
                            </Link>
                        </SlideIn>
                    </div>
                </div>
            </section>
        </FadeIn>
    );
}
