import React from "react";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import LoadingScreen from "./main/LoadingScreen";
import ListeSeuils from "./seuils/ListeSeuils";
import { Tab, Tabs } from "react-bootstrap";
import { CheckLg, ExclamationLg } from 'react-bootstrap-icons';
import MonBilan from "./bilan/MonBilan";
import MonSocle from "./socle/MonSocle";
import MesColleges from "./college/MesColleges";
import Title from "./main/Title";
import fetchLycees from "./services/lycees";
import "./App.css";
import LyceesSecteur from "./lycees/LyceesSecteur";
import FiltrageSpecialites from "./lycees/FiltrageSpecialites";
import {
  setExclu,
  fetchLyceesHavingSpecialite,
  resetExclu,
} from "./services/specialites";
import ContribSeuils from "./seuils/ContribSeuils";
import Secteurs from "./secteurs/Secteurs";

const App = () => {
  const version = "v8.2.5 28/05/2023";
  const contrib = false;

  const [loading, setLoading] = useState(true);

  const [scoreBilanPrevious, setScoreBilanPrevious] = useState(0);
  const [scoreBilanNext, setScoreBilanNext] = useState(0);
  const [scoreSocle, setScoreSocle] = useState(0);
  const [bonusCollege, setBonusCollege] = useState(0);
  const [collegeSecteur, setCollegeSecteur] = useState(0);
  const [lyceesSecteur, setLyceesSecteur] = useState([[], [], []]);
  const [scoreGlobalPrevious, setScoreGlobalPrevious] = useState(0);
  const [scoreGlobalNext, setScoreGlobalNext] = useState(0);
  const [filtreSpecialites, setFiltreSpecialites] = useState([]);
  const [avancementCompetences, setAvancementCompetences] = useState(0);
  const [avancementNotes, setAvancementNotes] = useState(0);
  const [numberSeuils, setNumberSeuils] = useState(0);


  const handleBilanChange = (previous, next, newAvancement) => {
    setAvancementNotes(newAvancement);
    setScoreBilanPrevious(previous);
    setScoreBilanNext(next);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0);
  };

  const handleSocleChange = (newScore, newAvancement) => {
    //console.log(JSON.stringify(socle));
    setAvancementCompetences(newAvancement);
    setScoreSocle(newScore);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0);
  };

  const handleCollegeChange = (college) => {
    //console.log(JSON.stringify(college));
    setBonusCollege(college.bonus);
    setCollegeSecteur(college.nom);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0);
  };

  const handleFiltreChange = (newFiltres) => {
    //console.log("newfiltre : " + JSON.stringify(newFiltres));
    setFiltreSpecialites(newFiltres);
  };

  const handleSeuilChange = (newNumberSeuils) => {
    // console.log("newNumberSeuils : " + newNumberSeuils);
    setNumberSeuils(newNumberSeuils);
  };

  useEffect(() => {
    //console.log("useffect App.js");
    setTimeout(() => setLoading(false), 500);
    if (collegeSecteur) {
      fetchLycees(collegeSecteur).then((newLycees) => {
        if (newLycees && newLycees.length === 3) {
          newLycees.forEach((listeLycees) => resetExclu(listeLycees));
          if (filtreSpecialites && filtreSpecialites.length > 0) {
            filtreSpecialites.forEach((spe) => {
              fetchLyceesHavingSpecialite(spe).then((lyceesWithSpe) => {
                /* console.log(
                  "lycees with spe " +
                    spe +
                    " : " +
                    JSON.stringify(lyceesWithSpe)
                ); */
                newLycees.forEach((lycees) => {
                  setExclu(lycees, lyceesWithSpe);
                });
                setLyceesSecteur(newLycees);
              });
            });
          } else {
            setLyceesSecteur(newLycees);
          }
        }
      });
    }
  }, [collegeSecteur, filtreSpecialites]);

  return (
    <>
      {loading === false ? (
        <div className="mx-2 col-12 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-6 mx-auto">
          <Title />
          <Accordion defaultActiveKey="3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mon collège ({bonusCollege.toLocaleString()} pts)
                </span>
                { collegeSecteur ?
                    (<CheckLg color='green' width='20' height='20' />) :
                    (<ExclamationLg color='red' width='20' height='20' />)
                }
              </Accordion.Header>
              <Accordion.Body>
                <MesColleges onChange={handleCollegeChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mes compétences&nbsp;
                </span>
                { avancementCompetences === 100 ?
                    (<span className='fw-bolder'>({scoreSocle.toLocaleString()} pts)&nbsp;</span>) : (<span className='fw-bolder'>({avancementCompetences} %)&nbsp;</span>)
                }
                { avancementCompetences === 100 ?
                    (<CheckLg color='green' width='20' height='20' />) :
                    (<ExclamationLg color='red' width='20' height='20' />)
                }
              </Accordion.Header>
              <Accordion.Body>
                <MonSocle onChange={handleSocleChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mes notes&nbsp;
                </span>
                { avancementNotes === 100 ?
                (<span className='fw-bolder'>({(scoreBilanNext
                        ? scoreBilanNext
                        : scoreBilanPrevious
                ).toLocaleString()} pts)&nbsp;</span>) : (<span className='fw-bolder'>({avancementNotes} %)&nbsp;</span>)
                }
                { avancementNotes === 100 ?
                    (<CheckLg color='green' width='20' height='20' />) :
                    (<ExclamationLg color='red' width='20' height='20' />)
                }
              </Accordion.Header>
              <Accordion.Body>
                <MonBilan onChange={handleBilanChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" hidden={!collegeSecteur}>
              <Accordion.Header>
                <span className="fw-bolder">Mes lycées</span>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                <FiltrageSpecialites onChange={handleFiltreChange} />
                <Tabs
                  defaultActiveKey="secteur1"
                  id="lycees"
                  className="mx-0 my-0"
                >
                  <Tab eventKey="secteur1" title="Secteur 1">
                    <LyceesSecteur
                      lycees={lyceesSecteur[0]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="32640"
                      secteur="1"
                    />
                  </Tab>
                  <Tab eventKey="secteur2" title="Sect. 2">
                    <LyceesSecteur
                      lycees={lyceesSecteur[1]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="17760"
                      secteur="2"
                    />
                  </Tab>
                  <Tab eventKey="secteur3" title="Sect. 3">
                    <LyceesSecteur
                      lycees={lyceesSecteur[2]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="16800"
                      secteur="3"
                    />
                  </Tab>
                </Tabs>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className="fw-bolder">Seuils d'admission ({numberSeuils}/46)</span>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <ListeSeuils onChange={handleSeuilChange}/>
                  <ContribSeuils contrib={contrib} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <span className="fw-bolder">Secteurs</span>
              </Accordion.Header>
              <Accordion.Body>
                <Secteurs />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <p className="text-end text-muted">
            <small>{version}</small>
          </p>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default App;
