# Page Builder - Type Elementor

Un page builder drag-and-drop moderne construit avec Craft.js, inspiré d'Elementor.

## 🎯 Fonctionnalités

### ✅ Sections Configurables
- **Largeur** : Full width, Boxed, Narrow
- **Layout** : Flexbox ou Grid
- **Flexbox** :
  - Direction (row, column, reverse)
  - Justification (start, center, end, between, around, evenly)
  - Alignement (start, center, end, stretch)
- **Grid** : Configuration du nombre de colonnes
- **Espacement** : Gap entre éléments
- **Padding** : Configurable pour chaque côté
- **Margin** : Configurable pour chaque côté
- **Background** : Couleur, Dégradé, ou Image
- **Hauteur minimale** : Personnalisable

### ✅ Widgets Disponibles

#### 1. Hero Widget
- Titre et sous-titre
- Bouton CTA avec lien
- Image de fond
- Alignement du texte (left, center, right)
- Tailles de police personnalisables
- Padding configurable

#### 2. Service Widget
- Titre et description
- Icône Lucide (12+ icônes disponibles)
- Couleur d'icône personnalisable
- Taille d'icône ajustable
- Padding configurable

## 📁 Structure

```
components/page-builder/
├── PageBuilder.tsx          # Wrapper principal avec Craft.js Editor
├── Canvas.tsx               # Zone de drop principale
├── sections/
│   ├── Section.tsx          # Composant Section avec toutes les props CSS
│   └── SectionSettings.tsx  # Panneau de paramètres pour Section
├── widgets/
│   ├── HeroWidget.tsx
│   ├── HeroWidgetSettings.tsx
│   ├── ServiceWidget.tsx
│   └── ServiceWidgetSettings.tsx
├── toolbox/
│   └── Toolbox.tsx          # Barre latérale gauche avec sections/widgets
├── settings/
│   └── SettingsPanel.tsx    # Panneau de propriétés (droite)
└── index.tsx                # Exports
```

## 🚀 Utilisation

### Utiliser la nouvelle page avec Page Builder

```tsx
// Dans routes/web.php
Route::get('/cms/pages/{page}/edit-builder', [CmsPageController::class, 'editBuilder'])
    ->name('cms.pages.edit-builder');
```

### Intégration dans une page Inertia

```tsx
import { PageBuilder } from '@/components/page-builder';

function MyPage() {
    const [builderData, setBuilderData] = useState('');

    return (
        <PageBuilder
            initialData={builderData}
            onSave={(data) => {
                setBuilderData(data);
                // Sauvegarder en base de données
            }}
        />
    );
}
```

## 🎨 Ajouter un nouveau Widget

### 1. Créer le composant Widget

```tsx
// widgets/MyWidget.tsx
import { useNode } from '@craftjs/core';

export const MyWidget = ({ settings = {} }: MyWidgetProps) => {
    const { connectors: { connect, drag }, selected } = useNode((state) => ({
        selected: state.events.selected,
    }));

    return (
        <div ref={(ref) => ref && connect(drag(ref))}>
            {/* Votre contenu */}
        </div>
    );
};

MyWidget.craft = {
    displayName: 'MyWidget',
    props: {
        settings: {
            // Props par défaut
        },
    },
    related: {
        settings: () => import('./MyWidgetSettings').then((m) => m.MyWidgetSettings),
    },
};
```

### 2. Créer le panneau de paramètres

```tsx
// widgets/MyWidgetSettings.tsx
import { useNode } from '@craftjs/core';

export const MyWidgetSettings = () => {
    const { actions: { setProp }, settings } = useNode((node) => ({
        settings: node.data.props.settings,
    }));

    return (
        <div>
            {/* Vos contrôles */}
        </div>
    );
};
```

### 3. Enregistrer dans le resolver

```tsx
// PageBuilder.tsx
<Editor
    resolver={{
        Section,
        HeroWidget,
        ServiceWidget,
        MyWidget, // Ajouter ici
    }}
>
```

### 4. Ajouter dans la Toolbox

```tsx
// toolbox/Toolbox.tsx
const widgets = [
    // ... autres widgets
    {
        name: 'MyWidget',
        icon: YourIcon,
        component: MyWidget,
        description: 'Description de votre widget',
    },
];
```

## 📝 Types

```typescript
// types/page-builder.ts
export interface SectionSettings {
    width: 'full' | 'boxed' | 'narrow';
    layout: 'flex' | 'grid';
    // ... autres propriétés
}

export interface WidgetSettings {
    margin?: SpacingType;
    padding?: SpacingType;
    // ... propriétés communes
}
```

## 💾 Sauvegarde

Les données du page builder sont sérialisées par Craft.js en JSON:

```typescript
const handleSave = (query) => {
    const json = query.serialize();
    // Envoyer à Laravel
    put('/api/pages/' + pageId, { content: json });
};
```

## 🎯 Prochaines étapes

- [ ] Ajouter plus de widgets (Pricing, Testimonial, Gallery, etc.)
- [ ] Upload d'images
- [ ] Prévisualisation responsive
- [ ] Historique undo/redo
- [ ] Templates pré-construits
- [ ] Export/Import de sections
- [ ] Animations et transitions
- [ ] Custom CSS class names
- [ ] Responsive breakpoints

## 📚 Documentation Craft.js

- [Documentation officielle](https://craft.js.org/docs/overview)
- [Tutoriel de base](https://craft.js.org/docs/guides/basic-tutorial)
- [API Reference](https://craft.js.org/docs/api/editor)

## 🤝 Contribution

Pour ajouter de nouveaux widgets ou fonctionnalités, suivez le pattern existant et assurez-vous que:
1. Le widget utilise `useNode` pour la connexion drag & drop
2. Les paramètres sont dans un composant Settings séparé
3. Le widget est enregistré dans le resolver
4. Le widget est ajouté à la Toolbox

