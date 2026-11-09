# Présidentielle 2027

Site statique d'éducation citoyenne sur l'élection présidentielle française de 2027.
En ligne : https://martinbecan.github.io/presidentielle-2027/

Propriétaire : Martin Bance. Il n'est pas développeur. Lui répondre en français, clairement, sans jargon inutile.

**La crédibilité du site tient entièrement à sa méthode. Mieux vaut ne rien publier que publier un fait mal étayé.**

## Architecture

- JavaScript vanilla, aucun framework, aucune étape de build.
- Doit fonctionner aussi bien servi en `file://` que sur GitHub Pages. C'est la raison pour laquelle les données sont dans un `.js` et non dans un `.json`.
- **Source unique de vérité : `data/candidats.js`**, qui expose `window.SITE_DATA`. Tout le contenu éditorial vit là.
- 21 pages HTML, qui chargent les mêmes CSS et JS avec un paramètre de version.

## Règles de contenu

### Sources
- Toute information visible par un visiteur doit venir d'une source sûre et vérifiable, **sur toutes les pages**. Chaque événement de frise et chaque engagement porte `source: { nom, url }`.
- **Ne jamais utiliser les agrégateurs de positions** (votons-2027, elyseescope, monvote2027, duelpolitique et semblables). Ils se contredisent entre eux. Un agrégateur a déjà attribué 33,5 % à Bardella en plaçant Le Pen à 17 %, en contradiction avec l'institut lui-même.
- **Toujours préférer la source primaire.** Le rapport PDF d'un institut prime sur la reprise de presse qui le commente. `pdftotext -layout -enc UTF-8` est disponible et fonctionne bien.
- **Ne jamais inventer la position d'un candidat.** S'il n'y a pas de matière, écrire « non documenté ».
- **Si deux sources fiables se contredisent sur un chiffre, ne pas publier le chiffre.** Publier seulement ce qui concorde, et dire au lecteur pourquoi le reste n'est pas repris.
- Distinguer un avis d'une décision. Des reprises de presse ont déjà présenté l'opinion d'un responsable comme une décision officielle.

### Mise en page
- **Le tiret cadratin est interdit dans tout contenu visible.** Utiliser une virgule, deux-points ou une parenthèse. Vérifier avant de pousser : `grep -c '—' data/candidats.js` doit renvoyer 0.
- Les textes de section sont justifiés là où c'est possible, sauf sous 600 px.
- Apostrophes droites, jamais typographiques, pour rester cohérent avec le reste du fichier.
- Adresse de contact : **uniquement** `m.becan.pro@gmail.com`. L'adresse personnelle de Martin ne doit figurer nulle part.

### Sondages
- Ne jamais moyenner des hypothèses incompatibles. Un relevé correspond à **un institut unique**, avec son hypothèse précisée.
- **Hypothèse de référence de la série : Glucksmann, Attal et Philippe tous candidats.** S'y tenir pour que les relevés restent comparables.
- Vérifier que les scores d'une hypothèse **font 100 %**. C'est le meilleur contrôle d'attribution des colonnes d'un tableau.
- Marge d'erreur : `1.96 * sqrt(p(1-p)/n) * 100`. Deux relevés ne sont distinguables que si leur écart dépasse `marge * sqrt(2)`.
- **Juger les tendances sur les rappels internes de l'institut, pas sur le relevé précédent du site.** Comparer deux instituts fait passer un effet de maison pour un mouvement réel.
- Si aucun sondage fiable n'est disponible, laisser `derniere_maj_sondages` inchangé.

### Échéances à venir
À **chaque** mise à jour, relire toutes les entrées `future: true` et vérifier que chacune repose sur une décision publiée et sourcée, et non sur une attente raisonnable. Basculer en `future: false` celles qui sont advenues, en décrivant **ce qui s'est réellement produit**.

Trois erreurs du site sont venues de cette catégorie. Ce contrôle n'est pas optionnel.

## Règles techniques

### Édition de `data/candidats.js`
- Faire une copie de sauvegarde dans le répertoire temporaire avant toute édition scriptée.
- **Édition bornée au candidat.** Ne jamais lancer une recherche ou un regex depuis le début du fichier pour modifier une fiche : découper d'abord sur les frontières `slug: "..."`. Une erreur de ce type a déjà écrit la position d'un candidat sur la fiche d'un autre.
- Attention aux objets imbriqués : chercher la fin d'un événement de frise avec la première accolade fermante tombe sur son objet `source`. Les événements tiennent une ligne chacun, travailler ligne à ligne.
- Attention aussi aux tableaux écrits sur plusieurs lignes. `sondageHistorique` tient sur une ligne chez la plupart des candidats, sur plusieurs chez Glucksmann. Chercher la ligne qui **ferme** le tableau, sans sortir du segment du candidat.
- Vérifier avec `node --check data/candidats.js`, puis charger les données pour contrôler les compteurs.

### Cache et déploiement
- Après **toute** modification de CSS, JS ou données, incrémenter la version `?v=AAAAMMJJ[lettre]` dans **tous** les fichiers HTML, soit environ 163 occurrences sur 21 pages. Sans cela, la vérification locale sert un fichier périmé et ne prouve rien.
- Vérifier d'abord en local avec le serveur de prévisualisation, console comprise.
- **Vérifier le déploiement en ligne avant d'annoncer quoi que ce soit.** GitHub Pages envoie `cache-control: max-age=600` sur le HTML :
  ```
  until curl -s -H 'Cache-Control: no-cache' <url> | grep -q 'v=NOUVELLEVERSION'; do sleep 15; done
  ```
  Puis contrôler le rendu réel en ligne, pas seulement le numéro de version. Annoncer trop tôt enferme Martin dans un cycle de cache de dix minutes.
- Pour tester le rendu d'un encart `<details>` fermé, forcer `.open = true` avant de lire le texte, sinon le contrôle renvoie un faux négatif.

### Dépôt
- `user.email` doit rester `291563588+martinbecan@users.noreply.github.com`. Avec l'adresse pro, GitHub refuse le push avec `GH007: Your push would publish a private email address`.
- **`MODIFICATIONS-VS-BRIEFINGS.md` ne doit jamais être commité.** C'est un fichier de travail local. Ajouter les fichiers explicitement, jamais `git add -A`.
- Tenir `CHANGELOG.md` à jour à chaque mise à jour, et consigner l'estimé contre le réel dans `ESTIMATIONS-LOG.md`.

## Périmètre d'autonomie

Martin a donné un feu vert permanent pour **publier directement** : nouveaux événements de frise sourcés, engagements datés et sourcés, bascule des échéances advenues, nouvelles candidatures déclarées, relevés de sondage fiables, corrections factuelles.

**Préparer mais ne pas publier**, et le lui soumettre : nouvelle fonctionnalité ou page, refonte visuelle, changement de méthode de calcul, suppression d'un candidat, contenu juridiquement sensible (mise en cause pénale non jugée, accusation nominative), et tout ce qui demande un arbitrage éditorial plutôt qu'un constat factuel.

En cas de doute sur la catégorie, ne pas publier et demander.

S'il n'y a rien de significatif depuis la dernière mise à jour, ne pas forcer une publication. Une mise à jour vide coûte plus qu'elle ne rapporte.

### Affirmations portant sur les concurrents
Dès qu'une affirmation porte sur **les concurrents** de celui qui la formule, en particulier « le premier à », « le seul à », « aucun autre n'a », la vérifier à la source primaire avant publication, **même lorsqu'elle est reprise par une agence de presse sérieuse**. Une partie n'est jamais un témoin neutre de ce que font les autres.

Précédent : le 9 novembre 2026, le site a publié que Mélenchon était le premier à avoir publié un programme, d'après LFI relayé par l'AFP. Les Écologistes avaient publié le leur quatre mois plus tôt.
