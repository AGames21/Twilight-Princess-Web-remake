# Twilight Wolf (working title)

## ▶️ Play it now

**https://agames21.github.io/Twilight-Princess-Web-remake/**

Works on any phone, tablet, or computer — nothing to install. On iPhone,
open it in Safari and tap **Share → Add to Home Screen** to launch it
fullscreen like an app. The site republishes automatically a minute or
two after anything is merged to `main`.

---

An original fantasy action-adventure for the web. **Phase 1** ships the
front-of-house only: an animated title splash and main menu with a full
audio scaffold — no gameplay yet.

Theme: an ancient forest kingdom at dusk — cursed wolf motif, torch-lit
stone ruins, teal/purple twilight fog, glowing rune UI.

## Run it

No build step. Either:

- double-click `index.html`, or
- serve it (recommended, matches how audio will load later):

  ```sh
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

Works with keyboard/mouse on desktop (arrows or WASD to move, Enter to
confirm, Esc to go back) and touch on mobile.

## What's here

- **Intro splash** — logo glow-in, drifting fog, pulsing "Press Start / Tap to Begin"
- **Main menu** — New Game / Continue / Settings / Quit with a gliding wolf-eye cursor;
  Continue stays greyed out until a save exists
- **Settings shell** — live volume sliders (persisted), placeholder gameplay rows
- **Ambient loop** — canvas fog particles, parallax ruins silhouettes, torch flicker;
  honors `prefers-reduced-motion` and pauses when the tab is hidden
- **Audio system** — [Howler.js](https://howlerjs.com) (vendored, MIT) wired to
  placeholder file paths; runs silently until real files land in `assets/audio/`

All current art is inline-SVG placeholder. `MEDIA_MANIFEST.md` lists every
image and audio file to supply, with sizes, lengths, and mood notes.

## Structure

```
index.html            all screens as <section class="screen"> elements
css/                  base tokens · ambient background · screen styles
js/config.js          asset paths, timings, storage keys
js/core/              audio · input · save · screen manager
js/effects/ambient.js fog canvas + pointer parallax
js/screens/           intro · menu · settings · game (Phase 2 stub)
js/main.js            boot + screen registry
assets/               images/ and audio/ (empty until assets are supplied)
```

## Adding gameplay (Phase 2)

The menu already hands off: **New Game** calls
`TW.ScreenManager.transition("game", { mode: "new" })` and **Continue**
passes the loaded save. `js/screens/game.js` is the stub that receives
both — see the header comment there for the three-step recipe (new screen
sections + screen modules + one registry line in `js/main.js`). Saves go
through `TW.Save` (localStorage).
