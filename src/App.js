import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { CheckLg, ExclamationLg } from 'react-bootstrap-icons';
import { useLocalStorage } from "./useLocalStorage";
import MesLycees from './lycees/MesLycees';
import MesNotes from "./notes/MesNotes";
import MonCollege from './college/MonCollege';
import ScoreSecteurs from './main/ScoreSecteurs';
import LoadingScreen from './main/LoadingScreen';
import ContribSeuils from './contrib/ContribSeuils';
import MesCompetences from './competences/MesCompetences';
import ListeSeuils from './seuils/ListeSeuils';
import { Alert, Container } from 'react-bootstrap';
import SeuilEditor from './seuils/SeuilEditor';

const App = () => {

  const version = "v6.3.3 16/05/2022 16:41";
  const contrib = true;
  const [scoreGlobal, setScoreGlobal] = useLocalStorage("Score/Score global", 0);
  const [scoreCompetences, setScoreCompetences] = useLocalStorage("Score/Score compétences global", 0);
  const [scoreNotes, setScoreNotes] = useLocalStorage("Score/Score notes global", 0);
  const [bonusGlobal, setBonusGlobal] = useLocalStorage("Score/BonusGlobal", 0);
  const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage("Score/NomCollegeSecteur", '');
  const [inputLycees, setInputLycees] = useLocalStorage("Lycees/inputLycees", {});
  const [avancementCompetences, setAvancementCompetences] = useLocalStorage("Score/avancementCompetences", 0);
  const [avancementNotes, setAvancementNotes] = useLocalStorage("Score/avancementNotes", 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, []);

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
    <>
    {loading === false ? (
    <div>
      <div>&nbsp;</div>
      <ScoreSecteurs scoreGlobal={scoreGlobal} />
      <div>&nbsp;</div>
      <Accordion defaultActiveKey={nomCollegeSecteur === '' ? '0' : '4'} >
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
        <Accordion.Item eventKey="4" hidden={!contrib}>
          <Accordion.Header><span className='fw-bolder'>Seuils d'admission 2022</span></Accordion.Header>
          <Accordion.Body>
            <div>
              <Alert variant='success'>
  Afin d'en faire profiter la communauté, ajoutez ici les seuils d'admission des lycées que vous avez demandés
  cette année.
  <br /> Il s'agit du score du dernier admis, fourni dans la dernière colonne de la fiche barème
  à demander au Rectorat dès le 1er juillet à l'adresse email : <b>ce.dve@ac-paris.fr</b>
              </Alert>
              <SeuilEditor />
              <hr />
              <ListeSeuils />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p>&nbsp;</p>
      <p className='text-end text-muted'><small>{version}&nbsp;</small></p>
    </div>
    ) : (
      <LoadingScreen />
    )}
    </>
  );
};

export default App;