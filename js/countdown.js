(function () {
  var el = document.getElementById('countdown-bar');
  if (!el) return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var msPerDay = 24 * 60 * 60 * 1000;

  var TOUR1 = new Date(2027, 3, 18); // 18 avril 2027 (mois 0-indexé : 3 = avril)
  var TOUR2 = new Date(2027, 4, 2);  // 2 mai 2027

  function daysUntil(target) {
    return Math.round((target.getTime() - today.getTime()) / msPerDay);
  }

  var d1 = daysUntil(TOUR1);
  var d2 = daysUntil(TOUR2);
  var target, label, days;

  if (d1 >= 0) {
    target = TOUR1; label = 'avant le premier tour'; days = d1;
  } else if (d2 >= 0) {
    target = TOUR2; label = 'avant le second tour'; days = d2;
  } else {
    el.textContent = '🗳️ L\'élection présidentielle 2027 est terminée.';
    return;
  }

  var jLabel = days === 0 ? 'Jour J' : 'J-' + days;
  var dateLabel = target.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  el.textContent = '🗳️ ' + jLabel + ' ' + label + ' (' + dateLabel + ')';
})();
