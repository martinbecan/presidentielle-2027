(function () {
  var DATA = window.SITE_DATA;
  var slug = window.CANDIDATE_SLUG;
  if (!DATA || !slug) return;

  var c = DATA.candidats.find(function (x) { return x.slug === slug; });
  var root = document.getElementById('fiche-root');
  if (!c || !root) {
    if (root) root.innerHTML = '<p class="no-data">Candidat introuvable dans data/candidats.js.</p>';
    return;
  }

  document.title = c.nom + ' — Présidentielle 2027';

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }
  function initials(nom) {
    return nom.split(' ').filter(function (w) { return /^[A-ZÀ-Ý]/.test(w); }).map(function (w) { return w[0]; }).slice(0, 2).join('');
  }
  function stanceLabel(s) {
    if (s === 'pour') return 'Plutôt favorable';
    if (s === 'contre') return 'Plutôt opposé(e)';
    return 'Position nuancée';
  }
  function tendanceLabel(t) {
    if (t === 'hausse') return { arrow: '↗', cls: 'tendance-hausse', label: 'En hausse' };
    if (t === 'baisse') return { arrow: '↘', cls: 'tendance-baisse', label: 'En baisse' };
    return { arrow: '→', cls: 'tendance-stable', label: 'Stable' };
  }

  var bloc = blocInfo(c.bloc);

  var html = '';

  // Header
  html += '<div class="fiche-header">';
  html += '<div class="avatar" style="background:' + bloc.couleur + '33; color:' + bloc.couleur + ';">' + initials(c.nom) + '</div>';
  html += '<div class="fiche-identite">';
  html += '<h1>' + c.nom + (c.note ? ' <span class="note-icon" title="' + (c.noteDetail || '') + '">' + c.note + '</span>' : '') + '</h1>';
  html += '<div class="fiche-meta">';
  html += '<strong>' + c.parti + '</strong>' + (c.age ? ' · ' + c.age : '') + '<br>';
  if (c.fonction_actuelle) html += c.fonction_actuelle;
  html += '</div>';
  html += '<span class="bloc-pill" style="background:' + bloc.couleur + '33; color:' + bloc.couleur + '; border:1px solid ' + bloc.couleur + '55;">' + bloc.label + '</span>';
  html += '</div>';
  html += '<div class="sondage-box"><div><div class="chiffre">' + c.sondage.label + '</div><div class="libelle">Intentions de vote¹</div></div></div>';
  html += '</div>';

  if (c.noteDetail) {
    html += '<div class="alert-box"><strong>' + c.note + '</strong> ' + c.noteDetail + '</div>';
  }

  // Parcours
  if (c.parcours) {
    html += '<section class="fiche-section"><h2>Parcours express</h2>';
    if (c.parcours.formation) html += '<p class="fiche-meta" style="margin-bottom:0.8rem;"><strong>Formation :</strong> ' + c.parcours.formation + '</p>';
    if (c.parcours.mandats && c.parcours.mandats.length) {
      html += '<ul class="parcours-list">' + c.parcours.mandats.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul>';
    }
    if (c.parcours.faits_marquants && c.parcours.faits_marquants.length) {
      html += '<h3 style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:#f59e0b; margin:0.9rem 0 0.5rem;">Faits marquants</h3>';
      html += '<ul class="faits-list">' + c.parcours.faits_marquants.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>';
    }
    html += '</section>';
  }

  // Candidatures passées
  html += '<section class="fiche-section"><h2>Candidatures passées</h2>';
  if (c.historique && c.historique.length) {
    html += '<table class="historique-table"><tbody>' + c.historique.map(function (h) {
      return '<tr><td>' + h.annee + '</td><td>' + h.resultat + '</td></tr>';
    }).join('') + '</tbody></table>';
  } else {
    html += '<p class="no-data">Première candidature à l\'élection présidentielle.</p>';
  }
  html += '</section>';

  // Programme
  if (c.programme) {
    var themes = [
      ['economie', 'Économie'], ['social', 'Social'], ['ecologie', 'Écologie'],
      ['securite', 'Sécurité'], ['institutions', 'Institutions'], ['europe', 'Europe / International']
    ];
    html += '<section class="fiche-section"><h2>Programme / Idées phares</h2><div class="programme-grid">';
    themes.forEach(function (t) {
      var items = c.programme[t[0]];
      if (!items || !items.length) return;
      html += '<div class="programme-theme"><h3>' + t[1] + '</h3><ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
    });
    html += '</div></section>';
  }

  // Positions
  if (c.positions) {
    var axes = [
      ['retraites', 'Retraites'], ['immigration', 'Immigration'], ['europe', 'Europe / UE'],
      ['nucleaire', 'Nucléaire'], ['dette', 'Dette publique']
    ];
    html += '<section class="fiche-section"><h2>Position sur les grands clivages</h2><div class="positions-grid">';
    axes.forEach(function (a) {
      var p = c.positions[a[0]];
      if (!p) return;
      html += '<div class="position-card"><div class="label">' + a[1] + '</div>';
      html += '<div class="stance stance-' + p.stance + '">' + stanceLabel(p.stance) + '</div>';
      html += '<div class="detail">' + p.detail + '</div></div>';
    });
    html += '</div></section>';
  }

  // Dynamique sondagière
  var t = tendanceLabel(c.sondage.tendance);
  html += '<section class="fiche-section"><h2>Dynamique sondagière</h2>';
  html += '<div class="tendance-box"><span class="tendance-arrow ' + t.cls + '">' + t.arrow + '</span>';
  html += '<span>' + c.sondage.label + ' — <strong class="' + t.cls + '">' + t.label + '</strong></span></div>';
  html += '</section>';

  // Sources
  if (c.sources && c.sources.length) {
    html += '<section class="fiche-section"><h2>Sources</h2><ul class="parcours-list">';
    html += c.sources.map(function (s) { return '<li><a href="' + s + '" target="_blank" rel="noopener noreferrer">' + s + '</a></li>'; }).join('');
    html += '</ul></section>';
  }

  root.innerHTML = html;
})();
