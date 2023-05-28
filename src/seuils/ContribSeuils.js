import React from "react";
import SeuilEditor from "./SeuilEditor";
import { Alert } from "react-bootstrap";

const ContribSeuils = (props) => {
  return (
    <>
      {props.contrib === true && (
        <>
          <div className="mx-auto mt-3">
          <hr />
            <Alert variant="success">
              Afin d'en faire profiter la communauté, ajoutez ci-dessous les seuils
              d'admission des lycées que vous avez demandés cette année.
              <br /> Il s'agit du score du dernier entrant non boursier, fourni
              dans la dernière colonne de votre fiche barème à demander au
              Rectorat dès le 1er juillet à l'adresse email :{" "}
              <a href="mailto:ce.dve@ac-paris.fr">ce.dve@ac-paris.fr</a>
            </Alert>
          </div>
          <div className="mx-auto">
            <SeuilEditor />
          </div>
        </>
      )}
    </>
  );
};
export default ContribSeuils;
