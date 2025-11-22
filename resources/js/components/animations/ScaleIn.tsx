import { ReactNode } from 'react';
import { AnimatedContainer } from './AnimatedContainer';

interface ScaleInProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    stagger?: number;
    triggerOnScroll?: boolean;
    className?: string;
    blur?: number;
}

export const ScaleIn = ({ children, duration = 1, delay = 0, stagger = 0, triggerOnScroll = true, className = '', blur }: ScaleInProps) => {
    return (
        <AnimatedContainer animation="scaleIn" duration={duration} delay={delay} stagger={stagger} triggerOnScroll={triggerOnScroll} className={className} blur={blur}>
            {children}
        </AnimatedContainer>
    );
};
