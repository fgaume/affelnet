import React from "react";
import Form from "react-bootstrap/Form";

const CompetenceEditor = (props) => {
  const handleChange = (event) => {
    //console.log("targetid=" + event.target.id);
    //console.log("target value=" + event.target.value);
    props.onChange(props.nom, parseInt(event.target.value));
  };

  const getClassName = (id) => {
    if (document.getElementById(id) && document.getElementById(id).value) {
      const value = document.getElementById(id).value;
      switch (value) {
        case "120":
          return "text-danger";
        case "300":
          return "text-danger";
        case "480":
          return "text-primary";
        case "600":
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
        <Form.Select
          type="number"
          id={props.nom}
          key={props.nom}
          size="sm"
          defaultValue={props.score}
          aria-label={props.nom}
          onChange={handleChange}
          className={getClassName(props.nom)}
        >
          <option value="0">Maitrise ...</option>
          <option value="600">Très bonne</option>
          <option value="480">Satisfaisante</option>
          <option value="300">Fragile</option>
          <option value="120">Insuffisante</option>
        </Form.Select>
      </td>
    </tr>
  );
};

export default CompetenceEditor;
