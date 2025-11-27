import { FadeIn } from '@/components/animations';
import { Check } from 'lucide-react';
import { RichText } from '@/lib/text-parser';

interface Mission {
    text: string;
}

interface MissionsListProps {
    badge?: string;
    title: string;
    description: string;
    missions: Mission[];
}

export default function MissionsList({ badge, title, description, missions }: MissionsListProps) {
    return (
        <section className="py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
            <div className="container mx-auto px-4">
                <article className="space-y-10 md:space-y-[70px]">
                    <FadeIn delay={0.1}>
                        <h3 className="mb-3 text-2xl font-normal text-gray-900 md:text-3xl dark:text-gray-100">
                            <RichText text={title} />
                        </h3>
                        <p className="mb-8 text-gray-600 dark:text-gray-400">
                            <RichText text={description} />
                        </p>

                        <ul className="space-y-4">
                            {missions.map((mission, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-gray-600 before:relative before:mt-1 before:inline-block before:size-5 before:shrink-0 dark:text-gray-400"
                                >
                                    <span className="relative mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-citl-orange">
                                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                    </span>
                                    <span className="flex-1">
                                        <RichText text={mission.text} />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </article>
            </div>
        </section>
    );
}
