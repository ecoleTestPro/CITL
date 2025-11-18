import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    width?: number | string;
    height?: number | string;
    variant?: 'full' | 'icon' | 'text';
}

export const Logo = ({
    className,
    width = 120,
    height = 'auto',
    variant = 'full',
}: LogoProps) => {
    // Styles de base pour l'image
    const baseStyles = cn('object-contain', className);

    // Styles inline pour les dimensions
    const dimensionStyles = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    // Chemins d'image selon la variante
    const logoSrc = {
        full: '/images/logo.png',
        icon: '/images/logo-icon.png',
        text: '/images/logo-text.png',
    }[variant];

    return (
        <img
            src={logoSrc}
            alt="Logo CITL - Comité Ivoirien des Tests Logiciels"
            className={baseStyles}
            style={dimensionStyles}
            loading="eager"
        />
    );
};

export default Logo;
