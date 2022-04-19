import React from "react";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoteSelector from './NoteSelector';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";

const Matiere = (props) => {

    const [moyenne, setMoyenne] = useLocalStorage(props.nom, 0);

    const handleChange = (matiere, periode, value) => {
        console.log('matiere : ' + matiere, periode, value);
        let nbNotes = 0, sum = 0;
        for (let index = 1; index <= 3; index++) {
            if (index === periode) {
                sum += value;
                nbNotes++;
            }
            else {
                const note = getStorageInt(matiere + index);
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
                        <NoteSelector matiere={props.nom} periode='1' onChange={handleChange} />
                        <NoteSelector matiere={props.nom} periode='2' onChange={handleChange} />
                        {
                            !props.semestres && (
                            <NoteSelector matiere={props.nom} periode='3' onChange={handleChange} />
                            )
                        }
                    </Stack>
                </Col>
            </Row>
        </Form.Group>
    )
}

export default Matiere;