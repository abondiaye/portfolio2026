<?php

namespace App\Data;

/**
 * Tout le contenu du portfolio (repris de Portefolio2024).
 * Pour modifier un texte, un projet ou une expérience : c'est ici.
 */
final class PortfolioData
{
    public const NAME = "N'DIAYE Abdoulaye";
    public const ROLE = 'Technicien Support IT N1-N2 & Développeur Web';
    public const EMAIL = 'a_ndiaye@outlook.com';
    public const PHONE = '07 75 03 79 48';
    public const PHONE_LINK = '+33775037948';
    public const CV = 'asset/cv/CV_NDIAYE_Abdoulaye.pdf';
    public const VCARD = 'asset/contact/abdoulaye-ndiaye.vcf';

    /**
     * Style de l'accueil :
     *  - 'orb'    = sphère de particules qui change de forme au clic (ne demande aucune photo)
     *  - 'signal' = foule en gris, ondes de couleur sous la souris (demande public/images/hero-foule.webp)
     */
    public const HERO_STYLE = 'orb';

    public static function heroOrb(): array
    {
        return [
            'brand' => self::NAME,
            'live' => 'Lyon · Ouvert aux missions freelance',
            'eyebrow' => 'Support IT & Développeur Web',
            // Ligne 1 en haut à gauche, ligne 2 en bas à droite. *mot* = dégradé vert + étincelle
            'heading1' => 'Support IT &',
            'heading2' => 'développeur *web.*',
            'subCopy' => "10 ans de support utilisateurs N1-N2 (GLPI, ITIL, ServiceNow, Active Directory) et des sites web sur mesure en PHP, Symfony et Vue.js.",
            'primary' => ['label' => 'Me contacter', 'href' => '#contact'],
            'secondary' => ['label' => 'Voir mes projets', 'href' => '#projets'],
            'nav' => self::hero()['nav'],
            'navCta' => ['label' => 'Télécharger le CV', 'href' => self::CV],
            // 4 noms pour les 4 formes, dans l'ordre : G° (au départ), sphère, anneau, réseau
            'shapes' => ['GeniusPro360°', 'Support IT', 'Développement web', 'Réseau & infra'],
            // 3 bulles autour de la sphère : titre | détail
            'chips' => [
                ['a' => 'Sirius-Solar', 'b' => 'en ligne · Symfony 7'],
                ['a' => 'Sanofi Pasteur', 'b' => '2 500 utilisateurs'],
                ['a' => 'GeniusPro360°', 'b' => 'en ligne · Symfony 6.4'],
            ],
            'stats' => [
                ['a' => '10 ans', 'b' => 'de support IT N1-N2'],
                ['a' => '5', 'b' => 'projets web livrés'],
                ['a' => '2 500+', 'b' => 'utilisateurs supportés'],
            ],
            'cursorLabel' => 'Cliquez pour transformer',
        ];
    }

    public static function hero(): array
    {
        return [
            'brand' => self::NAME,
            'badge' => 'Lyon · Ouvert aux missions freelance',
            // "|" = retour à la ligne, *mots* = surlignés en vert
            'heading' => 'Support IT|*& développeur web.*',
            'subCopy' => "10 ans d'expérience en support utilisateurs (GLPI, ITIL, ServiceNow), Active Directory et déploiement de postes Windows, doublée d'une compétence en développement web Fullstack : PHP, Symfony, Vue.js.",
            'primary' => ['label' => 'Me contacter', 'href' => '#contact'],
            'secondary' => ['label' => 'Voir mes projets', 'href' => '#projets'],
            'nav' => [
                ['label' => 'Compétences', 'href' => '#competences'],
                ['label' => 'Projets', 'href' => '#projets'],
                ['label' => 'Parcours', 'href' => '#parcours'],
                ['label' => 'Hobbies', 'href' => '#hobbies'],
                ['label' => 'Contact', 'href' => '#contact'],
            ],
            'navCta' => ['label' => 'Télécharger le CV', 'href' => self::CV],
            'chips' => [
                ['icon' => '✓', 'text' => 'Sirius-Solar · Symfony 7'],
                ['icon' => '✓', 'text' => 'GeniusPro360° · Symfony 6.4'],
                ['icon' => '✓', 'text' => 'ServiceOne · API REST'],
                ['icon' => '{ }', 'text' => 'PHP · Symfony · Vue.js'],
                ['icon' => '⚙', 'text' => 'Active Directory · SCCM'],
                ['icon' => '#', 'text' => 'GLPI · ServiceNow · ITIL'],
                ['icon' => '☁', 'text' => 'Microsoft 365'],
                ['icon' => '⚡', 'text' => 'Missions GRDF · ENEDIS'],
                ['icon' => '+', 'text' => 'Sanofi Pasteur · 2 500 utilisateurs'],
                ['icon' => '▲', 'text' => 'Renault Trucks Volvo'],
                ['icon' => '★', 'text' => 'BTS Développeur Web Fullstack'],
            ],
            'services' => ['Support N1/N2', 'Symfony', 'Vue.js', 'ITIL'],
            'counterLabel' => 'Personnes touchées pendant votre visite',
            'counterStart' => 0,
            'proofTop' => '10 ans de support IT · 5 projets livrés',
            'proofBottom' => '2 500+ utilisateurs supportés · Lyon',
            'hint' => 'Bougez la souris · cliquez pour lancer',
            'cursorLabel' => 'Signal',
            // Mets ta photo de foule vue d'en haut ici (public/images/)
            'photo' => 'images/hero-foule.webp',
        ];
    }

    public static function about(): array
    {
        return [
            'photo' => 'asset/profil-2026.jpg',
            'intro' => "En freelance, je conçois des sites et applications sur mesure pour les PME avec GeniusPro360°.",
            'stats' => [
                ['value' => '10 ans', 'label' => 'de support IT'],
                ['value' => '5', 'label' => 'projets livrés'],
                ['value' => '2 500+', 'label' => 'utilisateurs supportés'],
                ['value' => '2020', 'label' => 'je code depuis'],
            ],
            'qualities' => ['Créatif', 'Forte adaptabilité', 'Bon sens relationnel', 'Autonome', 'Curieux', 'Polyvalent', 'Minutieux'],
            'skills' => [
                'Langages' => ['PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'MySQL'],
                'Frameworks' => ['Symfony', 'Laravel', 'Vue.js', 'Twig'],
                'Outils dev' => ['VS Code', 'Git', 'Composer', 'npm', 'Yarn', 'Docker', 'Figma', 'Postman'],
                'Support IT' => ['Active Directory', 'Windows 10/11', 'SCCM', 'Microsoft 365', 'GLPI', 'ServiceNow', 'EasyVista', 'ITIL', 'Réseau LAN/VLAN', 'Citrix', 'SAP'],
            ],
        ];
    }

    public static function projects(): array
    {
        return [
            [
                'title' => 'Sirius-Solar',
                'image' => 'asset/projets/sirius-solar.webp',
                'alt' => 'Page d\'accueil de sirius-solar.ch : logo Sirius-Solar sur fond de panneaux solaires',
                'text' => "Site d'une entreprise suisse de nettoyage de panneaux photovoltaïques : devis calculé au m² selon le toit et l'accès, prise de rendez-vous, espace client et back-office.",
                'stack' => ['Symfony 7', 'Twig', 'MariaDB', 'Three.js'],
                'status' => 'En ligne',
                'url' => 'https://sirius-solar.ch',
                'urlLabel' => 'sirius-solar.ch',
            ],
            [
                'title' => 'GeniusPro360°',
                'image' => 'asset/projets/geniuspro360.jpg',
                'alt' => 'Page d\'accueil du site geniuspro360.com : un G bronze se grave dans le noir',
                'text' => "Site de mon activité freelance, avec back-office et animation canvas sur mesure, déployé chez Infomaniak.",
                'stack' => ['Symfony 6.4', 'Twig', 'EasyAdmin', 'MariaDB'],
                'status' => 'En ligne',
                'url' => 'https://geniuspro360.com',
                'urlLabel' => 'geniuspro360.com',
            ],
            [
                'title' => 'ServiceOne',
                'image' => 'asset/projets/serviceone.webp',
                'alt' => 'Page d\'accueil de ServiceOne : suivi des démarches administratives',
                'text' => "Plateforme de suivi des démarches administratives : dépôt de dossiers et de documents, statut en temps réel, notifications, tickets de support.",
                'stack' => ['Symfony 6.4', 'API REST', 'App mobile'],
                'status' => 'Bientôt en ligne',
                'url' => 'https://serviceone.fr',
                'urlLabel' => 'serviceone.fr',
            ],
            [
                'title' => 'Carwash',
                'image' => 'asset/projets/carwash.webp',
                'alt' => 'Maquette du site Carwash : réservation de lavage auto',
                'text' => "Maquette d'un site de station de lavage : formules à prix fixe selon le véhicule, avant / après interactif, réservation d'un créneau en 4 étapes avec le total en direct.",
                'stack' => ['HTML', 'CSS', 'JavaScript'],
                'status' => 'Maquette',
                'url' => 'https://geniuspro360.com/maquettes/carwash/',
                'urlLabel' => 'Voir la maquette',
            ],
            [
                'title' => 'Survivoor',
                'image' => 'asset/projets/survivoor.webp',
                'alt' => "Maquette de l'application mobile Survivoor : écrans accueil, carte, tutoriels, équipement et profil",
                'text' => "Maquette UI/UX d'une application mobile de survie outdoor : défis du jour, tutoriels pas à pas, carte interactive des points d'intérêt, suivi d'équipement et profil gamifié (niveaux, XP, badges).",
                'stack' => ['Figma', 'UI/UX'],
                'status' => 'Maquette mobile',
                'url' => null,
                'urlLabel' => null,
            ],
            [
                'title' => 'Portfolio 2024',
                'image' => 'asset/projets/portfolio.png',
                'alt' => 'Présentation de Abdoul-Web',
                'text' => "Mon précédent portfolio, réalisé en HTML et JavaScript vanilla, inspiré des frameworks « single page application ».",
                'stack' => ['HTML', 'CSS', 'JavaScript'],
                'status' => 'Archivé',
                'url' => null,
                'urlLabel' => null,
            ],
            [
                'title' => 'Site commercial · sf_limas',
                'image' => null,
                'alt' => '',
                'text' => "Site vitrine commercial réalisé pendant mon BTS Développeur Web Fullstack à la CCI Limas.",
                'stack' => ['Symfony', 'PHP', 'MySQL'],
                'status' => 'Projet de formation',
                'url' => null,
                'urlLabel' => null,
            ],
            [
                'title' => 'E-commerce · cours_VMC',
                'image' => null,
                'alt' => '',
                'text' => "Site e-commerce en Vue.js connecté à une API, réalisé dans le cadre de mon BTS à la CCI Limas. Projet non finalisé.",
                'stack' => ['Vue.js', 'API REST'],
                'status' => 'Projet de formation',
                'url' => null,
                'urlLabel' => null,
            ],
        ];
    }

    public static function timeline(): array
    {
        return [
            [
                'type' => 'poste', 'period' => "06/2026 - Aujourd'hui", 'duration' => 'En cours',
                'title' => 'Technicien Support IT · Guichet informatique', 'org' => 'Renault Trucks Volvo, Saint-Priest',
                'logo' => 'asset/formation/volvo.png',
                'text' => "Support utilisateurs en présentiel au guichet informatique du site de Saint-Priest, avec suivi des incidents et gestion du parc informatique.",
                'items' => ['Support utilisateurs N1/N2 en face à face', 'Diagnostic et résolution d\'incidents matériels et logiciels', 'Gestion des tickets via GLPI, méthodologie ITIL', 'Administration de comptes et droits Active Directory', 'Déploiement et configuration de postes Windows'],
            ],
            [
                'type' => 'formation', 'period' => '2025 - 2026', 'duration' => 'Non obtenu',
                'title' => 'BTS Formateur', 'org' => 'IFPA',
                'logo' => 'asset/formation/ifpa.png',
                'text' => "Formation au métier de formateur pour adultes : conception de séquences pédagogiques, animation de groupe et évaluation des apprentissages.",
                'items' => [],
            ],
            [
                'type' => 'poste', 'period' => '09/2024 - 09/2025', 'duration' => '1 an',
                'title' => 'Technicien Support IT Itinérant · Freelance', 'org' => 'GRDF, STORENIGE, ENEDIS · Lyon',
                'logo' => null,
                'text' => "Maintenance et dépannage sur site, installation de matériel réseau et support utilisateurs en mission freelance.",
                'items' => ['Maintenance et dépannage sur site (PC, tablettes, routeurs, Wi-Fi)', 'Installation de matériel réseau (switchs, câblage structuré)', 'Support N1/N2 et tickets via ServiceNow', 'Administration de comptes Active Directory', 'Déploiement de postes Windows 10/11'],
            ],
            [
                'type' => 'poste', 'period' => '05/2024 - 06/2024', 'duration' => '2 mois',
                'title' => 'Technicien Support IT Itinérant', 'org' => 'EXPECTRA · ENEDIS Lyon',
                'logo' => null,
                'text' => null,
                'items' => ["Installation et configuration de bornes d'accès VIGIK", 'Brassage réseau et câblage structuré', 'Dépannage en environnement Windows 10 / LAN-VLAN', 'Gestion des incidents via EasySnow et support à distance'],
            ],
            [
                'type' => 'poste', 'period' => '01/2024 - 05/2024', 'duration' => '4 mois',
                'title' => 'Technicien Support Utilisateur · Intérim', 'org' => 'EXPECTRA · SDMIS',
                'logo' => null,
                'text' => 'Masterisation et déploiement de postes en environnement critique 24/7.',
                'items' => ['Masterisation et déploiement de postes (volume important)', 'Installation et support de logiciels métier (Citrix, SAP, Teams)', 'Support technique en environnement critique 24/7', "Rédaction de procédures d'installation"],
            ],
            [
                'type' => 'formation', 'period' => '2023 - 2024', 'duration' => '1 an',
                'title' => 'BTS Développeur Web Fullstack', 'org' => 'CCI Limas',
                'logo' => 'asset/formation/cci.png',
                'text' => "Conception et développement d'applications web avec PHP/Symfony et Vue.js, en méthodologie Agile.",
                'items' => ['Création d\'API REST', 'Modélisation et création de bases de données', 'Git', 'Tests unitaires', 'Méthode Agile et CRUD'],
            ],
            [
                'type' => 'poste', 'period' => '08/2022 - 12/2022', 'duration' => '4 mois',
                'title' => 'Technicien Support de Proximité', 'org' => 'EXPECTRA · SANOFI PASTEUR Lyon',
                'logo' => null,
                'text' => 'Support N1/N2 pour un parc de 2 500 utilisateurs, 20 à 30 tickets traités par jour.',
                'items' => ['Support N1/N2 pour 2 500 utilisateurs', 'Gestion du parc (inventaire, suivi, maintenance)', 'Dépannage Windows 10 et Microsoft 365 via ticketing et Active Directory'],
            ],
            [
                'type' => 'poste', 'period' => '07/2022', 'duration' => 'Mission courte',
                'title' => 'Technicien de Proximité', 'org' => 'IFP Énergies Nouvelles · Lyon',
                'logo' => null,
                'text' => null,
                'items' => ['Gestion des incidents et assistance à distance (HEAT, ServiceNow)', 'Déploiement et configuration SCCM sur postes Windows 10', 'Inventaire et suivi du parc'],
            ],
            [
                'type' => 'poste', 'period' => '03/2021 - 06/2022', 'duration' => '1 an',
                'title' => 'Technicien Support de Proximité', 'org' => 'FRAMATOME · Lyon',
                'logo' => null,
                'text' => null,
                'items' => ['Support de proximité Windows 7/10 et Active Directory', 'Dépannage, récupération de données et désinfection de postes', 'Gestion des demandes via EasyVista'],
            ],
            [
                'type' => 'formation', 'period' => '2017 - 2018', 'duration' => '1 an',
                'title' => "BAC Technicien d'Assistance Informatique", 'org' => 'AFPA Vénissieux',
                'logo' => 'asset/formation/afpa.png',
                'text' => "Support informatique de proximité : assistance aux utilisateurs, maintenance des postes et déploiement de matériel et logiciels.",
                'items' => ['Assister et dépanner les utilisateurs', "Intervenir sur l'infrastructure", 'Software et hardware', 'Déploiement'],
            ],
            [
                'type' => 'formation', 'period' => '2012 - 2013', 'duration' => '1 an',
                'title' => "CAP Agent d'Accueil et Conduite Routière", 'org' => 'AFT-IFTIM · Villette-d\'Anthon',
                'logo' => null,
                'text' => 'Gestion des déplacements, sécurité routière et relation avec les usagers.',
                'items' => [],
            ],
        ];
    }

    public static function hobbies(): array
    {
        return [
            [
                'title' => 'Cuisine', 'tag' => 'Passion culinaire',
                'text' => 'Après avoir obtenu 2 titres (CAP Cuisine et Traiteur) depuis 2003, la cuisine reste toujours une passion.',
                'photos' => ['cuisine/IMG_0059', 'cuisine/IMG_0393', 'cuisine/IMG_1246:JPG', 'cuisine/IMG_1447', 'cuisine/IMG_2480', 'cuisine/IMG_0016'],
            ],
            [
                'title' => 'FiveToFive · Foot en salle', 'tag' => 'Sport & quartier',
                'text' => "J'aime nos districts urbains et accompagner nos petits frères dans leurs compétitions de foot en salle.",
                'photos' => ['photographie/IMG_0550:JPG', 'photographie/003:JPG', 'photographie/IMG_0743', 'photographie/IMG_0941:jpeg', 'photographie/IMG_1123', 'photographie/IMG_1212'],
            ],
            [
                'title' => 'Informatique & téléphonie', 'tag' => 'Démontage & réparation',
                'text' => 'Par curiosité et passion, je démonte et répare téléphones et ordinateurs, toujours à la recherche de comment ça fonctionne.',
                'photos' => ['bois/Photo-0004k', 'bois/IMG_0332', 'bois/IMG_1232', 'bois/IMG_1900', 'bois/IMG_0108', 'bois/572:JPG'],
            ],
            [
                'title' => 'Bénévolat · Association SIF', 'tag' => 'Solidarité',
                'text' => "Bénévole au sein de l'association SIF, où je donne des cours d'informatique à des seniors et participe à la distribution alimentaire.",
                'photos' => ['sif/cours_informatique', 'sif/distribution_alimentaire'],
            ],
        ];
    }

    /**
     * Texte qui s'allume mot par mot au défilement. *mots* = en couleur d'accent, [photo:chemin] = petite photo dans le texte.
     */
    public static function manifesto(): array
    {
        return [
            'eyebrow' => 'Pourquoi moi',
            'text' => "Pendant dix ans, j'ai été celui qu'on appelle quand plus rien ne marche : un poste bloqué, [photo:asset/hobbies/bois/IMG_0332.jpg] un compte verrouillé, un réseau qui tombe. Aujourd'hui je construis aussi les sites et les applications, [photo:asset/projets/sirius-solar.webp] pour que vous ayez *un seul interlocuteur,* du premier ticket à la mise en ligne. [photo:asset/hobbies/sif/cours_informatique.jpg]",
            'signature' => "N'DIAYE Abdoulaye · Lyon",
        ];
    }

    /** Entreprises et projets affichés en orbite autour du noyau. */
    public static function clients(): array
    {
        return [
            'eyebrow' => 'Ils m\'ont fait confiance',
            'title' => 'Dix ans de missions.|*Un seul noyau.*',
            'text' => "Énergie, santé, industrie, secours : des environnements critiques où le support ne peut pas attendre. Passez sur un nom pour voir ce que j'y ai fait.",
            'core' => '10 ans',
            'items' => [
                ['name' => 'Renault Trucks Volvo', 'tag' => 'Industrie', 'what' => 'Guichet informatique N1/N2'],
                ['name' => 'Sanofi Pasteur', 'tag' => 'Santé', 'what' => '2 500 utilisateurs'],
                ['name' => 'ENEDIS', 'tag' => 'Énergie', 'what' => 'Réseau, VIGIK, Windows'],
                ['name' => 'GRDF', 'tag' => 'Énergie', 'what' => 'Support itinérant'],
                ['name' => 'IFP Énergies Nouvelles', 'tag' => 'Recherche', 'what' => 'Déploiement SCCM'],
                ['name' => 'Framatome', 'tag' => 'Nucléaire', 'what' => 'Support de proximité'],
                ['name' => 'SDMIS', 'tag' => 'Secours 24/7', 'what' => 'Masterisation de postes'],
                ['name' => 'Sirius-Solar', 'tag' => 'Client web', 'what' => 'Site Symfony 7'],
                ['name' => 'GeniusPro360°', 'tag' => 'Freelance', 'what' => 'Studio web'],
            ],
        ];
    }

    /** Appel final (grand bouton rond). */
    public static function cta(): array
    {
        return [
            'eyebrow' => 'Disponible pour de nouvelles missions',
            'title' => 'Prêt quand|*vous l\'êtes.*',
            'button' => 'Me contacter',
            'text' => "Un poste à pourvoir, une mission de support ou un site à construire ? Écrivez-moi, je réponds rapidement.",
        ];
    }

    public static function links(): array
    {
        return [
            ['label' => 'LinkedIn', 'href' => 'https://www.linkedin.com/in/abdoulaye-n-diaye-aaa799199/'],
            ['label' => 'GitHub', 'href' => 'https://github.com/abondiaye'],
            ['label' => 'GeniusPro360°', 'href' => 'https://geniuspro360.com'],
        ];
    }
}
