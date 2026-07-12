(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('actualites-root');
  if (!DATA || !root || !DATA.timeline) return;

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }

  // Même source de données que la timeline complète (DATA.timeline) : une seule mise à jour
  // du JSON suffit à synchroniser les deux affichages.
  var passes = DATA.timeline.filter(function (ev) { return !ev.future; }).slice()
    .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  var recents = passes.slice(0, 4);

  if (!recents.length) {
    root.innerHTML = '<p class="no-data">Aucune actualité récente disponible.</p>';
    return;
  }

  var html = '<div class="actu-list">';
  recents.forEach(function (ev, i) {
    var candidat = ev.candidatSlug ? DATA.candidats.find(function (c) { return c.slug === ev.candidatSlug; }) : null;
    var couleur = candidat ? blocInfo(candidat.bloc).couleur : '#6b7280';
    var cls = 'actu-item' + (i === 0 ? ' actu-item-latest' : '');
    html += '<div class="' + cls + '" style="border-left-color:' + couleur + ';">';
    html += '<div class="actu-date">' + ev.dateLabel + '</div>';
    if (candidat && candidat.fiche) {
      html += '<div class="actu-titre"><a href="candidats/' + candidat.slug + '.html">' + ev.titre + '</a></div>';
    } else {
      html += '<div class="actu-titre">' + ev.titre + '</div>';
    }
    html += '</div>';
  });
  html += '</div>';
  html += '<a class="actu-more-link" href="timeline.html">Voir la timeline complète →</a>';

  root.innerHTML = html;
})();
