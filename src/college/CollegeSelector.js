import React, { useRef, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Col } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import "./MesColleges.css"
import SharedContext from "../context";

const CollegeSelector = (props) => {
  const placeholder = "Saisir ici le collège de " + props.type;
  const labelCollege = "Collège de " + props.type + " :";
  const inputRef = useRef();
  //const { listeColleges } = useContext(SharedContext);
 // const listeColleges = data.listeColleges;
  const { data } = useContext(SharedContext);
  //const { listeColleges } = data;

  const onCollegeChange = (collegeUpdate) => {
    props.onChange(collegeUpdate[0]);
  };

  useEffect(() => {
    if (!props.college || props.college.length === 0) {
      inputRef.current.focus();
    }
  }, [props]);

  return (
      <Form.Group className="mb-3">
        <Row>
          <Form.Label className="ms-1">{labelCollege}</Form.Label>
        </Row>
        <Row>
          <Col>
            <Typeahead
              id={props.type}
              labelKey="nom"
              onChange={onCollegeChange}
              options={data?.listeColleges || []}
              placeholder={placeholder}
              defaultSelected={[{ nom: props.college, bonus: 0 }]}
              ref={inputRef}
              className="matiere"
            />
          </Col>
          <Col className="p-0 ms-0">
            {props.college && <CheckLg color="green" width="32" height="32" className="mt-1" />}
          </Col>
        </Row>
      </Form.Group>
  );
};
export default CollegeSelector;
