import React from "react";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import LoadingScreen from "./main/LoadingScreen";
import ListeSeuils from "./seuils/ListeSeuils";
import { Alert, Tab, Tabs } from "react-bootstrap";
import SeuilEditor from "./seuils/SeuilEditor";
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

const App = () => {
  const version = "v7.0.0 01/07/2022";
  const contrib = true;

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

  const handleBilanChange = (previous, next) => {
    setScoreBilanPrevious(previous);
    setScoreBilanNext(next);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(bonusCollege + scoreSocle + scoreBilanNext);
  };

  const handleSocleChange = (socle) => {
    //console.log(JSON.stringify(socle));
    setScoreSocle(socle);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(bonusCollege + scoreSocle + scoreBilanNext);
  };

  const handleCollegeChange = (college) => {
    //console.log(JSON.stringify(college));
    setBonusCollege(college.bonus);
    setCollegeSecteur(college.nom);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(bonusCollege + scoreSocle + scoreBilanNext);
  };

  const handleFiltreChange = (newFiltres) => {
    //console.log("newfiltre : " + JSON.stringify(newFiltres));
    setFiltreSpecialites(newFiltres);
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
                console.log(
                  "lycees with spe " +
                    spe +
                    " : " +
                    JSON.stringify(lyceesWithSpe)
                );
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
        <div className="mx-2">
          <Title />
          <Accordion defaultActiveKey="4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mon collège : {bonusCollege.toLocaleString()} pts
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <MesColleges onChange={handleCollegeChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mes notes :{" "}
                  {(scoreBilanNext
                    ? scoreBilanNext
                    : scoreBilanPrevious
                  ).toLocaleString()}{" "}
                  pts
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <MonBilan onChange={handleBilanChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mon socle : {scoreSocle.toLocaleString()} pts
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <MonSocle onChange={handleSocleChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" hidden={!contrib}>
              <Accordion.Header>
                <span className="fw-bolder">Seuils d'admission 2022</span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="col-md-6 mx-auto">
                  <Alert variant="success">
                    Afin d'en faire profiter la communauté, ajoutez ici les
                    seuils d'admission des lycées que vous avez demandés cette
                    année.
                    <br /> Il s'agit du score du dernier entrant non boursier,
                    fourni dans la dernière colonne de votre fiche barème à
                    demander au Rectorat dès le 1er juillet à l'adresse email :{" "}
                    <b>ce.dve@ac-paris.fr</b>
                  </Alert>
                </div>
                <div className="col-md-6 mx-auto">
                  <SeuilEditor />
                </div>
                <hr />
                <div className="col-md-6 mx-auto">
                  <ListeSeuils />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" hidden={!lyceesSecteur}>
              <Accordion.Header>
                <span className="fw-bolder">Mes lycées</span>
              </Accordion.Header>
              <Accordion.Body>
                <FiltrageSpecialites onChange={handleFiltreChange} />
                <Tabs
                  defaultActiveKey="secteur1"
                  id="lycees"
                  className="mx-0 my-0"
                >
                  <Tab eventKey="secteur1" title="Sect. 1">
                    <LyceesSecteur
                      lycees={lyceesSecteur[0]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="32640"
                    />
                  </Tab>
                  <Tab eventKey="secteur2" title="Sect. 2">
                    <LyceesSecteur
                      lycees={lyceesSecteur[1]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="17760"
                    />
                  </Tab>
                  <Tab eventKey="secteur3" title="Sect. 3">
                    <LyceesSecteur
                      lycees={lyceesSecteur[2]}
                      scorePrevious={scoreGlobalPrevious}
                      scoreNext={scoreGlobalNext}
                      bonusGeo="16800"
                    />
                  </Tab>
                </Tabs>
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
