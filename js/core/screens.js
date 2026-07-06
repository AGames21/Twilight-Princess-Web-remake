/* ============================================================
   Twilight Wolf — core/screens.js
   TW.ScreenManager — registry + fade transitions between screens.

   A screen is:
     {
       el:          <section.screen> element,
       onEnter:     function (params) {}   optional
       onExit:      function () {}         optional
       handleInput: function (action, ev)  optional; return false to
                                           let the event pass through
     }

   Phase 2+: gameplay scenes are just more screens. Register them in
   js/main.js and call TW.ScreenManager.transition("yourScene", params).
   ============================================================ */
(function (TW) {
  "use strict";

  var screens = {};   // name -> screen object
  var activeName = null;
  var busy = false;   // ignore input & transitions mid-fade

  TW.ScreenManager = {

    register: function (name, screen) {
      screens[name] = screen;
    },

    current: function () {
      return activeName;
    },

    isBusy: function () {
      return busy;
    },

    /* Fade out the active screen, then fade in `name`.
       `params` is forwarded to the target screen's onEnter. */
    transition: function (name, params) {
      var next = screens[name];
      if (!next || busy || name === activeName) return;

      var prev = activeName ? screens[activeName] : null;
      var fadeMs = TW.CONFIG.timing.screenFade;
      busy = true;

      function activate() {
        if (prev) {
          prev.el.classList.remove("screen--active", "screen--exit");
          if (prev.onExit) prev.onExit();
        }
        activeName = name;
        next.el.classList.add("screen--active");
        if (next.onEnter) next.onEnter(params || {});
        busy = false;
      }

      if (prev) {
        prev.el.classList.add("screen--exit");
        window.setTimeout(activate, fadeMs);
      } else {
        activate(); // first screen: no exit fade
      }
    },

    /* Route a semantic input action to the active screen. */
    dispatchInput: function (action, event) {
      if (busy || !activeName) return false;
      var screen = screens[activeName];
      if (screen && screen.handleInput) {
        return screen.handleInput(action, event);
      }
      return false;
    }
  };

})(window.TW = window.TW || {});
