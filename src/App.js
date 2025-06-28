import React, { useContext, useEffect, useState } from "react";
import SharedContext from "./context";
import {
  Button,
  Tab,
  Tabs,
  ButtonToolbar,
  ButtonGroup,
  Stack,
  Modal,
} from "react-bootstrap";
import {
  ArrowClockwise,
  CheckLg,
  ExclamationCircle,
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
import MesContributions from "./seuils/MesContributions";
import MonSocle from "./socle/MonSocle";
//import { localStats } from "./services/statistiques";
import Seuils from "./seuils/Seuils";

const App = () => {
  const versionLocale = "v9.5.0 28/06/2025";

  const { data } = useContext(SharedContext);

  const [loading, setLoading] = useState(true);

  //const [recentStats, setRecentStats] = useState(null);

  const [scoreBilanPrevious, setScoreBilanPrevious] = useState(0);
  const [scoreBilanNext, setScoreBilanNext] = useState(0);
  const [scoreBilanPreviousMax, setScoreBilanPreviousMax] = useState(0);
  const [scoreBilanNextMax, setScoreBilanNextMax] = useState(0);
  const [scoreSocle, setScoreSocle] = useState(0);
  const [collegeSecteur, setCollegeSecteur] = useState(null);
  const [collegeScolarisation, setCollegeScolarisation] = useState(null);
  const [lyceesSecteur, setLyceesSecteur] = useState([[], [], []]);
  const [scoreGlobalPrevious, setScoreGlobalPrevious] = useState(0);
  const [scoreGlobalNext, setScoreGlobalNext] = useState(0);
  const [filtreSpecialites, setFiltreSpecialites] = useState([]);
  const [avancementCompetences, setAvancementCompetences] = useState(0);
  const [avancementNotes, setAvancementNotes] = useState(0);
  const [nombreSeuils, setNombreSeuils] = useState("");
  const [anneeN, setAnneeN] = useState(0);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateAttempted, setUpdateAttempted] = useState(false);

  const updateGlobalScores = (collegeScol) => {
    const newScoreGlobalPrevious = (
      collegeScol.bonus +
      scoreSocle +
      scoreBilanPrevious
    ).toFixed(3);
    setScoreGlobalPrevious(parseFloat(newScoreGlobalPrevious));
    const newScoreGlobalNext = (
      collegeScol.bonus +
      scoreSocle +
      scoreBilanNext
    ).toFixed(3);
    setScoreGlobalNext(scoreBilanNext > 0 ? parseFloat(newScoreGlobalNext) : 0);
  };

  const handleBilanChange = (previous, next, newAvancement) => {
    if (collegeScolarisation) {
      setAvancementNotes(newAvancement);
      //console.log("setScoreBilanPrevious:", previous)
      //console.log("scoreGlobalPrevious:", scoreGlobalPrevious)
      setScoreBilanPrevious(previous);
      //console.log("setScoreBilanNext:", next)
      //console.log("scoreGlobalNext:", scoreGlobalNext)
      setScoreBilanNext(next);
      updateGlobalScores(collegeScolarisation);
    }
  };

  const handleSocleChange = (newScore, newAvancement) => {
    if (collegeScolarisation) {
      setAvancementCompetences(newAvancement);
      setScoreSocle(newScore);
      updateGlobalScores(collegeScolarisation);
    }
  };

  const handleCollegeChange = (collegeSect, collegeScol) => {
    //console.log("handleCollegeChange: ", JSON.stringify(college));
    if (collegeScol !== null) {
      setCollegeScolarisation(collegeScol);
      updateGlobalScores(collegeScol);
    }
    if (collegeSect !== null) {
      setCollegeSecteur(collegeSect);
    }
  };

  const handleFiltreChange = (newFiltres) => {
    //console.log("newfiltre : " + JSON.stringify(newFiltres));
    setFiltreSpecialites(newFiltres);
  };

  const handleUpdateClick = () => {
    console.log("Mise à jour de l'application déclenchée !");
    setUpdateAttempted(true);
    deleteWorker();
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setUpdateAttempted(true);
  };

  useEffect(() => {
    //console.log("useffect App.js");
    if (data?.completed) {
      //console.log("data: ", data);

      if (data && data.infos && data.infos.latest_version) {
        const latestVersion = data.infos.latest_version;
        console.log("version courante: ", versionLocale);
        console.log("version à jour: ", latestVersion);
        // La normalisation n'est plus nécessaire, comparaison directe des chaînes
        if (versionLocale !== latestVersion) {
          console.log("updateAttempted:", updateAttempted);
          if (!updateAttempted) {
            setShowUpdateModal(true);
          }
        } else {
          // Si les versions correspondent, on peut réinitialiser l'état updateAttempted
          setUpdateAttempted(false); // Réinitialiser si l'app est à jour
        }
      }

      if (data.seuilsRecents !== null && data.seuilsRecents?.length > 0) {
        setNombreSeuils(data.seuilsRecents?.length);
      } else {
        setNombreSeuils(data.nombreSeuils);
      }

      if (data.recentStatsMap && data.recentStatsMap.keys()) {
        //const recentCDMap = data.recentStatsMap.values().next().value;
        setAnneeN(data.recentStatsMap.keys().next().value);
        setScoreBilanNextMax(4800 + data.scoreMaxRecent);
        setScoreBilanPreviousMax(4800 + data.scoreMaxAnneeN);
      } else {
        setAnneeN(data.derniereAnnee);
        setScoreBilanNextMax(4800 + data.scoreMaxAnneeN);
        setScoreBilanPreviousMax(4800 + data.scoreMaxAnneeN1);
      }

      //setRecentStats(localStats(data.statsMap, anneeN)); // { statsCDs, scoreMax }
      setTimeout(() => setLoading(false), 500);
      if (collegeSecteur) {
        fetchLycees(collegeSecteur, data.lyceesMap, data.seuilsRecents).then(
          (newLycees) => {
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
          }
        );
      }
    }
  }, [collegeSecteur, data, filtreSpecialites, updateAttempted, versionLocale]);

  return (
    <>
      {loading === false && data?.completed ? (
        <div className="mx-2 col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 mx-auto">
          <Title />
          <Accordion defaultActiveKey="3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bolder">
                  Mon collège ({collegeScolarisation?.bonus?.toLocaleString()}{" "}
                  pts)
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
                <MonBilan
                  onChange={handleBilanChange}
                  statsMap={data.statsMap}
                  recentStatsMap={data.recentStatsMap}
                  anneeN={anneeN}
                  derniereAnnee={data.derniereAnnee}
                />
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
                        scorePreviousMax={scoreBilanPreviousMax}
                        scoreNextMax={scoreBilanNextMax}
                        // scoreMax={4800 + recentStats?.scoreMax}
                        bonusGeo={32640}
                        anneeN={anneeN}
                        secteur="1"
                        bonusExceptionnel={data.infos.bonus_exceptionnel}
                      />
                    </Tab>
                    <Tab eventKey="secteur2" title="Sect. 2">
                      <LyceesSecteur
                        lycees={lyceesSecteur[1]}
                        scorePrevious={scoreGlobalPrevious}
                        scoreNext={scoreGlobalNext}
                        //                        scoreMax={4800 + recentStats?.scoreMax}
                        scorePreviousMax={scoreBilanPreviousMax}
                        scoreNextMax={scoreBilanNextMax}
                        bonusGeo={17760}
                        anneeN={anneeN}
                        secteur="2"
                        bonusExceptionnel={false}
                      />
                    </Tab>
                    <Tab eventKey="secteur3" title="Sect. 3">
                      <LyceesSecteur
                        lycees={lyceesSecteur[2]}
                        scorePrevious={scoreGlobalPrevious}
                        scoreNext={scoreGlobalNext}
                        //scoreMax={4800 + recentStats?.scoreMax}
                        scorePreviousMax={scoreBilanPreviousMax}
                        scoreNextMax={scoreBilanNextMax}
                        bonusGeo={16800}
                        anneeN={anneeN}
                        secteur="3"
                        bonusExceptionnel={false}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span className="fw-bolder">
                  Seuils d'admission ({nombreSeuils}/
                  {
                    data.listeLycees?.filter((lycee) => lycee.hasSeuil === true)
                      .length
                  }
                  )
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <Seuils
                  listeLycees={data.listeLycees?.filter(
                    (lycee) => lycee.hasSeuil === true
                  )}
                  seuilsRecents={data.seuilsRecents}
                  enableSeuilsRecents={data.seuilsRecents?.length > 0}
                />
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
                  seuils_editables={data.infos.seuils_editables}
                  stats_editables={data.infos.stats_editables}
                  contributeur={collegeScolarisation?.nom}
                  listeLycees={data.listeLycees}
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
                  <ArrowClockwise
                    width="18"
                    height="18"
                    className="me-1"
                    style={{ verticalAlign: "-0.3em" }}
                  />
                  Mise à jour
                  {versionLocale !== data?.infos?.latest_version ? (
                    <ExclamationCircle
                      color="red"
                      width="18"
                      height="18"
                      className="mx-1"
                      style={{ verticalAlign: "-0.3em" }}
                    />
                  ) : null}
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
                {versionLocale !== data.infos.latest_version
                  ? versionLocale + " -> " + data.infos.latest_version
                  : versionLocale}
              </a>
            </small>
          </Stack>
          <Modal show={showUpdateModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Mise à jour disponible</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Une nouvelle version de l'application est disponible (
              {data?.infos?.latest_version}).
              <br />
              Pour bénéficier des dernières fonctionnalités et améliorations,
              veuillez mettre à jour l'application.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Plus tard
              </Button>
              <Button variant="primary" onClick={handleUpdateClick}>
                Mettre à jour maintenant
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default App;
