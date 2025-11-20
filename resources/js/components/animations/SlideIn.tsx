import { JSX, ReactNode } from 'react';
import { AnimatedContainer } from './AnimatedContainer';

interface SlideInProps {
    children: JSX.Element | ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerOnScroll?: boolean;
    className?: string;
}

export const SlideIn = ({ children, direction = 'up', duration = 1, delay = 0, stagger = 0, triggerOnScroll = true, className = '' }: SlideInProps) => {
    const animationMap = {
        up: 'slideUp',
        down: 'slideDown',
        left: 'slideLeft',
        right: 'slideRight',
    } as const;

    return (
        <AnimatedContainer
            animation={animationMap[direction]}
            duration={duration}
            delay={delay}
            stagger={stagger}
            triggerOnScroll={triggerOnScroll}
            className={className}
        >
            {children}
        </AnimatedContainer>
    );
};
