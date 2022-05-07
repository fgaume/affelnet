import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useLocalStorage } from "../useLocalStorage";
import ChampDisciplinaire from './ChampDisciplinaire';
import { moyennesAcademiques, ecartsAcademiques } from '../data/stats';
import {champsDisciplinaires, coefficients} from '../data/affelnet';
import { Button, ProgressBar } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useRef } from 'react';
import { ChevronBarDown, ChevronBarUp } from 'react-bootstrap-icons';

const MesNotes = (props) => {

    let champRefs = useRef([]);

    const [score, setScore] = useLocalStorage("MesNotes/score notes", 0);
    const [semestres, setSemestres] = useLocalStorage("semestres", false);
    const [avancementNotes, setAvancementNotes] = useLocalStorage("MesNotes/avancementNotes", 0);

    const moyennes = moyennesAcademiques.get('2021');
    const ecarts = ecartsAcademiques.get('2021');

    const moyenneToScore = (champ, moyenne) => {
        return coefficients.get(champ) *
            (10 + (moyenne - moyennes.get(champ)) / ecarts.get(champ));
    }

    const computeScore = (champ, newMoyenne) => {
        let sum = 0;
        for (let index = 0; index < champsDisciplinaires.length; index++) {
            const achamp = champsDisciplinaires[index];
            let ascore = newMoyenne;
            if (achamp !== champ) {
                ascore = parseInt(champRefs.current[index].getMoyenne());
            }
            if (ascore !== 0) {
                sum += moyenneToScore(achamp, ascore);
            }
        }
        return sum;
    }

    const computeAvancement = (champ, newAvancementChamp) => {
        let sum = 0;
        for (let index = 0; index < champsDisciplinaires.length; index++) {
            const achamp = champsDisciplinaires[index];
            let avc = newAvancementChamp;
            if (achamp !== champ) {
                avc = parseInt(champRefs.current[index].getAvancementChamp());
            }
            sum += avc;
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

    const handleChange = (champ, newScore, newAvancementChamp) => {
        const newScoreNotes = computeScore(champ, newScore);
        const newAvancementNotes = computeAvancement(champ, newAvancementChamp); 
        setScore(newScoreNotes);
        setAvancementNotes(newAvancementNotes);
        props.onChange(newScoreNotes, ( 100 * newAvancementNotes / (semestres ? 22 : 33)));
    }

    const handleChangeCheck = (event) => {
        setSemestres(event.target.checked);
    }

    const handleSetAllMin = (event) => {
        const noteMin = 3;
        champRefs.current.forEach((ref, index) => {
            ref.setNoteFromOutside(noteMin);
        });
        let newScoreNotes = computeScoreMinMax(noteMin);
        setScore(newScoreNotes);
        setAvancementNotes(semestres ? 22 : 33);
        props.onChange(newScoreNotes, 100);
    }

    const handleSetAllMax = (event) => {
        const noteMax = 16;
        champRefs.current.forEach((ref, index) => {
            ref.setNoteFromOutside(noteMax);
        });
        let newScoreNotes = computeScoreMinMax(noteMax);
        setScore(newScoreNotes);
        setAvancementNotes(semestres ? 22 : 33);
        props.onChange(newScoreNotes, 100);
    }

    return (
        <Container>
            {
                (avancementNotes !== (semestres ? 22 : 33)) && (
                    <Row>
                        <Col>
                            <ProgressBar min='0' max={semestres ? 22 : 33} variant={avancementNotes === (semestres ? 22 : 33) ? 'success' : 'primary'} now={avancementNotes} />
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>Saisissez ici vos moyennes {semestres ? 'semestrielles' : 'trimestrielles'} :</Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>
                    <Form.Switch id='semestres' label='Collège en semestres' defaultChecked={semestres} onChange={handleChangeCheck} />
                </Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="outline-danger" size='sm' onClick={handleSetAllMin}>
                        <ChevronBarDown height='20' width='20' />
                        &nbsp;Tout au minimum
                    </Button>&nbsp;
                    <Button variant="outline-success" size='sm' onClick={handleSetAllMax}>
                        <ChevronBarUp height='20' width='20' />
                        &nbsp;Tout au maximum
                    </Button>
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