import React from "react";
import { Card, Table } from "react-bootstrap";
import { formatFloat, formatVariation } from "../services/helper";

const AffichageScores = (props) => {
  return (
    <div className="col-md-6 mx-auto py-3">
      <Card className="mb-0">
      <Table striped borderless hover size="xl" className="mb-0">
        <tbody>
          <tr>
            <td className="text-muted score">
              <h6>Score 2021</h6>
            </td>
            <td className="text-primary score">
              <h6>Score 2022</h6>
            </td>
            <td className="text-primary variation">
              <h6>+/-</h6>
            </td>
          </tr>
          <tr>
            <td className="text-muted score">
              <h6>{formatFloat(props.scorePrevious)}</h6>
            </td>
            <td className="text-primary score">
              <h6>{formatFloat(props.scoreNext)}</h6>
            </td>
            <td className="text-primary variation">
              <h6>{props.scoreNext > 0 ? formatVariation(props.scoreNext - props.scorePrevious) : '?'}</h6>
            </td>
          </tr>
        </tbody>
      </Table>
      </Card>
    </div>
  );
};
export default AffichageScores;
