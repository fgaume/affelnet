const listeLycees = [
    {
      "code": "0750680G",
      "nom": "ARAGO",
      "seuil": 40386.517
    },
    {
      "code": "0750693W",
      "nom": "BUFFON",
      "seuil": 40582.466
    },
    {
      "code": "0750694X",
      "nom": "CAMILLE SEE",
      "seuil": 39436.35
    },
    {
      "code": "0750704H",
      "nom": "CARNOT",
      "seuil": 40547
    },
    {
      "code": "0750663N",
      "nom": "CHAPTAL",
      "seuil": 40729.127
    },
    {
      "code": "0750652B",
      "nom": "CHARLEMAGNE",
      "seuil": 40735.851
    },
    {
      "code": "0750698B",
      "nom": "CLAUDE BERNARD",
      "seuil": 0
    },
    {
      "code": "0750683K",
      "nom": "CLAUDE MONET",
      "seuil": 40569.767
    },
    {
      "code": "0750673Z",
      "nom": "COLBERT",
      "seuil": 22588.564
    },
    {
      "code": "0750667T",
      "nom": "CONDORCET",
      "seuil": 41095.851
    },
    {
      "code": "0750712S",
      "nom": "DIDEROT",
      "seuil": 25316.545
    },
    {
      "code": "0750676C",
      "nom": "DORIAN",
      "seuil": 25185.901
    },
    {
      "code": "0750671X",
      "nom": "EDGAR QUINET",
      "seuil": 24129.843
    },
    {
      "code": "0750677D",
      "nom": "ELISA LEMONNIER",
      "seuil": 23861.234
    },
    {
      "code": "0750692V",
      "nom": "EMILE DUBOIS",
      "seuil": 38094.583
    },
    {
      "code": "0750660K",
      "nom": "FENELON",
      "seuil": 40582.043
    },
    {
      "code": "0750690T",
      "nom": "FRANCOIS VILLON",
      "seuil": 24090.145
    },
    {
      "code": "0750684L",
      "nom": "GABRIEL FAURE",
      "seuil": 23180.853
    },
    {
      "code": "0750714U",
      "nom": "HELENE BOUCHER",
      "seuil": 40724.259
    },
    {
      "code": "0750711R",
      "nom": "HENRI BERGSON",
      "seuil": 6796.35
    },
    {
      "code": "0750654D",
      "nom": "HENRI IV",
      "seuil": 0
    },
    {
      "code": "0750705J",
      "nom": "HONORE DE BALZAC",
      "seuil": 40269.556
    },
    {
      "code": "0750668U",
      "nom": "JACQUES DECOUR",
      "seuil": 25480.702
    },
    {
      "code": "0750699C",
      "nom": "JANSON DE SAILLY",
      "seuil": 40371.575
    },
    {
      "code": "0750702F",
      "nom": "JEAN DE LA FONTAINE",
      "seuil": 0
    },
    {
      "code": "0750700D",
      "nom": "JEAN-BAPTISTE SAY",
      "seuil": 40172.502
    },
    {
      "code": "0750669V",
      "nom": "JULES FERRY",
      "seuil": 40332.292
    },
    {
      "code": "0750670W",
      "nom": "LAMARTINE",
      "seuil": 0
    },
    {
      "code": "0750656F",
      "nom": "LAVOISIER",
      "seuil": 40559.383
    },
    {
      "code": "0751708Z",
      "nom": "LOUIS ARMAND",
      "seuil": 7565.549
    },
    {
      "code": "0750655E",
      "nom": "LOUIS LE GRAND",
      "seuil": 0
    },
    {
      "code": "0750715V",
      "nom": "MAURICE RAVEL",
      "seuil": 39610.883
    },
    {
      "code": "0750703G",
      "nom": "MOLIERE",
      "seuil": 39139.363
    },
    {
      "code": "0750657G",
      "nom": "MONTAIGNE",
      "seuil": 40398.65
    },
    {
      "code": "0750685M",
      "nom": "PIERRE-GILLES DE GENNES",
      "seuil": 7222.187
    },
    {
      "code": "0750689S",
      "nom": "PAUL BERT",
      "seuil": 39605.27
    },
    {
      "code": "0750679F",
      "nom": "PAUL VALERY",
      "seuil": 22268.841
    },
    {
        "code": "0750688R",
        "nom": "RABELAIS",
        "seuil": 0
    },
    {
      "code": "0750664P",
      "nom": "RACINE",
      "seuil": 40549.926
    },
    {
      "code": "0750682J",
      "nom": "RODIN",
      "seuil": 25216.998
    },
    {
      "code": "0750651A",
      "nom": "SIMONE WEIL",
      "seuil": 40170.521
    },
    {
      "code": "0750653C",
      "nom": "SOPHIE GERMAIN",
      "seuil": 40925.103
    },
    {
      "code": "0750647W",
      "nom": "TURGOT",
      "seuil": 41090.421
    },
    {
      "code": "0750662M",
      "nom": "VICTOR DURUY",
      "seuil": 40120.867
    },
    {
      "code": "0750648X",
      "nom": "VICTOR HUGO",
      "seuil": 40713.103
    },
    {
      "code": "0750675B",
      "nom": "VOLTAIRE",
      "seuil": 25715.64
    }
   ];

const tousSecteurs = ['0750655E','0750654D', '0750685M', '0750692V'];

const nomsLyceesMap = new Map();
const seuilsLyceesMap = new Map();
listeLycees.forEach(item => {
    nomsLyceesMap.set(item.code, item.nom);
    seuilsLyceesMap.set(item.code, item.seuil);
});

export {listeLycees, nomsLyceesMap, seuilsLyceesMap, tousSecteurs}