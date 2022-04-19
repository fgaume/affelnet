import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import MesCompetences from './competences/MesCompetences';
import MesNotes from "./notes/MesNotes";
import CollegeInfos from './college/CollegeInfos';
import { useLocalStorage } from "./useLocalStorage";

const App = () => {

  const [scoreGlobal, setScoreGlobal] = useLocalStorage("Score global", 0);
  const [scoreCompetences, setScoreCompetences] = useLocalStorage("Score compétences global", 0);
  const [scoreNotes, setScoreNotes] = useLocalStorage("Score notes global", 0);
  const [bonusGlobal, setBonusGlobal] = useLocalStorage("BonusGlobal", 0);

  const handleChangeCompetence = (newScore) => {
    setScoreCompetences(newScore);
    setScoreGlobal(Math.round(newScore + scoreNotes + bonusGlobal));
  }

  const handleChangeNotes = (newScore) => {
    setScoreNotes(newScore);
    setScoreGlobal(Math.round(newScore + scoreCompetences + bonusGlobal));
  }

  const handleChangeBonusIPS = (bonus) => {
    setBonusGlobal(bonus);
    setScoreGlobal(Math.round(scoreNotes + scoreCompetences + bonus));
  }

  return (
    <Form>
      <div>&nbsp;</div>
      <Container className='border border-primary bg-light'> 
        <Row>
           <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center text-success'><h5>Secteur 1</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-primary'><h5>Secteur 2</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-secondary'><h5>Secteur 3</h5></Col>
        </Row>
        <Row>
          <Col className='d-flex align-items-center justify-content-center text-success'><h5>{scoreGlobal + 32640}</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-primary'><h5>{scoreGlobal + 17760}</h5></Col>
          <Col className='d-flex align-items-center justify-content-center text-secondary'><h5>{scoreGlobal + 16800}</h5></Col>
        </Row>
        <Row>
           <Col>&nbsp;</Col>
        </Row>
      </Container>
      <div>&nbsp;</div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header><span className='fw-bolder'>Mon collège</span></Accordion.Header>
          <Accordion.Body>
            <CollegeInfos onChange={handleChangeBonusIPS}/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header><span className='fw-bolder'>Mes compétences</span></Accordion.Header>
          <Accordion.Body>
            <MesCompetences onChange={handleChangeCompetence} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header><span className='fw-bolder'>Mes notes</span></Accordion.Header>
          <Accordion.Body>
            <MesNotes onChange={handleChangeNotes} />           
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Form>
  );
};

export default App;