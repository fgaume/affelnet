import React from "react";
import { Card, Row } from "react-bootstrap";

const CollegeGroup = (props) => {
  const bg =
    props.bonus === 1200
      ? "success"
      : props.bonus === 600
      ? "primary"
      : "danger";

  return (
    <Card className={"p-1 bg-opacity-10 my-3 bg-" + bg}>
      <div className="p-2 mx-3">
        <Row>
          <strong>
            Collèges à bonus {props.bonus} (~ {props.effectif} élèves soit{" "}
            {props.part})
          </strong>
        </Row>
        <Row>&nbsp;</Row>
        <ol className="bg-transparent">
          {props.colleges.map((college, index) => {
            return (
              <li key={index}>
                <a href={college.url}>{college.nom}</a> ({college.dnb_admis})
              </li>
            );
          })}
        </ol>
      </div>
    </Card>
  );
};
export default CollegeGroup;
