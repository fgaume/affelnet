import React from "react";
import { Alert, Button, Image } from "react-bootstrap";
import {
  BoxArrowUpRight,
  ExclamationCircle,
  InfoCircleFill,
  Tools,
} from "react-bootstrap-icons";
import parent from "../images/parent.png";
import { useLocalStorage } from "../services/useLocalStorage";

const Title = (props) => {
  const [show, setShow] = useLocalStorage("showInfo", "true");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mx-2">
          <Image src={parent} width="36" />
          <h4>
            <span className="d-flex align-items-center">
              <Tools />
              &nbsp;&nbsp;Boîte à outils Affelnet
            </span>
            </h4>
          {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={() => setShow("true")}>
            <InfoCircleFill width="28" height="28" />
          </a>
      </div>

      <div className="mx-2 my-2">
        <Alert show={show === "true"} variant="success">
          <Alert.Heading>Bienvenue !</Alert.Heading>
          Voici le mode d'emploi de cette "boîte à outils" Affelnet (académie de{" "}
          <strong>Paris</strong>):
          <ul>
            <li>
              Saisir son collège de scolarisation (et éventuellement de secteur
              s'il est différent) dans la section <b>"Mon collège"</b>{" "}
              ci-dessous. Cela permet de déduire les lycées de secteur et donc
              activera la section <b>"Mes lycées"</b>.
            </li>
            <li>
              Saisir ses évaluations de socle de compétences dans la section{" "}
              <b>"Mes compétences"</b>.
            </li>
            <li>
              Saisir ses moyennes de matières dans la section <b>"Mes notes"</b>
              .
            </li>
            <li>
              Profiter de la section <b>"Mes lycées"</b>.
            </li>
            <li>
              La section <b>"Secteurs"</b> permet d'avoir la répartition des
              collègiens ayant un lycée donné en secteur 1
            </li>
          </ul>
          Pour plus de contexte sur Affelnet et cet outil (en particulier les
          sources de données) :{" "}
          <a
            href="https://fgaume.medium.com/simulateur-affelnet-2022-aa3e7393f5cb"
            target="affelnet-medium"
          >
            <BoxArrowUpRight width="24" height="24" />
          </a>
          .
          <hr />
          <p className="mb-0">
            Une fois la procédure Affelnet terminée, vous êtes chaudement
            invités à partager dans la section <b>"Seuils d'admission"</b> les
            seuils d'admission que vous avez reçus de votre{" "}
            <em>fiche-barème</em>
            &nbsp;(qu'il faut demander au rectorat dès le 1er juillet par mail à{" "}
            <a href="mailto:ce.dve@ac-paris.fr">ce.dve@ac-paris.fr</a>).
          </p>
        </Alert>
        <Alert show={show === "true"} variant="warning">
          <ExclamationCircle width="24" height="24" />
          &nbsp; Les seuils d'admission ne sont valables que pour les collégiens{" "}
          <strong>non-boursiers</strong>
          &nbsp;(car{" "}
          <a
            href="https://fgaume.medium.com/la-m%C3%A9canique-daffelnet-79de9f0fe70a"
            target="affelnet-medium"
          >
            les boursiers sont traités dans un concours séparé par Affelnet
          </a>
          ).
        </Alert>
        {show === "true" && (
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow("false")} variant="outline-primary">
              J'ai compris !
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default Title;
