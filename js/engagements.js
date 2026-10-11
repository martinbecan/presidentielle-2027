(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('engagements-root');
  var filtresEl = document.getElementById('engagements-filtres');
  if (!DATA || !root) return;

  // Mêmes libellés que les fiches candidats : la page agrège, elle ne redéfinit rien.
  var SUJETS = [
    ['pouvoir_achat', 'Pouvoir d\'achat / salaires'], ['retraites', 'Retraites'], ['securite', 'Sécurité / justice'],
    ['immigration', 'Immigration'], ['sante', 'Santé / hôpital'], ['ecologie', 'Écologie / énergie'],
    ['education', 'Éducation'], ['europe', 'Europe / international'], ['dette', 'Dette / fiscalité'],
    ['institutions', 'Institutions / démocratie'], ['laicite', 'Laïcité / religion dans l\'espace public'],
    ['agriculture', 'Agriculture / ruralité'], ['numerique', 'Numérique / intelligence artificielle'],
    ['logement', 'Logement'], ['defense', 'Défense / politique militaire'], ['autre', 'Autres engagements marquants']
  ];
  var LIBELLE = {};
  SUJETS.forEach(function (s) { LIBELLE[s[0]] = s[1]; });

  var STATUTS = {
    pris: { label: 'Engagement pris', cls: 'eng-pris' },
    reaffirme: { label: 'Réaffirmé', cls: 'eng-pris' },
    nuance: { label: 'Nuancé depuis', cls: 'eng-nuance' },
    abandonne: { label: 'Abandonné', cls: 'eng-abandonne' },
    tenu: { label: 'Tenu', cls: 'eng-tenu' },
    partiel: { label: 'Partiellement tenu', cls: 'eng-nuance' },
    non_tenu: { label: 'Non tenu', cls: 'eng-abandonne' }
  };
  var NATURES = { nuance: 'Nuance', revirement: 'Revirement', precision: 'Précision' };

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }

  // Aplatissement : un enregistrement par engagement, porteur de son candidat.
  var tous = [];
  DATA.candidats.forEach(function (c) {
    if (!c.engagements) return;
    c.engagements.forEach(function (e) { tous.push({ c: c, e: e }); });
  });

  if (!tous.length) {
    root.innerHTML = '<p class="no-data">Aucun engagement daté n\'a encore été relevé.</p>';
    return;
  }

  var themesPresents = SUJETS.filter(function (s) {
    return tous.some(function (x) { return x.e.theme === s[0]; });
  });

  var filtreActif = '';

  function renderFiltres() {
    if (!filtresEl) return;
    var html = '<button type="button" class="engagement-filtre' + (filtreActif ? '' : ' actif') + '" data-theme="">Tous les thèmes</button>';
    themesPresents.forEach(function (s) {
      var n = tous.filter(function (x) { return x.e.theme === s[0]; }).length;
      html += '<button type="button" class="engagement-filtre' + (filtreActif === s[0] ? ' actif' : '') +
        '" data-theme="' + s[0] + '">' + s[1] + ' <span class="engagement-filtre-nb">' + n + '</span></button>';
    });
    filtresEl.innerHTML = html;
  }

  function renderEngagement(x) {
    var c = x.c, e = x.e;
    var st = STATUTS[e.statut] || STATUTS.pris;
    var couleur = blocInfo(c.bloc).couleur;

    var html = '<div class="engagement engagement-agrege" style="border-left-color:' + couleur + ';">';
    html += '<div class="engagement-entete">';
    html += '<a class="engagement-candidat" href="candidats/' + c.slug + '.html" style="color:' + couleur + ';">' + c.nom + '</a>';
    html += '<span class="engagement-date">' + e.label + '</span>';
    html += '<span class="engagement-statut ' + st.cls + '">' + st.label + '</span>';
    html += '</div>';
    html += '<p class="engagement-resume">' + e.resume + '</p>';
    if (e.chiffrage) html += '<p class="engagement-chiffrage">Chiffrage annoncé : ' + e.chiffrage + '</p>';

    if (e.divergence) {
      // L'engagement antérieur est retrouvé chez le même candidat, par sa date.
      var anterieur = (c.engagements || []).filter(function (a) {
        return a.date === e.divergence.parRapportA && a.theme === e.theme;
      })[0];
      html += '<div class="engagement-divergence">';
      html += '<span class="engagement-divergence-tag">↪ ' + (NATURES[e.divergence.nature] || 'Écart') + '</span> ';
      html += e.divergence.constat;
      if (anterieur) {
        html += '<div class="engagement-divergence-anterieur"><strong>' + anterieur.label + '</strong> — ' + anterieur.resume +
          ' <a href="' + anterieur.source.url + '" target="_blank" rel="noopener noreferrer" class="source-verify-link">🔍 ' + anterieur.source.nom + '</a></div>';
      }
      html += '</div>';
    }

    html += '<p class="engagement-source">' + e.contexte + ' — ' +
      '<a href="' + e.source.url + '" target="_blank" rel="noopener noreferrer" class="source-verify-link">🔍 ' + e.source.nom + '</a></p>';
    html += '</div>';
    return html;
  }

  function render() {
    var html = '';
    var themes = filtreActif ? themesPresents.filter(function (s) { return s[0] === filtreActif; }) : themesPresents;

    themes.forEach(function (s) {
      var lot = tous.filter(function (x) { return x.e.theme === s[0]; });
      if (!lot.length) return;
      // Du plus récent au plus ancien : l'actualité d'abord, l'historique dessous.
      lot.sort(function (a, b) { return a.e.date < b.e.date ? 1 : a.e.date > b.e.date ? -1 : 0; });

      var nbCandidats = lot.filter(function (x, i, arr) {
        return arr.findIndex(function (y) { return y.c.slug === x.c.slug; }) === i;
      }).length;

      html += '<section class="engagements-section"><h2>' + s[1] + '</h2>';
      html += '<p class="engagements-compte">' + lot.length + (lot.length > 1 ? ' engagements' : ' engagement') +
        ', ' + nbCandidats + (nbCandidats > 1 ? ' candidats' : ' candidat') + '</p>';
      lot.forEach(function (x) { html += renderEngagement(x); });
      html += '</section>';
    });

    var divergences = tous.filter(function (x) { return x.e.divergence; }).length;
    html += '<p class="engagements-bilan">' + tous.length + ' engagements relevés, ' +
      (divergences ? divergences + ' écart' + (divergences > 1 ? 's' : '') + ' signalé' + (divergences > 1 ? 's' : '') + '.'
        : 'aucun écart signalé à ce jour — avec un seul engagement par thème pour la plupart des candidats, il n\'y a rien à confronter.') +
      '</p>';

    root.innerHTML = html;
  }

  if (filtresEl) {
    filtresEl.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.engagement-filtre');
      if (!btn) return;
      filtreActif = btn.getAttribute('data-theme');
      renderFiltres();
      render();
    });
  }

  renderFiltres();
  render();
})();
