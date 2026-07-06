/* ============================================================
   Twilight Wolf — core/save.js
   TW.Save — localStorage-backed save slot (stub).
   Phase 1 only needs hasSave() so the menu can grey out
   "Continue"; the data shape below is the Phase 2 contract.
   ============================================================ */
(function (TW) {
  "use strict";

  var KEY = null; // resolved from TW.CONFIG on first use

  function key() {
    if (!KEY) KEY = TW.CONFIG.storage.save;
    return KEY;
  }

  TW.Save = {

    hasSave: function () {
      try {
        return window.localStorage.getItem(key()) !== null;
      } catch (e) {
        return false; // storage blocked (private mode etc.)
      }
    },

    /* Returns the parsed save object, or null. */
    load: function () {
      try {
        var raw = window.localStorage.getItem(key());
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        console.warn("[TW.Save] load failed:", e);
        return null;
      }
    },

    /* Phase 2 contract: pass the full game-state snapshot.
       { version: 1, scene: "prologue", progress: {...}, savedAt: ISO } */
    save: function (data) {
      try {
        var record = Object.assign({ version: 1, savedAt: new Date().toISOString() }, data);
        window.localStorage.setItem(key(), JSON.stringify(record));
        return true;
      } catch (e) {
        console.warn("[TW.Save] save failed:", e);
        return false;
      }
    },

    clear: function () {
      try {
        window.localStorage.removeItem(key());
      } catch (e) { /* ignore */ }
    }
  };

})(window.TW = window.TW || {});
