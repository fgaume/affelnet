import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Card, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import {
  ArrowReturnRight,
  Lightning,
  QuestionCircleFill,
} from "react-bootstrap-icons";

import { useLocalStorage } from "../services/useLocalStorage";
import {
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
  computeAvancementNotes,
} from "../services/bilan";
import MatiereEditor from "./MatiereEditor";
import "./MonBilan.css";
import AffichageScores from "../components/AffichageScores";
import MyToggle from "../components/MyToggle";
import { listeMatieres } from "../data/bilan";

const valueMap = new Map([
  [0, 0],
  [1, 3],
  [2, 8],
  [3, 13],
  [4, 16],
]);

/* returns scoreBilanPrevious and scoreBilanNext */
const MonBilan = (props) => {
  const [semestres, setSemestres] = useLocalStorage("semestres", false);
  const [matieres, setMatieres] = useLocalStorage(
    "bilan_periodique/matieres",
    listeMatieres
  );
  const [scoreBilanPrevious, setScoreBilanPrevious] = useState(0);
  const [scoreBilanNext, setScoreBilanNext] = useState(0);
  const [quickScore, setQuickScore] = useState(0);
  const [scoresCDs, setScoresCDs] = useState([]); // New state for scoreCDs

  //const [anneeN, setAnneeN] = useState(props.derniereAnnee);

  const inputRef = useRef([]);

  const handleMatiereChange = (nom, newNote, periode) => {
    //console.log("handleMatiereChange: " + nom + "/" + periode + "/" + newNote);
    setQuickScore(0);
    const newMatieres = updateMatieres(matieres, nom, periode, newNote);
    //console.log(JSON.stringify(newMatieres));
    setMatieres(newMatieres);
  };

  const handleChangeCheck = (newChecked) => {
    setSemestres(newChecked);
  };

  const setAllNotes = (event) => {
    const value = parseInt(event.target.value);
    //console.log("value = " + value);
    setQuickScore(value);
    const note = valueMap.get(value);
    //console.log("note = " + value);
    inputRef.current.forEach((elem) => {
      elem.setScore(note);
    });
    setMatieres(allMatiereSetTo(note, semestres));
  };

  useEffect(() => {
    if (props.statsMap) {
      const statsMap = props.statsMap;
      const recentStatsMap = props.recentStatsMap;

      // Get academic stats for the current year (props.anneeN)
      const currentAcademicStats = recentStatsMap
        ? recentStatsMap.get(props.anneeN)
        : statsMap.get(props.anneeN);

      // Compute raw CD scores
      const rawScoresCDs = computeNoteCDs(matieres, semestres);

      // Now, compute the harmonized score for each CD and update the state
      const scoresWithHarmonized = rawScoresCDs.map((cd) => {
        let harmonizedScore = "N/A"; // Default to N/A

        if (currentAcademicStats) {
          const cdStats = currentAcademicStats.get(cd.nom);
          if (cdStats) {
            const base = cd.score ? cd.score.toFixed(2) : 16;
            harmonizedScore =
              cd.score === 0 // If raw score is 0, the harmonized score is 100
                ? 100
                : 10 *
                  (10 +
                    (base - cdStats.moyenne) / cdStats.ecart_type);
            //console.log("score:", base);
            //console.log("cdStats:", cdStats);
            //console.log("harmonizedScore:", harmonizedScore);
            harmonizedScore = parseFloat(harmonizedScore.toFixed(3));
          }
        }
        return {
          ...cd, // Keep existing properties (nom, score, coefficient)
          harmonizedScore: harmonizedScore, // Add the new harmonized score
        };
      });

      setScoresCDs(scoresWithHarmonized); // Update state with raw and harmonized scores

      //console.log("recentStatsMap:", recentStatsMap);
      //console.log("anneeN:", props.anneeN);
      //const scoreCDs = computeNoteCDs(matieres, semestres);
      const avancement = computeAvancementNotes(matieres, semestres);
      //console.log(JSON.stringify(scoreCDs));
      //const statsMap = props.statsMap;
      const scoreBPprevious = computeBilanPeriodique(
        rawScoresCDs,
        statsMap.get(props.anneeN - 1)
      );
      //console.log("score BP = " + formatFloat(scoreBPprevious));
      setScoreBilanPrevious(scoreBPprevious);

      const scoreBPnext = computeBilanPeriodique(
        rawScoresCDs,
        currentAcademicStats
      );
      //console.log("score BP next = " + scoreBPnext);
      setScoreBilanNext(scoreBPnext);

      props.onChange(scoreBPprevious, scoreBPnext, avancement);
    }
  }, [
    matieres,
    semestres,
    props.anneeN,
    props.statsMap,
    props.recentStatsMap,
    props,
  ]);

  return (
    <div className="">
      <div className="mx-3 my-3">
        <ArrowReturnRight /> Saisir ici vos moyennes de chaque matière pour
        chaque {semestres ? "se" : "tri"}mestre. Seuls les{" "}
        <strong>intervalles</strong> de notes comptent pour votre score
        Affelnet, il est donc inutile de saisir les notes précises.
      </div>
      <div className="mx-3 my-3">
        <ArrowReturnRight /> Remarque :{" "}
        <a
          href="https://affelnet-paris.web.app/doc/prompt.txt"
          aria-label="Lien vers prompt"
        >
          Un prompt pour IA générative
        </a>{" "}
        est également disponible afin de calculer le bilan périodique à partir
        des bulletins Pronote PDF (votre IA doit donc être capable d'ingérer des
        documents PDF). Il ne sera valable qu'une fois les statistiques des
        champs disciplinaires connues.
      </div>
      <div className="mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto my-4">
        <AffichageScores
          scorePrevious={scoreBilanPrevious}
          scoreNext={scoreBilanNext}
          tipPrevious={
            "Score de votre bilan périodique en " + (props.anneeN - 1)
          }
          tipNext={"Score de votre bilan périodique en " + props.anneeN}
          tipDelta="Evolution de votre bilan périodique"
          anneeN={props.anneeN}
        />
      </div>
      <div className="mx-4 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto mb-4">
        <MyToggle
          id="semestres"
          label="Collège en semestres"
          defaultChecked={semestres}
          onChange={handleChangeCheck}
        />
      </div>
      <div className="mt-3 mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto">
        <Table borderless className="xy-0">
          <tbody>
            <tr>
              <td className="rapide2">
                <div className="mt-1">
                  <Lightning width="24" height="24" />
                  Saisie rapide{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>
                        {
                          "Ce curseur permet de renseigner toutes les matières en même temps."
                        }
                      </Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill
                      width="20"
                      height="20"
                      className="mb-1 mx-1"
                    />
                  </OverlayTrigger>{" "}
                  :
                </div>
              </td>
              <td>
                <div className="mt-0 me-2">
                  <Form.Range
                    className="form-range"
                    min="0"
                    max="4"
                    step="1"
                    value={quickScore}
                    onChange={setAllNotes}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mx-2 col-12 col-sm-11 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto">
        <Card>
          <Table striped borderless className="align-middle xy-0">
            <tbody>
              {matieres.map((matiere, index) => {
                return (
                  <MatiereEditor
                    key={matiere.nom}
                    nom={matiere.nom}
                    notes={matiere.notes}
                    semestres={semestres}
                    onChange={handleMatiereChange}
                    ref={(el) => (inputRef.current[index] = el)}
                  />
                );
              })}
            </tbody>
          </Table>
        </Card>
      </div>

      {/* New Table for scoreCDs */}
      <div className="mx-2 col-12 col-sm-11 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto mt-4">
        <Card>
          <Card.Header>Notes harmonisées par champs disciplinaires</Card.Header>
          <Table striped bordered hover className="mb-0">
            <thead>
              <tr>
                <th>Champ disciplinaire</th>
                <th className="text-end">Brut</th>
                <th className="text-end">Harmonisé</th>
              </tr>
            </thead>
            <tbody>
              {scoresCDs.map((cd) => (
                <tr key={cd.nom}>
                  <td>{cd.nom}</td>
                  <td className="text-end">
                    {cd.score === 0 ? "N/A" : cd.score.toFixed(2)}
                  </td>
                  <td className="text-end">
                    {/* Display the harmonized score */}
                    {cd.harmonizedScore === "N/A"
                      ? "N/A"
                      : cd.harmonizedScore.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default MonBilan;
