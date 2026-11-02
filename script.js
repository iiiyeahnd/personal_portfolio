/* Copy buttons for the email and phone number */
(function () {
  var buttons = document.querySelectorAll('[data-copy]');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.getAttribute('data-copy'));
      if (!el) return;
      var text = el.textContent.trim();

      function select() {
        try {
          var range = document.createRange();
          range.selectNodeContents(el);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } catch (e) {}
      }
      function say(msg) {
        b.textContent = msg;
        setTimeout(function () { b.textContent = 'Copy'; }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { say('Copied'); },
          function () { select(); say('Selected'); }
        );
      } else {
        select();
        say('Selected');
      }
    });
  });
})();
