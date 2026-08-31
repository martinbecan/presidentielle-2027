(function () {
  var DATA = window.SITE_DATA;
  if (!DATA) return;

  var candidats = DATA.candidats.filter(function (c) { return c.fiche; });
  var slots = [document.getElementById('slot-0'), document.getElementById('slot-1'), document.getElementById('slot-2')];
  var resultEl = document.getElementById('comparateur-result');
  var shareBtn = document.getElementById('share-btn');
  var shareFeedback = document.getElementById('share-feedback');

  var SUJETS = [
    ['pouvoir_achat', 'Pouvoir d\'achat / salaires'], ['retraites', 'Retraites'], ['securite', 'Sécurité / justice'],
    ['immigration', 'Immigration'], ['sante', 'Santé / hôpital'], ['ecologie', 'Écologie / énergie'],
    ['education', 'Éducation'], ['europe', 'Europe / international'], ['dette', 'Dette / fiscalité'],
    ['institutions', 'Institutions / démocratie'], ['laicite', 'Laïcité / religion dans l\'espace public'],
    ['agriculture', 'Agriculture / ruralité'], ['numerique', 'Numérique / intelligence artificielle'],
    ['logement', 'Logement'], ['defense', 'Défense / politique militaire']
  ];
  var FALLBACK_KEYS = ['retraites', 'immigration', 'europe', 'dette'];

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }
  function initials(nom) {
    return nom.split(' ').filter(function (w) { return /^[A-ZÀ-Ý]/.test(w); }).map(function (w) { return w[0]; }).slice(0, 2).join('');
  }
  function stanceLabel(s) {
    if (s === 'pour') return 'Plutôt favorable';
    if (s === 'contre') return 'Plutôt opposé(e)';
    return 'Position nuancée';
  }
  function resolveSujet(c, key) {
    var s10 = c.positions_10_sujets && c.positions_10_sujets[key];
    var dejaDoc = s10 && (!s10.synthese || /^Non re-recherch/i.test(s10.synthese) || !s10.direction);
    if (dejaDoc && FALLBACK_KEYS.indexOf(key) !== -1 && c.positions && c.positions[key]) {
      return { synthese: c.positions[key].detail, direction: stanceLabel(c.positions[key].stance), stanceCls: 'stance-' + c.positions[key].stance };
    }
    if (s10 && s10.synthese && !/^Non re-recherch/i.test(s10.synthese)) {
      return { synthese: s10.synthese, direction: s10.direction, stanceCls: null };
    }
    return null;
  }

  function getSelectedSlugs() {
    return slots.map(function (s) { return s.value; }).filter(Boolean);
  }

  function populateSelects() {
    var selected = getSelectedSlugs();
    slots.forEach(function (select, idx) {
      var current = select.value;
      select.innerHTML = '<option value="">— Choisir —</option>';
      candidats.forEach(function (c) {
        var takenByOther = selected.indexOf(c.slug) !== -1 && c.slug !== current;
        if (takenByOther) return;
        var opt = document.createElement('option');
        opt.value = c.slug;
        opt.textContent = c.nom + ' (' + c.parti + ')';
        if (c.slug === current) opt.selected = true;
        select.appendChild(opt);
      });
    });
  }

  function updateUrl() {
    var slugs = getSelectedSlugs();
    var url = new URL(window.location.href);
    if (slugs.length) {
      url.searchParams.set('c', slugs.join(','));
    } else {
      url.searchParams.delete('c');
    }
    window.history.replaceState({}, '', url.toString());
  }

  // Tableau construit avec CSS Grid + `display:contents` sur chaque "ligne" : toutes les
  // cellules d'une même ligne (même sujet) partagent alors la même rangée de grille, donc la
  // même hauteur, quelle que soit la longueur du texte — l'alignement est garanti par le CSS,
  // pas par du bricolage de hauteurs fixes.
  // Courbes de sondage superposées. Axe commun et absolu, volontairement : réétaler
  // chaque candidat sur sa propre échelle rendrait les lignes « comparables » en
  // fabriquant une équivalence visuelle qui n'existe pas dans les chiffres.
  function renderCourbesComparees(list) {
    var S = window.SONDAGES;
    var avecHisto = list.filter(function (c) { return c.sondageHistorique && c.sondageHistorique.length >= 2; });
    if (avecHisto.length < 2) return '';
    if (window.isSilenceElectoral && window.isSilenceElectoral()) return '';

    // Les séries n'ont pas forcément les mêmes relevés (un candidat peut entrer en cours
    // de route). Chacune est donc tracée sur ses propres points, positionnés selon leur
    // date réelle sur un axe temporel commun.
    var posX = S.axeTemps(avecHisto.map(function (c) { return c.sondageHistorique; }));
    var vues = {};
    avecHisto.forEach(function (c) {
      c.sondageHistorique.forEach(function (p) { vues[p.date] = p.label; });
    });
    var releves = Object.keys(vues).sort().map(function (d) { return { date: d, label: vues[d] }; });

    var lo = Infinity, hi = -Infinity;
    avecHisto.forEach(function (c) {
      c.sondageHistorique.forEach(function (p) {
        var m = S.margeErreur(p.valeur);
        lo = Math.min(lo, p.valeur - m); hi = Math.max(hi, p.valeur + m);
      });
    });
    var pad = Math.max((hi - lo) * 0.12, 0.8);
    lo = Math.max(0, lo - pad); hi = hi + pad;

    var W = 100, H = 46;
    function x(p) { return posX(p.date).toFixed(2); }
    function y(v) { return (H * (1 - (v - lo) / (hi - lo))).toFixed(2); }

    var svg = '<svg class="sondage-courbe" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" ' +
      'aria-label="Évolution comparée des intentions de vote : ' +
      avecHisto.map(function (c) {
        return c.nom + ' ' + c.sondageHistorique.map(function (p) { return p.label + ' ' + S.nb(p.valeur) + ' %'; }).join(', ');
      }).join(' ; ') + '">';

    [lo, (lo + hi) / 2, hi].forEach(function (v) {
      svg += '<line x1="0" y1="' + y(v) + '" x2="' + W + '" y2="' + y(v) + '" class="courbe-grille" vector-effect="non-scaling-stroke"/>';
    });

    avecHisto.forEach(function (c) {
      var col = blocInfo(c.bloc).couleur;
      var haut = c.sondageHistorique.map(function (p) { return x(p) + ',' + y(p.valeur + S.margeErreur(p.valeur)); });
      var bas = c.sondageHistorique.map(function (p) { return x(p) + ',' + y(p.valeur - S.margeErreur(p.valeur)); }).reverse();
      svg += '<polygon points="' + haut.concat(bas).join(' ') + '" fill="' + col + '" opacity="0.18"/>';
      svg += '<polyline points="' + c.sondageHistorique.map(function (p) { return x(p) + ',' + y(p.valeur); }).join(' ') +
        '" fill="none" stroke="' + col + '" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
    });
    svg += '</svg>';

    var points = '';
    avecHisto.forEach(function (c) {
      var col = blocInfo(c.bloc).couleur;
      c.sondageHistorique.forEach(function (p) {
        points += '<span class="courbe-point" style="left:' + x(p) + '%; top:' + (y(p.valeur) / H * 100).toFixed(2) +
          '%; background:' + col + ';" title="' + c.nom + ' — ' + p.label + ' : ' + S.nb(p.valeur) + ' %"></span>';
      });
    });

    var yAxis = '<div class="courbe-yaxis">' +
      [hi, (lo + hi) / 2, lo].map(function (v) { return '<span>' + v.toFixed(0) + '</span>'; }).join('') + '</div>';
    // Libellés positionnés à leur date, comme les points — un espacement régulier
    // laisserait croire que les relevés sont équidistants dans le temps.
    var xAxis = '<div class="courbe-xaxis courbe-xaxis-date">' + releves.map(function (p) {
      return '<span style="left:' + posX(p.date).toFixed(2) + '%;">' + p.label + '</span>';
    }).join('') + '</div>';

    var legende = '<div class="courbe-legende">' + avecHisto.map(function (c) {
      var v = c.sondageHistorique.map(function (p) { return p.valeur; });
      var evo = S.evolutionSignificative(v);
      return '<span class="courbe-legende-item"><span class="courbe-legende-puce" style="background:' + blocInfo(c.bloc).couleur +
        ';"></span>' + c.nom + ' <span class="courbe-legende-val">' + S.nb(v[v.length - 1]) + ' %' +
        (evo ? ' · évolution réelle' : '') + '</span></span>';
    }).join('') + '</div>';

    // Garde-fou d'échelle : sur un axe commun, un candidat bas se retrouve écrasé même
    // quand son mouvement est statistiquement établi. On le dit plutôt que de laisser
    // croire qu'il n'a pas bougé.
    var ecrases = avecHisto.filter(function (c) {
      var v = c.sondageHistorique.map(function (p) { return p.valeur; });
      var amplitude = Math.max.apply(null, v) - Math.min.apply(null, v);
      return S.evolutionSignificative(v) && amplitude / (hi - lo) < 0.12;
    }).map(function (c) { return c.nom; });

    var note = '<p class="sondage-courbe-note"><strong>Axe commun</strong> : les niveaux sont comparables tels quels, ' +
      'les zones colorées sont les marges d\'erreur.';
    if (ecrases.length) {
      note += ' <strong class="courbe-verdict-non">Attention</strong> : l\'écart de niveau entre les candidats écrase visuellement ' +
        'l\'évolution de ' + ecrases.join(' et ') + ', pourtant statistiquement établie — sa fiche la montre à son échelle.';
    }
    note += '</p>';

    return '<div class="comparateur-courbes"><h3 class="comparateur-courbes-titre">Évolution comparée des intentions de vote</h3>' +
      legende + '<div class="courbe-grid">' + yAxis + '<div class="courbe-plot">' + svg + points + '</div>' +
      '<div></div>' + xAxis + '</div>' + note + '</div>';
  }

  function renderTable(list) {
    var html = '<div class="comparateur-table">';

    html += '<div class="comparateur-row comparateur-row-header">';
    html += '<div class="comparateur-cell comparateur-cell-label"></div>';
    list.forEach(function (c) {
      var bloc = blocInfo(c.bloc);
      html += '<div class="comparateur-cell comparateur-cell-header">';
      html += '<div class="avatar" style="width:48px;height:48px;font-size:1.05rem;background:' + bloc.couleur + '33; color:' + bloc.couleur + ';">' + initials(c.nom) + '</div>';
      html += '<div class="comparateur-card-nom">' + c.nom + '</div>';
      html += '<div class="comparateur-card-parti">' + c.parti + '</div>';
      html += '<span class="bloc-pill" style="background:' + bloc.couleur + '33; color:' + bloc.couleur + '; border:1px solid ' + bloc.couleur + '55;">' + bloc.label + '</span>';
      html += '<div class="comparateur-sondage">' + ((window.isSilenceElectoral && window.isSilenceElectoral()) ? '<span class="silence-note">🔇 masqué</span>' : c.sondage.label) + '</div>';
      html += '</div>';
    });
    html += '</div>';

    SUJETS.forEach(function (s) {
      html += '<div class="comparateur-row">';
      html += '<div class="comparateur-cell comparateur-cell-label">' + s[1] + '</div>';
      list.forEach(function (c) {
        var r = resolveSujet(c, s[0]);
        html += '<div class="comparateur-cell">';
        html += '<span class="comparateur-cell-candidat-tag">' + c.nom + '</span>';
        if (r && r.direction === 'non documenté') {
          html += '<div class="stance stance-nodata">Pas d\'information à ce stade</div>';
        } else if (r) {
          if (r.direction) html += '<div class="stance ' + (r.stanceCls || 'stance-nuance') + '">' + r.direction + '</div>';
          html += '<div class="detail">' + r.synthese + '</div>';
        } else {
          html += '<div class="stance stance-nodata">Pas d\'information à ce stade</div>';
        }
        html += '</div>';
      });
      html += '</div>';
    });

    html += '<div class="comparateur-row">';
    html += '<div class="comparateur-cell comparateur-cell-label"></div>';
    list.forEach(function (c) {
      html += '<div class="comparateur-cell"><a class="back-link" href="candidats/' + c.slug + '.html">Voir la fiche complète →</a></div>';
    });
    html += '</div>';

    html += '</div>';
    return html;
  }

  function render() {
    var slugs = getSelectedSlugs();
    var uniqueSlugs = slugs.filter(function (s, i) { return slugs.indexOf(s) === i; });
    if (uniqueSlugs.length < 2) {
      resultEl.innerHTML = '<p class="no-data">Choisissez au moins deux candidats ci-dessus pour afficher la comparaison.</p>';
      shareBtn.disabled = true;
      return;
    }
    var selectedCandidats = uniqueSlugs.map(function (slug) { return candidats.find(function (c) { return c.slug === slug; }); }).filter(Boolean);
    resultEl.innerHTML = renderCourbesComparees(selectedCandidats) + renderTable(selectedCandidats);
    var tableEl = resultEl.querySelector('.comparateur-table');
    if (tableEl) tableEl.style.gridTemplateColumns = '150px repeat(' + selectedCandidats.length + ', 1fr)';
    shareBtn.disabled = false;
  }

  function initFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var slugs = (params.get('c') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);

    // Après le 1er tour, défaut intelligent : les 2 qualifiés pré-sélectionnés — sauf si
    // l'utilisateur a explicitement demandé une autre comparaison via l'URL (?c=...).
    if (!slugs.length) {
      var qualifies = candidats.filter(function (c) { return c.statut === 'qualifie_2nd_tour'; });
      if (qualifies.length === 2) slugs = qualifies.map(function (c) { return c.slug; });
    }

    slugs.slice(0, 3).forEach(function (slug, idx) {
      if (slots[idx] && candidats.some(function (c) { return c.slug === slug; })) {
        slots[idx].value = slug;
      }
    });
  }

  slots.forEach(function (select) {
    select.addEventListener('change', function () {
      populateSelects();
      updateUrl();
      render();
    });
  });

  var shareLinkInput = document.getElementById('share-link');

  shareBtn.addEventListener('click', function () {
    var url = window.location.href;
    var feedbackEl = document.getElementById('share-feedback');
    function showFeedback(msg) {
      if (!feedbackEl) return;
      feedbackEl.textContent = msg;
      setTimeout(function () { feedbackEl.textContent = ''; }, 3000);
    }

    // Le lien reste toujours visible et copiable manuellement (Ctrl+C), quel que soit
    // le succès de la copie automatique — l'API Clipboard est bloquée dans certains
    // navigateurs/contextes sans avertissement.
    if (shareLinkInput) {
      shareLinkInput.value = url;
      shareLinkInput.hidden = false;
      shareLinkInput.focus();
      shareLinkInput.select();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        showFeedback('Lien copié dans le presse-papiers !');
      }, function () {
        showFeedback('Copie automatique indisponible — le lien est sélectionné ci-dessous, faites Ctrl+C.');
      });
    } else {
      showFeedback('Le lien est sélectionné ci-dessous, faites Ctrl+C.');
    }
  });

  populateSelects(); // 1ère passe : toutes les options existent, rien n'est encore sélectionné
  initFromUrl();      // fixe .value sur les <select> maintenant que leurs <option> existent
  populateSelects(); // 2e passe : réexclut les candidats déjà pris dans un autre slot
  updateUrl();
  render();
})();
