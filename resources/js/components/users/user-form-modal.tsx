import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Save, Shield, UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
                toast.success(isEditing ? 'Utilisateur mis à jour avec succès' : 'Utilisateur créé avec succès');
                onClose();
                onSuccess();
            },
            onError: () => {
                toast.error(isEditing ? 'Erreur lors de la mise à jour' : 'Erreur lors de la création');
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
                return 'Accès complet à toutes les fonctionnalités du dashboard, y compris la gestion des utilisateurs.';
            case 'manager':
                return "Accès limité au dashboard. Peut gérer le contenu mais ne peut pas gérer les utilisateurs.";
            default:
                return '';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? `Modifiez les informations de ${user?.name}. Laissez le mot de passe vide pour le conserver.`
                            : 'Ajoutez un nouvel utilisateur au système avec un rôle spécifique.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Jean Dupont"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="jean.dupont@citl-istqb.org"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            {isEditing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder={isEditing ? 'Laisser vide pour conserver' : '••••••••'}
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
                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
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
                        <Label htmlFor="role">Rôle</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Sélectionner un rôle" />
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
                                            {role.name === 'admin' ? 'Administrateur' : 'Gestionnaire'}
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
                            Annuler
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Enregistrement...' : isEditing ? 'Enregistrer' : 'Créer'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
