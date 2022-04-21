const colleges = [
    {
      "nom": "JEAN-BAPTISTE POQUELIN",
      "bonus": 600
    },
    {
      "nom": "CESAR FRANCK",
      "bonus": 0
    },
    {
      "nom": "PIERRE-JEAN DE BERANGER",
      "bonus": 0
    },
    {
      "nom": "VICTOR HUGO",
      "bonus": 0
    },
    {
      "nom": "MONTGOLFIER",
      "bonus": 600
    },
    {
      "nom": "CHARLEMAGNE",
      "bonus": 0
    },
    {
      "nom": "FRANCOIS COUPERIN",
      "bonus": 0
    },
    {
      "nom": "ROGNONI",
      "bonus": 0
    },
    {
      "nom": "LAVOISIER",
      "bonus": 0
    },
    {
      "nom": "HENRI IV",
      "bonus": 0
    },
    {
      "nom": "PIERRE ALVISET",
      "bonus": 0
    },
    {
      "nom": "RAYMOND QUENEAU",
      "bonus": 0
    },
    {
      "nom": "MONTAIGNE",
      "bonus": 0
    },
    {
      "nom": "JACQUES PREVERT",
      "bonus": 600
    },
    {
      "nom": "SEGPA JACQUES PREVERT",
      "bonus": 1200
    },
    {
      "nom": "VICTOR DURUY",
      "bonus": 0
    },
    {
      "nom": "JULES ROMAINS",
      "bonus": 0
    },
    {
      "nom": "CHAPTAL",
      "bonus": 0
    },
    {
      "nom": "CONDORCET",
      "bonus": 0
    },
    {
      "nom": "OCTAVE GREARD",
      "bonus": 0
    },
    {
      "nom": "LAMARTINE",
      "bonus": 0
    },
    {
      "nom": "PAUL GAUGUIN",
      "bonus": 0
    },
    {
      "nom": "JULES FERRY",
      "bonus": 600
    },
    {
      "nom": "JACQUES DECOUR",
      "bonus": 600
    },
    {
      "nom": "LOUISE MICHEL",
      "bonus": 0
    },
    {
      "nom": "BERNARD PALISSY",
      "bonus": 600
    },
    {
      "nom": "VALMY",
      "bonus": 600
    },
    {
      "nom": "LA GRANGE AUX BELLES",
      "bonus": 600
    },
    {
      "nom": "FRANCOISE SELIGMANN",
      "bonus": 1200
    },
    {
      "nom": "BEAUMARCHAIS",
      "bonus": 600
    },
    {
      "nom": "ANNE FRANK",
      "bonus": 600
    },
    {
      "nom": "PILATRE DE ROZIER",
      "bonus": 600
    },
    {
      "nom": "VOLTAIRE",
      "bonus": 600
    },
    {
      "nom": "LUCIE ET RAYMOND AUBRAC",
      "bonus": 600
    },
    {
      "nom": "ALAIN FOURNIER",
      "bonus": 600
    },
    {
      "nom": "SEGPA PILATRE DE ROZIER",
      "bonus": 1200
    },
    {
      "nom": "GEORGES COURTELINE",
      "bonus": 600
    },
    {
      "nom": "JEAN-FRANCOIS OEBEN",
      "bonus": 600
    },
    {
      "nom": "PAUL VERLAINE",
      "bonus": 600
    },
    {
      "nom": "GUY FLAVIEN",
      "bonus": 600
    },
    {
      "nom": "JULES VERNE",
      "bonus": 600
    },
    {
      "nom": "PAUL VALERY",
      "bonus": 1200
    },
    {
      "nom": "GERMAINE TILLION",
      "bonus": 1200
    },
    {
      "nom": "SEGPA GERMAINE TILLION",
      "bonus": 1200
    },
    {
      "nom": "RODIN",
      "bonus": 0
    },
    {
      "nom": "MOULIN DES PRES",
      "bonus": 0
    },
    {
      "nom": "CLAUDE MONET",
      "bonus": 600
    },
    {
      "nom": "GABRIEL FAURE",
      "bonus": 600
    },
    {
      "nom": "GEORGES BRAQUE",
      "bonus": 600
    },
    {
      "nom": "GEORGE SAND",
      "bonus": 600
    },
    {
      "nom": "GUSTAVE FLAUBERT",
      "bonus": 600
    },
    {
      "nom": "ELSA TRIOLET",
      "bonus": 1200
    },
    {
      "nom": "THOMAS MANN",
      "bonus": 1200
    },
    {
      "nom": "EVARISTE GALOIS",
      "bonus": 1200
    },
    {
      "nom": "CAMILLE CLAUDEL",
      "bonus": 1200
    },
    {
      "nom": "SEGPA ELSA TRIOLET",
      "bonus": 1200
    },
    {
      "nom": "PAUL BERT",
      "bonus": 0
    },
    {
      "nom": "SAINT-EXUPERY",
      "bonus": 0
    },
    {
      "nom": "JEAN MOULIN",
      "bonus": 600
    },
    {
      "nom": "ALPHONSE DAUDET",
      "bonus": 600
    },
    {
      "nom": "ALBERTO GIACOMETTI",
      "bonus": 1200
    },
    {
      "nom": "FRANCOIS VILLON",
      "bonus": 1200
    },
    {
      "nom": "SEGPA GIACOMETTI",
      "bonus": 1200
    },
    {
      "nom": "BUFFON",
      "bonus": 0
    },
    {
      "nom": "GEORGES DUHAMEL",
      "bonus": 0
    },
    {
      "nom": "CLAUDE DEBUSSY",
      "bonus": 0
    },
    {
      "nom": "CAMILLE SEE",
      "bonus": 600
    },
    {
      "nom": "DE STAEL",
      "bonus": 600
    },
    {
      "nom": "ANDRE CITROEN",
      "bonus": 600
    },
    {
      "nom": "MODIGLIANI",
      "bonus": 1200
    },
    {
      "nom": "GUILLAUME APOLLINAIRE",
      "bonus": 1200
    },
    {
      "nom": "SEGPA GUILLAUME APOLLINAIRE",
      "bonus": 1200
    },
    {
      "nom": "JEAN-BAPTISTE SAY",
      "bonus": 0
    },
    {
      "nom": "JEAN DE LA FONTAINE",
      "bonus": 0
    },
    {
      "nom": "JANSON DE SAILLY",
      "bonus": 0
    },
    {
      "nom": "MOLIERE",
      "bonus": 600
    },
    {
      "nom": "CLAUDE BERNARD",
      "bonus": 600
    },
    {
      "nom": "CARNOT",
      "bonus": 0
    },
    {
      "nom": "ANDRE MALRAUX",
      "bonus": 0
    },
    {
      "nom": "PIERRE DE RONSARD",
      "bonus": 0
    },
    {
      "nom": "STEPHANE MALLARME",
      "bonus": 600
    },
    {
      "nom": "HONORE DE BALZAC",
      "bonus": 600
    },
    {
      "nom": "LA ROSE BLANCHE",
      "bonus": 600
    },
    {
      "nom": "BORIS VIAN",
      "bonus": 1200
    },
    {
      "nom": "SEGPA LA ROSE BLANCHE",
      "bonus": 1200
    },
    {
      "nom": "YVONNE LE TAC",
      "bonus": 0
    },
    {
      "nom": "ROLAND DORGELES",
      "bonus": 600
    },
    {
      "nom": "ANTOINE COYSEVOX",
      "bonus": 600
    },
    {
      "nom": "MARIE CURIE",
      "bonus": 1200
    },
    {
      "nom": "HECTOR BERLIOZ",
      "bonus": 1200
    },
    {
      "nom": "MAURICE UTRILLO",
      "bonus": 1200
    },
    {
      "nom": "MARX DORMOY",
      "bonus": 1200
    },
    {
      "nom": "GERARD PHILIPE",
      "bonus": 1200
    },
    {
      "nom": "AIME CESAIRE",
      "bonus": 1200
    },
    {
      "nom": "DANIEL MAYER",
      "bonus": 1200
    },
    {
      "nom": "GEORGES CLEMENCEAU",
      "bonus": 1200
    },
    {
      "nom": "SEGPA MARX DORMOY",
      "bonus": 1200
    },
    {
      "nom": "SEGPA AIME CESAIRE",
      "bonus": 1200
    },
    {
      "nom": "SEGPA HECTOR BERLIOZ",
      "bonus": 1200
    },
    {
      "nom": "CLAUDE CHAPPE",
      "bonus": 600
    },
    {
      "nom": "CHARLES PEGUY",
      "bonus": 600
    },
    {
      "nom": "GEORGES BRASSENS",
      "bonus": 600
    },
    {
      "nom": "EDGAR VARESE",
      "bonus": 1200
    },
    {
      "nom": "HENRI BERGSON",
      "bonus": 1200
    },
    {
      "nom": "EDOUARD PAILLERON",
      "bonus": 1200
    },
    {
      "nom": "GUILLAUME BUDE",
      "bonus": 1200
    },
    {
      "nom": "W.A. MOZART",
      "bonus": 1200
    },
    {
      "nom": "SONIA DELAUNAY",
      "bonus": 1200
    },
    {
      "nom": "SUZANNE LACORE",
      "bonus": 1200
    },
    {
      "nom": "EDMOND MICHELET",
      "bonus": 1200
    },
    {
      "nom": "GEORGES ROUAULT",
      "bonus": 1200
    },
    {
      "nom": "GEORGES MELIES",
      "bonus": 1200
    },
    {
      "nom": "SEGPA EDOUARD PAILLERON",
      "bonus": 1200
    },
    {
      "nom": "SEGPA GEORGES BRASSENS",
      "bonus": 1200
    },
    {
      "nom": "HENRI MATISSE",
      "bonus": 600
    },
    {
      "nom": "HELENE BOUCHER",
      "bonus": 600
    },
    {
      "nom": "MAURICE RAVEL",
      "bonus": 600
    },
    {
      "nom": "FRANCOISE DOLTO",
      "bonus": 600
    },
    {
      "nom": "LUCIE FAURE",
      "bonus": 1200
    },
    {
      "nom": "COLETTE BESSON",
      "bonus": 1200
    },
    {
      "nom": "JEAN-BAPTISTE CLEMENT",
      "bonus": 1200
    },
    {
      "nom": "LEON GAMBETTA",
      "bonus": 1200
    },
    {
      "nom": "FLORA TRISTAN",
      "bonus": 1200
    },
    {
      "nom": "ROBERT DOISNEAU",
      "bonus": 1200
    },
    {
      "nom": "PIERRE MENDES FRANCE",
      "bonus": 1200
    },
    {
      "nom": "JEAN PERRIN",
      "bonus": 1200
    },
    {
      "nom": "SEGPA ROBERT DOISNEAU",
      "bonus": 1200
    },
    {
      "nom": "SEGPA JEAN-BAPTISTE CLEMENT",
      "bonus": 1200
    },
    {
      "nom": "SEGPA PIERRE MENDES FRANCE",
      "bonus": 1200
    },
    {
      "nom": "MASSILLON",
      "bonus": 0
    },
    {
      "nom": "LES FRANCS BOURGEOIS",
      "bonus": 0
    },
    {
      "nom": "SAINT JEAN GABRIEL",
      "bonus": 0
    },
    {
      "nom": "SEVIGNE",
      "bonus": 0
    },
    {
      "nom": "SOEUR ROSALIE",
      "bonus": 0
    },
    {
      "nom": "NOTRE DAME DE SION",
      "bonus": 0
    },
    {
      "nom": "STANISLAS",
      "bonus": 0
    },
    {
      "nom": "ECOLE ALSACIENNE",
      "bonus": 0
    },
    {
      "nom": "SAINT LOUIS",
      "bonus": 0
    },
    {
      "nom": "SAINTE GENEVIEVE",
      "bonus": 0
    },
    {
      "nom": "SAINT SULPICE",
      "bonus": 0
    },
    {
      "nom": "LA ROCHEFOUCAULD",
      "bonus": 0
    },
    {
      "nom": "SAINTE JEANNE ELISABETH",
      "bonus": 0
    },
    {
      "nom": "PAUL CLAUDEL D HULST",
      "bonus": 0
    },
    {
      "nom": "L ALMA",
      "bonus": 0
    },
    {
      "nom": "THERESE CHAPPUIS",
      "bonus": 0
    },
    {
      "nom": "FENELON SAINTE MARIE",
      "bonus": 0
    },
    {
      "nom": "POUR HANDICAPES MORVAN",
      "bonus": 600
    },
    {
      "nom": "BOSSUET NOTRE DAME",
      "bonus": 0
    },
    {
      "nom": "ROCROY SAINT VINCENT DE PAUL",
      "bonus": 0
    },
    {
      "nom": "CHARLES PEGUY",
      "bonus": 0
    },
    {
      "nom": "SAINT AMBROISE",
      "bonus": 0
    },
    {
      "nom": "POUR HANDICAPES VOTRE ECOLE CHEZ VOUS",
      "bonus": 600
    },
    {
      "nom": "OZAR HATORAH",
      "bonus": 600
    },
    {
      "nom": "POUR HANDICAPES REGAIN TOURNESOL",
      "bonus": 0
    },
    {
      "nom": "SAINT MICHEL DE PICPUS",
      "bonus": 0
    },
    {
      "nom": "SAINTE CLOTILDE",
      "bonus": 0
    },
    {
      "nom": "GEORGES LEVEN",
      "bonus": 0
    },
    {
      "nom": "SAINT PIERRE FOURIER",
      "bonus": 600
    },
    {
      "nom": "NOTRE DAME DE FRANCE",
      "bonus": 0
    },
    {
      "nom": "YABNE",
      "bonus": 0
    },
    {
      "nom": "SAINTE MARIE",
      "bonus": 0
    },
    {
      "nom": "LA SALLE NOTRE DAME DE LA GARE",
      "bonus": 0
    },
    {
      "nom": "LA BRUYERE SAINTE ISABELLE",
      "bonus": 0
    },
    {
      "nom": "CATHERINE LABOURE",
      "bonus": 600
    },
    {
      "nom": "ECOLE JEANNINE MANUEL",
      "bonus": 0
    },
    {
      "nom": "BLOMET",
      "bonus": 0
    },
    {
      "nom": "SAINTE ELISABETH",
      "bonus": 0
    },
    {
      "nom": "SAINT JOSEPH",
      "bonus": 0
    },
    {
      "nom": "SAINT JEAN DE DIEU",
      "bonus": 600
    },
    {
      "nom": "SAINT LOUIS DE GONZAGUE",
      "bonus": 0
    },
    {
      "nom": "SAINT JEAN DE PASSY",
      "bonus": 0
    },
    {
      "nom": "LA TOUR",
      "bonus": 0
    },
    {
      "nom": "NOTRE DAME DES OISEAUX",
      "bonus": 0
    },
    {
      "nom": "GERSON",
      "bonus": 0
    },
    {
      "nom": "L ASSOMPTION",
      "bonus": 0
    },
    {
      "nom": "SAINT HONORE D EYLAU",
      "bonus": 0
    },
    {
      "nom": "PASCAL",
      "bonus": 0
    },
    {
      "nom": "STE URSULE LOUISE DE BETTIGNIES",
      "bonus": 0
    },
    {
      "nom": "ECOLE INTERNATIONALE BILINGUE SECTION MONCEAU",
      "bonus": 0
    },
    {
      "nom": "SAINT MICHEL DES BATIGNOLLES",
      "bonus": 0
    },
    {
      "nom": "RACHI",
      "bonus": 600
    },
    {
      "nom": "SAINT LOUIS",
      "bonus": 0
    },
    {
      "nom": "SINAI",
      "bonus": 600
    },
    {
      "nom": "SAINT VINCENT",
      "bonus": 600
    },
    {
      "nom": "SAINT GEORGES",
      "bonus": 0
    },
    {
      "nom": "BETH HANNA",
      "bonus": 0
    },
    {
      "nom": "LUCIEN DE HIRSCH",
      "bonus": 0
    },
    {
      "nom": "N R HATORAH",
      "bonus": 600
    },
    {
      "nom": "NOTRE DAME DE LOURDES",
      "bonus": 0
    },
    {
      "nom": "SAINTE LOUISE",
      "bonus": 0
    },
    {
      "nom": "SAINT GERMAIN DE CHARONNE",
      "bonus": 600
    },
    {
      "nom": "HEIKHAL MENAHEM",
      "bonus": 600
    },
    {
      "nom": "BETH YACOV",
      "bonus": 600
    }
  ];

  export default colleges;