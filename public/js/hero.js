/* Hero « signal » — Portfolio (JavaScript sans framework)
   La foule est en gris ; des ondes partent de la souris et remettent la couleur
   là où elles passent. Quand une onde touche une personne, une bulle apparaît
   et le compteur augmente. Clic = grande onde. Sans souris = l'onde se promène. */
(function () {
    'use strict';

    var SPOTS = [
        [0.31, 0.12], [0.275, 0.21], [0.41, 0.17], [0.47, 0.29], [0.54, 0.3], [0.62, 0.27],
        [0.75, 0.18], [0.905, 0.08], [0.935, 0.19], [0.295, 0.37], [0.255, 0.39], [0.465, 0.39],
        [0.625, 0.39], [0.72, 0.47], [0.805, 0.43], [0.93, 0.4], [0.07, 0.58], [0.235, 0.53],
        [0.56, 0.56], [0.95, 0.55], [0.315, 0.65], [0.535, 0.71], [0.61, 0.73], [0.705, 0.75],
        [0.89, 0.74], [0.185, 0.7], [0.35, 0.8], [0.455, 0.91], [0.635, 0.94], [0.095, 0.87],
        [0.94, 0.89], [0.4, 0.87]
    ];

    var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var FS = [
        'precision mediump float;',
        'uniform sampler2D uTex;uniform vec2 uView;uniform float uImg;uniform float uZoom;uniform float uTime;uniform vec3 uLime;uniform vec4 uP[8];uniform vec3 uPtr;uniform float uDiag;uniform float uDim;',
        'vec2 cover(vec2 s){float ra=uView.x/uView.y;vec2 uv=s;if(ra>uImg){uv.y=(s.y-.5)*uImg/ra+.5;}else{uv.x=(s.x-.5)*ra/uImg+.5;}return (uv-.5)/uZoom+.5;}',
        'void main(){vec2 fc=vec2(gl_FragCoord.x,uView.y-gl_FragCoord.y);vec2 s=fc/uView;vec3 col=texture2D(uTex,clamp(cover(s),.001,.999)).rgb;',
        'float l=dot(col,vec3(.299,.587,.114));vec3 grey=mix(vec3(l)*vec3(.9,.94,1.),vec3(.03,.035,.045),uDim);',
        'float reach=0.;float rim=0.;',
        'for(int i=0;i<8;i++){vec4 P=uP[i];if(P.w<=0.)continue;float age=uTime-P.z;if(age<0.)continue;float R=age*uDiag*(.2+.07*P.w);float d=distance(fc,P.xy);float life=2.4+2.6*P.w;float fade=1.-smoothstep(life*.4,life,age);float band=uDiag*(.008+.006*P.w);',
        'rim+=exp(-pow((d-R)/band,2.))*(1.-smoothstep(0.,life*.75,age));reach=max(reach,(1.-smoothstep(R-band*5.,R+band,d))*fade);}',
        'float sp=(1.-smoothstep(uDiag*.035,uDiag*.12,distance(fc,uPtr.xy)))*uPtr.z;reach=max(reach,sp*.85);',
        'vec3 c=mix(grey,col*mix(1.,.86,uDim),reach);c=mix(c,uLime,clamp(rim,0.,1.)*.62);',
        'float vg=smoothstep(.45,1.,s.y)*.55+(1.-smoothstep(0.,.2,s.y))*.28;c*=1.-vg;',
        'gl_FragColor=vec4(c,1.);}'
    ].join('\n');

    var clamp01 = function (v) { return Math.min(1, Math.max(0, v)); };
    var fmt = function (n) { return n.toLocaleString('fr-FR'); };

    function cssRgb(el, varName, fb) {
        var v = getComputedStyle(el).getPropertyValue(varName).trim();
        var m = v.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : fb;
    }

    // compteur : chaque chiffre est une colonne 0–9 qui défile
    function renderRoll(el, text) {
        var chars = String(text).split('');
        if (el.dataset.len !== String(chars.length)) {
            el.dataset.len = String(chars.length);
            el.setAttribute('aria-label', text);
            el.innerHTML = '<span class="rwh-roll">' + chars.map(function (ch) {
                if (!/\d/.test(ch)) return '<span>' + (ch === ' ' || ch === ' ' ? '&nbsp;' : ch) + '</span>';
                var col = '';
                for (var d = 0; d < 10; d++) col += '<i>' + d + '</i>';
                return '<span class="rwh-rd"><span>' + col + '</span></span>';
            }).join('') + '</span>';
        }
        el.setAttribute('aria-label', text);
        var cols = el.querySelectorAll('.rwh-roll > span');
        chars.forEach(function (ch, i) {
            var c = cols[i];
            if (c && c.classList.contains('rwh-rd')) c.firstChild.style.transform = 'translateY(' + (-Number(ch) * 10) + '%)';
        });
    }

    function initHero(root) {
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
        var chips = [];
        try { chips = JSON.parse(root.dataset.chips || '[]'); } catch (e) {}
        if (!chips.length) chips = [{ icon: '●', text: '' }];
        var photo = root.dataset.photo;
        var canvas = root.querySelector('.rwh-cv');
        var chipLayer = root.querySelector('.rwh-chips');
        var copyEl = root.querySelector('.rwh-copy');
        var countEl = root.querySelector('[data-count]');
        var curEl = root.querySelector('.rwh-cur');

        // ---- apparition ----
        requestAnimationFrame(function () { setTimeout(function () { root.classList.add('is-in'); }, 80); });

        // ---- compteur ----
        var reach = Math.max(0, parseInt(root.dataset.counter || '0', 10) || 0);
        var acc = 0;
        renderRoll(countEl, fmt(reach));
        setInterval(function () {
            if (acc > 0) { reach += acc; acc = 0; renderRoll(countEl, fmt(reach)); }
        }, 1400);

        // ---- boutons magnétiques ----
        if (fine) {
            var btns = Array.prototype.slice.call(root.querySelectorAll('[data-mag]'));
            root.addEventListener('pointermove', function (e) {
                btns.forEach(function (b) {
                    var rc = b.getBoundingClientRect();
                    var dx = e.clientX - (rc.left + rc.width / 2), dy = e.clientY - (rc.top + rc.height / 2);
                    var d = Math.hypot(dx, dy), pull = d < 150 ? (1 - d / 150) * 8 : 0;
                    b.style.setProperty('--mx', (dx / (d || 1)) * pull + 'px');
                    b.style.setProperty('--my', (dy / (d || 1)) * pull + 'px');
                });
            });
            root.addEventListener('pointerleave', function () {
                btns.forEach(function (b) { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
            });
        }

        // ---- curseur personnalisé ----
        if (fine && window.innerWidth >= 810 && curEl) {
            root.classList.add('has-cur');
            var cx = -99, cy = -99, ax = -99, ay = -99, cOn = false, mode = '';
            var setMode = function (m) { if (m !== mode) { mode = m; curEl.dataset.m = m; } };
            root.addEventListener('pointermove', function (e) {
                cx = e.clientX; cy = e.clientY; cOn = true;
                var t = e.target;
                setMode(t.closest('.rw-btn, nav a') ? 'btn' : t.closest('.rwh-copy h1, .rwh-copy p') ? 'dot' : 'reach');
            });
            root.addEventListener('pointerleave', function () { cOn = false; setMode('out'); });
            root.addEventListener('pointerdown', function () {
                if (mode === 'btn') return;
                curEl.classList.remove('is-ping'); void curEl.offsetWidth; curEl.classList.add('is-ping');
            });
            (function loop() {
                if (cOn || ax > -50) {
                    ax += (cx - ax) * 0.28; ay += (cy - ay) * 0.28;
                    curEl.style.transform = 'translate3d(' + ax.toFixed(1) + 'px,' + ay.toFixed(1) + 'px,0)';
                }
                requestAnimationFrame(loop);
            })();
        }

        // ---- moteur WebGL ----
        var gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
        if (!gl) return; // pas de WebGL : la photo grise reste affichée
        var sh = function (type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
        var pr = gl.createProgram();
        gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
        gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(pr);
        if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
        gl.useProgram(pr);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        var loc = gl.getAttribLocation(pr, 'p');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        var U = function (n) { return gl.getUniformLocation(pr, n); };
        var uView = U('uView'), uImg = U('uImg'), uZoom = U('uZoom'), uTime = U('uTime'), uLime = U('uLime'),
            uP = U('uP'), uPtr = U('uPtr'), uDiag = U('uDiag'), uDim = U('uDim');
        var lime = cssRgb(root, '--rw-brass', [0.83, 1, 0.23]);
        gl.uniform3f(uLime, lime[0], lime[1], lime[2]);

        var imgAr = 2400 / 1340, texOk = false;
        var im = new Image();
        im.crossOrigin = 'anonymous';
        im.onload = function () {
            try {
                gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
                imgAr = im.naturalWidth / im.naturalHeight;
                texOk = true;
                root.classList.add('is-gl');
            } catch (e) {}
        };
        im.src = photo;

        var W = 1, H = 1, dpr = 1, diag = 1, vis = true, raf = 0, zoom = reduced ? 1 : 1.12, t0 = performance.now();
        var size = function () {
            dpr = Math.min(window.devicePixelRatio || 1, 1.6);
            var a = root.getBoundingClientRect();
            W = Math.max(1, a.width); H = Math.max(1, a.height);
            canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            diag = Math.hypot(W, H);
        };
        size();
        new ResizeObserver(size).observe(root);

        var P = []; // ondes : [x, y, temps, force]
        var now = function () { return (performance.now() - t0) / 1000; };
        var emit = function (x, y, s) {
            P.push([x, y, now(), s]);
            if (P.length > 8) P.shift();
            acc += Math.round(s * (120 + Math.random() * 380));
        };

        var cool = SPOTS.map(function () { return -99; });
        var k = Math.floor(Math.random() * chips.length);
        var spotXY = function (hx, hy) {
            var ra = W / H, ux = (hx - 0.5) * zoom + 0.5, uy = (hy - 0.5) * zoom + 0.5;
            if (ra > imgAr) uy = ((uy - 0.5) * ra) / imgAr + 0.5; else ux = ((ux - 0.5) * imgAr) / ra + 0.5;
            return [ux * W, uy * H];
        };
        var showChip = function (x, y) {
            var c = chips[k++ % chips.length];
            var el = document.createElement('span');
            el.className = 'rwh-chip';
            el.style.left = Math.round(x) + 'px';
            el.style.top = Math.round(y) + 'px';
            el.innerHTML = '<i class="rwh-chip-p"></i><b class="rwh-chip-i"></b><span></span>';
            el.querySelector('b').textContent = c.icon;
            el.querySelector('span').textContent = c.text;
            chipLayer.appendChild(el);
            var live = chipLayer.querySelectorAll('.rwh-chip.is-up');
            if (live.length > 3) live[0].classList.add('is-out');
            requestAnimationFrame(function () { el.classList.add('is-up'); });
            setTimeout(function () { el.classList.remove('is-up'); el.classList.add('is-out'); }, 2600);
            setTimeout(function () { el.remove(); }, 3200);
            acc += 40 + Math.round(Math.random() * 260);
        };
        var reachSpots = function (tn) {
            var cr = copyEl.getBoundingClientRect(), rr = root.getBoundingClientRect();
            P.forEach(function (p) {
                var age = tn - p[2];
                if (age < 0) return;
                var R = age * diag * (0.2 + 0.07 * p[3]);
                if (R > diag) return;
                SPOTS.forEach(function (s, i) {
                    if (tn - cool[i] < 7) return;
                    var xy = spotXY(s[0], s[1]), sx = xy[0], sy = xy[1];
                    if (sx < 90 || sx > W - 110 || sy < 190 || sy > H - 190) return;
                    if (sx + rr.left > cr.left - 40 && sx + rr.left < cr.right + 40 &&
                        sy + rr.top > cr.top - 30 && sy + rr.top < cr.bottom + 20) return;
                    if (Math.abs(Math.hypot(sx - p[0], sy - p[1]) - R) > 14) return;
                    cool[i] = tn;
                    showChip(sx, sy);
                });
            });
        };

        // souris = source du signal ; inactif / tactile = signal qui se promène
        var px = W / 2, py = H * 0.55, tx = px, ty = py, on = 0, onT = 0, lastMove = -99, lastEmit = -99;
        if (fine) {
            root.addEventListener('pointermove', function (e) {
                var a = root.getBoundingClientRect();
                tx = e.clientX - a.left; ty = e.clientY - a.top; onT = 1; lastMove = now();
            });
            root.addEventListener('pointerleave', function () { onT = 0; });
        }
        root.addEventListener('pointerdown', function (e) {
            if (e.target.closest('a,button,input,nav')) return;
            var a = root.getBoundingClientRect(), x = e.clientX - a.left, y = e.clientY - a.top;
            if (!fine) { tx = px = x; ty = py = y; lastMove = now(); }
            emit(x, y, 1.6); lastEmit = now();
        });

        new IntersectionObserver(function (es) {
            vis = es[0].isIntersecting;
            if (vis && !raf) raf = requestAnimationFrame(frame);
        }).observe(root);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden && vis && !raf) raf = requestAnimationFrame(frame);
        });

        var PU = new Float32Array(32), intro = reduced ? 0 : 1.6;
        function frame() {
            raf = 0;
            if (!vis || document.hidden) return;
            var tn = now(), a = root.getBoundingClientRect();
            var sy = clamp01(-a.top / (a.height || 1));
            zoom = reduced ? 1 + sy * 0.08 : 1 + 0.12 * Math.pow(1 - clamp01(tn / 2.2), 3) + sy * 0.08;
            var idle = !fine || tn - lastMove > 2.6 || onT === 0;
            if (idle) {
                var q = tn * 0.23;
                tx = W * (0.5 + 0.34 * Math.sin(q * 1.3));
                ty = H * (0.5 + 0.28 * Math.sin(q * 0.9 + 1.2));
            }
            px += (tx - px) * (idle ? 0.03 : 0.16);
            py += (ty - py) * (idle ? 0.03 : 0.16);
            on += ((fine && !idle ? 1 : 0) - on) * 0.08;
            if (!reduced && tn > intro && tn - lastEmit > (idle ? 1.9 : 1.35)) { emit(px, py, idle ? 0.7 : 0.9); lastEmit = tn; }
            if (!reduced && tn > intro - 0.2 && P.length === 0) { emit(W / 2, H * 0.55, 1.4); lastEmit = tn; }
            for (var i = 0; i < 8; i++) {
                var p = P[i];
                PU[i * 4] = p ? p[0] * dpr : 0;
                PU[i * 4 + 1] = p ? p[1] * dpr : 0;
                PU[i * 4 + 2] = p ? p[2] : 0;
                PU[i * 4 + 3] = p ? p[3] : 0;
            }
            if (texOk) {
                gl.uniform2f(uView, canvas.width, canvas.height);
                gl.uniform1f(uImg, imgAr);
                gl.uniform1f(uZoom, zoom);
                gl.uniform1f(uTime, tn);
                gl.uniform4fv(uP, PU);
                gl.uniform3f(uPtr, px * dpr, py * dpr, on);
                gl.uniform1f(uDiag, diag * dpr);
                gl.uniform1f(uDim, 0.42);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            }
            reachSpots(tn);
            root.style.setProperty('--sy', sy.toFixed(4));
            raf = requestAnimationFrame(frame);
        }
        raf = requestAnimationFrame(frame);
    }

    function boot() {
        document.querySelectorAll('[data-hero]').forEach(initHero);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
