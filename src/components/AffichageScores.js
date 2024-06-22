import React from "react";
import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { formatFloat, formatVariation } from "../services/helper";
import { QuestionCircleFill } from "react-bootstrap-icons";
import "./AffichageScores.css";
import { anneeN } from "../data/lycees";

const AffichageScores = (props) => {
  const anneeN1 = anneeN - 1;
  
  return (
    <Card>
      <Table striped borderless hover size="xl" className="mx-0 my-0">
        <tbody>
          <tr>
            <td className="text-primary score">
              <h6>
                <div className="d-flex align-items-center gap-1 justify-content-center mt-2">
                  Score {anneeN}{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>{props.tipNext}</Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </div>
              </h6>
            </td>
            <td className="text-muted score">
              <h6>
                <div className="d-flex align-items-center gap-1 justify-content-center mt-2">
                  Score {anneeN1}{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>{props.tipPrevious}</Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </div>
              </h6>
            </td>
            <td className="text-primary variation">
              <h6>
                <div className="d-flex align-items-center gap-1 justify-content-center mt-2">
                  +/-{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>{props.tipDelta}</Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </div>
              </h6>
            </td>
          </tr>
          <tr>
            <td className="text-primary score">
              <h6 className="mt-2">{formatFloat(props.scoreNext)}</h6>
            </td>
            <td className="text-muted score">
              <h6 className="mt-2">{formatFloat(props.scorePrevious)}</h6>
            </td>
            <td className="text-primary variation">
              <h6 className="mt-2">
                {props.scoreNext > 0
                  ? formatVariation(props.scoreNext - props.scorePrevious)
                  : "?"}
              </h6>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
export default AffichageScores;
