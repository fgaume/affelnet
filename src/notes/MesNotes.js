import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import ChampDisciplinaire from './ChampDisciplinaire';

const MesNotes = (props) => {

    const champsDisciplinaires = ['Mathématiques', 'Français', 'Histoire-Géo', 'Langues', 'Sciences', 'Arts', 'EPS'];
    const moyennesAcademiques = new Map([
        ['Mathématiques', 11.98500901],
        ['Français', 12.44711943],
        ['Histoire-Géo', 12.66793072],
        ['Langues', 13.15870891],
        ['Sciences', 13.02771284],
        ['Arts', 14.51340559],
        ['EPS', 14.63623002]
    ]);
    const ecartsAcademiques = new Map([
        ['Mathématiques', 3.825987219],
        ['Français', 3.153910849],
        ['Histoire-Géo', 3.074715589],
        ['Langues', 2.974862413],
        ['Sciences', 2.669319406],
        ['Arts', 1.901502187],
        ['EPS', 1.83722212]
    ]);
    const coefficient = new Map([
        ['Mathématiques', 50],
        ['Français', 50],
        ['Histoire-Géo', 40],
        ['Langues', 40],
        ['Sciences', 40],
        ['Arts', 40],
        ['EPS', 40]
    ]);

    const [score, setScore] = useLocalStorage("score notes", 0);
    const [semestres, setSemestres] = useLocalStorage("semestres", false);

    const moyenneToScore = (champ, moyenne) => {
        return coefficient.get(champ) *
            (10 + (moyenne - moyennesAcademiques.get(champ)) / ecartsAcademiques.get(champ));
    }

    const computeScore = (champ, newMoyenne) => {
        let sum = 0;
        for (const achamp of champsDisciplinaires) {
            if (achamp === champ) {
                sum += moyenneToScore(achamp, newMoyenne);
            }
            else {
                const note = getStorageInt('CD-' + achamp);
                if (note !== 0) {
                    sum += moyenneToScore(achamp, note);
                }
            }
        }
        return sum;
    }

    const handleChange = (champ, newScore) => {
        console.log('Mes notes updated : ' + champ, newScore);
        let newScoreNotes = computeScore(champ, newScore);
        setScore(newScoreNotes);
        props.onChange(newScoreNotes);
    }

    const handleChangeCheck = (event) => {
        setSemestres(event.target.checked);
    }

    return (
        <Container>
            <Form.Group className="mb-3" >
                        <Form.Switch id='semestres' label='semestres' defaultChecked={semestres} onChange={handleChangeCheck} />
            </Form.Group>
            <div>Saisissez vos moyennes scolaires :</div>
            <div>&nbsp;</div>
            <ChampDisciplinaire nom="Mathématiques" matieres={['Mathématiques']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="Français" matieres={['Français']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="Histoire-Géo" matieres={['Histoire-Géo']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="Langues" matieres={['Langue 1', 'Langue 2']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="Sciences" matieres={['Physique-Chimie', 'SVT', 'Technologie']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="Arts" matieres={['Arts Plastiques', 'Musique']}
                semestres={semestres} onChange={handleChange} />
            <ChampDisciplinaire nom="EPS" matieres={['EPS']}
                semestres={semestres} onChange={handleChange} />
        </Container>
    )
}

export default MesNotes;