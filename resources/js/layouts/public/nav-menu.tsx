import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Box, Button, Grid, ListItemText, Menu, MenuList, MenuItem as MuiMenuItem, Paper, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types pour la structure du menu
interface MenuItem {
    label: string;
    href: string;
    description?: string;
    image?: string;
}

interface MenuSection {
    title: string;
    type: 'dropdown' | 'link' | 'mega';
    href?: string;
    items?: MenuItem[];
    gridCols?: number;
    featured?: MenuItem;
    image?: string;
}

interface NavMenuProps {
    mobile?: boolean;
    onNavigate?: () => void;
}

const NavMenu = ({ mobile = false, onNavigate }: NavMenuProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
    const { t } = useTranslation();

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, menuKey: string) => {
        setAnchorEl((prev) => ({ ...prev, [menuKey]: event.currentTarget }));
    };

    const handleMenuClose = (menuKey: string) => {
        setAnchorEl((prev) => ({ ...prev, [menuKey]: null }));
    };

    // Configuration du menu traduite - Partie gauche (navigation principale)
    const menuLeft: MenuSection[] = [
        {
            title: t('nav.citl'),
            type: 'dropdown',
            items: [
                { label: t('nav.about_istqb'), href: '/about-istqb' },
                { label: t('nav.about_citl'), href: '/about-citl' },
                { label: t('nav.vision'), href: '/vision' },
                { label: t('nav.missions'), href: '/missions' },
                { label: t('nav.executive_board'), href: '/executive-board' },
            ],
        },
        {
            title: t('nav.membership'),
            type: 'dropdown',
            items: [
                { label: t('nav.members'), href: '/members' },
                { label: t('nav.working_groups'), href: '/working-groups' },
            ],
        },
        {
            title: t('nav.certifications'),
            type: 'dropdown',
            gridCols: 2,
            items: [
                { label: t('nav.why_certification'), href: '/why-certification' },
                { label: t('nav.core_foundation'), href: '/core-foundation' },
                { label: t('nav.core_advanced'), href: '/core-advanced' },
                { label: t('nav.specialist'), href: '/specialist' },
                { label: t('nav.expert_level'), href: '/expert-level' },
                { label: t('nav.a4q_practical_tester'), href: '/a4q-practical-tester' },
            ],
        },
        {
            title: t('nav.exams'),
            type: 'dropdown',
            items: [
                { label: t('nav.exam_questions'), href: '/exam-questions' },
                { label: t('nav.exam_fees'), href: '/exam-fees' },
                { label: t('nav.exam_registration'), href: '/exam-registration' },
                { label: t('nav.exam_faq'), href: '/exam-faq' },
                { label: t('nav.anti_piracy'), href: '/anti-piracy' },
                { label: t('nav.glossary'), href: '/glossary' },
            ],
            image: '/assets/images/menu/pexels-divinetechygirl-1181714.jpg',
        },
        {
            title: t('nav.training'),
            type: 'dropdown',
            items: [
                { label: t('nav.accredited_organizations'), href: '/accredited-organizations' },
                { label: t('nav.accreditation_request'), href: '/accreditation-request' },
            ],
        },
        {
            title: t('nav.registration'),
            type: 'dropdown',
            items: [
                { label: t('nav.register_certified_testers'), href: '/register-certified-testers' },
                { label: t('nav.certified_testers_list'), href: '/certified-testers-list' },
                { label: t('nav.istqb_registry'), href: '/istqb-registry' },
            ],
        },
    ];

    // Configuration du menu traduite - Partie droite (liens secondaires)
    const menuRight: MenuSection[] = [
        {
            title: t('nav.events'),
            type: 'link',
            href: '/events',
        },
        {
            title: t('nav.blog'),
            type: 'link',
            href: '/blog',
        },
        // {
        //     title: t('nav.contact'),
        //     type: 'link',
        //     href: '/contact',
        // },
    ];

    // Rendu d'un menu item MUI simple
    const renderMuiMenuItem = (item: MenuItem, menuKey: string) => (
        <MuiMenuItem
            key={item.href}
            onClick={() => {
                handleMenuClose(menuKey);
                onNavigate?.();
            }}
            component={Link}
            href={item.href}
            sx={{
                py: 1.5,
                px: 2,
                borderRadius: 2,
                mx: 1,
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
            }}
        >
            <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
        </MuiMenuItem>
    );

    // Rendu d'un mega menu MUI avec grid
    const renderMuiMegaMenu = (section: MenuSection, menuKey: string) => {
        if (!section.items) return null;

        const gridCols = section.gridCols || 1;

        return (
            <Paper sx={{ minWidth: gridCols === 2 ? 600 : 400, maxWidth: 800, borderRadius: 3 }}>
                <Grid container spacing={0}>
                    {section.featured && (
                        <Grid item xs={12} md={gridCols === 2 ? 6 : 12}>
                            <Box
                                component={Link}
                                href={section.featured.href}
                                onClick={() => {
                                    handleMenuClose(menuKey);
                                    onNavigate?.();
                                }}
                                sx={{
                                    display: 'block',
                                    p: 3,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    height: '100%',
                                    bgcolor: 'grey.50',
                                    borderRadius: 3,
                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                                }}
                            >
                                {section.featured.image && (
                                    <Box
                                        component="img"
                                        src={section.featured.image}
                                        alt={section.featured.label}
                                        sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                                    />
                                )}
                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    {section.featured.label}
                                </Typography>
                                {section.featured.description && (
                                    <Typography variant="body2" color="text.secondary">
                                        {section.featured.description}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    )}
                    <Grid item xs={12} md={section.featured && gridCols === 2 ? 6 : 12}>
                        <MenuList>
                            {section.items.map((item) => (
                                <MuiMenuItem
                                    key={item.href}
                                    onClick={() => {
                                        handleMenuClose(menuKey);
                                        onNavigate?.();
                                    }}
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        py: 1.5,
                                        px: 3,
                                        borderRadius: 2,
                                        mx: 1,
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        {item.image && (
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={item.label}
                                                sx={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 2, mb: 1 }}
                                            />
                                        )}
                                        <Typography variant="body2" fontWeight={500}>
                                            {item.label}
                                        </Typography>
                                        {item.description && (
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                {item.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </MuiMenuItem>
                            ))}
                        </MenuList>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    // Rendu d'une section de menu - Desktop avec MUI
    const renderDesktopMenuSection = (section: MenuSection) => {
        const menuKey = section.title;
        const isOpen = Boolean(anchorEl[menuKey]);

        if (section.type === 'link') {
            return (
                <Link key={section.title} href={section.href!} className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary">
                    {section.title}
                </Link>
            );
        }

        // Mega menu avec images
        if (section.type === 'mega') {
            return (
                <div key={section.title}>
                    <Button
                        onClick={(e) => handleMenuOpen(e, menuKey)}
                        endIcon={<ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
                        sx={{
                            color: 'inherit',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)', color: 'black' },
                        }}
                    >
                        {section.title}
                    </Button>
                    <Menu
                        anchorEl={anchorEl[menuKey]}
                        open={isOpen}
                        onClose={() => handleMenuClose(menuKey)}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                mt: 1,
                                borderRadius: 3,
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                            },
                        }}
                    >
                        {renderMuiMegaMenu(section, menuKey)}
                    </Menu>
                </div>
            );
        }

        // Dropdown simple
        return (
            <div key={section.title}>
                <Button
                    onClick={(e) => handleMenuOpen(e, menuKey)}
                    endIcon={<ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
                    sx={{
                        color: 'inherit',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        px: 1.5,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)', color: 'black' },
                    }}
                >
                    {section.title}
                </Button>
                <Menu
                    anchorEl={anchorEl[menuKey]}
                    open={isOpen}
                    onClose={() => handleMenuClose(menuKey)}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            mt: 1,
                            minWidth: section.gridCols === 2 ? 500 : 300,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        },
                    }}
                >
                    {section.image ? (
                        <Grid container>
                            {/* Liens à gauche */}
                            <Grid item xs={7}>
                                <Box sx={{ p: 1 }}>
                                    {section.gridCols === 2 ? (
                                        <Grid container>
                                            {section.items?.map((item) => (
                                                <Grid item xs={12} key={item.href}>
                                                    {renderMuiMenuItem(item, menuKey)}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        section.items?.map((item) => renderMuiMenuItem(item, menuKey))
                                    )}
                                </Box>
                            </Grid>
                            {/* Image à droite */}
                            <Grid item xs={5}>
                                <Box
                                    sx={{
                                        p: 2,
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: 'grey.100',
                                            borderRadius: 2,
                                            p: 1.5,
                                            width: '100%',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={section.image}
                                            alt={section.title}
                                            sx={{
                                                width: '100%',
                                                height: 200,
                                                objectFit: 'cover',
                                                borderRadius: 1.5,
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box>
                            {section.gridCols === 2 ? (
                                <Grid container>
                                    {section.items?.map((item) => (
                                        <Grid item xs={6} key={item.href}>
                                            {renderMuiMenuItem(item, menuKey)}
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                section.items?.map((item) => renderMuiMenuItem(item, menuKey))
                            )}
                        </Box>
                    )}
                </Menu>
            </div>
        );
    };

    // Rendu d'une section de menu - Mobile
    const renderMobileMenuSection = (section: MenuSection) => {
        const isOpen = openDropdown === section.title;

        if (section.type === 'link') {
            return (
                <div key={section.title} className="border-b border-border/50">
                    <Link
                        href={section.href!}
                        onClick={onNavigate}
                        className="flex items-center justify-between py-4 text-base font-medium transition-colors hover:text-primary"
                    >
                        {section.title}
                    </Link>
                </div>
            );
        }

        return (
            <div key={section.title} className="border-b border-border/50">
                <button
                    onClick={() => setOpenDropdown(isOpen ? null : section.title)}
                    className="flex w-full items-center justify-between py-4 text-base font-medium transition-colors hover:text-primary"
                >
                    {section.title}
                    <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                    <div className="space-y-2 pb-4 pl-4">
                        {section.items?.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className="block py-2 text-sm text-foreground/70 transition-all hover:translate-x-1 hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Version mobile
    if (mobile) {
        return <div className="space-y-1">{[...menuLeft, ...menuRight].map(renderMobileMenuSection)}</div>;
    }

    // Version desktop avec MUI
    return (
        <div className="flex w-full items-center justify-between">
            {/* Menu principal à gauche */}
            <div className="flex items-center gap-1">{menuLeft.map(renderDesktopMenuSection)}</div>

            {/* Liens secondaires à droite */}
            <div className="flex items-center gap-1">{menuRight.map(renderDesktopMenuSection)}</div>
        </div>
    );
};

export default NavMenu;
