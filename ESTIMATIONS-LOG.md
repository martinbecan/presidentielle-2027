# Journal des estimations de temps

Suivi estimé vs réel pour calibrer les futures estimations. Deux temps distincts :
- **Codage actif** : mon temps d'exécution (édition, tests navigateur) — mesurable.
- **Validation** : temps de relecture/réponse de Martin entre deux étapes — hors de mon contrôle, non comptabilisé dans le calcul de calibration.

Pour les étapes V4-0 à V4-9 (avant ce fichier), les "réels" sont des estimations rétrospectives que j'avais annoncées en fin d'étape, pas des mesures horodatées. À partir de V4-8, chaque entrée est horodatée via `date` en début/fin d'étape (codage actif réel, à la seconde près).

## Historique

| Étape | Estimé | Réel (codage actif) | Écart | Notes |
|---|---|---|---|---|
| V4-0 (accroche + portes d'entrée) | — (pas encore demandé) | — | — | Estimations pas encore en place |
| V4-3 (esprit critique) | — (pas encore demandé) | — | — | Estimations pas encore en place |
| V4-7 (parrainages) | 5-10 min | ~7 min (rétrospectif) | conforme | Premier essai d'estimation, modèle "développeur humain" |
| V4-1+2 (schéma JSON + badges sources) | 30-40 min | ~45 min (rétrospectif) | +15-30% | Regroupées après détection de dépendance ; scope sous-estimé au départ |
| V4-4 (signalement d'erreur) | 35-45 min | ~40 min (rétrospectif) | conforme | Dernière estimation avant recalibrage — jugée "disproportionnée" par Martin |
| V4-5 (dates de maj + changelog) | 8 min (recalibré) | ~9 min (rétrospectif) | conforme | Premier essai post-recalibrage |
| V4-9 (réorg navigation) | 15-20 min | ~18 min (rétrospectif) | conforme | |
| V4-8 (transition entre-deux-tours) | 12-15 min | **4 min 11 s** (horodaté) | -65% | Premier chiffre horodaté avec précision — révèle que même les estimations "recalibrées" (V4-5, V4-9) restaient encore trop hautes |

## Méthode de calibration

Moyenne mobile sur les 3 à 5 dernières étapes **avec estimation active**, en pondérant fortement les données horodatées (plus fiables que les rétrospectifs). Le premier horodatage réel (V4-8, 4 min 11 s) montre que même le modèle "recalibré" de V4-5/V4-9 surestimait encore d'un facteur ~3-4x. Nouvelle référence : la plupart des étapes mécaniques (1-3 fichiers, pas de recherche web) se jouent en 3-6 minutes réelles ; seules les étapes à forte recherche (V4-1, sourcing) ou à très large surface (V4-9, 17 fichiers) dépassent 10 min.

---

## Log détaillé (horodaté à partir de V4-8)

### V4-8 — Transition entre-deux-tours
- Début : 2026-07-12 11:13:38
- Fin : 2026-07-12 11:17:49
- **Durée réelle : 4 min 11 s**
- Estimé : 12-15 min (écart -65%)

### V4-6 — Mode silence électoral
- Début : 2026-07-12 11:33:13
- Fin : 2026-07-12 11:35:41
- **Durée réelle : 2 min 28 s**
- Estimé : 5 min (écart -51%)

### V4-10 — Audit accessibilité
- Début : 2026-07-12 11:36:34
- Fin : 2026-07-12 11:41:35
- **Durée réelle : 5 min 01 s**
- Estimé : 6-8 min (conforme)
- Vrais correctifs trouvés (pas un simple contrôle) : tri de tableau inaccessible au clavier, focus du champ de recherche trop discret, 2 couleurs de texte sous le seuil WCAG AA, balise `<main>` absente sur les 17 pages

### V5-1 — Intégration GoatCounter
- Début : 2026-07-12 15:51:43
- Fin : 2026-07-12 15:54:25
- **Durée réelle : 2 min 42 s**
- Estimé : 3-4 min (conforme)

### V5-2 — Événements quiz dans GoatCounter
- Début : 2026-07-12 15:55:05
- Fin : 2026-07-12 15:57:13
- **Durée réelle : 2 min 08 s**
- Estimé : 3-4 min (conforme)

### V5-3 — Correction de 6 questions du quiz de compatibilité
- Début : 2026-07-12 15:57:40
- Fin : 2026-07-12 16:01:30
- **Durée réelle : 3 min 50 s**
- Estimé : 4-5 min (conforme)
- Note : la question "institutions" complémentaire demandée par le brief existait déjà (institutions_2) — rien à ajouter là. L'écologie scindée fait passer le quiz de 18 à 19 questions.

### V5-4 — Mélange aléatoire de l'ordre des questions
- Début : 2026-07-12 16:03:45
- Fin : 2026-07-12 16:05:34
- **Durée réelle : 1 min 49 s**
- Estimé : 3 min (largement conforme, plus rapide)

### V5-5a — Extension quiz : mécanisme + thème laïcité (1 question, recherche web incluse)
- Début : 2026-07-12 16:08:54
- Fin : 2026-07-12 16:15:31
- **Durée réelle : 6 min 37 s**
- Pas d'estimation chiffrée annoncée (nouveau profil de tâche : recherche web + code, pas de référence calibrée disponible)
- **Nouveau profil de tâche identifié** : "recherche web + intégration" (~6-7 min pour 1 thème/10 candidats + construction du mécanisme réutilisable) — à distinguer du profil "édition mécanique" (~2-5 min). Les 4 thèmes restants (agriculture, numérique, logement, défense) réutiliseront le mécanisme déjà construit, donc seront plus proches de ~3-4 min chacun (recherche seule, sans re-développer l'UI).

### V5-5b — Laïcité : ajout aux fiches candidats + comparateur (positions_10_sujets)
- Début : 2026-07-12 16:15:31
- Fin : 2026-07-12 16:19:38
- **Durée réelle : 4 min 07 s**
- Non prévu initialement (le brief demandait aussi ce volet, ajouté après clarification avec Martin) — pas de fraîche recherche nécessaire, synthèses dérivées des recherches déjà faites pour le scoring du quiz.

### V5-5c — Thème agriculture (recherche + quiz + fiches + comparateur, complet)
- Début : 2026-07-12 16:22:29
- Fin : 2026-07-12 16:26:32
- **Durée réelle : 4 min 03 s**
- Confirme la prédiction : une fois le mécanisme construit, chaque thème supplémentaire se joue en ~4 min (recherche + intégration complète), pas 10-11 min comme le premier.

### V5-5d, V5-5e, V5-5f — Thèmes numérique, logement, défense (recherche + quiz + fiches + comparateur, complets)
- Numérique : ~16:26 → ~16:30 (horodatage fiable, session continue)
- Logement : ~16:30 → ~16:34 (horodatage fiable, session continue)
- Défense : horodatage de fin faussé par une coupure de session entre les tours (16:34 → 21:36 affiché, mais ce delta inclut une interruption, pas du travail actif) — durée active estimée par comparaison ~4-5 min, cohérente avec les thèmes précédents.
- **Les 5 thèmes de l'extension V5 sont désormais tous complets** (laïcité, agriculture, numérique, logement, défense) — quiz + fiches candidats + comparateur, testés bout en bout.

### Post-V5 — 3 corrections UX (retour terrain Martin)
- Début : 2026-07-12 22:05:25
- Fin : 2026-07-12 22:11:50
- **Durée réelle : 6 min 25 s**
- Style neutre "non documenté" (badge gris pointillé au lieu du même jaune que les vraies positions nuancées), 21 étiquettes génériques "Plutôt favorable/opposé" remplacées par des étiquettes spécifiques (retraites/immigration/Europe/dette), timeline passée en vertical permanent (bug V4 non détecté jusqu'ici).
