import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

/**
 * Interface représentant les données d'authentification
 */
export interface Auth {
    user: User;
}

/**
 * Interface représentant un élément de fil d'Ariane
 */
export interface BreadcrumbItem {
    title: string;
    href: string;
}

/**
 * Interface représentant un groupe de navigation dans la sidebar
 */
export interface NavGroup {
    title: string;
    items: NavItem[];
}

/**
 * Interface représentant un élément de navigation
 */
export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

/**
 * Interface représentant les données partagées entre les composants
 */
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

/**
 * Interface représentant un utilisateur du système
 */
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Certification Types

/**
 * Interface représentant une catégorie de certification
 */
export interface CertificationCategory {
    id: number;
    name: string;
    slug: string;
    key: string;
    description: string | null;
    order: number;
    is_active: boolean;
    activeCertifications?: Certification[];
    active_certifications?: Certification[]; // Support for snake_case from API
    can_delete: boolean;
}

/**
 * Interface représentant une certification
 */
export interface Certification {
    id: number;
    title: string;
    slug: string;
    subtitle: string | null;
    description: string;
    overview: string | null;
    target_audience: string | null;
    training_content: string | null;
    exam_structure_details: string | null;
    business_outcomes: string | null;
    additional_information: string | null;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string | null;
    image: string | null;
    order: number;
    is_active: boolean;
    certification_category_id: number;
    category: CertificationCategory;
}

/**
 * Interface représentant les données du formulaire de certification
 */
export interface CertificationFormData {
    certification_category_id: number;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    overview: string;
    target_audience: string;
    training_content: string;
    exam_structure_details: string;
    business_outcomes: string;
    additional_information: string;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string;
    image: string;
    order: number;
    is_active: boolean;
}

/**
 * Interface représentant les données du formulaire de catégorie
 */
export interface CategoryFormData {
    name: string;
    slug: string;
    description: string;
    order: number;
    is_active: boolean;
}
