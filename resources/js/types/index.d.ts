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
    name_fr: string;
    name_en: string | null;
    name: string; // Accessor pour rétrocompatibilité (retourne name_fr)
    slug: string;
    key: string;
    description_fr: string | null;
    description_en: string | null;
    description: string | null; // Accessor pour rétrocompatibilité (retourne description_fr)
    order: number;
    is_active: boolean;
    activeCertifications?: Certification[];
    active_certifications?: Certification[]; // Support for snake_case from API
    certifications?: Certification[]; // When loaded with certifications relationship
    can_delete: boolean;
}

/**
 * Interface représentant une certification
 */
export interface Certification {
    id: number;
    title_fr: string;
    title_en: string | null;
    slug: string;
    subtitle_fr: string | null;
    subtitle_en: string | null;
    description_fr: string;
    description_en: string | null;
    overview_fr: string | null;
    overview_en: string | null;
    target_audience_fr: string | null;
    target_audience_en: string | null;
    training_content_fr: string | null;
    training_content_en: string | null;
    exam_structure_details_fr: string | null;
    exam_structure_details_en: string | null;
    business_outcomes_fr: string | null;
    business_outcomes_en: string | null;
    additional_information_fr: string | null;
    additional_information_en: string | null;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string | null;
    syllabus_file: string | null;
    image: string | null;
    featured_image: string | null;
    order: number;
    is_active: boolean;
    certification_category_id: number;
    category: CertificationCategory;
    documents?: CertificationDocument[];
}

/**
 * Type pour les langues supportées
 */
export type SupportedLanguage = 'fr' | 'en';

/**
 * Interface représentant les données du formulaire de certification
 */
export interface CertificationFormData {
    certification_category_id: number;
    title_fr: string;
    title_en: string;
    slug: string;
    subtitle_fr: string;
    subtitle_en: string;
    description_fr: string;
    description_en: string;
    overview_fr: string;
    overview_en: string;
    target_audience_fr: string;
    target_audience_en: string;
    training_content_fr: string;
    training_content_en: string;
    exam_structure_details_fr: string;
    exam_structure_details_en: string;
    business_outcomes_fr: string;
    business_outcomes_en: string;
    additional_information_fr: string;
    additional_information_en: string;
    icon: string;
    exam_questions: number;
    exam_passing_score: number;
    exam_total_points: number;
    exam_duration: string;
    syllabus_url: string;
    syllabus_file: string;
    image: string;
    featured_image: string;
    order: number;
    is_active: boolean;
}

/**
 * Champs traduisibles d'une certification
 */
export type TranslatableField =
    | 'title'
    | 'subtitle'
    | 'description'
    | 'overview'
    | 'target_audience'
    | 'training_content'
    | 'exam_structure_details'
    | 'business_outcomes'
    | 'additional_information';

/**
 * Interface représentant les données du formulaire de catégorie
 */
export interface CategoryFormData {
    name_fr: string;
    name_en: string;
    slug: string;
    description_fr: string;
    description_en: string;
    order: number;
    is_active: boolean;
}

/**
 * Interface représentant un tag de document de certification
 */
export interface CertificationDocumentTag {
    id: number;
    name: string;
    slug: string;
    order: number;
}

/**
 * Interface représentant un document de certification
 */
export interface CertificationDocument {
    id: number;
    certification_id: number;
    name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    order: number;
    is_active: boolean;
    tags: CertificationDocumentTag[];
}
