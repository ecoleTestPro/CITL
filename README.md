# Système de Gestion de l'Apprentissage (LMS)

Un système de gestion de l'apprentissage moderne et complet construit avec Laravel 12, React 19 et TypeScript.

## Technologies Utilisées

- **Backend** : Laravel 12 (PHP 8.2+) avec Inertia.js
- **Frontend** : React 19 + TypeScript
- **Styles** : Tailwind CSS v4
- **Base de données** : MySQL/SQLite avec Eloquent ORM
- **Authentification** : Laravel Fortify avec support 2FA
- **Tests** : Pest PHP
- **Build** : Vite avec support SSR

## Fonctionnalités Principales

### Modules Métier

1. **Module Utilisateur**
   - Authentification et profils utilisateurs
   - Gestion des instructeurs
   - Formation et expérience professionnelle

2. **Module Cours**
   - Gestion complète des cours
   - Catégories et chapitres
   - Contenus multimédias
   - Inscriptions et suivi de progression
   - Système d'évaluation et avis

3. **Module Évaluations**
   - Examens et quiz
   - Gestion des questions
   - Sessions d'examens avec suivi
   - Historique des tentatives et scores

4. **Module Certificats**
   - Génération automatique de certificats
   - Personnalisation des modèles
   - Export PDF

5. **Module Blog**
   - Publication d'articles
   - Gestion du contenu

6. **Module Administration**
   - Tableau de bord administrateur
   - Génération de rapports
   - Export PDF/CSV
   - Filtrage et recherche avancée

### Fonctionnalités Techniques

- **Authentification à deux facteurs (2FA)** avec codes de récupération
- **Server-Side Rendering (SSR)** optionnel
- **Routes typées** avec Laravel Wayfinder
- **Thèmes** : Mode clair, sombre et système
- **Pattern Repository** pour l'accès aux données
- **API RESTful** avec ressources Laravel
- **File d'attente** pour les tâches longues
- **React Compiler** pour optimisation automatique

## Installation

### Prérequis

- PHP 8.2 ou supérieur
- Composer
- Node.js 22 ou supérieur
- MySQL ou SQLite
- Extensions PHP : openssl, pdo, mbstring, tokenizer, xml, ctype, json

### Configuration Initiale

```bash
# Cloner le projet
git clone <url-du-repo>
cd CITL/src

# Installation complète (dépendances, .env, migrations, assets)
composer run setup
```

Cette commande effectue automatiquement :
- Installation des dépendances PHP et Node.js
- Copie du fichier `.env.example` vers `.env`
- Génération de la clé d'application
- Exécution des migrations
- Compilation des assets frontend

### Configuration de l'Environnement

Modifiez le fichier `.env` selon vos besoins :

```env
APP_NAME="Mon LMS"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_base_donnees
DB_USERNAME=utilisateur
DB_PASSWORD=mot_de_passe

# Pour activer le SSR (optionnel)
INERTIA_SSR_ENABLED=false
INERTIA_SSR_URL=http://127.0.0.1:13714
```

## Développement

### Démarrer le Serveur de Développement

```bash
# Démarre tous les services (serveur, queue, logs, vite)
composer run dev
```

Cette commande lance 4 processus simultanés :
- Serveur PHP sur le port 8000
- Worker de file d'attente
- Laravel Pail pour les logs
- Serveur de développement Vite

Accédez à l'application : http://localhost:8000

### Développement avec SSR

```bash
composer run dev:ssr
```

### Commandes Utiles

#### Base de Données

```bash
php artisan migrate                    # Exécuter les migrations
php artisan migrate:fresh             # Recréer la base de données
php artisan migrate:fresh --seed      # Recréer et alimenter
php artisan migrate:rollback          # Annuler la dernière migration
```

#### Génération de Code

```bash
# Créer un modèle avec migration, factory, seeder et controller
php artisan make:model NomModele -mfsc

# Créer un contrôleur de ressources
php artisan make:controller NomController --resource

# Créer une requête de validation
php artisan make:request StoreNomRequest

# Générer les routes TypeScript
php artisan wayfinder:generate
```

#### File d'Attente

```bash
php artisan queue:work              # Démarrer le worker
php artisan queue:listen --tries=1  # Mode développement
php artisan queue:restart           # Redémarrer tous les workers
```

## Tests

### Exécuter les Tests

```bash
# Tous les tests
composer run test

# Directement avec Pest
./vendor/bin/pest

# Test spécifique
./vendor/bin/pest --filter AuthenticationTest

# Avec couverture
./vendor/bin/pest --coverage
```

Les tests utilisent SQLite en mémoire pour des performances optimales.

## Qualité du Code

### PHP

```bash
# Formater le code selon les standards Laravel
vendor/bin/pint

# Vérifier sans modifier
vendor/bin/pint --test
```

### JavaScript/TypeScript

```bash
# Linter avec correction automatique
npm run lint

# Formater avec Prettier
npm run format

# Vérifier le formatage
npm run format:check

# Vérification des types TypeScript
npm run types
```

## Build pour Production

```bash
# Build des assets frontend
npm run build

# Build avec support SSR
npm run build:ssr

# Optimiser l'autoloader Composer
composer install --optimize-autoloader --no-dev

# Optimiser Laravel
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Architecture

### Pattern Repository

Tous les accès à la base de données passent par des repositories :

```php
// Dans un contrôleur
public function index(CourseRepository $courseRepo)
{
    $courses = $courseRepo->all();
    return $this->json('Cours trouvés', ['courses' => $courses], 200);
}
```

### Organisation Modulaire

```
app/
├── Models/              # Modèles organisés par module
│   ├── User/
│   ├── Course/
│   ├── Assessment/
│   └── ...
├── Repositories/        # Repositories par module
│   ├── BaseRepository.php
│   ├── User/
│   ├── Course/
│   └── ...
└── Http/Controllers/    # Contrôleurs par module
```

### Frontend React

```
resources/js/
├── pages/              # Pages Inertia
│   ├── auth/          # Authentification
│   ├── settings/      # Paramètres utilisateur
│   └── dashboard.tsx
├── layouts/           # Layouts réutilisables
├── components/        # Composants React
│   └── ui/           # Composants UI (Radix)
├── hooks/            # Hooks personnalisés
├── types/            # Types TypeScript
└── routes/           # Routes générées par Wayfinder
```

### Utilisation des Routes Typées

```tsx
import { login, dashboard } from '@/routes';
import { Link } from '@inertiajs/react';

function Navigation() {
    return (
        <nav>
            <Link href={login().url}>Connexion</Link>
            <Link href={dashboard().url}>Tableau de bord</Link>
        </nav>
    );
}
```

## Intégration Continue

Le projet utilise GitHub Actions pour :

### Workflow Linter
- Laravel Pint (PHP)
- Prettier (JS/TS)
- ESLint (JS/TS)

### Workflow Tests
- Configuration PHP 8.4 + Node 22
- Installation des dépendances
- Build des assets
- Exécution des tests Pest

Les workflows s'exécutent sur les branches `main` et `develop`.

## Stratégie de Branches

- `main` : Branche de production
- `develop` : Branche de développement
- `feature/*` : Branches de fonctionnalités

Créez des Pull Requests vers `develop` pour vos nouvelles fonctionnalités.

## Conventions de Code

### PHP
- PSR-12 avec Laravel Pint
- Type hints stricts
- Return types déclarés
- DocBlocks pour les méthodes publiques

### TypeScript
- Strict mode activé
- Props interfaces pour les composants
- Hooks typés
- Pas de `any` sauf exception justifiée

### Commits
- Messages en anglais
- Format : `type: description`
- Types : feat, fix, docs, style, refactor, test, chore

## Sécurité

- **CSRF Protection** : Activé sur tous les formulaires
- **XSS Prevention** : Échappement automatique des données
- **SQL Injection** : Protection via Eloquent ORM
- **2FA** : Authentification à deux facteurs disponible
- **Rate Limiting** : Limitation des tentatives de connexion
- **Password Hashing** : Bcrypt par défaut

## Performance

- **Eager Loading** : Éviter les requêtes N+1
- **Query Optimization** : Indexes sur les clés étrangères
- **Asset Optimization** : Minification et tree-shaking avec Vite
- **React Compiler** : Mémorisation automatique des composants
- **Queue Jobs** : Tâches asynchrones pour les opérations longues
- **Cache** : Configuration Redis disponible

## Dépannage

### Problèmes Courants

**Erreur de permissions sur storage/**
```bash
chmod -R 775 storage bootstrap/cache
```

**Vite ne se connecte pas**
```bash
# Vérifier que le port 5173 est libre
npm run dev
```

**Erreurs de migrations**
```bash
# Réinitialiser complètement
php artisan migrate:fresh
```

**Assets non chargés**
```bash
# Recompiler les assets
npm run build
php artisan optimize:clear
```

## Contribution

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'feat: ajouter nouvelle fonctionnalite'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation Laravel : https://laravel.com/docs
- Consultez la documentation React : https://react.dev

## Remerciements

- [Laravel](https://laravel.com) - Framework PHP
- [React](https://react.dev) - Bibliothèque UI
- [Inertia.js](https://inertiajs.com) - Pont backend/frontend
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Radix UI](https://www.radix-ui.com) - Composants UI accessibles
