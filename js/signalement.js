(function () {
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvgewbp';
  var FALLBACK_EMAIL = 'm.becan.pro@gmail.com';
  var MAX_LEN = 1000;

  function escapeAttr(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function mailtoFallback(contexte, message) {
    var subject = encodeURIComponent('Signalement — ' + contexte);
    var body = encodeURIComponent(message + '\n\n---\nContexte : ' + contexte + '\nPage : ' + window.location.href);
    window.location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + subject + '&body=' + body;
  }

  // Génère le HTML d'un widget "Signaler une erreur" à insérer dans une page.
  // Le contexte (nom de page / section concernée) est capturé automatiquement,
  // l'utilisateur ne saisit que son message. Envoi direct via Formspree (pas de
  // backend propre, site statique) ; repli sur mailto: si la requête échoue
  // (hors-ligne, service indisponible) pour ne jamais perdre le message.
  function renderSignalement(contexte) {
    return '<div class="signalement-widget" data-contexte="' + escapeAttr(contexte) + '">' +
      '<button type="button" class="signalement-toggle">🚩 Signaler une erreur</button>' +
      '<div class="signalement-form" hidden>' +
        '<textarea class="signalement-textarea" maxlength="' + MAX_LEN + '" placeholder="Décrivez l\'erreur constatée…" aria-label="Décrivez l\'erreur constatée"></textarea>' +
        '<div class="signalement-footer">' +
          '<span class="signalement-counter">0/' + MAX_LEN + '</span>' +
          '<button type="button" class="signalement-send" disabled>Envoyer</button>' +
        '</div>' +
        '<p class="signalement-status" hidden></p>' +
      '</div>' +
    '</div>';
  }

  function initSignalementWidgets(scope) {
    scope = scope || document;
    var widgets = scope.querySelectorAll('.signalement-widget');
    Array.prototype.forEach.call(widgets, function (w) {
      if (w.getAttribute('data-wired')) return;
      w.setAttribute('data-wired', '1');

      var contexte = w.getAttribute('data-contexte') || 'Page non identifiée';
      var toggle = w.querySelector('.signalement-toggle');
      var formEl = w.querySelector('.signalement-form');
      var textarea = w.querySelector('.signalement-textarea');
      var counter = w.querySelector('.signalement-counter');
      var sendBtn = w.querySelector('.signalement-send');
      var statusEl = w.querySelector('.signalement-status');

      toggle.addEventListener('click', function () {
        formEl.hidden = !formEl.hidden;
        if (!formEl.hidden) textarea.focus();
      });

      textarea.addEventListener('input', function () {
        var len = textarea.value.length;
        counter.textContent = len + '/' + MAX_LEN;
        sendBtn.disabled = len === 0;
      });

      sendBtn.addEventListener('click', function () {
        var message = textarea.value.trim();
        if (!message) return;

        sendBtn.disabled = true;
        sendBtn.textContent = 'Envoi…';
        statusEl.hidden = true;

        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            message: message,
            contexte: contexte,
            page: window.location.href,
            _subject: 'Signalement — ' + contexte
          })
        }).then(function (res) {
          if (!res.ok) throw new Error('Formspree error ' + res.status);
          statusEl.textContent = '✅ Message envoyé, merci pour votre signalement !';
          statusEl.className = 'signalement-status signalement-status-ok';
          statusEl.hidden = false;
          textarea.value = '';
          counter.textContent = '0/' + MAX_LEN;
          sendBtn.textContent = 'Envoyer';
          sendBtn.disabled = true;
        }).catch(function () {
          statusEl.textContent = 'Envoi direct impossible — ouverture de votre client mail avec le message pré-rempli.';
          statusEl.className = 'signalement-status signalement-status-fallback';
          statusEl.hidden = false;
          sendBtn.textContent = 'Envoyer';
          sendBtn.disabled = false;
          mailtoFallback(contexte, message);
        });
      });
    });
  }

  window.renderSignalement = renderSignalement;
  window.initSignalementWidgets = initSignalementWidgets;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initSignalementWidgets(document); });
  } else {
    initSignalementWidgets(document);
  }
})();
