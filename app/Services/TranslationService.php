<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class TranslationService
{
    /**
     * Mapping des pages vers leurs composants et clés de traduction
     */
    private const PAGE_COMPONENTS_MAP = [
        'home' => [
            'components' => [
                'AboutUsOne',
                'CertificationWheel',
                'FeaturesCertifications',
            ],
            'translation_keys' => [
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
    ];

    /**
     * Get translation keys for a specific page
     *
     * @param string $pageName
     * @return array
     */
    public function getPageTranslationKeys(string $pageName): array
    {
        return self::PAGE_COMPONENTS_MAP[$pageName]['translation_keys'] ?? [];
    }

    /**
     * Get all translations for a page in all languages
     *
     * @param string $pageName
     * @return array
     */
    public function getPageTranslations(string $pageName): array
    {
        $keys = $this->getPageTranslationKeys($pageName);
        $localesPath = resource_path('js/i18n/locales');
        $translations = [];

        // Get all locale files
        $localeFiles = File::glob($localesPath . '/*.json');

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
     *
     * @param string $locale
     * @param array $updates
     * @return bool
     */
    public function updateTranslations(string $locale, array $updates): bool
    {
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");

        if (!File::exists($localeFile)) {
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
     *
     * @param string $locale
     * @return void
     */
    private function createBackup(string $locale): void
    {
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");
        $backupDir = storage_path('app/translation-backups');

        if (!File::exists($backupDir)) {
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
     *
     * @param string $locale
     * @param string $backupDir
     * @return void
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
     * @param array $array
     * @param string $key
     * @return mixed
     */
    private function getNestedValue(array $array, string $key)
    {
        $keys = explode('.', $key);
        $value = $array;

        foreach ($keys as $k) {
            if (!isset($value[$k])) {
                return null;
            }
            $value = $value[$k];
        }

        return $value;
    }

    /**
     * Set nested value in array using dot notation
     *
     * @param array &$array
     * @param string $key
     * @param mixed $value
     * @return void
     */
    private function setNestedValue(array &$array, string $key, $value): void
    {
        $keys = explode('.', $key);
        $current = &$array;

        foreach ($keys as $i => $k) {
            if ($i === count($keys) - 1) {
                $current[$k] = $value;
            } else {
                if (!isset($current[$k]) || !is_array($current[$k])) {
                    $current[$k] = [];
                }
                $current = &$current[$k];
            }
        }
    }

    /**
     * Get list of available locales
     *
     * @return array
     */
    public function getAvailableLocales(): array
    {
        $localesPath = resource_path('js/i18n/locales');
        $localeFiles = File::glob($localesPath . '/*.json');

        return array_map(function ($file) {
            return pathinfo($file, PATHINFO_FILENAME);
        }, $localeFiles);
    }

    /**
     * Restore translations from a backup
     *
     * @param string $locale
     * @param string $backupTimestamp
     * @return bool
     */
    public function restoreFromBackup(string $locale, string $backupTimestamp): bool
    {
        $backupFile = storage_path("app/translation-backups/{$locale}_{$backupTimestamp}.json");
        $localeFile = resource_path("js/i18n/locales/{$locale}.json");

        if (!File::exists($backupFile)) {
            return false;
        }

        File::copy($backupFile, $localeFile);

        return true;
    }
}
