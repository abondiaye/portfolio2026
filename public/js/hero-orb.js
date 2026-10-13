/* Accueil « orb » : quelques milliers de points lumineux forment une sphère, un anneau ou un réseau.
   Un clic (ou Entrée) change de forme ; la souris repousse et éclaire les points ; le scroll les disperse. */
(function () {
    'use strict';

    var clamp01 = function (v) { return Math.min(1, Math.max(0, v)); };

    function shapePts(kind, n) {
        var out = [], g = Math.PI * (3 - Math.sqrt(5));
        var hubs = [[0, 0, 0], [0.72, 0.35, 0.1], [-0.68, 0.42, -0.2], [0.3, -0.7, 0.35], [-0.45, -0.55, -0.4], [0.1, 0.78, -0.45], [0.55, -0.1, -0.7]];
        for (var i = 0; i < n; i++) {
            var t = i / n;
            if (kind === 0) { // sphère
                var y = 1 - 2 * t, r = Math.sqrt(1 - y * y), a = i * g, k = 1 + 0.08 * Math.sin(a * 3 + y * 6);
                out.push([Math.cos(a) * r * k, y * k, Math.sin(a) * r * k]);
            } else if (kind === 1) { // anneau
                var u = t * Math.PI * 2, v = (i * g) % (Math.PI * 2), R = 0.78, rr = 0.24 + 0.05 * Math.sin(u * 5);
                out.push([(R + rr * Math.cos(v)) * Math.cos(u), rr * Math.sin(v) * 1.1, (R + rr * Math.cos(v)) * Math.sin(u)]);
            } else { // réseau de nœuds
                var cI = i % 7, h = hubs[cI];
                if (i % 5 === 0 && cI > 0) {
                    var s = (i * 0.618) % 1;
                    out.push([h[0] * s, h[1] * s, h[2] * s]);
                } else {
                    var y2 = 1 - 2 * ((i * 0.37) % 1), r2 = Math.sqrt(Math.max(0, 1 - y2 * y2)), a2 = i * g, rad = cI === 0 ? 0.3 : 0.16;
                    out.push([h[0] + Math.cos(a2) * r2 * rad, h[1] + y2 * rad, h[2] + Math.sin(a2) * r2 * rad]);
                }
            }
        }
        return out;
    }

    // ---- le G° de GeniusPro360 (même tracé que geniuspro360-mark.svg, viewBox 120×120) ----
    // arc du G (r 42, trait 9), barre + chevron (trait 8), anneau du degré (r 7, trait 4)
    var G_STOPS = [[0, [107, 68, 36]], [0.28, [200, 137, 74]], [0.42, [246, 214, 162]], [0.55, [184, 122, 62]], [0.8, [122, 75, 37]], [1, [74, 44, 22]]];
    function bronzeAt(px, py) {
        // même dégradé que le SVG : de (8,8) à (112,112)
        var t = clamp01(((px - 8) + (py - 8)) / 208);
        for (var i = 1; i < G_STOPS.length; i++) {
            if (t <= G_STOPS[i][0]) {
                var a = G_STOPS[i - 1], b = G_STOPS[i], k = (t - a[0]) / (b[0] - a[0]);
                return [a[1][0] + (b[1][0] - a[1][0]) * k, a[1][1] + (b[1][1] - a[1][1]) * k, a[1][2] + (b[1][2] - a[1][2]) * k];
            }
        }
        return G_STOPS[G_STOPS.length - 1][1];
    }
    function gPts(n) {
        var pts = [], cols = [];
        var segs = [
            { w: 6930, f: function (u) { var a = (-40 - u * 320) * Math.PI / 180; return [60 + 42 * Math.cos(a), 60 + 42 * Math.sin(a), -Math.sin(a), Math.cos(a), 15]; } },
            { w: 988, f: function (u) { return [102 - 38 * u, 60, 0, 1, 13]; } },
            { w: 442, f: function (u) { return [76 - 12 * u, 48 + 12 * u, 0.707, 0.707, 13]; } },
            { w: 442, f: function (u) { return [64 + 12 * u, 60 + 12 * u, -0.707, 0.707, 13]; } },
            { w: 572, f: function (u) { var a = u * Math.PI * 2; return [104 + 7 * Math.cos(a), 16 + 7 * Math.sin(a), Math.cos(a), Math.sin(a), 6.5]; } }
        ];
        var tot = segs.reduce(function (s, g) { return s + g.w; }, 0), i = 0;
        segs.forEach(function (g, si) {
            var m = si === segs.length - 1 ? n - i : Math.round(n * g.w / tot);
            for (var j = 0; j < m && i < n; j++, i++) {
                var u = (j + 0.5) / m;
                var q = g.f(u);
                var h1 = Math.sin(i * 12.9898) * 43758.5453; h1 -= Math.floor(h1);
                var h2 = Math.sin(i * 78.233) * 12345.6789; h2 -= Math.floor(h2);
                var off = (h1 * 2 - 1) * q[4];   // épaisseur du trait, répartie au hasard
                var px = q[0] + q[2] * off, py = q[1] + q[3] * off;
                var z = (h2 * 2 - 1) * 0.22;     // relief (épaisseur 3D)
                pts.push([(px - 60) / 52, (py - 62) / 52, z]);
                cols.push(bronzeAt(px, py));
            }
        });
        return { pts: pts, cols: cols };
    }

    function accentRgb(el) {
        var p = document.createElement('i');
        p.style.display = 'none';
        p.style.color = 'var(--fc-brass)';
        el.appendChild(p);
        var v = getComputedStyle(p).color;
        p.remove();
        var m = v.match(/(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/);
        return m ? Math.round(+m[1]) + ',' + Math.round(+m[2]) + ',' + Math.round(+m[3]) : '212,255,58';
    }

    function initOrb(sec) {
        var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
        var box = sec.querySelector('.fch-orb');
        var cv = box.querySelector('canvas');
        var ctx = cv.getContext('2d');
        var curEl = sec.querySelector('.fch-cur');
        var labels = Array.prototype.slice.call(box.querySelectorAll('.fch-shape b'));
        var names = [];
        try { names = JSON.parse(box.dataset.shapes || '[]'); } catch (e) {}

        // ---- tailles (ordinateur / tablette / téléphone) ----
        var setLayout = function () {
            var w = sec.offsetWidth;
            sec.classList.toggle('is-ph', w < 810);
            sec.classList.toggle('is-tab', w >= 810 && w < 1100);
        };
        setLayout();
        new ResizeObserver(setLayout).observe(sec);
        var ph = sec.classList.contains('is-ph');

        // ---- apparition ----
        setTimeout(function () { sec.classList.add('is-in'); }, 120);
        sec.classList.add('is-g');

        // ---- changement de forme ----
        var shape = 0, userAt = 0;
        var morph = function (auto) {
            if (!auto) userAt = Date.now();
            shape = (shape + 1) % 4;
            sec.classList.toggle('is-g', shape === 0);
            labels.forEach(function (b, i) { b.classList.toggle('is-on', i === shape); });
            box.setAttribute('aria-label', 'Changer la forme, actuellement : ' + (names[shape] || ''));
        };
        box.addEventListener('click', function () { morph(false); });
        box.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); morph(false); }
        });
        if (!rm) setInterval(function () { if (Date.now() - userAt > 9000) morph(true); }, 6500);

        // ---- les bulles s'allument à tour de rôle ----
        var chips = sec.querySelectorAll('.fch-chip'), hot = 0;
        if (!rm && chips.length) setInterval(function () {
            chips[hot].classList.remove('is-hot');
            hot = (hot + 1) % chips.length;
            chips[hot].classList.add('is-hot');
        }, 1800);

        // ---- boutons magnétiques ----
        if (fine) {
            var btns = Array.prototype.slice.call(sec.querySelectorAll('[data-mag]'));
            sec.addEventListener('pointermove', function (e) {
                btns.forEach(function (b) {
                    var rc = b.getBoundingClientRect();
                    var dx = e.clientX - (rc.left + rc.width / 2), dy = e.clientY - (rc.top + rc.height / 2);
                    var d = Math.hypot(dx, dy), pull = d < 150 ? (1 - d / 150) * 9 : 0;
                    b.style.setProperty('--mx', (dx / (d || 1)) * pull + 'px');
                    b.style.setProperty('--my', (dy / (d || 1)) * pull + 'px');
                });
            });
            sec.addEventListener('pointerleave', function () {
                btns.forEach(function (b) { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
            });
        }

        if (!ctx) return;

        // ---- la sphère de particules ----
        var n = ph ? 1800 : 4200;
        var G = gPts(n);
        var S = [G.pts, shapePts(0, n), shapePts(1, n), shapePts(2, n)];
        // départ : un nuage de points dispersés qui se rassemble en G°
        var P = S[1].map(function (p, i) { var f = 2.4 + ((i * 0.7548) % 1) * 1.6; return [p[0] * f, p[1] * f, p[2] * f]; });

        var seed = P.map(function (_, i) { return ((i * 9301 + 49297) % 233280) / 233280; });
        var glow = new Float32Array(n);
        var acc = accentRgb(sec);
        function acc0() { return acc.split(',').map(Number); }
        var acc3 = acc0();
        var mixG = 1; // 1 = couleurs bronze du G°, 0 = couleur d'accent du site
        var dpr = Math.min(1.75, window.devicePixelRatio || 1);
        var W = 1, H = 1;
        var size = function () {
            var r = cv.getBoundingClientRect();
            W = Math.max(1, r.width); H = Math.max(1, r.height);
            cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        };
        size();
        new ResizeObserver(size).observe(box);

        var mx = -9999, my = -9999, lx = 0, ly = 0, tlx = 0, tly = 0, vis = true, pcx = 0, pcy = 0, on = false, lab = '';
        new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: '20% 0px' }).observe(box);

        if (fine) {
            sec.classList.add('has-cur');
            sec.addEventListener('pointermove', function (e) {
                var r = sec.getBoundingClientRect();
                pcx = e.clientX - r.left; pcy = e.clientY - r.top; on = true;
                var b = cv.getBoundingClientRect();
                mx = e.clientX - b.left; my = e.clientY - b.top;
                tlx = mx / W - 0.5; tly = my / H - 0.5;
                var nn = e.target.closest('[data-cur]');
                var l = nn ? nn.getAttribute('data-cur') || '' : '';
                if (l !== lab) { lab = l; curEl.setAttribute('data-l', l); curEl.classList.toggle('is-lab', !!l); }
            });
            sec.addEventListener('pointerleave', function () { mx = -9999; my = -9999; tlx = 0; tly = 0; on = false; });
        }

        var rot = 0, last = performance.now(), cx = 0, cy = 0;
        function draw(now) {
            requestAnimationFrame(draw);
            var dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            if (fine) {
                cx += (pcx - cx) * 0.22; cy += (pcy - cy) * 0.22;
                curEl.style.translate = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px';
                curEl.style.opacity = on ? '1' : '0';
            }
            if (!vis || document.hidden) return;
            var tgt = S[shape];
            var k = rm ? 1 : 1 - Math.pow(0.02, dt);
            rot += dt * (rm ? 0 : 0.22); // le G° tourne en 3D comme les autres formes
            mixG += ((shape === 0 ? 1 : 0) - mixG) * (rm ? 1 : Math.min(1, dt * 1.6));
            lx += (tlx - lx) * 0.06; ly += (tly - ly) * 0.06;
            var scat = rm ? 0 : clamp01(window.scrollY / ((window.innerHeight || 1) * 0.9));
            var ay = rot + lx * 0.9, ax = -0.35 + ly * 0.6;
            var ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax);
            var R = Math.min(W, H) * 0.33, cxs = W / 2, cys = H / 2, rr = R * 0.36;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 0; i < n; i++) {
                var p = P[i], q = tgt[i], kk = k * (0.55 + seed[i] * 0.9);
                p[0] += (q[0] - p[0]) * kk; p[1] += (q[1] - p[1]) * kk; p[2] += (q[2] - p[2]) * kk;
                var br = 1 + 0.03 * Math.sin(now / 900 + seed[i] * 12);
                var x = p[0] * br, y = p[1] * br, z = p[2] * br;
                var x1 = x * ca - z * sa, z1 = x * sa + z * ca;
                var y1 = y * cb - z1 * sb, z2 = y * sb + z1 * cb;
                var sc = 1 + scat * (0.5 + seed[i] * 2.6);
                var pz = 2.6 / (2.6 + z2 * 0.9);
                var sx = cxs + x1 * sc * R * pz, sy = cys + y1 * sc * R * pz;
                var dx = sx - mx, dy = sy - my, d2 = dx * dx + dy * dy;
                if (d2 < rr * rr) {
                    var d = Math.sqrt(d2) || 1, f = 1 - d / rr;
                    sx += (dx / d) * f * 30; sy += (dy / d) * f * 30;
                    glow[i] = Math.min(1, glow[i] + f * 0.5);
                } else glow[i] *= 0.94;
                var depth = clamp01((1 - z2) / 2);
                var a = (0.22 + depth * 0.72 + glow[i] * 0.5) * (1 - scat * 0.75);
                var s = (1 + depth * 1.9 + glow[i] * 1.4) * (ph ? 0.8 : 1) * (1 + mixG * 1.2); // points plus gros sur le G°
                if (false) { // (ancien mélange bronze désactivé : le G° prend la couleur d'accent comme les autres formes)
                    // mélange progressif entre l'accent du site et le bronze du G°
                    var bc = G.cols[i], hi = glow[i] > 0.15 || i % 9 === 0;
                    var r0 = hi ? 255 : acc3[0], g0 = hi ? 255 : acc3[1], b0 = hi ? 255 : acc3[2];
                    var br2 = hi ? 1.18 : 1;
                    var rC = r0 + (Math.min(255, bc[0] * br2) - r0) * mixG, gC = g0 + (Math.min(255, bc[1] * br2) - g0) * mixG, bC = b0 + (Math.min(255, bc[2] * br2) - b0) * mixG;
                    ctx.fillStyle = 'rgba(' + (rC | 0) + ',' + (gC | 0) + ',' + (bC | 0) + ',' + Math.min(1, a * (1 + mixG * 0.35)).toFixed(3) + ')';
                } else {
                    ctx.fillStyle = glow[i] > 0.15 || i % 9 === 0
                        ? 'rgba(255,255,255,' + (a * 0.95).toFixed(3) + ')'
                        : 'rgba(' + acc + ',' + a.toFixed(3) + ')';
                }
                ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
            }
            ctx.globalCompositeOperation = 'source-over';
            sec.style.setProperty('--sc', scat.toFixed(4));
            sec.style.setProperty('--lx', lx.toFixed(4));
            sec.style.setProperty('--ly', ly.toFixed(4));
        }
        requestAnimationFrame(draw);
    }

    function boot() { document.querySelectorAll('[data-orb]').forEach(initOrb); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
