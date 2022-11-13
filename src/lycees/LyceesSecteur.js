import React from "react";
import { Card, Table } from "react-bootstrap";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckLg,
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
      <div className="my-3">
        <AffichageScores
          scorePrevious={props.scorePrevious + bonusGeo}
          scoreNext={props.scoreNext > 0 ? bonusGeo + props.scoreNext : 0}
        />
      </div>
      <div className="col-md-6 mx-auto">
        <Card className="mb-0">
          <Table striped borderless hover className="mb-0">
            <thead>
              <tr>
                <th className="lycee">Lycée</th>
                <th className="seuil">En 2021</th>
                <th className="seuil">En 2022</th>
                <th className="variation">+/-</th>
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
                      <span className={status}>{lycee.nom}</span>
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
                        className={determineColor(
                          nextResult - prevResult,
                          lycee
                        )}
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
