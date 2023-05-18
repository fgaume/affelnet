import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Card, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { ArrowReturnRight, ArrowRight, Lightning, QuestionCircleFill } from "react-bootstrap-icons";
import { useLocalStorage } from "../services/useLocalStorage";
import {
  listeCompetences,
  computeSocleCompetences,
  updateCompetences,
  allCompetencesSetTo, computeAvancementSocle,
} from "../services/socle";
import RangeInput from "../components/RangeInput";

const valueMap = new Map([
  [0, 0],
  [1, 120],
  [2, 300],
  [3, 480],
  [4, 600]
]);
 
const tranchesCompetences = [
  {value:0, score: 0, label: 'Maitrise...', style: 'low text-body'},
  {value:1, score: 120, label: 'Insuffisante', style: 'low text-danger'},
  {value:2, score: 300, label: 'Fragile', style: 'middle text-danger'},
  {value:3, score: 480, label: 'Satisfaisante', style: 'middle text-primary'},
  {value:4, score: 600, label: 'Très bonne', style: 'high text-success'}
];


/* returns scoreSocle */
const MonSocle = (props) => {
  const [competences, setCompetences] = useLocalStorage(
    "socle/competences",
    listeCompetences
  );

  const [quickScore, setQuickScore] = useState(0);

  const inputRef = useRef([]);

  const handleCompetenceChange = (nom, newNote) => {
    setQuickScore(0);
    //console.log("handleCompetenceChange: " + nom + "/" + newNote);
    const newCompetences = updateCompetences(competences, nom, newNote);
    //console.log(JSON.stringify(newCompetences));
    setCompetences(newCompetences);
  };

  const setAllNotes = (event) => {
    //const note = parseInt(event.target.value);
    
    const value = parseInt(event.target.value);
    console.log("value = " + value);
    setQuickScore(value);
    const note = valueMap.get(value);
    console.log("note = " + value);

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
      <ArrowReturnRight /> Estimez ici les 8 compétences de socle (qui comptent également pour le Brevet). Rappel :
      <Card className="col-md-3 mx-auto mt-3">
        <ul className="mb-2 mt-2">
          <li className="text-success">
            Très bonne <ArrowRight /> 600 pts
          </li>
          <li className="text-primary">
            Satisfaisante <ArrowRight /> 480 pts
            </li>
          <li className="text-danger">
            Fragile <ArrowRight /> 300 pts
            </li>
          <li className="text-danger">
            Insuffisante <ArrowRight /> 180 pts
          </li>
        </ul>
      </Card>

      <div className="col-md-6 mx-auto my-3">
        <Table borderless className="xy-0">
          <tbody>
            <tr>
              <td>
                <Lightning width="24" height="24" /> Saisie multiple{" "}
                <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => <Tooltip {...propss}>{"Ce curseur permet de renseigner toutes les compétences à la fois."}</Tooltip>}
                    rootCloseEvent="mousedown"
                    rootClose="true">
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger> :
              </td>
              <td className='header'>
                <Form.Range
                  className="align-middle xy-0 form-range"
                  min="0"
                  max="4"
                  step="1"
                  value={quickScore}
                  onChange={setAllNotes} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="col-md-6 mx-auto">
        <Card>
          <Table striped borderless hover className="align-middle mb-0">
            <tbody>
              {competences.map((competence, index) => {
                return (
                  <RangeInput
                    id={competence.nom}
                    key={competence.nom}
                    nom={competence.nom}
                    label={competence.nom}
                    score={competence.score}
                    listeTranches={tranchesCompetences}
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
