/*
 * Calculs statistiques partagés par les fiches candidats et le comparateur.
 * Regroupés ici volontairement : la même formule dupliquée dans deux fichiers finit
 * toujours par diverger (c'est ce qui était arrivé à la légende du tableau candidats).
 */
(function () {
  // Taille d'échantillon usuelle des sondages politiques français. Si un institut publie
  // sur un échantillon plus large, la marge réelle est plus étroite et le site est donc
  // légèrement trop prudent — c'est le bon sens de l'erreur sur un sujet pareil.
  var TAILLE_ECHANTILLON = 1000;

  // Marge d'erreur à 95 %. Elle dépend du score : ±3,0 points autour de 35 %, mais
  // seulement ±1,1 autour de 3 %. Un même mouvement de 2 points est donc du bruit
  // pour un candidat à 35 % et un signal réel pour un candidat à 3 %.
  function margeErreur(p) {
    var f = p / 100;
    return 1.96 * Math.sqrt(f * (1 - f) / TAILLE_ECHANTILLON) * 100;
  }

  // Écart minimal entre deux relevés pour qu'ils soient distinguables : la marge de
  // chacun se combine, d'où le facteur √2.
  function seuilDistinguable(a, b) {
    return margeErreur((a + b) / 2) * Math.SQRT2;
  }

  // Vrai si l'évolution entre le premier et le dernier relevé dépasse le seuil.
  function evolutionSignificative(valeurs) {
    if (!valeurs || valeurs.length < 2) return false;
    var a = valeurs[0], b = valeurs[valeurs.length - 1];
    return Math.abs(b - a) >= seuilDistinguable(a, b);
  }

  function nb(v) { return String(v).replace('.', ','); }

  window.SONDAGES = {
    margeErreur: margeErreur,
    seuilDistinguable: seuilDistinguable,
    evolutionSignificative: evolutionSignificative,
    nb: nb
  };
})();
