import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface PartnerTierHeaderProps {
    name: string;
    icon: string | null;
    color: string;
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

// Helper to determine if color is light or dark
function isLightColor(hex: string): boolean {
    const rgb = hexToRgb(hex);
    if (!rgb) return true;
    // Using relative luminance formula
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5;
}

export default function PartnerTierHeader({ name, icon, color }: PartnerTierHeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);

    const rgb = hexToRgb(color);
    const isLight = isLightColor(color);

    // Text color for badge - white on dark colors, dark on light colors
    const badgeTextColor = isLight ? '#1f2937' : '#ffffff';

    // Generate background color based on theme
    const getBgColor = (darkMode: boolean) => {
        if (!rgb) return darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 1)';
        return darkMode ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)` : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
    };

    useEffect(() => {
        // Check initial dark mode
        const checkDarkMode = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        checkDarkMode();

        // Observe changes to the html element's class
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!headerRef.current) return;

        const ctx = gsap.context(() => {
            const badge = headerRef.current?.querySelector('[data-ns-animate="tier-badge"]');
            const title = headerRef.current?.querySelector('[data-ns-animate="tier-title"]');

            if (badge) {
                gsap.fromTo(
                    badge,
                    { opacity: 0, y: 30, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }

            if (title) {
                gsap.fromTo(
                    title,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    },
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={headerRef}
            className="mb-8 rounded-2xl px-6 py-10 text-center md:mb-[52px] md:px-12 md:py-14"
            style={{ backgroundColor: getBgColor(isDark) }}
        >
            <span
                data-ns-animate="tier-badge"
                className="mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm"
                style={{ backgroundColor: color, color: badgeTextColor }}
            >
                {icon && <span className="text-base">{icon}</span>}
                {name}
            </span>
            <h2 data-ns-animate="tier-title" className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
                {name}
            </h2>
        </div>
    );
}
