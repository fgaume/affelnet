import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const listeTranches = [
  {value: 0, label: 'Moyenne...', style: 'text-body'},
  {value: 3, label: 'Moins de 5', style: 'text-danger'},
  {value: 8, label: 'Entre 5 et 9,99', style: 'text-danger'},
  {value: 13, label: 'Entre 10 et 14,99', style: 'text-primary'},
  {value: 16, label: '15 ou +', style: 'text-success'}
];

const findTrancheFromValue = (score) => {
  console.log("score", score);
  const found = listeTranches.find((obj) => { return obj.value === parseInt(score)});
  return (found) ? found : listeTranches[0];
}

const nextTranche = (currentTranche) => {
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
}

const TrancheEditor = forwardRef((props, ref) => {

  const [tranche, setTranche] = useState(findTrancheFromValue(props.initValue));

  useImperativeHandle(ref, () => ({
    setScore(score) {
      setTranche(findTrancheFromValue(score));
    }
  }));

  const handleMore = () => {
    const newTranche = nextTranche(tranche);
    setTranche(newTranche);
    props.onChange(props.nom, parseInt(newTranche.value));
  };

  const handleLess = () => {
    const newTranche = previousTranche(tranche);
    setTranche(newTranche);
    props.onChange(props.nom, parseInt(newTranche.value));
  };

  const handleChange = (event) => {
    props.onChange(
      props.nom,
      parseInt(event.target.id.slice(-1)),
      parseInt(event.target.value)
    );
  };

  return (
    <div
      type="number"
      id={props.id}
      key={props.key}
      aria-label={props.key}
      className={tranche.style}
    >
      {tranche.label}
    </div>)
});

export default TrancheEditor;
