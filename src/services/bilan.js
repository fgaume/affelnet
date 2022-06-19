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
  { nom: "Mathématiques", coefficient: 50, matieres: ["Mathématiques"] },
  { nom: "Français", coefficient: 50, matieres: ["Français"] },
  { nom: "Histoire-Géo", coefficient: 40, matieres: ["Histoire-Géo"] },
  { nom: "Langues", coefficient: 40, matieres: ["Langue 1", "Langue 2"] },
  {
    nom: "Sciences",
    coefficient: 40,
    matieres: ["Physique-Chimie", "SVT", "Technologie"],
  },
  { nom: "Arts", coefficient: 40, matieres: ["Arts Plastiques", "Musique"] },
  { nom: "EPS", coefficient: 40, matieres: ["EPS"] },
];

const computeAverage = (values, semestres) => {
  let average = 0;
  let notes = [...values];
  if (semestres && notes.length === 3) notes.pop();
  if (notes && notes.length > 0) {
    notes.forEach((value) => {
      average += value;
    });
  }
  return notes.length > 0 ? average / notes.length : 0;
};

// matieres : nom, notes[]
const computeNoteCDs = (matieres, semestres) => {
  let scoresCDs = [];
  CDs.forEach((cd) => {
    let scoresMatieres = [];
    cd.matieres.forEach((cdmatiere) => {
      const foundMatiere = matieres.find(
        (matiere) => matiere.nom === cdmatiere
      );
      if (foundMatiere) {
        const notes = foundMatiere.notes;
        scoresMatieres.push(...notes);
      }
    });
    const scoreCD = computeAverage(scoresMatieres, semestres);
    scoresCDs.push({
      nom: cd.nom,
      score: scoreCD,
      coefficient: cd.coefficient,
    });
  });
  return scoresCDs;
};

const computeBilanPeriodique = (
  scoresCD,
  moyennesAcademiques,
  ecartsAcademiques
) => {
  let score = 0;
  scoresCD.forEach((cd) => {
    const cdscore =
      cd.coefficient *
      (10 +
        (cd.score - moyennesAcademiques.get(cd.nom)) /
          ecartsAcademiques.get(cd.nom));
    score += cdscore;
  });
  return parseFloat(score.toFixed(3));
};

/* const testcomputeNoteCDs = () => {
    const matieres = [
        { nom: 'Mathématiques', notes: [16, 16, 16]},
        { nom: 'Français', notes: [16, 16, 16]},
        { nom: 'Histoire-Géo', notes: [16, 16, 16]},
        { nom: 'Langue 1', notes: [16, 16, 16]},
        { nom: 'Langue 2', notes: [16, 16, 16]},
        { nom: 'Physique-Chimie', notes: [16, 16, 16]},
        { nom: 'SVT', notes: [16, 16, 16]},
        { nom: 'Technologie', notes: [16, 16, 16]},
        { nom: 'Arts Plastiques', notes: [16, 16, 16]},
        { nom: 'Musique', notes: [16, 16, 16]},
        { nom: 'EPS', notes: [16, 16, 16]}
    ];
    return computeNoteCDs(matieres);
} */

const updateMatieres = (existingMatieres, nom, periode, newNote) => {
  let updatedMatieres = existingMatieres.filter((m) => m.nom !== nom);
  let updatedMatiere = existingMatieres.find((m) => m.nom === nom);
  updatedMatiere.notes[periode] = newNote;
  updatedMatieres.push(updatedMatiere);
  updatedMatieres.sort((a, b) => (a.order > b.order ? 1 : -1));
  return updatedMatieres;
};

const allMatiereSetTo = (newNote, semestres) => {
  let updatedMatieres = [];
  listeMatieres.forEach((matiere) => {
    const notes = semestres ? [newNote, newNote] : [newNote, newNote, newNote];
    updatedMatieres.push({
      nom: matiere.nom,
      notes: notes,
      order: matiere.order,
    });
  });
  return updatedMatieres;
};

export {
  listeMatieres,
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
};
