import React, { useContext, useEffect, useState } from "react";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Card } from "react-bootstrap";
import LyceeSelector from "./LyceeSelector";
import fetchCollegesSecteur from "../services/secteurs";
import CollegeGroup from "./CollegeGroup";
import { ArrowReturnRight } from "react-bootstrap-icons";
import { PieChart } from "react-minimal-pie-chart";
import SharedContext from "../context";

/* returns list colleges secteur 1 */
const Secteurs = (props) => {
  const [codeLycee, setCodeLycee] = useState("");
  const [nomLycee, setNomLycee] = useState("");

  const [collegesArray, setCollegesArray] = useState([]);
  const [collegesPieArray, setCollegesPieArray] = useState([]);

  const [collegesMap, setCollegesMap] = useState(null);
  
  const { listeColleges } = useContext(SharedContext);

  //  const [selected, setSelected] = useState(0);
  //  const [hovered, setHovered] = useState();

  useEffect(() => {
    const newMap = new Map();
    listeColleges.forEach(item => {
      item.url = "https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=" + item.code
      newMap.set(item.code, item);
    });
    setCollegesMap(newMap);
    }, [listeColleges]);
  

  const onLyceeChange = (lyceeUpdate) => {
    console.log("collgeMap", JSON.stringify(collegesMap))
    //console.log("onLyceeChange " + JSON.stringify(lyceeUpdate));
    if (lyceeUpdate === undefined) {
      setCodeLycee(null);
      setNomLycee(null);
    }
    if (lyceeUpdate && lyceeUpdate.code !== codeLycee) {
      setCodeLycee(lyceeUpdate.code);
      setNomLycee(lyceeUpdate.nom);
      fetchCollegesSecteur(lyceeUpdate.code, collegesMap).then((collegesSecteur) => {
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
        <ArrowReturnRight /> Cette section estime le nombre d'élèves ayant un
        lycée donné en secteur 1. Les élèves sont regroupés par collège. Les
        collèges sont groupés par bonus IPS.
      </div>
      <div className="mb-3">
        <ArrowReturnRight /> Les effectifs des collèges sont estimés via leur
        nombre d'admis au <b>DNB 2023</b> (source opendata)
      </div>
      <div className="mx-2 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 col-xxl-6 mx-auto">
        <Card className="p-1 bg-light bg-opacity-30">
          <div className="p-1 w-100">
            <LyceeSelector onChange={onLyceeChange} lycee={codeLycee} />
          </div>
          {codeLycee && (
            <div className="mx-2">
              <a
                href={
                  "https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=" +
                  codeLycee
                }
              >
                Voir la fiche officielle du lycée
              </a>
            </div>
          )}
        </Card>
      </div>
      {codeLycee && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "50%" }}>
            <PieChart
              data={collegesPieArray}
              style={{
                fontSize: "8px",
              }}
              radius={45}
              lineWidth={60}
              segmentsStyle={{ transition: "stroke 1s", cursor: "pointer" }}
              segmentsShift={(index) => index !== 6}
              animate
              label={({ dataEntry }) => dataEntry.title}
              labelPosition={70}
              labelStyle={{
                fill: "#fff",
                opacity: 0.85,
                pointerEvents: "none",
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
        </div>
      )}
      {codeLycee && (
        <div className="text-center t-0 mb-8">
          Répartition - par bonus IPS de collège - des élèves ayant le
          lycée&nbsp;
          <a
            href={
              "https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=" +
              codeLycee
            }
          >
            {nomLycee}
          </a>
          &nbsp;en secteur 1
        </div>
      )}
      {codeLycee && (
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
      )}
    </div>
  );
};

export default Secteurs;
