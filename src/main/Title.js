import React from "react";
import { Alert, Button, Image } from "react-bootstrap";
import {
  BoxArrowUpRight,
  CheckLg,
  ExclamationCircle,
  InfoCircleFill,
  Tools
} from "react-bootstrap-icons";
import parent from "../images/parent.png";
import { useLocalStorage } from "../services/useLocalStorage";

const Title = (props) => {
  const [show, setShow] = useLocalStorage("showInfo", "true");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mx-3">
        <Image
          src={parent}
          width="36"
          className="mb-2"
          alt="icone parent enfant"
        />
        <h4>
          <span className="d-flex align-items-center mt-1">
            <Tools />
            &nbsp;&nbsp;Affelnet Paris
          </span>
        </h4>
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" aria-label="Lien infos" onClick={() => setShow("true")}>
          <InfoCircleFill width="28" height="28" className="mb-1" />
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
              Profiter de la section <b>"Mes lycées"</b>, qui permet aussi de
              filtrer par spécialités en 1ère.
            </li>
            <li>
              La section <b>"Mes contributions"</b> permet de contribuer à la
              communauté en saisissant des données indispensables au
              fonctionnement de l'outil et que seuls les parents détiennent via
              leur fiche barème individuelle.
            </li>
            <li>
              La section <b>"Seuils d'admission"</b> liste l'historique des
              seuils d'admission aux lycées et ceux en attente de contribution.
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
            aria-label="Lien blog medium"
            target="affelnet-medium"
          >
            <BoxArrowUpRight width="24" height="24" className="mb-2" />
          </a>
          .
          <hr />
          <p className="mb-0">
            Une fois la procédure Affelnet terminée, vous êtes chaudement
            invités à partager dans la section <b>"Mes contributions"</b> les
            seuils d'admission que vous avez reçus de votre{" "}
            <em>fiche-barème</em>
            &nbsp;(qu'il faut demander au rectorat dès que affectation a été prononcée par mail à{" "}
            <a href="mailto:ce.dve@ac-paris.fr" aria-label="Lien mail DVE">
              ce.dve@ac-paris.fr
            </a>
            ). Plus de détails dans{" "}  
            <a
            href="https://youtu.be/O8FVsFdCQyE"
            target="affelnet-medium"
            aria-label="Vidéo : comprendre son affectation"
          >cette vidéo.</a>
          </p>
          <hr />
          <div className="mb-0">
            <strong>Mise à jour [9.4.3] du 20/06/2025 :</strong>
            <ul>
              <li>Ajout tableau fiche barème</li>
            </ul>            
          </div>
        </Alert>
        <Alert show={show === "true"} variant="warning">
          <ExclamationCircle
            width="32"
            height="32"
            className="text-danger me-2"
          />
          Les seuils d'admission présentés ici ne sont valables que pour les collégiens{" "}
          <strong>non-boursiers</strong>
          &nbsp;(car{" "}
          <a
            href="https://fgaume.medium.com/la-m%C3%A9canique-daffelnet-79de9f0fe70a"
            target="affelnet-medium"
            aria-label="Lien blog medium"
          >
            les boursiers sont traités dans un concours séparé par Affelnet
          </a>
          ).
        </Alert>
        {show === "true" && (
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow("false")} variant="outline-primary">
              <CheckLg width="24" height="24" className="me-1" />
              J'ai compris !
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default Title;
