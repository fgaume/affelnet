import React, { useState } from "react";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Card } from "react-bootstrap";
import LyceeSelector from "./LyceeSelector";
import fetchCollegesSecteur from "../services/secteurs";
import CollegeGroup from "./CollegeGroup";
import { ArrowReturnRight } from "react-bootstrap-icons";
import { PieChart } from "react-minimal-pie-chart";

/* returns list colleges secteur 1 */
const Secteurs = (props) => {
  const [codeLycee, setCodeLycee] = useState("");
  const [nomLycee, setNomLycee] = useState("");

  const [collegesArray, setCollegesArray] = useState([]);
  const [collegesPieArray, setCollegesPieArray] = useState([]);

//  const [selected, setSelected] = useState(0);
//  const [hovered, setHovered] = useState();


  const onLyceeChange = (lyceeUpdate) => {
    /* console.log(
      "onLyceeChange " + JSON.stringify(lyceeUpdate)
    ); */
    if (lyceeUpdate && lyceeUpdate.code !== codeLycee) {
      setCodeLycee(lyceeUpdate.code);
      setNomLycee(lyceeUpdate.nom);
      fetchCollegesSecteur(lyceeUpdate.code).then((collegesSecteur) => {
        if (collegesSecteur) {
          //console.log("colleges de secteur  : " + JSON.stringify(collegesSecteur));
          setCollegesArray(collegesSecteur.collegesArray);
          setCollegesPieArray(collegesSecteur.collegesPieArray);
        }
      });
    }
  };

  return (
    <div className="mx-auto p-0">
      <div className="mb-3">
        <ArrowReturnRight /> Cette section estime le nombre d'élèves ayant un lycée donné en secteur 1. Les élèves sont regroupés par collège. Les collèges sont groupés par bonus IPS.
      </div>
      <div className="mb-3">
        <ArrowReturnRight /> Les effectifs des collèges sont estimés via leur
        nombre d'admis au DNB 2022 (source opendata)
      </div>
      <div className="mx-2 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-6 mx-auto">
        <Card className="p-1 bg-light bg-opacity-30">
          <div className="p-1 w-100">
            <LyceeSelector onChange={onLyceeChange} lycee={codeLycee} />
          </div>
          <div className="mx-2"><a href={"https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=" + codeLycee}>Voir la fiche officielle du lycée</a></div>
        </Card>
        <PieChart
          data={collegesPieArray}
          style={{
            fontSize: '8px',
          }}
          radius={40}
          lineWidth={60}
          segmentsStyle={{ transition: 'stroke 1s', cursor: 'pointer' }}
          segmentsShift={(index) => (index !== 6)}
          animate
          label={({ dataEntry }) => dataEntry.title}
          labelPosition={70}
          labelStyle={{
            fill: '#fff',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
          // onClick={(_, index) => {
          //   setSelected(index === selected ? undefined : index);
          // }}
          // onMouseOver={(_, index) => {
          //   setHovered(index);
          // }}
          // onMouseOut={() => {
          //   setHovered(undefined);
          // }}
        />
      </div>
      <div className="text-center t-0 mb-8">Répartition - par bonus IPS de collège - des élèves ayant le lycée <a href={"https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=" + codeLycee}>{nomLycee}</a> en secteur 1</div>
      <div className="my-5 mx-2 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-6 mx-auto">
        {collegesArray.map((group, index) => {
          return (
            <CollegeGroup
              bonus={group.bonus}
              effectif={group.effectif}
              part={group.part}
              colleges={group.colleges}
              key={group.bonus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Secteurs;
