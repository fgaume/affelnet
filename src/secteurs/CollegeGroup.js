import React, { useRef, useEffect } from "react";
import { Card, ListGroup, Row } from "react-bootstrap";

const CollegeGroup = (props) => {

  return (
    <Card className="p-1 bg-success bg-opacity-10 my-3">
    <div className="p-2 mx-3">

      <Row>
        <strong>Collèges à bonus {props.bonus} ({props.effectif} élèves soit {props.part})</strong>
      </Row>
      <Row>
        &nbsp;
      </Row>
      <ListGroup variant="flush" as="ol" numbered >
      {props.colleges.map((college, index) => {
          return (
            <ListGroup.Item key={index}>{college.nom} ({college.dnb_admis})</ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
    </Card>
  );
};
export default CollegeGroup;
