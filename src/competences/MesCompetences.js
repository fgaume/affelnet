import Container from 'react-bootstrap/Container';
import Competence from './Competence';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import {competences} from '../data/affelnet';

const MesCompetences = (props) => {

    const [score, setScore] = useLocalStorage("MesCompetences/ScoreCompetences", 0);

    const computeScore = (competence, newScore) => {
        let sum = 0;
        for (const acompetence of competences) {
            if (acompetence === competence) {
                sum += newScore;
            }
            else {
                const note = getStorageInt('competence/' + acompetence);
                if (note !== 0) {
                    sum += note;
                }
            }
        }
        return sum;
    }

    const handleChange = (competence, newScore) => {
        let newCompetencesScore = computeScore(competence, newScore);
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore);
    }

    return (
        <Container fluid>
            {competences.map((value, index) => {
                return <Competence key={index} label={value} onChange={handleChange} />
            })}
        </Container>
    )

}
export default MesCompetences;