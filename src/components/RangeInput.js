import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import "./RangeInput.css";

const RangeInput = forwardRef((props, ref) => {
  const findTrancheFromScore = (score) => {
    //console.log("findTrancheFromScore", score);
    const found = props.listeTranches.find((obj) => {
      return obj.score === parseInt(score);
    });
    const theTranche = found ? found : props.listeTranches[0];
    //console.log("theTranche", theTranche);
    return theTranche;
  };

  const findTrancheFromValue = (value) => {
    //console.log("value", value);
    const found = props.listeTranches.find((obj) => {
      return obj.value === parseInt(value);
    });
    return found ? found : props.listeTranches[0];
  };

  const [tranche, setTranche] = useState(findTrancheFromScore(props.score));

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setTranche(findTrancheFromScore(score));
    },
  }));

  const handleChange = (event) => {
    //const newValue = event.target.value;
    //console.log("new range value = ", newValue);
    const periode = event.target.id.slice(-1);
    //console.log("new range value for periode : ", periode);
    const newTranche = findTrancheFromValue(event.target.value);
    //console.log("new tranche : ", newTranche);
    setTranche(newTranche);
    props.onChange(props.nom, newTranche.score, parseInt(periode));
  };

  return (
    <tr>
      <td className={props.labelClassName}>{props.label}</td>
      <td className="bg-transparent">
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
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className={tranche ? tranche.style : "low text-body"}>
                {tranche && tranche.label}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
});

export default RangeInput;
