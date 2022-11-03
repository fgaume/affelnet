import React, { useRef } from "react";
import { useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Lightning } from "react-bootstrap-icons";
import { useLocalStorage } from "../services/useLocalStorage";
import {
  listeCompetences,
  computeSocleCompetences,
  updateCompetences,
  allCompetencesSetTo, computeAvancementSocle,
} from "../services/socle";
import CompetenceEditor from "./CompetenceEditor";

/* returns scoreSocle */
const MonSocle = (props) => {
  const [competences, setCompetences] = useLocalStorage(
    "socle/competences",
    listeCompetences
  );

  const inputRef = useRef([]);

  const handleCompetenceChange = (nom, newNote) => {
    //console.log("handleCompetenceChange: " + nom + "/" + newNote);
    const newCompetences = updateCompetences(competences, nom, newNote);
    //console.log(JSON.stringify(newCompetences));
    setCompetences(newCompetences);
  };

  const setAllNotes = (event) => {
    const note = parseInt(event.target.value);
    inputRef.current.forEach((elem) => { elem.setScore(note)});
    setCompetences(allCompetencesSetTo(note));
  };

  useEffect(() => {
    const newScore = computeSocleCompetences(competences);
    const newAvancement = computeAvancementSocle(competences);
    props.onChange(newScore, newAvancement);
  }, [competences, props]);

  return (
    <div>
      <div className="col-md-6 mx-auto my-3">
        <span>Saisie rapide : </span>
        <Button
          variant="outline-danger"
          size="sm"
          value="120"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> minimum
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          size="sm"
          value="480"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> moyen
        </Button>
        &nbsp;
        <Button
          variant="outline-success"
          size="sm"
          value="600"
          onClick={setAllNotes}
        >
          <Lightning width="20" height="20" /> maximum
        </Button>
      </div>
      <div className="col-md-6 mx-auto">
        <Card>
          <Table striped borderless hover className="align-middle mb-0">
            <tbody>
              {competences.map((competence, index) => {
                return (
                  <CompetenceEditor
                    key={competence.nom}
                    nom={competence.nom}
                    score={competence.score}
                    onChange={handleCompetenceChange}
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

export default MonSocle;
