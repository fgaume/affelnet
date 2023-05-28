const specialites = [
    {
      "acronyme": "PC",
      "code": "PHYSIQUE-CHIMIE",
      "nom": "Physique-Chimie"
    },
    {
      "acronyme": "HG-GSP",
      "code": "HISTOIRE-GEOGRAPHIE, GEOPOLITIQUE ET SCIENCES POLITIQUES",
      "nom": "Histoire-géographie, géopolitique et sciences politiques"
    },
    {
      "acronyme": "SES",
      "code": "SCIENCES ECONOMIQUES ET SOCIALES",
      "nom": "Sciences économiques et sociales"
    },
    {
      "acronyme": "HLP",
      "code": "HUMANITES, LITTERATURE ET PHILOSOPHIE",
      "nom": "Humanités, littérature et philosophie"
    },
    {
      "acronyme": "NSI",
      "code": "NUMERIQUE ET SCIENCES INFORMATIQUES",
      "nom": "Numérique et sciences informatiques"
    },
    {
      "acronyme": "LLCE",
      "code": "LLCE",
      "nom": "Langues, littératures et cultures étrangères"
    },
    {
      "acronyme": "ARTS",
      "code": "ARTS",
      "nom": "Arts"
    },
    {
      "acronyme": "AMC",
      "code": "LLCE ANGLAIS MONDE CONTEMPORAIN (AMC)",
      "nom": "Anglais Monde Contemporain"
    },
    {
      "acronyme": "SI",
      "code": "SCIENCES DE L''INGENIEUR",
      "nom": "Sciences de l'ingénieur"
    },
    {
      "acronyme": "LLCA",
      "code": "LITTERATURE LANGUES ET CULTURES DE L''ANTIQUITE",
      "nom": "Langues, littératures et cultures de l'Antiquité"
    },
    {
      "acronyme": "EPS",
      "code": "EDUCATION PHYSIQUE, PRATIQUES ET CULTURE SPORTIVE",
      "nom": "Education physique, pratique et culture sportive"
    }
   ];

const codesSpecialitesMap = new Map();
specialites.forEach(item => {
    codesSpecialitesMap.set(item.acronyme, item.code);
});

export {codesSpecialitesMap, specialites};