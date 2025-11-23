import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, MapPin } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    organization: string;
    description: string;
    start_date: string;
    end_date: string | null;
    location: string | null;
    tags: string[] | null;
    is_active: boolean;
    order: number;
}

interface TimelineProps {
    events?: Event[];
}

export default function Timeline({ events = [] }: TimelineProps) {
    // Format date to display period
    const formatPeriod = (startDate: string, endDate: string | null) => {
        const start = new Date(startDate);
        const startFormatted = start.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });

        if (endDate) {
            const end = new Date(endDate);
            const endFormatted = end.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            return `${startFormatted} - ${endFormatted}`;
        }

        return `${startFormatted} - Présent`;
    };

    if (events.length === 0) {
        return (
            <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
                <div className="text-center text-muted-foreground">
                    <Calendar className="mx-auto mb-4 h-12 w-12" />
                    <p>Aucun événement disponible pour le moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
            <div className="relative ml-3">
                {/* Timeline line */}
                <div className="absolute top-4 bottom-0 left-0 border-l-2" />

                {events.map((event) => (
                    <div key={event.id} className="relative pb-12 pl-8 last:pb-0">
                        {/* Timeline dot */}
                        <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

                        {/* Content */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                                    <Building2 className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <span className="text-base font-medium">{event.organization}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                <div className="mt-2 flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatPeriod(event.start_date, event.end_date)}</span>
                                    </div>
                                    {event.location && (
                                        <>
                                            <span className="hidden sm:inline">•</span>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-pretty text-muted-foreground sm:text-base">{event.description}</p>
                            {event.tags && event.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="rounded-full">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
