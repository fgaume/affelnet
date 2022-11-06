import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Button, Card, Form, Stack, Table } from "react-bootstrap";
import { Lightning } from "react-bootstrap-icons";
import { useLocalStorage } from "../services/useLocalStorage";
import {
  listeMatieres,
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo, computeAvancementNotes,
} from "../services/bilan";
import { moyennesAcademiques, ecartsAcademiques } from "../data/stats";
import MatiereEditor from "./MatiereEditor";
import "./MonBilan.css";
import AffichageScores from "../main/AffichageScores";

const valueMap = new Map([
  [0, 0],
  [1, 3],
  [2, 8],
  [3, 13],
  [4, 16]
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

  const inputRef = useRef([]);


  const handleMatiereChange = (nom, periode, newNote) => {
    console.log("handleMatiereChange: " + nom + "/" + periode + "/" + newNote);
    const newMatieres = updateMatieres(matieres, nom, periode, newNote);
    //console.log(JSON.stringify(newMatieres));
    setMatieres(newMatieres);
  };

  const handleChangeCheck = (event) => {
    setSemestres(event.target.checked);
  };

  const setAllNotes = (event) => {
    const value = parseInt(event.target.value);
    console.log("value = " + value);
    const note = valueMap.get(value);
    console.log("note = " + value);
    /* listeMatieres.forEach((matiere) => {
      document.getElementById(matiere.nom + "0").value = note;
      document.getElementById(matiere.nom + "1").value = note;
      if (!semestres) document.getElementById(matiere.nom + "2").value = note;
    }); */

    inputRef.current.forEach((elem) => { elem.setScore(note)});
    setMatieres(allMatiereSetTo(note, semestres));
  };

  useEffect(() => {
    const scoreCDs = computeNoteCDs(matieres, semestres);
    const avancement = computeAvancementNotes(matieres, semestres);
    //console.log(JSON.stringify(scoreCDs));
    const scoreBPprevious = computeBilanPeriodique(
      scoreCDs,
      moyennesAcademiques.get("2021"),
      ecartsAcademiques.get("2021")
    );
    //console.log("score BP = " + formatFloat(scoreBPprevious));
    setScoreBilanPrevious(scoreBPprevious);
    const scoreBPnext = computeBilanPeriodique(
      scoreCDs,
      moyennesAcademiques.get("2022"),
      ecartsAcademiques.get("2022")
    );
    //console.log("score BP = " + formatFloat(scoreBPnext));
    setScoreBilanNext(scoreBPnext);
    props.onChange(scoreBPprevious, scoreBPnext, avancement);
  }, [matieres, semestres, props]);

  return (
    <div>
      <AffichageScores
        scorePrevious={scoreBilanPrevious}
        scoreNext={scoreBilanNext}
      />
      <div className="col-md-6 mx-auto my-3">
        <Form.Switch
          id="semestres"
          label="Collège en semestres"
          defaultChecked={semestres}
          onChange={handleChangeCheck}
        />
      </div>
      <div className="col-md-6 mx-auto my-3">
        <Table borderless className="xy-0">
          <tbody>
            <tr>
              <td >Saisie rapide : </td>
              <td>
                <Form.Range
                  //id={props.id}
                  //key={props.key}
                  //aria-label={props.key}
                  className="align-middle xy-0 form-range"
                  min="0"
                  max="4"
                  step="1"
                  //value={tranche ? tranche.value : 0}
                  defaultValue="0"
                  onChange={setAllNotes} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="col-md-6 mx-auto">
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
                    ref={el => inputRef.current[index] = el}
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
