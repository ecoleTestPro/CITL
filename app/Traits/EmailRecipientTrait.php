<?php

namespace App\Traits;

/**
 * Trait for handling email recipients based on environment
 */
trait EmailRecipientTrait
{
    /**
     * Get the recipient email based on environment
     *
     * @return string
     */
    protected function getRecipientEmail(): string
    {
        $defaultEmail = "keraste38@gmail.com";
        $prodEmail = "contact@citl-istqb.org";

        return app()->environment('production')
            ? $prodEmail
            : $defaultEmail;
    }
}
