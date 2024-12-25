import React, { useRef, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Typeahead } from "react-bootstrap-typeahead";

//import { listeLycees } from "../data/lycees";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Col } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import SharedContext from "../context";

const LyceeSelector = (props) => {
  const placeholder = "Saisir ici le lycée ...";
  const labelLycee = "Lycée :";
  const inputRef = useRef();
  const { data } = useContext(SharedContext);
  //const { listeLycees } = data;
  //const listeLycees = data.listeLycees;

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
        <Form.Label className="ms-1">{labelLycee}</Form.Label>
      </Col>
      <Row>
        <Col xs={8}>
          <Typeahead
            id="secteurs"
            labelKey="nom"
            onChange={onLyceeChange}
            options={data?.listeLycees || []}
            placeholder={placeholder}
            ref={inputRef}
          />
        </Col>
        <Col className="p-0">
          {props.lycee && <CheckLg color="green" width="32" height="32" className="mt-1" />}
        </Col>
      </Row>
    </Form.Group>
  );
};
export default LyceeSelector;
