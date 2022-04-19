import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useLocalStorage } from "../useLocalStorage";
import BonusSelector from "./BonusSelector";


const CollegeInfos = (props) => {

    const [bonusIPS, setBonusIPS] = useLocalStorage('bonus', 0);

    const handleChange = (bonus) => {
        setBonusIPS(parseInt(bonus));
        props.onChange(parseInt(bonus));
    }
    
    return (
        <Container>
        <Form.Group className="mb-3">
            <Row xs={2} md={4} lg={6} className="align-items-center">
                <Col>
                    <Form.Label>Bonus IPS</Form.Label>
                </Col>
                <Col>
                    <BonusSelector label="Bonus IPS" onChange={handleChange}/>
                </Col>
            </Row>
        </Form.Group>
        </Container>

    )
}
export default CollegeInfos;
