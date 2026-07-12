(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('quiz-vf-root');
  if (!DATA || !root) return;

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }
  function renderSources(sources) {
    if (!sources || !sources.length) {
      return '<span class="source-badge source-unconfirmed">Source à confirmer</span>';
    }
    var links = sources.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="source-verify-link">🔍 Vérifier cette source' + (sources.length > 1 ? ' (' + s.nom + ')' : '') + '</a>';
    }).join(' · ');
    if (sources.length >= 2) links += ' <span class="source-crossref">' + sources.length + ' sources indépendantes</span>';
    return links;
  }
  function initials(nom) {
    return nom.split(' ').filter(function (w) { return /^[A-ZÀ-Ý]/.test(w); }).map(function (w) { return w[0]; }).slice(0, 2).join('');
  }

  // Construit le pool à partir des fact_checks déjà présents dans data/candidats.js —
  // pas de fichier séparé, une seule source de vérité.
  function buildPool() {
    var pool = [];
    DATA.candidats.forEach(function (c) {
      if (!c.fiche || !c.fact_checks || !c.fact_checks.length) return;
      c.fact_checks.forEach(function (fc) {
        if (!fc.sources || !fc.sources.length) return; // on n'inclut que les items réellement sourcés et cliquables
        if (!fc.quizAffirmation) return; // sécurité : jamais d'item sans version anonymisée (règle de neutralité stricte)
        pool.push({ candidat: c, fc: fc });
      });
    });
    return pool;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function verdictLabel(v) {
    if (v === 'vrai') return 'Vrai';
    if (v === 'partiellement_vrai') return 'Partiellement vrai';
    if (v === 'trompeur') return 'Trompeur';
    if (v === 'faux') return 'Faux';
    return v;
  }
  function verdictClass(v) {
    if (v === 'vrai') return 'stance-pour';
    if (v === 'partiellement_vrai') return 'stance-nuance';
    if (v === 'trompeur') return 'stance-contre';
    if (v === 'faux') return 'stance-contre';
    return 'stance-nuance';
  }
  // Une affirmation "partiellement vraie" est comptée juste si l'utilisateur répond
  // Vrai OU Trompeur (les deux sont des lectures raisonnables d'une vérité nuancée) —
  // seul "Faux" est compté faux dans ce cas. Voir la note méthodologique affichée en fin de quiz.
  function isCorrect(verdict, choice) {
    if (verdict === 'partiellement_vrai') return choice === 'vrai' || choice === 'trompeur';
    return verdict === choice;
  }

  var pool = shuffle(buildPool());
  var current = 0;
  var results = []; // { correct: bool }

  function render() {
    if (current >= pool.length) { renderEnd(); return; }
    var item = pool[current];
    var pct = Math.round((current / pool.length) * 100);

    var html = '';
    html += '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + pct + '%"></div></div>';
    html += '<div class="quiz-progress-label">Question ' + (current + 1) + '/' + pool.length + '</div>';
    html += '<div class="quiz-card">';
    html += '<p class="quiz-affirmation">' + (item.fc.quizAffirmation || item.fc.affirmation) + '</p>';
    html += '<div class="quiz-choices" id="quiz-choices">';
    html += '<button type="button" class="quiz-choice-btn" data-choice="vrai">✅ Vrai</button>';
    html += '<button type="button" class="quiz-choice-btn" data-choice="trompeur">⚠️ Trompeur</button>';
    html += '<button type="button" class="quiz-choice-btn" data-choice="faux">❌ Faux</button>';
    html += '</div>';
    html += '<div id="quiz-reveal"></div>';
    html += '</div>';

    root.innerHTML = html;

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (btn) {
      btn.addEventListener('click', function () { answer(btn.getAttribute('data-choice')); });
    });

    // Le contenu est régénéré à chaque question (innerHTML) : sans repositionner le focus,
    // un utilisateur au clavier perdrait le focus (renvoyé en haut de page) à chaque clic/Entrée
    // et devrait retabuler depuis le début — on ramène donc le focus sur le premier choix.
    var firstChoice = root.querySelector('.quiz-choice-btn');
    if (firstChoice) firstChoice.focus();
  }

  function answer(choice) {
    var item = pool[current];
    var correct = isCorrect(item.fc.verdict, choice);
    results.push({ correct: correct });

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (btn) {
      btn.disabled = true;
      if (btn.getAttribute('data-choice') === choice) btn.classList.add('quiz-choice-selected');
    });

    var bloc = blocInfo(item.candidat.bloc);
    var revealEl = document.getElementById('quiz-reveal');
    var html = '<div class="quiz-reveal-box">';
    html += '<div class="quiz-reveal-verdict"><span class="stance ' + verdictClass(item.fc.verdict) + '">' + verdictLabel(item.fc.verdict) + '</span> ' +
      (correct ? '<span class="quiz-reveal-outcome quiz-ok">Vous avez vu juste</span>' : '<span class="quiz-reveal-outcome quiz-ko">Pas tout à fait</span>') + '</div>';
    if (item.fc.explication) html += '<p class="quiz-reveal-explication">' + item.fc.explication + '</p>';
    if (item.fc.mecanisme) html += '<p class="quiz-reveal-mecanisme">🔍 <strong>Mécanique repérée :</strong> ' + item.fc.mecanisme + '</p>';
    html += '<p class="quiz-reveal-source">' + renderSources(item.fc.sources) + (item.fc.date ? ' · ' + item.fc.date : '') + '</p>';
    html += '<div class="quiz-reveal-candidat">';
    html += '<div class="avatar" style="width:40px;height:40px;font-size:0.95rem;background:' + bloc.couleur + '33; color:' + bloc.couleur + ';">' + initials(item.candidat.nom) + '</div>';
    html += '<div>Prononcé par <a href="candidats/' + item.candidat.slug + '.html">' + item.candidat.nom + '</a> (' + item.candidat.parti + ')</div>';
    html += '</div>';
    html += '<button type="button" class="quiz-next-btn" id="quiz-next-btn">' + (current + 1 < pool.length ? 'Question suivante →' : 'Voir mon score →') + '</button>';
    html += '</div>';
    revealEl.innerHTML = html;

    var nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.addEventListener('click', function () {
      current++;
      render();
    });
    // Idem : le bouton cliqué vient d'être désactivé (les choix sont verrouillés après réponse),
    // ce qui renvoie le focus en haut de page — on le ramène directement sur l'action à suivre.
    nextBtn.focus();
  }

  function renderEnd() {
    var score = results.filter(function (r) { return r.correct; }).length;
    var total = results.length;
    var ratio = total ? score / total : 0;

    var message;
    if (ratio >= 0.8) {
      message = "Très bon œil critique. Le réflexe de vérifier une affirmation avant de la partager reste utile même quand on a l'habitude de bien deviner.";
    } else if (ratio >= 0.5) {
      message = "Un bon score. Ni les intuitions ni les a priori politiques ne garantissent de repérer une affirmation trompeuse — la vérification systématique des sources reste le réflexe le plus fiable.";
    } else {
      message = "Repérer une affirmation trompeuse à l'oreille est difficile pour tout le monde, quel que soit le bord politique du candidat qui la prononce — c'est justement pour ça que la vérification des sources compte.";
    }

    var html = '<div class="quiz-end">';
    html += '<div class="quiz-end-score">' + score + '<span class="quiz-end-total">/' + total + '</span></div>';
    html += '<p class="quiz-end-label">affirmations correctement identifiées</p>';
    html += '<p class="quiz-end-message">' + message + '</p>';
    html += '<button type="button" class="quiz-next-btn" id="quiz-replay-btn">🔁 Rejouer</button> ';
    html += '<a class="back-link" href="index.html" style="margin-left:0.6rem;">← Retour à l\'accueil</a>';
    html += '<p class="no-data" style="margin-top:1.2rem;">Ce quiz s\'appuie sur ' + pool.length + ' affirmations vérifiées et sourcées à ce jour ; le pool s\'enrichira au fil de la campagne. Une affirmation jugée « partiellement vraie » est comptée correcte si vous avez répondu Vrai ou Trompeur.</p>';
    html += '</div>';
    root.innerHTML = html;

    var replayBtn = document.getElementById('quiz-replay-btn');
    replayBtn.addEventListener('click', function () {
      pool = shuffle(buildPool());
      current = 0;
      results = [];
      render();
    });
    replayBtn.focus();
  }

  if (!pool.length) {
    root.innerHTML = '<p class="no-data">Aucune affirmation disponible pour le moment. Revenez plus tard.</p>';
    return;
  }

  render();
})();
