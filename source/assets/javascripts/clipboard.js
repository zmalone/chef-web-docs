/*
  Adapted from:
   http://www.sitepoint.com/javascript-copy-to-clipboard/
   http://stackoverflow.com/questions/20575927/javascript-highlight-html-table-cell-onclick-and-copy-value-with-ctrl-c
*/
(function() {
  'use strict';

  // click events
  document.body.addEventListener('click', copy, true);

  // event handler
  function copy(e) {
    // find target element
    var 
        t = e.target,
        c = t.dataset.copytarget,
        inp = (c ? document.querySelector(c) : null);

    if (!inp) {
      return;
    }

    // select text
    inp.focus();
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.selectNode(inp.firstChild);
    selection.addRange(range);

    var succeeded = true;
    try {
      // copy text
      succeeded = document.execCommand('copy');
      inp.blur();
    }
    catch (err) {
      succeeded = false;
    }
    if (succeeded) {
      // show copied animation
      t.classList.add('copied');
      setTimeout(function() { t.classList.remove('copied'); }, 1500);
    }
    else {
      // show error message
      var m = "Your browser can't copy to the clipboard.\n\nPlease press Ctrl+C to copy.";
      if (navigator.appVersion.indexOf("Mac") !== -1) {
        m = "Your browser can't copy to the clipboard.\n\nPlease press Command+C to copy.";
      }
      alert(m);
    }
  }
})();