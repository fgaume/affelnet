import React from 'react';
import Form from 'react-bootstrap/Form';
import { useLocalStorage } from "../useLocalStorage";

const BonusSelector = (props) => {

    const [bonus, setBonus] = useLocalStorage('bonusIPS', 0);

    const handleChange = (event) => {
        setBonus(event.target.value);
        props.onChange(parseInt(event.target.value));
    }

    return (
        <Form.Select value={bonus} aria-label="bonusIPS" onChange={handleChange}>
            <option value="0">Choisir ...</option>
            <option value="0">0</option>
            <option value="600">600</option>
            <option value="1200">1200</option>
        </Form.Select>
    ) 
}
export default BonusSelector;