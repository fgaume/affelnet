const specialitesMap = new Map([
    ['PC', 'PHYSIQUE-CHIMIE'],
    ['HG-GSP', 'HISTOIRE-GEOGRAPHIE, GEOPOLITIQUE ET SCIENCES POLITIQUES'],
    ['SES', 'SCIENCES ECONOMIQUES ET SOCIALES'],
    ['HLP', 'HUMANITES, LITTERATURE ET PHILOSOPHIE'],
    ['NSI', 'NUMERIQUE ET SCIENCES INFORMATIQUES'],
    ['LLCE', 'LLCE (hors AMC)'],
    ['ARTS', 'ARTS'],
    ['LLCE-AMC', 'LLCE - Anglais Monde Contemporain (AMC)'],
    ['SI', 'SCIENCES DE L INGENIEUR'],
    ['LLCA', 'LITTERATURE LANGUES ET CULTURES DE L ANTIQUITE'],
    ['EPS', 'EDUCATION PHYSIQUE, PRATIQUES ET CULTURE SPORTIVE']
]);

const specialitesInverseMap = new Map();

specialitesMap.forEach(function(value, key) {
	specialitesInverseMap.set(value, key);
})

export {specialitesMap, specialitesInverseMap};