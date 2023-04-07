const listeColleges = [
  {
    "code": "0755433Y",
    "nom": "AIME CESAIRE",
    "annee": 2022,
    "dnb_admis": 63,
    "ips": 85.5,
    "bonus": 1200
  },
  {
    "code": "0750607C",
    "nom": "ALAIN FOURNIER",
    "annee": 2022,
    "dnb_admis": 129,
    "ips": 118,
    "bonus": 600
  },
  {
    "code": "0750445B",
    "nom": "ALBERTO GIACOMETTI",
    "annee": 2022,
    "dnb_admis": 102,
    "ips": 100.1,
    "bonus": 1200
  },
  {
    "code": "0751705W",
    "nom": "ALPHONSE DAUDET",
    "annee": 2022,
    "dnb_admis": 113,
    "ips": 104.6,
    "bonus": 1200
  },
  {
    "code": "0754305X",
    "nom": "ANDRE CITROEN",
    "annee": 2022,
    "dnb_admis": 134,
    "ips": 106.8,
    "bonus": 1200
  },
  {
    "code": "0752387M",
    "nom": "ANDRE MALRAUX",
    "annee": 2022,
    "dnb_admis": 93,
    "ips": 132.6,
    "bonus": 0
  },
  {
    "code": "0750608D",
    "nom": "ANNE FRANK",
    "annee": 2022,
    "dnb_admis": 88,
    "ips": 125.1,
    "bonus": 600
  },
  {
    "code": "0752319N",
    "nom": "ANTOINE COYSEVOX",
    "annee": 2022,
    "dnb_admis": 161,
    "ips": 112.9,
    "bonus": 600
  },
  {
    "code": "0750362L",
    "nom": "BEAUMARCHAIS",
    "annee": 2022,
    "dnb_admis": 89,
    "ips": 127.8,
    "bonus": 600
  },
  {
    "code": "0752829T",
    "nom": "BERNARD PALISSY",
    "annee": 2022,
    "dnb_admis": 63,
    "ips": 126.6,
    "bonus": 600
  },
  {
    "code": "0752958H",
    "nom": "BORIS VIAN",
    "annee": 2022,
    "dnb_admis": 89,
    "ips": 93.8,
    "bonus": 1200
  },
  {
    "code": "0752545J",
    "nom": "BUFFON",
    "annee": 2022,
    "dnb_admis": 135,
    "ips": 132.8,
    "bonus": 0
  },
  {
    "code": "0752694W",
    "nom": "CAMILLE CLAUDEL",
    "annee": 2022,
    "dnb_admis": 72,
    "ips": 91.3,
    "bonus": 1200
  },
  {
    "code": "0752546K",
    "nom": "CAMILLE SEE",
    "annee": 2022,
    "dnb_admis": 144,
    "ips": 132.1,
    "bonus": 600
  },
  {
    "code": "0752552S",
    "nom": "CARNOT",
    "annee": 2022,
    "dnb_admis": 143,
    "ips": 140.4,
    "bonus": 0
  },
  {
    "code": "0752248L",
    "nom": "CESAR FRANCK",
    "annee": 2022,
    "dnb_admis": 81,
    "ips": 131.9,
    "bonus": 0
  },
  {
    "code": "0752529S",
    "nom": "CHAPTAL",
    "annee": 2022,
    "dnb_admis": 118,
    "ips": 143.9,
    "bonus": 0
  },
  {
    "code": "0752525M",
    "nom": "CHARLEMAGNE",
    "annee": 2022,
    "dnb_admis": 103,
    "ips": 130,
    "bonus": 0
  },
  {
    "code": "0751706X",
    "nom": "CHARLES PEGUY",
    "annee": 2022,
    "dnb_admis": 86,
    "ips": 111.9,
    "bonus": 600
  },
  {
    "code": "0752547L",
    "nom": "CLAUDE BERNARD",
    "annee": 2022,
    "dnb_admis": 62,
    "ips": 114.3,
    "bonus": 600
  },
  {
    "code": "0750360J",
    "nom": "CLAUDE CHAPPE",
    "annee": 2022,
    "dnb_admis": 88,
    "ips": 122.2,
    "bonus": 600
  },
  {
    "code": "0752317L",
    "nom": "CLAUDE DEBUSSY",
    "annee": 2022,
    "dnb_admis": 107,
    "ips": 129.8,
    "bonus": 600
  },
  {
    "code": "0752539C",
    "nom": "CLAUDE MONET",
    "annee": 2022,
    "dnb_admis": 101,
    "ips": 126.2,
    "bonus": 600
  },
  {
    "code": "0755241P",
    "nom": "COLETTE BESSON",
    "annee": 2022,
    "dnb_admis": 79,
    "ips": 102.5,
    "bonus": 1200
  },
  {
    "code": "0751791P",
    "nom": "CONDORCET",
    "annee": 2022,
    "dnb_admis": 192,
    "ips": 144.1,
    "bonus": 0
  },
  {
    "code": "0755030K",
    "nom": "DANIEL MAYER",
    "annee": 2022,
    "dnb_admis": 69,
    "ips": 74.4,
    "bonus": 1200
  },
  {
    "code": "0751563S",
    "nom": "DE STAEL",
    "annee": 2022,
    "dnb_admis": 87,
    "ips": 109.6,
    "bonus": 600
  },
  {
    "code": "0755095F",
    "nom": "EDGAR VARESE",
    "annee": 2022,
    "dnb_admis": 67,
    "ips": 108.4,
    "bonus": 1200
  },
  {
    "code": "0753345D",
    "nom": "EDMOND MICHELET",
    "annee": 2022,
    "dnb_admis": 74,
    "ips": 96.4,
    "bonus": 1200
  },
  {
    "code": "0751707Y",
    "nom": "EDOUARD PAILLERON",
    "annee": 2022,
    "dnb_admis": 61,
    "ips": 104.6,
    "bonus": 1200
  },
  {
    "code": "0752385K",
    "nom": "ELSA TRIOLET",
    "annee": 2022,
    "dnb_admis": 73,
    "ips": 101.5,
    "bonus": 1200
  },
  {
    "code": "0753937X",
    "nom": "EVARISTE GALOIS",
    "annee": 2022,
    "dnb_admis": 84,
    "ips": 92.8,
    "bonus": 1200
  },
  {
    "code": "0753046D",
    "nom": "FLORA TRISTAN",
    "annee": 2022,
    "dnb_admis": 104,
    "ips": 102.7,
    "bonus": 1200
  },
  {
    "code": "0752693V",
    "nom": "FRANCOIS COUPERIN",
    "annee": 2022,
    "dnb_admis": 93,
    "ips": 128.7,
    "bonus": 0
  },
  {
    "code": "0752544H",
    "nom": "FRANCOIS VILLON",
    "annee": 2022,
    "dnb_admis": 76,
    "ips": 92.4,
    "bonus": 1200
  },
  {
    "code": "0750552T",
    "nom": "FRANCOISE DOLTO",
    "annee": 2022,
    "dnb_admis": 95,
    "ips": 116.5,
    "bonus": 600
  },
  {
    "code": "0755778Y",
    "nom": "FRANCOISE SELIGMANN",
    "annee": 2022,
    "dnb_admis": 57,
    "ips": 98.2,
    "bonus": 1200
  },
  {
    "code": "0752540D",
    "nom": "GABRIEL FAURE",
    "annee": 2022,
    "dnb_admis": 90,
    "ips": 108.3,
    "bonus": 600
  },
  {
    "code": "0752316K",
    "nom": "GEORGE SAND",
    "annee": 2022,
    "dnb_admis": 94,
    "ips": 112.3,
    "bonus": 600
  },
  {
    "code": "0752957G",
    "nom": "GEORGES BRAQUE",
    "annee": 2022,
    "dnb_admis": 112,
    "ips": 116.7,
    "bonus": 600
  },
  {
    "code": "0750507U",
    "nom": "GEORGES BRASSENS",
    "annee": 2022,
    "dnb_admis": 120,
    "ips": 102.5,
    "bonus": 1200
  },
  {
    "code": "0750546L",
    "nom": "GEORGES CLEMENCEAU",
    "annee": 2022,
    "dnb_admis": 71,
    "ips": 80,
    "bonus": 1200
  },
  {
    "code": "0750444A",
    "nom": "GEORGES COURTELINE",
    "annee": 2022,
    "dnb_admis": 128,
    "ips": 123.6,
    "bonus": 600
  },
  {
    "code": "0752192A",
    "nom": "GEORGES DUHAMEL",
    "annee": 2022,
    "dnb_admis": 99,
    "ips": 125.8,
    "bonus": 600
  },
  {
    "code": "0752606A",
    "nom": "GEORGES MELIES",
    "annee": 2022,
    "dnb_admis": 62,
    "ips": 88.3,
    "bonus": 1200
  },
  {
    "code": "0753938Y",
    "nom": "GEORGES ROUAULT",
    "annee": 2022,
    "dnb_admis": 79,
    "ips": 90,
    "bonus": 1200
  },
  {
    "code": "0752195D",
    "nom": "GERARD PHILIPE",
    "annee": 2022,
    "dnb_admis": 68,
    "ips": 96.5,
    "bonus": 1200
  },
  {
    "code": "0753936W",
    "nom": "GERMAINE TILLION",
    "annee": 2022,
    "dnb_admis": 81,
    "ips": 99.4,
    "bonus": 1200
  },
  {
    "code": "0752190Y",
    "nom": "GUILLAUME APOLLINAIRE",
    "annee": 2022,
    "dnb_admis": 93,
    "ips": 99.5,
    "bonus": 1200
  },
  {
    "code": "0752695X",
    "nom": "GUILLAUME BUDE",
    "annee": 2022,
    "dnb_admis": 90,
    "ips": 93.5,
    "bonus": 1200
  },
  {
    "code": "0753518S",
    "nom": "GUSTAVE FLAUBERT",
    "annee": 2022,
    "dnb_admis": 103,
    "ips": 108.8,
    "bonus": 600
  },
  {
    "code": "0752189X",
    "nom": "GUY FLAVIEN",
    "annee": 2022,
    "dnb_admis": 104,
    "ips": 118.3,
    "bonus": 600
  },
  {
    "code": "0752252R",
    "nom": "HECTOR BERLIOZ",
    "annee": 2022,
    "dnb_admis": 144,
    "ips": 100,
    "bonus": 1200
  },
  {
    "code": "0752556W",
    "nom": "HELENE BOUCHER",
    "annee": 2022,
    "dnb_admis": 92,
    "ips": 117.4,
    "bonus": 600
  },
  {
    "code": "0752555V",
    "nom": "HENRI BERGSON",
    "annee": 2022,
    "dnb_admis": 80,
    "ips": 102.2,
    "bonus": 1200
  },
  {
    "code": "0752526N",
    "nom": "HENRI IV",
    "annee": 2022,
    "dnb_admis": 157,
    "ips": 151.1,
    "bonus": 0
  },
  {
    "code": "0750591K",
    "nom": "HENRI MATISSE",
    "annee": 2022,
    "dnb_admis": 102,
    "ips": 118.2,
    "bonus": 600
  },
  {
    "code": "0752553T",
    "nom": "HONORE DE BALZAC",
    "annee": 2022,
    "dnb_admis": 192,
    "ips": 125.5,
    "bonus": 600
  },
  {
    "code": "0752532V",
    "nom": "JACQUES DECOUR",
    "annee": 2022,
    "dnb_admis": 146,
    "ips": 126.6,
    "bonus": 600
  },
  {
    "code": "0752187V",
    "nom": "JACQUES PREVERT",
    "annee": 2022,
    "dnb_admis": 72,
    "ips": 119.8,
    "bonus": 600
  },
  {
    "code": "0752548M",
    "nom": "JANSON DE SAILLY",
    "annee": 2022,
    "dnb_admis": 334,
    "ips": 128.9,
    "bonus": 0
  },
  {
    "code": "0752550P",
    "nom": "JEAN DE LA FONTAINE",
    "annee": 2022,
    "dnb_admis": 198,
    "ips": 135.3,
    "bonus": 0
  },
  {
    "code": "0750611G",
    "nom": "JEAN MOULIN",
    "annee": 2022,
    "dnb_admis": 120,
    "ips": 122.8,
    "bonus": 600
  },
  {
    "code": "0753939Z",
    "nom": "JEAN PERRIN",
    "annee": 2022,
    "dnb_admis": 65,
    "ips": 81.1,
    "bonus": 1200
  },
  {
    "code": "0750478M",
    "nom": "JEAN-BAPTISTE CLEMENT",
    "annee": 2022,
    "dnb_admis": 59,
    "ips": 105.6,
    "bonus": 1200
  },
  {
    "code": "0751703U",
    "nom": "JEAN-BAPTISTE POQUELIN",
    "annee": 2022,
    "dnb_admis": 75,
    "ips": 125.8,
    "bonus": 600
  },
  {
    "code": "0752549N",
    "nom": "JEAN-BAPTISTE SAY",
    "annee": 2022,
    "dnb_admis": 172,
    "ips": 147.5,
    "bonus": 0
  },
  {
    "code": "0752542F",
    "nom": "JEAN-FRANCOIS OEBEN",
    "annee": 2022,
    "dnb_admis": 101,
    "ips": 118.6,
    "bonus": 600
  },
  {
    "code": "0752533W",
    "nom": "JULES FERRY",
    "annee": 2022,
    "dnb_admis": 100,
    "ips": 127.1,
    "bonus": 600
  },
  {
    "code": "0752249M",
    "nom": "JULES ROMAINS",
    "annee": 2022,
    "dnb_admis": 130,
    "ips": 127.6,
    "bonus": 0
  },
  {
    "code": "0750610F",
    "nom": "JULES VERNE",
    "annee": 2022,
    "dnb_admis": 86,
    "ips": 105.2,
    "bonus": 1200
  },
  {
    "code": "0753047E",
    "nom": "LA GRANGE AUX BELLES",
    "annee": 2022,
    "dnb_admis": 76,
    "ips": 114.2,
    "bonus": 600
  },
  {
    "code": "0755779Z",
    "nom": "LA ROSE BLANCHE",
    "annee": 2022,
    "dnb_admis": 82,
    "ips": 111.2,
    "bonus": 600
  },
  {
    "code": "0752534X",
    "nom": "LAMARTINE",
    "annee": 2022,
    "dnb_admis": 93,
    "ips": 138.4,
    "bonus": 0
  },
  {
    "code": "0752531U",
    "nom": "LAVOISIER",
    "annee": 2022,
    "dnb_admis": 89,
    "ips": 148.5,
    "bonus": 0
  },
  {
    "code": "0752696Y",
    "nom": "LEON GAMBETTA",
    "annee": 2022,
    "dnb_admis": 114,
    "ips": 106.1,
    "bonus": 1200
  },
  {
    "code": "0752251P",
    "nom": "LOUISE MICHEL",
    "annee": 2022,
    "dnb_admis": 120,
    "ips": 125.4,
    "bonus": 600
  },
  {
    "code": "0750465Y",
    "nom": "LUCIE ET RAYMOND AUBRAC",
    "annee": 2022,
    "dnb_admis": 94,
    "ips": 118.3,
    "bonus": 600
  },
  {
    "code": "0750550R",
    "nom": "LUCIE FAURE",
    "annee": 2022,
    "dnb_admis": 73,
    "ips": 105.4,
    "bonus": 1200
  },
  {
    "code": "0754706H",
    "nom": "MARIE CURIE",
    "annee": 2022,
    "dnb_admis": 72,
    "ips": 103.1,
    "bonus": 1200
  },
  {
    "code": "0752196E",
    "nom": "MARX DORMOY",
    "annee": 2022,
    "dnb_admis": 88,
    "ips": 88.3,
    "bonus": 1200
  },
  {
    "code": "0752557X",
    "nom": "MAURICE RAVEL",
    "annee": 2022,
    "dnb_admis": 73,
    "ips": 117.8,
    "bonus": 600
  },
  {
    "code": "0751793S",
    "nom": "MAURICE UTRILLO",
    "annee": 2022,
    "dnb_admis": 65,
    "ips": 87.1,
    "bonus": 1200
  },
  {
    "code": "0752318M",
    "nom": "MODIGLIANI",
    "annee": 2022,
    "dnb_admis": 106,
    "ips": 105.1,
    "bonus": 1200
  },
  {
    "code": "0752551R",
    "nom": "MOLIERE",
    "annee": 2022,
    "dnb_admis": 125,
    "ips": 115.6,
    "bonus": 600
  },
  {
    "code": "0752527P",
    "nom": "MONTAIGNE",
    "annee": 2022,
    "dnb_admis": 141,
    "ips": 139.4,
    "bonus": 0
  },
  {
    "code": "0752523K",
    "nom": "MONTGOLFIER",
    "annee": 2022,
    "dnb_admis": 96,
    "ips": 120.3,
    "bonus": 600
  },
  {
    "code": "0750525N",
    "nom": "MOULIN DES PRES",
    "annee": 2022,
    "dnb_admis": 95,
    "ips": 121.1,
    "bonus": 600
  },
  {
    "code": "0752530T",
    "nom": "OCTAVE GREARD",
    "annee": 2022,
    "dnb_admis": 126,
    "ips": 139.8,
    "bonus": 0
  },
  {
    "code": "0752543G",
    "nom": "PAUL BERT",
    "annee": 2022,
    "dnb_admis": 78,
    "ips": 129.8,
    "bonus": 0
  },
  {
    "code": "0752250N",
    "nom": "PAUL GAUGUIN",
    "annee": 2022,
    "dnb_admis": 99,
    "ips": 134.5,
    "bonus": 0
  },
  {
    "code": "0752537A",
    "nom": "PAUL VALERY",
    "annee": 2022,
    "dnb_admis": 118,
    "ips": 109,
    "bonus": 1200
  },
  {
    "code": "0750609E",
    "nom": "PAUL VERLAINE",
    "annee": 2022,
    "dnb_admis": 101,
    "ips": 121.2,
    "bonus": 600
  },
  {
    "code": "0751790N",
    "nom": "PIERRE ALVISET",
    "annee": 2022,
    "dnb_admis": 130,
    "ips": 145.9,
    "bonus": 0
  },
  {
    "code": "0752107H",
    "nom": "PIERRE DE RONSARD",
    "annee": 2022,
    "dnb_admis": 150,
    "ips": 127.8,
    "bonus": 0
  },
  {
    "code": "0752198G",
    "nom": "PIERRE MENDES FRANCE",
    "annee": 2022,
    "dnb_admis": 105,
    "ips": 87.5,
    "bonus": 1200
  },
  {
    "code": "0750387N",
    "nom": "PIERRE-JEAN DE BERANGER",
    "annee": 2022,
    "dnb_admis": 79,
    "ips": 140.3,
    "bonus": 0
  },
  {
    "code": "0754528P",
    "nom": "PILATRE DE ROZIER",
    "annee": 2022,
    "dnb_admis": 101,
    "ips": 114,
    "bonus": 600
  },
  {
    "code": "0752186U",
    "nom": "RAYMOND QUENEAU",
    "annee": 2022,
    "dnb_admis": 108,
    "ips": 137.2,
    "bonus": 0
  },
  {
    "code": "0754355B",
    "nom": "ROBERT DOISNEAU",
    "annee": 2022,
    "dnb_admis": 76,
    "ips": 97.4,
    "bonus": 1200
  },
  {
    "code": "0752538B",
    "nom": "RODIN",
    "annee": 2022,
    "dnb_admis": 114,
    "ips": 134.4,
    "bonus": 0
  },
  {
    "code": "0750407K",
    "nom": "ROGNONI",
    "annee": 2022,
    "dnb_admis": 52,
    "ips": 157.7,
    "bonus": 0
  },
  {
    "code": "0750429J",
    "nom": "ROLAND DORGELES",
    "annee": 2022,
    "dnb_admis": 98,
    "ips": 125,
    "bonus": 600
  },
  {
    "code": "0754253R",
    "nom": "SAINT-EXUPERY",
    "annee": 2022,
    "dnb_admis": 81,
    "ips": 135.9,
    "bonus": 0
  },
  {
    "code": "0750575T",
    "nom": "SONIA DELAUNAY",
    "annee": 2022,
    "dnb_admis": 71,
    "ips": 92.4,
    "bonus": 1200
  },
  {
    "code": "0752554U",
    "nom": "STEPHANE MALLARME",
    "annee": 2022,
    "dnb_admis": 143,
    "ips": 124,
    "bonus": 600
  },
  {
    "code": "0755747P",
    "nom": "SUZANNE LACORE",
    "annee": 2022,
    "dnb_admis": 55,
    "ips": 93.6,
    "bonus": 1200
  },
  {
    "code": "0755000C",
    "nom": "THOMAS MANN",
    "annee": 2022,
    "dnb_admis": 110,
    "ips": 98.3,
    "bonus": 1200
  },
  {
    "code": "0750584C",
    "nom": "VALMY",
    "annee": 2022,
    "dnb_admis": 65,
    "ips": 113.3,
    "bonus": 600
  },
  {
    "code": "0752528R",
    "nom": "VICTOR DURUY",
    "annee": 2022,
    "dnb_admis": 108,
    "ips": 150.1,
    "bonus": 0
  },
  {
    "code": "0752524L",
    "nom": "VICTOR HUGO",
    "annee": 2022,
    "dnb_admis": 101,
    "ips": 130.5,
    "bonus": 0
  },
  {
    "code": "0752536Z",
    "nom": "VOLTAIRE",
    "annee": 2022,
    "dnb_admis": 95,
    "ips": 124.3,
    "bonus": 600
  },
  {
    "code": "0750484U",
    "nom": "W.A. MOZART",
    "annee": 2022,
    "dnb_admis": 57,
    "ips": 95.4,
    "bonus": 1200
  },
  {
    "code": "0752108J",
    "nom": "YVONNE LE TAC",
    "annee": 2022,
    "dnb_admis": 105,
    "ips": 140.4,
    "bonus": 0
  }
 ];

const collegesMap = new Map();
listeColleges.forEach(item => {
  collegesMap.set(item.code, item);
});

export {listeColleges, collegesMap}