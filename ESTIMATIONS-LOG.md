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
