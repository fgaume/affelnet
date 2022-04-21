import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import ChampDisciplinaire from './ChampDisciplinaire';
import { moyennesAcademiques, ecartsAcademiques } from '../data/stats';
import {champsDisciplinaires, coefficients} from '../data/affelnet';

const MesNotes = (props) => {

    const [score, setScore] = useLocalStorage("score notes", 0);
    const [semestres, setSemestres] = useLocalStorage("semestres", false);

    const moyennes = moyennesAcademiques.get('2021');
    const ecarts = ecartsAcademiques.get('2021');

    const moyenneToScore = (champ, moyenne) => {
        return coefficients.get(champ) *
            (10 + (moyenne - moyennes.get(champ)) / ecarts.get(champ));
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