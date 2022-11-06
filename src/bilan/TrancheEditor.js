import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
//import "./TrancheEditor.css";


const listeTranches = [
  {value: 0, score: 0, label: 'Moyenne...', style: 'text-body'},
  {value: 1, score: 3, label: 'Moins de 5', style: 'text-danger'},
  {value: 2, score: 8, label: 'Entre 5 et 9,99', style: 'text-danger'},
  {value: 3, score: 13, label: 'Entre 10 et 14,99', style: 'text-primary'},
  {value: 4, score: 16, label: '15 ou +', style: 'text-success'}
];

const findTrancheFromScore = (score) => {
  //console.log("findTrancheFromScore", score);
  const found = listeTranches.find((obj) => { return obj.score === parseInt(score)});
  const theTranche = (found) ? found : listeTranches[0];
  //console.log("theTranche", theTranche);
  return theTranche;
}

const findTrancheFromValue = (value) => {
  //console.log("value", value);
  const found = listeTranches.find((obj) => { return obj.value === parseInt(value)});
  return (found) ? found : listeTranches[0];
}

/* const nextTranche = (currentTranche) => {
  console.log("currentTranche", currentTranche);
  let currentIndex = listeTranches.findIndex((obj) => { return obj === currentTranche});
  if (currentIndex === listeTranches.length - 1) currentIndex--;
  console.log("currentIndex", currentIndex);
  return listeTranches[currentIndex + 1];
}

const previousTranche = (currentTranche) => {
  console.log("currentTranche", currentTranche);
  let currentIndex = listeTranches.findIndex((obj) => { return obj === currentTranche});
  if (currentIndex === 0) currentIndex++;
  console.log("currentIndex", currentIndex);
  return listeTranches[currentIndex - 1];
} */

const TrancheEditor = forwardRef((props, ref) => {

  const [tranche, setTranche] = useState(findTrancheFromScore(props.value));

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setTranche(findTrancheFromScore(score));
    }
  }));

  /* const handleMore = () => {
    const newTranche = nextTranche(tranche);
    setTranche(newTranche);
    props.onChange(props.nom, parseInt(newTranche.value));
  };

  const handleLess = () => {
    const newTranche = previousTranche(tranche);
    setTranche(newTranche);
    props.onChange(props.nom, parseInt(newTranche.value));
  }; */

  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log("new range value = ", newValue);
    const periode = event.target.id.slice(-1);
    //const periode = event.target.id;
    console.log("new range value for periode : ", periode);
    const newTranche = findTrancheFromValue(event.target.value);
    console.log("new tranche : ", newTranche);
    setTranche(newTranche);
    props.onChange(
      props.nom,
      parseInt(periode),
      newTranche.score
    );
  };

  return (
    <tr><td>{props.semestres ? 'S' : 'T'}{props.periode}</td>
      <td>
        <div className={tranche ? tranche.style : 'text-body'}>
          {tranche && tranche.label}     
        </div>
      </td>
      <td>
        <div>
          <Form.Range
            id={props.id}
            //key={props.key}
            //aria-label={props.key}
            className="form-range"
            min="0"
            max="4"
            step="1"
            value={tranche ? tranche.value : 0}
            onChange={handleChange} />
        </div>
      </td>
    </tr>)
});

export default TrancheEditor;
