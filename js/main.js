/* ============================================================
   Twilight Wolf — main.js
   Boot: initialize systems, register screens, show the intro.

   Adding a screen in a later phase:
     1. <section class="screen" id="screen-foo"> in index.html
     2. js/screens/foo.js defining TW.Screens.foo {init, el, onEnter,
        onExit, handleInput} + a <script> tag for it
     3. Add "foo" to the SCREENS list below.
   ============================================================ */
(function (TW) {
  "use strict";

  var SCREENS = ["intro", "menu", "settings", "quit", "game"];

  function boot() {
    TW.Audio.init();
    TW.Ambient.init();

    SCREENS.forEach(function (name) {
      var screen = TW.Screens[name];
      screen.init();
      TW.ScreenManager.register(name, screen);
    });

    // Keyboard actions go to whichever screen is active.
    TW.Input.init(function (action, event) {
      return TW.ScreenManager.dispatchInput(action, event);
    });

    TW.ScreenManager.transition("intro");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})(window.TW = window.TW || {});
