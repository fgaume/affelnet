const listeLycees = [
    {
      "code": "0750680G",
      "nom": "ARAGO",
      "seuils": [40386.517, 40467.318, 40536.52],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/12_ARAGO_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750693W",
      "nom": "BUFFON",
      "seuils": [40582.466, 40439.889, 40559.891],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/15_BUFFON_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750694X",
      "nom": "CAMILLE SEE",
      "seuils": [39436.35, 38766.489, 39612.601],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/15_CAMILLE_SEE_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750704H",
      "nom": "CARNOT",
      "seuils": [40547, 40400.777, 40388.736],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/17_CARNOT_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750663N",
      "nom": "CHAPTAL",
      "seuils": [40729.127, 40716.791, 40741.477],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/08_CHAPTAL_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750652B",
      "nom": "CHARLEMAGNE",
      "seuils": [40735.851, 40685.023, 40709.649],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/04_CHARLEMAGNE_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750698B",
      "nom": "CLAUDE BERNARD",
      "seuils": [7150.874, 21767.262, 23678.567],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/16_CLAUDE_BERNARD_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750683K",
      "nom": "CLAUDE MONET",
      "seuils": [40569.767, 40593.618, 40250.748],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/13_MONET_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750673Z",
      "nom": "COLBERT",
      "seuils": [22588.564, 22280, 5596.110],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/10_COLBERT_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750667T",
      "nom": "CONDORCET",
      "seuils": [41095.851, 41098.058, 41143.616],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/09_CONDORCET_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750712S",
      "nom": "DIDEROT",
      "seuils": [25316.545, 23470, 5664.67],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/19_DIDEROT_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750676C",
      "nom": "DORIAN",
      "seuils": [25185.901, 23065.83, 25525.611],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/11_Caroline-DORIAN_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750671X",
      "nom": "EDGAR QUINET",
      "seuils": [24129.843, 39047.581, 38713.174],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/09_EDGAR_QUINET_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750692V",
      "nom": "EMILE DUBOIS",
      "seuils": [38094.583, 32640, 39073.4],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/14_EMILE_DUBOIS_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750660K",
      "nom": "FENELON",
      "seuils": [40582.043, 40608.709, 40689.837],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/06_FENELON_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750690T",
      "nom": "FRANCOIS VILLON",
      "seuils": [24090.145, 22363.395, 6511.071],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/14_VILLON_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750684L",
      "nom": "GABRIEL FAURE",
      "seuils": [23180.853, 24402.417, 5756.611],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/13_GABRIEL_FAURE_FicheLycee2024.pdf"
    },
    {
      "code": "0750714U",
      "nom": "HELENE BOUCHER",
      "seuils": [40724.259, 40633.911, 40859],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/20_HELENE_BOUCHER_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750711R",
      "nom": "HENRI BERGSON",
      "seuils": [6796.35, 24162.852, 0],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/19_BERGSON_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750654D",
      "nom": "HENRI IV",
      "seuils": [0, 0, 0],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/05_HENRI-IV_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750705J",
      "nom": "HONORE DE BALZAC",
      "seuils": [40269.556, 39935.372, 39794.109],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/17_BALZAC_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750668U",
      "nom": "JACQUES DECOUR",
      "seuils": [25480.702, 32640, 25312.224],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/09_DECOUR_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750699C",
      "nom": "JANSON DE SAILLY",
      "seuils": [40371.575, 40170.93, 40225],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/16_JANSON_DE_SAILLY_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750702F",
      "nom": "JEAN DE LA FONTAINE",
      "seuils": [39731.743, 39758.988, 0],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/16_LA_FONTAINE_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750700D",
      "nom": "JEAN-BAPTISTE SAY",
      "seuils": [40172.502, 40016.898, 39935.403],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/16_JB_SAY_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750669V",
      "nom": "JULES FERRY",
      "seuils": [40332.292, 40253.169, 40088.664],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/09_JULES_FERRY_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750670W",
      "nom": "LAMARTINE",
      "seuils": [39587.952, 40146.603, 39806.335],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/09_LAMARTINE_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750656F",
      "nom": "LAVOISIER",
      "seuils": [40559.383, 40600.589, 40519.962],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/05_LAVOISIER_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750655E",
      "nom": "LOUIS LE GRAND",
      "seuils": [0, 0, 0],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/05_LOUIS-LE-GRAND_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750715V",
      "nom": "MAURICE RAVEL",
      "seuils": [39610.883, 39266.478, 39597.318],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/20_RAVEL_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750703G",
      "nom": "MOLIERE",
      "seuils": [39139.363, 38884.118, 39128.392],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/16_MOLIERE_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750657G",
      "nom": "MONTAIGNE",
      "seuils": [40398.65, 40180.670, 40405.782],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/06_MONTAIGNE_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750685M",
      "nom": "P.G. DE GENNES",
      "seuils": [7222.187, 32640, 38552.992],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/13_PGDG_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750689S",
      "nom": "PAUL BERT",
      "seuils": [39605.27, 39634.293, 39854.371],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/14_PAUL_BERT_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750679F",
      "nom": "PAUL VALERY",
      "seuils": [22268.841, 17760, 5203.038],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/12_PAUL_VALERY_Fiche_Lycee2024.pdf"
    },
    {
        "code": "0750688R",
        "nom": "RABELAIS",
        "seuils": [7707.827, 22132.527, 5993.295],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/18_RABELAIS_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750664P",
      "nom": "RACINE",
      "seuils": [40549.926, 40462.993, 40515.909],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/08_RACINE_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750682J",
      "nom": "RODIN",
      "seuils": [25216.998, 7886.202, 5586.306],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/13_RODIN_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750651A",
      "nom": "SIMONE WEIL",
      "seuils": [40170.521, 39790.504, 39587.918],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/03_SIMONE-WEIL_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750653C",
      "nom": "SOPHIE GERMAIN",
      "seuils": [40925.103, 40624.178, 40718.002],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/04_SOPHIE_GERMAIN_Fiche_Lycee2024.pdf"
    },
    {
      "code": "0750647W",
      "nom": "TURGOT",
      "seuils": [41090.421, 41031.602, 41172.453],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/03_TURGOT_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750662M",
      "nom": "VICTOR DURUY",
      "seuils": [40120.867, 40037.442, 40259],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/07_VICTOR_DURUY_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750648X",
      "nom": "VICTOR HUGO",
      "seuils": [40713.103, 40656.495, 40707.363],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/03_VICTOR_HUGO_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750675B",
      "nom": "VOLTAIRE",
      "seuils": [25715.64, 39095.508, 39128.612],
      "url": "https://www.fcpe75.org/wp-content/uploads/2024/01/11_VOLTAIRE_Fiche_Lycee2024.pdf"
    }
]

// LLG, H4 et PGDG
const tousSecteurs = ['0750655E','0750654D', '0750685M'];

const nomsLyceesMap = new Map();
const seuilsLyceesMap = new Map();
const urlsLyceesMap = new Map();
const listeLyceesSeuils = [];
listeLycees.forEach(item => {
    nomsLyceesMap.set(item.code, item.nom);
    seuilsLyceesMap.set(item.code, item.seuils);
    urlsLyceesMap.set(item.code, item.url);
    // LLG et H4 n'ont pas de seuils car hors algo
    if (item.code !== '0750655E' && item.code !== '0750654D') listeLyceesSeuils.push(item);
});

export {listeLyceesSeuils, listeLycees, nomsLyceesMap, seuilsLyceesMap, urlsLyceesMap, tousSecteurs}