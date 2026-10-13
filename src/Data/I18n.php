<?php

namespace App\Data;

/**
 * Version anglaise du portfolio.
 *  - ui()  : petits textes de l'interface (titres, boutons, formulaire…) en français et en anglais.
 *  - en()  : textes anglais qui remplacent ceux de PortfolioData (les images, liens et logos restent ceux de PortfolioData).
 * Pour corriger une traduction : c'est ici. Pour ajouter un projet ou une expérience : PortfolioData puis ici (même position dans la liste).
 */
final class I18n
{
    public const LOCALES = ['fr', 'en'];

    public static function ui(string $locale): array
    {
        $fr = [
            'htmlTitle' => "N'DIAYE Abdoulaye · Support IT & Développeur Web",
            'metaDesc' => "Portfolio de N'DIAYE Abdoulaye, technicien support IT N1-N2 à Lyon (plus de 10 ans d'expérience) et développeur web fullstack PHP, Symfony et Vue.js.",
            'ogDesc' => 'Technicien Support IT N1-N2 & Développeur Web PHP / Symfony / Vue.js à Lyon.',
            'ogLocale' => 'fr_FR',
            'langLabel' => 'Changer de langue',
            'navAria' => 'Navigation principale',
            'orbAria' => 'Changer la forme, actuellement :',
            'chipsAria' => 'Quelques réalisations',
            // compétences
            'photoAlt' => "Photo de N'DIAYE Abdoulaye",
            'baA' => 'Support IT',
            'baB' => 'Développeur web',
            'baAria' => 'Comparer Support IT et Développeur web',
            'aboutEyebrow' => 'Qui suis-je',
            'aboutTitle' => 'Double compétence,<br><em>un seul interlocuteur.</em>',
            'boardTitle' => 'Deux métiers.<br><em>Une boîte à outils.</em>',
            'boardCount' => 'compétences utilisées en mission',
            'boardTag' => "N'DIAYE · BOÎTE À OUTILS",
            'qualitiesAria' => 'Qualités',
            // projets
            'pjEyebrow' => 'Réalisations',
            'pjTitle' => 'Mes <em>projets.</em>',
            'pjLead' => 'Sites vitrines, plateformes métier et maquettes : du besoin client à la mise en ligne, conçus, développés et déployés par mes soins.',
            'pjAll' => 'Un projet en tête ?',
            // parcours
            'tlEyebrow' => 'Expériences & formations',
            'tlTitle' => 'Mon <em>parcours.</em>',
            'tlJobs' => 'postes occupés',
            'tlTrainings' => 'formations suivies',
            'tlYears' => '+10 ans',
            'tlYearsLabel' => "d'expérience IT",
            'tlFilterAria' => 'Filtrer le parcours',
            'tlAll' => 'Tout',
            'tlJobsBtn' => 'Postes',
            'tlTrainingsBtn' => 'Formations',
            'tlJob' => 'Poste',
            'tlTraining' => 'Formation',
            // hobbies
            'hobEyebrow' => 'En dehors du code',
            'hobTitle' => 'Mes <em>hobbies.</em>',
            'hobLead' => "Cuisine, foot en salle, réparation et bénévolat : ce qui m'occupe quand je ne suis pas derrière un écran. Clique sur une photo pour l'agrandir.",
            'photo' => 'photo',
            'lbAria' => 'Photo agrandie',
            'close' => 'Fermer',
            'prev' => 'Photo précédente',
            'next' => 'Photo suivante',
            // contact
            'ctEyebrow' => 'Contact',
            'ctTitle' => 'Me <em>contacter.</em>',
            'ctLead' => "N'hésitez pas à me contacter, je suis à votre disposition pour plus d'informations.",
            'ctPhotoAlt' => "N'DIAYE Abdoulaye sur une plage, au bord de la mer",
            'ctCaption' => 'Même en pause, je réponds vite',
            'ctRole' => 'Support IT · Développeur web',
            'ctSave' => 'Enregistrer le contact',
            'ctCv' => 'Télécharger le CV',
            'waHello' => 'Bonjour Abdoulaye, je vous contacte depuis votre portfolio.',
            'fMail' => 'Votre adresse mail',
            'fMsg' => 'Votre message',
            'fCv' => 'Je souhaite recevoir le CV par mail',
            'fHoney' => 'Ne pas remplir',
            'fSend' => 'Envoyer',
            'fSendSub' => 'par mail + WhatsApp',
            'fNote' => 'Envoyé à %mail% et sur WhatsApp au %phone%.',
            // footer
            'footFreelance' => 'Mon activité freelance : geniuspro360.com',
            'legal' => 'Mentions légales',
            'legalEditor' => 'Éditeur',
            'legalEditorTxt' => "Abdoulaye N'DIAYE, Lyon. Contact :",
            'legalHost' => 'Hébergement',
            'legalHostTxt' => 'Infomaniak Network SA, Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse.',
            'legalData' => 'Données personnelles',
            'legalDataTxt' => "Le formulaire de contact transmet votre adresse e-mail et votre message via le service FormSubmit, uniquement pour vous répondre. Ce site n'utilise aucun cookie de suivi ni outil de mesure d'audience.",
            'legalContent' => 'Contenus',
            'legalContentTxt' => "Textes et photos : © Abdoulaye N'DIAYE. Logos des technologies : propriété de leurs auteurs.",
            // bouton retour en haut
            'topAria' => 'Remonter en haut de la page',
            'topRing' => 'REMONTER ↑ · REMONTER ↑ · REMONTER ↑ · ',
        ];

        if ('en' !== $locale) {
            return $fr;
        }

        return array_merge($fr, [
            'htmlTitle' => "Abdoulaye N'DIAYE · IT Technician & Web Developer",
            'metaDesc' => "Portfolio of Abdoulaye N'DIAYE, IT technician in Lyon, France (10+ years of Tier 1-2 support) and full-stack web developer (PHP, Symfony, Vue.js).",
            'ogDesc' => 'IT Technician & PHP / Symfony / Vue.js Web Developer in Lyon, France.',
            'ogLocale' => 'en_GB',
            'langLabel' => 'Change language',
            'navAria' => 'Main navigation',
            'orbAria' => 'Change the shape, currently:',
            'chipsAria' => 'Selected work',
            'photoAlt' => "Photo of Abdoulaye N'DIAYE",
            'baA' => 'IT Technician',
            'baB' => 'Web developer',
            'baAria' => 'Compare IT Technician and Web developer',
            'aboutEyebrow' => 'About me',
            'aboutTitle' => 'Two skill sets,<br><em>one point of contact.</em>',
            'boardTitle' => 'Two professions.<br><em>One toolbox.</em>',
            'boardCount' => 'skills used on assignments',
            'boardTag' => "N'DIAYE · TOOLBOX",
            'qualitiesAria' => 'Qualities',
            'pjEyebrow' => 'Work',
            'pjTitle' => 'My <em>projects.</em>',
            'pjLead' => 'Showcase sites, business platforms and mockups: from the client brief to going live, designed, built and deployed by me.',
            'pjAll' => 'Got a project in mind?',
            'tlEyebrow' => 'Experience & education',
            'tlTitle' => 'My <em>journey.</em>',
            'tlJobs' => 'positions held',
            'tlTrainings' => 'training programmes',
            'tlYears' => '10+ yrs',
            'tlYearsLabel' => 'of IT experience',
            'tlFilterAria' => 'Filter the timeline',
            'tlAll' => 'All',
            'tlJobsBtn' => 'Jobs',
            'tlTrainingsBtn' => 'Education',
            'tlJob' => 'Job',
            'tlTraining' => 'Education',
            'hobEyebrow' => 'Beyond the code',
            'hobTitle' => 'My <em>hobbies.</em>',
            'hobLead' => "Cooking, indoor football, repairs and volunteering: what keeps me busy when I'm not behind a screen. Click a photo to enlarge it.",
            'photo' => 'photo',
            'lbAria' => 'Enlarged photo',
            'close' => 'Close',
            'prev' => 'Previous photo',
            'next' => 'Next photo',
            'ctEyebrow' => 'Contact',
            'ctTitle' => 'Get in <em>touch.</em>',
            'ctLead' => "Feel free to reach out, I'm happy to tell you more.",
            'ctPhotoAlt' => "Abdoulaye N'DIAYE on a beach, by the sea",
            'ctCaption' => 'Even on a break, I reply fast',
            'ctRole' => 'IT Technician · Web developer',
            'ctSave' => 'Save contact',
            'ctCv' => 'Download CV',
            'waHello' => "Hello Abdoulaye, I'm contacting you from your portfolio.",
            'fMail' => 'Your email address',
            'fMsg' => 'Your message',
            'fCv' => "I'd like to receive your CV by email",
            'fHoney' => 'Leave empty',
            'fSend' => 'Send',
            'fSendSub' => 'by email + WhatsApp',
            'fNote' => 'Sent to %mail% and on WhatsApp to %phone%.',
            'footFreelance' => 'My freelance studio: geniuspro360.com',
            'legal' => 'Legal notice',
            'legalEditor' => 'Publisher',
            'legalEditorTxt' => "Abdoulaye N'DIAYE, Lyon, France. Contact:",
            'legalHost' => 'Hosting',
            'legalHostTxt' => 'Infomaniak Network SA, Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Switzerland.',
            'legalData' => 'Personal data',
            'legalDataTxt' => 'The contact form sends your email address and message through the FormSubmit service, only so I can reply to you. This site uses no tracking cookies or audience analytics.',
            'legalContent' => 'Content',
            'legalContentTxt' => "Text and photos: © Abdoulaye N'DIAYE. Technology logos belong to their respective owners.",
            'topAria' => 'Back to top of the page',
            'topRing' => 'BACK TO TOP ↑ · BACK TO TOP ↑ · BACK TO TOP ↑ · ',
        ]);
    }

    /**
     * Applique la traduction anglaise d'une section de PortfolioData.
     */
    public static function en(string $section, array $fr): array
    {
        switch ($section) {
            case 'heroOrb':
                return array_replace($fr, [
                    'live' => 'Lyon, France · Open to freelance work',
                    'eyebrow' => 'IT Technician & Web Developer',
                    'heading1' => 'IT Technician &',
                    'heading2' => 'web *developer.*',
                    'subCopy' => '10+ years of Tier 1-2 user support (GLPI, ITIL, ServiceNow, Active Directory) and custom websites built with PHP, Symfony and Vue.js.',
                    'primary' => ['label' => 'Contact me', 'href' => '#contact'],
                    'secondary' => ['label' => 'See my projects', 'href' => '#projets'],
                    'nav' => self::nav(),
                    'navCta' => ['label' => 'Download CV', 'href' => $fr['navCta']['href']],
                    'shapes' => ['GeniusPro360°', 'IT Support', 'Web development', 'Network & infra'],
                    'chips' => [
                        ['a' => 'Sirius-Solar', 'b' => 'live · Symfony 7'],
                        ['a' => 'Sanofi Pasteur', 'b' => '2,500 users'],
                        ['a' => 'GeniusPro360°', 'b' => 'live · Symfony 6.4'],
                    ],
                    'stats' => [
                        ['a' => '10+ yrs', 'b' => 'of Tier 1-2 IT support'],
                        ['a' => '50+', 'b' => 'web projects delivered'],
                        ['a' => '2,500+', 'b' => 'users supported'],
                    ],
                    'cursorLabel' => 'Click to transform',
                ]);

            case 'hero':
                return array_replace($fr, [
                    'badge' => 'Lyon, France · Open to freelance work',
                    'heading' => 'IT Technician|*& web developer.*',
                    'subCopy' => '10+ years of experience in user support (GLPI, ITIL, ServiceNow), Active Directory and Windows deployment, combined with full-stack web development skills: PHP, Symfony, Vue.js.',
                    'primary' => ['label' => 'Contact me', 'href' => '#contact'],
                    'secondary' => ['label' => 'See my projects', 'href' => '#projets'],
                    'nav' => self::nav(),
                    'navCta' => ['label' => 'Download CV', 'href' => $fr['navCta']['href']],
                    'counterLabel' => 'People reached during your visit',
                    'proofTop' => '10+ years of IT support · 50+ projects delivered',
                    'proofBottom' => '2,500+ users supported · Lyon',
                    'hint' => 'Move your mouse · click to start',
                ]);

            case 'about':
                return array_replace($fr, [
                    'intro' => 'As a freelancer, I design custom websites and applications for small businesses with GeniusPro360°.',
                    'stats' => [
                        ['value' => '10+ yrs', 'label' => 'of IT support'],
                        ['value' => '50+', 'label' => 'projects delivered'],
                        ['value' => '2,500+', 'label' => 'users supported'],
                        ['value' => '2020', 'label' => 'coding since'],
                    ],
                    'qualities' => ['Creative', 'Highly adaptable', 'People skills', 'Self-reliant', 'Curious', 'Versatile', 'Meticulous'],
                    'skills' => [
                        'Languages' => $fr['skills']['Langages'],
                        'Frameworks' => $fr['skills']['Frameworks'],
                        'Dev tools' => $fr['skills']['Outils dev'],
                        'IT Support' => array_map(fn ($s) => 'Réseau LAN/VLAN' === $s ? 'LAN/VLAN networking' : $s, $fr['skills']['Support IT']),
                    ],
                ]);

            case 'projects':
                $en = [
                    ['alt' => 'Home page of sirius-solar.ch: Sirius-Solar logo over solar panels', 'text' => 'Website for a Swiss solar-panel cleaning company: quotes calculated per m² based on roof type and access, online booking, customer area and back office.', 'status' => 'Live'],
                    ['alt' => 'Home page of geniuspro360.com: a bronze G engraved in the dark', 'text' => 'Website for my freelance studio, with a back office and a custom canvas animation, deployed on Infomaniak.', 'status' => 'Live'],
                    ['alt' => 'ServiceOne home page: tracking administrative procedures', 'text' => 'Platform for tracking administrative procedures: file and document uploads, real-time status, notifications and support tickets.', 'stack' => ['Symfony 6.4', 'REST API', 'Mobile app'], 'status' => 'Coming soon'],
                    ['alt' => 'Carwash website mockup: car wash booking', 'text' => 'Mockup of a car wash website: fixed-price packages by vehicle type, interactive before/after slider, and a 4-step slot booking with a live total.', 'status' => 'Mockup', 'urlLabel' => 'See the mockup'],
                    ['alt' => 'Survivoor mobile app mockup: home, map, tutorials, gear and profile screens', 'text' => 'UI/UX mockup of an outdoor survival mobile app: daily challenges, step-by-step tutorials, interactive map of points of interest, gear tracking and a gamified profile (levels, XP, badges).', 'status' => 'Mobile mockup'],
                    ['alt' => 'Abdoul-Web presentation', 'text' => 'My previous portfolio, built in HTML and vanilla JavaScript, inspired by single-page application frameworks.', 'status' => 'Archived'],
                    ['title' => 'Business website · sf_limas', 'text' => 'Business showcase website built during my Full-Stack Web Developer diploma (BTS) at CCI Limas.', 'status' => 'Training project'],
                    ['title' => 'E-commerce · cours_VMC', 'text' => 'Vue.js e-commerce site connected to an API, built during my diploma at CCI Limas. Unfinished project.', 'stack' => ['Vue.js', 'REST API'], 'status' => 'Training project'],
                ];

                return self::overlay($fr, $en);

            case 'timeline':
                $en = [
                    ['period' => '06/2026 - Present', 'duration' => 'Ongoing', 'title' => 'IT Support Technician · IT service desk', 'text' => 'Walk-in user support at the IT service desk of the Saint-Priest site, with incident follow-up and IT asset management.', 'items' => ['Face-to-face Tier 1-2 user support', 'Hardware and software incident diagnosis and resolution', 'Ticket management in GLPI, ITIL methodology', 'Active Directory account and permission management', 'Windows workstation deployment and configuration']],
                    ['duration' => 'Not completed', 'title' => 'Adult Trainer diploma (BTS Formateur)', 'text' => 'Training to become an adult trainer: designing learning sequences, leading groups and assessing learning.'],
                    ['duration' => '1 year', 'title' => 'Field IT Support Technician · Freelance', 'text' => 'On-site maintenance and troubleshooting, network hardware installation and user support on freelance assignments.', 'items' => ['On-site maintenance and troubleshooting (PCs, tablets, routers, Wi-Fi)', 'Network hardware installation (switches, structured cabling)', 'Tier 1-2 support and tickets in ServiceNow', 'Active Directory account administration', 'Windows 10/11 workstation deployment']],
                    ['duration' => '2 months', 'title' => 'Field IT Support Technician', 'items' => ['Installation and configuration of VIGIK access points', 'Network patching and structured cabling', 'Troubleshooting in Windows 10 / LAN-VLAN environments', 'Incident management in EasySnow and remote support']],
                    ['duration' => '4 months', 'title' => 'User Support Technician · Temp', 'text' => 'Workstation imaging and deployment in a critical 24/7 environment.', 'items' => ['Workstation imaging and deployment (high volume)', 'Installation and support of business software (Citrix, SAP, Teams)', 'Technical support in a critical 24/7 environment', 'Writing installation procedures']],
                    ['duration' => '1 year', 'title' => 'Full-Stack Web Developer diploma (BTS)', 'text' => 'Designing and building web applications with PHP/Symfony and Vue.js, using Agile methods.', 'items' => ['Building REST APIs', 'Database modelling and creation', 'Git', 'Unit testing', 'Agile methods and CRUD']],
                    ['duration' => '4 months', 'title' => 'Desktop Support Technician', 'text' => 'Tier 1-2 support for 2,500 users, 20 to 30 tickets handled per day.', 'items' => ['Tier 1-2 support for 2,500 users', 'IT asset management (inventory, tracking, maintenance)', 'Windows 10 and Microsoft 365 troubleshooting via ticketing and Active Directory']],
                    ['duration' => 'Short assignment', 'title' => 'Desktop Support Technician', 'items' => ['Incident management and remote assistance (HEAT, ServiceNow)', 'SCCM deployment and configuration on Windows 10 workstations', 'IT asset inventory and tracking']],
                    ['duration' => '1 year', 'title' => 'Desktop Support Technician', 'items' => ['Windows 7/10 and Active Directory desktop support', 'Troubleshooting, data recovery and workstation malware removal', 'Request management in EasyVista']],
                    ['duration' => '1 year', 'title' => 'IT Support Technician diploma (vocational baccalaureate level)', 'text' => 'Hands-on IT support: user assistance, workstation maintenance, and hardware and software deployment.', 'items' => ['Assisting and troubleshooting for users', 'Working on the infrastructure', 'Software and hardware', 'Deployment']],
                    ['duration' => '1 year', 'title' => 'Vocational certificate: Reception & Driving (CAP)', 'text' => 'Trip management, road safety and customer relations.'],
                ];

                return self::overlay($fr, $en);

            case 'hobbies':
                $en = [
                    ['title' => 'Cooking', 'tag' => 'Culinary passion', 'text' => 'I earned two culinary qualifications (CAP in Cooking and in Catering) back in 2003, and cooking is still a passion.'],
                    ['title' => 'FiveToFive · Indoor football', 'tag' => 'Sport & community', 'text' => 'I love our urban neighbourhoods and supporting the younger kids in their indoor football competitions.'],
                    ['title' => 'Computers & phones', 'tag' => 'Teardown & repair', 'text' => 'Out of curiosity and passion, I take apart and repair phones and computers, always trying to understand how they work.'],
                    ['title' => 'Volunteering · SIF association', 'tag' => 'Solidarity', 'text' => 'Volunteer at the SIF association, where I teach computer classes to seniors and help with food distribution.'],
                ];

                return self::overlay($fr, $en);

            case 'manifesto':
                return array_replace($fr, [
                    'eyebrow' => 'Why me',
                    'text' => "For ten years, I was the one people called when nothing worked anymore: a frozen workstation, [photo:asset/hobbies/bois/IMG_0332.jpg] a locked account, a network going down. Today I also build the websites and applications, [photo:asset/projets/sirius-solar.webp] so you have *one point of contact,* from the first ticket to going live. [photo:asset/hobbies/sif/cours_informatique.jpg]",
                    'signature' => "Abdoulaye N'DIAYE · Lyon",
                ]);

            case 'clients':
                $fr = array_replace($fr, [
                    'eyebrow' => 'They trusted me',
                    'title' => 'Ten years of assignments.|*One core.*',
                    'text' => 'Energy, healthcare, industry, emergency services: critical environments where support cannot wait. Hover over a name to see what I did there.',
                    'core' => '10+ yrs',
                ]);
                $items = [
                    ['tag' => 'Industry', 'what' => 'Tier 1-2 IT service desk'],
                    ['tag' => 'Healthcare', 'what' => '2,500 users'],
                    ['tag' => 'Energy', 'what' => 'Network, VIGIK, Windows'],
                    ['tag' => 'Energy', 'what' => 'Field support'],
                    ['tag' => 'Research', 'what' => 'SCCM deployment'],
                    ['tag' => 'Nuclear', 'what' => 'Desktop support'],
                    ['tag' => 'Emergency 24/7', 'what' => 'Workstation imaging'],
                    ['tag' => 'Web client', 'what' => 'Symfony 7 website'],
                    ['tag' => 'Freelance', 'what' => 'Web studio'],
                ];
                $fr['items'] = self::overlay($fr['items'], $items);

                return $fr;

            case 'cta':
                return array_replace($fr, [
                    'eyebrow' => 'Available for new assignments',
                    'title' => "Ready when|*you are.*",
                    'button' => 'Contact me',
                    'text' => "A position to fill, a support assignment or a website to build? Write to me, I reply quickly.",
                ]);
        }

        return $fr;
    }

    private static function nav(): array
    {
        return [
            ['label' => 'Skills', 'href' => '#competences'],
            ['label' => 'Projects', 'href' => '#projets'],
            ['label' => 'Journey', 'href' => '#parcours'],
            ['label' => 'Hobbies', 'href' => '#hobbies'],
            ['label' => 'Contact', 'href' => '#contact'],
        ];
    }

    /** Remplace, élément par élément, les champs traduits d'une liste (le reste est gardé). */
    private static function overlay(array $list, array $tr): array
    {
        foreach ($list as $i => $row) {
            if (isset($tr[$i])) {
                $list[$i] = array_replace($row, $tr[$i]);
            }
        }

        return $list;
    }
}
