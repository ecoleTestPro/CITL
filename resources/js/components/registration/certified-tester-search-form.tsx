import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PublicTable } from '@/components/ui/public-table';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Loader2, Search } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface CertifiedTester {
    id: number;
    full_name: string;
    certification_obtained: string;
    certificate_number: string;
    exam_date: string;
}

const CERTIFICATION_LABELS: Record<string, string> = {
    ctfl: 'ISTQB CTFL - Foundation Level',
    ctfl_at: 'ISTQB CTFL-AT - Agile Tester',
    ctal_ta: 'ISTQB CTAL-TA - Test Analyst',
    ctal_tm: 'ISTQB CTAL-TM - Test Manager',
    ctal_tta: 'ISTQB CTAL-TTA - Technical Test Analyst',
    ct_tai: 'ISTQB CT-TAI - Test Automation Engineer',
    ct_pt: 'ISTQB CT-PT - Performance Testing',
    ct_mbt: 'ISTQB CT-MBT - Model-Based Testing',
    ct_sec: 'ISTQB CT-SEC - Security Testing',
    ct_mat: 'ISTQB CT-MAT - Mobile Application Testing',
    ct_gat: 'ISTQB CT-GAT - Gambling Industry Testing',
    ct_ait: 'ISTQB CT-AIT - AI Testing',
    ct_ut: 'ISTQB CT-UT - Usability Testing',
    ct_aet: 'ISTQB CT-AET - Automotive Testing',
    ctel_ta: 'ISTQB CTEL-TA - Expert Test Automation',
    ctel_tm: 'ISTQB CTEL-TM - Expert Test Management',
    ctel_ti: 'ISTQB CTEL-TI - Expert Test Improvement',
    a4q_pt: 'A4Q Practical Tester',
};

export function CertifiedTesterSearchForm() {
    const { t } = useTranslation();

    const [searchName, setSearchName] = useState('');
    const [searchCertificate, setSearchCertificate] = useState('');
    const [testers, setTesters] = useState<CertifiedTester[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const formRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (formRef.current) {
                gsap.fromTo(
                    formRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                        },
                    },
                );
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (resultsRef.current && hasSearched) {
            gsap.fromTo(
                resultsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                },
            );
        }
    }, [testers, hasSearched]);

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        if (!searchName.trim() && !searchCertificate.trim()) {
            toast.error(t('certified_testers_list.enter_search'));
            return;
        }

        setIsLoading(true);
        setHasSearched(true);

        try {
            const params = new URLSearchParams();
            if (searchName.trim()) {
                params.append('name', searchName.trim());
            }
            if (searchCertificate.trim()) {
                params.append('certificate_number', searchCertificate.trim());
            }

            const response = await fetch(`/api/certified-testers/search?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setTesters(data.data);
                if (data.data.length === 0) {
                    toast.error(t('certified_testers_list.no_results'));
                }
            } else {
                toast.error('Une erreur est survenue');
            }
        } catch {
            toast.error('Erreur lors de la recherche');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getCertificationLabel = (certification: string): string => {
        return CERTIFICATION_LABELS[certification] || certification;
    };

    const tableColumns = [
        { key: 'full_name', header: t('certified_testers_list.table_name') },
        { key: 'certification', header: t('certified_testers_list.table_certification') },
        { key: 'certificate_number', header: t('certified_testers_list.table_certificate_number') },
        { key: 'exam_date', header: t('certified_testers_list.table_date') },
    ];

    const tableData = testers.map((tester) => ({
        full_name: tester.full_name,
        certification: getCertificationLabel(tester.certification_obtained),
        certificate_number: tester.certificate_number,
        exam_date: formatDate(tester.exam_date),
    }));

    return (
        <div className="space-y-8">
            {/* Search Form */}
            <div
                ref={formRef}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800"
            >
                <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Search className="h-6 w-6 text-citl-orange" />
                    {t('certified_testers_list.search_title')}
                </h2>

                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="search_name">{t('certified_testers_list.search_name_label')}</Label>
                            <Input
                                id="search_name"
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder={t('certified_testers_list.search_name_placeholder')}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="search_certificate">{t('certified_testers_list.search_certificate_label')}</Label>
                            <Input
                                id="search_certificate"
                                type="text"
                                value={searchCertificate}
                                onChange={(e) => setSearchCertificate(e.target.value)}
                                placeholder={t('certified_testers_list.search_certificate_placeholder')}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full bg-citl-orange hover:bg-citl-orange/90 md:w-auto">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Recherche...
                            </>
                        ) : (
                            <>
                                <Search className="mr-2 h-4 w-4" />
                                {t('certified_testers_list.search_button')}
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* Results Section */}
            <div ref={resultsRef}>
                {hasSearched && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
                            {t('certified_testers_list.results_title')}
                            {testers.length > 0 && (
                                <span className="ml-2 text-sm font-normal text-gray-500">({testers.length} résultat(s))</span>
                            )}
                        </h2>

                        {testers.length > 0 ? (
                            <PublicTable columns={tableColumns} data={tableData} striped bordered animated />
                        ) : (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                    <AlertCircle className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">{t('certified_testers_list.no_results')}</p>
                            </div>
                        )}
                    </div>
                )}

                {!hasSearched && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center dark:border-gray-600 dark:bg-gray-800/50">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">{t('certified_testers_list.enter_search')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
