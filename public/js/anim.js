/* Sections animées inspirées du template Flowcraft :
   manifeste qui s'allume au défilement, tableau de compétences, orbite des missions,
   rail du parcours, compteur, et champ de particules autour du bouton final. */
(function () {
    'use strict';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var clamp01 = function (v) { return Math.min(1, Math.max(0, v)); };
    var onceVisible = function (el, cb, margin) {
        if (!('IntersectionObserver' in window)) { cb(); return; }
        var io = new IntersectionObserver(function (es) {
            if (es[0].isIntersecting) { io.disconnect(); cb(); }
        }, { rootMargin: margin || '0px 0px -15% 0px' });
        io.observe(el);
    };

    // ---- un seul rAF pour tout ce qui suit le défilement ----
    var scrollJobs = [];
    var ticking = false;
    var runScroll = function () { ticking = false; scrollJobs.forEach(function (f) { f(); }); };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // ---------- 1. Manifeste : chaque mot s'allume quand on fait défiler ----------
    document.querySelectorAll('[data-scrub]').forEach(function (p) {
        var bits = Array.prototype.slice.call(p.querySelectorAll('.mf-w, .mf-ph'));
        if (reduced) { bits.forEach(function (b) { b.classList.add('is-lit'); }); return; }
        scrollJobs.push(function () {
            var r = p.getBoundingClientRect(), vh = window.innerHeight;
            // 0 quand le haut du texte arrive aux 3/4 de l'écran, 1 quand le bas passe le milieu
            var prog = clamp01((vh * 0.78 - r.top) / (r.height + vh * 0.28));
            var n = Math.round(prog * bits.length);
            bits.forEach(function (b, i) { b.classList.toggle('is-lit', i < n); });
        });
    });

    // ---------- 2. Tableau de compétences ----------
    document.querySelectorAll('[data-board]').forEach(function (board) {
        var wrap = board.closest('.board-wrap');
        onceVisible(board, function () {
            board.classList.add('is-on');
            if (wrap) wrap.classList.add('is-on');
            // une carte s'illumine à tour de rôle, comme un agenda vivant
            var cards = board.querySelectorAll('.board-card');
            if (reduced || !cards.length) return;
            var last = null;
            setTimeout(function () {
                setInterval(function () {
                    if (last) last.classList.remove('is-hot');
                    last = cards[Math.floor(Math.random() * cards.length)];
                    last.classList.add('is-hot');
                }, 1400);
            }, 2600);
        });
    });

    // ---------- compteurs qui défilent ----------
    document.querySelectorAll('[data-countup]').forEach(function (el) {
        var to = parseInt(el.dataset.countup, 10) || 0;
        onceVisible(el, function () {
            if (reduced) { el.textContent = to; return; }
            var t0 = performance.now(), dur = 1800;
            (function step(t) {
                var k = clamp01((t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
                el.textContent = Math.round(to * e);
                if (k < 1) requestAnimationFrame(step);
            })(t0);
        });
    });

    // ---------- 3. Orbite des missions ----------
    document.querySelectorAll('[data-orbit]').forEach(function (stage) {
        var items = Array.prototype.slice.call(stage.querySelectorAll('.orb2-item'));
        if (!items.length) return;
        var rings = [[0.25, 0.164], [0.38, 0.268], [0.49, 0.384]]; // rayons relatifs (comme les ellipses SVG)
        var speed = [0.11, -0.07, 0.05];
        var orbit = items.map(function (el, i) {
            var ring = i % 3;
            var sameRing = items.filter(function (_, j) { return j % 3 === ring; }).length;
            var idx = Math.floor(i / 3);
            return { el: el, ring: ring, a: (idx / sameRing) * Math.PI * 2 + ring * 0.9 };
        });
        var paused = false, vis = false, last = performance.now(), mobile = false;
        stage.addEventListener('mouseover', function (e) { if (e.target.closest('.orb2-item')) paused = true; });
        stage.addEventListener('mouseout', function (e) { if (e.target.closest('.orb2-item')) paused = false; });
        stage.addEventListener('focusin', function () { paused = true; });
        stage.addEventListener('focusout', function () { paused = false; });
        new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { rootMargin: '10% 0px' }).observe(stage);
        var place = function (now) {
            var dt = Math.min(0.05, (now - last) / 1000); last = now;
            mobile = window.innerWidth < 900;
            if (mobile) { items.forEach(function (el) { el.style.transform = ''; el.style.zIndex = ''; el.style.opacity = ''; }); return; }
            var W = stage.clientWidth, H = stage.clientHeight;
            orbit.forEach(function (o) {
                if (!paused && !reduced) o.a += speed[o.ring] * dt;
                var rx = rings[o.ring][0] * W, ry = rings[o.ring][1] * H;
                var x = W / 2 + Math.cos(o.a) * rx, y = H / 2 + Math.sin(o.a) * ry;
                var depth = (Math.sin(o.a) + 1) / 2; // 0 = derrière, 1 = devant
                var s = 0.82 + depth * 0.26;
                o.el.style.transform = 'translate(' + (x - o.el.offsetWidth / 2).toFixed(1) + 'px,' + (y - o.el.offsetHeight / 2).toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
                o.el.style.zIndex = String(Math.round(depth * 20) + (depth > 0.5 ? 10 : 0));
                o.el.style.opacity = (0.45 + depth * 0.55).toFixed(2);
            });
        };
        // ---- grand anneau type Saturne, dessiné en deux moitiés (arrière / avant du noyau) ----
        var back = stage.querySelector('.orb2-band.is-back'), front = stage.querySelector('.orb2-band.is-front');
        var core = stage.querySelector('.orb2-core');
        var bctx = back && back.getContext('2d'), fctx = front && front.getContext('2d');
        var acc = (function () {
            var i = document.createElement('i'); i.style.color = 'var(--rw-brass)'; i.style.display = 'none'; stage.appendChild(i);
            var m = getComputedStyle(i).color.match(/\d+(\.\d+)?/g); i.remove();
            return m ? m.slice(0, 3).map(Number) : [212, 255, 58];
        })();
        var LINES = 70, dprB = Math.min(2, window.devicePixelRatio || 1), BW = 1, BH = 1;
        // chaque ligne : une luminosité et une teinte (citron ↔ blanc) pour obtenir des bandes comme sur Saturne
        var lines = [];
        for (var li = 0; li < LINES; li++) {
            var t = li / (LINES - 1);
            var band = 0.35 + 0.65 * Math.abs(Math.sin(t * 9.3 + Math.sin(t * 23) * 0.8));
            var gap = (t > 0.46 && t < 0.52) ? 0.08 : 1; // une division sombre, comme la division de Cassini
            lines.push({ t: t, a: band * gap * (0.25 + 0.75 * (1 - Math.abs(t - 0.4))), w: 0.6 + ((li * 0.618) % 1) * 1.3, white: ((li * 0.381) % 1) > 0.62, dash: 40 + ((li * 0.713) % 1) * 160, sp: 6 + ((li * 0.27) % 1) * 18 });
        }
        var sizeBand = function () {
            BW = stage.clientWidth; BH = stage.clientHeight;
            [back, front].forEach(function (c) { if (c) { c.width = Math.round(BW * dprB); c.height = Math.round(BH * dprB); } });
        };
        sizeBand();
        new ResizeObserver(sizeBand).observe(stage);
        var drawBand = function (now) {
            if (!bctx || !fctx || mobile) return;
            var R = (core ? core.offsetWidth : 150) / 2;
            var cx = BW / 2, cy = BH / 2, tilt = -0.2, ratio = 0.27;
            var rin = R * 1.3, rout = Math.min(BW * 0.48, R * 4.8);
            var t = reduced ? 0 : now / 1000;
            [[bctx, Math.PI, 2 * Math.PI], [fctx, 0, Math.PI]].forEach(function (job) {
                var c = job[0];
                c.setTransform(dprB, 0, 0, dprB, 0, 0);
                c.clearRect(0, 0, BW, BH);
                c.save();
                c.translate(cx, cy);
                c.rotate(tilt);
                lines.forEach(function (ln) {
                    var rx = rin + (rout - rin) * ln.t, ry = rx * ratio;
                    var col = ln.white ? [255, 255, 255] : acc;
                    var al = ln.a * (job[1] === 0 ? 1 : 0.75);
                    c.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + al.toFixed(3) + ')';
                    c.lineWidth = ln.w;
                    // des reflets qui glissent le long de l'anneau
                    c.setLineDash([ln.dash * 2.2, ln.dash * 0.07]);
                    c.lineDashOffset = -t * ln.sp;
                    c.beginPath();
                    c.ellipse(0, 0, rx, ry, 0, job[1], job[2]);
                    c.stroke();
                });
                c.restore();
            });
        };

        (function loop(now) {
            if (vis) { place(now); drawBand(now); } else last = now;
            requestAnimationFrame(loop);
        })(performance.now());
    });

    // ---------- 4. Parcours : le rail vert se remplit avec le défilement ----------
    document.querySelectorAll('[data-timeline]').forEach(function (tl) {
        var fill = tl.querySelector('.tl-fill');
        scrollJobs.push(function () {
            var r = tl.getBoundingClientRect(), vh = window.innerHeight;
            var mark = vh * 0.55; // le « curseur » du rail est à 55 % de la hauteur de l'écran
            var prog = clamp01((mark - r.top) / Math.max(1, r.height));
            if (fill) tl.style.setProperty('--prog', prog.toFixed(4));
            tl.querySelectorAll('.tl-item').forEach(function (li) {
                if (li.hidden) return;
                li.classList.toggle('is-past', li.getBoundingClientRect().top < mark);
            });
        });
    });

    // ---------- 5. Appel final : champ de particules + bouton magnétique ----------
    document.querySelectorAll('.cta').forEach(function (sec) {
        var btn = sec.querySelector('.cta-btn');
        if (fine && btn) {
            sec.addEventListener('pointermove', function (e) {
                var rc = btn.getBoundingClientRect();
                var dx = e.clientX - (rc.left + rc.width / 2), dy = e.clientY - (rc.top + rc.height / 2);
                var d = Math.hypot(dx, dy), pull = d < 260 ? (1 - d / 260) * 16 : 0;
                btn.style.setProperty('--mx', (dx / (d || 1)) * pull + 'px');
                btn.style.setProperty('--my', (dy / (d || 1)) * pull + 'px');
            });
            sec.addEventListener('pointerleave', function () { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); });
        }
        var cv = sec.querySelector('.cta-cv');
        var ctx = cv && cv.getContext('2d');
        if (!ctx) return;
        var acc = (function () {
            var i = document.createElement('i'); i.style.color = 'var(--rw-brass)'; i.style.display = 'none'; sec.appendChild(i);
            var m = getComputedStyle(i).color.match(/\d+(\.\d+)?/g); i.remove();
            return m ? m.slice(0, 3).join(',') : '212,255,58';
        })();
        var dpr = Math.min(1.75, window.devicePixelRatio || 1), W = 1, H = 1, pts = [], vis = false, mx = -9999, my = -9999;
        var build = function () {
            var r = sec.getBoundingClientRect();
            W = r.width; H = r.height;
            cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
            pts = [];
            var n = W < 700 ? 1400 : 3200;
            // spirale galactique : 5 bras de particules qui tournent et s'écoulent vers l'extérieur
            for (var i = 0; i < n; i++) {
                pts.push({ arm: i % 5, u: (i * 0.618034) % 1, j: ((i * 0.7548) % 1) - 0.5, s: (i * 0.381966) % 1 });
            }
        };
        build();
        new ResizeObserver(build).observe(sec);
        new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(sec);
        sec.addEventListener('pointermove', function (e) { var r = sec.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
        sec.addEventListener('pointerleave', function () { mx = my = -9999; });
        (function draw(now) {
            requestAnimationFrame(draw);
            if (!vis) return;
            var t = reduced ? 0 : now / 1000;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            var cx = W / 2, cy = H * 0.52, R = Math.hypot(W, H) * 0.55, rot = t * 0.18;
            var sq = W < 700 ? 0.9 : 0.62; // aplatissement (perspective)
            for (var i = 0; i < pts.length; i++) {
                var p = pts[i];
                var u = (p.u + t * 0.035) % 1;              // écoulement du centre vers le bord
                var rr = 0.08 + u * 0.92;
                var ang = p.arm * (Math.PI * 2 / 5) + Math.log(rr * 12 + 1) * 2.4 + rot + p.j * (0.35 + rr * 0.5);
                var rad = rr * R * (1 + p.j * 0.08);
                var x = cx + Math.cos(ang) * rad;
                var y = cy + Math.sin(ang) * rad * sq;
                var dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
                var glow = d2 < 22000 ? 1 - d2 / 22000 : 0;
                if (glow) { var d = Math.sqrt(d2) || 1; x += dx / d * glow * 26; y += dy / d * glow * 26; }
                if (x < -4 || y < -4 || x > W + 4 || y > H + 4) continue;
                // bras bien lumineux, adoucis seulement au cœur (texte) et en fin de course
                var core = Math.min(1, Math.hypot((x - cx) / 340, (y - cy) / 240));
                var bright = 1 - Math.abs(p.j) * 1.6;
                var alpha = (0.18 + core * 0.8) * (0.35 + bright * 0.65) * Math.min(1, u * 6) * Math.min(1, (1 - u) * 5) + glow * 0.7;
                if (alpha < 0.03) continue;
                var sz = 1 + p.s * 1.3 + bright * 0.5 + glow * 1.4;
                // particules blanches et discrètes, quelques rares touches vertes
                var col = (p.s > 0.9 || glow > 0.3) ? acc : '235,235,228';
                ctx.fillStyle = 'rgba(' + col + ',' + Math.min(1, alpha * 0.5).toFixed(3) + ')';
                ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
            }
        })(performance.now());
    });

    onScroll();
})();

/* Qualités : double bandeau géant — défilement continu en sens opposés, accéléré par le scroll */
(function () {
    var box = document.querySelector('[data-mq]');
    if (!box || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var rows = [].slice.call(box.querySelectorAll('.mq-track')).map(function (el, i) {
        return { el: el, set: el.firstElementChild, x: i ? -0.5 : 0, dir: i ? 1 : -1 };
    });
    var lastY = scrollY, boost = 0, visible = true, last = performance.now();
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(box);
    (function tick(now) {
        requestAnimationFrame(tick);
        var dt = Math.min(64, now - last); last = now;
        var dy = scrollY - lastY; lastY = scrollY;
        boost += (Math.min(Math.abs(dy), 80) * 0.6 - boost) * 0.08;
        if (!visible) return;
        var sign = dy < 0 ? -1 : 1;
        rows.forEach(function (r) {
            var w = r.set.offsetWidth || 1;
            r.x += r.dir * (60 + boost * 40) * dt / 1000 * (boost > 1 ? sign : 1) / w;
            if (r.x <= -1) r.x += 1; if (r.x > 0) r.x -= 1;
            r.el.style.transform = 'translate3d(' + (r.x * w).toFixed(1) + 'px,0,0)';
        });
    })(last);
})();

/* Réalisations : accordéon — chaque projet s'ouvre en passant le milieu de l'écran et se referme en remontant ;
   s'ouvre aussi au survol et au clic. Rien au-dessus ne bouge, donc la page ne saute jamais. */
(function () {
    document.querySelectorAll('[data-acc]').forEach(function (list) {
        var items = [].slice.call(list.querySelectorAll('.pj-item'));
        if (!items.length) return;
        var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
        function set(it, on) {
            it.classList.toggle('is-open', on);
            it.querySelector('.pj-btn').setAttribute('aria-expanded', on ? 'true' : 'false');
        }
        function above(it) { return it.querySelector('.pj-btn').getBoundingClientRect().top < innerHeight * 0.62; }
        var prev = items.map(function () { return null; });

        // scroll : ne réagit qu'au franchissement de la ligne (dans un sens ou dans l'autre)
        function evaluate() {
            items.forEach(function (it, i) {
                var a = above(it);
                if (prev[i] !== null && a !== prev[i] && !it.matches(':hover')) set(it, a);
                prev[i] = a;
            });
        }
        var ticking = false;
        addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; evaluate(); }); } }, { passive: true });
        evaluate();

        // survol : ouvre ; en quittant, se referme s'il est encore sous la ligne
        if (fine) items.forEach(function (it) {
            it.addEventListener('mouseenter', function () { set(it, true); });
            it.addEventListener('mouseleave', function () { if (!above(it)) set(it, false); });
        });

        // clic : ouvre / ferme
        list.addEventListener('click', function (e) {
            var btn = e.target.closest('.pj-btn');
            if (btn) { var it = btn.closest('.pj-item'); set(it, !it.classList.contains('is-open')); }
        });
    });
})();

/* Photo avant / après : la poignée suit le défilement (noir et blanc → couleur), et se glisse aussi à la main */
(function () {
    document.querySelectorAll('[data-ba]').forEach(function (box) {
        var handle = box.querySelector('.ba-handle'), p = 50, drag = false;
        function set(v) {
            p = Math.max(4, Math.min(96, v));
            box.style.setProperty('--p', p.toFixed(2) + '%');
            handle.setAttribute('aria-valuenow', Math.round(p));
            box.dataset.side = p > 60 ? 'a' : p < 40 ? 'b' : '';
        }
        function fromEvent(e) { var r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); }
        box.addEventListener('pointerdown', function (e) {
            drag = true; box.classList.add('is-drag');
            box.setPointerCapture(e.pointerId); fromEvent(e);
        });
        box.addEventListener('pointermove', function (e) { if (drag) fromEvent(e); });
        ['pointerup', 'pointercancel'].forEach(function (t) { box.addEventListener(t, function () { drag = false; box.classList.remove('is-drag'); }); });
        handle.addEventListener('keydown', function (e) {
            var k = e.key, step = e.shiftKey ? 10 : 4;
            if (k === 'ArrowLeft' || k === 'ArrowDown') { set(p - step); e.preventDefault(); }
            else if (k === 'ArrowRight' || k === 'ArrowUp') { set(p + step); e.preventDefault(); }
            else if (k === 'Home') { set(0); e.preventDefault(); } else if (k === 'End') { set(100); e.preventDefault(); }
        });
        // défilement : la couleur gagne au fur et à mesure qu'on descend (et repart en noir et blanc en remontant)
        var cur = 96, target = 96, running = false;
        function goal() {
            var r = box.getBoundingClientRect(), vh = innerHeight;
            var t = (vh - r.top) / (vh + r.height);              // 0 = la photo arrive en bas, 1 = elle sort en haut
            var k = Math.max(0, Math.min(1, (t - 0.12) / 0.62));
            k = k * k * (3 - 2 * k);                              // départ et arrivée en douceur
            return 96 - k * 92;
        }
        function loop() {
            if (drag) { running = false; return; }
            cur += (target - cur) * 0.14;
            set(cur);
            if (Math.abs(target - cur) > 0.05) requestAnimationFrame(loop); else running = false;
        }
        function onScroll() {
            target = goal();
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) { cur = target; set(cur); return; }
            if (!running && !drag) { running = true; cur = p; requestAnimationFrame(loop); }
        }
        addEventListener('scroll', onScroll, { passive: true });
        addEventListener('resize', onScroll);
        cur = goal(); set(cur);
    });
})();

/* Hobbies : chaque colonne défile toute seule (sens alternés) ; le scroll de la page l'accélère
   vers le bas comme vers le haut, et inverse le sens quand on remonte */
(function () {
    var wall = document.querySelector('[data-hobwall]');
    if (!wall) return;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cols = [].slice.call(wall.querySelectorAll('.hob-col')).map(function (c) {
        return { el: c, track: c.querySelector('.hob-track'), set: c.querySelector('.hob-set'), dir: +c.dataset.dir || 1, y: 0, hover: false };
    });
    cols.forEach(function (c) {
        c.el.addEventListener('mouseenter', function () { c.hover = true; });
        c.el.addEventListener('mouseleave', function () { c.hover = false; });
    });
    var visible = false, lastY = scrollY, vel = 0, last = performance.now(), started = false;
    new IntersectionObserver(function (e) { visible = e[e.length - 1].isIntersecting; }, { rootMargin: '200px 0px' }).observe(wall);
    function frame(now) {
        requestAnimationFrame(frame);
        var dt = Math.min(50, now - last) / 1000; last = now;
        var dy = scrollY - lastY; lastY = scrollY;
        vel += (Math.max(-60, Math.min(60, dy)) - vel) * 0.18;   // vitesse du scroll lissée (signe = sens)
        if (!visible) return;
        cols.forEach(function (c, i) {
            var h = c.set.offsetHeight; if (!h) return;
            if (!started) c.y = -h * (0.15 + 0.2 * i);  // colonnes décalées au départ
            var auto = reduced ? 0 : (c.hover ? 6 : 28) * (0.9 + i * 0.07);
            // auto-défilement + effet du scroll : en descendant ça accélère, en remontant ça repart dans l'autre sens
            var move = c.dir * auto * dt + c.dir * vel * 0.55;
            c.y -= move;
            if (c.y <= -h) c.y += h; else if (c.y > 0) c.y -= h;
            c.track.style.transform = 'translate3d(0,' + c.y.toFixed(1) + 'px,0)';
        });
        started = true;
    }
    requestAnimationFrame(frame);
})();


/* Chiffres clés : compteur qui monte de 0 jusqu'à la valeur quand le chiffre apparaît (« +10 ans », « +50 », « 2 500+ ») */
(function () {
    var els = [].slice.call(document.querySelectorAll('.fch-stats dt, .stats b'));
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.forEach(function (el) {
        var txt = el.textContent.trim();
        var m = txt.match(/^(\D*?)(\d+(?:[\s  ]\d{3})*)(.*)$/);
        if (!m || /^(19|20)\d\d$/.test(txt)) return;          // une année (ex. 2020) ne se compte pas
        var pre = m[1], to = parseInt(m[2].replace(/\D/g, ''), 10), suf = m[3];
        if (!to || reduced) return;
        var fmt = function (n) { return n >= 1000 ? n.toLocaleString('fr-FR').replace(/ /g, ' ') : String(n); };
        el.textContent = pre + '0' + suf;
        var io = new IntersectionObserver(function (es) {
            if (!es[es.length - 1].isIntersecting) return;
            io.disconnect();
            var delay = el.closest('.fch-stats') ? 900 : 200, dur = 1600;
            setTimeout(function () {
                var t0 = performance.now();
                (function step(now) {
                    var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(2, -10 * k);   // départ rapide, fin en douceur
                    el.textContent = pre + fmt(Math.round(to * (k < 1 ? e : 1))) + suf;
                    if (k < 1) requestAnimationFrame(step);
                })(t0);
            }, delay);
        }, { threshold: 0.6 });
        io.observe(el);
    });
})();

/* Parcours : un cube rebondit de marche en marche sur un escalier infini.
   Il monte tout seul ; il monte plus vite quand on descend la page et repart dans l'autre sens quand on remonte. */
(function () {
    var svg = document.querySelector('[data-cube]');
    if (!svg) return;
    var stairs = svg.querySelector('.pc-stairs'), box = svg.querySelector('.pc-box');
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CYCLE = 1.1;                                   // une marche = 1,1 s (comme l'animation d'origine)
    function inQ(p) { return p * p; }
    function outQ(p) { return 1 - (1 - p) * (1 - p); }
    function pose(t) {                                  // t entre 0 et 1,1
        var bx, by;
        if (t < 0.6) { var p = t / 0.6; bx = 35 * inQ(p); by = -105 * outQ(p); }        // élan + saut
        else if (t < 1) { var q = (t - 0.6) / 0.4; bx = 35 + 25 * outQ(q); by = -105 + 45 * inQ(q); } // retombée sur la marche
        else { bx = 60; by = -60; }
        var rot = Math.min(1, t) * 540;                 // un tour et demi pendant le saut
        var k = t / CYCLE;
        stairs.setAttribute('transform', 'translate(' + (-60 * k).toFixed(2) + ' ' + (60 * k).toFixed(2) + ')');
        box.setAttribute('transform', 'translate(' + bx.toFixed(2) + ' ' + by.toFixed(2) + ') rotate(' + rot.toFixed(1) + ' 90 165)');
    }
    if (reduced) { pose(0); return; }
    var t = 0, speed = 1, dir = 1, lastY = scrollY, vel = 0, visible = true, last = performance.now();
    new IntersectionObserver(function (e) { visible = e[e.length - 1].isIntersecting; }).observe(svg);
    addEventListener('scroll', function () {
        var dy = scrollY - lastY; lastY = scrollY;
        if (Math.abs(dy) > 1) dir = dy > 0 ? 1 : -1;     // le sens suit le dernier scroll
        vel = Math.min(60, Math.abs(dy));
    }, { passive: true });
    (function frame(now) {
        requestAnimationFrame(frame);
        var dt = Math.min(0.05, (now - last) / 1000); last = now;
        vel *= 0.9;
        // vitesse signée : ralentit, passe par zéro et repart dans l'autre sens en douceur (comme l'original au clic)
        var target = dir * (0.8 + vel / 18);
        speed += (target - speed) * Math.min(1, dt * 3);
        if (!visible) return;
        t += dt * speed;
        t = ((t % CYCLE) + CYCLE) % CYCLE;
        pose(t);
    })(last);
})();


/* Bouton retour en haut (cube) : le liquide baisse quand on descend (plein en haut, moitié au milieu, vide à la fin),
   le pourcentage indique où l'on se trouve dans la page */
(function () {
    var btn = document.querySelector('[data-totop]');
    if (!btn) return;
    var pct = btn.querySelector('.tt-pct b'), ticking = false, ticks = [].slice.call(btn.querySelectorAll('.tt-tick'));
    function update() {
        ticking = false;
        // 0 % pile quand le footer arrive en bas de l'écran
        var foot = document.querySelector('.foot');
        var max = foot ? foot.getBoundingClientRect().top + scrollY - innerHeight : document.documentElement.scrollHeight - innerHeight;
        if (max <= 0) max = document.documentElement.scrollHeight - innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
        btn.style.setProperty('--fill', (1 - p).toFixed(4));
        var left = Math.round((1 - p) * 100);                    // ce qu'il reste : 100 % en haut, 0 % au footer
        pct.textContent = left;
        ticks.forEach(function (t) { t.classList.toggle('is-on', left <= +t.dataset.at); });   // repère atteint = vert
        btn.setAttribute('aria-label', 'Remonter en haut de la page (il reste ' + left + ' % de la page)');
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        history.replaceState(null, '', location.pathname + location.search);
    });
    update();
})();
