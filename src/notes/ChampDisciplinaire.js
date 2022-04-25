import Container from 'react-bootstrap/Container';
import Matiere from "./Matiere";
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ChampDisciplinaire = (props, ref) => {

    const [moyenne, setMoyenne] = useLocalStorage('CD/' + props.nom, 0);

    let matiereRefs = useRef([]);

    useImperativeHandle(ref, () => ({
        setFromOutside (value) {
            matiereRefs.current.forEach((ref, index) => {
                ref.setFromOutside(value);
            });
            setMoyenne(value);
        }
      }), [setMoyenne])

      const handleChange = (matiere, value) => {
        console.log('cd matiere updated : ' + matiere, value);
        let nbNotes = 0, sum = 0;
        for (const amatiere of props.matieres) {
            if (amatiere === matiere) {
                sum += value;
                nbNotes++;
            }
            else {
                const note = getStorageInt('matiere/' + amatiere);
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
                return <Matiere
                    key={index}
                    nom={value}
                    semestres={props.semestres}
                    onChange={handleChange}
                    ref={(element) => {
                        matiereRefs.current[index] = element;
                    }} />
            })}
        </Container>
    )
}

export default forwardRef(ChampDisciplinaire);