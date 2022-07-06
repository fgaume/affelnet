import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { Lightning } from "react-bootstrap-icons";
import { useLocalStorage } from "../services/useLocalStorage";
import {
  listeMatieres,
  computeNoteCDs,
  computeBilanPeriodique,
  updateMatieres,
  allMatiereSetTo,
} from "../services/bilan";
import { moyennesAcademiques, ecartsAcademiques } from "../data/stats";
import MatiereEditor from "./MatiereEditor";
import "./MonBilan.css";
import AffichageScores from "../main/AffichageScores";

/* returns scoreBilanPrevious and scoreBilanNext */
const MonBilan = (props) => {

  const [semestres, setSemestres] = useLocalStorage("semestres", false);
  const [matieres, setMatieres] = useLocalStorage(
    "bilan_periodique/matieres",
    listeMatieres
  );
  const [scoreBilanPrevious, setScoreBilanPrevious] = useState(0);
  const [scoreBilanNext, setScoreBilanNext] = useState(0);

  const handleMatiereChange = (nom, periode, newNote) => {
    //console.log("handleMatiereChange: " + nom + "/" + periode + "/" + newNote);
    const newMatieres = updateMatieres(matieres, nom, periode, newNote);
    //console.log(JSON.stringify(newMatieres));
    setMatieres(newMatieres);
  };

  const handleChangeCheck = (event) => {
    setSemestres(event.target.checked);
  };

  const setAllNotes = (event) => {
    const note = parseInt(event.target.value);
    //console.log("note = " + note);
    listeMatieres.forEach((matiere) => {
      document.getElementById(matiere.nom + "0").value = note;
      document.getElementById(matiere.nom + "1").value = note;
      if (!semestres) document.getElementById(matiere.nom + "2").value = note;
    });
    setMatieres(allMatiereSetTo(note, semestres));
  };

  useEffect(() => {
    const scoreCDs = computeNoteCDs(matieres, semestres);
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
    props.onChange(scoreBPprevious, scoreBPnext);
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
        <span>Saisie rapide : </span>
        <Button
          variant="outline-danger"
          size="sm"
          value="3"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> minimum
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          size="sm"
          value="13"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> moyen
        </Button>
        &nbsp;
        <Button
          variant="outline-success"
          size="sm"
          value="16"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> maximum
        </Button>
      </div>
      <div className="col-md-6 mx-auto">
        <Card className="mb-0">
          <Table striped borderless className="mb-0">
            <tbody>
              {matieres.map((matiere) => {
                return (
                  <MatiereEditor
                    key={matiere.nom}
                    nom={matiere.nom}
                    notes={matiere.notes}
                    semestres={semestres}
                    onChange={handleMatiereChange}
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
