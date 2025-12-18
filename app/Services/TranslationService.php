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
