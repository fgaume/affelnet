import React from "react";
import { Alert } from "react-bootstrap";
import { ArrowReturnRight } from "react-bootstrap-icons";
import SeuilEditor from "./SeuilEditor";

const MesContributions = (props) => {

  const onSeuilUpdated = (lyceeId, updatedSeuil) => {
    console.log("MesContributions.onSeuilUpdated : " + lyceeId + ": ", updatedSeuil);
    props.onSeuilUpdated(lyceeId, updatedSeuil);
  };

  return (
    <>
      {props.contrib === true && (
        <>
          <div className="mx-auto my-3">
            <Alert variant="success" className="mb-4">
              <ArrowReturnRight /> Cette section vous permet de{" "}
              <strong>contribuer</strong> à cet outil en
              saisissant les données indispensables à son fonctionnement : les
              seuils d'admission aux lycées et les données statistiques
              nécessaires au calcul du score Affelnet. Ces données se retrouvent
              facilement sur votre fiche barème qu'il faut demander début
              juillet par email à :{" "}
              <a href="mailto:ce.dve@ac-paris.fr" aria-label="Lien mail DVE">
                ce.dve@ac-paris.fr
              </a>
            </Alert>
          </div>
          <div className="mx-2 mb-4 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto">
            <SeuilEditor
              nomCollegeScolarisation={props.nomCollegeScolarisation}
              onSeuilUpdated={onSeuilUpdated}
            />
          </div>
        </>
      )}
    </>
  );
};
export default MesContributions;

/*
          <hr />
          <StatsChamps
            nomCollegeScolarisation={props.nomCollegeScolarisation}
          />
*/