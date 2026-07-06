# Twilight Wolf — Media Manifest (Phase 1)

Every asset the menu system expects, with exact filenames and folders.
All paths below are referenced from `js/config.js` — if you rename a file
here, update it there too. The app runs fine with any or all of these
missing (inline-SVG placeholders and a silent audio fallback cover the gaps),
so you can supply assets incrementally.

Preferred formats: **PNG with transparency** for images (except backgrounds,
which can be opaque), **OGG Vorbis** for audio (add an MP3 sibling later if
you need Safari < 17 support — Howler accepts a fallback list).

---

## Logo / Branding

| Filename | Folder | Ideal size (px) | Description |
|---|---|---|---|
| `logo_twilight_wolf.png` | `assets/images/logo/` | 1600 × 800 | Full title wordmark "Twilight Wolf" with rune-etched lettering and a teal glow; transparent background. |
| `emblem_wolf_eye.png` | `assets/images/logo/` | 512 × 512 | Circular emblem: a slit-pupil wolf eye inside a rune ring; used above the wordmark and as an app icon source. |

## Backgrounds

| Filename | Folder | Ideal size (px) | Description |
|---|---|---|---|
| `bg_ruins_far.png` | `assets/images/backgrounds/` | 2560 × 1080 | Farthest parallax layer: misty hills and thin broken spires against the dusk sky; darkest purple silhouette, transparent above the skyline. |
| `bg_ruins_mid.png` | `assets/images/backgrounds/` | 2560 × 960 | Middle parallax layer: ruined arches, cracked columns, a collapsed shrine; deep indigo silhouette, transparent above. |
| `bg_ruins_near.png` | `assets/images/backgrounds/` | 2560 × 900 | Nearest parallax layer: large foreground pillars and gnarled pines framing the left/right edges; near-black silhouette, transparent center. |
| `fx_fog_tile.png` | `assets/images/backgrounds/` | 1024 × 1024 | Seamlessly tileable soft fog/mist texture in teal-purple tones; used if the canvas fog is ever swapped for image-based fog. |

## UI Icons

| Filename | Folder | Ideal size (px) | Description |
|---|---|---|---|
| `icon_cursor_wolf_eye.png` | `assets/images/ui/` | 128 × 96 | Glowing wolf-eye menu cursor (replaces the inline SVG); teal glow on transparent background. |
| `icon_rune_confirm.png` | `assets/images/ui/` | 96 × 96 | Confirm/select rune glyph (bright teal), for button prompts. |
| `icon_rune_back.png` | `assets/images/ui/` | 96 × 96 | Back/cancel rune glyph (muted purple), for button prompts. |
| `frame_panel_stone.png` | `assets/images/ui/` | 1024 × 768 | Weathered stone panel frame with rune-carved border, built for 9-slice scaling; backs the Settings panel. |
| `slider_thumb_rune.png` | `assets/images/ui/` | 64 × 64 | Small glowing rune stone used as the volume-slider thumb. |
| `divider_runes.png` | `assets/images/ui/` | 800 × 40 | Thin horizontal divider of faded rune script, for separating menu sections. |

## Music

| Filename | Folder | Ideal length (s) | Mood / style |
|---|---|---|---|
| `bgm_title_twilight.ogg` | `assets/audio/music/` | 90–150 (seamless loop) | Title theme: slow, melancholic orchestral-ambient — low strings, distant choir, soft harp; ancient, mournful, faintly hopeful dusk atmosphere. |
| `bgm_prologue_forest.ogg` | `assets/audio/music/` | 120–180 (seamless loop) | Prologue/tutorial bed: sparse ambient forest score — woodwinds, deep drones, occasional wolf-howl motif far in the mix; mysterious and watchful. |

## SFX

| Filename | Folder | Ideal length (s) | Mood / style |
|---|---|---|---|
| `sfx_ui_move.ogg` | `assets/audio/sfx/` | 0.15–0.3 | Cursor move: soft ethereal tick — a muted chime or stone-on-stone tap with a wisp of reverb. |
| `sfx_ui_select.ogg` | `assets/audio/sfx/` | 0.2–0.4 | Option highlighted / slider released: gentle rune shimmer, slightly brighter than the move tick. |
| `sfx_ui_confirm.ogg` | `assets/audio/sfx/` | 0.5–0.9 | Confirm: resonant magical pulse — a rune igniting; warm teal energy with a short tail. |
| `sfx_ui_back.ogg` | `assets/audio/sfx/` | 0.3–0.5 | Back/cancel: reversed shimmer or soft descending tone; airy, unobtrusive. |
| `sfx_ui_error.ogg` | `assets/audio/sfx/` | 0.4–0.6 | Invalid choice: dull thud with a faint dissonant growl — stone refusing to move. |
| `sfx_amb_torch_loop.ogg` | `assets/audio/sfx/` | 10–20 (seamless loop) | Ambient layer: crackling torch fire with occasional pops, distant night wind underneath; quiet, loopable bed. |
