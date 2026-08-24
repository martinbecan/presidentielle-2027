(function () {
  var DATA = window.SITE_DATA;
  var footer = document.querySelector('footer');
  if (!DATA || !footer) return;

  // Seule la date figure ici : elle répond à la question que se pose un visiteur
  // (« est-ce à jour ? »). Le lien vers le dépôt et son changelog vit sur la page
  // À propos — le journal des modifications est technique et n'intéresse pas
  // quelqu'un venu s'informer sur les candidats.
  var p = document.createElement('p');
  p.className = 'footer-meta';
  p.textContent = 'Site mis à jour le ' + DATA.derniere_maj;
  footer.appendChild(p);
})();
