/* ============================================================
   Twilight Wolf — core/audio.js
   TW.Audio — Howler.js wrapper.

   The audio files are placeholders that don't exist yet, so every
   Howl registers an onloaderror handler that marks the sound
   unavailable; play calls then no-op. The UI must work perfectly
   with zero audio files present.
   ============================================================ */
(function (TW) {
  "use strict";

  var hasHowler = typeof window.Howl !== "undefined";
  var music = {};        // name -> { howl, ok }
  var sfx = {};          // name -> { howl, ok }
  var currentMusic = null;
  var volumes = { master: 0.8, music: 0.7, sfx: 0.8 };
  var unlocked = false;

  function makeHowl(src, loop, onOk) {
    var entry = { howl: null, ok: false };
    if (!hasHowler) return entry;
    entry.howl = new Howl({
      src: [src],
      loop: !!loop,
      preload: true,
      onload: function () {
        entry.ok = true;
        if (onOk) onOk(entry);
      },
      onloaderror: function (id, err) {
        entry.ok = false;
        console.warn("[TW.Audio] missing/failed audio (ok in Phase 1): " + src, err);
      }
    });
    return entry;
  }

  function applyMusicVolume() {
    var v = volumes.master * volumes.music;
    Object.keys(music).forEach(function (name) {
      if (music[name].howl) music[name].howl.volume(v);
    });
  }

  function loadSettings() {
    try {
      var raw = window.localStorage.getItem(TW.CONFIG.storage.settings);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.volumes) Object.assign(volumes, s.volumes);
      }
    } catch (e) { /* fall back to defaults */ }
  }

  function persistSettings() {
    try {
      window.localStorage.setItem(
        TW.CONFIG.storage.settings,
        JSON.stringify({ volumes: volumes })
      );
    } catch (e) { /* ignore */ }
  }

  TW.Audio = {

    init: function () {
      var cfg = TW.CONFIG.audio;
      Object.assign(volumes, cfg.defaults);
      loadSettings();

      if (!hasHowler) {
        console.warn("[TW.Audio] Howler.js not found — running silent.");
        return;
      }

      Object.keys(cfg.music).forEach(function (name) {
        music[name] = makeHowl(cfg.music[name], true, function (entry) {
          entry.howl.volume(volumes.master * volumes.music);
        });
      });
      Object.keys(cfg.sfx).forEach(function (name) {
        sfx[name] = makeHowl(cfg.sfx[name], false);
      });
      applyMusicVolume();
    },

    /* Call from the first user gesture (intro's "Press Start") —
       browsers block audio until then. Howler auto-resumes its
       AudioContext on a gesture; this just records that it's safe
       to start music now. */
    unlock: function () {
      unlocked = true;
    },

    playMusic: function (name) {
      if (!unlocked) return;
      if (currentMusic === name) return;
      if (currentMusic && music[currentMusic] && music[currentMusic].ok) {
        music[currentMusic].howl.fade(volumes.master * volumes.music, 0, 600);
        music[currentMusic].howl.once("fade", function (id) {
          this.stop(id);
        });
      }
      currentMusic = name;
      var entry = music[name];
      if (entry && entry.ok) {
        entry.howl.volume(volumes.master * volumes.music);
        entry.howl.play();
      }
    },

    stopMusic: function () {
      if (currentMusic && music[currentMusic] && music[currentMusic].ok) {
        music[currentMusic].howl.stop();
      }
      currentMusic = null;
    },

    /* names: move | select | confirm | back | error */
    playSfx: function (name) {
      var entry = sfx[name];
      if (!entry || !entry.ok) return;
      entry.howl.volume(volumes.master * volumes.sfx);
      entry.howl.play();
    },

    /* channel: master | music | sfx — value 0..1 */
    setVolume: function (channel, value) {
      if (!(channel in volumes)) return;
      volumes[channel] = Math.min(1, Math.max(0, value));
      applyMusicVolume();
      persistSettings();
    },

    getVolume: function (channel) {
      return volumes[channel];
    }
  };

})(window.TW = window.TW || {});
