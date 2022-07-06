import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const MatiereEditor = (props) => {

  const editeurs = props.semestres ? [0,1] : [0,1,2];

  const handleChange = (event) => {
    props.onChange(
      props.nom,
      parseInt(event.target.id.slice(-1)),
      parseInt(event.target.value)
    );
  };

  const getClassName = (id) => {
    if (document.getElementById(id) && document.getElementById(id).value) {
      const value = document.getElementById(id).value;
      switch (value) {
        case "3":
          return "text-danger";
        case "8":
          return "text-danger";
        case "13":
          return "text-primary";
        case "16":
          return "text-success";
        default:
          return "text-body";
      }
    } else return "text-body";
  };

  return (
    <tr>
      <td>{props.nom}</td>
      <td>
        <Stack gap="2">
          {editeurs.map((index) => {
            return (
            <Form.Select
            type="number"
            id={props.nom + index}
            key={props.nom + index}
            size="sm"
            defaultValue={props.notes[index]}
            aria-label={props.nom}
            onChange={handleChange}
            className={getClassName(props.nom + index)}
          >
            <option value="0">Moyenne ...</option>
            <option value="16">15 ou +</option>
            <option value="13">Entre 10 et 14,99</option>
            <option value="8">Entre 5 et 9,99</option>
            <option value="3">Moins de 5</option>
          </Form.Select>)
          })}
        </Stack>
      </td>
    </tr>
  );
};

export default MatiereEditor;
