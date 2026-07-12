(function () {
  // Article L.49 du code électoral + loi du 19 juillet 1977 : interdiction de diffuser
  // des commentaires de sondages du samedi minuit précédant chaque tour jusqu'à la
  // fermeture des bureaux de vote le dimanche à 20h. Ne concerne QUE l'affichage des
  // sondages — le reste du site (fiches, timeline, quiz) reste accessible normalement.
  var SILENCE_WINDOWS = [
    { start: new Date(2027, 3, 17, 0, 0, 0), end: new Date(2027, 3, 18, 20, 0, 0) },  // 1er tour : 17-18 avril 2027
    { start: new Date(2027, 4, 1, 0, 0, 0), end: new Date(2027, 4, 2, 20, 0, 0) }      // 2nd tour : 1-2 mai 2027
  ];

  function isSilenceElectoral(now) {
    now = now || new Date();
    return SILENCE_WINDOWS.some(function (w) { return now >= w.start && now <= w.end; });
  }

  window.isSilenceElectoral = isSilenceElectoral;
  window.SILENCE_ELECTORAL_MESSAGE = 'Affichage suspendu conformément à la période de réserve électorale.';
})();
