/* ============================================================
   Twilight Wolf — screens/game.js

   PHASE 2 HANDOFF POINT
   =====================
   This stub is the seam where real gameplay begins. The main menu
   already routes here:

     New Game  → transition("game", { mode: "new" })
     Continue  → transition("game", { mode: "continue", save: {...} })

   To build the tutorial/prologue in Phase 2:
     1. Replace the contents of onEnter() below with scene setup
        (load the prologue scene, start bgm "prologue", etc.).
     2. Add gameplay screens as sibling modules in js/screens/ and
        <section class="screen"> elements in index.html, register
        them in js/main.js — no menu or core changes required.
     3. On "New Game", create the initial save via TW.Save.save(...)
        once the player passes the first checkpoint.
   ============================================================ */
(function (TW) {
  "use strict";

  TW.Screens = TW.Screens || {};

  var el, modeLabel;

  function backToTitle() {
    TW.Audio.playSfx("back");
    TW.Audio.playMusic("title");
    TW.ScreenManager.transition("menu");
  }

  TW.Screens.game = {

    get el() { return el; },

    init: function () {
      el = document.getElementById("screen-game");
      modeLabel = document.getElementById("game-mode-label");
      document.getElementById("game-back").addEventListener("click", backToTitle);
    },

    /* params: { mode: "new" } or { mode: "continue", save: {...} } */
    onEnter: function (params) {
      TW.Audio.playMusic("prologue");
      if (params.mode === "continue" && params.save) {
        modeLabel.textContent = "Continuing — saved " +
          new Date(params.save.savedAt).toLocaleDateString();
      } else {
        modeLabel.textContent = "Prologue — New Journey";
      }
    },

    onExit: function () {},

    handleInput: function (action) {
      if (action === "back") {
        backToTitle();
        return true;
      }
      return false;
    }
  };

})(window.TW = window.TW || {});
