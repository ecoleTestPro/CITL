import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ExamInfo {
    questions: number;
    passingScore: number;
    totalPoints: number;
    duration: string;
}

interface Certification {
    id: string;
    category: string;
    step: string;
    title: string;
    subtitle: string;
    description: string;
    examInfo: ExamInfo;
    icon: string;
}

function CertificationList() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const certifications: Certification[] = [
        {
            id: 'ctfl-v4',
            category: 'Core Foundation',
            step: 'Step 1',
            title: 'CTFL v4.0',
            subtitle: 'Certified Tester Foundation Level',
            description:
                "Cette certification Foundation est le niveau de base pour toutes les certifications du schéma de certifications ISTQB et couvre l'essentiel du test des logiciels tout en servant de préalable aux certifications avancées.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 40,
                duration: '60 min',
            },
            icon: 'ns-shape-35',
        },
        {
            id: 'ctal-ta-v4',
            category: 'Core Advanced',
            step: 'Step 2',
            title: 'CTAL-TA v4.0',
            subtitle: 'Certified Tester Advanced Level - Test Analyst',
            description:
                "La certification Core Advanced – Test Analyst s'adresse aux professionnels du test qui souhaitent approfondir leurs compétences en analyse des tests.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 80,
                duration: '120 min',
            },
            icon: 'ns-shape-12',
        },
        {
            id: 'ctal-tae-v2',
            category: 'Core Advanced',
            step: 'Step 3',
            title: 'CTAL-TAE v2.0',
            subtitle: 'Certified Tester Advanced Level - Test Automation Engineer',
            description: "La certification Core Advanced - Test Automation Engineer se concentre sur l'automatisation des tests.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 80,
                duration: '120 min',
            },
            icon: 'ns-shape-3',
        },
        {
            id: 'ctal-tm-v3',
            category: 'Core Advanced',
            step: 'Step 4',
            title: 'CTAL-TM v3.0',
            subtitle: 'Certified Tester Advanced Level - Test Manager',
            description: 'La certification Core Advanced - Test Manager est destinée aux professionnels qui souhaitent occuper des postes de gestion de test.',
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 80,
                duration: '120 min',
            },
            icon: 'ns-shape-35',
        },
        {
            id: 'ctal-tta',
            category: 'Core Advanced',
            step: 'Step 5',
            title: 'CTAL-TTA',
            subtitle: 'Certified Tester Advanced Level - Technical Test Analyst',
            description:
                "La certification Core Advanced - Technical Test Analyst s'adresse aux testeurs techniques qui souhaitent approfondir leurs compétences.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 80,
                duration: '120 min',
            },
            icon: 'ns-shape-12',
        },
        {
            id: 'ct-at',
            category: 'Spécialiste',
            step: 'Step 6',
            title: 'CT-AT',
            subtitle: 'Certified Tester - Agile Testing',
            description: 'La certification CT-AT est conçue pour les testeurs travaillant dans des environnements Agiles.',
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 40,
                duration: '60 min',
            },
            icon: 'ns-shape-3',
        },
        {
            id: 'ct-genai',
            category: 'Spécialiste',
            step: 'Step 7',
            title: 'CT-GenAI',
            subtitle: 'Certified Tester - Generative AI Testing',
            description: "La certification CT-GenAI se concentre sur le test des systèmes d'intelligence artificielle générative.",
            examInfo: {
                questions: 30,
                passingScore: 65,
                totalPoints: 30,
                duration: '45 min',
            },
            icon: 'ns-shape-35',
        },
        {
            id: 'ct-act',
            category: 'Spécialiste',
            step: 'Step 8',
            title: 'CT-AcT',
            subtitle: 'Certified Tester - Acceptance Testing',
            description:
                "La certification CT-AcT se concentre sur les tests d'acceptation, qui visent à vérifier que les logiciels répondent aux besoins des utilisateurs finaux.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 40,
                duration: '60 min',
            },
            icon: 'ns-shape-12',
        },
        {
            id: 'ct-pt',
            category: 'Spécialiste',
            step: 'Step 9',
            title: 'CT-PT',
            subtitle: 'Certified Tester - Performance Testing',
            description: 'La certification CT-PT est dédiée aux tests de performance.',
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 40,
                duration: '60 min',
            },
            icon: 'ns-shape-3',
        },
        {
            id: 'cflba',
            category: 'Ingénieurie des exigences',
            step: 'Step 10',
            title: 'CFLBA',
            subtitle: 'Certified Foundation Level Business Analyst',
            description: "La certification CFLBA s'adresse aux analystes métier qui souhaitent acquérir des compétences en ingénierie des exigences.",
            examInfo: {
                questions: 40,
                passingScore: 65,
                totalPoints: 40,
                duration: '60 min',
            },
            icon: 'ns-shape-35',
        },
        {
            id: 'ireb-cpre-foundation',
            category: 'Ingénieurie des exigences',
            step: 'Step 11',
            title: 'IREB CPRE Foundation',
            subtitle: 'Certified Professional for Requirements Engineering - Foundation Level',
            description: "La certification IREB CPRE Foundation est un standard international pour l'ingénierie des exigences.",
            examInfo: {
                questions: 45,
                passingScore: 70,
                totalPoints: 45,
                duration: '75 min',
            },
            icon: 'ns-shape-12',
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Background shape continuous animation
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

            // Title section animation
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

            // Category titles animation
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

            // Cards animation with stagger per category
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
    }, []);

    // Group certifications by category
    const groupedCertifications = certifications.reduce(
        (acc, cert) => {
            if (!acc[cert.category]) {
                acc[cert.category] = [];
            }
            acc[cert.category].push(cert);
            return acc;
        },
        {} as Record<string, Certification[]>,
    );

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-12 pb-6">
            {/* Animated Background Shape */}
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
                        {Object.entries(groupedCertifications).map(([category, certs]) => (
                            <div key={category}>
                                <h3 className="category-title mb-8 text-2xl font-semibold text-gray-900 md:text-3xl dark:text-gray-100">{category}</h3>
                                <div className="category-group grid grid-cols-12 gap-8">
                                    {certs.map((cert) => (
                                        <article
                                            key={cert.id}
                                            className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                                        >
                                            <div className="space-y-11">
                                                <span className="rounded bg-secondary px-1.5 py-0.5 text-xs font-medium text-white">{cert.category}</span>
                                                <div>
                                                    <span className={`${cert.icon} text-[52px] text-secondary dark:text-accent`}></span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-heading-6 md:text-heading-5">{cert.title}</h3>
                                                <p className="text-sm font-medium text-secondary">{cert.subtitle}</p>
                                                <p className="max-w-[345px]">{cert.description}</p>
                                                <div className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <p>
                                                        <strong>Questions:</strong> {cert.examInfo.questions}
                                                    </p>
                                                    <p>
                                                        <strong>Score requis:</strong> {cert.examInfo.passingScore}%
                                                    </p>
                                                    <p>
                                                        <strong>Durée:</strong> {cert.examInfo.duration}
                                                    </p>
                                                    <p>
                                                        <strong>Points totaux:</strong> {cert.examInfo.totalPoints}
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
