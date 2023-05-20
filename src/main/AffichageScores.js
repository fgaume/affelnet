import React from "react";
import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { formatFloat, formatVariation } from "../services/helper";
import { QuestionCircleFill } from "react-bootstrap-icons";

const AffichageScores = (props) => {

  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 mx-auto">
      <Card className="mx-0 my-0 mt-0 mb-0">
      <Table striped borderless hover size="xl" className="mx-0 my-0 mt-0 mb-0">
        <tbody>
          <tr>
            <td className="text-muted score">
              <h6>Score 2021 {" "}
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={(propss) => <Tooltip {...propss}>{props.tipPrevious}</Tooltip>}
                rootCloseEvent="mousedown"
                rootClose="true">
                <QuestionCircleFill width="20" height="20" />
            </OverlayTrigger>
              </h6>
            </td>
            <td className="text-primary score" >
              <h6>Score 2022 {" "}
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={(propss) => <Tooltip {...propss}>{props.tipNext}</Tooltip>}
                rootCloseEvent="mousedown"
                rootClose="true">
                <QuestionCircleFill width="20" height="20" />
            </OverlayTrigger>
            </h6>
            </td>
            <td className="text-primary variation">
              <h6>+/-
              {" "}
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={(propss) => <Tooltip {...propss}>{props.tipDelta}</Tooltip>}
                rootCloseEvent="mousedown"
                rootClose="true">
                <QuestionCircleFill width="20" height="20" />
            </OverlayTrigger>
              </h6>
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
