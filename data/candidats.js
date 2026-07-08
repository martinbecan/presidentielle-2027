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
      ]
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
      ]
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
      ]
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
      ]
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
