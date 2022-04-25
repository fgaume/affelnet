const colleges = [
  {
    "nom": "AIME CESAIRE",
    "bonus": 1200
  },
  {
    "nom": "ALAIN FOURNIER",
    "bonus": 600
  },
  {
    "nom": "ALBERTO GIACOMETTI",
    "bonus": 1200
  },
  {
    "nom": "ALPHONSE DAUDET",
    "bonus": 600
  },
  {
    "nom": "ANDRE CITROEN",
    "bonus": 1200
  },
  {
    "nom": "ANDRE MALRAUX",
    "bonus": 0
  },
  {
    "nom": "ANNE FRANK",
    "bonus": 600
  },
  {
    "nom": "ANTOINE COYSEVOX",
    "bonus": 1200
  },
  {
    "nom": "BEAUMARCHAIS",
    "bonus": 600
  },
  {
    "nom": "BERNARD PALISSY",
    "bonus": 600
  },
  {
    "nom": "BORIS VIAN",
    "bonus": 1200
  },
  {
    "nom": "BUFFON",
    "bonus": 0
  },
  {
    "nom": "CAMILLE CLAUDEL",
    "bonus": 1200
  },
  {
    "nom": "CAMILLE SEE",
    "bonus": 600
  },
  {
    "nom": "CARNOT",
    "bonus": 0
  },
  {
    "nom": "CESAR FRANCK",
    "bonus": 0
  },
  {
    "nom": "CHAPTAL",
    "bonus": 0
  },
  {
    "nom": "CHARLEMAGNE",
    "bonus": 0
  },
  {
    "nom": "CHARLES PEGUY",
    "bonus": 600
  },
  {
    "nom": "CLAUDE BERNARD",
    "bonus": 600
  },
  {
    "nom": "CLAUDE CHAPPE",
    "bonus": 600
  },
  {
    "nom": "CLAUDE DEBUSSY",
    "bonus": 600
  },
  {
    "nom": "CLAUDE MONET",
    "bonus": 600
  },
  {
    "nom": "COLETTE BESSON",
    "bonus": 1200
  },
  {
    "nom": "CONDORCET",
    "bonus": 0
  },
  {
    "nom": "DANIEL MAYER",
    "bonus": 1200
  },
  {
    "nom": "DE STAEL",
    "bonus": 600
  },
  {
    "nom": "EDGAR VARESE",
    "bonus": 1200
  },
  {
    "nom": "EDMOND MICHELET",
    "bonus": 1200
  },
  {
    "nom": "EDOUARD PAILLERON",
    "bonus": 1200
  },
  {
    "nom": "ELSA TRIOLET",
    "bonus": 1200
  },
  {
    "nom": "EVARISTE GALOIS",
    "bonus": 1200
  },
  {
    "nom": "FLORA TRISTAN",
    "bonus": 1200
  },
  {
    "nom": "FRANCOIS COUPERIN",
    "bonus": 0
  },
  {
    "nom": "FRANCOIS VILLON",
    "bonus": 1200
  },
  {
    "nom": "FRANCOISE DOLTO",
    "bonus": 600
  },
  {
    "nom": "FRANCOISE SELIGMANN",
    "bonus": 1200
  },
  {
    "nom": "GABRIEL FAURE",
    "bonus": 600
  },
  {
    "nom": "GEORGE SAND",
    "bonus": 600
  },
  {
    "nom": "GEORGES BRAQUE",
    "bonus": 600
  },
  {
    "nom": "GEORGES BRASSENS",
    "bonus": 600
  },
  {
    "nom": "GEORGES CLEMENCEAU",
    "bonus": 1200
  },
  {
    "nom": "GEORGES COURTELINE",
    "bonus": 600
  },
  {
    "nom": "GEORGES DUHAMEL",
    "bonus": 0
  },
  {
    "nom": "GEORGES MELIES",
    "bonus": 1200
  },
  {
    "nom": "GEORGES ROUAULT",
    "bonus": 1200
  },
  {
    "nom": "GERARD PHILIPE",
    "bonus": 1200
  },
  {
    "nom": "GERMAINE TILLION",
    "bonus": 1200
  },
  {
    "nom": "GUILLAUME APOLLINAIRE",
    "bonus": 1200
  },
  {
    "nom": "GUILLAUME BUDE",
    "bonus": 1200
  },
  {
    "nom": "GUSTAVE FLAUBERT",
    "bonus": 600
  },
  {
    "nom": "GUY FLAVIEN",
    "bonus": 600
  },
  {
    "nom": "HECTOR BERLIOZ",
    "bonus": 1200
  },
  {
    "nom": "HELENE BOUCHER",
    "bonus": 600
  },
  {
    "nom": "HENRI BERGSON",
    "bonus": 1200
  },
  {
    "nom": "HENRI IV",
    "bonus": 0
  },
  {
    "nom": "HENRI MATISSE",
    "bonus": 600
  },
  {
    "nom": "HONORE DE BALZAC",
    "bonus": 600
  },
  {
    "nom": "JACQUES DECOUR",
    "bonus": 600
  },
  {
    "nom": "JACQUES PREVERT",
    "bonus": 600
  },
  {
    "nom": "JANSON DE SAILLY",
    "bonus": 0
  },
  {
    "nom": "JEAN BAPTISTE CLEMENT",
    "bonus": 1200
  },
  {
    "nom": "JEAN BAPTISTE POQUELIN",
    "bonus": 600
  },
  {
    "nom": "JEAN BAPTISTE SAY",
    "bonus": 0
  },
  {
    "nom": "JEAN DE LA FONTAINE",
    "bonus": 0
  },
  {
    "nom": "JEAN FRANCOIS OEBEN",
    "bonus": 600
  },
  {
    "nom": "JEAN MOULIN",
    "bonus": 600
  },
  {
    "nom": "JEAN PERRIN",
    "bonus": 1200
  },
  {
    "nom": "JULES FERRY",
    "bonus": 600
  },
  {
    "nom": "JULES ROMAINS",
    "bonus": 0
  },
  {
    "nom": "JULES VERNE",
    "bonus": 600
  },
  {
    "nom": "LA GRANGE AUX BELLES",
    "bonus": 600
  },
  {
    "nom": "LA ROSE BLANCHE",
    "bonus": 600
  },
  {
    "nom": "LAMARTINE",
    "bonus": 0
  },
  {
    "nom": "LAVOISIER",
    "bonus": 0
  },
  {
    "nom": "LEON GAMBETTA",
    "bonus": 1200
  },
  {
    "nom": "LOUISE MICHEL",
    "bonus": 0
  },
  {
    "nom": "LUCIE ET RAYMOND AUBRAC",
    "bonus": 600
  },
  {
    "nom": "LUCIE FAURE",
    "bonus": 1200
  },
  {
    "nom": "MARIE CURIE",
    "bonus": 1200
  },
  {
    "nom": "MARX DORMOY",
    "bonus": 1200
  },
  {
    "nom": "MAURICE RAVEL",
    "bonus": 600
  },
  {
    "nom": "MAURICE UTRILLO",
    "bonus": 1200
  },
  {
    "nom": "MODIGLIANI",
    "bonus": 1200
  },
  {
    "nom": "MOLIERE",
    "bonus": 600
  },
  {
    "nom": "MONTAIGNE",
    "bonus": 0
  },
  {
    "nom": "MONTGOLFIER",
    "bonus": 600
  },
  {
    "nom": "MOULIN DES PRES",
    "bonus": 0
  },
  {
    "nom": "OCTAVE GREARD",
    "bonus": 0
  },
  {
    "nom": "PAUL BERT",
    "bonus": 0
  },
  {
    "nom": "PAUL GAUGUIN",
    "bonus": 0
  },
  {
    "nom": "PAUL VALERY",
    "bonus": 1200
  },
  {
    "nom": "PAUL VERLAINE",
    "bonus": 600
  },
  {
    "nom": "PIERRE ALVISET",
    "bonus": 0
  },
  {
    "nom": "PIERRE DE RONSARD",
    "bonus": 0
  },
  {
    "nom": "PIERRE JEAN DE BERANGER",
    "bonus": 0
  },
  {
    "nom": "PIERRE MENDES FRANCE",
    "bonus": 1200
  },
  {
    "nom": "PILATRE DE ROZIER",
    "bonus": 600
  },
  {
    "nom": "RAYMOND QUENEAU",
    "bonus": 0
  },
  {
    "nom": "ROBERT DOISNEAU",
    "bonus": 1200
  },
  {
    "nom": "RODIN",
    "bonus": 0
  },
  {
    "nom": "ROGNONI",
    "bonus": 0
  },
  {
    "nom": "ROLAND DORGELES",
    "bonus": 600
  },
  {
    "nom": "SAINT EXUPERY",
    "bonus": 0
  },
  {
    "nom": "SONIA DELAUNAY",
    "bonus": 1200
  },
  {
    "nom": "STEPHANE MALLARME",
    "bonus": 600
  },
  {
    "nom": "SUZANNE LACORE",
    "bonus": 1200
  },
  {
    "nom": "THOMAS MANN",
    "bonus": 1200
  },
  {
    "nom": "VALMY",
    "bonus": 600
  },
  {
    "nom": "VICTOR DURUY",
    "bonus": 0
  },
  {
    "nom": "VICTOR HUGO",
    "bonus": 0
  },
  {
    "nom": "VOLTAIRE",
    "bonus": 600
  },
  {
    "nom": "WOLFGANG AMADEUS MOZART",
    "bonus": 1200
  },
  {
    "nom": "YVONNE LE TAC",
    "bonus": 0
  }
];

export default colleges;