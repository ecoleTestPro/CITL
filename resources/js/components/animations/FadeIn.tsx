import { ReactNode } from 'react';
import { AnimatedContainer } from './AnimatedContainer';

interface FadeInProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerOnScroll?: boolean;
    className?: string;
}

export const FadeIn = ({ children, duration = 1, delay = 0, stagger = 0, triggerOnScroll = true, className = '' }: FadeInProps) => {
    return (
        <AnimatedContainer animation="fadeIn" duration={duration} delay={delay} stagger={stagger} triggerOnScroll={triggerOnScroll} className={className}>
            {children}
        </AnimatedContainer>
    );
};
