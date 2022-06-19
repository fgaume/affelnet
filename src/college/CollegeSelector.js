import React, { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";

import colleges from "../data/colleges";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Col } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";

const CollegeSelector = (props) => {
  const placeholder = "Saisir le collège de " + props.type + "...";
  const labelCollege = "Collège de " + props.type + " :";
  const inputRef = useRef();

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
        <Form.Label>{labelCollege}</Form.Label>
      </Row>
      <Row>
        <Col xs={8}>
          <Typeahead
            id={props.type}
            labelKey="nom"
            onChange={onCollegeChange}
            options={colleges}
            placeholder={placeholder}
            defaultSelected={[{ nom: props.college, bonus: 0 }]}
            ref={inputRef}
          />
        </Col>
        <Col className="p-0">
          {props.college && <CheckLg color="green" width="28" height="28" />}
        </Col>
      </Row>
    </Form.Group>
  );
};
export default CollegeSelector;
