const listeMatieres = [
    { nom: "Mathématiques", notes: [], order: 0 },
    { nom: "Français", notes: [], order: 1 },
    { nom: "Histoire-Géo", notes: [], order: 2 },
    { nom: "Langue 1", notes: [], order: 3 },
    { nom: "Langue 2", notes: [], order: 4 },
    { nom: "Physique-Chimie", notes: [], order: 5 },
    { nom: "SVT", notes: [], order: 6 },
    { nom: "Technologie", notes: [], order: 7 },
    { nom: "Arts Plastiques", notes: [], order: 8 },
    { nom: "Musique", notes: [], order: 9 },
    { nom: "EPS", notes: [], order: 10 },
  ];
  
  const CDs = [
    { nom: "MATHEMATIQUES", coefficient: 5, matieres: ["Mathématiques"] },
    { nom: "FRANCAIS", coefficient: 5, matieres: ["Français"] },
    { nom: "HISTOIRE-GEO", coefficient: 4, matieres: ["Histoire-Géo"] },
    { nom: "LANGUES VIVANTES", coefficient: 4, matieres: ["Langue 1", "Langue 2"] },
    {
      nom: "SCIENCES-TECHNO-DP",
      coefficient: 4,
      matieres: ["Physique-Chimie", "SVT", "Technologie"],
    },
    { nom: "ARTS", coefficient: 4, matieres: ["Arts Plastiques", "Musique"] },
    { nom: "EPS", coefficient: 4, matieres: ["EPS"] },
  ];

  export {
    listeMatieres,
    CDs,
  };
  