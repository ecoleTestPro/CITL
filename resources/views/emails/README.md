# 📧 Template d'Email CITL

Ce dossier contient le template de base pour tous les emails envoyés par l'application CITL.

## 📁 Fichiers

- **template-base.html** : Template de base à copier pour créer de nouveaux emails

## 🎨 Design

Le template utilise la palette de couleurs de CITL :
- **Primary (Bleu)** : `#0ea5e9` (sky-500)
- **Texte principal** : `#1e293b` (slate-800)
- **Texte secondaire** : `#475569` (slate-600)
- **Background** : `#f5f5f5`
- **Footer** : `#1e293b` (dark)

## 🔧 Comment utiliser ce template

### 1. Créer un nouvel email

1. **Copier** le fichier `template-base.html`
2. **Renommer** selon le type d'email (ex: `confirmation-inscription.html`, `reset-password.html`)
3. **Remplacer** les variables par vos données

### 2. Variables disponibles

Le template contient les variables suivantes à remplacer :

#### Header
- `{{SUBJECT}}` - Sujet de l'email (dans le `<title>`)

#### Hero Section
- `{{EMAIL_TITLE}}` - Titre principal de l'email
- `{{EMAIL_SUBTITLE}}` - Sous-titre/description

#### Contenu principal
- `{{USER_NAME}}` - Nom de l'utilisateur
- `{{MAIN_MESSAGE}}` - Message principal (peut contenir du HTML)

#### Info Box (Section optionnelle)
- `{{INFO_TITLE}}` - Titre de l'encadré d'information
- `{{INFO_CONTENT}}` - Contenu de l'encadré

#### Call-to-Action
- `{{BUTTON_TEXT}}` - Texte du bouton
- `{{BUTTON_LINK}}` - Lien du bouton

#### Informations additionnelles
- `{{ADDITIONAL_INFO}}` - Informations complémentaires

#### Section support (optionnelle)
- `{{SUPPORT_EMAIL}}` - Email de support (ex: support@citl.com)

#### Footer
- `{{APP_URL}}` - URL de l'application
- `{{CURRENT_YEAR}}` - Année en cours (ex: 2024)
- `{{CONTACT_EMAIL}}` - Email de contact (ex: contact@citl.com)
- `{{FACEBOOK_URL}}` - Lien vers la page Facebook
- `{{TWITTER_URL}}` - Lien vers le compte Twitter
- `{{LINKEDIN_URL}}` - Lien vers la page LinkedIn
- `{{UNSUBSCRIBE_LINK}}` - Lien de désinscription

### 3. Sections optionnelles

Vous pouvez supprimer les sections dont vous n'avez pas besoin :

#### Supprimer l'Info Box
Supprimez le bloc `<!-- INFO BOX (Optional) -->` (table block-3)

#### Supprimer le bouton CTA
Supprimez le bloc `<!-- CALL TO ACTION BUTTON -->` (table block-4)

#### Supprimer les infos additionnelles
Supprimez le bloc `<!-- ADDITIONAL INFO -->` (table block-5)

#### Supprimer la section Support
Supprimez toute la table `row-4`

## 📝 Exemples d'utilisation

### Exemple 1 : Email de confirmation d'inscription à un examen

```html
<!-- Remplacer les variables -->
{{SUBJECT}} → Confirmation de votre inscription à l'examen CTFL v4.0
{{EMAIL_TITLE}} → Inscription confirmée !
{{EMAIL_SUBTITLE}} → Votre inscription à l'examen a été enregistrée avec succès
{{USER_NAME}} → Jean Dupont
{{MAIN_MESSAGE}} → Nous avons bien reçu votre inscription pour l'examen <strong>CTFL v4.0 - Certified Tester Foundation Level</strong>.

{{INFO_TITLE}} → Détails de votre inscription
{{INFO_CONTENT}} →
    <strong>Examen :</strong> CTFL v4.0<br>
    <strong>Date :</strong> 15 Janvier 2025<br>
    <strong>Format :</strong> En ligne<br>
    <strong>Durée :</strong> 60 minutes

{{BUTTON_TEXT}} → Voir ma confirmation
{{BUTTON_LINK}} → https://citl.com/exam-registrations/123

{{ADDITIONAL_INFO}} → Vous recevrez un email de rappel 24 heures avant l'examen avec toutes les instructions pour vous connecter.
```

### Exemple 2 : Email de réinitialisation de mot de passe

```html
{{SUBJECT}} → Réinitialisation de votre mot de passe
{{EMAIL_TITLE}} → Réinitialisation de mot de passe
{{EMAIL_SUBTITLE}} → Vous avez demandé à réinitialiser votre mot de passe
{{USER_NAME}} → Marie Martin
{{MAIN_MESSAGE}} → Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte CITL. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.

{{INFO_TITLE}} → ⏰ Lien valable 60 minutes
{{INFO_CONTENT}} → Ce lien de réinitialisation expirera dans 60 minutes pour des raisons de sécurité.

{{BUTTON_TEXT}} → Réinitialiser mon mot de passe
{{BUTTON_LINK}} → https://citl.com/reset-password?token=abc123

{{ADDITIONAL_INFO}} → Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur : https://citl.com/reset-password?token=abc123

<!-- Supprimer la section Support pour cet email -->
```

### Exemple 3 : Email de bienvenue (sans Info Box)

```html
{{SUBJECT}} → Bienvenue sur CITL !
{{EMAIL_TITLE}} → Bienvenue sur CITL ! 🎉
{{EMAIL_SUBTITLE}} → Votre compte a été créé avec succès
{{USER_NAME}} → Sophie Bernard
{{MAIN_MESSAGE}} → Nous sommes ravis de vous accueillir sur la plateforme CITL, votre partenaire pour les certifications en test logiciel. Découvrez nos certifications ISTQB et commencez votre parcours de formation dès aujourd'hui.

{{BUTTON_TEXT}} → Découvrir les certifications
{{BUTTON_LINK}} → https://citl.com/certifications

{{ADDITIONAL_INFO}} → N'hésitez pas à explorer notre catalogue de formations et à consulter nos ressources pédagogiques.

<!-- Supprimer l'Info Box (block-3) pour cet email -->
```

## 🎯 Bonnes pratiques

### Tests
- ✅ Toujours tester sur plusieurs clients email (Gmail, Outlook, Apple Mail)
- ✅ Tester sur mobile et desktop
- ✅ Vérifier que tous les liens fonctionnent

### Contenu
- ✅ Garder les messages courts et clairs
- ✅ Utiliser un call-to-action évident
- ✅ Personnaliser avec le nom de l'utilisateur
- ✅ Inclure des informations de contact

### Accessibilité
- ✅ Utiliser du texte alt pour les images (déjà inclus)
- ✅ Maintenir un bon contraste de couleurs
- ✅ Structurer avec des titres hiérarchiques

## 🔗 Intégration avec Laravel

### Utiliser avec Laravel Mailable

```php
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;

class ExamRegistrationConfirmation extends Mailable
{
    public function __construct(
        public $registration,
        public $user
    ) {}

    public function content(): Content
    {
        return new Content(
            view: 'emails.exam-confirmation',
        );
    }
}
```

### Dans votre Blade template (exam-confirmation.blade.php)

```blade
{!! str_replace(
    [
        '{{SUBJECT}}',
        '{{EMAIL_TITLE}}',
        '{{USER_NAME}}',
        '{{MAIN_MESSAGE}}',
        '{{INFO_TITLE}}',
        '{{INFO_CONTENT}}',
        '{{BUTTON_TEXT}}',
        '{{BUTTON_LINK}}',
        '{{ADDITIONAL_INFO}}',
        '{{SUPPORT_EMAIL}}',
        '{{APP_URL}}',
        '{{CURRENT_YEAR}}',
        '{{CONTACT_EMAIL}}',
        '{{FACEBOOK_URL}}',
        '{{TWITTER_URL}}',
        '{{LINKEDIN_URL}}',
        '{{UNSUBSCRIBE_LINK}}'
    ],
    [
        'Confirmation d\'inscription - ' . $registration->exam->name,
        'Inscription confirmée !',
        $user->name,
        'Nous avons bien reçu votre inscription pour l\'examen <strong>' . $registration->exam->name . '</strong>.',
        'Détails de votre inscription',
        '<strong>Examen :</strong> ' . $registration->exam->name . '<br>' .
        '<strong>Date :</strong> ' . $registration->exam_date . '<br>' .
        '<strong>Format :</strong> ' . $registration->exam_format,
        'Voir ma confirmation',
        route('exam-registrations.show', $registration->id),
        'Vous recevrez un rappel 24h avant l\'examen.',
        config('mail.support_email', 'support@citl.com'),
        config('app.url'),
        date('Y'),
        config('mail.contact_email', 'contact@citl.com'),
        config('social.facebook_url', 'https://www.facebook.com/citl'),
        config('social.twitter_url', 'https://twitter.com/citl'),
        config('social.linkedin_url', 'https://www.linkedin.com/company/citl'),
        route('unsubscribe', $user->id)
    ],
    file_get_contents(resource_path('views/emails/template-base.html'))
) !!}
```

### Configuration recommandée

Ajoutez ces variables dans votre fichier `config/mail.php` :

```php
return [
    // ... autres configurations

    'support_email' => env('MAIL_SUPPORT_ADDRESS', 'support@citl.com'),
    'contact_email' => env('MAIL_CONTACT_ADDRESS', 'contact@citl.com'),
];
```

Et dans un nouveau fichier `config/social.php` :

```php
<?php

return [
    'facebook_url' => env('SOCIAL_FACEBOOK_URL', 'https://www.facebook.com/citl'),
    'twitter_url' => env('SOCIAL_TWITTER_URL', 'https://twitter.com/citl'),
    'linkedin_url' => env('SOCIAL_LINKEDIN_URL', 'https://www.linkedin.com/company/citl'),
];
```

Puis dans votre `.env` :

```env
MAIL_SUPPORT_ADDRESS=support@citl.com
MAIL_CONTACT_ADDRESS=contact@citl.com

SOCIAL_FACEBOOK_URL=https://www.facebook.com/votre-page
SOCIAL_TWITTER_URL=https://twitter.com/votre-compte
SOCIAL_LINKEDIN_URL=https://www.linkedin.com/company/votre-entreprise
```

### Alternative : Utiliser Blade directement

Créez `exam-confirmation.blade.php` en copiant le template et en utilisant la syntaxe Blade :

```blade
<!-- Au lieu de {{USER_NAME}} -->
{{ $user->name }}

<!-- Au lieu de {{MAIN_MESSAGE}} -->
{!! $message !!}
```

## 📱 Responsive Design

Le template est **100% responsive** et s'adapte automatiquement aux mobiles grâce aux media queries incluses.

## 🎨 Personnalisation des couleurs

Pour changer les couleurs, recherchez et remplacez dans le fichier :

- **Couleur primaire** : `#0ea5e9` → Votre couleur
- **Footer sombre** : `#1e293b` → Votre couleur
- **Bordure header** : `border-bottom: 3px solid #0ea5e9`

## 📞 Support

Pour toute question sur l'utilisation des templates :
- Email : keraste38@gmail.com
- Documentation Laravel Mail : https://laravel.com/docs/mail
