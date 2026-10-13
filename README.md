# Folio — Portfolio de N'DIAYE Abdoulaye (Symfony)

Portfolio personnel en Symfony 7.3 : accueil animé (sphère de particules), compétences, projets, parcours, hobbies et contact. Contenus repris de Portefolio2024.

## Lancer le site (première fois)

```bash
cd ~/Development/folio
cp .env.dist .env   # puis mets une valeur au hasard dans APP_SECRET
composer install
php -S 127.0.0.1:8000 -t public
```

Ouvre ensuite http://127.0.0.1:8000. Si tu as la CLI Symfony, `symfony serve` marche aussi.

## Choisir l'accueil animé

Dans `src/Data/PortfolioData.php`, la ligne `HERO_STYLE` choisit l'accueil :

- `'orb'` (par défaut) : sphère de particules qui suit la souris et change de forme au clic (sphère, anneau, réseau). Aucune photo nécessaire. Textes dans `heroOrb()`.
- `'signal'` : foule en gris et ondes de couleur. Textes dans `hero()`.

## L'image de fond (accueil « signal » seulement)

Place ta photo dans `public/images/hero-foule.webp`. Une foule vue d'en haut donne le meilleur effet. Pour utiliser un autre nom de fichier, change `'photo'` dans `src/Data/PortfolioData.php`.

## Modifier les textes

Tout le contenu est dans **`src/Data/PortfolioData.php`** : accueil, compétences, projets, parcours, hobbies, liens et coordonnées. Les photos sont dans `public/asset/`.

- Dans le titre, `|` crée un retour à la ligne et `*mots*` surligne les mots en vert.
- Couleurs : variables en haut de `public/css/hero.css` (`--rw-brass` = vert citron).

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/Data/PortfolioData.php` | Tout le contenu du site |
| `src/Controller/HomeController.php` | Prépare les données pour la page |
| `templates/sections/` | Compétences, projets, parcours, hobbies, contact, pied de page |
| `public/css/site.css` · `public/js/site.js` | Styles et interactions des sections |
| `templates/components/_hero.html.twig` | HTML de l'accueil animé |
| `public/css/hero.css` · `public/js/hero.js` | Accueil « signal » (WebGL, bulles, compteur, curseur) + couleurs du site |
| `templates/components/_hero_orb.html.twig` · `public/css/hero-orb.css` · `public/js/hero-orb.js` | Accueil « orb » (sphère de particules) |

## Formulaire de contact

Il passe par FormSubmit, comme l'ancien site, vers a_ndiaye@outlook.com. Au premier envoi, FormSubmit envoie un mail de confirmation à cette adresse : il faut cliquer sur le lien pour l'activer.
