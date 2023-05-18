import React from "react";
import { Card, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import {
  ArrowDownRight,
  ArrowReturnRight,
  ArrowUpRight,
  CheckLg,
  QuestionCircleFill,
  X,
} from "react-bootstrap-icons";

import AffichageScores from "../main/AffichageScores";
import { formatVariation } from "../services/helper";
import "./LyceesSecteur.css";

const LyceesSecteur = (props) => {
  const bonusGeo = parseInt(props.bonusGeo);

  /* const determineVariationStyle = (prev, next) => {
    if (next > 0 && prev > 0) {
      return next > prev ? "variation text-danger" : "variation text-success";
    } else return "variation";
  }; */

  const determineColor = (result, lycee) => {
    if (result === null) return "text-muted";
    if (lycee.exclu) return "filtered";
    if (result) {
      return result >= 0 ? "text-success" : "text-danger";
    } else {
      return "text-muted";
    }
  };

  const getStatus = (lycee, prevResult, nextResult) => {
    if (lycee.exclu) {
      return "filtered";
    } else {
      if (lycee.seuils[1] > 0) {
        return nextResult > 0 ? "admissible" : "elimine";
      }
      if (lycee.seuils[0] > 0) {
        return prevResult > 0 ? "admissible" : "elimine";
      }
      return "inconnu";
    }
  };

  return (
    <>
    <div className="mx-3 my-3 mt-3 mb-3"><ArrowReturnRight /> Cette section indique les lycées de <strong>secteur {props.secteur}</strong> que vous auriez obtenus,
    ou pas, dans les conditions de 2021 et 2022,
    et compte tenu des résultats scolaires actuels. Les lycées où votre score aurait été suffisant sont en vert.
    </div>
    <div className="mx-3 my-3 mt-3 mb-3"><ArrowReturnRight /> Si
    vous imposez des spécialités (switches plus haut), les lycées ne proposant pas l'ensemble des spécialités demandées seront barrés.
    Recoupez avec la fiche descriptive le cas échéant en cliquant sur le nom du lycée pour être certains des spécialités proposées, ainsi que de leur combinatoire autorisée.
    </div>
      <div className="my-3">
        <AffichageScores
          scorePrevious={props.scorePrevious + bonusGeo}
          scoreNext={props.scoreNext > 0 ? bonusGeo + props.scoreNext : 0}
          tipPrevious={"Votre score affelnet pour un voeu de lycée de secteur " + props.secteur + " en 2021"}
          tipNext={"Votre score affelnet pour un voeu de lycée de secteur " + props.secteur + " en 2022"}
          tipDelta={"Différence de score affelnet pour un voeu de lycée de secteur " + props.secteur + " entre 2021 et 2022"}  
        />
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 mx-auto">
        <Card className="mb-0">
          <Table striped borderless hover responsive="xl" className="mb-0">
            <thead>
              <tr>
                <th className="lycee">Lycée{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => <Tooltip {...propss}>{"Lycée de secteur " + props.secteur + " avec le lien vers sa fiche descriptive"}</Tooltip>}
                    rootCloseEvent="mousedown"
                    rootClose="true">
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </th>
                <th className="seuil">En 2021{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => <Tooltip {...propss}>{"Différence entre mon score et le seuil d'admission au lycée en 2021"}</Tooltip>}
                    rootCloseEvent="mousedown"
                    rootClose="true">
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </th>
                <th className="seuil">En 2022{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => <Tooltip {...propss}>{"Différence entre mon score et le seuil d'admission au lycée en 2022"}</Tooltip>}
                    rootCloseEvent="mousedown"
                    rootClose="true">
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </th>
                <th className="variation">+/-{" "}
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={(propss) => <Tooltip {...propss}>{"Evolution de la différence entre mon score et le seuil d'admission au lycée entre 2021 et 2022"}</Tooltip>}
                    rootCloseEvent="mousedown"
                    rootClose="true">
                    <QuestionCircleFill width="20" height="20" />
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.lycees.map((lycee, index) => {
                const prevResult =
                  lycee.seuils[0] > 0
                    ? parseInt(props.scorePrevious + bonusGeo - lycee.seuils[0])
                    : null;
                const nextResult =
                  lycee.seuils[1] > 0 && props.scoreNext > 0
                    ? parseInt(props.scoreNext + bonusGeo - lycee.seuils[1])
                    : null;
                const status = getStatus(lycee, prevResult, nextResult);
                return (
                  <tr key={lycee.code + index}>
                    <td>
                      <a className={status} target="_blank" rel="noreferrer" href={lycee.url}>{lycee.nom}</a>
                      {status === "admissible" && (
                        <CheckLg color="green" width="20" height="20" />
                      )}
                      {status === "elimine" && (
                        <X color="red" width="20" height="20" />
                      )}
                    </td>
                    <td className="seuil">
                      <span className={determineColor(prevResult, lycee)}>
                        {lycee.seuils[0] > 0
                          ? formatVariation(prevResult)
                          : "?"}
                      </span>
                    </td>
                    <td className="seuil">
                      <span className={determineColor(nextResult, lycee)}>
                        {lycee.seuils[1] > 0 && nextResult
                          ? formatVariation(nextResult)
                          : "?"}
                      </span>
                    </td>
                    <td className="variation">
                      <span
                        className={determineColor(nextResult - prevResult, lycee)}
                      >
                        {prevResult &&
                          nextResult &&
                          formatVariation(nextResult - prevResult)}{" "}
                        {prevResult &&
                          nextResult &&
                          (nextResult > prevResult ? (
                            <ArrowUpRight />
                          ) : (
                            <ArrowDownRight />
                          ))}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default LyceesSecteur;
