import Container from 'react-bootstrap/Container';
import Competence from './Competence';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";

const MesCompetences = (props) => {

    const competences = ['Langue française', 'Scientifique', 'Langues étrangères', 'Activités humaines',
        'Syst. naturels/techniques', 'Méthodes/outils', 'Citoyen', 'Langage des arts et du corps'];

    const [score, setScore] = useLocalStorage("Score compétences", 0);

    const computeScore = (competence, newScore) => {
        let sum = 0;
        for (const acompetence of competences) {
            if (acompetence === competence) {
                sum += newScore;
            }
            else {
                const note = getStorageInt(acompetence);
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
        <Container>
            {competences.map((value, index) => {
                return <Competence key={index} label={value} onChange={handleChange} />
            })}
        </Container>
    )

}
export default MesCompetences;