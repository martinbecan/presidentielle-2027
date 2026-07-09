(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('timeline-root');
  if (!DATA || !root || !DATA.timeline) return;

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }

  var events = DATA.timeline.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  var html = '<div class="timeline-track">';
  events.forEach(function (ev) {
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
})();
