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
  { nom: "Mathématiques", coefficient: 5, matieres: ["Mathématiques"] },
  { nom: "Français", coefficient: 5, matieres: ["Français"] },
  { nom: "Histoire-Géo", coefficient: 4, matieres: ["Histoire-Géo"] },
  { nom: "Langues", coefficient: 4, matieres: ["Langue 1", "Langue 2"] },
  {
    nom: "Sciences",
    coefficient: 4,
    matieres: ["Physique-Chimie", "SVT", "Technologie"],
  },
  { nom: "Arts", coefficient: 4, matieres: ["Arts Plastiques", "Musique"] },
  { nom: "EPS", coefficient: 4, matieres: ["EPS"] },
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
      score: scoreCD.toFixed(2),
      coefficient: cd.coefficient,
    });
  });
  return scoresCDs;
};

// matieres : nom, notes[]
const computeAvancementNotes = (matieres, semestres) => {
  let avancement = 0;
  CDs.forEach((cd) => {
    let avancementCD = 0;
    cd.matieres.forEach((cdmatiere) => {
      const foundMatiere = matieres.find(
        (matiere) => matiere.nom === cdmatiere
      );
      if (foundMatiere) {
        const notes = foundMatiere.notes;
        const notZeroNotes = notes.filter((value) => value > 0);
        avancementCD += notZeroNotes.length;
      }
    });
    avancement += avancementCD;
  });
  let nbExpectedNotes = semestres ? 22 : 33;
  return Math.round((100 * avancement) / nbExpectedNotes);
};

const computeBilanPeriodique = (
  scoresCD,
  moyennesAcademiques,
  ecartsAcademiques
) => {
  if (!moyennesAcademiques) return 0;
  let score = 0;
  scoresCD.forEach((cd) => {
    const cdscore =
      10 *
      (10 +
        (cd.score - moyennesAcademiques.get(cd.nom)) /
          ecartsAcademiques.get(cd.nom));
    score += cd.coefficient * cdscore.toFixed(3);
  });
  const result = parseFloat(score);
  //console.log("bilan : " + result);
  return result;
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

// migration from <v7
const possibleSemestres = localStorage.getItem("semestres");
if (possibleSemestres !== null) {
  const semestres = JSON.parse(possibleSemestres);
  const nbNotes = semestres === true ? [1, 2] : [1, 2, 3];
  listeMatieres.forEach((matiere, index) => {
    let migratedNotes = [];
    nbNotes.forEach((trimestre) => {
      const possibleNote = localStorage.getItem(
        "note/" + matiere.nom + trimestre
      );
      const note = JSON.parse(possibleNote);
      if (note) migratedNotes.push(note);
    });
    if (migratedNotes.length > 0) {
      listeMatieres[index] = {
        nom: matiere.nom,
        notes: migratedNotes,
        order: matiere.order,
      };
    }
  });
}

export {
  listeMatieres,
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
  computeAvancementNotes,
  CDs
};
