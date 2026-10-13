<?php

namespace App\Controller;

use App\Data\I18n;
use App\Data\PortfolioData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    public function __construct(
        #[Autowire('%kernel.project_dir%')] private readonly string $projectDir,
    ) {
    }

    #[Route('/', name: 'home', defaults: ['_locale' => 'fr'])]
    #[Route('/en', name: 'home_en', defaults: ['_locale' => 'en'])]
    public function index(Request $request): Response
    {
        // Les contenus se modifient dans src/Data/PortfolioData.php (français) et src/Data/I18n.php (anglais)
        $locale = in_array($request->getLocale(), I18n::LOCALES, true) ? $request->getLocale() : 'fr';
        $d = fn (string $section) => 'en' === $locale ? I18n::en($section, PortfolioData::$section()) : PortfolioData::$section();

        $hero = $d('hero');
        $hero['headingLines'] = $this->splitHeading($hero['heading']);
        $hero['headingPlain'] = trim(preg_replace('/\s+/', ' ', str_replace(['*', '|'], ['', ' '], $hero['heading'])));

        $orb = $d('heroOrb');
        $orb['h1'] = array_merge(...$this->splitHeading($orb['heading1'], 260, 70));
        $orb['h2'] = array_merge(...$this->splitHeading($orb['heading2'], 460, 70));
        $orb['headingPlain'] = str_replace('*', '', $orb['heading1'].' '.$orb['heading2']);

        $timeline = $d('timeline');
        $about = $d('about');
        $tr = I18n::ui($locale);
        $tr['fNote'] = strtr($tr['fNote'], ['%mail%' => PortfolioData::EMAIL, '%phone%' => PortfolioData::PHONE]);

        return $this->render('home/index.html.twig', [
            'locale' => $locale,
            'tr' => $tr,
            'urls' => ['fr' => $this->generateUrl('home'), 'en' => $this->generateUrl('home_en')],
            'heroStyle' => PortfolioData::HERO_STYLE,
            'hero' => $hero,
            'orb' => $orb,
            'about' => $about + ['skillCount' => array_sum(array_map('count', $about['skills']))],
            'projects' => $d('projects'),
            'timeline' => $timeline,
            'counts' => [
                'postes' => count(array_filter($timeline, fn ($t) => 'poste' === $t['type'])),
                'formations' => count(array_filter($timeline, fn ($t) => 'formation' === $t['type'])),
            ],
            'hobbies' => $this->resolveHobbies($d('hobbies')),
            'links' => PortfolioData::links(),
            'manifesto' => $this->splitManifesto($d('manifesto')),
            'clients' => $d('clients'),
            'cta' => $d('cta'),
            'contact' => [
                'name' => PortfolioData::NAME,
                'role' => PortfolioData::ROLE,
                'email' => PortfolioData::EMAIL,
                'phone' => PortfolioData::PHONE,
                'phoneLink' => PortfolioData::PHONE_LINK,
                'cv' => PortfolioData::CV,
                'vcard' => PortfolioData::VCARD,
            ],
        ]);
    }

    /**
     * Découpe le manifeste en mots (accent ou non) et photos intercalées.
     */
    private function splitManifesto(array $m): array
    {
        $tokens = [];
        $parts = preg_split('/(\[photo:[^\]]+\])/u', $m['text'], -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
        $accent = false;
        foreach ($parts as $part) {
            if (preg_match('/^\[photo:([^\]]+)\]$/u', $part, $mm)) {
                $tokens[] = ['type' => 'photo', 'src' => trim($mm[1])];
                continue;
            }
            foreach (preg_split('/\s+/u', trim($part)) ?: [] as $w) {
                if ('' === $w) {
                    continue;
                }
                if (str_starts_with($w, '*')) {
                    $accent = true;
                }
                $ends = str_contains(substr($w, 1), '*') || (str_ends_with($w, '*') && strlen($w) > 1);
                $tokens[] = ['type' => 'word', 'text' => str_replace('*', '', $w), 'accent' => $accent];
                if ($ends) {
                    $accent = false;
                }
            }
        }
        $m['tokens'] = $tokens;
        $m['plain'] = trim(preg_replace('/\s+/u', ' ', str_replace('*', '', preg_replace('/\[photo:[^\]]+\]/u', '', $m['text']))));

        return $m;
    }

    /**
     * "cuisine/IMG_1246:JPG" → miniature + grande version (_big) si elle existe.
     */
    private function resolveHobbies(array $hobbies): array
    {
        foreach ($hobbies as &$hobby) {
            $hobby['photos'] = array_map(function (string $ref): array {
                [$name, $ext] = array_pad(explode(':', $ref), 2, 'jpg');
                $src = "asset/hobbies/$name.$ext";
                $big = "asset/hobbies/{$name}_big.$ext";

                return [
                    'src' => $src,
                    'big' => is_file($this->projectDir.'/public/'.$big) ? $big : $src,
                ];
            }, $hobby['photos']);
        }

        return $hobbies;
    }

    /**
     * "Support IT|*& développeur web.*" → lignes de mots ; les mots entre * sont surlignés.
     *
     * @return list<list<array{text: string, accent: bool, delay: int}>>
     */
    private function splitHeading(string $heading, int $delay = 260, int $step = 70): array
    {
        $lines = [];
        $k = 0;
        foreach (explode('|', $heading) as $line) {
            $words = [];
            $accent = false;
            foreach (preg_split('/\s+/', trim($line)) ?: [] as $word) {
                if ('' === $word) {
                    continue;
                }
                if (str_starts_with($word, '*')) {
                    $accent = true;
                }
                $ends = (bool) preg_match('/\*[.,!?;:’\']*$/u', $word);
                $words[] = ['text' => str_replace('*', '', $word), 'accent' => $accent, 'delay' => $delay + $k++ * $step];
                if ($ends) {
                    $accent = false;
                }
            }
            $lines[] = $words;
        }

        return $lines;
    }
}
