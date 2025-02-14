import React from "react";
import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import {
  ArrowReturnRight,
  CheckLg,
  Gift,
  QuestionCircleFill,
  X,
} from "react-bootstrap-icons";

import AffichageScores from "../components/AffichageScores";
import { formatVariation } from "../services/helper";
import "./LyceesSecteur.css";

const computeResult = (
  secteur,
//  codeLycee,
  annee,
  scoreMax,
  scoreVoeu,
  seuilAdmission,
  bonusExceptionnel
) => {
  const result =
    seuilAdmission > 0 && scoreVoeu > 0
      ? Math.round(scoreVoeu - seuilAdmission)
      : null;
  return hasBonusExceptionnel(
    secteur,
//    codeLycee,
    annee,
    scoreMax,
    scoreVoeu,
    seuilAdmission,
    bonusExceptionnel
  )
    ? 500 + result
    : result;
};

const hasBonusExceptionnel = (
  secteur,
  annee,
  scoreMax,
  scoreVoeu,
  seuilAdmission,
  bonusExceptionnel
) => {
  const result =
    seuilAdmission > 0 && scoreVoeu > 0
      ? Math.round(scoreVoeu - seuilAdmission)
      : null;
  return (
    bonusExceptionnel === true &&
    secteur === "1" &&
    result < 0 &&
    annee > 2023 &&
    Math.abs(scoreVoeu - scoreMax) < 0.01
  );
};

const getStatus = (lycee, nextResult, prevResult) => {
  if (lycee.exclu) {
    return "filtered";
  } else {
    if (lycee.seuilRecent > 0) {
      return nextResult >= 0 ? "admissible" : "elimine";
    }
    if (lycee.seuilPrecedent > 0) {
      return prevResult >= 0 ? "admissible" : "elimine";
    }
    return "inconnu";
  }
};

const determineColor = (result, lycee) => {
  if (result === null) return "text-muted";
  if (result === 0) return "text-success";
  if (lycee.exclu) return "filtered";
  if (result) {
    return result >= 0 ? "text-success" : "text-danger";
  } else {
    return "text-muted";
  }
};

const LyceesSecteur = (props) => {
  const anneeN1 = props.anneeN - 1;
  //console.log("props : ", props);

  return (
    <div>
      <div className="mx-3 my-3 mt-3 mb-3">
        <ArrowReturnRight /> Cette section indique votre score Affelnet de{" "}
        <strong>secteur {props.secteur}</strong> ainsi que les lycées de{" "}
        <strong>secteur {props.secteur}</strong> que vous auriez obtenus, ou
        pas, dans les conditions des années précédentes, compte tenu des
        résultats scolaires actuels. Les lycées pour lesquels votre score aurait
        été suffisant sont en vert. Les 2 autres onglets ci-dessus afficheront
        les lycées des 2 autres secteurs.
      </div>
      <div className="mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto mb-4">
        <AffichageScores
          scorePrevious={props.scorePrevious + props.bonusGeo}
          scoreNext={props.scoreNext > 0 ? props.bonusGeo + props.scoreNext : 0}
          tipPrevious={
            "Votre score affelnet pour un voeu de lycée de secteur " +
            props.secteur +
            " en " +
            anneeN1
          }
          tipNext={
            "Votre score affelnet pour un voeu de lycée de secteur " +
            props.secteur +
            " en " +
            props.anneeN
          }
          tipDelta={
            "Différence de score affelnet pour un voeu de lycée de secteur " +
            props.secteur +
            " entre les 2 dernières années"
          }
          anneeN={props.anneeN}
          anneeN1={props.anneeN - 1}
        />
      </div>
      <div className="mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto">
        <Card className="mb-0">
          <Table striped borderless hover responsive="xl" className="mb-0">
            <thead>
              <tr>
                <th>
                  Lycée{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>
                        {"Lycée de secteur " +
                          props.secteur +
                          " avec le lien vers sa fiche descriptive"}
                      </Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill
                      width="20"
                      height="20"
                      className="mb-1"
                    />
                  </OverlayTrigger>
                </th>
                <th className="resu">
                  En {props.anneeN}{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>
                        {"Différence entre mon score et le seuil d'admission au lycée en " +
                          props.anneeN}
                      </Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill
                      width="20"
                      height="20"
                      className="mb-1"
                    />
                  </OverlayTrigger>
                </th>
                <th className="resu">
                  En {anneeN1}{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => (
                      <Tooltip {...propss}>
                        {"Différence entre mon score et le seuil d'admission au lycée en " +
                          anneeN1}
                      </Tooltip>
                    )}
                    rootCloseEvent="mousedown"
                    rootClose="true"
                  >
                    <QuestionCircleFill
                      width="20"
                      height="20"
                      className="mb-1"
                    />
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.lycees.map((lycee, index) => {
                const prevResult = computeResult(
                  props.secteur,
//                  lycee.code,
                  props.anneeN - 1,
                  props.scoreMax + props.bonusGeo,
                  props.scorePrevious + props.bonusGeo,
                  lycee.seuilPrecedent,
                  props.bonusExceptionnel
                );
                const nextResult = computeResult(
                  props.secteur,
//                  lycee.code,
                  props.anneeN,
                  props.scoreMax + props.bonusGeo,
                  props.scoreNext + props.bonusGeo,
                  lycee.seuilRecent,
                  props.bonusExceptionnel
                );
                const status = getStatus(lycee, nextResult, prevResult);
                const bonusExceptionnel = hasBonusExceptionnel(
                  props.secteur,
//                  lycee.code,
                  props.anneeN,
                  props.scoreMax + props.bonusGeo,
                  props.scoreNext + props.bonusGeo,
                  lycee.seuilRecent,
                  props.bonusExceptionnel
                );
                return (
                  <tr key={lycee.code + index}>
                    <td>
                      <a
                        className={status}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Lien vers la fiche FCPE du lycée"
                        href={lycee.url}
                      >
                        {lycee.nom}
                      </a>
                      {status === "admissible" && (
                        <CheckLg
                          className="text-success mb-1"
                          width="22"
                          height="22"
                        />
                      )}
                      {status === "elimine" && (
                        <X
                          className="text-danger mb-1"
                          width="24"
                          height="24"
                        />
                      )}
                    </td>
                    <td className="resu">
                      <span className={determineColor(nextResult, lycee)}>
                        {lycee.seuilRecent > 0
                          ? formatVariation(nextResult)
                          : "?"}{" "}
                      </span>
                      {bonusExceptionnel === true && (
                        <Gift
                          className="text-success mb-1"
                          width="14"
                          height="14"
                        />
                      )}
                    </td>
                    <td className="resu">
                      <span className={determineColor(prevResult, lycee)}>
                        {lycee.seuilPrecedent > 0
                          ? formatVariation(prevResult)
                          : "?"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default LyceesSecteur;
