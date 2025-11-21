import { FadeIn } from '@/components/animations';
import { RichText } from '@/lib/text-parser';
import { Check } from 'lucide-react';

interface OverviewItem {
    text: string;
}

interface AboutOverviewProps {
    title: string;
    description: string;
    learnTitle: string;
    items: OverviewItem[];
    imageSrc: string;
    imageAlt: string;
}

export default function AboutOverview({ title, description, learnTitle, items, imageSrc, imageAlt }: AboutOverviewProps) {
    return (
        <FadeIn delay={0.4}>
            <section className="bg-white py-6 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col-reverse items-center justify-between gap-x-10 rounded-[32px] bg-gray-100 p-2 lg:flex-row xl:gap-x-14 dark:bg-gray-800">
                        <div className="p-6 w-1/2">
                            <div className="mb-8 space-y-5">
                                <h2 className="text-3xl font-normal text-gray-900 dark:text-gray-100">
                                    <RichText text={title} />
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <RichText text={description} />
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-100">
                                    <RichText text={learnTitle} />
                                </h3>
                                <ul className="mt-4 mb-10 space-y-3">
                                    {items.map((item, index) => (
                                        <li key={index} className="flex items-center gap-x-2">
                                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-citl-orange">
                                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <RichText text={item.text} />
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <figure className="flex min-h-[300px] w-1/2 items-center overflow-hidden rounded-[20px] lg:min-h-[490px] lg:max-w-[613px]">
                            <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-cover" loading="lazy" />
                        </figure>
                    </div>
                </div>
            </section>
        </FadeIn>
    );
}
