import { FadeIn } from '@/components/animations';
import { RichText } from '@/lib/text-parser';

interface Member {
    name: string;
    role: string;
    description: string;
    image: string;
}

interface TeamMembersProps {
    title: string;
    members: Member[];
}

export default function TeamMembers({ title, members }: TeamMembersProps) {
    return (
        <section className="bg-white py-14 md:py-16 lg:py-[88px] xl:py-[100px] dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <FadeIn delay={0.1}>
                    <h2 className="mb-10 text-center text-3xl font-normal text-gray-900 md:mb-16 md:text-4xl dark:text-gray-100">
                        <RichText text={title} />
                    </h2>
                </FadeIn>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                        <FadeIn key={index} delay={0.2 + index * 0.1}>
                            <article className="space-y-5 rounded-[20px] bg-gray-50 p-6 transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
                                {/* Photo du membre */}
                                <div className="overflow-hidden rounded-[16px]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-[280px] w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Informations du membre */}
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                                        <p className="text-sm font-medium text-citl-orange">{member.role}</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        <RichText text={member.description} />
                                    </p>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
