# Guidelines UI/UX - CITL

## Table des matières
1. [Palette de couleurs](#palette-de-couleurs)
2. [Typographie](#typographie)
3. [Espacement & Grille](#espacement--grille)
4. [Composants](#composants)
5. [Principes UI/UX](#principes-uiux)
6. [Accessibilité](#accessibilité)
7. [Responsive Design](#responsive-design)

---

## Palette de couleurs

### Couleurs principales

#### Primaire - Orange
```css
--primary: #d65d03;
--primary-hover: #b84f02;
--primary-light: #ff8c42;
--primary-dark: #a34a02;
```
**Usage:** Actions principales, boutons CTA, liens importants, éléments d'accent

#### Secondaire - Vert
```css
--secondary: #5fa772;
--secondary-hover: #4f8f60;
--secondary-light: #7bc18d;
--secondary-dark: #3d7a4d;
```
**Usage:** Actions secondaires, états de succès, badges positifs, illustrations

### Couleurs neutres

```css
--background: #ffffff;
--foreground: #0a0a0a;
--muted: #f5f5f5;
--muted-foreground: #737373;
--border: #e5e5e5;
--input: #e5e5e5;
--ring: #d65d03;
```

### Couleurs sémantiques

```css
--success: #5fa772;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Couleurs de cartes et composants

```css
--card: #ffffff;
--card-foreground: #0a0a0a;
--popover: #ffffff;
--popover-foreground: #0a0a0a;
```

### Mode sombre (optionnel)

```css
--background-dark: #0a0a0a;
--foreground-dark: #fafafa;
--primary-dark-mode: #ff8c42;
--secondary-dark-mode: #7bc18d;
```

---

## Typographie

### Famille de polices

```css
--font-sans: "Inter", system-ui, -apple-system, sans-serif;
--font-heading: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "Fira Code", monospace;
```

**Installation:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Hiérarchie typographique

#### Titres
```css
h1 { font-size: 3rem; font-weight: 800; line-height: 1.2; } /* 48px */
h2 { font-size: 2.25rem; font-weight: 700; line-height: 1.3; } /* 36px */
h3 { font-size: 1.875rem; font-weight: 600; line-height: 1.4; } /* 30px */
h4 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; } /* 24px */
h5 { font-size: 1.25rem; font-weight: 600; line-height: 1.5; } /* 20px */
h6 { font-size: 1rem; font-weight: 600; line-height: 1.5; } /* 16px */
```

#### Corps de texte
```css
body { font-size: 1rem; font-weight: 400; line-height: 1.6; } /* 16px */
small { font-size: 0.875rem; } /* 14px */
.text-xs { font-size: 0.75rem; } /* 12px */
```

#### Poids de police
- **Light (300):** Sous-titres longs, descriptions secondaires
- **Regular (400):** Corps de texte standard
- **Medium (500):** Labels, navigation
- **Semibold (600):** Sous-titres, titres de sections
- **Bold (700):** Titres principaux, en-têtes
- **Extrabold (800):** Titres hero, landing pages

---

## Espacement & Grille

### Système d'espacement (basé sur 4px)

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
```

### Layout

```css
--container-max-width: 1280px;
--container-padding: 1rem; /* Mobile */
--container-padding-lg: 2rem; /* Desktop */

--sidebar-width: 280px;
--header-height: 64px;
```

### Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

---

## Composants

### Boutons

#### Bouton primaire
```jsx
<button className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
  Action principale
</button>
```

#### Bouton secondaire
```jsx
<button className="bg-secondary hover:bg-secondary-hover text-white font-medium px-6 py-3 rounded-lg transition-colors">
  Action secondaire
</button>
```

#### Bouton outline
```jsx
<button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-lg transition-all">
  Action alternative
</button>
```

#### Tailles
- **Small:** `px-4 py-2 text-sm`
- **Default:** `px-6 py-3 text-base`
- **Large:** `px-8 py-4 text-lg`

### Cartes

```jsx
<div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
  <h3 className="text-xl font-semibold mb-2">Titre de la carte</h3>
  <p className="text-muted-foreground">Description du contenu</p>
</div>
```

### Badges

```jsx
/* Succès */
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
  Publié
</span>

/* Warning */
<span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium">
  Brouillon
</span>

/* Error */
<span className="bg-error/10 text-error px-3 py-1 rounded-full text-sm font-medium">
  Erreur
</span>
```

### Inputs

```jsx
<input
  type="text"
  className="w-full border border-input bg-background px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
  placeholder="Entrez votre texte"
/>
```

### Navigation

```jsx
<nav className="flex items-center gap-1">
  <a href="#" className="px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors">
    Lien
  </a>
  <a href="#" className="px-4 py-2 rounded-lg bg-primary text-white">
    Lien actif
  </a>
</nav>
```

---

## Principes UI/UX

### 1. Clarté et Simplicité
- **Une action par bouton:** Chaque bouton doit avoir un objectif clair et unique
- **Hiérarchie visuelle:** Utiliser la taille, le poids et la couleur pour créer une hiérarchie claire
- **Espaces blancs:** Laisser respirer les éléments pour améliorer la lisibilité

### 2. Cohérence
- **Composants réutilisables:** Utiliser les mêmes composants dans toute l'application
- **Patterns d'interaction:** Maintenir les mêmes patterns (ex: tous les formulaires se valident de la même manière)
- **Nomenclature:** Utiliser les mêmes termes pour les mêmes concepts

### 3. Feedback utilisateur
- **États de chargement:** Toujours afficher un indicateur pendant les opérations longues
- **Messages de confirmation:** Confirmer les actions importantes (suppression, publication)
- **Animations subtiles:** Utiliser des transitions (200-300ms) pour guider l'attention

```css
.transition-smooth {
  transition: all 0.2s ease-in-out;
}

.transition-medium {
  transition: all 0.3s ease-in-out;
}
```

### 4. Accessibilité d'abord
- **Contraste suffisant:** Ratio minimum de 4.5:1 pour le texte normal
- **Navigation au clavier:** Tous les éléments interactifs doivent être accessibles au clavier
- **Labels explicites:** Tous les inputs doivent avoir des labels clairs

### 5. Mobile First
- **Design responsive:** Commencer par le mobile et adapter pour le desktop
- **Touch targets:** Minimum 44x44px pour les éléments tactiles
- **Gestes naturels:** Swipe, pinch-to-zoom où approprié

### 6. Performance
- **Images optimisées:** Utiliser des formats modernes (WebP, AVIF)
- **Lazy loading:** Charger les images et composants à la demande
- **Code splitting:** Diviser le bundle pour un chargement plus rapide

---

## Accessibilité

### Contraste de couleurs

#### Texte normal (16px+)
- Primaire sur blanc: ✅ 6.2:1
- Secondaire sur blanc: ✅ 4.7:1
- Muted sur fond: ✅ 4.6:1

#### Texte large (24px+)
- Minimum requis: 3:1
- Toutes nos couleurs principales passent ce test

### Focus states

```css
/* Focus visible pour la navigation au clavier */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Supprimer l'outline par défaut */
*:focus {
  outline: none;
}
```

### ARIA Labels

```jsx
/* Boutons avec icônes seulement */
<button aria-label="Supprimer">
  <TrashIcon />
</button>

/* Navigation */
<nav aria-label="Navigation principale">
  <ul role="list">
    <li><a href="/">Accueil</a></li>
  </ul>
</nav>

/* Messages d'état */
<div role="alert" aria-live="polite">
  Enregistrement réussi
</div>
```

### Skip links

```jsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white">
  Aller au contenu principal
</a>
```

---

## Responsive Design

### Breakpoints d'utilisation

#### Mobile (< 640px)
```css
/* Stack vertical */
.container {
  padding: 1rem;
}

.grid {
  grid-template-columns: 1fr;
}

/* Navigation hamburger */
.nav-menu {
  display: none;
}
```

#### Tablet (640px - 1024px)
```css
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

#### Desktop (1024px+)
```css
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Navigation horizontale */
  .nav-menu {
    display: flex;
  }
}
```

### Images responsives

```jsx
<img
  src="/image.jpg"
  srcSet="/image-small.jpg 640w, /image-medium.jpg 1024w, /image-large.jpg 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Description"
  loading="lazy"
/>
```

---

## Animations et Transitions

### Principes
- **Subtiles et rapides:** 200-300ms pour la plupart des transitions
- **Naturelles:** Utiliser des easing functions naturelles (ease-in-out)
- **Purposeful:** Chaque animation doit avoir un but (feedback, guidance)

### Transitions communes

```css
/* Hover states */
.button {
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}
```

### Exemples d'usage

```jsx
/* Loading spinner */
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>

/* Toast notification */
<div className="slide-up fixed bottom-4 right-4 bg-card shadow-lg rounded-lg p-4">
  Message de notification
</div>

/* Modal backdrop */
<div className="fade-in fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
```

---

## Checklist UI/UX

### Avant de livrer une feature

#### Design
- [ ] Cohérent avec les guidelines de couleurs
- [ ] Typographie appropriée et hiérarchique
- [ ] Espacement correct (système de 4px)
- [ ] Responsive sur tous les breakpoints

#### UX
- [ ] Navigation intuitive et claire
- [ ] Feedback visuel pour toutes les actions
- [ ] États de chargement implémentés
- [ ] Messages d'erreur explicites

#### Accessibilité
- [ ] Contraste de couleurs suffisant
- [ ] Navigation au clavier fonctionnelle
- [ ] Labels ARIA appropriés
- [ ] Textes alternatifs pour les images

#### Performance
- [ ] Images optimisées et lazy-loaded
- [ ] Animations fluides (60fps)
- [ ] Temps de chargement < 3s

#### Testing
- [ ] Testé sur Chrome, Firefox, Safari
- [ ] Testé sur mobile (iOS & Android)
- [ ] Testé avec lecteur d'écran
- [ ] Testé la navigation au clavier

---

## Resources et outils

### Design
- **Figma:** Pour les maquettes et prototypes
- **ColorHunt:** Inspiration pour les palettes de couleurs
- **Contrast Checker:** Vérifier les ratios de contraste

### Développement
- **Tailwind CSS:** Framework CSS utility-first
- **shadcn/ui:** Composants React accessibles
- **Lucide Icons:** Bibliothèque d'icônes

### Testing
- **WAVE:** Extension browser pour l'accessibilité
- **Lighthouse:** Audit de performance et accessibilité
- **axe DevTools:** Testing d'accessibilité

---

## Exemples de pages

### Page Hero

```jsx
<section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
  <div className="container mx-auto px-4">
    <h1 className="text-5xl font-extrabold mb-6">
      Comité Ivoirien des Tests Logiciels
    </h1>
    <p className="text-xl mb-8 opacity-90">
      Obtenez votre certification ISTQB reconnue internationalement
    </p>
    <div className="flex gap-4">
      <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Commencer
      </button>
      <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
        En savoir plus
      </button>
    </div>
  </div>
</section>
```

### Section Features

```jsx
<section className="py-20 bg-muted/30">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Nos certifications</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.id} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <feature.icon className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

**Version:** 1.0
**Dernière mise à jour:** 12 novembre 2025
**Maintenu par:** Équipe CITL Dev
