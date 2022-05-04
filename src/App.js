import React from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import MesCompetences from './competences/MesCompetences';
import MesNotes from "./notes/MesNotes";
import MonCollege from './college/MonCollege';
import ScoreSecteurs from "./ScoreSecteurs";
import { useLocalStorage } from "./useLocalStorage";
import MesLycees from './lycees/MesLycees';
import { CheckCircle, ExclamationCircle } from 'react-bootstrap-icons';

const App = () => {

  const [scoreGlobal, setScoreGlobal] = useLocalStorage("Score/Score global", 0);
  const [scoreCompetences, setScoreCompetences] = useLocalStorage("Score/Score compétences global", 0);
  const [scoreNotes, setScoreNotes] = useLocalStorage("Score/Score notes global", 0);
  const [bonusGlobal, setBonusGlobal] = useLocalStorage("Score/BonusGlobal", 0);
  const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage("Score/NomCollegeSecteur", '');
  const [inputLycees, setInputLycees] = useLocalStorage("Lycees/inputLycees", {});
  const [avancementCompetences, setAvancementCompetences] = useLocalStorage("Score/avancementCompetences", 0);
  const [avancementNotes, setAvancementNotes] = useLocalStorage("Score/avancementNotes", 0);


  const handleChangeCompetence = (competenceUpdate, avancement) => {
    setScoreCompetences(competenceUpdate);
    const score = Math.round(competenceUpdate + scoreNotes + bonusGlobal);
    setScoreGlobal(score);
    setAvancementCompetences(avancement);
    setInputLycees({ 'nomCollegeSecteur' : nomCollegeSecteur, 'score' : score});
  }

  const handleChangeNotes = (noteUpdate, avancement) => {
    setScoreNotes(noteUpdate);
    const score = Math.round(noteUpdate + scoreCompetences + bonusGlobal);
    setScoreGlobal(score);
    setAvancementNotes(avancement);
    setInputLycees({ 'nomCollegeSecteur' : nomCollegeSecteur, 'score' : score});
  }

  const handleChangeBonusIPS = (bonusUpdate) => {
    setBonusGlobal(bonusUpdate);
    const score = Math.round(bonusUpdate + scoreNotes + scoreCompetences);
    setScoreGlobal(score);
    setInputLycees({ 'nomCollegeSecteur' : nomCollegeSecteur, 'score' : score});
  }

  const handleChangeCollegeSecteur = (newCollegeSecteur) => {
    console.log('newCollegeSecteur : ' + newCollegeSecteur);
    setNomCollegeSecteur(newCollegeSecteur);
    setInputLycees({ 'nomCollegeSecteur' : newCollegeSecteur, 'score' : scoreGlobal});
  }

  return (
    <Form>
      <div>&nbsp;</div>
      <ScoreSecteurs scoreGlobal={scoreGlobal} />
      <div>&nbsp;</div>
      <Accordion defaultActiveKey={nomCollegeSecteur === '' ? '0' : '3'} >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className='fw-bolder'>Mon collège&nbsp;</span>
            { nomCollegeSecteur ?
              (<CheckCircle color='green' width='20' height='20' />) :
              (<ExclamationCircle color='red' width='20' height='20' />)
            }
            </Accordion.Header>
          <Accordion.Body>
            <MonCollege onBonusChange={handleChangeBonusIPS} onSecteurChange={handleChangeCollegeSecteur}/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className='fw-bolder'>Mes compétences&nbsp;</span>
            { avancementCompetences === 100 ?
              (<CheckCircle color='green' width='20' height='20' />) :
              (<ExclamationCircle color='red' width='20' height='20' />)
            }
            </Accordion.Header>
          <Accordion.Body>
            <MesCompetences onChange={handleChangeCompetence} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span className='fw-bolder'>Mes notes&nbsp;</span>
            { avancementNotes === 100 ?
              (<CheckCircle color='green' width='20' height='20' />) :
              (<ExclamationCircle color='red' width='20' height='20' />)
            }
          </Accordion.Header>
          <Accordion.Body>
            <MesNotes onChange={handleChangeNotes} />           
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" hidden={!nomCollegeSecteur}>
          <Accordion.Header><span className='fw-bolder'>Mes lycées</span></Accordion.Header>
          <Accordion.Body>
            <MesLycees key={inputLycees} inputLycees={inputLycees} />           
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Form>
  );
};

export default App;