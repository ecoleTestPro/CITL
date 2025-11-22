import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';

interface AnimatedContainerProps {
    children: ReactNode;
    animation?: AnimationType;
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerOnScroll?: boolean;
    triggerStart?: string;
    className?: string;
    ease?: string;
    blur?: number; // Blur effect intensity in pixels (e.g., 8, 10, 12)
}

export const AnimatedContainer = ({
    children,
    animation = 'fadeIn',
    duration = 1,
    delay = 0,
    stagger = 0,
    triggerOnScroll = true,
    triggerStart = 'top 80%',
    className = '',
    ease = 'power3.out',
    blur,
}: AnimatedContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const element = containerRef.current;
        const children = element.children;

        // Configuration de base de l'animation
        const animationConfig: gsap.TweenVars = {
            duration,
            delay,
            ease,
            stagger: children.length > 1 ? stagger : 0,
        };

        // Configuration selon le type d'animation
        const fromConfig: gsap.TweenVars = {};

        switch (animation) {
            case 'fadeIn':
                fromConfig.opacity = 0;
                break;
            case 'slideUp':
                fromConfig.opacity = 0;
                fromConfig.y = 50;
                break;
            case 'slideDown':
                fromConfig.opacity = 0;
                fromConfig.y = -50;
                break;
            case 'slideLeft':
                fromConfig.opacity = 0;
                fromConfig.x = 50;
                break;
            case 'slideRight':
                fromConfig.opacity = 0;
                fromConfig.x = -50;
                break;
            case 'scaleIn':
                fromConfig.opacity = 0;
                fromConfig.scale = 0.8;
                break;
            case 'rotateIn':
                fromConfig.opacity = 0;
                fromConfig.rotation = -10;
                fromConfig.scale = 0.9;
                break;
        }

        // Add blur effect if specified
        if (blur !== undefined && blur > 0) {
            fromConfig.filter = `blur(${blur}px)`;
        }

        const targets = children.length > 0 ? children : element;

        if (triggerOnScroll) {
            // Définir l'état initial immédiatement
            gsap.set(targets, fromConfig);

            gsap.to(targets, {
                ...animationConfig,
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                filter: 'blur(0px)', // Clear blur on animation
                scrollTrigger: {
                    trigger: element,
                    start: triggerStart,
                    toggleActions: 'play none none none',
                },
            });
        } else {
            gsap.from(children.length > 0 ? children : element, {
                ...fromConfig,
                ...animationConfig,
            });
        }
    }, [animation, duration, delay, stagger, triggerOnScroll, triggerStart, ease, blur]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};
