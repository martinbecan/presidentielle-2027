(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('timeline-root');
  if (!DATA || !root || !DATA.timeline) return;

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

  // Les filtres ne portent que sur le passé, et sont affichés juste au-dessus de lui.
  // Les faire agir aussi sur le bloc « Prochaines échéances » n'apportait rien — ses
  // 8 entrées sont presque toutes de la même catégorie, donc c'était un tout-ou-rien —
  // et cela aurait modifié du contenu situé hors du champ de vision de la commande.
  function filtresHtml(passeComplet) {
    if (!categories.length) return '';
    var html = '<div class="timeline-filters" role="group" aria-label="Filtrer les événements passés par catégorie">';
    categories.forEach(function (cat) {
      var count = passeComplet.filter(function (ev) { return ev.categorie === cat.id; }).length;
      if (!count) return;
      var on = actives[cat.id];
      html += '<button type="button" class="timeline-filter' + (on ? ' active' : '') + '"' +
        ' data-cat="' + cat.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        cat.label + ' <span class="timeline-filter-count">' + count + '</span></button>';
    });
    return html + '</div>';
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
    // Les échéances à venir ne sont jamais filtrées : elles restent toujours affichées.
    var aVenir = events.filter(function (ev) { return ev.future; });
    var passeComplet = events.filter(function (ev) { return !ev.future; });
    var passe = passeComplet.filter(function (ev) {
      // Un événement sans catégorie reste toujours visible : le filtre ne doit jamais
      // faire disparaître silencieusement une donnée mal étiquetée.
      return !ev.categorie || actives[ev.categorie];
    }).reverse();

    var html = '';

    // Les échéances à venir sont des dates connues, sans récit : les afficher avec
    // points, ligne et en-têtes d'année leur donnait un poids qu'elles n'ont pas et
    // repoussait l'actualité récente de plusieurs écrans. Elles tiennent ici en un
    // bloc compact à deux colonnes, sans découpage par année.
    function renderAVenir(liste) {
      if (!liste.length) return;
      html += '<section class="timeline-section">';
      html += '<h2 class="timeline-section-titre">Prochaines échéances' +
        '<span class="timeline-section-note">dans l\'ordre où elles arriveront</span></h2>';
      html += '<ul class="echeances">';
      liste.forEach(function (ev) {
        html += '<li class="echeance' + (ev.majeur ? ' majeur' : '') + '">';
        html += '<span class="echeance-date">' + ev.dateLabel + '</span>';
        html += '<span class="echeance-titre">' + ev.titre + '</span>';
        html += '</li>';
      });
      html += '</ul></section>';
    }

    // Le passé garde la frise complète : c'est là qu'il y a un récit à suivre,
    // des couleurs de blocs politiques et des liens vers les fiches.
    function renderPasse(liste) {
      html += '<section class="timeline-section">';
      html += '<h2 class="timeline-section-titre">Déjà passé' +
        '<span class="timeline-section-note">du plus récent au plus ancien — aujourd\'hui, ' +
        aujourdhuiLabel() + '</span></h2>';
      html += filtresHtml(passeComplet);

      if (!liste.length) {
        html += '<p class="no-data">Aucun événement ne correspond aux filtres sélectionnés.</p></section>';
        return;
      }

      var anneeCourante = null;
      var trackOuverte = false;
      liste.forEach(function (ev) {
        var annee = anneeDe(ev);
        if (annee !== anneeCourante) {
          if (trackOuverte) { html += '</div>'; trackOuverte = false; }
          anneeCourante = annee;
          html += '<h3 class="timeline-annee">' + annee + '</h3>';
        }
        if (!trackOuverte) {
          html += '<div class="timeline-track">';
          trackOuverte = true;
        }
        html += renderEvent(ev);
      });
      if (trackOuverte) html += '</div>';
      html += '</section>';
    }

    renderAVenir(aVenir);
    renderPasse(passe);

    root.innerHTML = html;
  }

  // Délégation sur `root` : les boutons vivent maintenant dans le HTML régénéré à
  // chaque rendu, un écouteur posé sur eux directement ne survivrait pas au premier clic.
  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.timeline-filter');
    if (!btn) return;
    var cat = btn.getAttribute('data-cat');
    actives[cat] = !actives[cat];
    renderEvents();
    // Le bouton vient d'être recréé : on rend le focus à son remplaçant pour ne pas
    // perdre la position du clavier entre deux filtrages.
    var again = root.querySelector('.timeline-filter[data-cat="' + cat + '"]');
    if (again) again.focus();
  });

  renderEvents();
})();
