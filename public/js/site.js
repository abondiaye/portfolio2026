/* Portfolio — interactions des sections (apparition, filtres, photos, formulaire, mentions) */
(function () {
    'use strict';

    // ---- titres de section : les mots montent un par un hors d'un masque,
    //      le mot accentué (<em>) prend un dégradé + une étincelle qui scintille (animation du template « Results you can count ») ----
    var SPARK = '<svg class="hd-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5C12.9 8 16 11.1 22.5 12 16 12.9 12.9 16 12 22.5 11.1 16 8 12.9 1.5 12 8 11.1 11.1 8 12 1.5Z"/></svg>';
    document.querySelectorAll('[data-head]').forEach(function (h) {
        var k = 0, step = 55, out = '';
        h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
        var word = function (w, acc) {
            var d = k++ * step;
            return '<span class="hd-w' + (acc ? ' is-accw' : '') + '" aria-hidden="true"><span class="hd-i" style="transition-delay:' + d + 'ms;--pd:' + (d + 500) + 'ms">' +
                (acc ? '<span class="hd-it">' + w + '</span>' : w) + '</span></span> ';
        };
        h.childNodes.forEach(function (n) {
            if (n.nodeType === 3) {
                n.textContent.split(/\s+/).filter(Boolean).forEach(function (w) { out += word(w, false); });
            } else if (n.nodeName === 'BR') {
                out += '<br>';
            } else if (n.nodeName === 'EM') {
                var ws = n.textContent.split(/\s+/).filter(Boolean);
                ws.forEach(function (w, i) {
                    var html = word(w, true);
                    if (i === ws.length - 1) html = html.replace('</span></span></span> ', SPARK + '</span></span></span> ');
                    out += html;
                });
            }
        });
        h.innerHTML = out;
        h.classList.add('hd', 'reveal');
    });

    // ---- apparition au scroll ----
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('is-on'); io.unobserve(e.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('is-on'); });
    }

    // ---- filtres du parcours ----
    var filters = document.querySelectorAll('.filter');
    filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var f = btn.dataset.filter;
            filters.forEach(function (b) {
                var on = b === btn;
                b.classList.toggle('is-on', on);
                b.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            document.querySelectorAll('.tl-item').forEach(function (li) {
                li.hidden = f !== 'all' && li.dataset.type !== f;
                if (!li.hidden) li.classList.add('is-on');
            });
        });
    });

    // ---- photos des hobbies en grand ----
    var lb = document.querySelector('.lightbox');
    if (lb && typeof lb.showModal === 'function') {
        var lbImg = lb.querySelector('img'), group = [], idx = 0;
        var show = function (i) {
            idx = (i + group.length) % group.length;
            lbImg.src = group[idx].href;
            lbImg.alt = group[idx].querySelector('img').alt;
        };
        document.querySelectorAll('[data-lightbox]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                group = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + a.dataset.lightbox + '"]:not([data-dup])'));
                var at = group.indexOf(a);
                show(at >= 0 ? at : +(a.dataset.i || 0));
                lb.showModal();
            });
        });
        lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
        lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
        lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
        lb.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') show(idx - 1);
            if (e.key === 'ArrowRight') show(idx + 1);
        });
    }

    // ---- mentions légales ----
    document.querySelectorAll('[data-open]').forEach(function (b) {
        b.addEventListener('click', function () {
            var d = document.getElementById(b.dataset.open);
            if (d && d.showModal) d.showModal();
        });
    });

    // ---- formulaire de contact (FormSubmit) ----
    var form = document.getElementById('contact-form');
    if (form) {
        var msg = form.querySelector('.form-msg'), btn = form.querySelector('.send');
        var say = function (text, cls) { msg.textContent = text; msg.className = 'form-msg ' + (cls || ''); };
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (form._honey.value) return; // robot
            if (!form.checkValidity()) {
                say('Merci d\'indiquer une adresse mail valide et un message.', 'err');
                form.reportValidity();
                return;
            }
            btn.disabled = true;
            say('Envoi en cours…');
            var cv = form.demande_cv.checked;
            fetch(form.dataset.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    email: form.email.value,
                    message: form.message.value,
                    demande_cv: cv ? 'Oui' : 'Non',
                    _subject: cv ? 'Portfolio : demande de CV' : 'Portfolio : nouveau message',
                    _template: 'table'
                })
            }).then(function (r) { return r.json().catch(function () { return { success: false, message: 'HTTP ' + r.status }; }); }).then(function (data) {
                if (data && (data.success === true || data.success === 'true')) {
                    form.reset();
                    say('Merci, votre message est bien parti. Je vous réponds rapidement.', 'ok');
                } else {
                    // FormSubmit renvoie la raison (ex. : formulaire pas encore activé) : on la garde pour la console
                    if (window.console) console.warn('FormSubmit :', data && data.message);
                    var activation = data && /activat/i.test(data.message || '');
                    throw new Error(activation ? 'activation' : 'fail');
                }
            }).catch(function (err) {
                var mail = (form.dataset.endpoint || '').split('/').pop();
                say(err && err.message === 'activation'
                    ? 'Le formulaire est en cours d\'activation. En attendant, écrivez-moi directement à ' + mail + '.'
                    : 'L\'envoi n\'a pas fonctionné. Écrivez-moi directement à ' + mail + '.', 'err');
            }).finally(function () { btn.disabled = false; });
        });
    }
})();

/* Icône d'onglet animée : l'étincelle verte tourne et scintille (pulsation lumineuse + petits éclats),
   un point blanc orbite autour (comme la section orbite) */
(function () {
    var link = document.getElementById('favicon');
    if (!link || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var S = 64, cv = document.createElement('canvas'); cv.width = cv.height = S;
    var ctx = cv.getContext('2d'); if (!ctx) return;
    var ACC = '#D4FF3A';
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function star(x, y, a, s, fill, blur) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
        ctx.beginPath(); ctx.moveTo(0, -18);
        ctx.quadraticCurveTo(2, -2, 18, 0); ctx.quadraticCurveTo(2, 2, 0, 18);
        ctx.quadraticCurveTo(-2, 2, -18, 0); ctx.quadraticCurveTo(-2, -2, 0, -18);
        ctx.fillStyle = fill; ctx.shadowColor = ACC; ctx.shadowBlur = blur; ctx.fill(); ctx.restore();
    }
    var t0 = performance.now();
    function draw() {
        var t = (performance.now() - t0) / 1000;
        // scintillement : un éclat bref toutes les ~1,6 s, et un plus petit entre deux
        var tw = Math.pow(Math.max(0, Math.sin(t * 3.9)), 10) + 0.45 * Math.pow(Math.max(0, Math.sin(t * 3.9 + 2.2)), 14);
        ctx.clearRect(0, 0, S, S);
        rr(0, 0, S, S, 15); ctx.fillStyle = '#0D0E10'; ctx.fill();
        // halo vert qui respire derrière l'étincelle
        var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
        g.addColorStop(0, 'rgba(212,255,58,' + (0.18 + tw * 0.4).toFixed(3) + ')'); g.addColorStop(1, 'rgba(212,255,58,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
        // anneau incliné (orbite)
        ctx.save(); ctx.translate(32, 32); ctx.rotate(-0.35);
        ctx.beginPath(); ctx.ellipse(0, 0, 25, 11, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212,255,58,' + (0.3 + tw * 0.3).toFixed(3) + ')'; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore();
        var a = t * 2.6, dx = Math.cos(a) * 25, dy = Math.sin(a) * 11, front = Math.sin(a) > 0;
        function dot() { ctx.save(); ctx.translate(32, 32); ctx.rotate(-0.35); ctx.beginPath(); ctx.arc(dx, dy, front ? 4.2 : 3, 0, Math.PI * 2); ctx.fillStyle = front ? '#fff' : 'rgba(255,255,255,.45)'; ctx.fill(); ctx.restore(); }
        if (!front) dot();
        // étincelle principale : pulsation + flash blanc au cœur pendant l'éclat
        var sc = 1 + Math.sin(t * 3) * 0.06 + tw * 0.18;
        star(32, 32, t * 0.9, sc, ACC, 6 + tw * 16);
        if (tw > 0.05) star(32, 32, t * 0.9, sc * 0.45, 'rgba(255,255,255,' + Math.min(1, tw * 1.2).toFixed(3) + ')', 0);
        // petits éclats qui apparaissent autour pendant le scintillement
        if (tw > 0.08) {
            star(51, 13, 0.4, 0.22 * tw, '#fff', 4);
            star(13, 50, -0.3, 0.16 * tw, ACC, 3);
        }
        if (front) dot();
        link.href = cv.toDataURL('image/png');
    }
    draw();
    setInterval(draw, 70);
})();
