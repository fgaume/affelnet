const listeMatieres = [
    { nom: "Français", notes: [], order: 0 },
    { nom: "Mathématiques", notes: [], order: 1 },
    { nom: "Langue 1", notes: [], order: 2 },
    { nom: "Langue 2", notes: [], order: 3 },
    { nom: "EPS", notes: [], order: 4 },
    { nom: "Arts Plastiques", notes: [], order: 5 },
    { nom: "Musique", notes: [], order: 6 },
    { nom: "SVT", notes: [], order: 7 },
    { nom: "Technologie", notes: [], order: 8 },
    { nom: "Physique-Chimie", notes: [], order: 9 },
    { nom: "Histoire-Géo", notes: [], order: 10 },
    { nom: "EMC", notes: [], order: 11 }
  ];
  
  const CDs = [
    { nom: "ARTS", coefficient: 4, matieres: ["Arts Plastiques", "Musique"] },
    { nom: "EPS", coefficient: 4, matieres: ["EPS"] },
    { nom: "FRANCAIS", coefficient: 5, matieres: ["Français"] },
    { nom: "HISTOIRE-GEO", coefficient: 4, matieres: ["Histoire-Géo", "EMC"] },
    { nom: "LANGUES VIVANTES", coefficient: 4, matieres: ["Langue 1", "Langue 2"] },
    { nom: "MATHEMATIQUES", coefficient: 5, matieres: ["Mathématiques"] },
    {
      nom: "SCIENCES-TECHNO-DP",
      coefficient: 4,
      matieres: ["Physique-Chimie", "SVT", "Technologie"],
    },
  ];

  export {
    listeMatieres,
    CDs,
  };
  