(function () {
  var DATA = window.SITE_DATA;
  var S = window.SONDAGES;
  var root = document.getElementById('sondages-root');
  if (!DATA || !S || !root) return;

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }
  function nb(v) { return S.nb(v); }

  // Candidats disposant d'au moins deux relevés : en dessous, il n'y a pas de courbe,
  // seulement un point, et tracer une ligne entre un point et rien serait trompeur.
  var avecSerie = DATA.candidats
    .filter(function (c) { return c.sondageHistorique && c.sondageHistorique.length >= 2; })
    .sort(function (a, b) {
      var va = a.sondageHistorique[a.sondageHistorique.length - 1].valeur;
      var vb = b.sondageHistorique[b.sondageHistorique.length - 1].valeur;
      return vb - va;
    });

  var unSeulPoint = DATA.candidats.filter(function (c) {
    return c.sondageHistorique && c.sondageHistorique.length === 1;
  });

  if (!avecSerie.length) {
    root.innerHTML = '<p class="no-data">Aucune série de relevés disponible.</p>';
    return;
  }

  // ---------- Graphique commun ----------
  // Axe absolu partagé : c'est le seul moyen de comparer des niveaux. Le revers,
  // documenté sous le graphique, est que l'écart Le Pen / petits candidats écrase
  // visuellement les mouvements de ces derniers.
  function renderGraphique() {
    var W = 100, H = 52;
    var toutes = avecSerie.map(function (c) { return c.sondageHistorique; });
    var vals = [].concat.apply([], toutes).map(function (p) { return p.valeur; });
    var hi = Math.ceil(Math.max.apply(null, vals) / 5) * 5;
    var lo = 0;

    var posX = S.axeTemps(toutes);
    function y(v) { return (H * (1 - (v - lo) / (hi - lo))).toFixed(2); }

    var svg = '<svg class="sondages-graphe" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" ' +
      'aria-label="Évolution des intentions de vote de ' + avecSerie.length + ' candidats entre juin et septembre 2026">';

    for (var g = 0; g <= hi; g += 5) {
      svg += '<line x1="0" y1="' + y(g) + '" x2="' + W + '" y2="' + y(g) + '" class="courbe-grille" vector-effect="non-scaling-stroke"/>';
    }
    avecSerie.forEach(function (c) {
      var pts = c.sondageHistorique.map(function (p) { return posX(p.date).toFixed(2) + ',' + y(p.valeur); }).join(' ');
      svg += '<polyline points="' + pts + '" fill="none" stroke="' + blocInfo(c.bloc).couleur +
        '" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    });
    svg += '</svg>';

    var yAxis = '<div class="courbe-yaxis">';
    for (var k = hi; k >= 0; k -= 5) yAxis += '<span>' + k + '</span>';
    yAxis += '</div>';

    var dates = avecSerie[0].sondageHistorique;
    var xAxis = '<div class="courbe-xaxis courbe-xaxis-date">' + dates.map(function (p) {
      return '<span style="left:' + posX(p.date).toFixed(2) + '%;">' + p.label + '</span>';
    }).join('') + '</div>';

    var legende = '<div class="courbe-legende">' + avecSerie.map(function (c) {
      var b = blocInfo(c.bloc);
      var d = c.sondageHistorique[c.sondageHistorique.length - 1].valeur;
      return '<a class="courbe-legende-item" href="candidats/' + c.slug + '.html">' +
        '<span class="courbe-legende-puce" style="background:' + b.couleur + ';"></span>' +
        c.nom + ' <strong>' + nb(d) + ' %</strong></a>';
    }).join('') + '</div>';

    // L'axe vertical doit être un enfant direct de la grille : enveloppé dans un
    // conteneur, il n'est plus étiré à la hauteur de la ligne et son
    // justify-content: space-between n'a plus rien à répartir — les graduations se
    // tassaient alors dans le haut du graphique.
    return '<div class="courbe-grid">' + yAxis +
      '<div class="courbe-plot">' + svg + '</div>' +
      '<div></div><div>' + xAxis + '</div></div>' + legende;
  }

  // ---------- Tableau des relevés ----------
  function renderTableau() {
    // Les dates de relevé ne sont pas identiques pour tous : on construit la liste
    // de toutes les dates rencontrées, puis on laisse vide ce qui n'a pas été mesuré.
    var dates = [];
    avecSerie.forEach(function (c) {
      c.sondageHistorique.forEach(function (p) {
        if (!dates.some(function (d) { return d.date === p.date; })) dates.push({ date: p.date, label: p.label });
      });
    });
    dates.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

    var html = '<div class="table-wrap"><table class="sondages-table"><thead><tr><th>Candidat</th>';
    dates.forEach(function (d) { html += '<th>' + d.label + '</th>'; });
    html += '<th>Évolution</th><th>Établie&nbsp;?</th></tr></thead><tbody>';

    avecSerie.forEach(function (c) {
      var h = c.sondageHistorique;
      var premier = h[0].valeur, dernier = h[h.length - 1].valeur;
      var ecart = dernier - premier;
      var seuil = S.seuilDistinguable(premier, dernier);
      var etablie = Math.abs(ecart) >= seuil;
      var b = blocInfo(c.bloc);

      html += '<tr><td><a class="candidat-link" href="candidats/' + c.slug + '.html">' +
        '<span class="sondages-pastille" style="background:' + b.couleur + ';"></span>' + c.nom + '</a></td>';
      dates.forEach(function (d) {
        var p = h.filter(function (x) { return x.date === d.date; })[0];
        html += '<td>' + (p ? nb(p.valeur) + '&nbsp;%' : '<span class="sondages-vide" title="Non mesuré à cette date">—</span>') + '</td>';
      });
      html += '<td class="sondages-ecart">' + (ecart > 0 ? '+' : '') + nb(ecart.toFixed(1)) + '</td>';
      html += '<td>' + (etablie
        ? '<span class="sondages-oui">oui</span>'
        : '<span class="sondages-non" title="Écart inférieur au seuil de ' + nb(seuil.toFixed(1)) + ' points">non</span>') + '</td></tr>';
    });

    html += '</tbody></table></div>';
    return html;
  }

  function renderSynthese() {
    var etablies = avecSerie.filter(function (c) {
      return S.evolutionSignificative(c.sondageHistorique.map(function (p) { return p.valeur; }));
    });

    var html = '<div class="sondages-synthese">';
    if (etablies.length) {
      html += '<p><strong>' + etablies.length + ' évolution' + (etablies.length > 1 ? 's' : '') +
        ' statistiquement établie' + (etablies.length > 1 ? 's' : '') + '</strong> sur ' + avecSerie.length +
        ' séries suivies : ' + etablies.map(function (c) {
          var h = c.sondageHistorique;
          var d = h[h.length - 1].valeur - h[0].valeur;
          // En français le pluriel commence à 2 : on écrit « 1,5 point », pas « 1,5 points ».
          return c.nom + ' (' + (d > 0 ? '+' : '') + nb(d.toFixed(1)) + ' pt' + (Math.abs(d) >= 2 ? 's' : '') + ')';
        }).join(', ') + '.</p>';
    } else {
      html += '<p><strong>Aucune évolution n\'est statistiquement établie à ce jour.</strong> ' +
        'Tous les mouvements observés depuis juin restent sous le seuil au-delà duquel deux relevés sont distinguables.</p>';
    }
    html += '<p>Le reste des variations visibles sur le graphique est compatible avec le simple bruit de mesure. ' +
      'Ce n\'est pas une façon de minimiser : c\'est ce que les chiffres permettent de dire.</p>';
    html += '</div>';
    return html;
  }

  var out = '';
  out += renderGraphique();
  out += '<section class="sondages-bloc"><h2>Ce que l\'on peut conclure</h2>' + renderSynthese() + '</section>';
  out += '<section class="sondages-bloc"><h2>Tous les relevés</h2>';
  out += '<p class="sondages-note">Un tiret signale une date à laquelle le candidat n\'a pas été testé. ' +
    'La colonne « Établie ? » compare l\'écart entre le premier et le dernier relevé au seuil au-delà duquel ' +
    'deux mesures sont distinguables, compte tenu de la marge d\'erreur à chaque niveau.</p>';
  out += renderTableau() + '</section>';

  if (unSeulPoint.length) {
    out += '<section class="sondages-bloc"><h2>Un seul relevé à ce jour</h2>' +
      '<p class="sondages-note">Ces candidats viennent d\'entrer dans les sondages suivis par le site. ' +
      'Un point unique ne décrit pas une trajectoire : leur courbe apparaîtra au deuxième relevé.</p><ul class="sondages-nouveaux">' +
      unSeulPoint.map(function (c) {
        var p = c.sondageHistorique[0];
        return '<li><span class="sondages-pastille" style="background:' + blocInfo(c.bloc).couleur + ';"></span>' +
          c.nom + ' — <strong>' + nb(p.valeur) + ' %</strong> au ' + p.label + '</li>';
      }).join('') + '</ul></section>';
  }

  out += '<p class="sondages-source">' + DATA.sourcesSondages + '</p>';

  root.innerHTML = out;
})();
