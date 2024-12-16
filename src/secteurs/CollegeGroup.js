import React from "react";
import { Card, Row } from "react-bootstrap";

const CollegeGroup = (props) => {
  const bg =
    props.bonus === 1200
      ? "success"
      : props.bonus === 600
      ? "primary"
      : "danger";

  const bonusColor =
    props.bonus === 1200
      ? "#008001"
      : props.bonus === 600
      ? "#0C6FFD"
      : "#FB824A";

  return (
    <Card className={"p-1 bg-opacity-10 my-3 bg-" + bg}>
      <div className="p-2 mx-3">
        <Row>
          <strong>
            Collèges à bonus{" "}
            <span
              style={{
                backgroundColor: bonusColor,
                color: "white",
                borderRadius: "8px",
                padding: "3px 5px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.bonus}
            </span>
            &nbsp;(~ {props.effectif} élèves soit {props.part})
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
