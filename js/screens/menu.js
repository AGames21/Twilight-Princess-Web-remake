/* ============================================================
   Twilight Wolf — screens/menu.js
   Main menu: New Game / Continue / Settings / Quit with a
   glowing wolf-eye cursor that slides between options.
   Also defines the small Quit screen ("the forest sleeps…").
   ============================================================ */
(function (TW) {
  "use strict";

  TW.Screens = TW.Screens || {};

  var el, cursor, items = [];
  var selected = 0;

  /* ---------- selection & cursor ---------- */

  function isDisabled(i) {
    return items[i].classList.contains("is-disabled");
  }

  function positionCursor() {
    var item = items[selected];
    if (!item || !cursor) return;
    var y = item.offsetTop + item.offsetHeight / 2 - cursor.offsetHeight / 2;
    cursor.style.transform = "translateY(" + y + "px)";
  }

  function setSelected(i, opts) {
    opts = opts || {};
    if (i === selected && !opts.force) return;
    items.forEach(function (btn, idx) {
      btn.classList.toggle("is-selected", idx === i);
    });
    selected = i;
    positionCursor();
    if (!opts.silent) TW.Audio.playSfx("move");
  }

  function move(dir) {
    var n = items.length;
    setSelected((selected + dir + n) % n);
  }

  /* ---------- activation ---------- */

  function activate(i) {
    setSelected(i, { silent: true, force: true });
    var btn = items[i];
    var action = btn.dataset.action;

    if (isDisabled(i)) {
      TW.Audio.playSfx("error");
      btn.classList.remove("shake");
      void btn.offsetWidth; // restart the animation
      btn.classList.add("shake");
      return;
    }

    switch (action) {
      case "newgame":
        TW.Audio.playSfx("confirm");
        // Phase 2 handoff: the game screen receives mode:"new" and owns
        // everything from here (tutorial/prologue). See js/screens/game.js.
        TW.ScreenManager.transition("game", { mode: "new" });
        break;
      case "continue":
        TW.Audio.playSfx("confirm");
        TW.ScreenManager.transition("game", { mode: "continue", save: TW.Save.load() });
        break;
      case "settings":
        TW.Audio.playSfx("confirm");
        TW.ScreenManager.transition("settings");
        break;
      case "quit":
        TW.Audio.playSfx("back");
        TW.Audio.stopMusic();
        TW.ScreenManager.transition("quit");
        break;
    }
  }

  /* ---------- screen object ---------- */

  TW.Screens.menu = {

    get el() { return el; },

    init: function () {
      el = document.getElementById("screen-menu");
      cursor = document.getElementById("menu-cursor");
      items = Array.prototype.slice.call(el.querySelectorAll(".menu-item"));

      items.forEach(function (btn, i) {
        // Hover moves the cursor (mouse); tap selects + activates (touch).
        btn.addEventListener("pointerenter", function () {
          if (i !== selected) setSelected(i);
        });
        btn.addEventListener("click", function () {
          activate(i);
        });
      });

      window.addEventListener("resize", positionCursor);
    },

    onEnter: function () {
      // "Continue" is only available once a save exists.
      var canContinue = TW.Save.hasSave();
      items.forEach(function (btn) {
        if (btn.dataset.action === "continue") {
          btn.classList.toggle("is-disabled", !canContinue);
          btn.setAttribute("aria-disabled", String(!canContinue));
        }
      });
      setSelected(0, { silent: true, force: true });
      // Re-measure once the section is visible and laid out.
      window.requestAnimationFrame(positionCursor);
    },

    onExit: function () {},

    handleInput: function (action) {
      switch (action) {
        case "up":      move(-1);           return true;
        case "down":    move(1);            return true;
        case "confirm": activate(selected); return true;
        default:                            return false;
      }
    }
  };

  /* ---------- quit screen ---------- */

  var quitEl;

  function returnToTitle() {
    TW.Audio.playSfx("back");
    TW.ScreenManager.transition("intro");
  }

  TW.Screens.quit = {

    get el() { return quitEl; },

    init: function () {
      quitEl = document.getElementById("screen-quit");
      document.getElementById("quit-return").addEventListener("click", returnToTitle);
    },

    onEnter: function () {},
    onExit: function () {},

    handleInput: function (action) {
      if (action === "confirm" || action === "back") {
        returnToTitle();
        return true;
      }
      return false;
    }
  };

})(window.TW = window.TW || {});
