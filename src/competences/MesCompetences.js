import React from 'react';
import { useRef } from 'react';
import { useLocalStorage } from "../useLocalStorage";
import Container from 'react-bootstrap/Container';
import {competences} from '../data/affelnet';
import { Button, ProgressBar } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Competence from './Competence';
import { ArrowDownCircle, ArrowUpCircle } from 'react-bootstrap-icons';

const MesCompetences = (props) => {
    
    let competenceRefs = useRef([]);
    
    const [score, setScore] = useLocalStorage("MesCompetences/ScoreCompetences", 0);
    const [avancementCompetences, setAvancementCompetences] = useLocalStorage("MesCompetences/avancementCompetences", 0);

    const computeScore = (competence, newScore) => {
        let sum = 0;
        competences.forEach((acompetence, index) => {
            let theScore = parseInt(newScore);
            if (acompetence !== competence) {
                theScore = parseInt(competenceRefs.current[index].getScore());
            }
            sum += theScore;
        })
        return sum;
    }

    const computeAvancement = (competence, newScore) => {
        let avc = 0;
        competences.forEach((acompetence, index) => {
            let theScore = parseInt(newScore);
            if (acompetence !== competence) {
                theScore = parseInt(competenceRefs.current[index].getScore());
            }
            if (theScore > 0) avc++;
        })
        return parseInt(100 * avc / competenceRefs.current.length);
    }

    const handleChange = (competence, newScore) => {
        const newCompetencesScore = computeScore(competence, newScore);
        const avc = computeAvancement(competence, newScore);
        setAvancementCompetences(avc);
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore, avc);
    }

    const handleSetAllMin = (event) => {
        propagateValue(120);
    }

    const handleSetAllMax = (event) => {
        propagateValue(600);
    }

    const propagateValue = (value) => {
        competenceRefs.current.forEach((competence) => {
            competence.setScoreFromOutside(value);
        });
        const newCompetencesScore = value*competences.length;
        setAvancementCompetences(100);
        setScore(newCompetencesScore);
        props.onChange(newCompetencesScore, 100);
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <ProgressBar min='0' max='100' variant='success' now={avancementCompetences} />
                </Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>Estimez ici vos appréciations de compétences :</Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-center text-success'>
                    <Button size='sm' variant="outline-primary" onClick={handleSetAllMin}>
                        <ArrowDownCircle height='20' width='20' />&nbsp;Tout au minimum
                    </Button>
                </Col>
                <Col>
                    <Button size='sm' variant="outline-primary" onClick={handleSetAllMax}>
                        <ArrowUpCircle height='20' width='20' />&nbsp;Tout au maximum
                    </Button>
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