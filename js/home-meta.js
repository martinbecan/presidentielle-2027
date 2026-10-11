(function () {
  var DATA = window.SITE_DATA;
  if (!DATA) return;

  var countEl = document.getElementById('candidats-count');
  var countLabelEl = document.getElementById('candidats-count-label');
  var updatedEl = document.getElementById('derniere-maj');
  var parrainagesEl = document.getElementById('parrainages-message');

  // Même décompte que la page Candidats : les candidatures écartées ou retirées
  // ne sont plus en lice et ne doivent pas gonfler le chiffre de l'accueil.
  var total = DATA.candidats.filter(function (c) {
    return c.statut !== 'retire' && c.statut !== 'non_retenu';
  }).length;
  if (countEl) countEl.textContent = total;
  if (countLabelEl) countLabelEl.textContent = total > 1 ? 'candidats' : 'candidat';
  if (updatedEl) updatedEl.textContent = DATA.derniere_maj;
  if (parrainagesEl && DATA.parrainages) parrainagesEl.textContent = DATA.parrainages.message;
})();
