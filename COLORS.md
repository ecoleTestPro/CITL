# Couleurs du CITL

Ce fichier documente les couleurs officielles du logo CITL et comment les utiliser dans l'application.

## Palette de couleurs

### Orange CITL (Primary) 🔥
- **Hex**: `#E36C19`
- **Classes Tailwind**:
  - Couleur spécifique: `bg-citl-orange`, `text-citl-orange`, `border-citl-orange`
  - **Couleur native**: `bg-primary`, `text-primary`, `border-primary`
- **Usage**: Couleur principale pour les appels à l'action, boutons principaux, éléments importants
- **Note importante**: Cette couleur a été intégrée comme couleur `primary` native de Tailwind. Vous pouvez utiliser `bg-primary` ou `bg-citl-orange` indifféremment.

### Vert CITL (Secondary) 🌿
- **Hex**: `#2E9E43`
- **Classes Tailwind**:
  - Couleur spécifique: `bg-citl-green`, `text-citl-green`, `border-citl-green`
  - **Couleur native**: `bg-secondary`, `text-secondary`, `border-secondary`
- **Usage**: Couleur secondaire pour les succès, validations, certifications
- **Note importante**: Cette couleur a été intégrée comme couleur `secondary` native de Tailwind. Vous pouvez utiliser `bg-secondary` ou `bg-citl-green` indifféremment.

### Anthracite CITL 🖤
- **Hex**: `#2B2B2B`
- **Classe Tailwind**: `bg-citl-anthracite`, `text-citl-anthracite`, `border-citl-anthracite`
- **Usage**: Couleur pour structurer l'interface, textes importants, bordures

## Utilisation recommandée

### Option 1 : Utiliser les couleurs natives (Recommandé ⭐)
Les couleurs CITL sont maintenant intégrées comme `primary` et `secondary`. Utilisez ces classes pour une meilleure cohérence :

```tsx
// Bouton principal avec couleur primary (orange CITL)
<Button>S'inscrire</Button> // Utilise automatiquement bg-primary

// Bouton secondaire avec couleur secondary (vert CITL)
<Button variant="secondary">En savoir plus</Button>

// Texte avec couleur primary
<span className="text-primary">Important</span>
```

### Option 2 : Utiliser les classes spécifiques
Pour des cas spécifiques où vous voulez être explicite sur la couleur CITL :

```tsx
// Bouton avec fond orange explicite
<Button className="bg-citl-orange hover:bg-citl-orange/90 text-white">
    S'inscrire
</Button>

// Bouton avec bordure verte
<Button variant="outline" className="border-citl-green text-citl-green hover:bg-citl-green/10">
    En savoir plus
</Button>
```

## Exemples d'utilisation

### Boutons

### Textes et titres

```tsx
// Titre avec couleur anthracite
<h1 className="text-citl-anthracite dark:text-white">
    Comité Ivoirien des Tests Logiciels
</h1>

// Badge avec fond vert
<Badge className="bg-citl-green text-white">
    Certifié
</Badge>
```

### Sections et cartes

```tsx
// Section avec bordure orange
<div className="border-l-4 border-citl-orange pl-4">
    <h3>Information importante</h3>
</div>

// Card avec accent vert
<Card className="border-t-2 border-citl-green">
    <CardContent>Contenu de la carte</CardContent>
</Card>
```

### Gradients

```tsx
// Gradient orange vers vert
<div className="bg-gradient-to-r from-citl-orange to-citl-green">
    Hero section
</div>

// Gradient avec transparence
<div className="bg-gradient-to-br from-citl-orange/10 to-citl-green/10">
    Section avec fond léger
</div>
```

## Bonnes pratiques

1. **Contraste**: Toujours vérifier le contraste avec le texte (ratio minimum 4.5:1 pour WCAG AA)
2. **Cohérence**: Utiliser l'orange pour les actions principales, le vert pour les succès
3. **Dark mode**: Adapter les couleurs en mode sombre avec des variantes plus claires si nécessaire
4. **Accessibilité**: Ne pas utiliser uniquement la couleur pour transmettre l'information

## Variables CSS personnalisées

Si vous avez besoin d'utiliser ces couleurs en CSS pur:

```css
.mon-element {
    background-color: var(--color-citl-orange);
    color: var(--color-citl-green);
    border-color: var(--color-citl-anthracite);
}
```
