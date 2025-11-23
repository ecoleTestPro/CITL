# Composants Blog

Cette documentation décrit les composants modulaires pour la page blog.

## Structure des fichiers

```
components/blog/
├── blog-article-card.tsx    # Carte d'article principale
├── blog-sidebar.tsx          # Sidebar complète
├── pagination.tsx            # Navigation pagination
├── types.ts                  # Types TypeScript
├── index.ts                  # Exports
└── sidebar/
    ├── search-form.tsx       # Formulaire de recherche
    ├── category-list.tsx     # Liste des catégories
    ├── recent-articles.tsx   # Articles récents
    ├── tag-cloud.tsx         # Nuage de tags
    └── archive-list.tsx      # Archives par mois
```

## Composants principaux

### BlogArticleCard

Affiche une carte d'article avec image, catégories, métadonnées et bouton de lecture.

**Props:**
- `article: BlogArticle` - Données de l'article
- `delay?: string` - Délai d'animation (défaut: '0.1')

**Exemple:**
```tsx
<BlogArticleCard
    article={{
        id: 1,
        title: 'Mon article',
        slug: 'mon-article',
        image: '/images/article.png',
        categories: ['Tech', 'Design'],
        publishedDate: '14.04.2024',
        readTime: 5,
        url: '/blog/mon-article'
    }}
    delay="0.3"
/>
```

### BlogSidebar

Regroupe tous les éléments de la barre latérale: recherche, catégories, articles récents, tags, archives.

**Props:**
- `categories: Category[]` - Liste des catégories
- `recentArticles: RecentArticle[]` - Articles récents
- `tags: Tag[]` - Liste des tags
- `archives: Archive[]` - Archives par mois
- `activeCategory?: string` - Catégorie active (slug)
- `onSearch?: (query: string) => void` - Callback de recherche

**Exemple:**
```tsx
<BlogSidebar
    categories={categories}
    recentArticles={recentArticles}
    tags={tags}
    archives={archives}
    activeCategory="technology"
    onSearch={(query) => console.log('Search:', query)}
/>
```

### Pagination

Navigation entre les pages avec numéros de page et boutons précédent/suivant.

**Props:**
- `currentPage: number` - Page actuelle
- `totalPages: number` - Nombre total de pages
- `baseUrl: string` - URL de base pour les liens
- `onPageChange?: (page: number) => void` - Callback optionnel (pour navigation client)

**Exemple:**
```tsx
<Pagination
    currentPage={1}
    totalPages={10}
    baseUrl="/blog"
    onPageChange={(page) => console.log('Page:', page)}
/>
```

## Sous-composants de la sidebar

### SearchForm

Formulaire de recherche d'articles.

**Props:**
- `onSearch?: (query: string) => void` - Callback de recherche

### CategoryList

Liste des catégories avec compteur d'articles.

**Props:**
- `categories: Category[]` - Liste des catégories
- `activeCategory?: string` - Catégorie active

### RecentArticles

Liste des articles récents avec miniatures.

**Props:**
- `articles: RecentArticle[]` - Articles récents

### TagCloud

Nuage de tags cliquables.

**Props:**
- `tags: Tag[]` - Liste des tags

### ArchiveList

Archives organisées par mois/année.

**Props:**
- `archives: Archive[]` - Liste des archives

## Types

### BlogArticle
```typescript
{
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    image: string;
    categories: string[];
    publishedDate: string;
    readTime: number;
    url: string;
}
```

### Category
```typescript
{
    name: string;
    slug: string;
    count: number;
    url: string;
}
```

### Tag
```typescript
{
    name: string;
    slug: string;
    url: string;
}
```

### Archive
```typescript
{
    month: string;
    year: number;
    count: number;
    url: string;
}
```

### RecentArticle
```typescript
{
    id: number;
    title: string;
    image: string;
    publishedDate: string;
    url: string;
}
```

## Utilisation dans une page

```tsx
import { BlogArticleCard, BlogSidebar, Pagination } from '@/components/blog';
import type { BlogArticle, Category, Tag, Archive, RecentArticle } from '@/components/blog';

function BlogPage() {
    return (
        <section className="container mx-auto pt-[120px]">
            <div className="grid grid-cols-12 gap-16">
                {/* Articles */}
                <div className="col-span-8 space-y-14">
                    {articles.map(article => (
                        <BlogArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Sidebar */}
                <BlogSidebar
                    categories={categories}
                    recentArticles={recentArticles}
                    tags={tags}
                    archives={archives}
                />
            </div>

            <Pagination currentPage={1} totalPages={5} baseUrl="/blog" />
        </section>
    );
}
```

## Personnalisation

### Styles
Les composants utilisent les classes Tailwind du design system. Pour personnaliser:
- Modifier les classes dans chaque composant
- Utiliser les variables CSS du thème (primary, accent, etc.)

### Animations
Les animations sont définies via `data-ns-animate` et peuvent être ajustées avec `data-delay`.

## Notes

- Tous les composants sont TypeScript avec typage strict
- Les icônes utilisent `lucide-react`
- Navigation Inertia.js avec composant `Link`
- Support mode clair/sombre intégré
- Responsive design mobile-first
