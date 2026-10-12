(function () {
  // Sommaire collant pour les pages longues. Une fiche candidat fait une dizaine
  // d'écrans sur mobile : sans repère, chercher la position sur l'immigration
  // revient à faire défiler à l'aveugle. La barre reste visible pendant le
  // défilement et met en avant la section en cours de lecture.
  //
  // Le sommaire se construit après coup, sur le DOM déjà rendu par candidat.js ou
  // comparateur.js : rien à synchroniser côté données.

  var MIN_SECTIONS = 4;   // en deçà, une barre de navigation coûte plus qu'elle ne rapporte
  var MIN_ECRANS = 3;     // ni sur une page qui tient en deux coups de pouce

  function slugifier(texte) {
    return texte.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function construire() {
    var hote = document.getElementById('sommaire-root');
    if (!hote) return;

    var sections = [].slice.call(document.querySelectorAll('.fiche-section'))
      .map(function (s) {
        var h = s.querySelector('h2');
        return h ? { el: s, titre: h.textContent.trim() } : null;
      })
      .filter(Boolean);

    if (sections.length < MIN_SECTIONS) return;
    if (document.body.scrollHeight < window.innerHeight * MIN_ECRANS) return;

    sections.forEach(function (s) {
      if (!s.el.id) s.el.id = 'sect-' + slugifier(s.titre);
      // Permet d'y arriver au clavier après un saut d'ancre.
      s.el.setAttribute('tabindex', '-1');
    });

    var html = '<nav class="sommaire" aria-label="Sommaire de la page"><ul>';
    sections.forEach(function (s) {
      html += '<li><a href="#' + s.el.id + '" data-cible="' + s.el.id + '">' + s.titre + '</a></li>';
    });
    html += '</ul></nav>';
    hote.innerHTML = html;

    var liens = {};
    [].forEach.call(hote.querySelectorAll('a[data-cible]'), function (a) {
      liens[a.getAttribute('data-cible')] = a;
    });

    // Mise en évidence de la section courante. IntersectionObserver plutôt qu'un
    // écouteur de défilement : pas de calcul à chaque pixel parcouru.
    var visibles = {};
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { visibles[e.target.id] = e.isIntersecting; });
      var courante = sections.filter(function (s) { return visibles[s.el.id]; })[0];
      Object.keys(liens).forEach(function (id) {
        liens[id].classList.toggle('actif', !!courante && id === courante.el.id);
      });
      if (courante && liens[courante.el.id]) {
        // Garde le lien actif dans le champ de vision quand la barre défile.
        var a = liens[courante.el.id];
        var barre = hote.querySelector('ul');
        var dep = a.offsetLeft - barre.scrollLeft;
        if (dep < 0 || dep + a.offsetWidth > barre.clientWidth) {
          barre.scrollTo({ left: a.offsetLeft - barre.clientWidth / 3, behavior: 'smooth' });
        }
      }
    }, { rootMargin: '-25% 0px -60% 0px' });

    sections.forEach(function (s) { obs.observe(s.el); });
  }

  // candidat.js et comparateur.js écrivent leur contenu de façon synchrone au
  // chargement ; ce script est placé après eux, le DOM est donc déjà complet.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', construire);
  } else {
    construire();
  }

  // Le comparateur se redessine à chaque changement de sélection.
  window.rebuildSommaire = construire;
})();
