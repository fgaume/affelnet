import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useLocalStorage, getStorageInt } from "../useLocalStorage";
import ChampDisciplinaire from './ChampDisciplinaire';
import { moyennesAcademiques, ecartsAcademiques } from '../data/stats';
import {champsDisciplinaires, coefficients} from '../data/affelnet';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useRef } from 'react';

const MesNotes = (props) => {

    let champRefs = useRef([]);

    const [score, setScore] = useLocalStorage("score notes", 0);
    const [semestres, setSemestres] = useLocalStorage("semestres", false);

    const moyennes = moyennesAcademiques.get('2021');
    const ecarts = ecartsAcademiques.get('2021');

    const moyenneToScore = (champ, moyenne) => {
        return coefficients.get(champ) *
            (10 + (moyenne - moyennes.get(champ)) / ecarts.get(champ));
    }

    const computeScore = (champ, newMoyenne) => {
        let sum = 0;
        for (const achamp of champsDisciplinaires) {
            if (achamp === champ) {
                sum += moyenneToScore(achamp, newMoyenne);
            }
            else {
                const note = getStorageInt('CD/' + achamp);
                if (note !== 0) {
                    sum += moyenneToScore(achamp, note);
                }
            }
        }
        return sum;
    }

    const computeScoreMinMax = (newMoyenne) => {
        let sum = 0;
        for (const achamp of champsDisciplinaires) {
            sum += moyenneToScore(achamp, newMoyenne);
        }
        return sum;
    }

    const handleChange = (champ, newScore) => {
        //console.log('Mes notes updated : ' + champ, newScore);
        let newScoreNotes = computeScore(champ, newScore);
        setScore(newScoreNotes);
        props.onChange(newScoreNotes);
    }

    const handleChangeCheck = (event) => {
        setSemestres(event.target.checked);
    }

    const handleSetAllMin = (event) => {
        const noteMin = 3;
        champRefs.current.forEach((ref, index) => {
            ref.setFromOutside(noteMin);
        });
        let newScoreNotes = computeScoreMinMax(noteMin);
        setScore(newScoreNotes);
        props.onChange(newScoreNotes);
    }

    const handleSetAllMax = (event) => {
        const noteMax = 16;
        champRefs.current.forEach((ref, index) => {
            ref.setFromOutside(noteMax);
        });
        let newScoreNotes = computeScoreMinMax(noteMax);
        setScore(newScoreNotes);
        props.onChange(newScoreNotes);
    }

    return (
        <Container>
            <Form.Group className="mb-3" >
                <Form.Switch id='semestres' label='semestres' defaultChecked={semestres} onChange={handleChangeCheck} />
            </Form.Group>
            <div>Saisissez vos moyennes scolaires :</div>
            <div>&nbsp;</div>
            <Row>
                <Col className='d-flex justify-content-center text-success'>
                    <Button variant="outline-primary" onClick={handleSetAllMin}>Tout au minimum</Button>
                    &nbsp;
                    <Button variant="outline-primary" onClick={handleSetAllMax}>Tout au maximum</Button>
                </Col>
                <Col className='d-flex justify-content-center text-success'>
                </Col>
            </Row>
            <div>&nbsp;</div>
            <ChampDisciplinaire nom="Mathématiques" matieres={['Mathématiques']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[0] = element;
                  }} />
            <ChampDisciplinaire nom="Français" matieres={['Français']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[1] = element;
                  }} />
            <ChampDisciplinaire nom="Histoire-Géo" matieres={['Histoire-Géo']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[2] = element;
                  }} />
            <ChampDisciplinaire nom="Langues" matieres={['Langue 1', 'Langue 2']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[3] = element;
                  }} />
            <ChampDisciplinaire nom="Sciences" matieres={['Physique-Chimie', 'SVT', 'Technologie']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[4] = element;
                  }} />
            <ChampDisciplinaire nom="Arts" matieres={['Arts Plastiques', 'Musique']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[5] = element;
                  }} />
            <ChampDisciplinaire nom="EPS" matieres={['EPS']}
                semestres={semestres} onChange={handleChange} ref={(element) => {
                    champRefs.current[6] = element;
                  }} />
        </Container>
    )
}

export default MesNotes;