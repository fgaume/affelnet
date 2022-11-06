import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import TrancheEditor from "./TrancheEditor";

const MatiereEditor = forwardRef((props, ref) => {

  const editeurs = props.semestres ? [0,1] : [0,1,2];

  const inputRef = useRef([]);

  useImperativeHandle(ref, () => ({
    setScore(score) {
      inputRef.current.forEach((elem) => { elem.setScore(score)});
    }
  }));

  const handleChange = (nom, periode, newNote) => {
    props.onChange(nom, periode, newNote);
  };

  return (
    <tr>
      <td>{props.nom}</td>
      <td>
        <Table className="align-middle mb-0">
            <tbody>
          {editeurs.map((index) => {
            return (
              <TrancheEditor
                id={props.nom + index}
                key={props.nom + index}
                value={props.notes[index]}
                nom={props.nom}
                periode={1+index}
                semestres={props.semestres}
                onChange={handleChange}
                ref={el => inputRef.current[index] = el}
              />
            )
          })}
          </tbody>
        </Table>
      </td>
    </tr>
  );
});

export default MatiereEditor;
