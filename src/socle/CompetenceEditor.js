import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const listeCompetences = [
  {value: 0, label: 'Maitrise...', style: 'text-body'},
  {value: 120, label: 'Insuffisante', style: 'text-danger'},
  {value: 300, label: 'Fragile', style: 'text-danger'},
  {value: 480, label: 'Satisfaisante', style: 'text-primary'},
  {value: 600, label: 'Très bonne', style: 'text-success'}
];

const findCompetenceFromValue = (score) => {
  console.log("score", score);
  const found = listeCompetences.find((obj) => { return obj.value === parseInt(score)});
  return (found) ? found : listeCompetences[0];
}

const nextCompetence = (currentCompetence) => {
  console.log("currentCompetence", currentCompetence);
  let currentIndex = listeCompetences.findIndex((obj) => { return obj === currentCompetence});
  if (currentIndex === listeCompetences.length - 1) currentIndex--;
  console.log("currentIndex", currentIndex);
  return listeCompetences[currentIndex + 1];
}

const previousCompetence = (currentCompetence) => {
  console.log("currentCompetence", currentCompetence);
  let currentIndex = listeCompetences.findIndex((obj) => { return obj === currentCompetence});
  if (currentIndex === 0) currentIndex++;
  console.log("currentIndex", currentIndex);
  return listeCompetences[currentIndex - 1];
}

const CompetenceEditor = forwardRef((props, ref) => {

  const [competence, setCompetence] = useState(findCompetenceFromValue(props.score));

  const handleMore = () => {
    const newCompetence = nextCompetence(competence);
    setCompetence(newCompetence);
    props.onChange(props.nom, parseInt(newCompetence.value));
  };

  const handleLess = () => {
    const newCompetence = previousCompetence(competence);
    setCompetence(newCompetence);
    props.onChange(props.nom, parseInt(newCompetence.value));
  };

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setCompetence(findCompetenceFromValue(score));
    }
  }));

  return (
    <tr>
      <td>{props.nom}</td>
      <td className={competence ? competence.style: 'text-body'}>{competence ? competence.label: '?'}</td>
      <td>
      <ButtonGroup aria-label="edit-competence">
        <Button size="sm" variant="outline-primary" onClick={handleMore} disabled={competence && competence.value === 600}>
          <div className="fs-2">+</div>
        </Button>
        <Button size="sm" variant="outline-primary" onClick={handleLess} disabled={competence && competence.value <= 120}>
          <div className="fs-2">-</div>
        </Button>
      </ButtonGroup>
      </td>
    </tr>
  );
});

export default CompetenceEditor;
