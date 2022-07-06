let listeCompetences = [
  { nom: "Langue française", score: 0, order: 0 },
  { nom: "Scientifique", score: 0, order: 1 },
  { nom: "Langues étrangères", score: 0, order: 2 },
  { nom: "Activités humaines", score: 0, order: 3 },
  { nom: "Syst. naturels/techniques", score: 0, order: 4 },
  { nom: "Méthodes/outils", score: 0, order: 5 },
  { nom: "Citoyen", score: 0, order: 6 },
  { nom: "Langage des arts et du corps", score: 0, order: 7 },
];

// competences : nom, score
const computeSocleCompetences = (competences) => {
  let scoreSocle = 0;
  competences.forEach((competence) => {
    scoreSocle += competence.score;
  });
  return scoreSocle;
};

const updateCompetences = (existingCompetences, nom, score) => {
  let updatedCompetences = existingCompetences.filter((c) => c.nom !== nom);
  let updatedCompetence = existingCompetences.find((c) => c.nom === nom);
  updatedCompetence.score = score;
  updatedCompetences.push(updatedCompetence);
  updatedCompetences.sort((a, b) => (a.order > b.order ? 1 : -1));
  return updatedCompetences;
};

const allCompetencesSetTo = (score) => {
  let updatedCompetences = [];
  listeCompetences.forEach((competence) => {
    updatedCompetences.push({
      nom: competence.nom,
      score: score,
      order: competence.order,
    });
  });
  return updatedCompetences;
};

// migration from <v7
const possibleSemestres = localStorage.getItem("semestres");
if (possibleSemestres !== null) {
  listeCompetences.forEach((competence, index) => {
      const possibleNote = localStorage.getItem("competence/" + competence.nom);
      const score = JSON.parse(possibleNote);
      if (score) {
        listeCompetences[index] = {
        nom: competence.nom,
        score: score,
        order: competence.order,
        }
    }
  });  
}


export {
  listeCompetences,
  computeSocleCompetences,
  updateCompetences,
  allCompetencesSetTo
};
