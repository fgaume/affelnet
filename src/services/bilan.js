import { CDs, listeMatieres } from "../data/bilan";

const computeAverage = (values, semestres) => {
  let average = 0;
  //let notes = [...values];
  let notes = values.filter((value) => value !== 0);
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
      if (foundMatiere && foundMatiere.notes) {
        const notes = foundMatiere.notes;
        //console.log("notes = ", notes);
        const filteredNotes = notes.filter((note) => note !== 0);
        //console.log("filteredNotes = ", filteredNotes);
        const moyenneMatiere = computeAverage(filteredNotes, semestres);
        scoresMatieres.push(parseFloat(moyenneMatiere.toFixed(2)));
      }
    });
    const scoreCD = computeAverage(scoresMatieres, false);
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
        if (semestres && notZeroNotes.length > 2) {
          notZeroNotes.pop();
        }
        avancementCD += notZeroNotes.length;
      }
    });
    avancement += avancementCD;
  });
  const nbExpectedNotes = listeMatieres.length * (semestres ? 2 : 3);
  //et nbExpectedNotes = semestres ? 22 : 33;
  // console.log("avancement semestres : ", avancement, "/", nbExpectedNotes);
  return Math.round((100 * avancement) / nbExpectedNotes);
};

const computeBilanPeriodique = (
  scoresCD,
  statsAcademiques
  //  statsRecentes
) => {
  if (!statsAcademiques) return 0;
  //console.log("computeBilanPeriodique.scoresCD : ", scoresCD);
  //console.log("computeBilanPeriodique.statsAcademiques : ", statsAcademiques);
  let score = 0;
  scoresCD.forEach((cd) => {
    //console.log("score " + cd.nom + " : " + cd.score);
    const base = cd.score ? cd.score.toFixed(2) : 16;
    const cdStats = statsAcademiques.get(cd.nom);
    //const recentStats = statsRecentes?.get(cd.nom);
    //const cdStats = recentStats ? recentStats  : histoStats;
    //console.log("cdStats: ", cdStats)
    const cdscore =
      cd.score === 0
        ? 100
        : 10 * (10 + (base - cdStats.moyenne) / cdStats.ecart_type);
    //console.log("score " + cd.nom + " : " + cd.score + " -> " + cdscore.toFixed(3));
    score += cd.coefficient * cdscore.toFixed(3);
  });
  const result = parseFloat(score.toFixed(3));
  //console.log("bilan : " + result);
  return result;
};

const computeBilanPeriodiqueWithNotes = (scoresCD, baremesMap) => {
  if (!baremesMap) return 0;
  let score = 0;
  scoresCD.forEach((cd) => {
    let harmonizedScore = 100;
    if (cd.score) {
      const base = parseFloat(cd.score);
      const existingNotes = baremesMap.get(cd.nom);
      //if (cd.nom === "ARTS") console.log("notes connues : ", existingNotes)
      harmonizedScore = calculerNoteHarmonisee(base, existingNotes);
    }
    //console.log("score " + cd.nom + " : " + cd.score + " -> " + harmonizedScore);
    score += cd.coefficient * harmonizedScore;
  });
  const result = parseFloat(score.toFixed(3));
  //console.log("bilan : " + result);
  return result;
};

/* const mergeMoyennes = (currentMap, listeRecentStats) => {
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
} */

const mergeStats = (currentMap, listeRecentStats) => {
  let mergeStats = new Map();
  listeRecentStats.forEach((stat) => {
    const champ = stat.id;
    const moyenne = stat.moyenne ? stat.moyenne : currentMap.get(champ);
    const ecart_type = stat.ecart_type
      ? stat.ecart_type
      : currentMap.get(champ);
    mergeStats.set(champ, { moyenne: moyenne, ecart_type: ecart_type });
  });
  return mergeStats;
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

/**
 * Calcule une note harmonisée à partir d'une note brute, en utilisant une liste de points connus.
 * La fonction gère trois cas :
 * 1. La note brute est une correspondance exacte dans les points connus.
 * 2. La note brute est dans l'intervalle des points connus (interpolation linéaire).
 * 3. La note brute est en dehors de l'intervalle des points connus (extrapolation linéaire).
 *
 * @param {number} noteBrute La note brute à convertir.
 * @param {Map<number, number>} pointsConnus Une Map où les clés sont les notes brutes et les valeurs sont les notes harmonisées correspondantes.
 * @returns {number|null} La note harmonisée calculée, ou null si le calcul est impossible (moins de 2 points connus).
 */
function calculerNoteHarmonisee(noteBrute, pointsConnus) {
  // --- Cas 1: Correspondance exacte ---
  // Si la note brute existe déjà dans notre Map, on retourne directement la note harmonisée associée.
  //console.log("note brute = ", noteBrute);
  const noteBruteArrondie = Math.round(noteBrute * 100) / 100;
  if (pointsConnus.has(noteBruteArrondie)) {
    //console.log("note brute trouvee : ", noteBrute)
    //console.log("note harno trouvee : ", pointsConnus.get(noteBrute))
    return pointsConnus.get(noteBruteArrondie);
  }
  //else {
  // console.log("note non trouvee : ", noteBruteArrondie);
  //}

  // On récupère les notes brutes connues et on les trie par ordre croissant.
  // C'est indispensable pour trouver les points qui encadrent notre note.
  const notesBrutesTriees = [...pointsConnus.keys()].sort((a, b) => a - b);

  // Pour une interpolation/extrapolation, il nous faut au moins 2 points de référence.
  if (notesBrutesTriees.length < 2) {
    console.error(
      "Le calcul est impossible : au moins deux points de référence sont nécessaires."
    );
    return null;
  }

  let x1, y1, x2, y2;

  // --- Cas 3: Extrapolation (note brute inférieure au minimum connu) ---
  if (noteBruteArrondie < notesBrutesTriees[0]) {
    // On prend les deux premiers points de la liste pour définir la droite.
    x1 = notesBrutesTriees[0];
    x2 = notesBrutesTriees[1];
  }
  // --- Cas 3: Extrapolation (note brute supérieure au maximum connu) ---
  else if (
    noteBruteArrondie > notesBrutesTriees[notesBrutesTriees.length - 1]
  ) {
    // On prend les deux derniers points de la liste pour définir la droite.
    x1 = notesBrutesTriees[notesBrutesTriees.length - 2];
    x2 = notesBrutesTriees[notesBrutesTriees.length - 1];
  }
  // --- Cas 2: Interpolation (note brute entre deux points connus) ---
  else {
    // On cherche le premier point de la liste qui est juste supérieur à notre note brute.
    const indexPointSuperieur = notesBrutesTriees.findIndex(
      (n) => n > noteBruteArrondie
    );
    // Le point inférieur est celui qui le précède dans la liste triée.
    x1 = notesBrutesTriees[indexPointSuperieur - 1];
    x2 = notesBrutesTriees[indexPointSuperieur];
  }

  // On récupère les notes harmonisées correspondantes à nos points x1 et x2.
  y1 = pointsConnus.get(x1);
  y2 = pointsConnus.get(x2);

  // Formule de l'interpolation (et extrapolation) linéaire
  // y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
  const noteHarmoniseeCalculee =
    y1 + ((noteBruteArrondie - x1) * (y2 - y1)) / (x2 - x1);

  return noteHarmoniseeCalculee.toFixed(3);
}

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
  mergeStats,
  calculerNoteHarmonisee,
  computeBilanPeriodiqueWithNotes,
};
