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
  listeMatieres,
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
  computeAvancementNotes,
} from "../services/bilan";
import { moyennesAcademiques, ecartsAcademiques } from "../data/stats";
import MatiereEditor from "./MatiereEditor";
import "./MonBilan.css";
import AffichageScores from "../components/AffichageScores";
import MyToggle from "../components/MyToggle";

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
    const scoreCDs = computeNoteCDs(matieres, semestres);
    const avancement = computeAvancementNotes(matieres, semestres);
    //console.log(JSON.stringify(scoreCDs));

    const scoreBPprevious = computeBilanPeriodique(
      scoreCDs,
      moyennesAcademiques.get("2022"),
      ecartsAcademiques.get("2022")
    );
    //console.log("score BP = " + formatFloat(scoreBPprevious));
    setScoreBilanPrevious(scoreBPprevious);

    const scoreBPnext = computeBilanPeriodique(
      scoreCDs,
      moyennesAcademiques.get("2023"),
      ecartsAcademiques.get("2023")
    );
    //console.log("score BP = " + formatFloat(scoreBPnext));
    setScoreBilanNext(scoreBPnext);
    
    props.onChange(scoreBPprevious, scoreBPnext, avancement);
  }, [matieres, semestres, props]);

  return (
    <div className="">
      <div className="mx-3 my-3">
        <ArrowReturnRight /> Saisir ici vos moyennes de chaque matière pour
        chaque {semestres ? "se" : "tri"}mestre. Seuls les{" "}
        <strong>intervalles</strong> de notes comptent pour votre score
        Affelnet, il est donc inutile de saisir les notes précises.
      </div>
      <div className="mx-3 my-3">
        <ArrowReturnRight /> Dans
        le cas de {semestres ? "se" : "tri"}mestre non noté, laissez le curseur à "Non noté". Si aucune note n'est présente dans l'année pour un champ disciplinaire (cas de la
        dispense annuelle d'EPS par exemple), la note harmonisée moyenne sur l'académie
        sera appliquée, c'est à dire 100.
      </div>
      <div className="mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto my-4">
        <AffichageScores
          scorePrevious={scoreBilanPrevious}
          scoreNext={scoreBilanNext}
          tipPrevious="Score de votre bilan périodique en 2021"
          tipNext="Score de votre bilan périodique en 2022"
          tipDelta="Evolution de votre bilan périodique entre 2021 et 2022"
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
    </div>
  );
};

export default MonBilan;
