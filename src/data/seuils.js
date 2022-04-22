const seuils = [
    {
      "nom": "CONDORCET",
      "seuil": 41095.851
    },
    {
      "nom": "TURGOT",
      "seuil": 41090.421
    },
    {
      "nom": "S. GERMAIN",
      "seuil": 40925.103
    },
    {
      "nom": "CHARLEMAGNE",
      "seuil": 40735.851
    },
    {
      "nom": "CHAPTAL",
      "seuil": 40729.127
    },
    {
      "nom": "BOUCHER",
      "seuil": 40724.259
    },
    {
      "nom": "V. HUGO",
      "seuil": 40713.103
    },
    {
      "nom": "BUFFON",
      "seuil": 40582.466
    },
    {
      "nom": "FENELON",
      "seuil": 40582.043
    },
    {
      "nom": "C. MONET",
      "seuil": 40569.767
    },
    {
      "nom": "LAVOISIER",
      "seuil": 40559.383
    },
    {
      "nom": "RACINE",
      "seuil": 40549.926
    },
    {
      "nom": "CARNOT",
      "seuil": 40547
    },
    {
      "nom": "MONTAIGNE",
      "seuil": 40398.65
    },
    {
      "nom": "ARAGO",
      "seuil": 40386.517
    },
    {
      "nom": "J. DE SAILLY",
      "seuil": 40371.575
    },
    {
      "nom": "JULES FERRY",
      "seuil": 40332.292
    },
    {
      "nom": "BALZAC",
      "seuil": 40269.556
    },
    {
      "nom": "J.B. SAY",
      "seuil": 40172.502
    },
    {
      "nom": "S. WEIL",
      "seuil": 40170.521
    },
    {
      "nom": "V. DURUY",
      "seuil": 40120.867
    },
    {
      "nom": "RAVEL",
      "seuil": 39610.883
    },
    {
      "nom": "PAUL BERT",
      "seuil": 39605.27
    },
    {
      "nom": "CAMILLE SEE",
      "seuil": 39436.35
    },
    {
      "nom": "MOLIERE",
      "seuil": 39139.363
    },
    {
      "nom": "VOLTAIRE",
      "seuil": 25715.64
    },
    {
      "nom": "J. DECOUR",
      "seuil": 25480.702
    },
    {
      "nom": "DIDEROT",
      "seuil": 25316.545
    },
    {
      "nom": "RODIN",
      "seuil": 25216.998
    },
    {
      "nom": "DORIAN",
      "seuil": 25185.901
    },
    {
      "nom": "LEMONNIER",
      "seuil": 23861.234
    },
    {
      "nom": "P. VALERY",
      "seuil": 22268.841
    },
    {
      "nom": "L. ARMAND",
      "seuil": 7565.549
    },
    {
      "nom": "BERGSON",
      "seuil": 6796.35
    }
  ];

const seuilsMap = new Map();
seuils.forEach(item => {
    seuilsMap.set(item.nom, item.seuil);
});

export default seuilsMap;