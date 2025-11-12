# Page d'accueil dynamique et Pages statiques

## Nouvelles fonctionnalités

### 1. Page d'accueil dynamique

La page d'accueil (`/`) est maintenant dynamique et peut être définie depuis l'interface CMS.

#### Comment définir une page comme page d'accueil:

1. Allez dans **CMS > Pages**
2. Publiez la page que vous souhaitez définir comme page d'accueil (statut: "Publié")
3. Cliquez sur le bouton **"Définir comme accueil"** dans la colonne Actions
4. La page est maintenant votre page d'accueil

**Note:**
- Seules les pages **publiées** peuvent être définies comme page d'accueil
- Une seule page peut être la page d'accueil à la fois
- Si aucune page n'est définie comme page d'accueil, le système affiche la page d'accueil par défaut

### 2. Types de pages statiques

Les pages peuvent maintenant avoir différents types:

#### Types disponibles:

- **Page personnalisée** (`custom`) - Page avec contenu libre créé avec le page builder
- **Page d'accueil** (`home`) - Page d'accueil avec structure prédéfinie
- **Contact** (`contact`) - Page de contact avec formulaire
- **À propos** (`about`) - Page à propos de l'organisation
- **Conditions d'utilisation** (`terms`) - Conditions générales d'utilisation
- **Politique de confidentialité** (`privacy`) - Politique de confidentialité

#### Avantages des pages statiques:

- Structure prédéfinie et cohérente
- Facilite la maintenance
- Identifiables visuellement dans la liste des pages (badge violet)
- Peuvent être facilement étendues avec de nouveaux types

## Modifications techniques

### Base de données

Deux nouveaux champs ont été ajoutés à la table `cms_pages`:

```php
$table->boolean('is_homepage')->default(false);
$table->string('page_type')->default('custom');
```

### Modèle CmsPage

Nouvelles constantes et méthodes:

```php
// Constantes de types
public const TYPE_CUSTOM = 'custom';
public const TYPE_HOME = 'home';
public const TYPE_CONTACT = 'contact';
// ... etc

// Méthode pour obtenir les types disponibles
public static function pageTypes(): array

// Scope pour récupérer la homepage
public function scopeHomepage($query)

// Scope pour filtrer par type
public function scopeByType($query, string $type)
```

### Routes

Nouvelle route pour définir une page comme homepage:

```php
Route::post('cms/pages/{page}/set-homepage', [CmsPageController::class, 'setAsHomepage'])
    ->name('cms.pages.set-homepage');
```

### Interface utilisateur

#### Liste des pages (`/cms/pages`):

- **Badge "Accueil"** (bleu) - Indique la page définie comme page d'accueil
- **Badge de type** (violet/gris) - Affiche le type de page
- **Bouton "Définir comme accueil"** - Disponible pour les pages publiées non-homepage
- **Colonne Type** - Nouvelle colonne affichant le type de page

#### Création/Édition de page:

- **Sélecteur de type de page** - Permet de choisir le type lors de la création ou édition
- **Info contextuelle** - Message indiquant qu'une page statique a une structure prédéfinie

## Utilisation

### Créer une nouvelle page:

1. Allez dans **CMS > Pages**
2. Cliquez sur **"+ Nouvelle page"**
3. Remplissez le titre
4. Sélectionnez le **type de page** (par défaut: Page personnalisée)
5. Choisissez le statut (Brouillon ou Publié)
6. Remplissez les informations SEO
7. Cliquez sur **"Créer la page"**
8. Utilisez le page builder pour créer le contenu

### Éditer une page existante:

1. Dans la liste des pages, cliquez sur **"Éditer"**
2. Utilisez le panneau de paramètres (icône ⚙️ en haut à droite) pour:
   - Modifier le titre
   - Changer le type de page
   - Modifier le statut
   - Gérer les informations SEO
3. Utilisez le page builder pour modifier le contenu
4. Cliquez sur **"Enregistrer"** pour sauvegarder

### Définir une page comme homepage:

1. Publiez votre page si ce n'est pas déjà fait
2. Dans la liste des pages, trouvez la page souhaitée
3. Cliquez sur **"Définir comme accueil"**
4. Confirmez l'action
5. La page est maintenant la page d'accueil du site

## Migration

Pour appliquer ces changements sur une installation existante:

```bash
# Exécuter la migration
php artisan migrate

# Compiler les assets frontend
npm run build

# Ou en mode développement
npm run dev
```

## Développements futurs possibles

- Ajouter plus de types de pages statiques (FAQ, Blog, Services, etc.)
- Créer des templates prédéfinis pour chaque type de page
- Ajouter un système de prévisualisation des structures prédéfinies
- Permettre la personnalisation des structures des pages statiques
- Ajouter des champs spécifiques selon le type de page
