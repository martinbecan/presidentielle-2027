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
  function renderSources(sources) {
    if (!sources || !sources.length) {
      return '<span class="source-badge source-unconfirmed">Source à confirmer</span>';
    }
    var links = sources.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="source-verify-link">🔍 Vérifier cette source' + (sources.length > 1 ? ' (' + s.nom + ')' : '') + '</a>';
    }).join(' · ');
    if (sources.length >= 2) links += ' <span class="source-crossref">' + sources.length + ' sources indépendantes</span>';
    return links;
  }
  function tendanceLabel(t) {
    if (t === 'hausse') return { arrow: '↗', cls: 'tendance-hausse', label: 'En hausse' };
    if (t === 'baisse') return { arrow: '↘', cls: 'tendance-baisse', label: 'En baisse' };
    return { arrow: '→', cls: 'tendance-stable', label: 'Stable' };
  }
  function bilanIcon(r) {
    if (r === 'tenu') return { icon: '✅', label: 'Tenu' };
    if (r === 'partiellement') return { icon: '⚠️', label: 'Partiellement tenu' };
    if (r === 'non_tenu') return { icon: '❌', label: 'Non tenu' };
    if (r === 'retourne') return { icon: '🔄', label: 'Retourné' };
    return { icon: '❔', label: r || 'Non précisé' };
  }
  function verdictClass(v) {
    v = (v || '').toLowerCase();
    if (v.indexOf('faux') !== -1) return 'stance-contre';
    if (v.indexOf('trompeur') !== -1) return 'stance-contre';
    if (v.indexOf('partiellement') !== -1) return 'stance-nuance';
    if (v.indexOf('vrai') !== -1) return 'stance-pour';
    return 'stance-nuance';
  }
  function verdictLabel(v) {
    return (v || '').replace(/_/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); });
  }
  // Sujets 2027 dont 4 recoupent les "grands clivages" déjà en base (positions{}) — on retombe
  // sur cette donnée quand la recherche dédiée aux 10 sujets n'a rien apporté de neuf.
  var SUJET_FALLBACK_KEYS = ['retraites', 'immigration', 'europe', 'dette'];
  function resolveSujet(candidat, key) {
    var s10 = candidat.positions_10_sujets && candidat.positions_10_sujets[key];
    var dejaDoc = s10 && (!s10.synthese || /^Non re-recherch/i.test(s10.synthese) || !s10.direction);
    if (dejaDoc && SUJET_FALLBACK_KEYS.indexOf(key) !== -1 && candidat.positions && candidat.positions[key]) {
      return { synthese: candidat.positions[key].detail, direction: stanceLabel(candidat.positions[key].stance), stanceCls: 'stance-' + candidat.positions[key].stance };
    }
    if (s10 && s10.synthese && !/^Non re-recherch/i.test(s10.synthese)) {
      return { synthese: s10.synthese, direction: s10.direction, stanceCls: null };
    }
    return null;
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

  html += '<a class="back-link" href="../comparateur.html?c=' + c.slug + '">🔀 Comparer avec un autre candidat</a>';

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
    if (c.changements_ligne && c.changements_ligne.length) {
      html += '<h3 style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:#f59e0b; margin:0.9rem 0 0.5rem;">Changements de ligne</h3>';
      html += '<ul class="changement-list">' + c.changements_ligne.map(function (ch) {
        return '<li><span class="changement-tag">↪️ Changement</span> <span class="changement-date">' + ch.date + '</span>' +
          '<div class="changement-transition"><strong>' + ch.de + '</strong> → <strong>' + ch.vers + '</strong></div>' +
          '<div class="changement-contexte">' + ch.contexte + '</div></li>';
      }).join('') + '</ul>';
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

  // Promesses vs bilan (uniquement pour les ex-titulaires de fonctions exécutives)
  html += '<section class="fiche-section"><h2>Promesses passées vs bilan</h2>';
  if (c.promesses_bilan && c.promesses_bilan.length) {
    html += '<table class="bilan-table"><tbody>';
    html += c.promesses_bilan.map(function (p) {
      var b = bilanIcon(p.resultat);
      return '<tr><td class="bilan-icon" title="' + b.label + '">' + b.icon + '</td>' +
        '<td><div class="bilan-promesse">' + p.promesse + '</div><div class="bilan-detail">' + p.detail + '</div></td></tr>';
    }).join('');
    html += '</tbody></table>';
  } else {
    html += '<p class="no-data">N\'a jamais exercé de fonction exécutive nationale — pas de bilan de gouvernance à établir.</p>';
  }
  html += '</section>';

  // Positions sur les sujets qui comptent (10 thématiques)
  var sujets = [
    ['pouvoir_achat', 'Pouvoir d\'achat / salaires'], ['retraites', 'Retraites'], ['securite', 'Sécurité / justice'],
    ['immigration', 'Immigration'], ['sante', 'Santé / hôpital'], ['ecologie', 'Écologie / énergie'],
    ['education', 'Éducation'], ['europe', 'Europe / international'], ['dette', 'Dette / fiscalité'],
    ['institutions', 'Institutions / démocratie']
  ];
  html += '<section class="fiche-section"><h2>Positions sur les sujets qui comptent</h2>';
  if (c.sources && c.sources.length) {
    html += '<p class="positions-sources-note"><a href="#fiche-sources" class="source-verify-link">🔍 Vérifier les sources de cette fiche</a></p>';
  }
  html += '<div class="positions-grid">';
  sujets.forEach(function (s) {
    var r = resolveSujet(c, s[0]);
    if (!r) return;
    html += '<div class="position-card"><div class="label">' + s[1] + '</div>';
    if (r.direction) {
      html += '<div class="stance ' + (r.stanceCls || 'stance-nuance') + '">' + r.direction + '</div>';
    }
    html += '<div class="detail">' + r.synthese + '</div></div>';
  });
  html += '</div></section>';

  // Vérification des affirmations (fact-checking)
  html += '<section class="fiche-section"><h2>Vérification des affirmations</h2>';
  if (c.fact_checks && c.fact_checks.length) {
    html += '<div class="factcheck-list">' + c.fact_checks.map(function (f) {
      var sourceNames = f.sources && f.sources.length ? f.sources.map(function (s) { return s.nom; }).join(' / ') : '';
      var contexteFc = 'Vérification des affirmations — ' + c.nom + ' — « ' + f.affirmation.slice(0, 90) + (f.affirmation.length > 90 ? '…' : '') + ' »';
      return '<div class="factcheck-card"><div class="detail" style="margin-bottom:0.5rem;">' + f.affirmation + '</div>' +
        '<span class="stance ' + verdictClass(f.verdict) + '">' + verdictLabel(f.verdict) + '</span>' +
        (sourceNames ? ' <span class="factcheck-source">— ' + sourceNames + (f.date ? ' · ' + f.date : '') + '</span>' : '') +
        '<br>' + renderSources(f.sources) +
        (window.renderSignalement ? window.renderSignalement(contexteFc) : '') +
        '</div>';
    }).join('') + '</div>';
  } else {
    html += '<p class="no-data">Pas de vérification disponible à ce stade.</p>';
  }
  if (c.fact_checks_note) {
    html += '<p class="no-data" style="margin-top:0.8rem;">' + c.fact_checks_note + '</p>';
  }
  html += '</section>';

  // Soutiens politiques
  html += '<section class="fiche-section"><h2>Soutiens politiques</h2>';
  if (c.soutiens && c.soutiens.length) {
    html += '<ul class="soutiens-list">' + c.soutiens.map(function (s) {
      return '<li><span class="soutien-type soutien-' + (s.type && s.type.indexOf('officiel') === 0 ? 'officiel' : 'presume') + '">' +
        (s.type && s.type.indexOf('officiel') === 0 ? 'Officiel' : 'Présumé') + '</span>' +
        '<div><strong>' + s.nom + '</strong><div class="soutien-fonction">' + s.fonction + '</div></div></li>';
    }).join('') + '</ul>';
  } else {
    html += '<p class="no-data">Aucun soutien nommément identifié dans les sources consultées à ce stade.</p>';
  }
  if (c.soutiens_note) {
    html += '<p class="no-data" style="margin-top:0.8rem;">' + c.soutiens_note + '</p>';
  }
  html += '</section>';

  // Dynamique sondagière
  html += '<section class="fiche-section"><h2>Dynamique sondagière</h2>';
  if (window.isSilenceElectoral && window.isSilenceElectoral()) {
    html += '<p class="silence-note">🔇 ' + window.SILENCE_ELECTORAL_MESSAGE + '</p>';
  } else {
    var t = tendanceLabel(c.sondage.tendance);
    html += '<div class="tendance-box"><span class="tendance-arrow ' + t.cls + '">' + t.arrow + '</span>';
    html += '<span>' + c.sondage.label + ' — <strong class="' + t.cls + '">' + t.label + '</strong></span>';
    if (DATA.derniere_maj_sondages) html += '<span class="sondage-maj">maj ' + DATA.derniere_maj_sondages + '</span>';
    html += '</div>';
  }
  html += '</section>';

  // Sources
  if (c.sources && c.sources.length) {
    html += '<section class="fiche-section" id="fiche-sources"><h2>Sources</h2><ul class="parcours-list">';
    html += c.sources.map(function (s) { return '<li><a href="' + s + '" target="_blank" rel="noopener noreferrer">' + s + '</a></li>'; }).join('');
    html += '</ul></section>';
  }

  html += '<p class="fiche-maj-note">Fiche mise à jour le ' + DATA.derniere_maj + '</p>';

  // Signalement d'erreur (générique, page entière)
  if (window.renderSignalement) {
    html += '<section class="fiche-section">' + window.renderSignalement('Fiche candidat — ' + c.nom) + '</section>';
  }

  root.innerHTML = html;
  if (window.initSignalementWidgets) window.initSignalementWidgets(root);
})();
