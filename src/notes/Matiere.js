import React from "react";
import { useRef, forwardRef, useImperativeHandle } from "react";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useLocalStorage } from "../useLocalStorage";
import NoteSelector from './NoteSelector';


const Matiere = (props, ref) => {

    const [moyenne, setMoyenne] = useLocalStorage('matiere/' + props.nom, 0);
    const [avancementMatiere, setAvancementMatiere] = useLocalStorage('matiere/avancement/' + props.nom, 0);

    let noteSelectorRefs = useRef([]);

    useImperativeHandle(ref, () => ({
        setNoteFromOutside(note) {
            for (let index = 1; index <= (props.semestres ? 2 : 3); index++) {
                noteSelectorRefs.current[index-1].setNoteFromOutside(note);
            }
            setMoyenne(note);
            setAvancementMatiere(props.semestres ? 2 : 3);
        },
        getMoyenne() {
            return moyenne;
        },
        getAvancementMatiere() {
            return avancementMatiere;
        }
    }), [moyenne, setMoyenne, avancementMatiere])

    const handleChange = (matiere, periode, newNote) => {
        console.log('matiere : ' + matiere, periode, newNote);
        let nbNotes = 0, sum = 0;
        for (let index = 1; index <= (props.semestres ? 2 : 3); index++) {
            let note = newNote;
            if (index !== periode) {
                //const note = getStorageInt('note/' + matiere + index);
                note = parseInt(noteSelectorRefs.current[index-1].getNote());
            }
            if (note !== 0) {
                sum += note;
                nbNotes++;
            }
        }
        let newMoyenne = (sum/nbNotes);
        setMoyenne(newMoyenne);
        setAvancementMatiere(nbNotes);
        props.onChange(props.nom, newMoyenne, nbNotes);
    }

    return (
        <Form.Group className="mb-3">
            <Row>
                <hr />
            </Row>
            <Row xs={2} md={4} lg={6}>
                <Col>
                {props.nom}
                </Col>
                <Col>
                    <Stack gap="2">
                        <NoteSelector
                            matiere={props.nom}
                            periode='1'
                            onChange={handleChange}
                            ref={(element) => {
                                noteSelectorRefs.current[0] = element;
                            }} />
                        <NoteSelector
                            matiere={props.nom}
                            periode='2'
                            onChange={handleChange}
                            ref={(element) => {
                                noteSelectorRefs.current[1] = element;
                            }} />
                        {
                            !props.semestres && (
                                <NoteSelector
                                matiere={props.nom}
                                periode='3'
                                onChange={handleChange}
                                ref={(element) => {
                                    noteSelectorRefs.current[2] = element;
                                }} />
                            )
                        }
                    </Stack>
                </Col>
            </Row>
        </Form.Group>
    )
}

export default forwardRef(Matiere);