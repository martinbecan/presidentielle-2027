(function () {
  var DATA = window.SITE_DATA;
  if (!DATA) return;

  var tbody = document.getElementById('candidats-tbody');
  var searchInput = document.getElementById('search-input');
  var blocSelect = document.getElementById('bloc-filter');
  var countEl = document.getElementById('candidats-count');
  var countLabelEl = document.getElementById('candidats-count-label');
  var updatedEl = document.getElementById('derniere-maj');
  var alertBox = document.getElementById('alert-box');
  var pressentisEl = document.getElementById('pressentis-list');
  var sourcesEl = document.getElementById('sources-sondages');
  var parrainagesEl = document.getElementById('parrainages-message');
  var qualifiesBanner = document.getElementById('qualifies-banner');

  var sortState = { key: null, dir: 1 };

  // Si le 1er tour a eu lieu (2 candidats marqués "qualifie_2nd_tour" dans les données),
  // le site bascule automatiquement en mode "2 qualifiés" — rien à faire manuellement
  // le jour venu, il suffit de mettre à jour le champ `statut` dans data/candidats.js.
  var hasSecondTour = DATA.candidats.some(function (c) { return c.statut === 'qualifie_2nd_tour'; });

  function blocLabel(id) {
    var b = DATA.blocs.find(function (x) { return x.id === id; });
    return b ? b.label : id;
  }

  function statutBadge(c) {
    if (c.statut === 'qualifie_2nd_tour') return '<span class="statut-pill statut-qualifie">🟢 Qualifié·e pour le 2nd tour</span>';
    if (c.statut === 'elimine_1er_tour') return '<span class="statut-pill statut-elimine">⚪ Éliminé·e au 1er tour' + (c.score_1er_tour ? ' (' + c.score_1er_tour + ')' : '') + '</span>';
    return '';
  }

  function renderQualifiesBanner() {
    if (!qualifiesBanner) return;
    if (!hasSecondTour) { qualifiesBanner.innerHTML = ''; return; }
    var qualifies = DATA.candidats.filter(function (c) { return c.statut === 'qualifie_2nd_tour'; });
    var html = '<div class="qualifies-box"><h2>🏆 Qualifiés pour le 2nd tour</h2><div class="qualifies-list">';
    qualifies.forEach(function (c) {
      html += '<a class="qualifie-card" href="' + (c.fiche ? 'candidats/' + c.slug + '.html' : '#') + '">';
      html += '<span class="candidat-name">' + c.nom + '</span> <span class="parti">' + c.parti + '</span>';
      if (c.score_1er_tour) html += '<span class="qualifie-score">' + c.score_1er_tour + '</span>';
      html += '</a>';
    });
    html += '</div></div>';
    qualifiesBanner.innerHTML = html;
  }

  function sondageValue(c) {
    var m = String(c.sondage.label).match(/[\d.]+/g);
    if (!m) return 0;
    var nums = m.map(Number);
    return nums.reduce(function (a, b) { return a + b; }, 0) / nums.length;
  }

  function tendanceArrow(t) {
    if (t === 'hausse') return '<span class="tendance" style="color:#4ade80">▲</span>';
    if (t === 'baisse') return '<span class="tendance" style="color:#f87171">▼</span>';
    return '<span class="tendance" style="color:#71717a">→</span>';
  }

  function matchesFilter(c, query, bloc) {
    if (bloc && c.bloc !== bloc) return false;
    if (!query) return true;
    var q = query.toLowerCase();
    return c.nom.toLowerCase().indexOf(q) !== -1 || c.parti.toLowerCase().indexOf(q) !== -1;
  }

  function render() {
    var query = searchInput ? searchInput.value.trim() : '';
    var bloc = blocSelect ? blocSelect.value : '';

    var list = DATA.candidats.filter(function (c) { return matchesFilter(c, query, bloc); });

    if (sortState.key) {
      list.sort(function (a, b) {
        var va, vb;
        if (sortState.key === 'nom') { va = a.nom; vb = b.nom; }
        else if (sortState.key === 'parti') { va = a.parti; vb = b.parti; }
        else if (sortState.key === 'sondage') { va = sondageValue(a); vb = sondageValue(b); }
        if (va < vb) return -1 * sortState.dir;
        if (va > vb) return 1 * sortState.dir;
        return 0;
      });
    }

    tbody.innerHTML = '';

    if (!sortState.key) {
      // group by bloc, preserving DATA.blocs order
      DATA.blocs.forEach(function (bloc) {
        var items = list.filter(function (c) { return c.bloc === bloc.id; });
        if (!items.length) return;
        tbody.appendChild(rowBlocHeader(bloc));
        items.forEach(function (c) { tbody.appendChild(rowCandidat(c)); });
      });
    } else {
      list.forEach(function (c) { tbody.appendChild(rowCandidat(c)); });
    }

    countEl.textContent = list.length;
    if (countLabelEl) countLabelEl.textContent = list.length > 1 ? 'candidats' : 'candidat';
  }

  function rowBlocHeader(bloc) {
    var tr = document.createElement('tr');
    tr.className = 'bloc-header bloc-' + bloc.id;
    var td = document.createElement('td');
    td.colSpan = 5;
    td.textContent = '● ' + bloc.label;
    tr.appendChild(td);
    return tr;
  }

  function rowCandidat(c) {
    var tr = document.createElement('tr');
    tr.className = 'bloc-' + c.bloc + (c.fiche ? '' : ' candidat-small');

    var tdName = document.createElement('td');
    var nameHtml = '<span class="candidat-name">' + c.nom + '</span>' +
      (c.note ? ' <span class="note-icon" title="' + (c.noteDetail || '') + '">' + c.note + '</span>' : '') +
      (hasSecondTour ? '<br>' + statutBadge(c) : '');
    if (c.fiche) {
      tdName.innerHTML = '<a class="candidat-link" href="candidats/' + c.slug + '.html">' + nameHtml + '</a>';
    } else {
      tdName.innerHTML = nameHtml;
    }
    tr.appendChild(tdName);

    var tdParti = document.createElement('td');
    tdParti.className = 'parti';
    tdParti.textContent = c.parti;
    tr.appendChild(tdParti);

    var tdSondage = document.createElement('td');
    if (window.isSilenceElectoral && window.isSilenceElectoral()) {
      tdSondage.innerHTML = '<span class="silence-note">🔇 Sondage masqué (réserve électorale)</span>';
    } else {
      var sClass = c.sondage.niveau === 'fort' ? 'sondage-fort' : (c.sondage.niveau === 'moyen' ? 'sondage-moyen' : 'sondage-faible');
      tdSondage.innerHTML = '<span class="' + sClass + '">' + c.sondage.label + '</span>' + tendanceArrow(c.sondage.tendance);
    }
    tr.appendChild(tdSondage);

    var tdHist = document.createElement('td');
    tdHist.className = 'historique';
    if (c.historique && c.historique.length) {
      tdHist.innerHTML = c.historique.map(function (h) { return h.annee + ' <em>(' + h.resultat + ')</em>'; }).join(' · ');
    } else if (c.fiche) {
      tdHist.textContent = 'Première candidature';
    }
    tr.appendChild(tdHist);

    var tdIdees = document.createElement('td');
    tdIdees.className = 'idees';
    if (c.idees && c.idees.length) {
      tdIdees.innerHTML = c.idees.map(function (i) { return '<span class="tag">' + i + '</span>'; }).join(' ');
    }
    tr.appendChild(tdIdees);

    return tr;
  }

  function wireSort() {
    var headers = document.querySelectorAll('th[data-sort-key]');
    headers.forEach(function (th) {
      th.classList.add('sortable');
      th.setAttribute('tabindex', '0');
      th.setAttribute('role', 'button');
      th.setAttribute('aria-label', 'Trier par ' + th.textContent.trim());
      var activate = function () {
        var key = th.getAttribute('data-sort-key');
        if (sortState.key === key) {
          sortState.dir *= -1;
        } else {
          sortState.key = key;
          sortState.dir = 1;
        }
        headers.forEach(function (h) { h.querySelector('.sort-arrow') && (h.querySelector('.sort-arrow').textContent = ''); });
        var arrow = th.querySelector('.sort-arrow');
        if (arrow) arrow.textContent = sortState.dir === 1 ? '▲' : '▼';
        render();
      };
      th.addEventListener('click', activate);
      th.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });
  }

  function fillHeader() {
    if (alertBox && DATA.alerte) {
      alertBox.innerHTML = '<strong>' + DATA.alerte.titre + '</strong> — ' + DATA.alerte.texte;
    }
    if (updatedEl) updatedEl.textContent = DATA.derniere_maj;
    if (parrainagesEl && DATA.parrainages) parrainagesEl.textContent = DATA.parrainages.message;
    if (sourcesEl) sourcesEl.textContent = DATA.sourcesSondages;
    if (pressentisEl && DATA.pressentis) {
      pressentisEl.textContent = DATA.pressentis.map(function (p) {
        return p.nom + (p.sondage ? ' (' + p.sondage + ')' : '');
      }).join(', ');
    }
    if (blocSelect) {
      DATA.blocs.forEach(function (b) {
        var opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.label;
        blocSelect.appendChild(opt);
      });
    }
  }

  fillHeader();
  renderQualifiesBanner();
  wireSort();
  render();

  if (searchInput) searchInput.addEventListener('input', render);
  if (blocSelect) blocSelect.addEventListener('change', render);
})();
