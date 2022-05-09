import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import Form from 'react-bootstrap/Form';
import { useLocalStorage } from "../useLocalStorage";

const NoteSelector = (props, ref) => {

    const [note, setNote] = useLocalStorage('note/' + props.matiere + props.periode, 0);

    useImperativeHandle(ref, () => ({
        setNoteFromOutside (note) {
            setNote(parseInt(note));
        },
        getNote() {
            return parseInt(note);
        }
    }), [note, setNote])

    const handleChange = (event) => {
        setNote(parseInt(event.target.value));
        props.onChange(props.matiere, parseInt(props.periode), parseInt(event.target.value));
    }

    return (
        <Form.Select size="sm" value={note} aria-label={props.matiere} onChange={handleChange}>
            <option value="0">Moyenne ...</option>
            <option value="16">15 ou +</option>
            <option value="13">Entre 10 et 14,99</option>
            <option value="8">Entre 5 et 9,99</option>
            <option value="3">Moins de 5</option>
        </Form.Select>
    ) 
}

export default forwardRef(NoteSelector);