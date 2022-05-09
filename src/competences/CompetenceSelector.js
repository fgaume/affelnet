import React from 'react';
import { forwardRef, useImperativeHandle } from "react";
import Form from 'react-bootstrap/Form';
import { useLocalStorage } from "../useLocalStorage";

const CompetenceSelector = (props, ref) => {

    const [score, setScore] = useLocalStorage('competence/' + props.label, 0);

    useImperativeHandle(ref, () => ({
        setScoreFromOutside (value) {
            setScore(parseInt(value));
        },
        getScore() {
            return parseInt(score);
        }
    }), [score, setScore])

    const handleChange = (event) => {
        setScore(event.target.value);
        props.onChange(props.label, event.target.value);
    }

    return (
        <Form.Select value={score} aria-label={props.label} onChange={handleChange}>
            <option value="0">Maitrise ...</option>
            <option value="600">Très bonne</option>
            <option value="480">Satisfaisante</option>
            <option value="300">Fragile</option>
            <option value="120">Insuffisante</option>
        </Form.Select>
    ) 
}
export default forwardRef(CompetenceSelector);