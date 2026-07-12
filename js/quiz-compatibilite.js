(function () {
  var DATA = window.SITE_DATA;
  var root = document.getElementById('quiz-compat-root');
  if (!DATA || !root || !DATA.quizCompatQuestions) return;

  // Fisher-Yates, exécuté une seule fois à l'ouverture du quiz : évite les effets d'ordre
  // et empêche de deviner un schéma politique via le regroupement thématique visible.
  // Conservé en mémoire JS pour la session (pas de re-mélange si on utilise "Précédent").
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  var questions = shuffleArray(DATA.quizCompatQuestions);
  var extensionQuestions = shuffleArray(DATA.quizCompatExtensionQuestions || []);
  var candidats = DATA.candidats.filter(function (c) { return c.fiche && c.quizCompatScores; });
  var currentExt = 0;
  var extensionDone = false;

  var current = 0;
  var answers = {};

  var OPTIONS = [
    { value: 2, label: "Tout à fait d'accord" },
    { value: 1, label: "Plutôt d'accord" },
    { value: 0, label: "Neutre / Je ne sais pas" },
    { value: -1, label: "Plutôt pas d'accord" },
    { value: -2, label: "Pas du tout d'accord" }
  ];

  // Événements GoatCounter : démarrage, vue de chaque question (proxy simple pour repérer
  // où les abandons se concentrent) et complétion. Silencieux si le script est bloqué/absent.
  function trackEvent(path, title) {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: path, title: title, event: true });
    }
  }

  function blocInfo(id) { return DATA.blocs.find(function (b) { return b.id === id; }); }
  function initials(nom) {
    return nom.split(' ').filter(function (w) { return /^[A-ZÀ-Ý]/.test(w); }).map(function (w) { return w[0]; }).slice(0, 2).join('');
  }

  function renderQuestion() {
    var q = questions[current];
    var pct = Math.round((current / questions.length) * 100);
    var selected = answers.hasOwnProperty(q.id) ? answers[q.id] : null;

    trackEvent('quiz-compat/question-' + (current + 1), 'Quiz compatibilité — Question ' + (current + 1) + '/' + questions.length);

    var html = '';
    html += '<div class="quiz-progress quiz-progress-compat"><div class="quiz-progress-bar" style="width:' + pct + '%"></div></div>';
    html += '<div class="quiz-progress-label">Question ' + (current + 1) + '/' + questions.length + '</div>';
    html += '<div class="quiz-card quiz-card-compat">';
    html += '<p class="quiz-affirmation">' + q.texte + '</p>';
    html += '<div class="quiz-compat-options" id="quiz-compat-options">';
    OPTIONS.forEach(function (opt) {
      var sel = selected === opt.value ? ' quiz-choice-selected' : '';
      html += '<button type="button" class="quiz-choice-btn' + sel + '" data-value="' + opt.value + '">' + opt.label + '</button>';
    });
    html += '</div>';
    html += '<div class="quiz-compat-nav">';
    html += '<button type="button" class="quiz-back-btn" id="quiz-back-btn"' + (current === 0 ? ' disabled' : '') + '>← Précédent</button>';
    html += '<button type="button" class="quiz-next-btn quiz-next-btn-compat" id="quiz-next-btn"' + (selected === null ? ' disabled' : '') + '>' + (current + 1 < questions.length ? 'Suivant →' : 'Voir mes résultats →') + '</button>';
    html += '</div>';
    html += '</div>';

    root.innerHTML = html;

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (btn) {
      btn.addEventListener('click', function () {
        var val = parseFloat(btn.getAttribute('data-value'));
        answers[q.id] = val;
        Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (b) { b.classList.remove('quiz-choice-selected'); });
        btn.classList.add('quiz-choice-selected');
        document.getElementById('quiz-next-btn').disabled = false;
      });
    });

    document.getElementById('quiz-back-btn').addEventListener('click', function () {
      if (current > 0) { current--; renderQuestion(); }
    });
    document.getElementById('quiz-next-btn').addEventListener('click', function () {
      if (!answers.hasOwnProperty(q.id)) return;
      if (current + 1 < questions.length) { current++; renderQuestion(); }
      else { renderResults(); }
    });

    // Le contenu est régénéré à chaque question (innerHTML) : sans repositionner le focus,
    // un utilisateur au clavier perdrait le focus à chaque Suivant/Précédent et devrait
    // retabuler depuis le début — on ramène le focus sur le choix déjà sélectionné (ou le 1er).
    var toFocus = root.querySelector('.quiz-choice-selected') || root.querySelector('.quiz-choice-btn');
    if (toFocus) toFocus.focus();
  }

  // Questions d'extension (thèmes V5) : posées uniquement si l'utilisateur clique "Affiner
  // mon résultat" après les résultats. Les réponses s'ajoutent au même objet `answers` que
  // le quiz principal — computeScores() n'a pas besoin de logique séparée pour en tenir compte.
  function renderExtensionQuestion() {
    var q = extensionQuestions[currentExt];
    var pct = Math.round((currentExt / extensionQuestions.length) * 100);
    var selected = answers.hasOwnProperty(q.id) ? answers[q.id] : null;

    var html = '';
    html += '<div class="quiz-progress quiz-progress-compat"><div class="quiz-progress-bar" style="width:' + pct + '%"></div></div>';
    html += '<div class="quiz-progress-label">Question complémentaire ' + (currentExt + 1) + '/' + extensionQuestions.length + '</div>';
    html += '<div class="quiz-card quiz-card-compat">';
    html += '<p class="quiz-affirmation">' + q.texte + '</p>';
    html += '<div class="quiz-compat-options" id="quiz-compat-options">';
    OPTIONS.forEach(function (opt) {
      var sel = selected === opt.value ? ' quiz-choice-selected' : '';
      html += '<button type="button" class="quiz-choice-btn' + sel + '" data-value="' + opt.value + '">' + opt.label + '</button>';
    });
    html += '</div>';
    html += '<div class="quiz-compat-nav">';
    html += '<button type="button" class="quiz-back-btn" id="quiz-back-btn"' + (currentExt === 0 ? ' disabled' : '') + '>← Précédent</button>';
    html += '<button type="button" class="quiz-next-btn quiz-next-btn-compat" id="quiz-next-btn"' + (selected === null ? ' disabled' : '') + '>' + (currentExt + 1 < extensionQuestions.length ? 'Suivant →' : 'Voir mon résultat affiné →') + '</button>';
    html += '</div>';
    html += '</div>';

    root.innerHTML = html;

    Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (btn) {
      btn.addEventListener('click', function () {
        var val = parseFloat(btn.getAttribute('data-value'));
        answers[q.id] = val;
        Array.prototype.forEach.call(root.querySelectorAll('.quiz-choice-btn'), function (b) { b.classList.remove('quiz-choice-selected'); });
        btn.classList.add('quiz-choice-selected');
        document.getElementById('quiz-next-btn').disabled = false;
      });
    });

    document.getElementById('quiz-back-btn').addEventListener('click', function () {
      if (currentExt > 0) { currentExt--; renderExtensionQuestion(); }
    });
    document.getElementById('quiz-next-btn').addEventListener('click', function () {
      if (!answers.hasOwnProperty(q.id)) return;
      if (currentExt + 1 < extensionQuestions.length) { currentExt++; renderExtensionQuestion(); }
      else { extensionDone = true; renderResults(); }
    });

    var toFocusExt = root.querySelector('.quiz-choice-selected') || root.querySelector('.quiz-choice-btn');
    if (toFocusExt) toFocusExt.focus();
  }

  function computeScores() {
    var results = [];
    candidats.forEach(function (c) {
      var totalGap = 0, count = 0;
      Object.keys(answers).forEach(function (qid) {
        var userVal = answers[qid];
        if (userVal === 0) return; // neutre exclu du calcul
        var candVal = c.quizCompatScores[qid];
        if (typeof candVal !== 'number') return;
        totalGap += Math.abs(userVal - candVal);
        count++;
      });
      var pct = count ? Math.round(100 * (1 - totalGap / (4 * count))) : 0;
      results.push({ candidat: c, pct: pct, count: count });
    });
    results.sort(function (a, b) { return b.pct - a.pct; });
    return results;
  }

  function renderResults() {
    trackEvent('quiz-compat/complete', 'Quiz compatibilité — terminé');
    var answeredCount = Object.keys(answers).filter(function (k) { return answers[k] !== 0; }).length;
    if (answeredCount === 0) {
      root.innerHTML = '<p class="no-data" tabindex="-1">Vous avez répondu « neutre » à toutes les questions — impossible de calculer une compatibilité. <a href="quiz-compatibilite.html">Recommencer</a></p>';
      root.querySelector('.no-data').focus();
      return;
    }

    var results = computeScores();
    var top3 = results.slice(0, 3);

    var html = '<div class="quiz-compat-results">';
    html += '<h2 class="quiz-compat-results-title" tabindex="-1">Vos 3 candidats les plus compatibles</h2>';
    html += '<div class="quiz-compat-bars">';
    top3.forEach(function (r, i) {
      var bloc = blocInfo(r.candidat.bloc);
      html += '<a class="quiz-compat-bar-row" href="candidats/' + r.candidat.slug + '.html">';
      html += '<div class="avatar" style="width:44px;height:44px;font-size:1rem;background:' + bloc.couleur + '33; color:' + bloc.couleur + ';">' + initials(r.candidat.nom) + '</div>';
      html += '<div class="quiz-compat-bar-main">';
      var statutTxt = r.candidat.statut === 'qualifie_2nd_tour' ? ' <span class="statut-pill statut-qualifie">🟢 Qualifié·e pour le 2nd tour</span>' :
        (r.candidat.statut === 'elimine_1er_tour' ? ' <span class="statut-pill statut-elimine">⚪ Éliminé·e au 1er tour</span>' : '');
      html += '<div class="quiz-compat-bar-label"><strong>' + r.candidat.nom + '</strong> <span class="quiz-compat-bar-parti">' + r.candidat.parti + '</span>' + statutTxt + '</div>';
      html += '<div class="quiz-compat-bar-track"><div class="quiz-compat-bar-fill" data-target="' + r.pct + '" style="width:0%; background:' + bloc.couleur + ';"></div></div>';
      html += '</div>';
      html += '<div class="quiz-compat-bar-pct">' + r.pct + '%</div>';
      html += '</a>';
    });
    html += '</div>';

    var compareSlugs = top3.map(function (r) { return r.candidat.slug; }).join(',');
    html += '<div class="quiz-compat-actions">';
    html += '<a class="quiz-next-btn" href="comparateur.html?c=' + compareSlugs + '">🔀 Comparer ces 3 candidats</a>';
    html += '<button type="button" class="quiz-next-btn quiz-next-btn-compat" id="quiz-memo-btn">📄 Générer mon mémo personnel</button>';
    html += '</div>';

    if (extensionQuestions.length && !extensionDone) {
      html += '<button type="button" class="quiz-back-btn quiz-compat-extend-btn" id="quiz-extend-btn">➕ Affiner mon résultat avec ' + extensionQuestions.length + ' question' + (extensionQuestions.length > 1 ? 's' : '') + ' supplémentaire' + (extensionQuestions.length > 1 ? 's' : '') + '</button>';
    }

    html += '<p class="quiz-compat-disclaimer">Ce résultat est une aide à la réflexion basée sur vos réponses à quelques questions clés, pas un verdict. Ce site vous donne des sources, pas des vérités toutes faites : cliquez, recoupez, doutez — explorez les fiches candidats avant de vous décider, c\'est ça, voter en conscience.</p>';

    html += '<details class="quiz-compat-methodo"><summary>Comment ce score est calculé ? <span class="chevron">▸</span></summary>';
    html += '<div class="quiz-compat-methodo-content">';
    html += '<p><strong>D\'où viennent les positions des candidats ?</strong> Des programmes officiels, déclarations publiques et votes recensés sur chaque fiche candidat, synthétisés thème par thème.</p>';
    html += '<p><strong>Comment le calcul fonctionne :</strong> chacune de vos réponses (de « tout à fait d\'accord » à « pas du tout d\'accord ») est comparée à la position du candidat sur le même sujet. Plus l\'écart est petit sur l\'ensemble des questions, plus le pourcentage de compatibilité est élevé. Les réponses « neutre » ne comptent ni pour ni contre un candidat.</p>';
    html += '<p><strong>Les limites de l\'exercice :</strong> ' + Object.keys(answers).length + ' questions ne peuvent pas capturer toutes les nuances d\'un programme. Certaines positions de candidats reposent sur une synthèse éditoriale de leurs déclarations, pas sur un questionnaire qu\'ils auraient eux-mêmes rempli. Un score élevé ne signifie pas un accord total, ni un score bas un désaccord total.</p>';
    html += '</div></details>';

    html += '<div class="voter-banner" style="margin-top:1.5rem;">';
    html += '<div class="voter-banner-icon">📋</div>';
    html += '<div class="voter-banner-content">';
    html += '<strong>Êtes-vous inscrit·e sur les listes électorales ?</strong>';
    html += '<p>Pour voter à la présidentielle 2027, il faut être inscrit·e avant le <strong>vendredi 12 mars 2027</strong>. Vous avez déménagé récemment ? Vérifiez que votre inscription a bien été mise à jour.</p>';
    html += '<a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F34240" target="_blank" rel="noopener noreferrer" class="voter-banner-cta">Vérifier ou m\'inscrire sur service-public.fr →</a>';
    html += '</div></div>';

    html += '<button type="button" class="quiz-back-btn" id="quiz-restart-btn" style="margin-top:1.2rem;">🔁 Recommencer le quiz</button>';
    html += '</div>';

    root.innerHTML = html;

    // Anime les barres après affichage
    setTimeout(function () {
      Array.prototype.forEach.call(root.querySelectorAll('.quiz-compat-bar-fill'), function (bar) {
        bar.style.width = bar.getAttribute('data-target') + '%';
      });
    }, 50);

    document.getElementById('quiz-restart-btn').addEventListener('click', function () {
      current = 0; currentExt = 0; extensionDone = false; answers = {}; renderQuestion();
    });
    document.getElementById('quiz-memo-btn').addEventListener('click', function () {
      renderMemo(top3);
    });
    var extendBtn = document.getElementById('quiz-extend-btn');
    if (extendBtn) {
      extendBtn.addEventListener('click', function () {
        currentExt = 0;
        renderExtensionQuestion();
      });
    }

    // Transition depuis la dernière question (bouton détruit par le re-rendu) : on ramène
    // le focus sur le titre des résultats plutôt que de le laisser retomber en haut de page.
    root.querySelector('.quiz-compat-results-title').focus();
  }

  function renderMemo(top3) {
    document.body.classList.add('memo-print-mode');
    var today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    var html = '<div class="memo-card">';
    html += '<div class="memo-header">';
    html += '<div class="memo-header-title" tabindex="-1">🇫🇷 Mon mémo personnel — Présidentielle 2027</div>';
    html += '<div class="memo-header-date">Généré le ' + today + '</div>';
    html += '</div>';

    html += '<h3 class="memo-section-title">Mes candidats les plus compatibles</h3>';
    top3.forEach(function (r, i) {
      html += '<div class="memo-candidat">';
      html += '<div class="memo-candidat-rank">' + (i + 1) + '</div>';
      html += '<div class="memo-candidat-body">';
      html += '<div class="memo-candidat-nom">' + r.candidat.nom + ' <span class="memo-candidat-pct">' + r.pct + '%</span></div>';
      html += '<div class="memo-candidat-parti">' + r.candidat.parti + '</div>';
      if (r.candidat.idees && r.candidat.idees.length) {
        html += '<div class="memo-candidat-idees">' + r.candidat.idees.join(' · ') + '</div>';
      }
      html += '<div class="memo-candidat-lien">Fiche complète : presidentielle-2027 → candidats/' + r.candidat.slug + '.html</div>';
      html += '</div></div>';
    });

    html += '<h3 class="memo-section-title">Dates clés</h3>';
    html += '<ul class="memo-dates">';
    html += '<li><strong>Vendredi 12 mars 2027</strong> — date limite d\'inscription sur les listes électorales</li>';
    html += '<li><strong>Dimanche 18 avril 2027</strong> — 1er tour</li>';
    html += '<li><strong>Dimanche 2 mai 2027</strong> — 2nd tour</li>';
    html += '</ul>';

    html += '<p class="memo-disclaimer">Ce mémo est une aide personnelle basée sur vos réponses à 18 questions. Pensez à explorer les programmes complets avant de vous décider.</p>';

    html += '<div class="memo-actions">';
    html += '<button type="button" class="quiz-next-btn quiz-next-btn-compat" id="memo-print-btn">🖨️ Imprimer / Enregistrer en PDF</button>';
    html += '<button type="button" class="quiz-back-btn" id="memo-back-btn">← Retour aux résultats</button>';
    html += '</div>';
    html += '</div>';

    root.innerHTML = html;

    document.getElementById('memo-print-btn').addEventListener('click', function () { window.print(); });
    document.getElementById('memo-back-btn').addEventListener('click', function () {
      document.body.classList.remove('memo-print-mode');
      renderResults();
    });

    root.querySelector('.memo-header-title').focus();
  }

  if (!questions.length || !candidats.length) {
    root.innerHTML = '<p class="no-data">Quiz indisponible pour le moment.</p>';
    return;
  }

  trackEvent('quiz-compat/start', 'Quiz compatibilité — démarré');
  renderQuestion();
})();
