import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import "./CompetenceEditor.css";

const listeCompetences = [
  {value:0, score: 0, label: 'Maitrise...', style: 'low text-body'},
  {value:1, score: 120, label: 'Insuffisante', style: 'low text-danger'},
  {value:2, score: 300, label: 'Fragile', style: 'middle text-danger'},
  {value:3, score: 480, label: 'Satisfaisante', style: 'middle text-primary'},
  {value:4, score: 600, label: 'Très bonne', style: 'high text-success'}
];

const findCompetenceFromScore = (score) => {
  //console.log("findCompetenceFromScore", score);
  const found = listeCompetences.find((obj) => { return obj.score === parseInt(score)});
  const theCompetence = (found) ? found : listeCompetences[0];
  //console.log("theCompetence", theCompetence);
  return theCompetence;
}

const findCompetenceFromValue = (value) => {
  const found = listeCompetences.find((obj) => { return obj.value === parseInt(value)});
  return (found) ? found : listeCompetences[0];
}


const CompetenceEditor = forwardRef((props, ref) => {

  const [competence, setCompetence] = useState(findCompetenceFromScore(props.score));

  const handleChange = (event) => {
    const newValue = event.target.value;
    //console.log("new range value = ", newValue);
    const newCompetence = findCompetenceFromValue(newValue);
    //console.log("newCompetence : ", newCompetence);
    setCompetence(newCompetence);
    props.onChange(props.nom, newCompetence.score);
  };

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setCompetence(findCompetenceFromScore(score));
    }
  }));

  return (
    <tr>
      <td>{props.nom}</td>
      <td>
        <table>
          <tbody>
          <tr>
            <td>
          <Form.Range
            className="form-range"
            min="0"
            max="4"
            step="1"
            value={competence ? competence.value : 0}
            onChange={handleChange} />
            </td>
          </tr>
          <tr>  
          <td className={competence ? competence.style : 'low text-body'}>{competence ? competence.label: '?'}</td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
});

export default CompetenceEditor;
