import { CDs, listeMatieres } from "../data/bilan";

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
        //console.log("notes = ", notes);
        const filteredNotes = notes.filter((note) => note !== 0);
        //console.log("filteredNotes = ", filteredNotes);
        scoresMatieres.push(...filteredNotes);
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
  //console.log("computeBilanPeriodique : ");
  if (!moyennesAcademiques) return 0;
  let score = 0;
  scoresCD.forEach((cd) => {
    //console.log("score " + cd.nom + " : " + cd.score);
    const base = (cd.score) ? cd.score.toFixed(2) : 16;
    const cdscore =
      cd.score === 0
        ? 100
        : 10 *
          (10 +
            (base - moyennesAcademiques.get(cd.nom)) /
              ecartsAcademiques.get(cd.nom));
    //console.log("score " + cd.nom + " : " + cd.score + " -> " + cdscore.toFixed(3));
    score += cd.coefficient * cdscore.toFixed(3);
  });
  const result = parseFloat(score.toFixed(3));
  //console.log("bilan : " + result);
  return result;
};

const mergeMoyennes = (currentMap, listeRecentStats) => {
  let mergedMoyennes = new Map();
  listeRecentStats.forEach((stat) => {
    const champ = stat.id;
    const moyenne = stat.moyenne ? stat.moyenne : currentMap.get(champ);
    mergedMoyennes.set(champ, moyenne);
  });
  return mergedMoyennes;
}

const mergeEcartsTypes = (currentMap, listeRecentStats) => {
  let mergedEcarts = new Map();
  listeRecentStats.forEach((stat) => {
    const champ = stat.id;
    const ecart = stat.ecartType ? stat.ecartType : currentMap.get(champ);
    mergedEcarts.set(champ, ecart);
  });
  return mergedEcarts;
}

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
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
  computeAvancementNotes,
  mergeEcartsTypes,
  mergeMoyennes
};
