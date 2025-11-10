# Benchmark des Solutions CMS pour Laravel - Projet CITL

## Contexte

Le site du CITL doit être un CMS complet type WordPress, permettant :
- **Gestion de contenu** : Pages, articles, événements, etc.
- **Page Builder** : Construction visuelle de pages par drag & drop
- **Menu configurable** : Création et gestion de menus dynamiques
- **Widgets** : Blocs réutilisables pour sidebar, footer, etc.
- **Gestion d'utilisateurs** : Rôles et permissions
- **Multilingue** : Support FR/EN
- **SEO** : Optimisation pour les moteurs de recherche

**Objectif** : Identifier la meilleure solution pour livrer le MVP à 35% en une semaine.

---

## 🎯 Critères d'évaluation

| Critère | Poids | Description |
|---------|-------|-------------|
| **Facilité d'intégration** | ⭐⭐⭐⭐⭐ | Compatibilité avec Laravel 12, React 19, Inertia.js |
| **Page Builder** | ⭐⭐⭐⭐⭐ | Drag & drop visuel, facile à utiliser |
| **Temps de développement** | ⭐⭐⭐⭐⭐ | Rapidité pour atteindre le MVP |
| **Personnalisation** | ⭐⭐⭐⭐ | Flexibilité pour besoins spécifiques |
| **Documentation** | ⭐⭐⭐⭐ | Qualité et complétude de la doc |
| **Communauté** | ⭐⭐⭐⭐ | Support, plugins, mises à jour |
| **Coût** | ⭐⭐⭐ | Gratuit vs payant |
| **Performance** | ⭐⭐⭐⭐ | Vitesse, optimisation |

---

## 📊 Comparaison des Solutions

### 1. **Laravel Pagebuilder (HansSchouten)** ⭐ Référence trouvée par le client

**GitHub** : [HansSchouten/Laravel-Pagebuilder](https://github.com/HansSchouten/Laravel-Pagebuilder)

#### ✅ Avantages
- **Gratuit et Open Source**
- Basé sur **GrapesJS** (drag & drop populaire)
- Hautement personnalisable
- Intégration directe dans Laravel
- Support des templates custom
- Mise à jour récente : **v0.31.0 (5 janvier 2025)**

#### ❌ Inconvénients
- Pas de CMS complet intégré (seulement page builder)
- Nécessite développement custom pour :
  - Gestion de contenu (articles, événements)
  - Système de menus
  - Widgets réutilisables
  - Multilingue
- Documentation limitée
- Communauté plus petite

#### 💰 Coût
**Gratuit**

#### 📝 Verdict
**6.5/10** - Bon pour page builder uniquement, mais nécessite beaucoup de développement custom pour un CMS complet.

---

### 2. **Statamic** ⭐⭐⭐⭐⭐ RECOMMANDÉ #1

**Site** : [statamic.com](https://statamic.com)

#### ✅ Avantages
- **CMS Laravel de référence** en 2025
- Intégration native avec Laravel
- **40+ fieldtypes** pour structurer le contenu
- Gestion d'assets intégrée
- **Formulaires, permissions, navigation builders**
- Mode **Headless** ou **Static Site Generator**
- **Control panel** magnifique et extensible
- Support multilingue natif
- SEO optimisé
- **REST API + GraphQL** pour mode headless
- Compatible avec React, Next.js, Gatsby
- Documentation excellente
- Mises à jour régulières

#### ❌ Inconvénients
- **Approche "structured content"** plutôt que visual page builder
- Courbe d'apprentissage initiale
- **Payant** : 259$/site (licence à vie)
- Pas de drag & drop visuel par défaut

#### 💰 Coût
**259 USD** (licence à vie, 1 site)
**449 USD** (5 sites)
**959 USD** (illimité)

#### 📝 Verdict
**9/10** - Meilleur CMS Laravel en 2025, mais manque de page builder visuel natif.

---

### 3. **Filament + Page Builder Plugin** ⭐⭐⭐⭐⭐ RECOMMANDÉ #2

**Site** : [filamentphp.com](https://filamentphp.com)

#### ✅ Avantages
- **Gratuit et Open Source**
- Framework admin ultra moderne (TALL stack)
- **Filamentor Page Builder** : drag & drop avec grille moderne
- **Fabricator** : système de blocs pour pages
- **Flexible Content Blocks** : blocs réutilisables
- CRUD automatique pour tous les modèles
- Form builder puissant
- Table builder avec filtres avancés
- Système de widgets
- Dashboard personnalisable
- Compatible Inertia.js (via adaptateurs)
- Basé sur **Livewire** (pas Vue.js)
- Communauté très active
- Documentation excellente
- Évolution rapide (v3.x en 2025)

#### ❌ Inconvénients
- Pas de page builder "officiel" intégré (plugins tiers)
- Stack TALL (peut nécessiter adaptation pour React)
- Nécessite configuration pour frontend public
- Plugins page builder encore en développement

#### 💰 Coût
**Gratuit** (core)
Plugins page builder : **Gratuit** (Fabricator) ou **Payants** (Filamentor : ~49€)

#### 📝 Verdict
**9/10** - Excellent choix, moderne, gratuit, avec page builder via plugins. Parfait pour admin panel.

---

### 4. **October CMS** ⭐⭐⭐⭐

**Site** : [octobercms.com](https://octobercms.com)

#### ✅ Avantages
- CMS mature basé sur Laravel
- Interface admin intuitive (type WordPress)
- **Builder plugin** pour drag & drop
- Système de thèmes
- Marketplace de plugins riche
- Multilingue natif
- Communauté large
- Documentation complète
- CMS "clé en main"

#### ❌ Inconvénients
- Basé sur **Laravel 9** (pas 12)
- Architecture plus ancienne
- Moins moderne que Filament/Statamic
- Migration vers October CMS v3 en cours
- Courbe d'apprentissage
- Performance moyenne

#### 💰 Coût
**Gratuit** (core)
Plugins : **Gratuits ou payants** (20-50€)

#### 📝 Verdict
**7.5/10** - Bon CMS traditionnel, mais technologie moins moderne.

---

### 5. **Microweber** ⭐⭐⭐

**Site** : [microweber.org](https://microweber.org)

#### ✅ Avantages
- Gratuit et Open Source
- Basé sur Laravel
- **Drag & drop natif** (éditeur live)
- Template "Dream" avec 75+ layouts
- Interface user-friendly
- E-commerce intégré
- Multilingue
- Adapté pour non-développeurs

#### ❌ Inconvénients
- Moins flexible pour développeurs
- Personnalisation limitée
- Communauté plus petite
- Moins adapté pour projets custom complexes
- Performance moyenne
- Documentation moyenne

#### 💰 Coût
**Gratuit**

#### 📝 Verdict
**6/10** - Bon pour sites simples, moins adapté pour projet custom comme CITL.

---

### 6. **Twill CMS** ⭐⭐⭐⭐

**Site** : [twillcms.com](https://twillcms.com)

#### ✅ Avantages
- Gratuit et Open Source
- CMS moderne basé sur Laravel
- **Built-in content layout controls**
- Design integrity enforcement
- Block-based content
- Media library puissante
- Dashboard élégant
- SEO friendly
- Version **3.5.0** sortie en mars 2025
- Maintenance active

#### ❌ Inconvénients
- Pas de page builder drag & drop visuel
- Approche "block-based" (pas visual)
- Moins connu que Statamic/Filament
- Communauté moyenne
- Documentation en amélioration

#### 💰 Coût
**Gratuit**

#### 📝 Verdict
**7.5/10** - Bon CMS moderne, mais manque page builder visuel.

---

### 7. **Ziora CMS** ⭐⭐⭐⭐

**Site/GitHub** : Développement récent (2024-2025)

#### ✅ Avantages
- CMS spécifiquement pour **Laravel + Inertia.js** ⚡
- Component-based
- **Pragmatic drag-and-drop**
- Customizable
- Moderne et adapté React
- Gère contenu + flexibilité Laravel/Inertia

#### ❌ Inconvénients
- **Très récent** (moins mature)
- Communauté naissante
- Documentation limitée
- Pas encore production-ready
- Peu de retours d'expérience

#### 💰 Coût
**Gratuit** (Open Source)

#### 📝 Verdict
**7/10** - Prometteur pour Laravel+Inertia, mais trop récent pour production immédiate.

---

### 8. **Laravel Grapes** ⭐⭐⭐

**GitHub** : [allamo123/laravel-grapes](https://github.com/allamo123/laravel-grapes)

#### ✅ Avantages
- Gratuit et Open Source
- Basé sur **GrapesJS** (comme HansSchouten)
- Drag & drop frontend
- Supporte fonctionnalités Laravel

#### ❌ Inconvénients
- Projet moins maintenu
- Documentation minimale
- Communauté très petite
- Pas de CMS complet
- Moins fiable que HansSchouten

#### 💰 Coût
**Gratuit**

#### 📝 Verdict
**5.5/10** - Alternative à HansSchouten, mais moins mature.

---

### 9. **Solution Custom (Laravel + GrapesJS direct)** ⭐⭐⭐

#### ✅ Avantages
- Contrôle total
- Adapté exact aux besoins
- Pas de licence
- Performance optimale

#### ❌ Inconvénients
- **Temps de développement très long**
- Maintenance complète à charge
- Pas de communauté
- Réinvente la roue
- ❌ **Impossible d'atteindre MVP en 1 semaine**

#### 💰 Coût
**Gratuit** (mais coût développement élevé)

#### 📝 Verdict
**4/10** - Trop long pour MVP. À éviter pour ce projet.

---

## 🏆 Recommandations finales

### 🥇 Option 1 : **Filament + Fabricator + Développement Frontend Custom**

**Stack recommandée :**
```
Backend Admin: Filament v3.x (admin panel)
Page Builder: Fabricator (blocs) + custom blocks
Frontend: Laravel + Inertia.js + React 19
```

**Pourquoi ?**
- ✅ **Gratuit** (budget 0€)
- ✅ **Laravel 12 compatible**
- ✅ **Moderne** (TALL stack)
- ✅ Admin panel puissant inclus
- ✅ Système de blocs pour pages
- ✅ Flexible pour besoins custom
- ✅ Communauté très active
- ✅ Documentation excellente
- ✅ **Possible d'atteindre MVP 35% en 1 semaine**

**Plan de travail :**
1. Installer Filament (1h)
2. Installer Fabricator (2h)
3. Créer layouts de base (6h)
4. Créer page blocks custom (8h)
5. Développer frontend React (16h)
6. Intégrer contenu (4h)
7. Tests et déploiement (3h)

**Total estimé : 40h = 1 semaine (5j × 8h)**

---

### 🥈 Option 2 : **Statamic (si budget disponible)**

**Stack recommandée :**
```
CMS: Statamic v4.x
Frontend: Statamic Blade ou Headless (React via API)
```

**Pourquoi ?**
- ✅ **CMS le plus complet** pour Laravel
- ✅ Tout intégré (contenu, médias, forms, SEO)
- ✅ Multilingue natif
- ✅ REST API + GraphQL (mode headless)
- ✅ Documentation excellente
- ✅ Support officiel
- ✅ **Gain de temps énorme**

**Coût : 259 USD (1 site)**

**Plan de travail :**
1. Installer Statamic (1h)
2. Configurer collections (4h)
3. Créer templates Blade (8h)
4. Créer fieldsets et blueprints (6h)
5. Intégrer contenu (4h)
6. Customisation CSS (6h)
7. Tests et déploiement (3h)

**Total estimé : 32h = 4 jours**

---

### 🥉 Option 3 : **Laravel Pagebuilder (HansSchouten) + Développement Custom CMS**

**Stack recommandée :**
```
Page Builder: Laravel Pagebuilder (GrapesJS)
CMS Custom: Développement à partir de zéro
Frontend: Laravel + Inertia.js + React
```

**Pourquoi ?**
- ✅ **Gratuit**
- ✅ Page builder drag & drop fonctionnel
- ✅ Basé sur GrapesJS (populaire)

**Mais :**
- ❌ **Nécessite développement complet du CMS**
- ❌ Gestion contenu à développer
- ❌ Système menus à développer
- ❌ Widgets à développer
- ❌ Multilingue à développer
- ❌ **Risque de ne pas finir le MVP en 1 semaine**

**Plan de travail :**
1. Installer Laravel Pagebuilder (2h)
2. Développer système de contenu (12h)
3. Développer gestion menus (8h)
4. Développer système widgets (8h)
5. Intégrer frontend (12h)
6. Tests et déploiement (4h)

**Total estimé : 46h = 6 jours (trop juste)**

---

## 📋 Tableau comparatif récapitulatif

| Solution | Coût | CMS complet | Page Builder | Temps MVP | Score | Recommandation |
|----------|------|-------------|--------------|-----------|-------|----------------|
| **Filament + Fabricator** | **0€** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **5j** | **9/10** | 🥇 **Meilleur choix** |
| **Statamic** | 259$ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | **4j** | **9/10** | 🥈 Si budget ok |
| **Laravel Pagebuilder** | 0€ | ⭐⭐ | ⭐⭐⭐⭐⭐ | **6j+** | **6.5/10** | ⚠️ Risqué pour délai |
| **October CMS** | 0€ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **7j** | **7.5/10** | ❌ Trop long |
| **Twill CMS** | 0€ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **6j** | **7.5/10** | ⚠️ Risqué |
| **Ziora CMS** | 0€ | ⭐⭐⭐ | ⭐⭐⭐⭐ | **?** | **7/10** | ❌ Trop récent |
| **Microweber** | 0€ | ⭐⭐⭐ | ⭐⭐⭐⭐ | **5j** | **6/10** | ❌ Peu flexible |
| **Custom** | 0€ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **10j+** | **4/10** | ❌ Impossible |

---

## 🎯 Décision recommandée

### **🥇 Choisir : Filament + Fabricator**

**Justification :**

1. **Gratuit** ✅
2. **Laravel 12 compatible** ✅
3. **Admin panel moderne inclus** ✅
4. **Système de blocs fonctionnel** ✅
5. **Compatible React via Inertia** ✅
6. **Documentation excellente** ✅
7. **Communauté active (support)** ✅
8. **Évolutif** ✅
9. **MVP 35% atteignable en 1 semaine** ✅

**Architecture proposée :**

```
┌─────────────────────────────────────────┐
│         FRONTEND PUBLIC                 │
│   Laravel + Inertia.js + React 19      │
│         Tailwind CSS v4                 │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│            BACKEND API                  │
│         Laravel 12 Controllers          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         ADMIN PANEL (CMS)               │
│          Filament v3.x                  │
│   + Fabricator (Page Builder)           │
│   + Custom Blocks (Widgets)             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│            BASE DE DONNÉES              │
│              MySQL                      │
└─────────────────────────────────────────┘
```

---

## 📦 Packages Laravel recommandés pour compléter

### Pour enrichir Filament/Fabricator :

1. **Spatie Media Library** - Gestion d'images/médias
   ```bash
   composer require spatie/laravel-medialibrary
   ```

2. **Spatie Translatable** - Multilingue
   ```bash
   composer require spatie/laravel-translatable
   ```

3. **Laravel SEO Tools** - Optimisation SEO
   ```bash
   composer require artesaos/seotools
   ```

4. **Laravel Sitemap** - Génération sitemap
   ```bash
   composer require spatie/laravel-sitemap
   ```

5. **Filament Spatie Media Library** - Intégration Filament
   ```bash
   composer require filament/spatie-laravel-media-library-plugin
   ```

6. **Filament Flexible Content Blocks** - Blocs de contenu
   ```bash
   composer require statikbe/laravel-filament-flexible-content-blocks
   ```

---

## 🚀 Plan d'implémentation (Semaine 1)

### Jour 1 (Lundi)
- Installation Filament + Fabricator
- Configuration base de données
- Création modèles (Page, Article, Event)

### Jour 2 (Mardi)
- Création layouts Filament
- Configuration Fabricator
- Développement 5 page blocks de base

### Jour 3 (Mercredi)
- Développement frontend React (layouts)
- Intégration Inertia.js
- Routes publiques

### Jour 4 (Jeudi)
- Développement pages prioritaires (7 pages)
- Intégration widgets (4 widgets)
- Menu dynamique

### Jour 5 (Vendredi)
- Intégration contenu
- Tests fonctionnels
- Optimisations
- Déploiement

---

## 📞 Support et ressources

### Filament
- **Documentation** : https://filamentphp.com/docs
- **Discord** : https://discord.com/invite/filament
- **GitHub** : https://github.com/filamentphp/filament

### Fabricator
- **Documentation** : https://github.com/z3d0x/filament-fabricator
- **GitHub** : https://github.com/z3d0x/filament-fabricator

### Flexible Content Blocks
- **Documentation** : https://github.com/statikbe/laravel-filament-flexible-content-blocks
- **GitHub** : https://github.com/statikbe/laravel-filament-flexible-content-blocks

---

## ✅ Conclusion

**Pour le projet CITL avec contrainte de livraison MVP 35% en 1 semaine, la solution recommandée est :**

# **Filament + Fabricator + React Frontend Custom**

Cette solution offre le meilleur équilibre entre :
- ✅ Rapidité de développement
- ✅ Fonctionnalités CMS complètes
- ✅ Flexibilité et personnalisation
- ✅ Coût (gratuit)
- ✅ Support communautaire
- ✅ Évolutivité future

**Alternative si budget disponible : Statamic (259$)** pour gagner 1 jour de développement.

**À éviter : Laravel Pagebuilder seul** - nécessite trop de développement custom pour atteindre les objectifs dans les délais.
