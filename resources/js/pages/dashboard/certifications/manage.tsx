import { CategoryModal } from '@/components/certifications/category-modal';
import { CategorySidebar } from '@/components/certifications/category-sidebar';
import { CertificationModal } from '@/components/certifications/certification-modal';
import { CertificationTable } from '@/components/certifications/certification-table';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Certification, CertificationCategory, CertificationFormData } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Props {
    categories: CertificationCategory[];
    certifications: Certification[];
}

export default function ManageCertifications({ categories, certifications }: Props) {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Modals state
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CertificationCategory | null>(null);
    const [editingCertification, setEditingCertification] = useState<Certification | null>(null);

    // Delete confirmation state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ type: 'category' | 'certification'; id: number; name: string } | null>(null);

    // Forms
    const categoryForm = useForm({
        name: '',
        slug: '',
        description: '',
        order: 0,
        is_active: true,
    });

    const certificationForm = useForm<CertificationFormData>({
        certification_category_id: 0,
        title_fr: '',
        title_en: '',
        slug: '',
        subtitle_fr: '',
        subtitle_en: '',
        description_fr: '',
        description_en: '',
        overview_fr: '',
        overview_en: '',
        target_audience_fr: '',
        target_audience_en: '',
        training_content_fr: '',
        training_content_en: '',
        exam_structure_details_fr: '',
        exam_structure_details_en: '',
        business_outcomes_fr: '',
        business_outcomes_en: '',
        additional_information_fr: '',
        additional_information_en: '',
        icon: 'ns-shape-35',
        exam_questions: 40,
        exam_passing_score: 65,
        exam_total_points: 40,
        exam_duration: '60 min',
        syllabus_url: '',
        syllabus_file: '',
        image: '',
        featured_image: '',
        order: 0,
        is_active: true,
    });

    // Filter certifications by category
    const filteredCertifications = useMemo(() => {
        if (selectedCategory === 'all') return certifications;
        return certifications.filter((cert) => cert.category.slug === selectedCategory);
    }, [selectedCategory, certifications]);

    // Certification counts by category
    const certificationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        certifications.forEach((cert) => {
            if (cert.category?.slug) {
                counts[cert.category.slug] = (counts[cert.category.slug] || 0) + 1;
            }
        });
        return counts;
    }, [certifications]);

    // Handlers
    const handleAddCategory = () => {
        setEditingCategory(null);
        categoryForm.reset();
        setShowCategoryModal(true);
    };

    const handleEditCategory = (category: CertificationCategory) => {
        setEditingCategory(category);
        categoryForm.setData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            order: category.order,
            is_active: category.is_active,
        });
        setShowCategoryModal(true);
    };

    const handleDeleteCategory = (category: CertificationCategory) => {
        setItemToDelete({ type: 'category', id: category.id, name: category.name });
        setShowDeleteModal(true);
    };

    const handleAddCertification = () => {
        setEditingCertification(null);
        certificationForm.reset();
        certificationForm.setData('certification_category_id', categories[0]?.id || 0);
        setShowCertificationModal(true);
    };

    const handleEditCertification = (certification: Certification) => {
        setEditingCertification(certification);
        certificationForm.setData({
            certification_category_id: certification.certification_category_id,
            title_fr: certification.title_fr,
            title_en: certification.title_en || '',
            slug: certification.slug,
            subtitle_fr: certification.subtitle_fr || '',
            subtitle_en: certification.subtitle_en || '',
            description_fr: certification.description_fr,
            description_en: certification.description_en || '',
            overview_fr: certification.overview_fr || '',
            overview_en: certification.overview_en || '',
            target_audience_fr: certification.target_audience_fr || '',
            target_audience_en: certification.target_audience_en || '',
            training_content_fr: certification.training_content_fr || '',
            training_content_en: certification.training_content_en || '',
            exam_structure_details_fr: certification.exam_structure_details_fr || '',
            exam_structure_details_en: certification.exam_structure_details_en || '',
            business_outcomes_fr: certification.business_outcomes_fr || '',
            business_outcomes_en: certification.business_outcomes_en || '',
            additional_information_fr: certification.additional_information_fr || '',
            additional_information_en: certification.additional_information_en || '',
            icon: certification.icon,
            exam_questions: certification.exam_questions,
            exam_passing_score: certification.exam_passing_score,
            exam_total_points: certification.exam_total_points,
            exam_duration: certification.exam_duration,
            syllabus_url: certification.syllabus_url || '',
            syllabus_file: certification.syllabus_file || '',
            image: certification.image || '',
            featured_image: certification.featured_image || '',
            order: certification.order,
            is_active: certification.is_active,
        });
        setShowCertificationModal(true);
    };

    const handleDeleteCertification = (certification: Certification) => {
        setItemToDelete({ type: 'certification', id: certification.id, name: certification.title_fr });
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        if (itemToDelete.type === 'category') {
            categoryForm.delete(`/dashboard/certifications/categories/${itemToDelete.id}/delete`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                    toast.success('Catégorie supprimée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la suppression de la catégorie');
                },
            });
        } else {
            certificationForm.delete(`/dashboard/certifications/${itemToDelete.id}/delete`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                    toast.success('Certification supprimée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la suppression de la certification');
                },
            });
        }
    };

    const submitCategoryForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            categoryForm.post(`/dashboard/certifications/categories/${editingCategory.id}/update`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCategoryModal(false);
                    toast.success('Catégorie modifiée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la modification de la catégorie');
                },
            });
        } else {
            categoryForm.post('/dashboard/certifications/categories/store', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCategoryModal(false);
                    toast.success('Catégorie créée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la création de la catégorie');
                },
            });
        }
    };

    const submitCertificationForm = (
        e: React.FormEvent,
        files: { featuredImage: File | null; syllabusFile: File | null; removeFeaturedImage: boolean; removeSyllabusFile: boolean },
    ) => {
        e.preventDefault();

        // Create FormData for file uploads
        const formData = new FormData();

        // Add all form fields
        Object.entries(certificationForm.data).forEach(([key, value]) => {
            if (value !== null && value !== undefined && key !== 'featured_image' && key !== 'syllabus_file') {
                // Convert boolean to "1" or "0" for Laravel validation
                if (typeof value === 'boolean') {
                    formData.append(key, value ? '1' : '0');
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        // Add files if present
        if (files.featuredImage) {
            formData.append('featured_image', files.featuredImage);
        }
        if (files.syllabusFile) {
            formData.append('syllabus_file', files.syllabusFile);
        }
        if (files.removeFeaturedImage) {
            formData.append('remove_featured_image', '1');
        }
        if (files.removeSyllabusFile) {
            formData.append('remove_syllabus_file', '1');
        }

        const url = editingCertification ? `/dashboard/certifications/${editingCertification.id}/update` : '/dashboard/certifications/store';

        router.post(url, formData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowCertificationModal(false);
                toast.success(editingCertification ? 'Certification modifiée avec succès' : 'Certification créée avec succès');
            },
            onError: (errors) => {
                toast.error(editingCertification ? 'Erreur lors de la modification de la certification' : 'Erreur lors de la création de la certification');
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout>
            <Head title={t('dashboard.certifications.page_title')} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {selectedCategory === 'all'
                            ? t('dashboard.certifications.all_certifications')
                            : categories.find((c) => c.slug === selectedCategory)?.name}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredCertifications.length} {t('dashboard.certifications.certification_count', { count: filteredCertifications.length })}
                    </p>
                </div>
                <Button
                    onClick={handleAddCertification}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    {t('dashboard.certifications.add_certification')}
                </Button>
            </div>
            <div className="flex gap-6">
                {/* Main content */}
                <div className="flex-1 space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex space-x-2">
                            {/* Sub-sidebar */}
                            <CategorySidebar
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                onAddCategory={handleAddCategory}
                                onEditCategory={handleEditCategory}
                                onDeleteCategory={handleDeleteCategory}
                                certificationCounts={certificationCounts}
                                totalCount={certifications.length}
                            />

                            <div className="w-3/4">
                                <div className="flex justify-center px-2">
                                    <CertificationTable
                                        certifications={filteredCertifications}
                                        onEdit={handleEditCertification}
                                        onDelete={handleDeleteCertification}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            <CategoryModal
                isOpen={showCategoryModal}
                isEditing={!!editingCategory}
                form={categoryForm}
                onClose={() => setShowCategoryModal(false)}
                onSubmit={submitCategoryForm}
            />

            {/* Certification Modal */}
            <CertificationModal
                isOpen={showCertificationModal}
                isEditing={!!editingCertification}
                form={certificationForm}
                categories={categories}
                certificationId={editingCertification?.id}
                existingCertification={editingCertification}
                onClose={() => setShowCertificationModal(false)}
                onSubmit={submitCertificationForm}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                }}
                onConfirm={confirmDelete}
                title={
                    itemToDelete?.type === 'category'
                        ? t('dashboard.certifications.delete_category_title')
                        : t('dashboard.certifications.delete_certification_title')
                }
                message={
                    itemToDelete?.type === 'category'
                        ? t('dashboard.certifications.delete_category_message')
                        : t('dashboard.certifications.delete_certification_message')
                }
                itemName={itemToDelete?.name}
                isDeleting={categoryForm.processing || certificationForm.processing}
            />
        </AppLayout>
    );
}
