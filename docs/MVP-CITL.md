# MVP - Site Web CITL (Comité Ivoirien des Tests Logiciels)

## Vue d'ensemble

Ce document définit le MVP (Minimum Viable Product) pour le site web du CITL, inspiré du site [istqb.org](https://istqb.org). Le site doit être un CMS complet permettant la gestion dynamique du contenu, des menus, des pages et des widgets.

**Objectif**: Livrer la première version à 35% dans une semaine, avec les fonctionnalités essentielles opérationnelles.

## Structure du Site

### 1. MENU PRINCIPAL (Header Navigation)

#### 1.1 CITL
- **À propos de l'ISTQB** (Page statique configurable)
- **À propos du CITL** (Page statique configurable)
- **Notre vision** (Page statique configurable)
- **Nos missions** (Page statique configurable)
- **Le bureau exécutif** (Page dynamique avec profiles des membres)
  - Alexis Nana, Président
  - Sylviane AKPANGNY, Trésorière
  - Sekou Diabate, Secrétaire Général

#### 1.2 Adhésion
- **Membres du CITL** (Liste dynamique des membres)
  - Formulaire d'inscription membre (Nom, Prénoms, Fonction, Email, Photo, Téléphone, Années d'expérience)
  - Page de profil public pour chaque membre
- **Les groupes de travail** (Page dynamique listant les groupes)
  - Liste des groupes de travail avec description
  - Possibilité de rejoindre un groupe

#### 1.3 Certifications
- **Pourquoi obtenir la certification ISTQB** (Page statique)
- **Core Foundation** (Page détaillée)
- **Core Advanced** (Page détaillée)
- **Specialist** (Page détaillée)
- **Expert Level** (Page détaillée)
- **A4Q - Testeur Pratique** (Page détaillée)

#### 1.4 Examens
- **Questions sur les examens et taux de réussite** (Page FAQ dynamique)
- **Frais d'examen** (Page configurable avec tableau de prix)
- **S'inscrire à l'examen** (Formulaire d'inscription avec paiement)
- **FAQ sur les examens** (Section FAQ configurable)
- **Avertissement contre la contrefaçon** (Page statique)
- **Glossaire** (Page dynamique avec recherche)

#### 1.5 Organismes de formation
- **Organismes accrédités par le CITL** (Liste dynamique)
- **Demande d'accréditation** (Formulaire)

#### 1.6 Événements
- **Agenda** (Calendrier dynamique des événements)
- **Séminaires** (Liste des séminaires à venir et passés)
- **Ateliers** (Liste des ateliers)
- **Conférences** (Liste des conférences)

#### 1.7 Blog
- **Articles** (Blog dynamique avec catégories)
- **Actualités** (Section actualités)
- **Ressources** (Documents téléchargeables)

#### 1.8 Inscription
- **S'inscrire sur la liste officielle ivoirienne des testeurs logiciels certifiés** (Formulaire)
- **Liste officielle ivoirienne des testeurs logiciels certifiés** (Annuaire public)
- **Registre des testeurs ISTQB certifiés avec succès** (Recherche publique)

#### 1.9 Contact
- **Formulaire de contact** (Formulaire avec validation)
- **Coordonnées** (Adresse, Téléphone, Email)
- **Questions fréquentes** (FAQ générale)

---

### 2. FOOTER

#### Colonne 1 - À propos
- Brève description du CITL
- Logo CITL
- Logo ISTQB

#### Colonne 2 - Liens rapides
- Certifications
- Examens
- Devenir membre
- Organismes de formation

#### Colonne 3 - Ressources
- Blog
- Événements
- Glossaire
- FAQ

#### Colonne 4 - Contact & Réseaux sociaux
- Adresse physique
- Email de contact
- Téléphone
- Liens vers réseaux sociaux (LinkedIn, Twitter, Facebook, YouTube)

#### Ligne du bas
- Copyright © 2025 CITL - Tous droits réservés
- Mentions légales
- Politique de confidentialité (RGPD)
- Plan du site

---

## 3. PAGES TYPES

### 3.1 Page d'accueil (Homepage)
**Sections configurables via CMS :**

1. **Hero Section**
   - Titre principal (H1)
   - Sous-titre
   - Image/Vidéo de fond
   - CTA (Call-to-Action) : "Obtenir une certification" / "Devenir membre"

2. **À propos - Section d'introduction**
   - Texte d'introduction sur le CITL
   - Image ou vidéo
   - Bouton "En savoir plus"

3. **Certifications ISTQB - Section**
   - Présentation des niveaux de certification
   - Cards cliquables pour chaque niveau
   - CTA : "Voir toutes les certifications"

4. **Chiffres clés - Widget Stats**
   - Nombre de testeurs certifiés
   - Nombre d'organismes accrédités
   - Nombre d'examens passés
   - Taux de réussite moyen

5. **Événements à venir - Widget**
   - Liste des 3 prochains événements
   - Lien vers le calendrier complet

6. **Derniers articles du blog**
   - 3 derniers articles
   - Lien vers le blog complet

7. **Témoignages - Carousel**
   - Citations de membres certifiés
   - Photos et noms

8. **Partenaires - Widget**
   - Logos des partenaires
   - Carousel automatique

9. **Newsletter - Widget**
   - Formulaire d'inscription à la newsletter

### 3.2 Page de liste (Certifications, Articles, Événements)
**Template configurable :**
- Filtres (Catégories, Dates, Tags)
- Système de recherche
- Pagination
- Vue en grille ou liste
- Sidebar avec widgets

### 3.3 Page de détail (Article, Certification, Événement)
**Template configurable :**
- Titre
- Image principale
- Contenu riche (éditeur WYSIWYG)
- Galerie d'images
- Documents téléchargeables
- Partage sur réseaux sociaux
- Articles/Événements similaires
- Fil d'Ariane (Breadcrumb)

### 3.4 Page formulaire (Contact, Inscription, Adhésion)
**Template configurable :**
- Champs dynamiques
- Validation côté client et serveur
- Upload de fichiers (photo, CV, documents)
- Captcha / reCAPTCHA
- Email de confirmation
- Redirection après soumission

### 3.5 Page profil (Membre, Testeur certifié)
**Template configurable :**
- Photo de profil
- Informations personnelles
- Certifications obtenues
- Groupes de travail
- Badges et achievements
- Historique des examens

### 3.6 Espace membre sécurisé
- **Tableau de bord personnel**
  - Mes certifications
  - Mes examens à venir
  - Mes formations
  - Mes documents
- **Gestion de profil**
  - Modifier mes informations
  - Changer mon mot de passe
  - Gérer mes préférences
- **Mes groupes de travail**
- **Téléchargement de certificats**

---

## 4. WIDGETS CONFIGURABLES

### 4.1 Widget Événements
- Affichage des X prochains événements
- Mode : Liste / Calendrier / Timeline
- Filtrable par type (Séminaire, Atelier, Conférence)

### 4.2 Widget Articles récents
- Affichage des X derniers articles
- Mode : Cards / Liste / Slider
- Filtrable par catégorie

### 4.3 Widget Statistiques
- Compteurs animés
- Icônes personnalisables
- Texte descriptif configurable

### 4.4 Widget CTA (Call-to-Action)
- Titre
- Description
- Bouton avec lien personnalisable
- Image de fond

### 4.5 Widget Newsletter
- Formulaire d'inscription
- Intégration Mailchimp / SendGrid
- Message de confirmation

### 4.6 Widget Réseaux sociaux
- Liens vers les réseaux sociaux
- Flux Twitter / LinkedIn
- Compteur de followers

### 4.7 Widget Témoignages
- Carousel de témoignages
- Photo + Nom + Citation
- Notation par étoiles (optionnel)

### 4.8 Widget Partenaires
- Carousel de logos
- Liens vers sites partenaires
- Mode grille ou slider

### 4.9 Widget Recherche
- Barre de recherche globale
- Filtres avancés
- Résultats en temps réel (AJAX)

### 4.10 Widget Documents
- Liste de documents téléchargeables
- Filtrable par catégorie
- Icônes par type de fichier (PDF, DOC, etc.)

---

## 5. FONCTIONNALITÉS CMS REQUISES

### 5.1 Gestion de contenu
- ✅ Éditeur WYSIWYG (TinyMCE / Quill)
- ✅ Gestion de médias (images, vidéos, documents)
- ✅ Système de révisions et versions
- ✅ Prévisualisation avant publication
- ✅ Planification de publication
- ✅ Gestion multilingue (FR / EN)
- ✅ SEO (Meta title, description, keywords)
- ✅ URL personnalisables (slugs)

### 5.2 Gestion des menus
- ✅ Création de menus personnalisés
- ✅ Drag & Drop pour organiser
- ✅ Sous-menus multi-niveaux
- ✅ Icônes dans les menus
- ✅ Menus conditionnels (selon rôle utilisateur)
- ✅ Menus responsive (mobile)

### 5.3 Gestion des pages
- ✅ Création de pages à la volée
- ✅ Templates de page personnalisables
- ✅ Système de layouts
- ✅ Page Builder (drag & drop de blocs)
- ✅ Gestion des permissions par page

### 5.4 Gestion des widgets
- ✅ Bibliothèque de widgets prédéfinis
- ✅ Création de widgets personnalisés
- ✅ Placement dans des zones (Header, Sidebar, Footer)
- ✅ Ordonnancement drag & drop
- ✅ Widgets conditionnels (affichage selon URL)

### 5.5 Gestion des utilisateurs
- ✅ Rôles et permissions (Admin, Membre, Testeur, Formateur, Visiteur)
- ✅ Inscription et validation
- ✅ Gestion de profils
- ✅ Authentification 2FA
- ✅ Réinitialisation de mot de passe

### 5.6 Système de blog
- ✅ Création d'articles
- ✅ Catégories et tags
- ✅ Auteurs multiples
- ✅ Commentaires (avec modération)
- ✅ Partage social
- ✅ Articles similaires

### 5.7 Système d'événements
- ✅ Création d'événements
- ✅ Calendrier intégré
- ✅ Inscription aux événements
- ✅ Notifications par email
- ✅ Export iCal / Google Calendar

### 5.8 Système de formulaires
- ✅ Générateur de formulaires (drag & drop)
- ✅ Validation des champs
- ✅ Emails de notification
- ✅ Sauvegarde des soumissions
- ✅ Export CSV / Excel

### 5.9 SEO et Analytics
- ✅ Génération de sitemap.xml
- ✅ Robots.txt configurable
- ✅ Balises Open Graph et Twitter Cards
- ✅ Intégration Google Analytics
- ✅ Tableau de bord analytics

### 5.10 Sécurité
- ✅ Protection CSRF
- ✅ Protection XSS
- ✅ Protection SQL Injection
- ✅ Conformité RGPD
- ✅ Certificat SSL
- ✅ Sauvegarde automatique

---

## 6. PAGES PRIORITAIRES POUR LE MVP (35%)

### Phase 1 - Semaine 1 (35% du projet)

#### Pages essentielles :
1. ✅ **Page d'accueil** avec sections configurables
2. ✅ **À propos du CITL** (page statique)
3. ✅ **Certifications** (page de liste)
4. ✅ **Page de certification détaillée** (template)
5. ✅ **Contact** (formulaire fonctionnel)
6. ✅ **Blog** (liste et détail d'article)
7. ✅ **Événements** (liste et détail)

#### Fonctionnalités CMS prioritaires :
1. ✅ **Authentification admin**
2. ✅ **Gestion de pages** (CRUD basique)
3. ✅ **Éditeur de contenu** (WYSIWYG)
4. ✅ **Gestion de menus** (configurable)
5. ✅ **Gestion de médias** (upload images)
6. ✅ **Blog fonctionnel** (création, édition, publication)
7. ✅ **Système de templates** (layouts de base)
8. ✅ **Footer configurable**

#### Widgets prioritaires :
1. ✅ Widget Événements
2. ✅ Widget Articles récents
3. ✅ Widget Newsletter
4. ✅ Widget Statistiques

---

## 7. DESIGN ET ERGONOMIE

### 7.1 Inspiration : istqb.org
- Design professionnel et épuré
- Palette de couleurs : Bleu institutionnel + Orange (accent)
- Typographie moderne et lisible
- Espacement généreux
- Cards avec ombres subtiles

### 7.2 Responsive Design
- Mobile-first approach
- Breakpoints : 320px, 768px, 1024px, 1440px
- Menu burger sur mobile
- Images adaptatives
- Grilles flexibles

### 7.3 Accessibilité (WCAG)
- Contrastes de couleurs suffisants
- Navigation au clavier
- Alt text sur les images
- ARIA labels
- Liens descriptifs

---

## 8. PERFORMANCES

### 8.1 Optimisations
- Lazy loading des images
- Minification CSS/JS
- Compression GZIP
- Cache navigateur
- CDN pour les assets statiques
- Chargement < 3 secondes

### 8.2 SEO Technique
- URLs propres (slugs)
- Sitemap XML automatique
- Balises meta dynamiques
- Schema.org markup
- Open Graph
- Redirections 301

---

## 9. ADMINISTRATION (Backoffice)

### 9.1 Tableau de bord
- Statistiques du site
- Derniers contenus
- Dernières inscriptions
- Alertes et notifications

### 9.2 Menu principal admin
- **Contenu**
  - Pages
  - Articles de blog
  - Événements
  - Certifications
- **Médias**
  - Bibliothèque
  - Upload
- **Apparence**
  - Menus
  - Widgets
  - Thèmes
- **Utilisateurs**
  - Liste des utilisateurs
  - Rôles et permissions
- **Formulaires**
  - Créer un formulaire
  - Soumissions
- **Paramètres**
  - Général
  - SEO
  - Sécurité
  - RGPD

---

## 10. LIVRABLES MVP (Semaine 1)

### Frontend
- ✅ 7 pages fonctionnelles
- ✅ Menu dynamique
- ✅ Footer dynamique
- ✅ 4 widgets fonctionnels
- ✅ Design responsive
- ✅ Formulaire de contact opérationnel

### Backend (CMS)
- ✅ Authentification admin
- ✅ CRUD Pages
- ✅ CRUD Articles
- ✅ CRUD Événements
- ✅ Gestion de menus
- ✅ Gestion de médias
- ✅ Éditeur WYSIWYG

### Technique
- ✅ Base de données configurée
- ✅ Migrations complètes
- ✅ SSL activé
- ✅ Hébergement configuré
- ✅ Backups automatiques

---

## 11. ROADMAP POST-MVP

### Phase 2 (Semaine 2-3) - 35% → 70%
- Système d'inscription aux examens
- Espace membre sécurisé
- Gestion des certifications
- Paiement en ligne
- Annuaire des testeurs certifiés

### Phase 3 (Semaine 4-5) - 70% → 100%
- Groupes de travail
- Forum communautaire
- Système de notifications
- Multilingue (FR/EN)
- Optimisations avancées
- Tests de charge
- Documentation complète

---

## 12. STACK TECHNIQUE RECOMMANDÉE

### Backend
- **Framework**: Laravel 12
- **Base de données**: MySQL
- **Authentification**: Laravel Fortify + 2FA
- **CMS**: À déterminer (voir benchmark)

### Frontend
- **Framework**: React 19 + TypeScript
- **UI**: Tailwind CSS v4 + Radix UI
- **État**: Inertia.js
- **Build**: Vite

### Outils
- **Éditeur**: TinyMCE ou Quill
- **Médias**: Laravel Media Library
- **SEO**: Laravel SEO Tools
- **Analytics**: Google Analytics 4
- **Email**: Laravel Mail + Mailgun/SendGrid

---

## 13. CONTRAINTES ET EXIGENCES

### Sécurité
- ✅ Conformité RGPD
- ✅ Certificat SSL obligatoire
- ✅ Protection CSRF, XSS, SQL Injection
- ✅ Authentification sécurisée (2FA)
- ✅ Sauvegarde quotidienne

### Performance
- ✅ Temps de chargement < 3 secondes
- ✅ Disponibilité > 99,5%
- ✅ Scalable (croissance du trafic)

### Accessibilité
- ✅ Conformité WCAG 2.1 niveau AA
- ✅ Compatible tous navigateurs modernes
- ✅ Responsive sur tous devices

---

## Conclusion

Ce MVP vise à livrer un site fonctionnel à 35% dans une semaine, avec les fonctionnalités essentielles d'un CMS permettant au CITL de gérer son contenu de manière autonome, tout en offrant une expérience utilisateur moderne et professionnelle inspirée du site istqb.org.

La clé du succès réside dans le choix d'une solution CMS Laravel adaptée qui permettra de gagner du temps sur le développement des fonctionnalités de base tout en gardant la flexibilité nécessaire pour les besoins spécifiques du CITL.
