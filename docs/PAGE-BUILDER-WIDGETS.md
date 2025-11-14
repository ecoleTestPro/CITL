# Page Builder Widgets - Liste de référence

Ce document liste tous les widgets à implémenter dans le page builder CITL, inspirés d'Elementor (Free + Pro).

---

## 📋 Widgets actuellement implémentés

### Sections
- ✅ **Section** - Conteneur flexible pour organiser les widgets (flex/grid)

### Widgets de contenu
- ✅ **Hero Widget** - Section d'en-tête avec titre, sous-titre et CTA
- ✅ **Service Widget** - Carte de présentation avec icône

---

## 🎯 Widgets à implémenter

### 1️⃣ Structure & Mise en page

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Colonne** | Système de colonnes responsive (2, 3, 4 colonnes) | 🔴 Haute |
| **Espacement (Spacer)** | Espace vertical ajustable entre éléments | 🔴 Haute |
| **Séparateur (Divider)** | Ligne de séparation horizontale avec styles | 🟡 Moyenne |

---

### 2️⃣ Texte & Typographie

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Titre (Heading)** | Titres H1-H6 avec styles personnalisables | 🔴 Haute |
| **Éditeur de texte** | Bloc de texte riche avec formatage | 🔴 Haute |
| **Paragraphe** | Texte simple sans formatage | 🟡 Moyenne |
| **Liste** | Listes à puces ou numérotées avec icônes | 🟡 Moyenne |
| **Citation (Blockquote)** | Citation avec auteur et styles | 🟢 Basse |
| **En-tête animé** | Texte avec animations (typing, rotation, etc.) | 🟢 Basse |

**Configuration commune:**
- Taille de police
- Couleur
- Poids (weight)
- Alignement
- Espacement lettres/lignes
- Ombre de texte

---

### 3️⃣ Médias

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Image** | Image simple avec légende et lien | 🔴 Haute |
| **Image Box** | Image + titre + description + bouton | 🔴 Haute |
| **Galerie d'images** | Grille d'images responsive avec lightbox | 🟡 Moyenne |
| **Vidéo** | Lecteur vidéo (YouTube, Vimeo, upload) | 🟡 Moyenne |
| **Carrousel d'images** | Slider d'images avec navigation | 🟢 Basse |
| **Carrousel média** | Slider avec images et vidéos mélangées | 🟢 Basse |

**Configuration Image:**
- Taille (cover, contain, auto)
- Border radius
- Ombre
- Filtres (grayscale, blur, brightness)
- Hover effects
- Lightbox

---

### 4️⃣ Boutons & Appels à l'action

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Bouton** | Bouton avec icône, lien et styles | 🔴 Haute |
| **Groupe de boutons** | Plusieurs boutons côte à côte | 🟡 Moyenne |
| **Call to Action (CTA)** | Bloc avec titre, texte et bouton | 🟡 Moyenne |
| **Boutons de partage** | Partage réseaux sociaux | 🟢 Basse |

**Configuration Bouton:**
- Texte et lien
- Icône (avant/après)
- Tailles (small, medium, large)
- Styles (fill, outline, ghost)
- Couleurs (primaire, secondaire, personnalisée)
- Hover effects
- Animations

---

### 5️⃣ Icônes & Graphiques

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Icône** | Icône Lucide avec taille et couleur | 🔴 Haute |
| **Icon Box** | Icône + titre + description | 🔴 Haute |
| **Liste d'icônes** | Liste avec icônes personnalisables | 🟡 Moyenne |
| **Compteur (Counter)** | Nombre animé avec suffixe/préfixe | 🟡 Moyenne |
| **Barre de progression** | Barre de progression animée | 🟢 Basse |
| **Graphique (Chart)** | Graphiques avec Chart.js | 🟢 Basse |

---

### 6️⃣ Cartes & Boîtes

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Carte (Card)** | Carte avec image, titre, texte, bouton | 🔴 Haute |
| **Flip Box** | Carte avec face avant/arrière au survol | 🟡 Moyenne |
| **Info Box** | Boîte d'information stylisée | 🟡 Moyenne |
| **Alert** | Message d'alerte (info, warning, error, success) | 🟡 Moyenne |
| **Tableau de prix** | Grille de tarifs avec caractéristiques | 🟢 Basse |
| **Liste de prix** | Liste avec prix et descriptions | 🟢 Basse |

---

### 7️⃣ Témoignages & Avis

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Témoignage** | Citation avec photo et nom | 🟡 Moyenne |
| **Carrousel de témoignages** | Slider de témoignages | 🟡 Moyenne |
| **Carte d'équipe** | Photo + nom + poste + réseaux sociaux | 🟡 Moyenne |
| **Avis (Review)** | Notation étoiles + commentaire | 🟢 Basse |

---

### 8️⃣ Formulaires

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Formulaire de contact** | Form builder avec champs personnalisables | 🔴 Haute |
| **Newsletter** | Inscription newsletter (email only) | 🟡 Moyenne |
| **Formulaire de recherche** | Barre de recherche stylisée | 🟢 Basse |

**Champs de formulaire:**
- Texte
- Email
- Téléphone
- Textarea
- Select
- Checkbox
- Radio
- File upload
- Date
- CAPTCHA

---

### 9️⃣ Navigation & Interaction

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Accordéon** | Liste pliable/dépliable | 🟡 Moyenne |
| **Onglets (Tabs)** | Contenu organisé en onglets | 🟡 Moyenne |
| **Ancre de menu** | Point d'ancrage pour navigation | 🟡 Moyenne |
| **Table des matières** | Génération automatique du sommaire | 🟢 Basse |
| **Compte à rebours** | Timer avec date cible | 🟢 Basse |

---

### 🔟 Contenu dynamique

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Articles (Posts)** | Grille d'articles du blog | 🟡 Moyenne |
| **Carrousel d'articles** | Slider d'articles | 🟢 Basse |
| **Catégories** | Liste des catégories | 🟢 Basse |
| **Tags** | Nuage de tags | 🟢 Basse |

---

### 1️⃣1️⃣ Intégrations & Embed

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Google Maps** | Carte interactive | 🟡 Moyenne |
| **Shortcode** | Exécution de shortcodes Laravel | 🟡 Moyenne |
| **HTML personnalisé** | Code HTML brut | 🟡 Moyenne |
| **Code** | Bloc de code avec syntax highlighting | 🟢 Basse |
| **SoundCloud** | Lecteur audio SoundCloud | 🟢 Basse |
| **Lottie** | Animations Lottie JSON | 🟢 Basse |

---

### 1️⃣2️⃣ Effets visuels & Avancés

| Widget | Description | Priorité |
|--------|-------------|----------|
| **Slides** | Diaporama plein écran avec navigation | 🟢 Basse |
| **Parallax** | Effet parallaxe sur images | 🟢 Basse |
| **Sticky** | Élément fixe au scroll | 🟢 Basse |
| **Motion Effects** | Animations au scroll | 🟢 Basse |

---

## 🎨 Propriétés communes à tous les widgets

### Layout
- Width (px, %, auto)
- Height (px, %, auto, vh)
- Margin (top, right, bottom, left)
- Padding (top, right, bottom, left)
- Display (block, flex, grid, inline-block)
- Position (relative, absolute, fixed, sticky)
- Z-index

### Style
- Background (color, gradient, image)
- Border (width, style, color, radius)
- Box shadow
- Opacity
- Transform (rotate, scale, translate)

### Advanced
- CSS classes personnalisées
- Custom CSS
- Visibility (responsive)
- Animations d'entrée (fade, slide, zoom, etc.)
- Animation duration et delay

---

## 📦 Plan de développement par phases

### Phase 1 - Fondamentaux (Sprint 1-2)
**Priorité HAUTE - Widgets essentiels**

✅ Structure de base
- ✅ Section
- ✅ Hero Widget
- ✅ Service Widget

🔲 Texte & Layout
- [ ] Titre (Heading)
- [ ] Éditeur de texte
- [ ] Colonne
- [ ] Espacement (Spacer)

🔲 Médias & Boutons
- [ ] Image
- [ ] Image Box
- [ ] Bouton
- [ ] Icon Box

🔲 Formulaire de base
- [ ] Formulaire de contact

---

### Phase 2 - Contenu enrichi (Sprint 3-4)
**Priorité MOYENNE - Amélioration de l'expérience**

- [ ] Galerie d'images
- [ ] Vidéo
- [ ] Carte (Card)
- [ ] Accordéon
- [ ] Onglets (Tabs)
- [ ] Témoignage
- [ ] Carrousel de témoignages
- [ ] Google Maps
- [ ] Call to Action (CTA)
- [ ] Liste d'icônes
- [ ] Alert
- [ ] Séparateur (Divider)

---

### Phase 3 - Fonctionnalités avancées (Sprint 5-6)
**Priorité BASSE - Nice to have**

- [ ] Articles (Posts Grid)
- [ ] Compte à rebours
- [ ] Tableau de prix
- [ ] Flip Box
- [ ] Carrousel d'images
- [ ] En-tête animé
- [ ] Citation (Blockquote)
- [ ] Compteur (Counter)
- [ ] Barre de progression
- [ ] Code avec syntax highlighting
- [ ] Shortcode Laravel

---

## 🛠️ Template de création de widget

Lors de l'ajout d'un nouveau widget, suivre ce template :

```tsx
// 1. Créer le composant widget
// resources/js/components/page-builder/widgets/MyWidget.tsx

import { useNode } from '@craftjs/core';
import { cn } from '@/lib/utils';
import type { MyWidgetSettings } from '@/types/page-builder';
import { MyWidgetSettings as MyWidgetSettingsComponent } from './MyWidgetSettings';

interface MyWidgetProps {
  settings?: Partial<MyWidgetSettings>;
}

export const MyWidget = ({ settings = {} }: MyWidgetProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { /* destructure settings */ } = settings;

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn(
        'relative',
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      {/* Widget content */}
    </div>
  );
};

MyWidget.craft = {
  displayName: 'My Widget',
  props: {
    settings: {
      // Default values
    },
  },
  related: {
    settings: MyWidgetSettingsComponent,
  },
};
```

```tsx
// 2. Créer le composant settings
// resources/js/components/page-builder/widgets/MyWidgetSettings.tsx

import { useNode } from '@craftjs/core';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const MyWidgetSettings = () => {
  const {
    actions: { setProp },
    settings,
  } = useNode((node) => ({
    settings: node.data.props.settings,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label>Setting Name</Label>
        <Input
          value={settings.propertyName}
          onChange={(e) =>
            setProp((props: any) => {
              props.settings.propertyName = e.target.value;
            })
          }
        />
      </div>
    </div>
  );
};
```

```typescript
// 3. Ajouter le type dans types/page-builder.ts
export interface MyWidgetSettings {
  propertyName: string;
  // ... other properties
}
```

```tsx
// 4. Enregistrer dans PageBuilder.tsx
import { MyWidget } from './widgets/MyWidget';

<Editor
  resolver={{
    Canvas,
    Section,
    HeroWidget,
    ServiceWidget,
    MyWidget, // ← Add here
  }}
>
```

```tsx
// 5. Ajouter dans Toolbox.tsx
const widgets = [
  // ... existing widgets
  {
    name: 'My Widget',
    icon: IconName,
    description: 'Description du widget',
    component: MyWidget,
  },
];
```

---

## 📚 Ressources

### Icônes disponibles
- **Lucide Icons** : https://lucide.dev/icons/
- Plus de 1000 icônes utilisables avec `import { IconName } from 'lucide-react'`

### Composants UI disponibles
- Tous les composants shadcn/ui dans `resources/js/components/ui/`
- Button, Input, Select, Card, Badge, Dialog, Tabs, Accordion, etc.

### Référence Design
- Voir `UI-UX-GUIDELINES.md` pour les couleurs, typographie et styles

---

**Version:** 1.0
**Dernière mise à jour:** 12 novembre 2025
**Maintenu par:** Équipe CITL Dev
