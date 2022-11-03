import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import TrancheEditor from "./TrancheEditor";

const MatiereEditor = forwardRef((props, ref) => {

  const editeurs = props.semestres ? [0,1] : [0,1,2];

  const inputRef = useRef([]);

  useImperativeHandle(ref, () => ({
    setScore(score) {
      inputRef.current.forEach((elem) => { elem.setScore(score)});
    }
  }));

  const handleChange = (event) => {
    props.onChange(
      props.nom,
      parseInt(event.target.id.slice(-1)),
      parseInt(event.target.value)
    );
  };

  return (
    <tr>
      <td>{props.nom}</td>
      <td>
        <Stack gap="2">
          {editeurs.map((index) => {
            return (
              <TrancheEditor
                id={props.nom + index}
                key={props.nom + index}
                initValue={props.notes[index]}
                onChange={handleChange}
                ref={el => inputRef.current[index] = el}
              >
            </TrancheEditor>)
          })}
        </Stack>
      </td>
    </tr>
  );
});

export default MatiereEditor;
