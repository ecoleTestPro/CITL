import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
    id: number;
    title: string;
    slug: string;
    subtitle: string | null;
    description: string;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string | null;
    image: string | null;
    order: number;
    is_active: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    order: number;
    is_active: boolean;
    active_certifications: Certification[];
}

interface ApiResponse {
    success: boolean;
    data: Category[];
}

function CertificationList() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axios.get<ApiResponse>('/api/certifications');
                if (response.data.success) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching certifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    useEffect(() => {
        if (!sectionRef.current || loading) return;

        const ctx = gsap.context(() => {
            const bgShape = sectionRef.current?.querySelector('.bg-shape-animate');
            if (bgShape) {
                gsap.to(bgShape, {
                    y: '+=30',
                    x: '+=20',
                    rotation: '+=5',
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }

            if (titleRef.current) {
                const badge = titleRef.current.querySelector('.badge');
                const heading = titleRef.current.querySelector('h2');
                const paragraph = titleRef.current.querySelector('p');

                if (badge) {
                    gsap.from(badge, {
                        y: 30,
                        opacity: 0,
                        filter: 'blur(8px)',
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 80%',
                        },
                    });
                }

                if (heading) {
                    gsap.from(heading, {
                        y: 40,
                        opacity: 0,
                        filter: 'blur(10px)',
                        duration: 1,
                        delay: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 80%',
                        },
                    });
                }

                if (paragraph) {
                    gsap.from(paragraph, {
                        y: 30,
                        opacity: 0,
                        filter: 'blur(8px)',
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 80%',
                        },
                    });
                }
            }

            const categoryTitles = sectionRef.current?.querySelectorAll('.category-title') ?? [];
            categoryTitles.forEach((title) => {
                gsap.from(title, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                    },
                });
            });

            const categoryGroups = sectionRef.current?.querySelectorAll('.category-group') ?? [];
            categoryGroups.forEach((group) => {
                const cards = group.querySelectorAll('article');
                gsap.from(cards, {
                    y: 60,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: group,
                        start: 'top 80%',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading]);

    if (loading) {
        return (
            <section className="relative overflow-hidden pt-12 pb-6">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-secondary"></div>
                            <p className="text-gray-600 dark:text-gray-400">Chargement des certifications...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-12 pb-6">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="bg-shape-animate absolute -top-20 -right-20 opacity-5 dark:opacity-[0.02]">
                    <img src="/assets/images/bg/sharp-3.png" alt="Background shape" className="h-auto w-auto max-w-none" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto">
                <div className="space-y-10 md:space-y-[70px]">
                    <div ref={titleRef} className="space-y-3 text-left">
                        <span className="badge badge-green mb-5 text-2xl font-semibold text-gray-900 md:text-3xl dark:text-gray-100">Certifications</span>
                    </div>

                    <div className="space-y-16">
                        {categories.map((category) => (
                            <div key={category.id}>
                                <h3 className="category-title mb-8 text-2xl font-semibold text-gray-900 md:text-3xl dark:text-gray-100">{category.name}</h3>
                                <div className="category-group grid grid-cols-12 gap-8">
                                    {category.active_certifications.map((cert) => (
                                        <article
                                            key={cert.id}
                                            className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                                        >
                                            <div className="space-y-11">
                                                <span className="rounded bg-secondary px-1.5 py-0.5 text-xs font-medium text-white">{category.name}</span>
                                                <div>
                                                    <span className={`${cert.icon} text-[52px] text-secondary dark:text-accent`}></span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-heading-6 md:text-heading-5">{cert.title}</h3>
                                                {cert.subtitle && <p className="text-sm font-medium text-secondary">{cert.subtitle}</p>}
                                                <p className="max-w-[345px]">{cert.description}</p>
                                                <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <p>
                                                        <strong>Questions:</strong> {cert.exam_questions}
                                                    </p>
                                                    <p>
                                                        <strong>Score requis:</strong> {cert.exam_passing_score}%
                                                    </p>
                                                    <p>
                                                        <strong>Durée:</strong> {cert.exam_duration}
                                                    </p>
                                                    <p>
                                                        <strong>Points totaux:</strong> {cert.exam_total_points}
                                                    </p>
                                                </div>
                                                <div className="pt-4">
                                                    <a
                                                        href="#"
                                                        className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary/90 hover:shadow-md"
                                                    >
                                                        Voir les détails
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
