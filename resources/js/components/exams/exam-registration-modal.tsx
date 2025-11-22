import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExamRegistrationForm } from './exam-registration-form';

interface ExamRegistrationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ExamRegistrationModal({ open, onOpenChange }: ExamRegistrationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
                    <DialogTitle className="text-2xl font-bold">Inscription à l'examen ISTQB</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <ExamRegistrationForm onSuccess={() => onOpenChange(false)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
