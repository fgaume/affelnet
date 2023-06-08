const specialites = [
  {
    acronyme: "AMC",
    code: "LLCE ANGLAIS MONDE CONTEMPORAIN (AMC)",
    nom: "Anglais Monde Contemporain",
  },
  {
    acronyme: "ARTS",
    code: "ARTS",
    nom: "Arts",
  },
  {
    acronyme: "EPS",
    code: "EDUCATION PHYSIQUE, PRATIQUES ET CULTURE SPORTIVE",
    nom: "Education physique, pratique et culture sportive",
  },
  {
    acronyme: "HG-GSP",
    code: "HISTOIRE-GEOGRAPHIE, GEOPOLITIQUE ET SCIENCES POLITIQUES",
    nom: "Histoire-géographie, géopolitique et sciences politiques",
  },
  {
    acronyme: "HLP",
    code: "HUMANITES, LITTERATURE ET PHILOSOPHIE",
    nom: "Humanités, littérature et philosophie",
  },
  {
    acronyme: "LLCA",
    code: "LITTERATURE LANGUES ET CULTURES DE L''ANTIQUITE",
    nom: "Langues, littératures et cultures de l'Antiquité",
  },
  {
    acronyme: "LLCE",
    code: "LLCE",
    nom: "Langues, littératures et cultures étrangères",
  },
  {
    acronyme: "NSI",
    code: "NUMERIQUE ET SCIENCES INFORMATIQUES",
    nom: "Numérique et sciences informatiques",
  },
  {
    acronyme: "PC",
    code: "PHYSIQUE-CHIMIE",
    nom: "Physique-Chimie",
  },
  {
    acronyme: "SES",
    code: "SCIENCES ECONOMIQUES ET SOCIALES",
    nom: "Sciences économiques et sociales",
  },
  {
    acronyme: "SI",
    code: "SCIENCES DE L''INGENIEUR",
    nom: "Sciences de l'ingénieur",
  },
];

const codesSpecialitesMap = new Map();
specialites.forEach((item) => {
  codesSpecialitesMap.set(item.acronyme, item.code);
});

export { codesSpecialitesMap, specialites };
