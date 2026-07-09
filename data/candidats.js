/*
 * SOURCE DE DONNÉES UNIQUE DU SITE.
 * C'est le SEUL fichier à modifier pour mettre à jour un sondage, changer une tendance,
 * ajouter/retirer un candidat ou compléter une fiche. Voir README.md pour le mode d'emploi.
 *
 * Format JS (et non .json) volontairement : les navigateurs bloquent les requêtes fetch()/XHR
 * vers des fichiers locaux ouverts en file:// (CORS). En chargeant ces données via une simple
 * balise <script src="data/candidats.js">, le site fonctionne aussi bien sur GitHub Pages qu'en
 * ouvrant index.html directement depuis l'explorateur de fichiers (partage par email, clé USB, etc.).
 */
window.SITE_DATA = {
  derniere_maj: "8 juillet 2026",

  alerte: {
    titre: "⚡ 7 juillet 2026",
    texte: "Marine Le Pen condamnée en appel (45 mois d'inéligibilité dont 30 avec sursis), mais éligible pour 2027. Candidature confirmée + pourvoi en cassation suspensif déposé."
  },

  blocs: [
    { id: "exgauche",    label: "Extrême gauche",                                      couleur: "#dc2626" },
    { id: "gradicale",   label: "Gauche radicale",                                     couleur: "#ef4444" },
    { id: "gprimaire",   label: "Gauche — Primaire « Front populaire 2027 » (11 oct.)", couleur: "#f97316" },
    { id: "ghors",       label: "Gauche — Hors primaire",                              couleur: "#eab308" },
    { id: "centre",      label: "Bloc central",                                        couleur: "#3b82f6" },
    { id: "droite",      label: "Droite",                                              couleur: "#8b5cf6" },
    { id: "exdroite",    label: "Extrême droite / Souverainisme",                      couleur: "#64748b" },
    { id: "inclassable", label: "Inclassables",                                        couleur: "#6b7280" }
  ],

  pressentis: [
    { nom: "R. Glucksmann", sondage: "~9%" },
    { nom: "É. Zemmour", sondage: "~4%" },
    { nom: "F. Roussel", sondage: "~3%" },
    { nom: "F. Hollande", sondage: "" },
    { nom: "B. Cazeneuve", sondage: "" },
    { nom: "D. de Villepin", sondage: "" },
    { nom: "G. Darmanin", sondage: "" },
    { nom: "X. Bertrand", sondage: "" }
  ],

  sourcesSondages: "IFOP-Fiducial (25/06/2026), Odoxa (26/05/2026), Toluna Harris Interactive (29/05/2026). Marges ±2–3 pts. Les intentions RN (33–36 %) correspondent aux hypothèses Le Pen ou Bardella.",

  // Frise chronologique de la campagne. `candidatSlug` sert à colorer le point selon le bloc
  // politique (et à créer un lien si le candidat a une fiche) ; laisser null pour un événement
  // institutionnel ne concernant pas un candidat précis.
  timeline: [
    { date: "2023-09", dateLabel: "Septembre 2023", titre: "Marine Le Pen annonce son intention d'être candidate (TF1)", candidatSlug: "marine-le-pen", future: false },
    { date: "2024-09", dateLabel: "Septembre 2024", titre: "Édouard Philippe annonce son intention d'être candidat", candidatSlug: "edouard-philippe", future: false },
    { date: "2025-03-31", dateLabel: "31 mars 2025", titre: "Marine Le Pen condamnée en première instance (inéligibilité)", candidatSlug: "marine-le-pen", future: false },
    { date: "2025-10", dateLabel: "Octobre 2025", titre: "Marine Tondelier annonce son intention d'être candidate", candidatSlug: "marine-tondelier", future: false },
    { date: "2025-11-15", dateLabel: "15 novembre 2025", titre: "Lancement de l'initiative de primaire unitaire de la gauche (Tondelier, Ruffin, Autain)", candidatSlug: null, future: false },
    { date: "2025-11-25", dateLabel: "25 novembre 2025", titre: "Delphine Batho annonce sa candidature", candidatSlug: "delphine-batho", future: false },
    { date: "2025-12-08", dateLabel: "8 décembre 2025", titre: "Nathalie Arthaud annonce sa candidature (congrès de Lutte Ouvrière)", candidatSlug: "nathalie-arthaud", future: false },
    { date: "2025-12-08", dateLabel: "8 décembre 2025", titre: "Marine Tondelier désignée candidate des Écologistes pour la primaire de la gauche (86% des voix)", candidatSlug: "marine-tondelier", future: false },
    { date: "2026-01", dateLabel: "Janvier-février 2026", titre: "François Ruffin et Jérôme Guedj se déclarent candidats", candidatSlug: "francois-ruffin", future: false },
    { date: "2026-03", dateLabel: "Mars 2026", titre: "Bruno Retailleau annonce sa candidature à l'investiture des Républicains", candidatSlug: "bruno-retailleau", future: false },
    { date: "2026-03", dateLabel: "Mars 2026", titre: "Florian Philippot, François Asselineau, Nicolas Dupont-Aignan et David Lisnard confirment leur candidature", candidatSlug: "nicolas-dupont-aignan", future: false },
    { date: "2026-04-19", dateLabel: "19 avril 2026", titre: "Bruno Retailleau désigné candidat officiel des Républicains (73,8% des voix des adhérents)", candidatSlug: "bruno-retailleau", future: false },
    { date: "2026-05-03", dateLabel: "3 mai 2026", titre: "Jean-Luc Mélenchon confirme sa candidature (4e candidature)", candidatSlug: "jean-luc-melenchon", future: false },
    { date: "2026-05-22", dateLabel: "22 mai 2026", titre: "Gabriel Attal officialise sa candidature", candidatSlug: "gabriel-attal", future: false },
    { date: "2026-06", dateLabel: "Juin 2026", titre: "Karim Bouamrane et Philippe Brun se déclarent candidats", candidatSlug: null, future: false },
    { date: "2026-07-05", dateLabel: "5 juillet 2026", titre: "Meeting de lancement de campagne d'Édouard Philippe (Adidas Arena)", candidatSlug: "edouard-philippe", future: false },
    { date: "2026-07-07", dateLabel: "7 juillet 2026", titre: "Verdict en appel de Marine Le Pen — éligible, pourvoi en cassation suspensif", candidatSlug: "marine-le-pen", future: false },
    { date: "2026-07-09", dateLabel: "9 juillet 2026", titre: "Vote interne du PS sur les modalités de sa participation à la primaire", candidatSlug: null, future: true },
    { date: "2026-10-11", dateLabel: "11 octobre 2026", titre: "Primaire « Front populaire 2027 »", candidatSlug: null, future: true },
    { date: "2026-10", dateLabel: "Automne 2026", titre: "Publication des programmes détaillés des candidats", candidatSlug: null, future: true },
    { date: "2027-01", dateLabel: "Début 2027", titre: "Ouverture de la collecte officielle des parrainages", candidatSlug: null, future: true },
    { date: "2027-03", dateLabel: "~Mars 2027", titre: "Publication de la liste officielle des candidats (Conseil constitutionnel)", candidatSlug: null, future: true },
    { date: "2027-04-18", dateLabel: "18 avril 2027", titre: "1er tour de l'élection présidentielle", candidatSlug: null, future: true },
    { date: "2027-05-02", dateLabel: "2 mai 2027", titre: "2nd tour de l'élection présidentielle", candidatSlug: null, future: true }
  ],

  candidats: [
    // ================= EXTRÊME GAUCHE =================
    {
      slug: "nathalie-arthaud",
      nom: "Nathalie Arthaud",
      parti: "Lutte Ouvrière",
      bloc: "exgauche",
      fiche: true,
      sondage: { label: "~0.5%", niveau: "faible", tendance: "stable" },
      historique: [
        { annee: 2012, resultat: "0.6%" },
        { annee: 2017, resultat: "0.6%" },
        { annee: 2022, resultat: "0.6%" }
      ],
      idees: ["Interdiction des licenciements", "Contrôle ouvrier", "Hausse des salaires"],
      age: "56 ans (née le 23 février 1970)",
      fonction_actuelle: "Porte-parole de Lutte Ouvrière depuis 2008 (succède à Arlette Laguiller) ; professeure agrégée d'économie-gestion en lycée (Aubervilliers)",
      parcours: {
        formation: "CAPES et agrégation d'économie et gestion",
        mandats: [
          "Porte-parole nationale de Lutte Ouvrière depuis 2008",
          "Candidate de LO à Pantin (Seine-Saint-Denis) aux municipales de 2026"
        ],
        faits_marquants: [
          "Candidate à la présidentielle en 2012 (0,6%), 2017 (0,6%) et 2022 (0,6%) — 2027 sera sa 4e candidature",
          "A succédé à Arlette Laguiller comme principale figure de LO en 2008",
          "Poursuit son métier de professeure d'économie en parallèle de ses responsabilités politiques",
          "LO prévoit d'être présente dans environ 250 villes aux municipales de 2026, Arthaud menant la liste à Pantin"
        ]
      },
      programme: {
        economie: ["Interdiction des licenciements et du chômage", "Contrôle ouvrier sur les entreprises et les comptes des grands groupes", "Nationalisation des banques sous contrôle des travailleurs", "SMIC porté à 1 800 € net"],
        social: ["Hausse générale des salaires et pensions de 300 €", "Fin des expulsions locatives", "Retour de la retraite à 60 ans, 37,5 annuités"],
        ecologie: ["Crise écologique présentée comme conséquence du capitalisme plutôt que par des mesures techniques ciblées", "Regard favorable sur la technologie nucléaire en soi, critique de sa gestion par des entreprises capitalistes"],
        securite: ["Lutte contre l'insécurité par la lutte contre le chômage et la précarité plutôt que par la répression"],
        institutions: ["Peu de propositions institutionnelles détaillées ; priorité donnée à la question sociale"],
        europe: ["Rejet de l'Union européenne en tant que construction au service du capital", "Défense d'une union internationale des travailleurs"]
      },
      positions: {
        retraites:   { stance: "pour",    detail: "Retour de l'âge légal à 60 ans et durée de cotisation réduite à 37,5 annuités." },
        immigration: { stance: "pour",    detail: "Refuse les discours accusant les immigrés d'être responsables du chômage ou de l'insécurité ; solidarité de classe entre travailleurs français et immigrés, avec ou sans papiers." },
        europe:      { stance: "contre",  detail: "Rejette l'UE en tant qu'institution au service des marchés, prône une union internationale des travailleurs." },
        nucleaire:   { stance: "nuance",  detail: "Plutôt bienveillante sur la technologie nucléaire elle-même, mais très critique de sa gestion par des entreprises capitalistes jugées irresponsables." },
        dette:       { stance: "contre",  detail: "Refuse que la dette publique soit remboursée par les travailleurs ; estime que les grands groupes capitalistes doivent la payer intégralement." }
      },
      sources: [
        "https://www.franceinfo.fr/politique/nathalie-arthaud/",
        "https://en.wikipedia.org/wiki/Nathalie_Arthaud",
        "https://www.europe1.fr/politique/Un-programme-de-lutte-pour-Nathalie-Arthaud-916560"
      ],
      changements_ligne: [],
      promesses_bilan: [],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check récent (2025-2026) d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur Nathalie Arthaud malgré plusieurs recherches — son profil est peu ciblé par le fact-checking national.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "SMIC porté à 2 000 € net, indexation automatique des salaires et pensions sur les prix.", direction: "hausse forte des salaires" },
        retraites: { synthese: "Retour à 60 ans, 37,5 annuités, +300 € sur salaires et pensions.", direction: "abaissement de l'âge légal" },
        securite: { synthese: "Peu de proposition sécuritaire spécifique ; sujet subordonné au discours de classe (refus de la stigmatisation).", direction: "non prioritaire" },
        immigration: { synthese: "Refuse toute division entre travailleurs français et immigrés (avec ou sans papiers), solidarité de classe contre les employeurs.", direction: "ouverture / solidarité de classe" },
        sante: { synthese: "Défense des services publics hospitaliers ; favorable à la dépénalisation du cannabis.", direction: "renforcement du service public" },
        ecologie: { synthese: "Rejette la fiscalité écologique jugée injuste pour les ménages ; prône une économie planifiée et nationalisée.", direction: "planification / nationalisation" },
        education: { synthese: "Défense générale des services publics d'éducation, sans mesure détaillée identifiée.", direction: "renforcement du service public" },
        europe: { synthese: "Rejette l'UE actuelle jugée capitaliste, prône une union des travailleurs européens plutôt qu'un repli souverainiste.", direction: "internationalisme, anti-UE capitaliste" },
        dette: { synthese: "Annulation de la dette publique, mise à contribution des grands groupes capitalistes, circuit du Trésor hors marchés financiers.", direction: "annulation / socialisation de la dette" },
        institutions: { synthese: "Favorable à la révocabilité des élus à tout moment ; sceptique envers les référendums (dont le RIC).", direction: "révocabilité des élus" }
      },
      soutiens: [
        { nom: "Lutte Ouvrière (parti)", fonction: "Organisation désignant sa candidate via vote de congrès (décembre 2025)", type: "officiel" }
      ]
    },
    {
      slug: "juan-branco", nom: "Juan Branco", parti: "Sans étiquette", bloc: "exgauche", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },

    // ================= GAUCHE RADICALE =================
    {
      slug: "jean-luc-melenchon",
      nom: "Jean-Luc Mélenchon",
      parti: "La France Insoumise",
      bloc: "gradicale",
      fiche: true,
      sondage: { label: "13–16%", niveau: "fort", tendance: "hausse" },
      historique: [
        { annee: 2012, resultat: "11.1%" },
        { annee: 2017, resultat: "19.6%" },
        { annee: 2022, resultat: "22.0%" }
      ],
      idees: ["SMIC 1 600 € net", "Retraite à 60 ans", "VIe République", "Planification écologique"],
      age: "74 ans (né le 19 août 1951 à Tanger)",
      fonction_actuelle: "Coordinateur / leader de La France Insoumise ; ne détient plus de mandat électif depuis son départ de l'Assemblée nationale en 2022",
      parcours: {
        formation: "Études de philosophie et de lettres à l'université de Franche-Comté (Besançon)",
        mandats: [
          "Sénateur de l'Essonne (1986-2010)",
          "Ministre délégué à l'Enseignement professionnel sous Lionel Jospin (2000-2002)",
          "Député européen (2009-2017)",
          "Député des Bouches-du-Rhône (2017-2022)"
        ],
        faits_marquants: [
          "Militant dès mai 1968, quitte le PS en 2008 pour fonder le Parti de Gauche",
          "Fonde La France Insoumise en 2016, mouvement qu'il dirige de facto",
          "Trois candidatures à la présidentielle : 2012 (11,1%), 2017 (19,6%), 2022 (22,0%, à environ 400 000 voix du second tour)",
          "Refuse de participer à la primaire unitaire de la gauche prévue le 11 octobre 2026 et lance sa campagne à Saint-Denis"
        ]
      },
      programme: {
        economie: ["SMIC à 1 600 € net", "Tranche d'impôt marginale à 90% au-delà de 400 000 €/an", "Impôt sur la fortune climatique (~10 Md€ attendus)", "Garantie d'emploi pour les chômeurs de longue durée"],
        social: ["4e édition du programme « L'Avenir en commun » (2025), élaborée de façon participative depuis 2017"],
        ecologie: ["Planification écologique et « règle verte »", "Sortie progressive du nucléaire à horizon 2045 au profit des renouvelables"],
        securite: ["Peu de nouveautés identifiées pour 2027 sur ce volet"],
        institutions: ["Passage à une VIe République via une Assemblée constituante et un référendum"],
        europe: ["Stratégie de « désobéissance européenne » aux règles jugées contraignantes (pacte de stabilité, concurrence), sans sortie formelle de l'UE", "Appel à sortir de l'OTAN et à dialoguer directement avec la Russie"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "Retraite à 60 ans, proposition constante depuis ses précédentes candidatures." },
        immigration: { stance: "pour",   detail: "Refus de la préférence nationale, accès égal aux prestations sociales pour tous les résidents légaux, parcours de régularisation pour les sans-papiers." },
        europe:      { stance: "nuance", detail: "Pas de sortie de l'UE revendiquée mais stratégie de désobéissance aux traités ; un « plan B » resté ambigu sur l'euro." },
        nucleaire:   { stance: "contre", detail: "Sortie progressive du nucléaire visée à l'horizon 2045, remplacé par les renouvelables." },
        dette:       { stance: "contre", detail: "Propose un rachat par la BCE de la dette sur les marchés et un audit citoyen pour renégocier la part jugée « illégitime », plutôt qu'une réduction stricte." }
      },
      sources: [
        "https://melenchon2027.fr/programme2025/livre/",
        "https://en.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon",
        "https://www.publicsenat.fr/actualites/politique/presidentielle-2027-melenchon-et-philippe-au-coude-a-coude-pour-la-qualification-au-second-tour"
      ],
      changements_ligne: [
        { date: "7-12 novembre 2008", de: "Courant minoritaire au sein du Parti socialiste (motion C, 18,52% au congrès de Reims)", vers: "Fondation du Parti de Gauche (congrès fondateur le 1er février 2009)", contexte: "Rupture actée après le vote des motions internes du congrès de Reims, sur fond de désaccord avec l'orientation majoritaire du PS." },
        { date: "entre les programmes 2017 et 2022", de: "Sortie de l'euro envisagée comme option de repli (« Plan B ») en 2017", vers: "Stratégie de « désobéissance sélective » aux traités européens (pacte de stabilité, règles de concurrence), sans sortie automatique de l'euro", contexte: "Reformulation de la doctrine européenne ; l'issue en cas d'échec des négociations reste débattue en interne à LFI." },
        { date: "depuis 2022 (guerre en Ukraine)", de: "Critique globale de l'OTAN avec ambiguïté sur les responsabilités du conflit", vers: "Maintien de la critique de l'OTAN tout en distinguant explicitement ce sujet de la responsabilité de la Russie, attribuée à Vladimir Poutine", contexte: "Clarification rhétorique adoptée face aux accusations de complaisance envers Moscou." }
      ],
      promesses_bilan: [],
      fact_checks: [
        { affirmation: "Une publication reprise sur les réseaux sociaux affirmait que Jean-Luc Mélenchon percevait un salaire mensuel d'environ 36 000 € du fait de mandats cumulés (eurodéputé, sénateur).", verdict: "faux", source: "Defacto (observatoire) / AFP Factuel", url: "https://defacto-observatoire.fr/get/Medias/Factuel/Fact-checks/Retour-d-une-infox-affirmant-que-Jean-Luc-Melenchon-gagne-un-salaire-mensuel-de-36-000/WebHome", date: "resurgence identifiée en 2022, réexaminée en 2026" },
        { affirmation: "Lors d'un meeting à Lyon (26 février 2026), Jean-Luc Mélenchon a évoqué la prononciation du nom « Epstein », disant vouloir dire « Epstine » car « ça fait plus russe ».", verdict: "partiellement_vrai", source: "franceinfo / Public Sénat / France 24", url: "https://www.franceinfo.fr/politique/melenchon/ah-vous-voulez-dire-epstine-pardon-ca-fait-plus-russe-jean-luc-melenchon-cree-la-polemique-lors-d-un-meeting-a-lyon_7833758.html", date: "27 février 2026" },
        { affirmation: "Un montage audio diffusé sur France Culture établissait un parallèle entre des propos de Jean-Luc Mélenchon et de Jean-Marie Le Pen pour suggérer une proximité avec l'antisémitisme.", verdict: "trompeur", source: "Arrêt sur images / 20 Minutes", url: "https://www.arretsurimages.net/articles/antisemitisme-face-a-le-pen-erner-diffuse-un-extrait-mensonger-sur-melenchon", date: "juin 2026" }
      ],
      positions_10_sujets: {
        pouvoir_achat: { synthese: "SMIC à 1 600 € net, suppression de la TVA sur les produits de première nécessité, hausse du RSA et de l'AAH au niveau du seuil de pauvreté.", direction: "hausse des minima sociaux" },
        retraites: { synthese: "Retour à 60 ans après 40 annuités, retraites portées au niveau du SMIC, opposition à la capitalisation.", direction: "abaissement de l'âge légal" },
        securite: { synthese: "Priorité aux alternatives à l'incarcération, refus des peines planchers, autorité indépendante de contrôle de l'action policière, légalisation du cannabis.", direction: "approche non répressive" },
        immigration: { synthese: "Pas de plafond chiffré à l'immigration légale, régularisation des sans-papiers, maintien de l'AME ; vote contre la loi immigration de 2024.", direction: "politique d'accueil" },
        sante: { synthese: "Remboursement intégral et élargissement de la PMA, légalisation de l'aide à mourir, hausse du financement hospitalier.", direction: "renforcement du service public" },
        ecologie: { synthese: "Objectif 100% énergies renouvelables d'ici 2050, sortie du nucléaire, fin des subventions aux énergies fossiles.", direction: "sortie du nucléaire" },
        education: { synthese: "60 000 recrutements immédiats dans l'Éducation nationale, opposition à l'uniforme scolaire obligatoire.", direction: "renforcement des moyens publics" },
        europe: { synthese: "Stratégie de « désobéissance européenne » sans sortie formelle de l'UE, renégociation des traités (Plan A) avec application unilatérale du programme en cas d'échec (Plan B).", direction: "renégociation / désobéissance sélective" },
        dette: { synthese: "Remise en cause des règles de 3% de déficit et 60% de dette du cadre européen, plaidoyer pour une souveraineté budgétaire retrouvée.", direction: "assouplissement des règles budgétaires" },
        institutions: { synthese: "VIe République parlementaire, suppression du 49.3, scrutin proportionnel, référendum d'initiative citoyenne, droit de vote à 16 ans.", direction: "refonte institutionnelle profonde" }
      },
      soutiens: [
        { nom: "Mathilde Panot", fonction: "Présidente du groupe LFI à l'Assemblée nationale", type: "officiel" },
        { nom: "Manuel Bompard", fonction: "Coordinateur de La France Insoumise", type: "officiel" },
        { nom: "Clémence Guetté", fonction: "Députée LFI", type: "officiel" },
        { nom: "Sophia Chikirou", fonction: "Députée européenne LFI", type: "officiel" }
      ]
    },

    // ================= GAUCHE — PRIMAIRE =================
    {
      slug: "marine-tondelier",
      nom: "Marine Tondelier",
      parti: "Les Écologistes",
      bloc: "gprimaire",
      fiche: true,
      sondage: { label: "~2.5%", niveau: "moyen", tendance: "stable" },
      historique: [],
      idees: ["Transition écologique", "Justice sociale", "Candidature unitaire gauche"],
      age: "39 ans (née le 23 août 1986)",
      fonction_actuelle: "Secrétaire nationale des Écologistes depuis décembre 2022, candidate désignée par les Écologistes pour la primaire de la gauche",
      parcours: {
        formation: "Sciences Po Lille (2009, filière carrières publiques), master en management de la santé",
        mandats: [
          "Élue locale à Hénin-Beaumont (Pas-de-Calais), ville où elle a grandi",
          "Assistante parlementaire d'Aline Archimbaud puis de Cécile Duflot (2011-2017)",
          "Déléguée générale du réseau national de surveillance de la qualité de l'air (2017-2022)",
          "Secrétaire nationale des Écologistes depuis 2022 (élue avec 90,8% des voix)"
        ],
        faits_marquants: [
          "Forte médiatisation nationale à partir de 2023-2024 comme porte-parole grand public de l'écologie politique",
          "Co-initiatrice avec F. Ruffin et C. Autain de la primaire de la gauche unitaire (annoncée le 15/11/2025)",
          "Désignée candidate des Écologistes à la primaire le 8/12/2025 (86% des voix internes)",
          "Annonce en avril 2026, avec Ruffin, d'être candidate même sans primaire aboutie",
          "Première candidature à la présidentielle"
        ]
      },
      programme: {
        economie: ["« Green new deal à la française » : investissements publics et régulations environnementales", "Hausse du SMIC et indexation des bas salaires"],
        social: ["Création d'un « revenu climat » pour les ménages modestes", "Réduction du temps de travail", "« Bouclier social et environnemental » (transports, logement, alimentation)"],
        ecologie: ["Sortie progressive du nucléaire au profit des renouvelables", "Aides publiques conditionnées à l'impact environnemental et social"],
        securite: ["Approche élargie de la sécurité, au-delà du seul cadrage immigration/délinquance", "Pas de désarmement généralisé de la police, mais formation renforcée à l'usage des armes"],
        institutions: ["Passage à une VIe République plus parlementaire", "Élection de l'Assemblée à la proportionnelle intégrale"],
        europe: ["Signataire en 2023 d'un manifeste pour une Europe fédérale, forte et juste"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "S'inscrit dans la ligne de la gauche, opposée à la réforme portant l'âge à 64 ans, sans chiffrage détaillé et confirmé pour 2027." },
        immigration: { stance: "nuance", detail: "Critique le cadrage sécuritaire centré sur l'immigration porté par la droite ; pas de position chiffrée détaillée trouvée sur les politiques migratoires." },
        europe:      { stance: "pour",   detail: "Favorable à une intégration européenne renforcée et fédérale." },
        nucleaire:   { stance: "contre", detail: "Favorable à la sortie progressive du nucléaire à mesure que les renouvelables se développent." },
        dette:       { stance: "nuance", detail: "Distingue « bonne » et « mauvaise » dette ; défend une taxation des grandes fortunes plutôt qu'une réduction stricte de la dépense." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Marine_Tondelier",
        "https://reporterre.net/Presidentielle-2027-Marine-Tondelier-representera-Les-Ecologistes-a-la-primaire-de-la-gauche",
        "https://fr.wikipedia.org/wiki/Primaire_de_la_gauche_unitaire_de_2026"
      ],
      changements_ligne: [
        { date: "été 2026", de: "Ligne historique des Écologistes de prudence/réticence envers la climatisation (jugée non prioritaire face à l'urgence climatique)", vers: "Reconnaît pendant la canicule 2026 que la climatisation « devient nécessaire » et fait partie des solutions d'adaptation, tout en la jugeant inégalitaire et « pas une solution miracle »", contexte: "Inflexion assumée pendant un épisode de canicule ; propose en complément un « congé climatique » pour les travailleurs exposés à la chaleur." }
      ],
      promesses_bilan: [],
      fact_checks: [
        { affirmation: "Le 12 janvier 2025 sur RTL, Marine Tondelier a déclaré que 40% de la population de Gaza avait été exterminée depuis octobre 2023.", verdict: "faux (reconnu par l'intéressée)", source: "Le JDD / Times of Israël (couverture de sa propre rectification publique)", url: "https://www.lejdd.fr/politique/40-de-la-population-de-gaza-exterminee-depuis-octobre-2023-marine-tondelier-reconnait-une-erreur-et-presente-ses-excuses-153825", date: "12-13 janvier 2025" }
      ],
      fact_checks_note: "Aucun fact-check dédié d'AFP Factuel, Les Décodeurs ou CheckNews spécifiquement consacré à Marine Tondelier n'a été identifié pour 2025-2026 ; le seul élément vérifiable trouvé est sa propre rectification publique, largement reprise par la presse généraliste.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        securite: { synthese: "Privilégie la prévention à la répression : police de proximité, justice des mineurs renforcée, insertion professionnelle plutôt que répression.", direction: "prévention / proximité" },
        immigration: { synthese: "Ligne humaniste : régularisation de travailleurs sans papiers dans les métiers en tension, voies légales pour réfugiés climatiques ; conteste le lien immigration-délinquance.", direction: "accueil / régularisation" },
        sante: { synthese: "50 000 recrutements hospitaliers, +15% de salaires, plan de 10 000 psychologues dans écoles et entreprises.", direction: "investissement public" },
        ecologie: { synthese: "Axe central du programme : transition écologique estimée à ~140 Md€/an, articulant mitigation et adaptation.", direction: "transition renforcée" },
        education: { synthese: "Cours d'écologie obligatoires dès le primaire, +20% de salaires enseignants, classes plafonnées à 20 élèves.", direction: "renforcement des moyens" },
        europe: { synthese: "Ligne fédéraliste assumée, signataire d'un manifeste pour une Europe fédérale, forte et sociale.", direction: "fédéralisme européen" },
        dette: { synthese: "Pas de position chiffrée officielle sur la dette ; des analyses externes pointent un risque de financement par la dette de son plan écologique.", direction: "non précisé / critiqué en externe" },
        institutions: { synthese: "VIe République plus parlementaire, proportionnelle, référendum d'initiative citoyenne.", direction: "VIe République / proportionnelle" }
      },
      soutiens: [
        { nom: "Olivier Faure", fonction: "Premier secrétaire du Parti socialiste", type: "officiel" },
        { nom: "Clémentine Autain", fonction: "Députée, figure de la gauche (ex-LFI)", type: "officiel" },
        { nom: "François Ruffin", fonction: "Député, figure de la gauche (ex-LFI)", type: "officiel" },
        { nom: "Benjamin Lucas", fonction: "Député, Génération·s", type: "officiel" },
        { nom: "Sandrine Rousseau", fonction: "Députée écologiste de Paris", type: "presume — critique en interne d'une candidature autonome jugée facteur de fragmentation" }
      ]
    },
    {
      slug: "francois-ruffin",
      nom: "François Ruffin",
      parti: "Debout !",
      bloc: "gprimaire",
      fiche: true,
      sondage: { label: "~2–3%", niveau: "moyen", tendance: "hausse" },
      historique: [],
      idees: ["France populaire", "Réindustrialisation verte", "Lutte contre la pauvreté"],
      age: "50 ans (né le 18 octobre 1975 à Calais)",
      fonction_actuelle: "Député de la 1ère circonscription de la Somme (depuis 2017), fondateur du mouvement « Debout ! »",
      parcours: {
        formation: "Maîtrise de lettres puis diplôme du Centre de Formation des Journalistes (CFJ, 2002)",
        mandats: ["Député de la Somme depuis 2017, réélu en 2022 et 2024", "Aucun mandat exécutif antérieur — première candidature présidentielle"],
        faits_marquants: [
          "Fondateur en 1999 du journal Fakir, dont il reste rédacteur en chef",
          "Réalisateur du documentaire « Merci Patron ! » (2016), César du meilleur documentaire en 2017",
          "Impliqué dans le lancement du mouvement Nuit debout (2016)",
          "Proposition de loi contre les techniques d'immobilisation policières jugées dangereuses",
          "Fonde le mouvement « Debout ! » en juin 2025 et se porte candidat à la primaire de la gauche"
        ]
      },
      programme: {
        economie: ["« Buy French Act » imposant l'achat français aux administrations et entreprises publiques", "Réindustrialisation, soutien aux paysans face à la PAC", "Statut renforcé pour les « travailleurs essentiels »"],
        social: ["Rénovation énergétique gratuite pour 8 millions de passoires thermiques, financée par une taxe sur les énergies fossiles", "Retraite anticipée pour les métiers pénibles"],
        ecologie: ["« Économie de guerre climatique » : mobilisation massive des moyens publics contre le dérèglement climatique", "Référendum possible sur le mix énergétique français"],
        securite: ["Renforcement du contrôle externe de la police", "Interdiction des techniques d'immobilisation dangereuses (plaquage ventral)"],
        institutions: ["Convocation d'une Assemblée constituante pour une VIe République (selon plusieurs sources)"],
        europe: ["Critique du libre-échange européen jugé responsable de désindustrialisation", "Appel à un « retour des frontières » sur capitaux, marchandises et personnes"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "A voté la suspension de la réforme des retraites ; propose des départs anticipés pour les métiers pénibles." },
        immigration: { stance: "nuance", detail: "Se dit « hostile à l'immigration de travail », notamment dans les services à la personne — une position singulière au sein de la gauche." },
        europe:      { stance: "nuance", detail: "Ne prône pas la sortie de l'UE mais un protectionnisme assumé et une indépendance stratégique européenne portée par la France." },
        nucleaire:   { stance: "nuance", detail: "Reconnaît la place du nucléaire sans en défendre une relance massive ; propose de trancher la question par référendum." },
        dette:       { stance: "nuance", detail: "Considère la dette comme un investissement utile si elle finance des dépenses réduisant les coûts futurs (ex. rénovation énergétique)." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Fran%C3%A7ois_Ruffin",
        "https://www.lejdd.fr/politique/presidentielle-2027-francois-ruffin-se-dit-hostile-a-limmigration-de-travail-172605",
        "https://legrandcontinent.eu/fr/2026/02/25/pour-une-declaration-dindependance-la-doctrine-ruffin-sur-leurope/"
      ],
      changements_ligne: [
        { date: "15 juin 2024", de: "Groupe parlementaire La France Insoumise", vers: "Groupe Écologiste et Social", contexte: "Refus de LFI de réinvestir plusieurs députés critiques de Jean-Luc Mélenchon (dont Alexis Corbière) et le président de son mouvement local dans la Somme ; Ruffin dénonce cette mise à l'écart et quitte le groupe LFI à l'Assemblée." },
        { date: "28 juin 2025", de: "Micro-parti régional « Picardie Debout ! »", vers: "Mouvement national « Debout ! »", contexte: "Lancement officiel à Paris du mouvement Debout!, dont Ruffin devient président, en vue d'une candidature à la primaire de la gauche ou, à défaut, d'une candidature autonome." }
      ],
      promesses_bilan: [],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check récent (2025-2026) d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur François Ruffin. Point notable hors périmètre strict : une enquête de Marianne documente un écart entre sa promesse de « vivre au SMIC » et des revenus déclarés à la HATVP nettement supérieurs (~125 000 €/an en moyenne 2019-2023) ; Ruffin a lui-même reconnu publiquement ne pas vivre au SMIC. Une polémique distincte (mai 2026) sur une bande dessinée accusée de véhiculer des stéréotypes racistes a aussi nourri un repositionnement de campagne sur le thème de la probité.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Porte-parole des « travailleurs essentiels » ; SMIC à 1 700 € nets et prime immédiate de 1 000 € financée par la taxation des plus riches.", direction: "hausse des bas salaires" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (opposition à la réforme des 64 ans).", direction: "" },
        securite: { synthese: "Pas de volet sécuritaire détaillé ; recentrage de campagne sur la probité et la lutte anticorruption après la polémique sur sa BD (mai 2026).", direction: "axe probité plutôt que sécuritaire" },
        immigration: { synthese: "Controverse en mai 2026 après avoir dit vouloir limiter l'immigration de travail future tout en défendant l'accueil des personnes déjà présentes, provoquant des tensions à gauche.", direction: "distinction accueil existant / restriction flux futurs" },
        sante: { synthese: "Hausse de 20% du budget de la santé publique et recrutements massifs de soignants.", direction: "renforcement des moyens publics" },
        ecologie: { synthese: "Sortie progressive (non immédiate) du nucléaire, énergies renouvelables citoyennes, objectif -50% de CO2 d'ici 2030, chèque vert pour les ménages modestes.", direction: "transition progressive et sociale" },
        education: { synthese: "Recrutements massifs d'enseignants.", direction: "renforcement des moyens publics" },
        europe: { synthese: "Non re-recherché — déjà documenté en base (critique des traités européens).", direction: "" },
        dette: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        institutions: { synthese: "VIe République via assemblée constituante, référendum d'initiative citoyenne, scrutin proportionnel intégral.", direction: "refonte institutionnelle" }
      },
      soutiens: [
        { nom: "Alexis Corbière", fonction: "Député, ex-LFI (Seine-Saint-Denis)", type: "officiel" },
        { nom: "Sébastien Jumel", fonction: "Ancien député, ex-PCF", type: "officiel" },
        { nom: "Laurent Baumel", fonction: "Parlementaire, Parti socialiste", type: "officiel" },
        { nom: "Mathieu Bosque", fonction: "Ex-LFI, ancien président du mouvement (2024-2025)", type: "officiel" }
      ]
    },
    {
      slug: "clementine-autain", nom: "Clémentine Autain", parti: "L'Après", bloc: "gprimaire", fiche: false,
      sondage: { label: "< 1%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },
    {
      slug: "lydie-massard", nom: "Lydie Massard", parti: "Union Démocr. Bretonne", bloc: "gprimaire", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },

    // ================= GAUCHE HORS PRIMAIRE =================
    {
      slug: "delphine-batho",
      nom: "Delphine Batho",
      parti: "Génération Écologie",
      bloc: "ghors",
      fiche: true,
      sondage: { label: "< 1%", niveau: "faible", tendance: "stable" },
      historique: [],
      idees: ["Écologie de gouvernement", "Autonomie régionale"],
      age: "53 ans (née le 23 mars 1973 à Paris)",
      fonction_actuelle: "Députée de la 2e circonscription des Deux-Sèvres et présidente de Génération Écologie depuis 2018",
      parcours: {
        formation: "Baccalauréat au lycée Henri-IV (1992), études d'histoire à Paris 7 (non achevées), ancienne administratrice territoriale",
        mandats: [
          "Députée des Deux-Sèvres depuis 2007 (5 mandats)",
          "Ministre déléguée à la Justice (mai-juin 2012)",
          "Ministre de l'Écologie, du Développement durable et de l'Énergie (2012-2013)"
        ],
        faits_marquants: [
          "Présidente du syndicat lycéen FIDL (1988-1990) puis vice-présidente de SOS Racisme (1992-1998)",
          "Nommée ministre de l'Écologie sous Hollande en 2012, limogée en 2013 après avoir critiqué publiquement le budget de son ministère",
          "Quitte le PS en 2018 pour présider Génération Écologie",
          "3e de la primaire écologiste de 2021 (22,3% des voix) avec un discours de décroissance",
          "Candidature à la présidentielle 2027 annoncée le 25 novembre 2025"
        ]
      },
      programme: {
        economie: ["Rupture avec la recherche permanente de la croissance du PIB", "Priorité aux besoins essentiels plutôt qu'à la consommation"],
        social: ["Écologie conçue comme projet de justice sociale", "Projet de « République terrestre » protectrice du quotidien"],
        ecologie: ["Sortie accélérée des énergies fossiles et sobriété énergétique", "Agriculture sans pesticides ni chimie industrielle, souveraineté alimentaire"],
        securite: ["Volet non documenté dans les sources disponibles"],
        institutions: ["Opposition au présidentialisme et à l'influence des lobbies", "Autonomie régionale renforcée"],
        europe: ["Souveraineté écologique européenne, réduction de la dépendance aux importations", "Opposée à une sortie de la France de l'UE"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "A voté pour la suspension de la réforme portant l'âge légal à 64 ans." },
        immigration: { stance: "pour",   detail: "A voté contre la loi immigration de 2023 ; opposée à la réduction de l'immigration légale et à la suppression du droit du sol." },
        europe:      { stance: "pour",   detail: "Opposée à une sortie de la France de l'UE, tout en défendant une souveraineté écologique européenne." },
        nucleaire:   { stance: "contre", detail: "S'oppose à ce que le nucléaire reste un pilier de la politique énergétique française." },
        dette:       { stance: "contre", detail: "Plutôt favorable à des plans d'investissement public majeurs pour la transition écologique, même en cas de hausse du déficit." }
      },
      sources: [
        "https://fr.wikipedia.org/wiki/Delphine_Batho",
        "https://www.assemblee-nationale.fr/dyn/deputes/PA335999",
        "https://www.franceinfo.fr/politique/eelv/l-ex-ministre-delphine-batho-candidate-a-la-presidentielle"
      ],
      changements_ligne: [
        { date: "2 mai 2018", de: "Parti socialiste", vers: "Génération Écologie", contexte: "Annonce son départ du PS après l'échec de sa candidature à la présidence du parti au congrès d'Aubervilliers ; élue présidente de Génération Écologie le 10 septembre 2018." }
      ],
      promesses_bilan: [
        { promesse: "Défendre un budget 2014 du ministère de l'Écologie à la hauteur des enjeux environnementaux", resultat: "non_tenu", detail: "Le 2 juillet 2013, elle qualifie publiquement le budget 2014 de son ministère de « mauvais » et exprime sa déception envers le gouvernement ; François Hollande met fin à ses fonctions le jour même." },
        { promesse: "Incarner une écologie « régalienne », intégrée aux fonctions centrales de l'État", resultat: "non_tenu", detail: "Son mandat s'achève après 13 mois par un limogeage, avant d'avoir pu mettre en œuvre cette vision structurelle du ministère." }
      ],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur Delphine Batho pour 2025-2026, ni de soutien externe nommément identifié au-delà de l'investiture unanime interne de Génération Écologie (juin 2026).",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Protection contre l'inflation et les hausses de prix de l'énergie, dans une logique de sobriété plutôt que de relance de la consommation.", direction: "protection ciblée" },
        retraites: { synthese: "Critique la réforme des 64 ans, dénonçant un cumul d'efforts demandés aux citoyens sans contrepartie de justice sociale.", direction: "opposition à la réforme" },
        securite: { synthese: "Demande le réexamen des plaintes de mineurs pour violences, citant des affaires précises comme symptômes d'un dysfonctionnement judiciaire.", direction: "renforcement protection des mineurs" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        sante: { synthese: "Santé pensée comme indissociable de l'environnement (pollution de l'air et de l'eau, hausse des cancers).", direction: "santé environnementale" },
        ecologie: { synthese: "Fait de la décroissance le cœur explicite de son projet, jugeant la croissance du PIB incompatible avec la sécurité climatique.", direction: "décroissance assumée" },
        education: { synthese: "Éducation à la consommation responsable comme pilier de sa politique.", direction: "éducation à la consommation responsable" },
        europe: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        dette: { synthese: "Reconnaît un problème de dette et de déficit mais refuse une résolution par l'austérité seule, plaidant pour un « compromis social et écologique ».", direction: "compromis social et écologique" },
        institutions: { synthese: "Critique le présidentialisme, l'usage du 49.3 et l'influence des lobbies ; défend l'indépendance des autorités (ex. IRSN).", direction: "anti-présidentialisme" }
      },
      soutiens: []
    },
    {
      slug: "jerome-guedj", nom: "Jérôme Guedj", parti: "PS (dissident)", bloc: "ghors", fiche: false,
      sondage: { label: "< 1%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },
    {
      slug: "karim-bouamrane", nom: "Karim Bouamrane", parti: "PS", bloc: "ghors", fiche: false,
      sondage: { label: "< 1%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },
    {
      slug: "philippe-brun", nom: "Philippe Brun", parti: "PS (primaire interne)", bloc: "ghors", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },

    // ================= BLOC CENTRAL =================
    {
      slug: "edouard-philippe",
      nom: "Édouard Philippe",
      parti: "Horizons",
      bloc: "centre",
      fiche: true,
      sondage: { label: "14–19%", niveau: "fort", tendance: "stable" },
      historique: [],
      idees: ["Règle d'or budgétaire", "Refonte école « post-Ferry »", "3 référendums", "Retraite par capitalisation"],
      age: "55 ans (né en 1970 à Rouen)",
      fonction_actuelle: "Maire du Havre (réélu le 28 mars 2026) et président-fondateur du parti Horizons",
      parcours: {
        formation: "Sciences Po Paris (1992), École nationale d'administration — promotion Marc Bloch (1995-1997)",
        mandats: [
          "Premier ministre (mai 2017 - juillet 2020)",
          "Maire du Havre depuis 2010 (réélu 2014, 2020, 2026)",
          "Député de Seine-Maritime (élu 2012)"
        ],
        faits_marquants: [
          "Passage au Conseil d'État puis directeur général de l'UMP (2002)",
          "Ancien salarié du groupe nucléaire AREVA",
          "Premier ministre le plus durable du 1er quinquennat Macron, marqué par la réforme SNCF, les Gilets jaunes et le début de la pandémie",
          "Fonde le parti Horizons en 2021, intégré à la coalition présidentielle",
          "Lance officiellement sa candidature 2027 le 5 juillet 2026 (meeting à l'Adidas Arena) — première candidature à la présidentielle"
        ]
      },
      programme: {
        economie: ["Réduction du déficit public de 5,1% à 2% du PIB d'ici 2032 via une « règle d'or » budgétaire", "Baisse des impôts de production pour favoriser relocalisations et emploi"],
        social: ["Maintien de l'âge légal à 64 ans avec incitations à travailler plus longtemps", "Contribution accrue demandée aux retraités"],
        ecologie: ["Mix énergétique fondé sur le nucléaire et les renouvelables", "Rénovation des logements, écoles, hôpitaux ; lutte contre les îlots de chaleur urbains"],
        securite: ["Réforme de la justice envisagée par voie d'ordonnances"],
        institutions: ["3 référendums : retraites/capitalisation, règle d'or budgétaire, habilitation à légiférer par ordonnances", "Refonte du système scolaire dite « post-Ferry »"],
        europe: ["Ancrage pro-européen général, sans doctrine détaillée et sourcée identifiée à ce stade"]
      },
      positions: {
        retraites:   { stance: "contre",  detail: "Maintien de l'âge légal à 64 ans, incitations fortes à travailler plus longtemps, contribution accrue des retraités et introduction d'une dose de capitalisation soumise à référendum." },
        immigration: { stance: "nuance",  detail: "Immigration « choisie et contrôlée » : quotas ciblés sur les métiers en tension, mais durcissement du regroupement familial." },
        europe:      { stance: "pour",    detail: "Ancrage pro-européen dans la continuité de son passage à Matignon, sans détail doctrinal précis identifié." },
        nucleaire:   { stance: "pour",    detail: "Défend un mix articulé autour du nucléaire et des renouvelables ; ancien salarié d'AREVA." },
        dette:       { stance: "pour",    detail: "Objectif de réduction du déficit de 5,1% à 2% du PIB d'ici 2032 via une règle d'or budgétaire inscrite dans la Constitution." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/%C3%89douard_Philippe",
        "https://www.cnews.fr/france/2026-07-05/presidentielle-2027-refonte-de-lecole-justice-immigration-ce-quil-faut-retenir-du",
        "https://www.elyseescope.com/candidat/edouard-philippe/programme-presidentiel-et-methode"
      ],
      changements_ligne: [
        { date: "2002", de: "Parti socialiste (soutien à Michel Rocard)", vers: "UMP (proche d'Alain Juppé)", contexte: "Militant au PS dans les années 1990 en soutenant Michel Rocard, il rallie la droite lors de la création de l'UMP en 2002 et devient directeur général des services de l'UMP jusqu'en 2004." },
        { date: "2017", de: "Les Républicains (ex-UMP)", vers: "Gouvernement Macron / bloc central", contexte: "Quitte Les Républicains pour devenir Premier ministre d'Emmanuel Macron, avant de fonder son propre parti Horizons en 2021." }
      ],
      promesses_bilan: [
        { promesse: "Réforme systémique des retraites (régime universel par points), engagement du programme Macron 2017", resultat: "non_tenu", detail: "Interrompue par la crise du Covid-19 au printemps 2020 après un long mouvement social fin 2019 ; jamais reprise sous cette forme." },
        { promesse: "Réforme de l'assurance-chômage (calcul et indemnisation)", resultat: "partiellement", detail: "Nouvelles modalités de calcul entrées en vigueur été 2019, mais les mesures les plus dures ont été suspendues par l'épidémie de Covid-19 en 2020." },
        { promesse: "Suppression progressive de la taxe d'habitation sur la résidence principale", resultat: "partiellement", detail: "Engagée dès le budget 2018 pour 80% des foyers, mais suppression totale achevée seulement en 2023, après son départ de Matignon." },
        { promesse: "Transformation de l'ISF en IFI et flat tax sur les revenus du capital", resultat: "tenu", detail: "Mesures figurant dans le budget 2018, premier budget préparé sous son autorité, appliquées dès 2018." },
        { promesse: "Réforme ferroviaire de la SNCF (fin du statut de cheminot, ouverture à la concurrence)", resultat: "tenu", detail: "Adoptée par ordonnances avant l'été 2018 malgré un mouvement de grève important." }
      ],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur Édouard Philippe pour 2025-2026. Élément factuel judiciaire notable à signaler pour la neutralité : le Parquet national financier a ouvert début mai 2026 une enquête visant Édouard Philippe pour détournement de fonds publics, favoritisme et prise illégale d'intérêts, concernant le financement (2,154 M€) d'une association gérant la « Cité numérique » du Havre ; faits contestés par l'intéressé, enquête en cours, sans mise en examen ni jugement à ce stade.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Prime exceptionnelle ciblée sur les classes moyennes et indexation des retraites et minima sociaux sur l'inflation réelle.", direction: "soutien ciblé classes moyennes" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (capitalisation, maintien 64 ans).", direction: "" },
        securite: { synthese: "Renforcement de la sécurité au quotidien présenté comme un des piliers de campagne, aux côtés de l'école et des retraites.", direction: "fermeté" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base (immigration choisie et contrôlée).", direction: "" },
        sante: { synthese: "Recrutement massif de personnels soignants et création d'un grand service public de santé décentralisé.", direction: "renforcement du service public" },
        ecologie: { synthese: "Mix nucléaire-renouvelables avec 6 à 8 nouveaux EPR et un plan de 80 Md€ sur 5 ans pour la rénovation thermique ; adaptation aux canicules au cœur du débat.", direction: "nucléaire et renouvelables" },
        education: { synthese: "« Refonte » de l'école présentée comme la plus importante depuis Jules Ferry : fondamentaux dès le CP, 50 lycées d'excellence en région.", direction: "retour aux fondamentaux, exigence" },
        europe: { synthese: "Souveraineté européenne sur la technologie, la défense, l'énergie et la finance ; maintien plein dans l'OTAN plutôt qu'une armée européenne intégrée.", direction: "souveraineté européenne atlantiste" },
        dette: { synthese: "Non re-recherché — déjà documenté en base (règle d'or budgétaire).", direction: "" },
        institutions: { synthese: "Dissolution de l'Assemblée dès son élection et trois référendums (retraites, règle d'or, habilitation à légiférer par ordonnances sur santé/éducation/justice).", direction: "référendums et dissolution" }
      },
      soutiens: [
        { nom: "Nathalie Kosciusko-Morizet", fonction: "Ancienne ministre (ex-UMP)", type: "officiel" },
        { nom: "Marc Ferracci", fonction: "Ministre / figure macroniste", type: "officiel" },
        { nom: "Sylvain Maillard", fonction: "Député", type: "officiel" },
        { nom: "Agnès Buzyn", fonction: "Ancienne ministre de la Santé", type: "officiel" },
        { nom: "François de Rugy", fonction: "Ancien ministre", type: "officiel" },
        { nom: "Laurent Wauquiez", fonction: "Président du groupe Droite Républicaine à l'Assemblée", type: "officiel" },
        { nom: "Maud Bregeon", fonction: "Porte-parole du gouvernement", type: "officiel" },
        { nom: "Gérald Darmanin", fonction: "Ministre de la Justice", type: "presume" }
      ]
    },
    {
      slug: "gabriel-attal",
      nom: "Gabriel Attal",
      parti: "Renaissance (EPR)",
      bloc: "centre",
      fiche: true,
      sondage: { label: "8%", niveau: "moyen", tendance: "baisse" },
      historique: [],
      idees: ["« Droit au brut » / salaires", "Brevet obligatoire", "Quotas immigration", "Plan IA 20M salariés"],
      age: "37 ans (né le 16 mars 1989 à Clamart)",
      fonction_actuelle: "Président du parti Renaissance, chef de file des députés Renaissance à l'Assemblée, ancien Premier ministre (janvier-septembre 2024)",
      parcours: {
        formation: "École alsacienne (Paris), licence de droit à Assas (2010), master d'affaires publiques à Sciences Po Paris (2013)",
        mandats: [
          "Député de la 10e circonscription des Hauts-de-Seine (depuis 2017)",
          "Ministre de l'Éducation nationale et de la Jeunesse (2018-2024)",
          "Ministre des Comptes publics (2024)",
          "Premier ministre (janvier-septembre 2024)"
        ],
        faits_marquants: [
          "Plus jeune membre d'un gouvernement de la Ve République en 2018 (secrétaire d'État à 29 ans)",
          "Plus jeune Premier ministre de la Ve République, nommé en janvier 2024 à 34 ans",
          "Premier Premier ministre ouvertement homosexuel de France",
          "A porté le dossier du harcèlement scolaire et l'expérimentation de l'uniforme à l'Éducation nationale",
          "Officialise sa candidature 2027 le 22 mai 2026 et publie le livre « En homme libre » (avril 2026)"
        ]
      },
      programme: {
        economie: ["Priorité aux salaires (« droit au brut »)", "Plan de rigueur budgétaire (2/07/2026) : 0% de déficit visé en 2037, 120-150 Md€ d'économies sans hausse d'impôts", "Suppression de 100 000 postes de fonctionnaires"],
        social: ["Mutuelle publique à 1€/jour", "Suppression de l'âge légal de départ au profit d'un système fondé sur la durée de cotisation, avec une part de capitalisation", "Plan IA pour 20 millions de salariés"],
        ecologie: ["Objectif de 75% d'énergie produite en France (nucléaire + renouvelables)", "Lancement de 14 nouveaux réacteurs nucléaires"],
        securite: ["Quotas d'immigration votés par le Parlement selon les besoins économiques (« préférence au travail »)"],
        institutions: ["Projet de « Nouvelle République » : réduction du nombre de parlementaires et d'élus locaux, suppression d'un échelon territorial"],
        europe: ["Positionnement pro-européen affirmé comme axe central de campagne"]
      },
      positions: {
        retraites:   { stance: "nuance", detail: "Propose de supprimer la notion d'âge légal (64 ans) au profit d'un système basé sur la durée de cotisation, avec une part de capitalisation ajoutée." },
        immigration: { stance: "nuance", detail: "Quotas d'immigration économique votés par le Parlement selon les besoins définis par les partenaires sociaux." },
        europe:      { stance: "pour",   detail: "Se positionne comme pro-européen, dans la continuité de la ligne Renaissance." },
        nucleaire:   { stance: "pour",   detail: "« Le nucléaire est une fierté française » : lancement de 14 nouveaux réacteurs, combiné aux renouvelables." },
        dette:       { stance: "pour",   detail: "Plan de retour à l'équilibre (déficit 0% en 2037) via 120-150 Md€ d'économies, sans hausse d'impôts, et une règle d'or constitutionnelle." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Gabriel_Attal",
        "https://www.franceinfo.fr/politique/gabriel-attal/zero-deficit-en-2037-gabriel-attal-devoile-une-serie-de-mesures",
        "https://placement.meilleurtaux.com/retraite/actualites/2026-mai/plan-de-gabriel-attal-retraites-supprimer-age-legal.html"
      ],
      changements_ligne: [
        { date: "2006-2016", de: "Parti socialiste (adhérent à 17 ans, cabinet de Marisol Touraine 2012-2017)", vers: "En Marche! / Renaissance", contexte: "Identifié à l'aile réformatrice du PS avant de quitter le parti pour rejoindre En Marche! en 2016, à la veille de la présidentielle 2017." }
      ],
      promesses_bilan: [
        { promesse: "Expérimentation de l'uniforme scolaire annoncée comme ministre de l'Éducation", resultat: "partiellement", detail: "Testée uniquement dans des établissements volontaires (kit à ~200€), jamais généralisée à l'échelle nationale." },
        { promesse: "Décrets d'application de la loi immigration (dont délai de 15 jours pour l'édiction d'une OQTF)", resultat: "tenu", detail: "Décrets publiés juste avant la démission du gouvernement Attal fin août/début septembre 2024 ; l'exécution effective des OQTF reste distincte et faible." },
        { promesse: "Position sur la réduction du nombre de fonctionnaires", resultat: "retourne", detail: "Écart documenté par la presse entre sa ligne à Matignon et sa proposition de campagne 2026-2027 de supprimer 100 000 postes de fonctionnaires." },
        { promesse: "Conduire son gouvernement jusqu'à un terme normal", resultat: "non_tenu", detail: "Gouvernement mis fin par la dissolution de l'Assemblée annoncée par Emmanuel Macron le 9 juin 2024, décision pour laquelle Attal dit ne pas avoir été consulté." }
      ],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur Gabriel Attal pour 2025-2026. Deux controverses adjacentes documentées par la presse généraliste (hors des trois organes demandés) : des affirmations contestées sur les finances locales (audition, février 2025), et une polémique (avril 2026) sur une campagne de promotion de son livre utilisant des visuels générés par IA avec de fausses recommandations de célébrités.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Pas de hausse d'impôts annoncée ; plan de rigueur budgétaire global (120-150 Md€ d'économies) plutôt qu'un plan pouvoir d'achat dédié.", direction: "rigueur sans hausse d'impôts" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (suppression de l'âge légal, capitalisation).", direction: "" },
        securite: { synthese: "Développement d'une défense « forte, prête à intervenir » ; peu de détails trouvés sur la sécurité intérieure.", direction: "renforcement de la défense" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base (quotas votés par le Parlement).", direction: "" },
        sante: { synthese: "Mutuelle publique à 1€/jour ciblant retraités et ménages modestes.", direction: "mutuelle publique ciblée" },
        ecologie: { synthese: "Articulation entre dette économique et dette écologique évoquée, sans détail chiffré trouvé.", direction: "articulation dette économique/écologique" },
        education: { synthese: "Pilier de son projet (ex-ministre de l'Éducation) : pédagogie différenciée et moyens humains renforcés dans les établissements en difficulté.", direction: "priorité éducation" },
        europe: { synthese: "Non re-recherché — déjà documenté en base (positionnement pro-européen).", direction: "" },
        dette: { synthese: "Objectif « zéro déficit en 2037 », retour sous 3% avant 2032, ~120-150 Md€ d'économies via gel des prestations et suppression de 100 000 postes.", direction: "rigueur progressive" },
        institutions: { synthese: "Réduction du nombre de parlementaires, vote obligatoire dès 16 ans, réforme territoriale des collectivités locales.", direction: "réduction du nombre d'élus, vote des jeunes" }
      },
      soutiens: [
        { nom: "Conseil national de Renaissance", fonction: "Instance du parti (motion votée à 91% appelant Attal à se déclarer candidat)", type: "officiel" },
        { nom: "Prisca Thévenot", fonction: "Cadre du parti Renaissance", type: "officiel" },
        { nom: "Franck Riester", fonction: "Député, initiateur d'une tribune de ~500 élus locaux", type: "officiel" },
        { nom: "François Bayrou", fonction: "Président du MoDem, ex-Premier ministre — ne s'est positionné pour aucun des deux candidats du bloc central", type: "presume" },
        { nom: "Gérald Darmanin", fonction: "Ministre — position non tranchée entre Attal et Philippe", type: "presume" }
      ]
    },

    // ================= DROITE =================
    {
      slug: "bruno-retailleau",
      nom: "Bruno Retailleau",
      parti: "Les Républicains",
      bloc: "droite",
      fiche: true,
      sondage: { label: "8%", niveau: "moyen", tendance: "stable" },
      historique: [],
      idees: ["Fermeté sécuritaire", "1M logements en 5 ans", "Suppression ZAN", "Immigration restrictive"],
      age: "65 ans (né le 20 novembre 1960 à Cholet)",
      fonction_actuelle: "Sénateur de la Vendée et président des Républicains depuis mai 2025",
      parcours: {
        formation: "Institut d'études politiques de Paris (Sciences Po Paris)",
        mandats: [
          "Conseiller général de la Vendée (1988-2015)",
          "Sénateur de la Vendée (depuis 2004)",
          "Président du conseil général de la Vendée (2010-2015) puis du conseil régional des Pays de la Loire (2016-2017)",
          "Ministre d'État, ministre de l'Intérieur (septembre 2024 - octobre 2025)"
        ],
        faits_marquants: [
          "Longtemps proche de Philippe de Villiers avant de rejoindre l'UMP puis LR",
          "Nommé ministre de l'Intérieur en septembre 2024, ligne très ferme sur l'immigration et l'ordre public",
          "Élu président de LR en mai 2025",
          "Désigné candidat officiel de LR pour 2027 avec 73,8% des voix des adhérents (avril 2026)"
        ]
      },
      programme: {
        economie: ["Réorientation/réduction d'environ 100 Md€ de dépenses publiques"],
        social: ["Relever l'âge légal de départ à la retraite à 65 ans"],
        ecologie: ["Suppression du dispositif ZAN (zéro artificialisation nette)", "Soutien à la relance du nucléaire civil"],
        securite: ["Ligne de fermeté sécuritaire portée depuis son passage à l'Intérieur", "Révision constitutionnelle envisagée pour faciliter les expulsions"],
        institutions: ["Opposition ferme à la proportionnelle aux législatives", "Référendum proposé sur la préférence nationale pour certaines prestations sociales"],
        europe: ["Défense de l'autonomie de décision française en matière de dissuasion nucléaire, non partagée avec l'UE"]
      },
      positions: {
        retraites:   { stance: "contre",  detail: "Favorable à un relèvement de l'âge légal à 65 ans ; critique la suspension de la réforme des retraites votée fin 2025." },
        immigration: { stance: "contre",  detail: "Ligne restrictive : objectif de réduire l'immigration à moins de 50 000 personnes par an, révision constitutionnelle pour faciliter les expulsions." },
        europe:      { stance: "nuance",  detail: "Ne remet pas en cause l'appartenance à l'UE mais insiste sur la souveraineté nationale, notamment en matière de défense." },
        nucleaire:   { stance: "pour",    detail: "Défend une dissuasion nucléaire strictement française et soutient la relance du nucléaire civil." },
        dette:       { stance: "pour",    detail: "Prône une rigueur budgétaire avec une réduction annoncée d'environ 100 Md€ de dépenses publiques." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Bruno_Retailleau",
        "https://www.rts.ch/info/monde/2026/article/bruno-retailleau-candidat-lr-a-la-presidentielle-francaise-2027",
        "https://www.lejdd.fr/politique/bruno-retailleau-la-dissuasion-nucleaire-francaise-ne-se-partage-pas-167502"
      ],
      changements_ligne: [
        { date: "décembre 2009 - avril 2010", de: "Dauphin pressenti de Philippe de Villiers (Puy du Fou, Mouvement pour la France, souverainiste)", vers: "Non-inscrit puis rapprochement avec la majorité présidentielle", contexte: "Écarté de la direction du Puy du Fou fin 2009 ; démissionne du MPF en avril 2010, jugeant le parti trop radicalisé." },
        { date: "2012", de: "Non-inscrit / ex-MPF", vers: "UMP (devenue LR en 2015)", contexte: "Adhésion formelle à l'UMP, structure jugée plus en phase avec ses ambitions électorales et sa ligne régalienne." }
      ],
      promesses_bilan: [
        { promesse: "Augmenter fortement les expulsions d'étrangers en situation irrégulière et l'exécution des OQTF", resultat: "partiellement", detail: "Hausse de 15,9% des reconduites à la frontière et de 22,6% des départs forcés en 2025 ; mais seulement ~15% des OQTF prononcées ont abouti à une expulsion effective dans l'année." },
        { promesse: "Durcir l'accès à la naturalisation et aux régularisations exceptionnelles", resultat: "tenu", detail: "Circulaire du 2 mai 2025 : naturalisations en baisse de 8,4% au 1er semestre 2025 (-17% depuis octobre 2025), admissions exceptionnelles au séjour en baisse de 34%." },
        { promesse: "Faire adopter et appliquer une loi contre le narcotrafic", resultat: "partiellement", detail: "Loi entrée en vigueur le 13 juin 2025 : 47 commerces fermés, 29 expulsions de locataires ; mais les indicateurs SSMSI 2025 montrent une hausse persistante du trafic (+8%) et de l'usage (+6%)." },
        { promesse: "Faire reculer la délinquance globale", resultat: "partiellement", detail: "SSMSI 2025 : baisse des cambriolages et vols de véhicules, mais hausse des violences physiques/sexuelles et des escroqueries (+8%)." },
        { promesse: "Justifier le lien entre immigration irrégulière et délinquance pour fonder sa politique sécuritaire", resultat: "retourne", detail: "Contesté publiquement dans « Complément d'enquête » (23 janvier 2025) : le CEPII avance l'absence d'impact statistique de l'immigration sur la délinquance globale ; Retailleau a répliqué avec des chiffres eux-mêmes débattus." }
      ],
      fact_checks: [
        { affirmation: "Recherche ciblée sur AFP Factuel, Les Décodeurs et CheckNews : aucun article de vérification dédié et récent (2025-2026) sur une déclaration chiffrée de Bruno Retailleau n'a été identifié.", verdict: "non_trouve", source: "", url: "", date: "" }
      ],
      fact_checks_note: "Point notable hors périmètre strict des 3 médias demandés : sur France 2 (« Complément d'enquête », 23 janvier 2025), Retailleau a affirmé que 38% des mis en cause pour cambriolage et 40% pour vol de véhicule sont des étrangers (qui représentent ~7% de la population), chiffres débattus par des chercheurs (CEPII) contestant tout lien statistique immigration-délinquance.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Priorité à la baisse des charges et impôts de production plutôt qu'à la redistribution directe.", direction: "baisse des impôts de production" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (âge légal à 65 ans).", direction: "" },
        securite: { synthese: "Renforcement des moyens policiers, justice plus sévère, loi anti-narcotrafic.", direction: "fermeté" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base (moins de 50 000 personnes/an).", direction: "" },
        sante: { synthese: "Réorganisation de l'offre de soins et lutte contre les déserts médicaux, peu de mesures budgétaires chiffrées nouvelles identifiées.", direction: "réforme organisationnelle" },
        ecologie: { synthese: "Favorable au nucléaire, critique de ce qu'il qualifie d'écologie punitive ou normative.", direction: "pro-nucléaire" },
        education: { synthese: "Insiste sur l'autorité, le redressement du niveau scolaire et la discipline.", direction: "autorité" },
        europe: { synthese: "Ligne souverainiste modérée : critique du fédéralisme européen tout en restant dans le cadre de l'UE.", direction: "souverainiste modéré" },
        dette: { synthese: "Non re-recherché — déjà documenté en base (~100 Md€ de réduction).", direction: "" },
        institutions: { synthese: "Position institutionnelle conservatrice, attaché à la Ve République, pas de grande réforme constitutionnelle nouvelle identifiée.", direction: "conservateur institutionnel" }
      },
      soutiens: [
        { nom: "François-Xavier Bellamy", fonction: "Numéro deux des Républicains, eurodéputé", type: "officiel" },
        { nom: "Jean-Jacques Panunzi", fonction: "Sénateur LR de Corse-du-Sud", type: "officiel" },
        { nom: "François-Xavier Ceccoli", fonction: "Député LR de Haute-Corse", type: "officiel" }
      ],
      soutiens_note: "Contrairement à une idée reçue, Laurent Wauquiez n'est PAS un soutien : il s'est opposé à la tenue du vote interne LR, a publiquement invité Retailleau à « savoir se retirer » si sa candidature ne décolle pas, et penche plutôt vers Édouard Philippe. Xavier Bertrand et Michel Barnier ne sont pas non plus des soutiens confirmés."
    },
    {
      slug: "david-lisnard", nom: "David Lisnard", parti: "Nouvelle Énergie", bloc: "droite", fiche: false,
      sondage: { label: "< 1%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },

    // ================= EXTRÊME DROITE =================
    {
      slug: "marine-le-pen",
      nom: "Marine Le Pen",
      parti: "Rassemblement National",
      bloc: "exdroite",
      fiche: true,
      note: "⚖️",
      noteDetail: "Condamnée en appel le 07/07/2026. Pourvoi en cassation annoncé (suspensif). Campagne en « binôme » avec J. Bardella.",
      sondage: { label: "33–36%", niveau: "fort", tendance: "stable" },
      historique: [
        { annee: 2012, resultat: "17.9%" },
        { annee: 2017, resultat: "21.3%" },
        { annee: 2022, resultat: "23.2%" }
      ],
      idees: ["Priorité nationale (référendum)", "Pouvoir d'achat / TVA réduite", "Retraite 60–62 ans"],
      age: "57 ans (née le 5 août 1968)",
      fonction_actuelle: "Députée du Pas-de-Calais et présidente du groupe Rassemblement National à l'Assemblée nationale depuis juin 2022",
      parcours: {
        formation: "Maîtrise de droit à Panthéon-Assas (1990), DEA de droit pénal (1991), avocate inscrite au barreau de Paris (1992-1998)",
        mandats: [
          "Conseillère régionale du Nord-Pas-de-Calais à partir de 1998",
          "Présidente du Front National puis Rassemblement National (2011-2021)",
          "Députée du Pas-de-Calais depuis 2017 (réélue 2022, 2024)",
          "Présidente du groupe RN à l'Assemblée nationale (depuis 2022)"
        ],
        faits_marquants: [
          "Prend la présidence du FN en 2011 en engageant une stratégie de « dédiabolisation »",
          "Trois candidatures à la présidentielle : 2012 (17,9%), 2017 (21,3%, finaliste), 2022 (23,2%, finaliste)",
          "Cède la présidence du parti à Jordan Bardella en 2021 pour se concentrer sur 2022",
          "Condamnée en appel le 7 juillet 2026 dans l'affaire des assistants parlementaires du FN au Parlement européen ; pourvoi en cassation suspensif déposé, lui permettant de rester candidate"
        ]
      },
      programme: {
        economie: ["TVA ramenée de 20% à 5,5% sur carburants, électricité, gaz et fioul domestique", "Priorité nationale à l'emploi et au logement social"],
        social: ["Minimum vieillesse revalorisé à 1 000 €/mois, réindexation des retraites sur l'inflation", "Certaines prestations sociales réservées sous condition de 5 ans de travail en France"],
        ecologie: ["Relance du nucléaire : construction de 6 EPR, hydroélectricité, hydrogène", "Moratoire puis démantèlement progressif de l'éolien et du solaire"],
        securite: ["Expulsion systématique des étrangers clandestins ou délinquants", "Fin de l'immigration dite « de peuplement » et du regroupement familial"],
        institutions: ["« Priorité nationale » inscrite dans la Constitution via référendum", "Révision des traités européens"],
        europe: ["Maintien dans l'UE et l'euro (le RN a abandonné le Frexit officiellement depuis 2019), mais réforme profonde de la gouvernance européenne"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "Refuse tout report de l'âge légal, veut le maintenir/ramener à 60-62 ans ; des divergences internes existent avec J. Bardella sur les modalités précises." },
        immigration: { stance: "contre", detail: "Fin de l'immigration de peuplement, suppression du droit du sol, traitement de l'asile à l'étranger, expulsions systématiques des étrangers délinquants." },
        europe:      { stance: "nuance", detail: "N'est plus favorable à une sortie de l'UE ni de l'euro (Frexit abandonné depuis 2019) ; défend une réforme profonde des institutions européennes." },
        nucleaire:   { stance: "pour",   detail: "Relance forte du nucléaire (6 EPR), hostile à l'éolien et au solaire qu'elle veut voir démantelés." },
        dette:       { stance: "nuance", detail: "Pas de position chiffrée précise identifiée ; le programme met l'accent sur la réorientation des dépenses plutôt qu'un objectif explicite de désendettement." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Marine_Le_Pen",
        "https://www.touteleurope.eu/vie-politique-des-etats-membres/proces-des-assistants-du-rn-marine-le-pen-condamnee-en-appel-mais-eligible-a-l-election-presidentielle-2027/",
        "https://www.publicsenat.fr/actualites/politique/au-rn-la-reforme-des-retraites-divise-jordan-bardella-et-marine-le-pen"
      ],
      changements_ligne: [
        { date: "15 avril 2019", de: "Sortie de l'Union européenne (« Frexit ») et sortie de l'euro, ligne portée en 2017", vers: "Abandon officiel de la sortie de l'euro et de l'UE au profit d'une réforme « de l'intérieur » et d'une « alliance des nations » européenne", contexte: "Annoncé à Strasbourg lors de la présentation des 25 propositions RN pour les européennes, avec Jordan Bardella. Repositionnement après l'échec de la proposition de retour au franc en 2017, jugée anxiogène pour épargnants et retraités." }
      ],
      promesses_bilan: [],
      fact_checks: [],
      fact_checks_note: "Recherche approfondie (une quinzaine de requêtes ciblées AFP Factuel, Les Décodeurs, CheckNews) : aucun fact-check daté 2025-2026 et clairement attribué à ces trois médias n'a pu être identifié concernant Marine Le Pen.",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "« Prime de Pouvoir d'Achat » de 80€/mois pour bas revenus et petites retraites (jusqu'à 1500€/mois), financée par une contribution de 3% sur les importations ; incitation des entreprises à augmenter les salaires de 10% (jusqu'à 3 SMIC).", direction: "primes ciblées et protectionnisme" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (maintien à 60-62 ans).", direction: "" },
        securite: { synthese: "Loi de programmation sécurité-justice (+7,7 Md€ sur 5 ans), +7000 policiers et gendarmes, présomption de légitime défense pour les forces de l'ordre.", direction: "renforcement des moyens et de l'autorité" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base (fin de l'immigration de peuplement).", direction: "" },
        sante: { synthese: "20 Md€ pour le système de santé, suppression des ARS au profit des préfets, moratoire sur la fermeture de lits, +10% de salaires pour le personnel soignant.", direction: "renationalisation de la gouvernance hospitalière" },
        ecologie: { synthese: "Priorité au nucléaire (objectif 75% du mix énergétique), moratoire sur l'éolien et le solaire, développement hydroélectricité/géothermie.", direction: "priorité au nucléaire" },
        education: { synthese: "Uniforme du primaire au collège, journée d'école allongée d'une heure, vidéosurveillance généralisée, retour des filières S/L/ES au bac.", direction: "école plus disciplinée, retour aux filières traditionnelles" },
        europe: { synthese: "Non re-recherché — déjà documenté en base (maintien dans l'UE et l'euro, réforme de l'intérieur).", direction: "" },
        dette: { synthese: "Objectif de ramener le déficit public sous 3% du PIB et de stabiliser la dette publique durant le quinquennat.", direction: "stabilisation de la dette" },
        institutions: { synthese: "Abaissement du seuil du RIC à 500 000 signatures, mandat présidentiel unique de 7 ans non renouvelable, référendum obligatoire pour les traités touchant à la souveraineté.", direction: "renforcement du référendum et de la démocratie directe" }
      },
      soutiens: [
        { nom: "Jordan Bardella", fonction: "Président du Rassemblement National", type: "officiel" },
        { nom: "Éric Ciotti", fonction: "Président de l'Union des droites pour la République (UDR)", type: "officiel" },
        { nom: "Marion Maréchal", fonction: "Députée européenne, présidente d'Identité-Libertés", type: "presume" }
      ],
      soutiens_note: "La divergence Bardella/Le Pen sur les retraites (mai-juillet 2026) est le principal point de tension interne identifié."
    },
    {
      slug: "nicolas-dupont-aignan",
      nom: "Nicolas Dupont-Aignan",
      parti: "Debout la France",
      bloc: "exdroite",
      fiche: true,
      sondage: { label: "~2%", niveau: "moyen", tendance: "stable" },
      historique: [
        { annee: 2012, resultat: "1.8%" },
        { annee: 2017, resultat: "4.7%" },
        { annee: 2022, resultat: "2.1%" }
      ],
      idees: ["Souveraineté / Frexit progressif", "RIC", "Réindustrialisation"],
      age: "65 ans (né le 7 mars 1961)",
      fonction_actuelle: "Maire de Yerres (Essonne, réélu en 2026) et président du parti Debout la France",
      parcours: {
        formation: "Sciences Po Paris (1982) puis ENA, promotion Liberté-Égalité-Fraternité (1987-1989)",
        mandats: [
          "Maire de Yerres (1995-2017 puis depuis 2026)",
          "Député de l'Essonne (1997-2024)",
          "Président du parti Debout la France (depuis 2008)"
        ],
        faits_marquants: [
          "Haut fonctionnaire dans les cabinets de François Bayrou puis Michel Barnier (1993-1995)",
          "Élu maire de Yerres en 1995 à 34 ans ; désendettement de la commune (de 45 à 26 M€ en 20 ans)",
          "Quitte l'UMP en 2007 en désaccord avec la candidature de Nicolas Sarkozy",
          "Fonde et préside Debout la France depuis 2008",
          "Quatrième candidature à la présidentielle après 2012, 2017 et 2022"
        ]
      },
      programme: {
        economie: ["Sortie de l'euro et retour au franc avec dévaluation contrôlée", "Taxes douanières de 10 à 15% sur les produits importés", "75% des marchés publics réservés aux produits fabriqués en France"],
        social: ["Retour de la retraite à 62 ans, abrogation de la réforme de 2023", "Pension minimale garantie de 1 200 €/mois"],
        ecologie: ["Écologie « raisonnée » centrée sur le nucléaire plutôt que sur les renouvelables intermittents", "10 nouveaux EPR d'ici 2040, maintien du nucléaire à au moins 70% de la production électrique"],
        securite: ["Rétablissement des frontières nationales", "Primauté du droit national sur le droit européen en matière d'immigration"],
        institutions: ["Référendum d'initiative citoyenne (RIC)"],
        europe: ["Sortie de l'Union européenne (Frexit)", "Renégociation ou sortie de la CEDH et de la Charte des droits fondamentaux de l'UE sur les questions migratoires"]
      },
      positions: {
        retraites:   { stance: "pour",   detail: "Abrogation de la réforme des retraites, retour à 62 ans, pension minimale de 1 200 €/mois." },
        immigration: { stance: "contre", detail: "Rétablissement des frontières nationales et primauté du droit français sur le droit européen en matière d'expulsions." },
        europe:      { stance: "contre", detail: "Défend une sortie de l'UE (Frexit), position durcie ces derniers mois par rapport à son ancienne ligne d'une « Europe des nations »." },
        nucleaire:   { stance: "pour",   detail: "Relance massive : 10 nouveaux EPR d'ici 2040, nucléaire maintenu à au moins 70% de la production électrique." },
        dette:       { stance: "nuance", detail: "Dénonce l'aggravation de la dette depuis 2017 (+1000 Md€) ; a évoqué par le passé une monétisation partielle de la dette." }
      },
      sources: [
        "https://en.wikipedia.org/wiki/Nicolas_Dupont-Aignan",
        "https://www.debout-la-france.fr/actualite/presidentielle-2027-jusqua-45-dintentions-de-vote-pour-nicolas-dupont-aignan/",
        "https://www.parlons-politique.fr/elections/sortie-de-lue-ce-que-promet-nicolas-dupont-aignan"
      ],
      changements_ligne: [
        { date: "13 janvier 2007", de: "Membre de l'UMP", vers: "Départ de l'UMP et candidature indépendante", contexte: "Quitte l'UMP la veille de l'investiture de Nicolas Sarkozy comme candidat du parti, lui reprochant d'étouffer les débats internes." },
        { date: "23 novembre 2008", de: "Sans parti après la rupture avec l'UMP", vers: "Fondation de Debout la France", contexte: "Crée ce mouvement avec l'ambition d'un troisième parti gaulliste et souverainiste." },
        { date: "2016-2026", de: "« Europe des nations » réformée de l'intérieur, prudent sur le Frexit", vers: "Frexit explicite « le plus vite possible » (3 mai 2026, plan en 3 étapes)", contexte: "Trajectoire graduelle : en 2016 pas favorable à un Frexit immédiat ; en 2017 dit avoir « évolué » sur l'euro sans vouloir en sortir purement ; 2023-2024 promeut le concept de « Bruxit » (sortie collective) ; décembre 2025 qualifie l'UE de « liberticide » ; le 3 mai 2026 (Grand Rendez-vous CNews/Europe1/Les Échos) appelle au Frexit avec un plan en 3 étapes (arrêt de la contribution nette, rétablissement des frontières, primauté du droit français)." }
      ],
      promesses_bilan: [],
      fact_checks: [],
      fact_checks_note: "Aucun fact-check d'AFP Factuel, Les Décodeurs ou CheckNews trouvé sur Nicolas Dupont-Aignan pour 2025-2026. Élément comparable trouvé hors périmètre : franceinfo (« Le Vrai du Faux », 9 mai 2025) a nuancé son affirmation sur le coût net de la contribution française à l'UE (ordre de grandeur correct sur les montants bruts, mais présentation jugée trompeuse — le coût net représente en réalité ~1% du PIB français).",
      positions_10_sujets: {
        pouvoir_achat: { synthese: "Attribue la hausse des prix à l'appartenance à l'UE ; propose un protectionnisme « intelligent » (droits de douane ciblés, 50 à 75% de la commande publique réservée à la production française).", direction: "protectionnisme et sortie UE" },
        retraites: { synthese: "Non re-recherché — déjà documenté en base (retour à 62 ans).", direction: "" },
        securite: { synthese: "Appelle l'État à « reprendre en main » l'autorité, notamment la protection des enfants ; ligne de fermeté et de restauration de l'autorité publique.", direction: "durcissement / fermeté" },
        immigration: { synthese: "Non re-recherché — déjà documenté en base (rétablissement des frontières).", direction: "" },
        sante: { synthese: "10 Md€/an pour l'hôpital public, titularisation des contractuels, suppression des ARS, un établissement de santé par département, doublement des effectifs de médecine scolaire.", direction: "renforcement du service public hospitalier" },
        ecologie: { synthese: "Écologie « raisonnée » opposée aux « excès punitifs » des Verts ; relocalisation, économie circulaire ; relance du nucléaire avec 10 nouveaux EPR d'ici 2040.", direction: "écologie pragmatique pro-nucléaire" },
        education: { synthese: "Hausse de 20% du salaire des enseignants, recentrage sur les savoirs fondamentaux, autorité et mérite.", direction: "revalorisation salariale, retour aux fondamentaux" },
        europe: { synthese: "Durcissement récent : appel explicite au Frexit « le plus vite possible » depuis mai 2026 (voir changements_ligne).", direction: "sortie de l'UE (Frexit)" },
        dette: { synthese: "Non re-recherché — déjà documenté en base.", direction: "" },
        institutions: { synthese: "Refondation démocratique dans l'esprit de la Ve République originelle, suppression de l'article 49.3, référendum d'initiative citoyenne à partir de 500 000 signatures.", direction: "renforcement de la démocratie directe" }
      },
      soutiens: [
        { nom: "Cécile Bayle de Jessé", fonction: "Vice-présidente de Debout la France", type: "officiel" },
        { nom: "Frédéric Guyard", fonction: "Secrétaire général de Debout la France", type: "officiel" },
        { nom: "Alexis Villepelet", fonction: "Porte-parole de Debout la France", type: "officiel" },
        { nom: "François Guillaume", fonction: "Membre d'honneur de Debout la France, ancien ministre", type: "officiel" }
      ],
      soutiens_note: "A publiquement appelé Florian Philippot et François Asselineau à le rejoindre pour unifier le camp souverainiste, mais aucun ralliement officiel n'est confirmé à ce jour."
    },
    {
      slug: "florian-philippot", nom: "Florian Philippot", parti: "Les Patriotes", bloc: "exdroite", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },

    // ================= INCLASSABLES =================
    {
      slug: "francois-asselineau", nom: "François Asselineau", parti: "UPR", bloc: "inclassable", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" },
      historique: [{ annee: 2017, resultat: "0.9%" }], idees: []
    },
    {
      slug: "clara-egger", nom: "Clara Egger", parti: "Solution Démocratique", bloc: "inclassable", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    },
    {
      slug: "antoine-mikolajczak", nom: "Antoine Mikolajczak", parti: "Équinoxe", bloc: "inclassable", fiche: false,
      sondage: { label: "< 0.5%", niveau: "faible", tendance: "stable" }, historique: [], idees: []
    }
  ]
};
