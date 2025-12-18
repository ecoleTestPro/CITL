<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class TranslationService
{
    /**
     * Mapping des pages vers leurs composants et clés de traduction
     */
    private const PAGE_COMPONENTS_MAP = [
        'home' => [
            'components' => [
                'HeroHome',
                'AboutUsOne',
                'CertificationWheel',
                'FeaturesCertifications',
            ],
            'translation_keys' => [
                // HeroHome keys
                'hero.foundedDate',
                'hero.title',
                'hero.description',
                'hero.registerExam',
                'hero.findTraining',
                'hero.findCertification',
                // Home page keys
                'home.hero_title',
                'home.hero_description',
                'home.certifications_count',
                'home.training_levels',
                'home.certified_testers',
                'home.learn_more',
                'home.certification_wheel_title',
                'home.certification_wheel_description',
                'home.level',
                'home.explore_certifications',
                'home.develop_skills_title',
                'home.istqb_intro',
                'home.istqb_description',
                'home.how_to_certify',
                'home.how_to_certify_desc',
                'home.find_training',
                'home.find_training_desc',
                'home.learn_more_btn',
            ],
        ],
        'about.citl' => [
            'components' => [
                'HeroCommon',
                'AboutOverview',
                'AboutKeyTakeaways',
            ],
            'translation_keys' => [
                'about.citl.badge',
                'about.citl.hero_title',
                'about.citl.hero_description',
                'about.citl.overview_title',
                'about.citl.overview_description',
                'about.citl.learn_title',
                'about.citl.overview_item_1',
                'about.citl.overview_item_2',
                'about.citl.overview_item_3',
                'about.citl.overview_item_4',
                'about.citl.takeaways_title',
                'about.citl.takeaway_1',
                'about.citl.takeaway_2',
                'about.citl.takeaway_3',
                'about.citl.conclusion',
                'about.citl.cta_text',
            ],
        ],
        'about.istqb' => [
            'components' => [
                'HeroCommon',
                'AboutOverview',
                'AboutKeyTakeaways',
            ],
            'translation_keys' => [
                'about.istqb.badge',
                'about.istqb.hero_title',
                'about.istqb.hero_description',
                'about.istqb.overview_title',
                'about.istqb.overview_description',
                'about.istqb.learn_title',
                'about.istqb.overview_item_1',
                'about.istqb.overview_item_2',
                'about.istqb.overview_item_3',
                'about.istqb.overview_item_4',
                'about.istqb.takeaways_title',
                'about.istqb.takeaway_1',
                'about.istqb.takeaway_2',
                'about.istqb.takeaway_3',
                'about.istqb.conclusion',
                'about.istqb.cta_text',
            ],
        ],
        'about.vision' => [
            'components' => [
                'HeroCommon',
                'AboutOverview',
                'AboutKeyTakeaways',
            ],
            'translation_keys' => [
                'about.vision.badge',
                'about.vision.hero_title',
                'about.vision.hero_description',
                'about.vision.overview_title',
                'about.vision.overview_description',
                'about.vision.learn_title',
                'about.vision.overview_item_1',
                'about.vision.overview_item_2',
                'about.vision.overview_item_3',
                'about.vision.overview_item_4',
                'about.vision.overview_item_5',
                'about.vision.overview_item_6',
                'about.vision.takeaways_title',
                'about.vision.takeaway_1',
                'about.vision.takeaway_2',
                'about.vision.takeaway_3',
                'about.vision.conclusion',
                'about.vision.cta_text',
            ],
        ],
        'about.missions' => [
            'components' => [
                'HeroCommon',
                'AboutOverview',
                'AboutKeyTakeaways',
            ],
            'translation_keys' => [
                'about.missions.badge',
                'about.missions.hero_title',
                'about.missions.hero_description',
                'about.missions.overview_title',
                'about.missions.overview_description',
                'about.missions.learn_title',
                'about.missions.overview_item_1',
                'about.missions.overview_item_2',
                'about.missions.overview_item_3',
                'about.missions.overview_item_4',
                'about.missions.takeaways_title',
                'about.missions.takeaway_1',
                'about.missions.takeaway_2',
                'about.missions.takeaway_3',
                'about.missions.conclusion',
                'about.missions.cta_text',
            ],
        ],
        'about.executive_board' => [
            'components' => [
                'HeroCommon',
                'AboutOverview',
                'TeamMembers',
                'AboutKeyTakeaways',
            ],
            'translation_keys' => [
                'about.executive_board.badge',
                'about.executive_board.hero_title',
                'about.executive_board.hero_description',
                'about.executive_board.overview_title',
                'about.executive_board.overview_description',
                'about.executive_board.learn_title',
                'about.executive_board.overview_item_1',
                'about.executive_board.overview_item_2',
                'about.executive_board.overview_item_3',
                'about.executive_board.overview_item_4',
                'about.executive_board.team_title',
                'about.executive_board.member_1_name',
                'about.executive_board.member_1_role',
                'about.executive_board.member_1_description',
                'about.executive_board.member_2_name',
                'about.executive_board.member_2_role',
                'about.executive_board.member_2_description',
                'about.executive_board.member_3_name',
                'about.executive_board.member_3_role',
                'about.executive_board.member_3_description',
                'about.executive_board.takeaways_title',
                'about.executive_board.takeaway_1',
                'about.executive_board.takeaway_2',
                'about.executive_board.takeaway_3',
                'about.executive_board.conclusion',
                'about.executive_board.cta_text',
            ],
        ],
        // Adhésion - Membres
        'membership.members' => [
            'components' => [
                'HeroCommon',
                'MembershipBenefits',
            ],
            'translation_keys' => [
                'about.members.badge',
                'about.members.hero_title',
                'about.members.hero_description',
                'about.members.why_join_badge',
                'about.members.why_join_title',
                'about.members.why_join_description',
                'about.members.benefits_title',
                'about.members.benefit_1',
                'about.members.benefit_2',
                'about.members.benefit_3',
                'about.members.benefit_4',
                'about.members.benefit_5',
                'about.members.benefit_6',
                'about.members.benefit_7',
                'about.members.benefit_8',
                'about.members.join_now',
                'about.members.why_matters_title',
                'about.members.takeaway_1',
                'about.members.takeaway_2',
                'about.members.takeaway_3',
                'about.members.conclusion',
                'about.members.cta_text',
            ],
        ],
        // Adhésion - Groupes de travail
        'membership.working_groups' => [
            'components' => [
                'HeroCommon',
                'WorkingGroupsContent',
            ],
            'translation_keys' => [
                'working_groups.hero_title',
                'working_groups.hero_description',
                'working_groups.overview_title',
                'working_groups.overview_description',
                'working_groups.learn_title',
                'working_groups.overview_item_1',
                'working_groups.overview_item_2',
                'working_groups.overview_item_3',
                'working_groups.domains_title',
                'working_groups.domain_1',
                'working_groups.domain_2',
                'working_groups.domain_3',
                'working_groups.domain_4',
                'working_groups.domain_5',
                'working_groups.domain_6',
                'working_groups.domain_7',
                'working_groups.domain_8',
                'working_groups.domain_9',
                'working_groups.domain_10',
                'working_groups.domain_11',
                'working_groups.domain_12',
                'working_groups.domain_13',
                'working_groups.domain_14',
                'working_groups.conclusion',
                'working_groups.cta_text',
            ],
        ],
        // Certifications - Pourquoi la certification
        'certification.why' => [
            'components' => [
                'HeroCommon',
                'WhyCertificationContent',
            ],
            'translation_keys' => [
                // Using seo keys as fallback since no dedicated why certification page exists
                'seo.certifications.title',
                'seo.certifications.description',
            ],
        ],
        // Examens - Questions d'examen
        'exams.questions' => [
            'components' => [
                'HeroCommon',
                'ExamQuestionsContent',
            ],
            'translation_keys' => [
                'exams.hero.badge',
                'exams.hero.title',
                'exams.hero.description',
                'exams.understanding.title',
                'exams.understanding.description',
                'exams.understanding.image_alt',
                'exams.administration.title',
                'exams.administration.provider_intro',
                'exams.administration.provider_name',
                'exams.administration.provider_details',
                'exams.administration.organization_contact',
                'exams.administration.organization_name',
                'exams.administration.organization_details',
                'exams.administration.consistency_note',
                'exams.format.title',
                'exams.format.column_module',
                'exams.format.column_questions',
                'exams.format.column_duration',
                'exams.format.column_duration_non_native',
                'exams.format.note_title',
                'exams.format.note_duration',
                'exams.format.note_essay',
                'exams.format.note_standards',
                'exams.level_format.title',
                'exams.level_format.description',
                'exams.foundation.subtitle',
                'exams.foundation.content',
                'exams.foundation.item_1',
                'exams.foundation.item_2',
                'exams.foundation.item_3',
                'exams.foundation.item_4',
                'exams.foundation.image_alt',
            ],
        ],
        // Examens - Frais d'examen
        'exams.fees' => [
            'components' => [
                'HeroCommon',
                'ExamFeesContent',
            ],
            'translation_keys' => [
                'exams.fees.title',
                'exams.fees.description',
                'exams.fees.pricing_table_title',
                'exams.fees.pricing_table_description',
                'exams.fees.column_level',
                'exams.fees.column_flex',
                'exams.fees.column_pearson',
                'exams.fees.level_foundation',
                'exams.fees.level_advanced',
                'exams.fees.level_specialist',
                'exams.fees.level_expert',
            ],
        ],
        // Examens - Inscription aux examens
        'exams.registration' => [
            'components' => [
                'HeroCommon',
                'ExamRegistrationForm',
            ],
            'translation_keys' => [
                'exam.page_title',
                'exam.hero_title',
                'exam.hero_description',
                'exam.form_title',
                'exam.form_description',
                'exam.purchase_type',
                'exam.purchase_individual',
                'exam.purchase_group',
                'exam.exam_name',
                'exam.select_exam',
                'exam.foundation_level',
                'exam.advanced_test_analyst',
                'exam.advanced_test_manager',
                'exam.advanced_technical_test_analyst',
                'exam.agile_tester',
                'exam.test_automation_engineer',
                'exam.contact_info',
                'exam.first_name',
                'exam.last_name',
                'exam.job_title',
                'exam.company',
                'exam.phone',
                'exam.email',
                'exam.address',
                'exam.address_line1',
                'exam.address_line2',
                'exam.city',
                'exam.postal_code',
                'exam.exam_format',
                'exam.online_exam',
                'exam.exam_format_note',
                'exam.registry_question',
                'exam.yes',
                'exam.no',
                'exam.submit',
                'exam.submitting',
                'exam.registration_success',
                'exam.registration_error',
                'exam.benefits_title',
            ],
        ],
        // Examens - FAQ
        'exams.faq' => [
            'components' => [
                'HeroCommon',
                'ExamFaqContent',
            ],
            'translation_keys' => [
                'exams.faq.hero_badge',
                'exams.faq.hero_title',
                'exams.faq.hero_description',
                'exams.faq.cat_general',
                'exams.faq.cat_levels',
                'exams.faq.cat_structure',
                'exams.faq.cat_scoring',
                'exams.faq.cat_registration',
                'exams.faq.cat_certificates',
                'exams.faq.q1',
                'exams.faq.a1',
                'exams.faq.q2',
                'exams.faq.a2',
                'exams.faq.q3',
                'exams.faq.a3',
                'exams.faq.q4',
                'exams.faq.a4_intro',
                'exams.faq.a4_core',
                'exams.faq.a4_specialist',
                'exams.faq.q5',
                'exams.faq.a5_intro',
                'exams.faq.a5_core',
                'exams.faq.a5_specialist',
                'exams.faq.a5_prereq',
                'exams.faq.q6',
                'exams.faq.a6',
                'exams.faq.q7',
                'exams.faq.a7',
                'exams.faq.q8',
                'exams.faq.a8',
                'exams.faq.q9',
                'exams.faq.a9',
                'exams.faq.q10',
                'exams.faq.a10',
                'exams.faq.q11',
                'exams.faq.q12',
                'exams.faq.a12',
                'exams.faq.q13',
                'exams.faq.a13',
                'exams.faq.q14',
                'exams.faq.a14',
            ],
        ],
        // Examens - Anti-piratage
        'exams.anti_piracy' => [
            'components' => [
                'HeroCommon',
                'AntiPiracyContent',
            ],
            'translation_keys' => [
                'exams.glossary.anti_piracy.hero_badge',
                'exams.glossary.anti_piracy.hero_title',
                'exams.glossary.anti_piracy.hero_description',
                'exams.glossary.anti_piracy.warning_title',
                'exams.glossary.anti_piracy.warning_text',
                'exams.glossary.anti_piracy.verification_title',
                'exams.glossary.anti_piracy.verification_text',
                'exams.glossary.anti_piracy.what_to_verify',
                'exams.glossary.anti_piracy.verify_training_provider',
                'exams.glossary.anti_piracy.verify_exam_provider',
                'exams.glossary.anti_piracy.verify_certificate',
                'exams.glossary.anti_piracy.contact_title',
                'exams.glossary.anti_piracy.contact_text',
                'exams.glossary.anti_piracy.contact_form',
                'exams.glossary.anti_piracy.footer_note',
            ],
        ],
        // Glossaire
        'glossary' => [
            'components' => [
                'HeroCommon',
                'GlossaryContent',
            ],
            'translation_keys' => [
                'exams.glossary.hero_badge',
                'exams.glossary.hero_title',
                'exams.glossary.hero_description',
                'exams.glossary.search',
                'exams.glossary.search_placeholder',
                'exams.glossary.alphabet_nav',
                'exams.glossary.no_results',
                'exams.glossary.no_terms',
                'exams.glossary.loading',
                'exams.glossary.print',
                'exams.glossary.print_title',
                'exams.glossary.print_subtitle',
            ],
        ],
        // Formation - Organismes accrédités
        'accreditation.organizations' => [
            'components' => [
                'HeroCommon',
                'AccreditedOrganizationsContent',
            ],
            'translation_keys' => [
                'training.training_providers',
                'training.accredited_organizations_title',
                'training.accredited_organizations_subtitle',
                'training.accredited_organizations_description',
                'training.accreditation_overview_title',
                'training.accreditation_learn_title',
                'training.overview_item_1',
                'training.overview_item_2',
                'training.overview_item_3',
                'training.organizations_list_title',
                'training.organizations_list_subtitle',
                'training.column_name',
                'training.column_country',
                'training.column_website',
                'training.column_email',
                'training.search_placeholder',
                'training.all_countries',
                'training.organizations_count',
                'training.no_organizations_found',
                'training.visit_website',
                'training.error_loading',
            ],
        ],
        // Formation - Demande d'accréditation
        'accreditation.request' => [
            'components' => [
                'HeroCommon',
                'AccreditationRequestForm',
            ],
            'translation_keys' => [
                'training.page_title',
                'training.hero_badge',
                'training.hero_title',
                'training.hero_description',
                'training.intro_title',
                'training.intro_description',
                'training.benefits_title',
                'training.benefit_1',
                'training.benefit_2',
                'training.benefit_3',
                'training.benefit_4',
                'training.benefit_5',
                'training.benefit_6',
                'training.form_title',
                'training.form_description',
                'training.company_information',
                'training.company_name',
                'training.company_name_placeholder',
                'training.email',
                'training.email_placeholder',
                'training.phone',
                'training.phone_placeholder',
                'training.city',
                'training.city_placeholder',
                'training.company_address',
                'training.company_address_placeholder',
                'training.website',
                'training.website_placeholder',
                'training.contact_person_section',
                'training.contact_person',
                'training.contact_person_placeholder',
                'training.organization_details',
                'training.years_in_business',
                'training.years_in_business_placeholder',
                'training.number_of_trainers',
                'training.number_of_trainers_placeholder',
                'training.training_facilities',
                'training.training_facilities_placeholder',
                'training.additional_info',
                'training.additional_info_placeholder',
                'training.submit',
                'training.submitting',
                'training.accreditation_success',
                'training.accreditation_error',
                'training.process_title',
                'training.process_description',
                'training.process_step_1',
                'training.process_step_2',
                'training.process_step_3',
                'training.process_step_4',
            ],
        ],
        // Inscription - Inscrire testeurs
        'certification.register' => [
            'components' => [
                'HeroCommon',
                'RegisterTestersContent',
            ],
            'translation_keys' => [
                'seo.registration.title',
                'seo.registration.description',
            ],
        ],
        // Inscription - Liste des testeurs certifiés
        'certification.testers_list' => [
            'components' => [
                'HeroCommon',
                'TestersListContent',
            ],
            'translation_keys' => [
                'seo.testers_list.title',
                'seo.testers_list.description',
            ],
        ],
        // Inscription - Registre ISTQB
        'certification.registry' => [
            'components' => [
                'HeroCommon',
                'IstqbRegistryContent',
            ],
            'translation_keys' => [
                'seo.registry.title',
                'seo.registry.description',
            ],
        ],
        // Contact
        'contact' => [
            'components' => [
                'HeroCommon',
                'ContactForm',
            ],
            'translation_keys' => [
                'contact.page_title',
                'contact.page_description',
                'contact.get_in_touch',
                'contact.intro_text',
                'contact.send_message',
                'contact.address_label',
                'contact.address',
                'contact.phone_label',
                'contact.phone_number',
                'contact.email_label',
                'contact.email_address',
                'contact.civility',
                'contact.civility_placeholder',
                'contact.mr',
                'contact.mrs',
                'contact.miss',
                'contact.name',
                'contact.name_placeholder',
                'contact.email',
                'contact.email_placeholder',
                'contact.phone',
                'contact.phone_placeholder',
                'contact.company',
                'contact.company_placeholder',
                'contact.subject',
                'contact.subject_placeholder',
                'contact.message',
                'contact.message_placeholder',
                'contact.send_button',
                'contact.sending',
            ],
        ],
    ];

    /**
     * Get translation keys for a specific page
     */
    public function getPageTranslationKeys(string $pageName): array
    {
        return self::PAGE_COMPONENTS_MAP[$pageName]['translation_keys'] ?? [];
    }

    /**
     * Get all translations for a page in all languages
     */
    public function getPageTranslations(string $pageName): array
    {
        $keys = $this->getPageTranslationKeys($pageName);
        $localesPath = resource_path('js/i18n/locales');
        $translations = [];

        // Get all locale files
        $localeFiles = File::glob($localesPath.'/*.json');

        foreach ($localeFiles as $localeFile) {
            $locale = pathinfo($localeFile, PATHINFO_FILENAME);
            $content = json_decode(File::get($localeFile), true);

            $translations[$locale] = [];

            foreach ($keys as $key) {
                $value = $this->getNestedValue($content, $key);
                if ($value !== null) {
                    $translations[$locale][$key] = $value;
                }
            }
        }

        return $translations;
    }

    /**
     * Update translations for a specific locale
     */
    public function updateTranslations(string $locale, array $updates): bool
    {
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");

        if (! File::exists($localeFile)) {
            return false;
        }

        // Create backup
        $this->createBackup($locale);

        // Read current translations
        $content = json_decode(File::get($localeFile), true);

        // Update translations
        foreach ($updates as $key => $value) {
            $this->setNestedValue($content, $key, $value);
        }

        // Save updated translations
        File::put($localeFile, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        return true;
    }

    /**
     * Create a backup of the translation file
     */
    private function createBackup(string $locale): void
    {
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");
        $backupDir = storage_path('app/translation-backups');

        if (! File::exists($backupDir)) {
            File::makeDirectory($backupDir, 0755, true);
        }

        $timestamp = now()->format('Y-m-d_H-i-s');
        $backupFile = "{$backupDir}/{$locale}_{$timestamp}.json";

        File::copy($localeFile, $backupFile);

        // Keep only last 10 backups for each locale
        $this->cleanOldBackups($locale, $backupDir);
    }

    /**
     * Clean old backup files, keeping only the 10 most recent
     */
    private function cleanOldBackups(string $locale, string $backupDir): void
    {
        $backups = File::glob("{$backupDir}/{$locale}_*.json");

        if (count($backups) > 10) {
            // Sort by modification time (oldest first)
            usort($backups, function ($a, $b) {
                return filemtime($a) - filemtime($b);
            });

            // Remove oldest backups
            $toDelete = array_slice($backups, 0, count($backups) - 10);
            foreach ($toDelete as $file) {
                File::delete($file);
            }
        }
    }

    /**
     * Get nested value from array using dot notation
     *
     * @return mixed
     */
    private function getNestedValue(array $array, string $key)
    {
        $keys = explode('.', $key);
        $value = $array;

        foreach ($keys as $k) {
            if (! isset($value[$k])) {
                return null;
            }
            $value = $value[$k];
        }

        return $value;
    }

    /**
     * Set nested value in array using dot notation
     *
     * @param  mixed  $value
     */
    private function setNestedValue(array &$array, string $key, $value): void
    {
        $keys = explode('.', $key);
        $current = &$array;

        foreach ($keys as $i => $k) {
            if ($i === count($keys) - 1) {
                $current[$k] = $value;
            } else {
                if (! isset($current[$k]) || ! is_array($current[$k])) {
                    $current[$k] = [];
                }
                $current = &$current[$k];
            }
        }
    }

    /**
     * Get list of available locales
     */
    public function getAvailableLocales(): array
    {
        $localesPath = resource_path('js/i18n/locales');
        $localeFiles = File::glob($localesPath.'/*.json');

        return array_map(function ($file) {
            return pathinfo($file, PATHINFO_FILENAME);
        }, $localeFiles);
    }

    /**
     * Restore translations from a backup
     */
    public function restoreFromBackup(string $locale, string $backupTimestamp): bool
    {
        $backupFile = storage_path("app/translation-backups/{$locale}_{$backupTimestamp}.json");
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");

        if (! File::exists($backupFile)) {
            return false;
        }

        File::copy($backupFile, $localeFile);

        return true;
    }
}
