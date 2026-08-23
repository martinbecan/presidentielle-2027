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
  function categorieInfo(id) { return categories.find(function (c) { return c.id === id; }); }

  var events = DATA.timeline.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  // L'année sert de repère principal : sur une frise qui dépasse la trentaine
  // d'événements, c'est ce qui permet de se situer d'un coup d'œil.
  function anneeDe(ev) { return ev.date.slice(0, 4); }

  function aujourdhuiLabel() {
    var d = new Date();
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

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

  function renderEvent(ev) {
    var candidat = ev.candidatSlug ? DATA.candidats.find(function (c) { return c.slug === ev.candidatSlug; }) : null;
    var couleur = candidat ? blocInfo(candidat.bloc).couleur : '#8b8b94';
    var cat = ev.categorie ? categorieInfo(ev.categorie) : null;

    var cls = 'timeline-event' + (ev.future ? ' future' : '') + (ev.majeur ? ' majeur' : '');
    var html = '<div class="' + cls + '">';
    // Un événement majeur porte la couleur d'accent du site, définie en CSS : on
    // n'émet pas de style inline pour lui, sinon il écraserait la règle.
    var dotStyle = ev.majeur ? '' : ' style="' + (ev.future ? 'border-color:' + couleur : 'background:' + couleur) + '"';
    html += '<div class="timeline-dot"' + dotStyle + '></div>';
    html += '<div class="timeline-body">';

    html += '<div class="timeline-meta">';
    html += '<span class="timeline-date">' + ev.dateLabel + '</span>';
    if (cat) {
      html += '<span class="timeline-cat timeline-cat-' + ev.categorie + '">' + (cat.court || cat.label) + '</span>';
    }
    html += '</div>';

    if (candidat && candidat.fiche) {
      html += '<div class="timeline-titre"><a href="candidats/' + candidat.slug + '.html">' + ev.titre + '</a></div>';
    } else {
      html += '<div class="timeline-titre">' + ev.titre + '</div>';
    }
    html += '</div></div>';
    return html;
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

    // Le repère « aujourd'hui » se place devant le premier événement à venir encore
    // visible — il disparaît donc proprement si le filtre ne laisse que du passé.
    var premierFutur = visible.find(function (ev) { return ev.future; });

    var html = '';
    var anneeCourante = null;
    var trackOuverte = false;

    function fermerTrack() {
      if (trackOuverte) { html += '</div>'; trackOuverte = false; }
    }

    visible.forEach(function (ev) {
      // Le repère « aujourd'hui » passe avant l'en-tête d'année : si la bascule
      // tombe sur un changement d'année, on lit « Aujourd'hui » puis « 2027 ».
      if (ev === premierFutur) {
        fermerTrack();
        html += '<div class="timeline-today"><span class="timeline-today-pill">Aujourd\'hui · ' + aujourdhuiLabel() + '</span></div>';
      }
      var annee = anneeDe(ev);
      if (annee !== anneeCourante) {
        fermerTrack();
        anneeCourante = annee;
        html += '<h2 class="timeline-annee">' + annee + '</h2>';
      }
      if (!trackOuverte) {
        html += '<div class="timeline-track' + (ev.future ? ' timeline-track-future' : '') + '">';
        trackOuverte = true;
      }
      html += renderEvent(ev);
    });
    fermerTrack();

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
