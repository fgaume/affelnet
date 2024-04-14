import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  ButtonToolbar,
  ButtonGroup,
  Stack,
} from "react-bootstrap";
import {
  ArrowClockwise,
  CheckLg,
  ExclamationLg,
  ShareFill,
  Trash,
} from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import "./App.css";
import MonBilan from "./bilan/MonBilan";
import MesColleges from "./college/MesColleges";
import FiltrageSpecialites from "./lycees/FiltrageSpecialites";
import LyceesSecteur from "./lycees/LyceesSecteur";
import LoadingScreen from "./main/LoadingScreen";
import Title from "./main/Title";
import Secteurs from "./secteurs/Secteurs";
import { deleteWorker } from "./services/helper";
import fetchLycees from "./services/lyceeService";
import {
  fetchLyceesHavingSpecialites,
  resetExclu,
  setExclu,
} from "./services/specialites";
import ListeSeuils from "./seuils/ListeSeuils";
import MesContributions from "./seuils/MesContributions";
import MonSocle from "./socle/MonSocle";
import { seuilsLyceesMap } from "./data/lycees";

/* function useSeuilsCourants() {
  const [seuilsLyceesMap, setSeuilsLyceesMap] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "seuils"),
      (snapshot) => {
        const newSeuils = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        let newMap = new Map();
        newSeuils.forEach((seuil) => {
            newMap.set(seuil.id, [ seuil.seuil2022, seuil.seuil2023]);
        });
        setSeuilsLyceesMap(newMap);
      },
      (error) => {
        console.log("erreur firestore: ", error);
      }
    );
    return () => unsubscribe();
  }, []);
  return seuilsLyceesMap;
} */

const App = () => {
  const version = "v9.1.9 14/04/2024";
  const contrib = true;

  const [loading, setLoading] = useState(true);

  const [scoreBilanPrevious, setScoreBilanPrevious] = useState(0);
  const [scoreBilanNext, setScoreBilanNext] = useState(0);
  const [scoreSocle, setScoreSocle] = useState(0);
  const [bonusCollege, setBonusCollege] = useState(0);
  const [collegeSecteur, setCollegeSecteur] = useState(0);
  const [lyceesSecteur, setLyceesSecteur] = useState([[], [], []]);
  const [nomCollegeScolarisation, setNomCollegeScolarisation] = useState(0);
  const [scoreGlobalPrevious, setScoreGlobalPrevious] = useState(0);
  const [scoreGlobalNext, setScoreGlobalNext] = useState(0);
  const [filtreSpecialites, setFiltreSpecialites] = useState([]);
  const [avancementCompetences, setAvancementCompetences] = useState(0);
  const [avancementNotes, setAvancementNotes] = useState(0);
  const [numberSeuils, setNumberSeuils] = useState(0);
  const [seuilsCourants, setSeuilsCourants] = useState(seuilsLyceesMap);

  //  const seuilsLyceesMap = useSeuilsCourants();

  const handleBilanChange = (previous, next, newAvancement) => {
    setAvancementNotes(newAvancement);
    setScoreBilanPrevious(previous);
    setScoreBilanNext(next);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(
      scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0
    );
  };

  const handleSocleChange = (newScore, newAvancement) => {
    //console.log(JSON.stringify(socle));
    setAvancementCompetences(newAvancement);
    setScoreSocle(newScore);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(
      scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0
    );
  };

  const handleCollegeChange = (college, collegeScol) => {
    //console.log(JSON.stringify(college));
    setBonusCollege(college.bonus);
    setCollegeSecteur(college.nom);
    setScoreGlobalPrevious(bonusCollege + scoreSocle + scoreBilanPrevious);
    setScoreGlobalNext(
      scoreBilanNext > 0 ? bonusCollege + scoreSocle + scoreBilanNext : 0
    );
    if (collegeScol !== null) {
      setNomCollegeScolarisation(collegeScol.nom);
    }
  };

  const handleFiltreChange = (newFiltres) => {
    //console.log("newfiltre : " + JSON.stringify(newFiltres));
    setFiltreSpecialites(newFiltres);
  };

  const handleSeuilChange = (newNumberSeuils) => {
    // console.log("newNumberSeuils : " + newNumberSeuils);
    setNumberSeuils(newNumberSeuils);
  };

  const onSeuilUpdated = (lyceeId, updatedSeuil) => {
    console.log("App.onSeuilUpdated : " + lyceeId + ": ", updatedSeuil);
    const seuilsCourantsCopy = new Map(
      JSON.parse(JSON.stringify(Array.from(seuilsCourants)))
    );
    const existingSeuil = seuilsCourantsCopy.get(lyceeId);
    if (existingSeuil[2] !== updatedSeuil) {
      seuilsCourantsCopy.set(lyceeId, [
        existingSeuil[0],
        existingSeuil[1],
        updatedSeuil,
      ]);
      setSeuilsCourants(seuilsCourantsCopy);
    }
  };

  useEffect(() => {
    console.log(seuilsCourants);
    console.log("useffect App.js");
    setTimeout(() => setLoading(false), 500);
    if (collegeSecteur) {
      fetchLycees(collegeSecteur, seuilsCourants).then((newLycees) => {
        if (newLycees && newLycees.length === 3) {
          newLycees.forEach((listeLycees) => resetExclu(listeLycees));
          if (filtreSpecialites && filtreSpecialites.length > 0) {
            fetchLyceesHavingSpecialites(filtreSpecialites).then(
              (lyceesWithSpe) => {
                console.log(
                  "lycees with spe " +
                    filtreSpecialites +
                    " : " +
                    JSON.stringify(lyceesWithSpe)
                );
                newLycees.forEach((lycees) => {
                  setExclu(lycees, lyceesWithSpe);
                });
                setLyceesSecteur(newLycees);
              }
            );
          } else {
            setLyceesSecteur(newLycees);
          }
        }
      });
    }
  }, [collegeSecteur, filtreSpecialites, seuilsCourants]);

  return (
    <>
      {loading === false ? (
        <div className="mx-2 col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 mx-auto">
          <Title />
          <Accordion defaultActiveKey="3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mon collège ({bonusCollege.toLocaleString()} pts)
                </span>
                {collegeSecteur ? (
                  <CheckLg color="green" width="20" height="20" />
                ) : (
                  <ExclamationLg color="red" width="20" height="20" />
                )}
              </Accordion.Header>
              <Accordion.Body>
                <MesColleges onChange={handleCollegeChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-bolder">Mes compétences&nbsp;</span>
                {avancementCompetences === 100 ? (
                  <span className="fw-bolder">
                    ({scoreSocle.toLocaleString()} pts)&nbsp;
                  </span>
                ) : (
                  <span className="fw-bolder">
                    ({avancementCompetences} %)&nbsp;
                  </span>
                )}
                {avancementCompetences === 100 ? (
                  <CheckLg color="green" width="20" height="20" />
                ) : (
                  <ExclamationLg color="red" width="20" height="20" />
                )}
              </Accordion.Header>
              <Accordion.Body>
                <MonSocle onChange={handleSocleChange} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className="fw-bolder">Mes notes&nbsp;</span>
                {avancementNotes === 100 ? (
                  <span className="fw-bolder">
                    (
                    {(scoreBilanNext
                      ? scoreBilanNext
                      : scoreBilanPrevious
                    ).toLocaleString()}{" "}
                    pts)&nbsp;
                  </span>
                ) : (
                  <span className="fw-bolder">({avancementNotes} %)&nbsp;</span>
                )}
                {avancementNotes === 100 ? (
                  <CheckLg color="green" width="20" height="20" />
                ) : (
                  <ExclamationLg color="red" width="20" height="20" />
                )}
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
                <span className="fw-bolder">
                  Seuils d'admission ({numberSeuils}/44)
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <ListeSeuils onChange={handleSeuilChange} />
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
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <span className="fw-bolder">Mes contributions</span>
                <ShareFill width="20" height="20" className="ms-2" />
              </Accordion.Header>
              <Accordion.Body>
                <MesContributions
                  contrib={contrib}
                  nomCollegeScolarisation={nomCollegeScolarisation}
                  onSeuilUpdated={onSeuilUpdated}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Stack direction="horizontal" gap={3}>
            <ButtonToolbar aria-label="boutons apps" className="p-2">
              <ButtonGroup aria-label="update" className="me-2">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => deleteWorker()}
                >
                  <ArrowClockwise width="18" height="18" className="me-1" />
                  Mettre à jour
                </Button>
              </ButtonGroup>
              <ButtonGroup className="me-2" aria-label="reset">
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => {
                    localStorage.clear();
                    deleteWorker();
                  }}
                >
                  <Trash width="18" height="18" className="me-1" />
                  Reset
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <small className="p-2 ms-auto">
              <a
                href="https://github.com/fgaume/affelnet/actions"
                aria-label="Lien vers Github"
                rel="noreferrer"
                target="_blank"
              >
                {version}
              </a>
            </small>
          </Stack>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default App;
