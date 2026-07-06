/* ============================================================
   Twilight Wolf — screens/settings.js
   Settings shell. The volume sliders are live (wired into
   TW.Audio and persisted); the "Gameplay" rows are visual
   placeholders for later phases.
   ============================================================ */
(function (TW) {
  "use strict";

  TW.Screens = TW.Screens || {};

  var el, sliders = [], backBtn;

  function goBack() {
    TW.Audio.playSfx("back");
    TW.ScreenManager.transition("menu");
  }

  function syncSlidersFromAudio() {
    sliders.forEach(function (slider) {
      slider.value = Math.round(TW.Audio.getVolume(slider.dataset.volume) * 100);
    });
  }

  TW.Screens.settings = {

    get el() { return el; },

    init: function () {
      el = document.getElementById("screen-settings");
      sliders = Array.prototype.slice.call(el.querySelectorAll("input[data-volume]"));
      backBtn = document.getElementById("settings-back");

      sliders.forEach(function (slider) {
        slider.addEventListener("input", function () {
          TW.Audio.setVolume(slider.dataset.volume, slider.value / 100);
        });
        // A click of feedback when the user lets go of a slider.
        slider.addEventListener("change", function () {
          TW.Audio.playSfx("select");
        });
      });

      backBtn.addEventListener("click", goBack);
    },

    onEnter: function () {
      syncSlidersFromAudio();
    },

    onExit: function () {},

    handleInput: function (action, event) {
      if (action === "back") {
        goBack();
        return true;
      }
      // Up/down walks the focusable controls so keyboard users can reach
      // the sliders; left/right on a focused slider is native behavior.
      if (action === "up" || action === "down") {
        var focusables = sliders.concat([backBtn]);
        var idx = focusables.indexOf(document.activeElement);
        var next;
        if (idx === -1) {
          next = 0;
        } else {
          var n = focusables.length;
          next = (idx + (action === "down" ? 1 : -1) + n) % n;
        }
        focusables[next].focus();
        TW.Audio.playSfx("move");
        return true;
      }
      if (action === "confirm" && document.activeElement === backBtn) {
        return false; // let the browser fire the button's click
      }
      return false;
    }
  };

})(window.TW = window.TW || {});
