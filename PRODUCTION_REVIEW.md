# Revue avant mise en production - CITL

**Date**: 26 novembre 2025
**Version**: 1.0

---

## 1. Pages à masquer (sans contenu)

Les pages suivantes n'ont pas de contenu réel et affichent uniquement un message "À développer prochainement". **Elles doivent être masquées ou retirées du menu de navigation avant la mise en production.**

| Page | Route | Fichier |
|------|-------|---------|
| A4Q - Testeur Pratique | `/a4q-practical-tester` | `certifications/a4q-practical-tester.tsx` |
| Organismes accrédités par le CITL | `/accredited-organizations` | `training/accredited-organizations.tsx` |
| Les groupes de travail | `/working-groups` | `membership/working-groups.tsx` |
| Liste officielle des testeurs certifiés | `/certified-testers-list` | `registration/certified-testers-list.tsx` |
| Registre ISTQB | `/istqb-registry` | `registration/istqb-registry.tsx` |
| S'inscrire sur la liste officielle | `/register-certified-testers` | `registration/register-certified-testers.tsx` |

### Action requise
- Retirer ces liens du menu de navigation (header et footer)
- Ou rediriger vers une page "Bientôt disponible" plus élaborée

---

## 2. Contenu à revoir obligatoirement

### 2.1 Date de fondation incohérente

**Problème critique** : La date de fondation du CITL est indiquée comme le **24 octobre 2025** dans plusieurs endroits, mais nous sommes le 26 novembre 2025. Cette date semble être dans le futur ou très récente.

**Fichiers concernés** :
- `fr.json` ligne 42 : `"foundedDate": "Fondé le 24 octobre 2025"`
- `fr.json` ligne 50 : `"hero_description"` mentionne cette date
- `fr.json` ligne 87 : `"overview_description"` mentionne cette date

**Action** : Vérifier que cette date est correcte ou la mettre à jour.

---

### 2.2 Informations de contact incomplètes

**Problème** : Les coordonnées de contact contiennent des placeholders non remplacés.

| Élément | Valeur actuelle | Action |
|---------|-----------------|--------|
| Téléphone | `+225 27 22 39 18 67` | Remplacer par le vrai numéro |
| Email | `contact@citl.ci` | Vérifier que ce domaine existe et fonctionne |
| Adresse | `Abidjan, Côte d'Ivoire` | Ajouter l'adresse complète |

**Fichiers concernés** : `fr.json` lignes 270-274

---

### 2.3 Statistiques et chiffres à vérifier

Les statistiques suivantes sont affichées et doivent être vérifiées :

| Statistique | Valeur affichée | Vérification |
|-------------|-----------------|--------------|
| Testeurs certifiés mondialement | 1 million+ | OK (source ISTQB) |
| Pays couverts | 120+ | OK (source ISTQB) |
| Niveaux de certification proposés | 6 | À confirmer |

---

### 2.4 Images manquantes potentielles

Les pages référencent des images qui doivent exister :

**Vérifier l'existence de** :
- `/assets/images/pages/about/citl-overview.jpg`
- `/assets/images/pages/about/missions-overview.jpg`
- `/assets/images/pages/about/vision-overview.jpg`
- `/assets/images/pages/about/executive-board.jpg`
- `/assets/images/team/alexis-nana.png`
- `/assets/images/team/sylviane-akpangny.png`
- `/assets/images/team/sekou-diabate.png`
- `/assets/images/pages/certification/benefit-1.jpg`
- `/assets/images/pages/certification/benefit-2.jpg`
- `/assets/images/pages/certification/benefit-3.jpg`
- `/assets/images/pages/membership/membership-benefits.jpg`
- `/assets/images/pages/certification/industry-sectors.mp4`
- `/assets/images/pages/certification/accreditation-process.png`

---

### 2.5 Frais d'examen

**Page** : Exam Fees (`/exam-fees`)

Les frais sont en **EURO (€)** :
- Foundation : 100€
- Advanced : 120€
- Specialist : 120€
- Expert : 155€

**Actions à vérifier** :
- Ces tarifs sont-ils corrects pour la Côte d'Ivoire ?
- Faut-il afficher aussi en FCFA ?
- Les modalités de paiement sont-elles disponibles ?

---

### 2.6 Badge ISTQB dans le fichier de traduction

**Fichier** : `fr.json` ligne 101

```json
"badge": "À propos de l'ISTQB --"
```

**Problème** : Il y a des tirets parasites `--` à la fin du badge.

**Action** : Supprimer les tirets.

---

### 2.7 Console.log en production

**Fichier** : `blog.tsx` ligne 64

```tsx
console.log("tags", tags);
```

**Action** : Supprimer ce console.log avant la mise en production.

---

## 3. Recommandations générales

### 3.1 Pages fonctionnelles prêtes pour la production

Les pages suivantes sont **complètes et prêtes** :

| Section | Pages |
|---------|-------|
| Accueil | Page d'accueil avec hero, certifications wheel, CTA |
| À propos | CITL, ISTQB, Vision, Missions, Bureau exécutif |
| Certifications | Why Certification, Core Foundation, Core Advanced, Specialist, Expert Level, Détail certification |
| Examens | Questions/Format, Frais, FAQ, Anti-piracy, Glossaire, Inscription |
| Formation | Demande d'accréditation |
| Adhésion | Membres (avec formulaire modal) |
| Blog | Liste des articles, Détail article |
| Événements | Timeline des événements |
| Contact | Formulaire de contact |

### 3.2 Fonctionnalités à tester

- [ ] Formulaire d'inscription à l'examen (envoi d'emails)
- [ ] Formulaire de demande d'accréditation (envoi d'emails)
- [ ] Formulaire d'adhésion membre (envoi d'emails)
- [ ] Formulaire de contact (envoi d'emails)
- [ ] Changement de langue FR/EN
- [ ] Mode sombre
- [ ] Affichage responsive mobile
- [ ] Chargement des certifications depuis l'API
- [ ] Chargement des FAQs depuis l'API
- [ ] Chargement du glossaire depuis l'API
- [ ] Blog avec pagination et filtres

### 3.3 SEO et métadonnées

Vérifier que chaque page a :
- [ ] Balise `<title>` appropriée
- [ ] Meta description
- [ ] Open Graph tags pour le partage social

---

## 4. Résumé des actions prioritaires

### Actions critiques (avant mise en ligne)

1. **Masquer les 6 pages sans contenu** du menu de navigation
2. **Compléter les coordonnées de contact** (téléphone, adresse)
3. **Vérifier la date de fondation** (24 octobre 2025)
4. **Supprimer le console.log** dans blog.tsx
5. **Corriger le badge ISTQB** (retirer les `--`)
6. **Vérifier l'existence des images** référencées

### Actions recommandées

1. Vérifier les tarifs d'examen pour le marché ivoirien
2. Ajouter les tarifs en FCFA si nécessaire
3. Tester tous les formulaires en conditions réelles
4. Vérifier l'envoi des emails de notification

---

## 5. Navigation - Liens à masquer

Dans le composant de navigation, masquer les liens suivants :

```
Menu "Certifications":
  - A4Q - Testeur Pratique ❌

Menu "Formation":
  - Organismes accrédités ❌

Menu "Adhésion":
  - Les groupes de travail ❌

Menu "Inscription":
  - Liste officielle des testeurs ❌
  - Registre ISTQB ❌
  - S'inscrire sur la liste officielle ❌
```

---

*Document généré par Claude Code le 26 novembre 2025*
