import React, { useState } from "react";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Card } from "react-bootstrap";
import LyceeSelector from "./LyceeSelector";
import fetchCollegesSecteur from "../services/secteurs";
import CollegeGroup from "./CollegeGroup";

/* returns list colleges secteur 1 */
const Secteurs = (props) => {


  const [codeLycee, setCodeLycee] = useState("");

  const [collegesArray, setCollegesArray] = useState([]);


  const onLyceeChange = (lyceeUpdate) => {
    /* console.log(
      "onLyceeChange " + JSON.stringify(lyceeUpdate)
    ); */
    if (lyceeUpdate && lyceeUpdate.code !== codeLycee) {
      setCodeLycee(lyceeUpdate.code);
      fetchCollegesSecteur(lyceeUpdate.code).then((collegesSecteur) => {
        if (collegesSecteur) {
          //console.log("colleges de secteur  : " + JSON.stringify(collegesSecteur));
          setCollegesArray(collegesSecteur);
        }
      });
    }
  };


  return (
    <div className="col-md-6 mx-auto p-0">
      <div className="mb-3">
        Cette section liste le nombre d'élèves de chaque collège ayant un lycée donné en secteur 1.
      </div>
      <div className="mb-3">
        (les effectifs des collèges sont estimés via leur nombre d'admis au DNB 2022)
      </div>
      <Card className="p-1 bg-light bg-opacity-10">
        <div className="p-2 w-100">
          <LyceeSelector
            onChange={onLyceeChange}
            lycee={codeLycee}
          />
        </div>
      </Card>
      <div>
        {collegesArray.map((group, index) => {
          return (
            <CollegeGroup
              bonus={group.bonus}
              effectif={group.effectif}
              part={group.part}
              colleges={group.colleges}
              key={group.bonus}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Secteurs;
