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
            }).then(function (r) { return r.json(); }).then(function (data) {
                if (data && (data.success === true || data.success === 'true')) {
                    form.reset();
                    say('Merci, votre message est bien parti. Je vous réponds rapidement.', 'ok');
                } else {
                    throw new Error('fail');
                }
            }).catch(function () {
                say('L\'envoi n\'a pas fonctionné. Écrivez-moi directement à a_ndiaye@outlook.com.', 'err');
            }).finally(function () { btn.disabled = false; });
        });
    }
})();
