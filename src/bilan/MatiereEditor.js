import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Table } from "react-bootstrap";
import RangeInput from "../components/RangeInput";

const listeTranches = [
  { value: 0, score: 0, label: "Moyenne...", style: "low text-body" },
  { value: 1, score: 3, label: "Moins de 5", style: "low text-danger" },
  { value: 2, score: 8, label: "Entre 5 et 9,99", style: "middle text-danger" },
  {
    value: 3,
    score: 13,
    label: "Entre 10 et 14,99",
    style: "middle text-primary",
  },
  { value: 4, score: 16, label: "15 ou +", style: "high text-success" },
];

const MatiereEditor = forwardRef((props, ref) => {
  const editeurs = props.semestres ? [0, 1] : [0, 1, 2];

  const inputRef = useRef([]);

  useImperativeHandle(ref, () => ({
    setScore(score) {
      inputRef.current.forEach((elem) => {
        if (elem != null) elem.setScore(score);
      });
    },
  }));

  const handleChange = (nom, newNote, periode) => {
    props.onChange(nom, newNote, periode);
  };

  return (
    <tr>
      <td>{props.nom}</td>
      <td class="bg-transparent">
        <Table className="align-middle mb-0 bg-transparent">
          <tbody className="bg-transparent">
            {editeurs.map((index) => {
              return (
                <RangeInput
                  id={props.nom + index}
                  key={props.nom + index}
                  score={props.notes[index]}
                  nom={props.nom}
                  listeTranches={listeTranches}
                  label={(props.semestres ? "S" : "T") + (1 + index).toString()}
                  onChange={handleChange}
                  ref={(el) => (inputRef.current[index] = el)}
                  className="bg-transparent"
                />
              );
            })}
          </tbody>
        </Table>
      </td>
    </tr>
  );
});

export default MatiereEditor;
