import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { CheckCircle, Mail, MapPin, Phone, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExamRegistration {
    id: number;
    purchase_type: string;
    exam_name: string;
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    phone: string;
    email: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    postal_code: string;
    exam_format: string;
    register_in_registry: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

interface ExamRegistrationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    registration: ExamRegistration | null;
}

export function ExamRegistrationDetailsModal({
    isOpen,
    onClose,
    registration,
}: ExamRegistrationDetailsModalProps) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'fr' ? fr : enUS;

    if (!registration) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('exam.details.title')}</DialogTitle>
                    <DialogDescription>
                        {t('exam.details.description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Registration Date */}
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-500">{t('exam.details.registration_date')}</p>
                        <p className="mt-1 font-medium text-lg">
                            {format(new Date(registration.created_at), 'dd MMMM yyyy à HH:mm', { locale })}
                        </p>
                    </div>

                    {/* Exam Information */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            {t('exam.details.exam_information')}
                        </h3>
                        <div className="grid gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.exam_name')}</p>
                                <p className="mt-1 font-medium">{registration.exam_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.purchase_type')}</p>
                                <p className="mt-1">
                                    <Badge variant="outline">
                                        {registration.purchase_type === 'individual'
                                            ? t('exam.details.individual')
                                            : t('exam.details.group')}
                                    </Badge>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.exam_format')}</p>
                                <p className="mt-1 font-medium">
                                    {registration.exam_format === 'online'
                                        ? t('exam.details.online')
                                        : t('exam.details.in_person')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.registry_registration')}</p>
                                <p className="mt-1 font-medium">
                                    {registration.register_in_registry === 'yes'
                                        ? t('exam.details.yes')
                                        : t('exam.details.no')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Information */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <User className="h-5 w-5 text-primary" />
                            {t('exam.details.candidate_information')}
                        </h3>
                        <div className="grid gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">{t('exam.details.first_name')}</p>
                                    <p className="mt-1 font-medium">{registration.first_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{t('exam.details.last_name')}</p>
                                    <p className="mt-1 font-medium">{registration.last_name}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.job_title')}</p>
                                <p className="mt-1 font-medium">{registration.job_title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.company')}</p>
                                <p className="mt-1 font-medium">{registration.company}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <Mail className="h-5 w-5 text-primary" />
                            {t('exam.details.contact_information')}
                        </h3>
                        <div className="grid gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.email')}</p>
                                <a
                                    href={`mailto:${registration.email}`}
                                    className="mt-1 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    <Mail className="h-4 w-4" />
                                    {registration.email}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.phone')}</p>
                                <a
                                    href={`tel:${registration.phone}`}
                                    className="mt-1 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    <Phone className="h-4 w-4" />
                                    {registration.phone}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <MapPin className="h-5 w-5 text-primary" />
                            {t('exam.details.address')}
                        </h3>
                        <div className="grid gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <div>
                                <p className="text-sm text-gray-500">{t('exam.details.address_line1')}</p>
                                <p className="mt-1 font-medium">{registration.address_line1}</p>
                            </div>
                            {registration.address_line2 && (
                                <div>
                                    <p className="text-sm text-gray-500">{t('exam.details.address_line2')}</p>
                                    <p className="mt-1 font-medium">{registration.address_line2}</p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">{t('exam.details.city')}</p>
                                    <p className="mt-1 font-medium">{registration.city}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{t('exam.details.postal_code')}</p>
                                    <p className="mt-1 font-medium">{registration.postal_code}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
