import React, { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";

import { listeLycees } from "../data/lycees";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Col } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";

const LyceeSelector = (props) => {
  const placeholder = "Saisir le lycée ...";
  const labelLycee = "Lycée :";
  const inputRef = useRef();

  const onLyceeChange = (lyceeUpdate) => {
    props.onChange(lyceeUpdate[0]);
  };

  useEffect(() => {
    if (!props.lycee || props.lycee.length === 0) {
      inputRef.current.focus();
    }
  }, [props]);

  return (
    <Form.Group className="mb-3">
      <Col>
        <Form.Label>{labelLycee}</Form.Label>
      </Col>
      <Row>
        <Col xs={8}>
          <Typeahead
            id="secteurs"
            labelKey="nom"
            onChange={onLyceeChange}
            options={listeLycees}
            placeholder={placeholder}
            ref={inputRef}
          />
        </Col>
        <Col className="p-0">
          {props.lycee && <CheckLg color="green" width="28" height="28" />}
        </Col>
      </Row>
    </Form.Group>
  );
};
export default LyceeSelector;
