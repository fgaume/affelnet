import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import "./TrancheEditor.css";

const listeTranches = [
  {value: 0, score: 0, label: 'Moyenne...', style: 'low text-body'},
  {value: 1, score: 3, label: 'Moins de 5', style: 'low text-danger'},
  {value: 2, score: 8, label: 'Entre 5 et 9,99', style: 'middle text-danger'},
  {value: 3, score: 13, label: 'Entre 10 et 14,99', style: 'middle text-primary'},
  {value: 4, score: 16, label: '15 ou +', style: 'high text-success'}
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

const TrancheEditor = forwardRef((props, ref) => {

  const [tranche, setTranche] = useState(findTrancheFromScore(props.score));

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setTranche(findTrancheFromScore(score));
    }
  }));

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
    <tr>
      <td>{props.semestres ? 'S' : 'T'}{props.periode}</td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Range
                  id={props.id}
                  className="form-range"
                  min="0"
                  max="4"
                  step="1"
                  value={tranche ? tranche.value : 0}
                  onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td className={tranche ? tranche.style : 'low text-body'}>
                {tranche && tranche.label}     
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>)
});

export default TrancheEditor;
