/* ============================================================
   Twilight Wolf — core/input.js
   TW.Input — normalizes keyboard input into semantic actions
   and routes them to the active screen via a single handler.

   Actions: up | down | left | right | confirm | back
   (Pointer/touch interaction is handled by each screen's own DOM
   listeners — buttons already give tap + click for free.)
   ============================================================ */
(function (TW) {
  "use strict";

  var KEYMAP = {
    "ArrowUp": "up",     "KeyW": "up",
    "ArrowDown": "down", "KeyS": "down",
    "ArrowLeft": "left", "KeyA": "left",
    "ArrowRight": "right","KeyD": "right",
    "Enter": "confirm",  "Space": "confirm", "NumpadEnter": "confirm",
    "Escape": "back",    "Backspace": "back"
  };

  var handler = null;

  function onKeyDown(e) {
    if (!handler) return;
    var action = KEYMAP[e.code];
    if (!action) return;

    // Don't steal keys from focused form controls (settings sliders):
    // left/right/up/down there belong to the native control.
    var t = e.target;
    var inControl = t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA");
    if (inControl && action !== "confirm" && action !== "back") return;

    var consumed = handler(action, e);
    if (consumed !== false) e.preventDefault();
  }

  TW.Input = {
    /* fn(action, event) — return false to leave the event alone. */
    init: function (fn) {
      handler = fn;
      window.addEventListener("keydown", onKeyDown);
    }
  };

})(window.TW = window.TW || {});
