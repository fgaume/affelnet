import { forwardRef, useImperativeHandle, useRef } from "react";
import Container from 'react-bootstrap/Container';

import { useLocalStorage } from "../useLocalStorage";
import Matiere from "./Matiere";

const ChampDisciplinaire = (props, ref) => {

    const [moyenne, setMoyenne] = useLocalStorage('CD/' + props.nom, 0);
    const [avancementChamp, setAvancementChamp] = useLocalStorage('CD/avancement/' + props.nom, 0);

    let matiereRefs = useRef([]);

    useImperativeHandle(ref, () => ({
        setNoteFromOutside(note) {
            matiereRefs.current.forEach((ref, index) => {
                ref.setNoteFromOutside(note);
            });
            setMoyenne(note);
            setAvancementChamp(props.matieres.length * (props.semestres ? 2 : 3));
        },
        getMoyenne() {
            return moyenne;
        },
        getAvancementChamp() {
            return avancementChamp;
        }
    }), [moyenne, setMoyenne, avancementChamp])

    const handleChange = (matiere, newMoyenneMatiere, newNbNotesMatiere) => {
        //console.log('cd matiere updated : ' + matiere, newMoyenneMatiere);
        let nbNotes = 0, sum = 0, newAvancementChamp = 0;
        for (let index = 0; index < props.matieres.length; index++) {
            let amatiere = props.matieres[index];
            let moyenneMatiere = newMoyenneMatiere;
            let avancementMatiere = newNbNotesMatiere;
            if (amatiere !== matiere) {
                moyenneMatiere = parseInt(matiereRefs.current[index].getMoyenne());
                avancementMatiere = parseInt(matiereRefs.current[index].getAvancementMatiere());
            }
            if (moyenneMatiere !== 0) {
                nbNotes++;
                sum += moyenneMatiere;
                newAvancementChamp += avancementMatiere;
            }
        }
        let newMoyenne = (sum/nbNotes);
        setMoyenne(newMoyenne);
        setAvancementChamp(newAvancementChamp);
        props.onChange(props.nom, newMoyenne, newAvancementChamp);
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