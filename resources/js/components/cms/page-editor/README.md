# Page Editor Components

Interface moderne d'édition de pages CMS inspirée d'Elementor et des meilleurs page builders.

## Composants

### EditorToolbar
Barre d'outils supérieure sticky avec :
- Bouton retour
- Titre de la page et statut
- Aperçu des appareils (Desktop/Tablet/Mobile)
- Bouton aperçu
- Bouton paramètres (toggle panneau latéral)
- Bouton enregistrer

**Props:**
```tsx
interface EditorToolbarProps {
    pageTitle: string;
    status: 'draft' | 'published';
    isSubmitting: boolean;
    onBack?: () => void;
    onPreview?: () => void;
    onSave?: () => void;
    onSettingsToggle?: () => void;
    settingsOpen?: boolean;
}
```

### SettingsPanel
Panneau latéral droit avec onglets pour :
- Paramètres généraux (titre, statut)
- SEO (meta title, description)
- Paramètres avancés

**Props:**
```tsx
interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    generalSection?: React.ReactNode;
    seoSection?: React.ReactNode;
}
```

### ContentEditorSection
Zone d'édition principale avec EditorJS intégré.

**Props:**
```tsx
interface ContentEditorSectionProps {
    initialContent?: any;
}
```

**Ref:**
```tsx
interface ContentEditorRef {
    save: () => Promise<any>;
}
```

### GeneralInfoSection
Section pour les informations générales de la page.

**Props:**
```tsx
interface GeneralInfoSectionProps {
    title: string;
    status: 'draft' | 'published';
    onTitleChange: (value: string) => void;
    onStatusChange: (value: 'draft' | 'published') => void;
    titleError?: string;
}
```

### SeoSection
Section pour les paramètres SEO avec compteur de caractères.

**Props:**
```tsx
interface SeoSectionProps {
    seoTitle: string;
    seoDescription: string;
    onSeoTitleChange: (value: string) => void;
    onSeoDescriptionChange: (value: string) => void;
}
```

### EditorLayout
Layout adaptatif qui ajuste la largeur selon l'état du panneau de paramètres.

**Props:**
```tsx
interface EditorLayoutProps {
    children: React.ReactNode;
    settingsOpen?: boolean;
}
```

## Utilisation

```tsx
import {
    EditorToolbar,
    SettingsPanel,
    EditorLayout,
    ContentEditorSection,
    GeneralInfoSection,
    SeoSection,
    type ContentEditorRef,
} from '@/components/cms/page-editor';

function PageEditor() {
    const editorRef = useRef<ContentEditorRef>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleSave = async () => {
        const content = await editorRef.current?.save();
        // Sauvegarder le contenu
    };

    return (
        <>
            <EditorToolbar
                pageTitle="Ma Page"
                status="draft"
                isSubmitting={false}
                onSave={handleSave}
                onSettingsToggle={() => setSettingsOpen(!settingsOpen)}
                settingsOpen={settingsOpen}
            />

            <SettingsPanel
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                generalSection={<GeneralInfoSection {...props} />}
                seoSection={<SeoSection {...props} />}
            />

            <EditorLayout settingsOpen={settingsOpen}>
                <ContentEditorSection ref={editorRef} />
            </EditorLayout>
        </>
    );
}
```

## Caractéristiques UX

1. **Design Modern** : Interface épurée inspirée d'Elementor
2. **Panneau Latéral** : Paramètres organisés par onglets
3. **Toolbar Sticky** : Toujours accessible en haut de page
4. **Layout Adaptatif** : S'ajuste automatiquement quand le panneau s'ouvre
5. **Feedback Visuel** : Indicateurs de statut avec couleurs
6. **Compteurs SEO** : Limite de caractères pour title/description
7. **EditorJS Stylisé** : CSS personnalisé pour une meilleure apparence

## Améliorations Futures

- [ ] Aperçu en temps réel
- [ ] Mode responsive (Desktop/Tablet/Mobile)
- [ ] Historique des versions
- [ ] Auto-sauvegarde
- [ ] Raccourcis clavier
- [ ] Glisser-déposer de blocs
- [ ] Bibliothèque de templates
