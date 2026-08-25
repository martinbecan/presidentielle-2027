# Changelog

Historique des mises à jour du site. Tenu à jour manuellement à chaque session de travail.

## 2026-08-24
- **Courbe d'évolution des sondages sur les fiches candidats**, avec bande d'incertitude matérialisant la marge d'erreur. Un point par relevé du site (25/06, 11/07, 18/08 à ce jour) ; la série s'enrichira à chaque mise à jour. Une note indique si l'écart observé dépasse le seuil au-delà duquel deux mesures sont distinguables
- **Correction de 3 flèches de tendance non étayées** : Le Pen affichait « hausse » pour +1,3 pt (seuil 4,2), Philippe « baisse » pour −0,1 pt (seuil 3,2), Mélenchon « hausse » pour +0,3 pt (seuil 3,1). Toutes trois passent à « stable ». Seuls Attal (+3,3, seuil 2,6) et Tondelier (+1,6, seuil 1,6) ont une évolution statistiquement établie
- Correction : les URL de sources débordaient de l'écran sur mobile et provoquaient un défilement horizontal de la page entière
- **Résultats du quiz : classement complet au lieu du seul top 3.** Le podium restait affiché tel quel, mais le reste du classement apparaît désormais en dessous, en retrait. Une phrase chiffre l'écart réel entre le 1er et le dernier, et un dépliant explique sur quels sujets les deux premiers divergent le plus. Motif : les trois premiers sont par construction les plus proches les uns des autres (5,8 points d'écart en moyenne), ce qui donnait l'impression trompeuse que le quiz ne discriminait pas — alors que 24 points séparent en moyenne le premier du dernier
- **Comparateur complété de 91 % à 97 %** : positions ajoutées sur la défense (Philippe, Retailleau, Tondelier, Arthaud), le numérique (Le Pen, Tondelier), le logement (Le Pen, Arthaud), l'agriculture (Philippe) et le pouvoir d'achat (Tondelier). 4 cases restent « non documenté » faute de source publiée
- 6 scores ajoutés au barème du quiz (défense et numérique) pour les candidats dont la position est désormais sourcée
- **Lien « voir le changelog » retiré des pieds de page** : ce journal est un document de maintenance technique, sans intérêt pour un visiteur venu s'informer sur les candidats, et il l'envoyait sur GitHub. Seule la date de mise à jour reste — elle répond à sa vraie question, « est-ce à jour ? ». Une section « Code source et historique » a été ajoutée sur la page À propos, avec le dépôt, le changelog et l'historique détaillé des données ; l'ancienne mention non cliquable du dépôt GitHub y est corrigée
- **Allègement des pieds de page** : suppression du renvoi vers l'onglet Candidats sur l'accueil (4ᵉ lien vers la même page), du bouton « Voir tous les candidats » en bas d'accueil, des mentions décrivant le défilement sur mobile (comparateur et tableau des candidats) et de la date de mise à jour en double sur la page À propos
- Correction : la légende des pictogrammes ⚖️ du tableau des candidats était codée en dur et s'était désynchronisée des données — la mention du calendrier de la cassation n'y figurait pas et celle de Francis Lalanne manquait entièrement. Elle est désormais construite depuis `data/candidats.js`
- **Refonte visuelle de la frise chronologique** : regroupement par année, pastilles de catégorie sur chaque événement, mise en avant des deux tours du scrutin, titres agrandis et dates passées en gris neutre
- **Frise réorganisée** : un bloc compact « Prochaines échéances » (deux colonnes, sans frise ni années) puis « Déjà passé » du plus récent au plus ancien. Les échéances futures occupaient auparavant autant de place que le récit de la campagne et repoussaient l'actualité de plusieurs écrans ; les en-têtes d'année se lisaient aussi 2026 → 2027 → 2026, ce qui désorientait
- Correction : la couleur du bloc « Primaire PS / Place publique » manquait en CSS (le bloc s'affichait sans teinte)
- **Filtres déplacés dans la section « Déjà passé »** et restreints à celle-ci : ils agissaient auparavant aussi sur le bloc des échéances à venir, ce qui n'apportait rien (ses entrées sont presque toutes de la même catégorie) et aurait modifié du contenu hors du champ de vision une fois les filtres descendus. Les compteurs reflètent désormais le seul passé
- **Numéro de version sur les fichiers CSS et JS** (`?v=20260824`) : sans lui, les visiteurs déjà venus gardaient l'ancien affichage en cache après une mise à jour, parfois plusieurs jours. Procédure documentée dans le README

## 2026-08-23
- **Raphaël Glucksmann candidat** (annonce au 20h de TF1) : passe des pressentis aux candidats déclarés, via la primaire commune PS / Place publique
- **Nouveau bloc « Gauche — Primaire PS / Place publique »** : il existe désormais deux primaires distinctes à gauche, l'ancienne opposition « primaire unitaire / hors primaire » était devenue trompeuse (Royal, Guedj et Brun y sont reclassés)
- Rentrée politique intégrée : universités d'été LFI et journées d'été des Écologistes, appel de Philippe à un rassemblement droite/centre « entre novembre et février », promesse de censure du budget 2027 par Mélenchon, réforme constitutionnelle proposée par Attal
- Enquête du parquet de Paris sur des soupçons d'ingérence russe (deepfakes) visant Attal et Philippe, attribuée par Viginum au réseau Matriochka
- Calendrier de la primaire PS précisé (conseil national du 25/08, scrutin pressenti les 10-11 et 17-18 octobre)
- Ajout de Lucie Castets et Matthieu Pigasse aux pressentis ; retrait de Gérald Darmanin des pressentis (il soutient Philippe)
- **Filtre par catégorie sur la frise chronologique** (Candidatures / Justice / Échéances officielles / Vie de campagne), la frise étant passée à 38 événements
- Correction : Darmanin apparaissait encore comme soutien indécis sur la fiche d'Attal alors qu'il avait tranché pour Philippe le 17/08

## 2026-08-19
- Mise à jour actualités : soutien officiel de Gérald Darmanin à Édouard Philippe (17/08), proposition de primaire élargie de François Bayrou rejetée par le PS (9/08), sondages rafraîchis pour Le Pen, Philippe, Mélenchon, Attal, Retailleau, Tondelier et les pressentis (agrégat glissant 90 jours au 18/08/2026), 2 nouveaux événements dans la timeline
- Ajout de Francis Lalanne, candidat déclaré le 19/08 (soutenu par Dieudonné, inéligibilité passée mentionnée factuellement)
- Renommage du bloc "Inclassables" en "Candidatures indépendantes" (retour de Martin : le libellé précédent sonnait péjoratif)

## 2026-08-01
- Mise à jour actualités : nouveau statut "candidature retirée" (appliqué à Clémentine Autain), ajout de Ségolène Royal (primaire interne du PS), sondages Le Pen (34–35,5%) et Philippe (16,5–19%) mis à jour (source Elabe 11/07/2026), précision sur le calendrier de la Cour de cassation dans l'affaire Le Pen (décision attendue avant début avril 2027), 3 nouveaux événements dans la timeline

## 2026-07-12
- V4 étape 0 à 5 : bloc d'accroche + portes d'entrée sur l'accueil, module « esprit critique », mention parrainages, sources vérifiables sur les fact-checks (badge « Vérifier cette source », sources croisées), formulaire de signalement d'erreur, dates de mise à jour visibles

## 2026-07-08
- V3 : quiz de compatibilité candidat, quiz Vrai/Trompeur/Faux, compte à rebours, bandeau d'inscription sur les listes électorales, mémo personnel imprimable

## 2026-07-07
- Comparateur de candidats, frise chronologique de la campagne, soutiens politiques, menu de navigation unifié
- Condamnation de Marine Le Pen en appel intégrée aux données (bandeau d'alerte, fiche candidate)

## Avant
- V1 : mise en place du site (accueil, fiches candidats, données centralisées)
