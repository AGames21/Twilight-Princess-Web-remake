/* ============================================================
   Twilight Wolf — screens/intro.js
   Title splash: logo glow-in, pulsing "Press Start / Tap to
   Begin". Any key or tap advances to the main menu; that first
   gesture also unlocks audio and starts the title music.
   ============================================================ */
(function (TW) {
  "use strict";

  TW.Screens = TW.Screens || {};

  var el;

  function advance() {
    if (TW.ScreenManager.isBusy() || TW.ScreenManager.current() !== "intro") return;
    TW.Audio.unlock();
    TW.Audio.playMusic("title");
    TW.Audio.playSfx("confirm");
    TW.ScreenManager.transition("menu");
  }

  TW.Screens.intro = {

    get el() { return el; },

    init: function () {
      el = document.getElementById("screen-intro");
      // Tap/click anywhere on the splash advances (not just the button).
      el.addEventListener("pointerdown", advance);
    },

    onEnter: function () {},
    onExit: function () {},

    /* Any key advances the splash. */
    handleInput: function () {
      advance();
      return true;
    }
  };

})(window.TW = window.TW || {});
