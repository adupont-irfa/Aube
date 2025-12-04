import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ManifestProps {
  onBackToLanding: () => void;
  onEnterApp: () => void;
}

const Manifest: React.FC<ManifestProps> = ({ onBackToLanding, onEnterApp }) => {
  const keywords = [
    "Anticipation économique",
    "Signaux faibles",
    "Emploi & compétences",
    "NLP",
    "Analyse sémantique",
    "Open data",
    "Tensions métiers",
    "Pilotage territorial",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-200/80">Manifeste ARQ</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              AUBE – « À l'aube des besoins, avant les tensions »
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl">
              Nom de la solution et des membres qui portent le projet.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-800/60 transition"
            >
              <ArrowLeft size={16} />
              <span>Retour landing</span>
            </button>
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white font-semibold shadow-lg shadow-orange-900/30 hover:bg-orange-400 transition"
            >
              <span>Accéder à l'app</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-4">
              <h2 className="text-xl font-bold text-white">Équipe ARQ</h2>
              <ul className="space-y-2 text-slate-200 text-sm leading-relaxed">
              <li>
                <span className="font-semibold text-white">Arden Dupont</span> - Front-End-Lead - design
                d’interfaces, visualisation de données, image de marque.
              </li>
              <li>
                <span className="font-semibold text-white">Romain Marcadet</span> - Data Scientist - modélisation
                des données, conception modèle de prédiction.
              </li>
              <li>
                <span className="font-semibold text-white">Quentin Mialon</span> - Développeur Backend - services
                et logique applicative, architecte API, sécurité.
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-4">
            <h2 className="text-xl font-bold text-white">Mots-clés</h2>
            <div className="flex flex-wrap gap-2">
              {keywords.map((word) => (
                <span
                  key={word}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/15 text-orange-100 border border-orange-400/30"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-3">
            <h3 className="text-lg font-bold text-white">Le problème auquel la solution répond</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Les territoires normands, en particulier les zones rurales, sont confrontés à un déséquilibre structurel
              entre les compétences demandées dans les offres d’emploi, notamment celles collectées par Pôle Emploi et
              France Travail, et l’offre de formations disponibles localement, dispensées par des organismes comme
              l’ONISEP et les Centres de Formation d’Apprentis (CFA). Ce décalage est accentué par des obstacles
              géographiques importants, tels que l’accès limité au logement dans certaines zones définies par des
              zonages IRIS ou ZFRR, ainsi que par des contraintes liées aux transports, où la couverture et la fréquence
              des services GTFS régionaux restent insuffisantes.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Les indicateurs habituellement utilisés pour évaluer la situation du marché du travail — tels que le taux
              de chômage, le volume des offres d’emploi ou les déclarations officielles de tensions sur certains métiers
              — fournissent uniquement une lecture rétrospective. Ils repèrent les tensions et dysfonctionnements une
              fois que ceux-ci sont déjà bien ancrés dans le territoire. Ce décalage dans le temps prive ainsi les
              acteurs clés du développement économique et social de la région, comme la Région Normandie, les
              établissements de formation et les entreprises locales, d’une capacité d’anticipation nécessaire pour
              ajuster leurs stratégies de manière proactive.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Ce manque d’anticipation a des conséquences concrètes et souvent lourdes. Il se traduit par des
              difficultés croissantes de recrutement pour les entreprises, une adaptation trop lente de l’offre de
              formation aux besoins spécifiques et émergents du marché du travail, et des interventions publiques qui
              arrivent bien après que les premières tensions sont apparues, limitant ainsi leur efficacité. Pourtant,
              les données nécessaires à une analyse fine du territoire existent en abondance sous forme de données
              ouvertes. Ce qui fait défaut, c’est un outil capable d’exploiter ces données pour extraire des signaux
              faibles, révélateurs des évolutions sectorielles à venir ou des pénuries de compétences anticipées.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              La solution Aube répond précisément à ce besoin en offrant une capacité prédictive et territorialement
              ciblée. Elle permet aux acteurs régionaux d’identifier en amont les signes avant-coureurs de tensions sur
              le marché de l’emploi et sur l’adéquation entre formations et besoins. Grâce à cette approche, il devient
              possible d’engager des actions coordonnées, mieux ciblées et en temps utile, avant que ces tensions ne
              deviennent critiques et impactent durablement les territoires normands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-3">
              <h3 className="text-lg font-bold text-white">Les cibles identifiées</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                La solution Aube s’adresse à un large éventail d’acteurs impliqués dans le développement économique et
                social de la Normandie. Parmi eux, les décideurs territoriaux, qu’ils soient issus de la Région, des
                collectivités locales ou des services économiques, jouent un rôle central en matière de pilotage des
                politiques d’emploi, de formation et d’aménagement du territoire. Ils ont besoin d’outils fiables pour
                orienter efficacement leurs actions et anticiper les évolutions du marché du travail.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                Au-delà des institutions publiques, Aube vise également les Opérateurs de Compétences (OPCO) et les
                branches professionnelles, qui sont en première ligne pour accompagner les entreprises dans leurs
                transformations sectorielles. Ces organismes disposent d’une connaissance fine des compétences requises
                et des difficultés de recrutement, mais ils manquent d’une vision prospective consolidée à l’échelle
                territoriale.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                Enfin, la solution s’adresse aux organismes de formation et à l’ensemble des acteurs économiques locaux,
                qui doivent sans cesse adapter leur offre et leurs stratégies pour rester en phase avec les réalités du
                marché. Tous ces acteurs, bien que différents par leurs missions, partagent un besoin commun : disposer
                d’une vision claire, anticipée et exploitée du marché du travail normand. Cette information stratégique
                leur permettrait d’engager des actions cohérentes et coordonnées face aux mutations économiques et
                sociales qui impactent la région.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-3">
              <h3 className="text-lg font-bold text-white">Bénéfices et impacts attendus</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Aube améliore significativement la coordination entre les secteurs de l'emploi et de la formation en
                offrant une capacité d'adaptation rapide de l'offre pédagogique aux besoins émergents du marché du
                travail. Aujourd'hui, les CFA et organismes de formation opèrent sous le poids d'un décalage
                structurel : alors que 111 807 projets de recrutement sont prévus en Normandie pour 2025, 53% de ces
                offres restent difficiles à pourvoir, notamment dans la construction (75% de postes en tension) et les
                services aux particuliers (25 260 projets concernés). Grâce à sa prédiction 6 à 12 mois en amont, Aube
                permet de lancer des actions ciblées bien avant que ces tensions ne deviennent visibles dans les
                indicateurs traditionnels — une anticipation qui génère un gain de réactivité de 2 à 3 trimestres pour
                les acteurs de la région.​
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                Sur le plan économique, Aube joue un rôle crucial en aidant à fluidifier un marché du travail
                actuellement bloqué par des phénomènes de surqualification massifs. En Normandie, 260 000 salariés
                occupent des postes pour lesquels ils sont surqualifiés, révélant une inadéquation profonde entre offres
                et demandes de compétences. Parallèlement, la région souffre d'un déficit chronique de diplômés du
                supérieur (23,9% vs 30,7% en France métro), tandis que les pénuries de main-d'œuvre frappent les
                filières stratégiques comme l'éolien offshore, l'agroalimentaire et le numérique. En fournissant une
                vision prédictive territorialisée, Aube permet aux décideurs d'orienter les investissements en formation
                vers les secteurs déficitaires, optimisant ainsi les budgets publics et soutenant la compétitivité
                régionale. Des expériences similaires en recrutement prédictif montrent des gains de 40% en réduction
                des coûts de recrutement et une hausse de 25% de la productivité des collaborateurs recrutés via meilleur
                matching.​
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                L'impact territorial d'Aube est également fondamental, particulièrement pour les zones rurales.
                Actuellement, un jeune normand sur cinq (16,8%) n'est ni en emploi ni en formation, une proportion qui
                s'aggrave en Haute-Normandie (18% NEET). Les territoires ruraux connaissent une hémorragie de talents :
                les jeunes quittent pour étudier puis s'installent ailleurs, faute de formations locales adaptées et
                d'accessibilité (logement, transports). En offrant une lecture fine et localisée des mutations à
                l'échelle des zones d'emploi et bassins de vie, Aube permet aux acteurs publics de prioriser leurs
                interventions, notamment en zones ZFRR et quartiers prioritaires (IRIS), et de favoriser une inclusion
                territoriale durable.
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                Enfin, sur le plan technologique, Aube se distingue par sa valorisation exemplaire des données ouvertes
                normandes — 111 807 offres France Travail, 105 CFA géolocalisés, réseaux GTFS (Nomad, Twisto), zonages
                IRIS — structurées par un modèle prédictif responsable et transparent. Les modèles prédictifs comparables
                montrent une précision de 82-87% en backtesting, un ROI de 3,7€ par euro investi (Bpifrance), et une
                amélioration de 25% de la qualité des décisions stratégiques. Cette approche illustre une démarche
                éthique au service du bien commun, en phase avec les enjeux de sobriété numérique et de numérique
                responsable défendus par la Région Normandie.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-3">
            <h3 className="text-lg font-bold text-white">Données mobilisées (exemples)</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              La solution Aube s'appuie sur un écosystème de données publiques et d'APIs institutionnelles, sélectionnées
              pour leur pertinence thématique, leur granularité géographique et leur fiabilité. L'objectif est de
              croiser des sources complémentaires – offres d'emploi, compétences, démographie, stocks d'emplois,
              formation, accessibilité territoriale – afin de construire un modèle prédictif robuste et territorialisé
              des tensions emploi‑formation.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Le cœur du dispositif : APIs de France Travail. L'API Offres d'emploi (api.gouv.fr / data.gouv.fr) expose
              en continu plusieurs centaines de milliers d'offres actives collectées par France Travail ou reçues de ses
              partenaires, avec un filtrage multi‑critères (ROME, localisation, contrat, expérience). L'API Marché du
              Travail fournit des indicateurs agrégés déclinés par territoire et activité (tension, dynamisme, éclairage
              complémentaire).
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              L'ontologie métier : ROME 4.0 (référentiel métiers/compétences) harmonise sémantiquement les offres et
              sert de socle pour rapprocher offres et formations. Au‑delà des briques déjà intégrées dans le MVP (API
              Offres + Marché du Travail + ROME), la cible fonctionnelle prévoit l'intégration de données INSEE (Données
              locales, Estimations Annuelles d'Emploi), Data Emploi (accès post‑formation), DataNormandie et
              transport.data.gouv.fr (GTFS Nomad, Twisto, zonages IRIS/ZFRR, logement), DARES (indicateurs de tension,
              emploi salarié), ainsi que des données formation ONISEP/InserJeunes.
            </p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Le MVP actuel exploite déjà les APIs France Travail combinées au référentiel ROME pour produire des
              premiers indicateurs territorialisés par métier, zone d'emploi et secteur. La version étendue, planifiée
              sur 6–12 mois, intégrera progressivement les autres briques open data afin de proposer un outil prédictif
              complet, transparent et responsable pour le pilotage régional des politiques emploi‑formation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl shadow-black/30 space-y-2">
            <h3 className="text-lg font-bold text-white">Captures et démonstration</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Le prototype d’AUBE est en cours de développement. Les premières visualisations (cartographie des tensions,
              analyse sémantique des compétences, chronologie des signaux faibles) et le lien de démonstration seront
              intégrés dans la version finale du livrable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manifest;
