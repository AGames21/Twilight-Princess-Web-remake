/* ============================================================
   Twilight Wolf — effects/ambient.js
   TW.Ambient — looping background life:
     • drifting fog particles on #fog-canvas (teal/purple wisps)
     • soft pointer parallax on the ruins silhouette layers
   Pauses when the tab is hidden; honors prefers-reduced-motion.
   ============================================================ */
(function (TW) {
  "use strict";

  var canvas, ctx;
  var particles = [];
  var sprites = [];
  var rafId = null;
  var width = 0, height = 0, dpr = 1;
  var reducedMotion = false;
  var t = 0;

  /* Pre-render soft radial wisps once — cheap to blit every frame. */
  function makeSprite(r, g, b) {
    var size = 256;
    var c = document.createElement("canvas");
    c.width = c.height = size;
    var g2 = c.getContext("2d");
    var grad = g2.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(" + r + "," + g + "," + b + ",0.55)");
    grad.addColorStop(0.5, "rgba(" + r + "," + g + "," + b + ",0.18)");
    grad.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
    g2.fillStyle = grad;
    g2.fillRect(0, 0, size, size);
    return c;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function spawnParticle(anywhere) {
    var cfg = TW.CONFIG.fog;
    var scale = rand(cfg.minScale, cfg.maxScale);
    return {
      sprite: sprites[(Math.random() * sprites.length) | 0],
      x: anywhere ? rand(-200, width + 200) : -300 * scale,
      y: rand(height * 0.25, height * 1.05),   // fog hangs low
      scale: scale,
      vx: rand(cfg.minSpeed, cfg.maxSpeed) * (0.5 + scale * 0.5),
      alpha: cfg.baseAlpha * rand(0.5, 1.3),
      phase: rand(0, Math.PI * 2),
      bobAmp: rand(6, 22)
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reducedMotion) drawFrame(); // keep the static frame in sync
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var size = 256 * p.scale;
      var bob = Math.sin(t * 0.004 + p.phase) * p.bobAmp;
      ctx.globalAlpha = p.alpha * (0.85 + 0.15 * Math.sin(t * 0.002 + p.phase));
      ctx.drawImage(p.sprite, p.x - size / 2, p.y + bob - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function tick() {
    t += 16.7;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      if (p.x - 128 * p.scale > width) {
        particles[i] = spawnParticle(false);
      }
    }
    drawFrame();
    rafId = window.requestAnimationFrame(tick);
  }

  function start() {
    if (rafId === null && !reducedMotion) rafId = window.requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  /* Subtle parallax: shifts each silhouette layer via the --plx custom
     property consumed by the amb-drift keyframes (css/ambient.css). */
  function initParallax() {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    var layers = document.querySelectorAll(".amb-layer[data-parallax]");
    window.addEventListener("mousemove", function (e) {
      var nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 .. 1
      layers.forEach(function (layer) {
        var strength = parseFloat(layer.dataset.parallax) || 0;
        layer.style.setProperty("--plx", (-nx * strength).toFixed(1) + "px");
      });
    }, { passive: true });
  }

  TW.Ambient = {
    init: function () {
      canvas = document.getElementById("fog-canvas");
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      sprites = [
        makeSprite(111, 227, 207),  // teal wisp
        makeSprite(154, 127, 209),  // purple wisp
        makeSprite(96, 88, 138)     // neutral haze
      ];

      resize();
      var count = TW.CONFIG.fog.particleCount;
      for (var i = 0; i < count; i++) particles.push(spawnParticle(true));

      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop(); else start();
      });

      initParallax();

      if (reducedMotion) {
        drawFrame(); // one static frame, no animation loop
      } else {
        start();
      }
    }
  };

})(window.TW = window.TW || {});
