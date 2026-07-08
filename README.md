# Présidentielle 2027 — mini-site

Mini-site statique, sans framework ni build, qui récapitule les candidats déclarés à l'élection présidentielle française de 2027. Fait pour être partagé à des proches (par lien GitHub Pages ou en envoyant simplement le dossier).

## Structure du projet

```
presidentielle-2027/
├── index.html              Page d'accueil : tableau récapitulatif de tous les candidats
├── css/
│   └── style.css           Styles partagés (dark mode)
├── candidats/
│   └── *.html               Une fiche par candidat > ~1% (10 fiches)
├── js/
│   ├── main.js              Logique de la page d'accueil (recherche, tri, filtre, rendu du tableau)
│   └── candidat.js          Logique des fiches candidats (rendu des sections)
├── data/
│   └── candidats.js         ⭐ SEULE source de données du site
└── README.md                 Ce fichier
```

## Comment mettre à jour le site

**Il n'y a qu'un seul fichier à modifier pour changer les données affichées : [`data/candidats.js`](data/candidats.js).**

Ce fichier contient un objet JavaScript `window.SITE_DATA` avec la même structure que du JSON (clés entre guillemets, tableaux, etc.) — vous pouvez l'éditer avec n'importe quel éditeur de texte sans connaître JavaScript.

### Changer un sondage

Trouvez le candidat dans `data/candidats.js` et modifiez son bloc `sondage` :

```js
sondage: { label: "33–36%", niveau: "fort", tendance: "stable" },
```

- `label` : le texte affiché tel quel dans le tableau
- `niveau` : `"fort"`, `"moyen"` ou `"faible"` — contrôle la mise en valeur visuelle (gras, taille)
- `tendance` : `"hausse"`, `"baisse"` ou `"stable"` — affiche une flèche ▲ ▼ →

### Ajouter un nouveau candidat (sans fiche détaillée)

Ajoutez un objet dans le tableau `candidats` de `data/candidats.js`, sur le modèle des candidats `< 1%` déjà présents :

```js
{
  slug: "prenom-nom",
  nom: "Prénom Nom",
  parti: "Nom du parti",
  bloc: "centre",           // voir la liste des blocs plus bas
  fiche: false,              // pas de fiche individuelle
  sondage: { label: "< 1%", niveau: "faible", tendance: "stable" },
  historique: [],
  idees: []
}
```

Il apparaîtra automatiquement dans le tableau d'accueil, dans le bon bloc politique, sans toucher à `index.html`.

### Donner une fiche détaillée à un candidat

1. Passez `fiche: true` sur son objet dans `data/candidats.js`.
2. Complétez les champs `age`, `fonction_actuelle`, `parcours`, `programme`, `positions`, `sources` (copiez la structure d'un candidat existant comme `marine-tondelier`, c'est le plus simple modèle à dupliquer).
3. Créez un fichier `candidats/prenom-nom.html` en copiant un fichier existant (ex. `candidats/delphine-batho.html`) et changez uniquement :
   - le `<title>`
   - le contenu du bloc `<noscript>` (résumé pour les visiteurs sans JavaScript)
   - la ligne `window.CANDIDATE_SLUG = "prenom-nom";`

Tout le reste (mise en page, sections, styles) se génère automatiquement à partir de `data/candidats.js` par `js/candidat.js`.

### Les blocs politiques disponibles

`exgauche`, `gradicale`, `gprimaire`, `ghors`, `centre`, `droite`, `exdroite`, `inclassable` — définis avec leur couleur et leur libellé tout en haut de `data/candidats.js` (`blocs: [...]`). Vous pouvez renommer un libellé ou changer une couleur à cet endroit, ça se répercute partout.

### Le bandeau d'alerte en haut de page

C'est l'objet `alerte: { titre, texte }` en haut de `data/candidats.js`.

### La date de mise à jour et les "pressentis"

`derniere_maj` et `pressentis` (candidats non encore déclarés), également en haut du fichier.

## Pourquoi `.js` et pas `.json` ?

Les navigateurs bloquent par défaut les requêtes `fetch()`/`XMLHttpRequest` vers des fichiers JSON locaux quand une page est ouverte directement depuis l'explorateur de fichiers (`file://…`), pour des raisons de sécurité (CORS). Un fichier `.js` chargé via une simple balise `<script>` n'a pas cette limitation : le site fonctionne donc aussi bien sur GitHub Pages qu'en double-cliquant sur `index.html`, ou en envoyant le dossier par email/clé USB.

## Sans JavaScript

Si un visiteur a désactivé JavaScript, `index.html` affiche un tableau simplifié statique (via `<noscript>`), et chaque fiche candidat affiche un résumé minimal (nom, parti, sondage, idées phares). C'est volontairement moins riche que la version avec JavaScript — la quasi-totalité des visiteurs l'ont activé.

⚠️ Ce contenu de secours est écrit à la main et ne se met pas à jour automatiquement. Si vous changez un sondage important, pensez à mettre à jour manuellement le `<noscript>` correspondant dans `index.html` (et, plus rarement, dans la fiche candidat concernée) si vous voulez qu'il reste exact pour les rares visiteurs sans JS.

## Fonctionnalités

- Recherche par nom ou parti (page d'accueil)
- Filtre par bloc politique
- Tri du tableau par colonne (nom, parti, sondage) — cliquez sur l'en-tête
- Flèches de tendance sondagière (▲ hausse, ▼ baisse, → stable)
- Fiches candidats avec parcours, programme par thème, positions sur les grands clivages, dynamique sondagière et sources

## Déploiement

Voir avec Claude Code pour la mise en ligne sur GitHub Pages une fois le contenu validé.

## Neutralité

Ce site est un outil pédagogique et factuel. Les indicateurs "position" (pour/contre/nuancé) sur les grands clivages sont une synthèse éditoriale simplifiée à partir de sources publiques (citées dans chaque fiche) — ils ne remplacent pas la lecture des programmes complets des candidats.
