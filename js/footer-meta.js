(function () {
  var DATA = window.SITE_DATA;
  var footer = document.querySelector('footer');
  if (!DATA || !footer) return;

  // Seule la date figure ici : elle répond à la question que se pose un visiteur
  // (« est-ce à jour ? »). Le lien vers le dépôt et son changelog vit sur la page
  // À propos, le journal des modifications est technique et n'intéresse pas
  // quelqu'un venu s'informer sur les candidats.
  var p = document.createElement('p');
  p.className = 'footer-meta';
  p.textContent = 'Site mis à jour le ' + DATA.derniere_maj;
  footer.appendChild(p);

  // Compteur de candidatures dans l'onglet de navigation. Le nombre est
  // l'information la plus parlante du site à ce stade de la campagne, et il
  // n'apparaissait que dans le sous-titre de la page Candidats, donc une fois
  // qu'on y était déjà. Même définition que le tableau : les candidatures
  // retirées ou non retenues ne comptent pas.
  if (!DATA.candidats) return;
  var enLice = DATA.candidats.filter(function (c) {
    return c.statut !== 'retire' && c.statut !== 'non_retenu';
  }).length;
  var lien = [].slice.call(document.querySelectorAll('.site-nav-links a'))
    .filter(function (a) { return /(^|\/)candidats\.html$/.test(a.getAttribute('href') || ''); })[0];
  if (lien && !lien.querySelector('.nav-compteur')) {
    var b = document.createElement('span');
    b.className = 'nav-compteur';
    b.textContent = enLice;
    b.setAttribute('aria-label', enLice + ' candidatures en lice');
    lien.appendChild(document.createTextNode(' '));
    lien.appendChild(b);
  }
})();
