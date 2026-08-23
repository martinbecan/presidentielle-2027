(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('timeline-root');
  if (!DATA || !root || !DATA.timeline) return;

  var filtersEl = document.getElementById('timeline-filters');
  var categories = DATA.timelineCategories || [];

  // Catégories actives. Toutes cochées au départ : le filtre sert à réduire le bruit
  // quand on cherche quelque chose de précis, pas à cacher de l'information par défaut.
  var actives = {};
  categories.forEach(function (c) { actives[c.id] = true; });

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }

  var events = DATA.timeline.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  function renderFilters() {
    if (!filtersEl || !categories.length) return;
    var html = '';
    categories.forEach(function (cat) {
      var count = events.filter(function (ev) { return ev.categorie === cat.id; }).length;
      if (!count) return;
      var on = actives[cat.id];
      html += '<button type="button" class="timeline-filter' + (on ? ' active' : '') + '"' +
        ' data-cat="' + cat.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        cat.label + ' <span class="timeline-filter-count">' + count + '</span></button>';
    });
    filtersEl.innerHTML = html;
  }

  function renderEvents() {
    var visible = events.filter(function (ev) {
      // Un événement sans catégorie reste toujours visible : le filtre ne doit jamais
      // faire disparaître silencieusement une donnée mal étiquetée.
      return !ev.categorie || actives[ev.categorie];
    });

    if (!visible.length) {
      root.innerHTML = '<p class="no-data">Aucun événement ne correspond aux filtres sélectionnés.</p>';
      return;
    }

    var html = '<div class="timeline-track">';
    visible.forEach(function (ev) {
      var candidat = ev.candidatSlug ? DATA.candidats.find(function (c) { return c.slug === ev.candidatSlug; }) : null;
      var couleur = candidat ? blocInfo(candidat.bloc).couleur : '#6b7280';
      var cls = 'timeline-event' + (ev.future ? ' future' : '');

      html += '<div class="' + cls + '">';
      html += '<div class="timeline-dot" style="' + (ev.future ? 'border-color:' + couleur : 'background:' + couleur) + '"></div>';
      html += '<div class="timeline-body">';
      html += '<div class="timeline-date">' + ev.dateLabel + '</div>';
      if (candidat && candidat.fiche) {
        html += '<div class="timeline-titre"><a href="candidats/' + candidat.slug + '.html">' + ev.titre + '</a></div>';
      } else {
        html += '<div class="timeline-titre">' + ev.titre + '</div>';
      }
      html += '</div></div>';
    });
    html += '</div>';

    root.innerHTML = html;
  }

  if (filtersEl) {
    filtersEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.timeline-filter');
      if (!btn) return;
      var cat = btn.getAttribute('data-cat');
      actives[cat] = !actives[cat];
      renderFilters();
      renderEvents();
      // Le bouton est recréé par renderFilters() : on rend le focus à son remplaçant
      // pour ne pas perdre la position du clavier entre deux filtrages.
      var again = filtersEl.querySelector('.timeline-filter[data-cat="' + cat + '"]');
      if (again) again.focus();
    });
  }

  renderFilters();
  renderEvents();
})();
