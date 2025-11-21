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
    const cardsRef = useRef<HTMLDivElement>(null);

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
            description:
                "La certification Core Advanced - Test Automation Engineer se concentre sur l'automatisation des tests.",
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
            description:
                'La certification Core Advanced - Test Manager est destinée aux professionnels qui souhaitent occuper des postes de gestion de test.',
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
            description: "La certification CT-AT est conçue pour les testeurs travaillant dans des environnements Agiles.",
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
            description:
                "La certification CFLBA s'adresse aux analystes métier qui souhaitent acquérir des compétences en ingénierie des exigences.",
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

            // Cards animation with stagger
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('article');
                gsap.from(cards, {
                    y: 60,
                    opacity: 0,
                    filter: 'blur(10px)',
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
            <div className="container mx-auto">
                <div className="space-y-10 md:space-y-[70px]">
                    <div ref={titleRef} className="mx-auto max-w-[602px] space-y-3 text-center">
                        <span className="badge badge-green mb-5">Nos Certifications</span>
                        <h2>Catalogue des Certifications ISTQB</h2>
                        <p>Découvrez notre gamme complète de certifications reconnues internationalement pour les professionnels du test logiciel</p>
                    </div>

                    <div ref={cardsRef} className="grid grid-cols-12 gap-8">
                        {certifications.map((cert, index) => (
                            <article
                                key={cert.id}
                                className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                            >
                                <div className="space-y-11">
                                    <span className="text-tagline-2 inline-block dark:text-accent/60">{cert.step}</span>
                                    <div>
                                        <span className={`${cert.icon} text-[52px] text-secondary dark:text-accent`}></span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-heading-6 md:text-heading-5">{cert.title}</h3>
                                    <p className="text-sm font-medium text-citl-orange">{cert.subtitle}</p>
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
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
