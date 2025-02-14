import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useLocalStorage } from "../services/useLocalStorage";
import CollegeSelector from "./CollegeSelector";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { CheckLg, QuestionCircleFill } from "react-bootstrap-icons";
import { Card, OverlayTrigger, Popover, Stack } from "react-bootstrap";
//import { analytics } from "../services/firebase";
//import { logEvent } from "firebase/analytics";
import MyToggle from "../components/MyToggle";
import "./MesColleges.css"
import SharedContext from "../context";

/* returns bonusIPS et college de secteur (pour avoir les lycées de secteur) */
const MesColleges = (props) => {

  const { data } = useContext(SharedContext);

  const [collegesMultiples, setCollegesMultiples] = useLocalStorage(
    "MonCollege/collegesMultiples",
    false
  );
/*  const [bonusCollege, setBonusCollege] = useLocalStorage(
    "MonCollege/bonusCollege",
    0
  ); */

  const [nomCollege, setNomCollege] = useLocalStorage(
    "MonCollege/nomCollege",
    ""
  );
  const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage(
    "MonCollege/nomCollegeSecteur",
    ""
  );

  const [collegeScolarisation, setCollegeScolarisation] = useLocalStorage(
    "MesColleges/collegeScolarisation",
    ""
  );
  const [collegeSecteur, setCollegeSecteur] = useLocalStorage(
    "MesColleges/collegeSecteur",
    ""
  );
  const popover = (
    <Popover id="popover-college">
      <Popover.Header as="h3">Collège de secteur</Popover.Header>
      <Popover.Body>
        Le collège de secteur est déduit de votre adresse. S'il est différent du
        collège où vous êtes réellement scolarisé, il faut le spécifier ici car
        il conditionne la liste de vos lycées de secteur 1. Si vous venez d'un
        collège privé, il faut saisir ici le collège de secteur publique lié à
        votre adresse. Pour connaitre son collège de secteur,{" "}
        <a
          rel="noreferrer"
          href="https://capgeo.sig.paris.fr/Apps/SecteursScolaires"
          aria-label="Lien vers la carte scolaire"
          target="_blank"
        >
          se rendre ici.
        </a>
      </Popover.Body>
    </Popover>
  );

  const onCollegeScolarisationChange = (collegeUpdate) => {
    /* console.log(
      "onCollegeScolarisationChange " + JSON.stringify(collegeUpdate)
    ); */
    if (collegeUpdate && collegeUpdate.code !== collegeScolarisation.code) {
      setCollegeScolarisation(collegeUpdate);
      //setNomCollege(collegeUpdate.nom);
      //setBonusCollege(collegeUpdate.bonus);
      if (!collegesMultiples) {
        setCollegeSecteur(collegeUpdate);
        //setNomCollegeSecteur(collegeUpdate.nom);
        props.onChange(collegeUpdate, collegeUpdate);
        //logEvent(analytics, "collège " + collegeUpdate.nom);
        //logEvent(analytics, "bonus " + collegeUpdate.bonus);
      } else {
        if (collegeSecteur && collegeScolarisation.bonus !== collegeUpdate.bonus) {
          props.onChange(collegeSecteur, collegeUpdate);
        }
      }
    }
  };

  const onCollegeSecteurChange = (collegeUpdate) => {
    /* console.log(
      "onCollegeSectorisationChange " + JSON.stringify(collegeUpdate)
    ); */
    if (collegeUpdate && collegeUpdate.code !== collegeSecteur.code) {
      setCollegeSecteur(collegeUpdate);
      props.onChange(collegeUpdate, null);
      //logEvent(analytics, "collège secteur " + collegeUpdate.nom);
    }
  };

  const handleCollegesMultiples = (newChecked) => {
    //console.log("switch event :", newChecked);
    setCollegesMultiples(newChecked);
    setCollegeSecteur(newChecked ? "" : collegeScolarisation);
    if (newChecked && collegeSecteur) {
      props.onChange(collegeSecteur, collegeScolarisation);
    } else if (!newChecked && collegeScolarisation) {
      props.onChange(collegeScolarisation, collegeScolarisation);
    }
  };

  useEffect(() => {
    //console.log("useEffect MesColleges");

    var collegeSect = collegeSecteur;
    if (data && data.listeColleges && !collegeSecteur && nomCollegeSecteur) {
      //console.log("nomCollegeSecteur: ", nomCollegeSecteur)
      collegeSect = data.listeColleges.find(c => c.nom === nomCollegeSecteur);
      if (collegeSect) {
        //console.log("storedCollegeSecteur: ", collegeSect)
        setCollegeSecteur(collegeSect);
        setNomCollegeSecteur(null);
        localStorage.removeItem("MonCollege/nomCollegeSecteur");  
      }
    }

    var collegeScol = collegeScolarisation;
    if (data && data.listeColleges && !collegeScolarisation && nomCollege) {
      //console.log("nomCollege: ", nomCollege)
      collegeScol = data.listeColleges.find(c => c.nom === nomCollege);
      if (collegeScol) {
        //console.log("storedCollegeScolarisation: ", collegeScol)
        setCollegeScolarisation(collegeScol);  
        setNomCollege(null);
        localStorage.removeItem("MonCollege/nomCollege");
      }
    }

    props.onChange(collegeSect, collegeScol);
  }, [collegeSecteur, collegeScolarisation, props, data, nomCollegeSecteur, nomCollege, setCollegeSecteur, setCollegeScolarisation, setNomCollegeSecteur, setNomCollege]);

  return (
    <div className="mx-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 mx-auto">
      <Card className="p-1 bg-primary bg-opacity-10">
        <div className="p-2 w-100 mb-0">
          <CollegeSelector
            type="scolarisation"
            onChange={onCollegeScolarisationChange}
            college={collegeScolarisation}
          />
          <Form.Group className="mb-3 ms-1">
            Bonus IPS : {collegeScolarisation.bonus}{" "}
            {collegeSecteur && (
              <CheckLg color="green" width="30" height="30" className="mb-1"/>
            )}
          </Form.Group>
          <Form.Group className="mb-3 ms-1">
            <Stack direction="horizontal" gap={2}>
              <MyToggle
                id="collegesMultiples"
                label="Collège de secteur différent"
                defaultChecked={collegesMultiples}
                onChange={handleCollegesMultiples}
              />
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={popover}
                rootCloseEvent="mousedown"
                rootClose="true"
              >
                <QuestionCircleFill width="24" height="24" />
              </OverlayTrigger>{" "}
            </Stack>
          </Form.Group>
          {collegesMultiples && (
            <CollegeSelector
              type="secteur"
              onChange={onCollegeSecteurChange}
              college={collegeSecteur}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default MesColleges;
