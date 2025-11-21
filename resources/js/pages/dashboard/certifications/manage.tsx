import { CategoryModal } from '@/components/certifications/category-modal';
import { CategorySidebar } from '@/components/certifications/category-sidebar';
import { CertificationModal } from '@/components/certifications/certification-modal';
import { CertificationTable } from '@/components/certifications/certification-table';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Certification, CertificationCategory, CertificationFormData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

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
        title: '',
        slug: '',
        subtitle: '',
        description: '',
        overview: '',
        target_audience: '',
        training_content: '',
        exam_structure_details: '',
        business_outcomes: '',
        additional_information: '',
        icon: 'ns-shape-35',
        exam_questions: 40,
        exam_passing_score: 65,
        exam_total_points: 40,
        exam_duration: '60 min',
        syllabus_url: '',
        image: '',
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
            counts[cert.category.slug] = (counts[cert.category.slug] || 0) + 1;
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
            title: certification.title,
            slug: certification.slug,
            subtitle: certification.subtitle || '',
            description: certification.description,
            overview: certification.overview || '',
            target_audience: certification.target_audience || '',
            training_content: certification.training_content || '',
            exam_structure_details: certification.exam_structure_details || '',
            business_outcomes: certification.business_outcomes || '',
            additional_information: certification.additional_information || '',
            icon: certification.icon,
            exam_questions: certification.exam_questions,
            exam_passing_score: certification.exam_passing_score,
            exam_total_points: certification.exam_total_points,
            exam_duration: certification.exam_duration,
            syllabus_url: certification.syllabus_url || '',
            image: certification.image || '',
            order: certification.order,
            is_active: certification.is_active,
        });
        setShowCertificationModal(true);
    };

    const handleDeleteCertification = (certification: Certification) => {
        setItemToDelete({ type: 'certification', id: certification.id, name: certification.title });
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

    const submitCertificationForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCertification) {
            certificationForm.post(`/dashboard/certifications/${editingCertification.id}/update`, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCertificationModal(false);
                    toast.success('Certification modifiée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la modification de la certification');
                },
            });
        } else {
            certificationForm.post('/dashboard/certifications/store', {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCertificationModal(false);
                    toast.success('Certification créée avec succès');
                },
                onError: () => {
                    toast.error('Erreur lors de la création de la certification');
                },
            });
        }
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
                    className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white transition-colors hover:bg-secondary/90"
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
