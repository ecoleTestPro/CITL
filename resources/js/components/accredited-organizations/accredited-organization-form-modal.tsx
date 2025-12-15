import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/rich-text-editor';
import { useForm } from '@inertiajs/react';
import { Save, X, Upload } from 'lucide-react';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

interface AccreditedOrganization {
    id: number;
    name: string;
    country: string;
    city: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    logo: string | null;
    description: string | null;
    certifications: string | null;
    is_active: boolean;
}

interface AccreditedOrganizationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    organization?: AccreditedOrganization | null;
    onSuccess?: () => void;
}

export function AccreditedOrganizationFormModal({ isOpen, onClose, organization, onSuccess }: AccreditedOrganizationFormModalProps) {
    const isEditing = !!organization;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: organization?.name || '',
        country: organization?.country || 'Côte d\'Ivoire',
        city: organization?.city || '',
        website: organization?.website || '',
        email: organization?.email || '',
        phone: organization?.phone || '',
        logo: null as File | null,
        description: organization?.description || '',
        certifications: organization?.certifications || '',
        is_active: organization?.is_active ?? true,
    });

    useEffect(() => {
        if (organization) {
            setData({
                name: organization.name,
                country: organization.country,
                city: organization.city || '',
                website: organization.website || '',
                email: organization.email || '',
                phone: organization.phone || '',
                logo: null,
                description: organization.description || '',
                certifications: organization.certifications || '',
                is_active: organization.is_active,
            });
        } else {
            reset();
        }
    }, [organization]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEditing
            ? `/dashboard/accredited-organizations/${organization.id}`
            : '/dashboard/accredited-organizations';

        post(url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success(isEditing ? 'Organisme modifié avec succès' : 'Organisme créé avec succès');
                onSuccess?.();
                onClose();
                reset();
            },
            onError: () => {
                toast.error(isEditing ? 'Erreur lors de la modification' : 'Erreur lors de la création');
            },
        });
    };

    const handleClose = () => {
        if (!processing) {
            onClose();
            reset();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                    <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-gray-800">
                        <DialogTitle className="text-xl font-bold">
                            {isEditing ? `Modifier: ${organization.name}` : 'Ajouter un organisme accrédité'}
                        </DialogTitle>
                        <button
                            onClick={handleClose}
                            disabled={processing}
                            className="rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nom de l'organisme <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Raglan Technologies"
                                className={errors.name ? 'border-red-500' : ''}
                                disabled={processing}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Country and City */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="country">
                                    Pays <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    placeholder="Ex: Côte d'Ivoire"
                                    className={errors.country ? 'border-red-500' : ''}
                                    disabled={processing}
                                />
                                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">Ville</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    placeholder="Ex: Abidjan"
                                    disabled={processing}
                                />
                                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                            </div>
                        </div>

                        {/* Website and Email */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="website">Site web</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    placeholder="https://example.com"
                                    disabled={processing}
                                />
                                {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="contact@example.com"
                                    disabled={processing}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+225 27 22 00 00 00"
                                disabled={processing}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Logo */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo</Label>
                            <div className="flex items-center gap-4">
                                {organization?.logo && !data.logo && (
                                    (() => {
                                        const src = String(organization.logo || '');
                                        const logoSrc = src.startsWith('http') || src.startsWith('https') ? src : `/storage/${src}`;
                                        return (
                                            <img src={logoSrc} alt="Logo actuel" className="h-16 w-16 rounded object-cover" />
                                        );
                                    })()
                                )}
                                {data.logo && (
                                    <img
                                        src={URL.createObjectURL(data.logo)}
                                        alt="Nouveau logo"
                                        className="h-16 w-16 rounded object-cover"
                                    />
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={processing}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    {organization?.logo || data.logo ? 'Changer le logo' : 'Télécharger un logo'}
                                </Button>
                            </div>
                            {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description de l'organisme..."
                                rows={3}
                                disabled={processing}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Certifications (rich text) */}
                        <div className="space-y-2">
                            <Label htmlFor="certifications">Certifications</Label>
                            <RichTextEditor
                                content={data.certifications || ''}
                                onChange={(content) => setData('certifications', content)}
                                placeholder="Liste des certifications disponibles..."
                            />
                            {errors.certifications && <p className="text-sm text-red-500">{errors.certifications}</p>}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', checked)}
                                disabled={processing}
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Organisme actif (visible sur le site)
                            </Label>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 border-t pt-4">
                            <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
