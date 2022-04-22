import React from 'react';
import Form from 'react-bootstrap/Form';
import { useLocalStorage } from "../useLocalStorage";

const CompetenceSelector = (props) => {

    const [score, setScore] = useLocalStorage('competence/' + props.label, 0);

    const handleChange = (event) => {
        setScore(event.target.value);
        props.onChange(props.label, parseInt(event.target.value));
    }

    return (
        <Form.Select value={score} aria-label={props.label} onChange={handleChange}>
            <option value="0">Choisir ...</option>
            <option value="600">Très satisfaisant</option>
            <option value="480">Satisfaisant</option>
            <option value="300">Fragile</option>
            <option value="120">Insuffisant</option>
        </Form.Select>
    ) 
}
export default CompetenceSelector;