import Container from 'react-bootstrap/Container';
import Matiere from "./Matiere";
import { useLocalStorage, getStorageInt } from "../useLocalStorage";

const ChampDisciplinaire = (props) => {

    const [moyenne, setMoyenne] = useLocalStorage('CD-' + props.nom, 0);

    const handleChange = (matiere, value) => {
        console.log('cd matiere updated : ' + matiere, value);
        let nbNotes = 0, sum = 0;
        for (const amatiere of props.matieres) {
            if (amatiere === matiere) {
                sum += value;
                nbNotes++;
            }
            else {
                const note = getStorageInt(amatiere);
                if (note !== 0) {
                    sum += note;
                    nbNotes++;
                }
            }
        }
        let newMoyenne = (sum/nbNotes);
        setMoyenne(newMoyenne);
        props.onChange(props.nom, newMoyenne);
    }

    return (
        <Container fluid>
            {props.matieres.map((value, index) => {
                return <Matiere key={index} nom={value} semestres={props.semestres} onChange={handleChange} />
            })}
        </Container>
    )
}

export default ChampDisciplinaire;