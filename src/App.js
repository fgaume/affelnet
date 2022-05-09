import React from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import MesCompetences from './competences/MesCompetences';
import MesNotes from "./notes/MesNotes";
import MonCollege from './college/MonCollege';
import ScoreSecteurs from "./ScoreSecteurs";
import { useLocalStorage } from "./useLocalStorage";
import MesLycees from './lycees/MesLycees';
import { CheckLg, ExclamationLg } from 'react-bootstrap-icons';

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

  const handleChangeCollege = (newCollege) => {
    console.log('newCollege : ' + JSON.stringify(newCollege));
    let newScoreGlobal = scoreGlobal;
    if (nomCollegeSecteur !== newCollege.nom) {
      setNomCollegeSecteur(newCollege.nom);
    }
    if (bonusGlobal !== newCollege.bonus) {
      setBonusGlobal(newCollege.bonus);
      newScoreGlobal = Math.round(scoreNotes + scoreCompetences + newCollege.bonus);
      setScoreGlobal(newScoreGlobal);
    }
    setInputLycees({ 'nomCollegeSecteur' : newCollege.nom, 'score' : newScoreGlobal });
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
              (<CheckLg color='green' width='20' height='20' />) :
              (<ExclamationLg color='red' width='20' height='20' />)
            }
            </Accordion.Header>
          <Accordion.Body>
            <MonCollege onChange={handleChangeCollege} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span className='fw-bolder'>Mes compétences&nbsp;</span>
            { avancementCompetences === 100 &&
            (<span className='fw-bolder'>({scoreCompetences.toLocaleString()} pts)&nbsp;</span>)
            }
            { avancementCompetences === 100 ?
              (<CheckLg color='green' width='20' height='20' />) :
              (<ExclamationLg color='red' width='20' height='20' />)
            }
            </Accordion.Header>
          <Accordion.Body>
            <MesCompetences onChange={handleChangeCompetence} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span className='fw-bolder'>Mes notes&nbsp;</span>
            { avancementNotes === 100 &&
            (<span className='fw-bolder'>({Math.round(scoreNotes).toLocaleString()} pts)&nbsp;</span>)
            }
            { avancementNotes === 100 ?
              (<CheckLg color='green' width='20' height='20' />) :
              (<ExclamationLg color='red' width='20' height='20' />)
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
      <p>&nbsp;</p>
      <p class='text-end text-muted'><h6><small>v6.3 09/05/2022 12:07</small></h6></p>
    </Form>
    
  );
};

export default App;