const listeLycees = [
    {
      "code": "0750680G",
      "nom": "ARAGO",
      "seuils": [40386.517, 40467.318],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/12_ARAGO_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750693W",
      "nom": "BUFFON",
      "seuils": [40582.466, 40439.889],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/15_BUFFON_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750694X",
      "nom": "CAMILLE SEE",
      "seuils": [39436.35, 38766.489],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/15_CAMILLE_SEE_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750704H",
      "nom": "CARNOT",
      "seuils": [40547, 40400.777],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/17_CARNOT_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750663N",
      "nom": "CHAPTAL",
      "seuils": [40729.127, 40716.791],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/08_CHAPTAL_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750652B",
      "nom": "CHARLEMAGNE",
      "seuils": [40735.851, 40685.023],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/04_CHARLEMAGNE_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750698B",
      "nom": "CLAUDE BERNARD",
      "seuils": [7150.874, 21767.262],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/16_CLAUDE_BERNARD_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750683K",
      "nom": "CLAUDE MONET",
      "seuils": [40569.767, 40593.618],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/13_MONET_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750673Z",
      "nom": "COLBERT",
      "seuils": [22588.564, 22280],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/10_COLBERT_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750667T",
      "nom": "CONDORCET",
      "seuils": [41095.851, 41098.058],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/05/09_CONDORCET_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750712S",
      "nom": "DIDEROT",
      "seuils": [25316.545, 23470],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/19_DIDEROT_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750676C",
      "nom": "DORIAN",
      "seuils": [25185.901, 23065.83],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/11_DORIAN_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750671X",
      "nom": "EDGAR QUINET",
      "seuils": [24129.843, 39047.581],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/09_EDGAR_QUINET_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750677D",
      "nom": "ELISA LEMONNIER",
      "seuils": [23861.234, 5709.842],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/12_ELISA_LEMONNIER_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750692V",
      "nom": "EMILE DUBOIS",
      "seuils": [38094.583, 32640],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/14_EMILE_DUBOIS_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750660K",
      "nom": "FENELON",
      "seuils": [40582.043, 40608.709],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/05/06_FENELON_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750690T",
      "nom": "FRANCOIS VILLON",
      "seuils": [24090.145, 22363.395],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/14_VILLON_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750684L",
      "nom": "GABRIEL FAURE",
      "seuils": [23180.853, 24402.417],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/13_GABRIEL_FAURE_Fiche-Lycee2023.pdf"
    },
    {
      "code": "0750714U",
      "nom": "HELENE BOUCHER",
      "seuils": [40724.259, 40633.911],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/20_HELENE_BOUCHER_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750711R",
      "nom": "HENRI BERGSON",
      "seuils": [6796.35, 24162.852],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/19_BERGSON_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750654D",
      "nom": "HENRI IV",
      "seuils": [0, 40734.331],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/05_HENRI-IV_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750705J",
      "nom": "HONORE DE BALZAC",
      "seuils": [40269.556, 39935.372],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/17_BALZAC_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750668U",
      "nom": "JACQUES DECOUR",
      "seuils": [25480.702, 32640],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/09_DECOUR_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750699C",
      "nom": "JANSON DE SAILLY",
      "seuils": [40371.575, 40170.93],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/16_JANSON_DE_SAILLY_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750702F",
      "nom": "JEAN DE LA FONTAINE",
      "seuils": [39731.743, 39758.988],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/16_LA_FONTAINE_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750700D",
      "nom": "JEAN-BAPTISTE SAY",
      "seuils": [40172.502, 40016.898],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/16_JB_SAY_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750669V",
      "nom": "JULES FERRY",
      "seuils": [40332.292, 40253.169],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/09_JULES_FERRY_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750670W",
      "nom": "LAMARTINE",
      "seuils": [39587.952, 40146.603],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/09_LAMARTINE_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750656F",
      "nom": "LAVOISIER",
      "seuils": [40559.383, 40600.589],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/05_LAVOISIER_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0751708Z",
      "nom": "LOUIS ARMAND",
      "seuils": [7565.549, 23591.625],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/15_LOUIS_ARMAND_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750655E",
      "nom": "LOUIS LE GRAND",
      "seuils": [0, 0],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/05_LOUIS-LE-GRAND_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750715V",
      "nom": "MAURICE RAVEL",
      "seuils": [39610.883, 39266.478],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/20_RAVEL_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750703G",
      "nom": "MOLIERE",
      "seuils": [39139.363, 38884.118],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/16_MOLIERE_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750657G",
      "nom": "MONTAIGNE",
      "seuils": [40398.65, 40180.670],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/06_MONTAIGNE_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750685M",
      "nom": "P.G. DE GENNES",
      "seuils": [7222.187, 32640],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/03/fiche_lycee_PDGD_2023.pdf"
    },
    {
      "code": "0750689S",
      "nom": "PAUL BERT",
      "seuils": [39605.27, 39634.293],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/14_PAUL_BERT_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750679F",
      "nom": "PAUL VALERY",
      "seuils": [22268.841, 17760],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/12_PAUL_VALERY_Fiche_Lycee2022.pdf"
    },
    {
        "code": "0750688R",
        "nom": "RABELAIS",
        "seuils": [7707.827, 22132.527],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/02/18_RABELAIS_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750664P",
      "nom": "RACINE",
      "seuils": [40549.926, 40462.993],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/08_RACINE_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750682J",
      "nom": "RODIN",
      "seuils": [25216.998, 7886.202],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/13_RODIN_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750651A",
      "nom": "SIMONE WEIL",
      "seuils": [40170.521, 39790.504],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/03_SIMONE-WEIL_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750653C",
      "nom": "SOPHIE GERMAIN",
      "seuils": [40925.103, 40624.178],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/04_SOPHIE_GERMAIN_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750647W",
      "nom": "TURGOT",
      "seuils": [41090.421, 41031.602],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/03_TURGOT_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750662M",
      "nom": "VICTOR DURUY",
      "seuils": [40120.867, 40037.442],
      "url": "https://www.fcpe75.org/wp-content/uploads/2022/03/07_VICTOR_DURUY_Fiche_Lycee2022.pdf"
    },
    {
      "code": "0750648X",
      "nom": "VICTOR HUGO",
      "seuils": [40713.103, 40656.495],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/02/03_VICTOR_HUGO_Fiche_Lycee2023.pdf"
    },
    {
      "code": "0750675B",
      "nom": "VOLTAIRE",
      "seuils": [25715.64, 39095.508],
      "url": "https://www.fcpe75.org/wp-content/uploads/2023/01/VOLTAIRE_Fiche_Lycee2023.pdf"
    }
]

const tousSecteurs = ['0750655E','0750654D', '0750685M', '0750692V'];

const nomsLyceesMap = new Map();
const seuilsLyceesMap = new Map();
const urlsLyceesMap = new Map();
listeLycees.forEach(item => {
    nomsLyceesMap.set(item.code, item.nom);
    seuilsLyceesMap.set(item.code, item.seuils);
    urlsLyceesMap.set(item.code, item.url);
});

export {listeLycees, nomsLyceesMap, seuilsLyceesMap, urlsLyceesMap, tousSecteurs}