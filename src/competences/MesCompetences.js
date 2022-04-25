import React from 'react';
import { useRef } from 'react';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import Container from 'react-bootstrap/Container';
import {competences} from '../data/affelnet';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Competence from './Competence';

const MesCompetences = (props) => {
    
    let competenceRefs = useRef([]);
    
    const [score, setScore] = useLocalStorage("MesCompetences/ScoreCompetences", 0);

    const computeScore = (competence, newScore) => {
        let sum = 0;
        for (const acompetence of competences) {
            if (acompetence === competence) {
                sum += newScore;
            }
            else {
                const note = getStorageInt('competence/' + acompetence);
                if (note !== 0) {
                    sum += note;
                }
            }
        }
        return sum;
    }

    const handleChange = (competence, newScore) => {
        let newCompetencesScore = computeScore(competence, newScore);
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore);
    }

    const handleSetAllMin = (event) => {
        competenceRefs.current.forEach((ref, index) => {
            ref.setFromOutside(120);
        });
        const newCompetencesScore = 120*competences.length;
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore);
    }

    const handleSetAllMax = (event) => {
        competenceRefs.current.forEach((ref, index) => {
            ref.setFromOutside(600);
        });
        const newCompetencesScore = 600*competences.length;
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore);
    }

    return (
        <Container fluid>
            <Row>
                <Col className='d-flex justify-content-center text-success'>
                    <Button variant="outline-primary" onClick={handleSetAllMin}>Tout au minimum</Button>
                    &nbsp;
                    <Button variant="outline-primary" onClick={handleSetAllMax}>Tout au maximum</Button>
                </Col>
                <Col className='d-flex justify-content-center text-success'>
                </Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            {competences.map((value, index) => {
                return <Competence ref={(element) => {
                    competenceRefs.current[index] = element;
                  }} key={index} label={value} onChange={handleChange} />
            })}
        </Container>
    )

}
export default MesCompetences;