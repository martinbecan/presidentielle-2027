(function () {
  var DATA = window.SITE_DATA;
  var footer = document.querySelector('footer');
  if (!DATA || !footer) return;

  var changelogUrl = 'https://github.com/martinbecan/presidentielle-2027/blob/main/CHANGELOG.md';

  var p = document.createElement('p');
  p.className = 'footer-meta';
  p.innerHTML = 'Site mis à jour le ' + DATA.derniere_maj + ' — <a href="' + changelogUrl + '" target="_blank" rel="noopener noreferrer">voir le changelog</a>';
  footer.appendChild(p);
})();
