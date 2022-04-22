const competences = ['Langue française', 'Scientifique', 'Langues étrangères', 'Activités humaines',
'Syst. naturels/techniques', 'Méthodes/outils', 'Citoyen', 'Langage des arts et du corps'];

const champsDisciplinaires = ['Mathématiques', 'Français', 'Histoire-Géo', 'Langues', 'Sciences', 'Arts', 'EPS'];

const coefficients = new Map([
    ['Mathématiques', 50],
    ['Français', 50],
    ['Histoire-Géo', 40],
    ['Langues', 40],
    ['Sciences', 40],
    ['Arts', 40],
    ['EPS', 40]
]);

const bonusSecteur = new Map([
    ['1', 32640],
    ['2', 17760],
    ['3', 16800]
]);

export {bonusSecteur, competences, champsDisciplinaires, coefficients}