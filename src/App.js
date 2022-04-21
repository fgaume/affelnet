import React from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import MesCompetences from './competences/MesCompetences';
import MesNotes from "./notes/MesNotes";
import MonCollege from './college/MonCollege';
import ScoreSecteurs from "./ScoreSecteurs";
import { useLocalStorage } from "./useLocalStorage";


const App = () => {

  const [scoreGlobal, setScoreGlobal] = useLocalStorage("Score global", 0);
  const [scoreCompetences, setScoreCompetences] = useLocalStorage("Score compétences global", 0);
  const [scoreNotes, setScoreNotes] = useLocalStorage("Score notes global", 0);
  const [bonusGlobal, setBonusGlobal] = useLocalStorage("BonusGlobal", 0);

  const handleChangeCompetence = (competenceUpdate) => {
    setScoreCompetences(competenceUpdate);
    setScoreGlobal(Math.round(competenceUpdate + scoreNotes + bonusGlobal));
  }

  const handleChangeNotes = (noteUpdate) => {
    setScoreNotes(noteUpdate);
    setScoreGlobal(Math.round(noteUpdate + scoreCompetences + bonusGlobal));
  }

  const handleChangeBonusIPS = (bonusUpdate) => {
    console.log('new bonus : ' + bonusUpdate);
    setBonusGlobal(bonusUpdate);
    setScoreGlobal(Math.round(bonusUpdate + scoreNotes + scoreCompetences));
  }

  return (
    <Form>
      <div>&nbsp;</div>
      <ScoreSecteurs scoreGlobal={scoreGlobal} />
      <div>&nbsp;</div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header><span className='fw-bolder'>Mon collège</span></Accordion.Header>
          <Accordion.Body>
            <MonCollege onChange={handleChangeBonusIPS}/>
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