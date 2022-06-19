import React, { useState } from "react";
import {
  Alert,
  Button,
  Image
} from "react-bootstrap";
import { BoxArrowUpRight, ExclamationCircle, InfoCircleFill } from "react-bootstrap-icons";
import parent from "../images/parent.png";
import { useLocalStorage } from "../services/useLocalStorage";

const Title = (props) => {
  const [show, setShow] = useLocalStorage("showInfo", 'true');

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-2"
        >
        <div>
          <Image src={parent} width="48" />
        </div>
        <div>
          <h4>Simulateur Affelnet</h4>
        </div>
        <div>
          <a href="#" onClick={() => setShow('true')}>
            <InfoCircleFill width="28" height="28" />
          </a>
        </div>
      </div>

      <div className="mx-2 my-2">
        <Alert show={show === 'true'} variant="success">
          <Alert.Heading>Bienvenue !</Alert.Heading>
          Voici le mode d'emploi :
          <ul>
            <li>
              Saisir son collège de scolarisation (et éventuellement de secteur
              si différent) dans la section{" "}
              <b>"Mon collège"</b> ci-dessous. Cela permet de déduire les lycées
              de secteur et donc activera la section <b>"Mes lycées"</b>.
            </li>
            <li>
              Saisir ses moyennes de matières dans la section <b>"Mes notes"</b>
              .
            </li>
            <li>
              Saisir ses évaluations de socle de compétences dans la section{" "}
              <b>"Mon socle"</b>.
            </li>
            <li>
              Profitez de la section{" "}
              <b>"Mes lycées"</b>.
            </li>
          </ul>
          Pour plus de contexte sur Affelnet et ce simulateur : <a href="https://fgaume.medium.com" target="affelnet-medium"><BoxArrowUpRight width="24" height="24" /></a>.
          <hr />
          <p className="mb-0">
            Une fois la procédure Affelnet terminée (le 1er juillet), vous êtes
            chaudement invités à saisir les seuils d'admission que vous avez
            reçus de votre <em>fiche-barème</em>
            &nbsp;(fiche qu'il faut demander auprès du rectorat dès le 1er
            juillet par mail à{" "}
            <a href="mailto:cv.dve@ac-paris.fr">cv.dve@ac-paris.fr</a>) dans la
            section <b>"Seuils d'admission"</b>.
          </p>
        </Alert>
        <Alert show={show === 'true'} variant="warning">
          <ExclamationCircle width="24" height="24"/>&nbsp;Ce simulateur ne gère pas les collégiens boursiers
          (car <a href="https://fgaume.medium.com/la-m%C3%A9canique-daffelnet-79de9f0fe70a" target="affelnet-medium">les boursiers
          sont traités à part</a>).
        </Alert>
        { (show === 'true') && <div className="d-flex justify-content-end">
            <Button onClick={() => setShow('false')} variant="outline-primary">
              J'ai compris !
            </Button>
          </div>}
      </div>
    </>
  );
};
export default Title;
