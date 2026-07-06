/* ============================================================
   Twilight Wolf — config.js
   Central config: asset paths, timings, defaults, storage keys.
   Every asset path listed here has a matching entry in
   MEDIA_MANIFEST.md — keep the two in sync.
   ============================================================ */
(function (TW) {
  "use strict";

  TW.CONFIG = {

    /* ---- Audio (placeholder paths — files supplied later; the
            audio system degrades silently while they're missing) ---- */
    audio: {
      music: {
        title:    "assets/audio/music/bgm_title_twilight.ogg",
        prologue: "assets/audio/music/bgm_prologue_forest.ogg"
      },
      sfx: {
        move:    "assets/audio/sfx/sfx_ui_move.ogg",
        select:  "assets/audio/sfx/sfx_ui_select.ogg",
        confirm: "assets/audio/sfx/sfx_ui_confirm.ogg",
        back:    "assets/audio/sfx/sfx_ui_back.ogg",
        error:   "assets/audio/sfx/sfx_ui_error.ogg"
      },
      ambience: {
        torch: "assets/audio/sfx/sfx_amb_torch_loop.ogg"
      },
      defaults: { master: 0.8, music: 0.7, sfx: 0.8 }
    },

    /* ---- Images (referenced by MEDIA_MANIFEST.md; the UI currently
            uses inline-SVG placeholders until these are supplied) ---- */
    images: {
      logoMain:   "assets/images/logo/logo_twilight_wolf.png",
      logoEmblem: "assets/images/logo/emblem_wolf_eye.png",
      bgFar:      "assets/images/backgrounds/bg_ruins_far.png",
      bgMid:      "assets/images/backgrounds/bg_ruins_mid.png",
      bgNear:     "assets/images/backgrounds/bg_ruins_near.png",
      fogTile:    "assets/images/backgrounds/fx_fog_tile.png",
      cursor:     "assets/images/ui/icon_cursor_wolf_eye.png",
      runeConfirm:"assets/images/ui/icon_rune_confirm.png",
      runeBack:   "assets/images/ui/icon_rune_back.png",
      panelFrame: "assets/images/ui/frame_panel_stone.png",
      sliderThumb:"assets/images/ui/slider_thumb_rune.png",
      divider:    "assets/images/ui/divider_runes.png"
    },

    /* ---- Persistence ---- */
    storage: {
      save:     "tw_save_v1",     // game progress (Phase 2+)
      settings: "tw_settings_v1"  // volume levels etc.
    },

    /* ---- Timing (ms) ---- */
    timing: {
      screenFade: 450   // must match --dur-screen-fade in css/base.css
    },

    /* ---- Ambient fog ---- */
    fog: {
      particleCount: 38,
      minScale: 0.5,
      maxScale: 1.6,
      minSpeed: 0.08,   // px per frame at 60fps, scaled by particle size
      maxSpeed: 0.5,
      baseAlpha: 0.16
    }
  };

})(window.TW = window.TW || {});
