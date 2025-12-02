import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Save, Shield, UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    roles: Role[];
    onSuccess: () => void;
}

export function UserFormModal({ isOpen, onClose, user, roles, onSuccess }: Props) {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isEditing = !!user;
    const currentRole = user?.roles?.[0]?.name || 'manager';

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'manager',
    });

    useEffect(() => {
        if (isOpen) {
            if (user) {
                setData({
                    name: user.name,
                    email: user.email,
                    password: '',
                    password_confirmation: '',
                    role: currentRole,
                });
            } else {
                reset();
                setData('role', 'manager');
            }
        }
    }, [isOpen, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(isEditing ? t('dashboard.users.updated_success') : t('dashboard.users.created_success'));
                onClose();
                onSuccess();
            },
            onError: () => {
                toast.error(isEditing ? t('dashboard.users.updated_error') : t('dashboard.users.created_error'));
            },
        };

        if (isEditing) {
            put(`/dashboard/users/${user.id}`, options);
        } else {
            post('/dashboard/users', options);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const getRoleDescription = (roleName: string) => {
        switch (roleName) {
            case 'admin':
                return t('dashboard.users.role_admin_description');
            case 'manager':
                return t('dashboard.users.role_manager_description');
            default:
                return '';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? t('dashboard.users.edit_title') : t('dashboard.users.create_title')}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? t('dashboard.users.edit_description', { name: user?.name })
                            : t('dashboard.users.create_description')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('dashboard.users.full_name')}</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('dashboard.users.full_name_placeholder')}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('dashboard.users.email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('dashboard.users.email_placeholder')}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            {isEditing ? t('dashboard.users.new_password_optional') : t('dashboard.users.password')}
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder={isEditing ? t('dashboard.users.password_keep_placeholder') : '••••••••'}
                                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">{t('dashboard.users.confirm_password')}</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">{t('dashboard.users.role')}</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                <SelectValue placeholder={t('dashboard.users.select_role')} />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                        <div className="flex items-center gap-2">
                                            {role.name === 'admin' ? (
                                                <Shield className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <UserCog className="h-4 w-4 text-blue-500" />
                                            )}
                                            {role.name === 'admin' ? t('dashboard.users.role_admin') : t('dashboard.users.role_manager')}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                        {data.role && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">{getRoleDescription(data.role)}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? t('common.saving') : isEditing ? t('common.save') : t('common.create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
