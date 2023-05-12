const listeLycees = [
    {
      "code": "0750680G",
      "nom": "ARAGO",
      "seuils": [40386.517, 40467.318]
    },
    {
      "code": "0750693W",
      "nom": "BUFFON",
      "seuils": [40582.466, 40439.889]
    },
    {
      "code": "0750694X",
      "nom": "CAMILLE SEE",
      "seuils": [39436.35, 38766.489]
    },
    {
      "code": "0750704H",
      "nom": "CARNOT",
      "seuils": [40547, 40400.777]
    },
    {
      "code": "0750663N",
      "nom": "CHAPTAL",
      "seuils": [40729.127, 40716.791]
    },
    {
      "code": "0750652B",
      "nom": "CHARLEMAGNE",
      "seuils": [40735.851, 40685.023]
    },
    {
      "code": "0750698B",
      "nom": "CLAUDE BERNARD",
      "seuils": [7150.874, 21767.262]
    },
    {
      "code": "0750683K",
      "nom": "CLAUDE MONET",
      "seuils": [40569.767, 40593.618]
    },
    {
      "code": "0750673Z",
      "nom": "COLBERT",
      "seuils": [22588.564, 22280]
    },
    {
      "code": "0750667T",
      "nom": "CONDORCET",
      "seuils": [41095.851, 41098.058]
    },
    {
      "code": "0750712S",
      "nom": "DIDEROT",
      "seuils": [25316.545, 23470]
    },
    {
      "code": "0750676C",
      "nom": "DORIAN",
      "seuils": [25185.901, 23065.83]
    },
    {
      "code": "0750671X",
      "nom": "EDGAR QUINET",
      "seuils": [24129.843, 39047.581]
    },
    {
      "code": "0750677D",
      "nom": "ELISA LEMONNIER",
      "seuils": [23861.234, 5709.842]
    },
    {
      "code": "0750692V",
      "nom": "EMILE DUBOIS",
      "seuils": [38094.583, 32640]
    },
    {
      "code": "0750660K",
      "nom": "FENELON",
      "seuils": [40582.043, 40608.709]
    },
    {
      "code": "0750690T",
      "nom": "FRANCOIS VILLON",
      "seuils": [24090.145, 22363.395]
    },
    {
      "code": "0750684L",
      "nom": "GABRIEL FAURE",
      "seuils": [23180.853, 24402.417]
    },
    {
      "code": "0750714U",
      "nom": "HELENE BOUCHER",
      "seuils": [40724.259, 40633.911]
    },
    {
      "code": "0750711R",
      "nom": "HENRI BERGSON",
      "seuils": [6796.35, 24162.852]
    },
    {
      "code": "0750654D",
      "nom": "HENRI IV",
      "seuils": [0, 40734.331]
    },
    {
      "code": "0750705J",
      "nom": "HONORE DE BALZAC",
      "seuils": [40269.556, 39935.372]
    },
    {
      "code": "0750668U",
      "nom": "JACQUES DECOUR",
      "seuils": [25480.702, 32640]
    },
    {
      "code": "0750699C",
      "nom": "JANSON DE SAILLY",
      "seuils": [40371.575, 40170.93]
    },
    {
      "code": "0750702F",
      "nom": "JEAN DE LA FONTAINE",
      "seuils": [39731.743, 39758.988]
    },
    {
      "code": "0750700D",
      "nom": "JEAN-BAPTISTE SAY",
      "seuils": [40172.502, 40016.898]
    },
    {
      "code": "0750669V",
      "nom": "JULES FERRY",
      "seuils": [40332.292, 40253.169]
    },
    {
      "code": "0750670W",
      "nom": "LAMARTINE",
      "seuils": [39587.952, 40146.603]
    },
    {
      "code": "0750656F",
      "nom": "LAVOISIER",
      "seuils": [40559.383, 40600.589]
    },
    {
      "code": "0751708Z",
      "nom": "LOUIS ARMAND",
      "seuils": [7565.549, 23591.625]
    },
    {
      "code": "0750655E",
      "nom": "LOUIS LE GRAND",
      "seuils": [0, 0]
    },
    {
      "code": "0750715V",
      "nom": "MAURICE RAVEL",
      "seuils": [39610.883, 39266.478]
    },
    {
      "code": "0750703G",
      "nom": "MOLIERE",
      "seuils": [39139.363, 38884.118]
    },
    {
      "code": "0750657G",
      "nom": "MONTAIGNE",
      "seuils": [40398.65, 40180.670]
    },
    {
      "code": "0750685M",
      "nom": "P.G. DE GENNES",
      "seuils": [7222.187, 32640]
    },
    {
      "code": "0750689S",
      "nom": "PAUL BERT",
      "seuils": [39605.27, 39634.293]
    },
    {
      "code": "0750679F",
      "nom": "PAUL VALERY",
      "seuils": [22268.841, 17760]
    },
    {
        "code": "0750688R",
        "nom": "RABELAIS",
        "seuils": [7707.827, 22132.527]
    },
    {
      "code": "0750664P",
      "nom": "RACINE",
      "seuils": [40549.926, 40462.993]
    },
    {
      "code": "0750682J",
      "nom": "RODIN",
      "seuils": [25216.998, 7886.202]
    },
    {
      "code": "0750651A",
      "nom": "SIMONE WEIL",
      "seuils": [40170.521, 39790.504]
    },
    {
      "code": "0750653C",
      "nom": "SOPHIE GERMAIN",
      "seuils": [40925.103, 40624.178]
    },
    {
      "code": "0750647W",
      "nom": "TURGOT",
      "seuils": [41090.421, 41031.602]
    },
    {
      "code": "0750662M",
      "nom": "VICTOR DURUY",
      "seuils": [40120.867, 40037.442]
    },
    {
      "code": "0750648X",
      "nom": "VICTOR HUGO",
      "seuils": [40713.103, 40656.495]
    },
    {
      "code": "0750675B",
      "nom": "VOLTAIRE",
      "seuils": [25715.64, 39095.508]
    }
   ];

const tousSecteurs = ['0750655E','0750654D', '0750685M', '0750692V'];

const nomsLyceesMap = new Map();
const seuilsLyceesMap = new Map();
listeLycees.forEach(item => {
    nomsLyceesMap.set(item.code, item.nom);
    seuilsLyceesMap.set(item.code, item.seuils);
});

export {listeLycees, nomsLyceesMap, seuilsLyceesMap, tousSecteurs}