import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useLocalStorage } from "../services/useLocalStorage";
import CollegeSelector from "./CollegeSelector";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { CheckLg } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";

/* returns bonusIPS et college de secteur (pour avoir les lycées de secteur) */
const MesColleges = (props) => {
  const [collegesMultiples, setCollegesMultiples] = useLocalStorage(
    "MonCollege/collegesMultiples",
    false
  );
  const [bonusCollege, setBonusCollege] = useLocalStorage(
    "MonCollege/bonusCollege",
    0
  );
  const [nomCollege, setNomCollege] = useLocalStorage(
    "MonCollege/nomCollege",
    ""
  );
  const [nomCollegeSecteur, setNomCollegeSecteur] = useLocalStorage(
    "MonCollege/nomCollegeSecteur",
    ""
  );

  const onCollegeScolarisationChange = (collegeUpdate) => {
    console.log(
      "onCollegeScolarisationChange " + JSON.stringify(collegeUpdate)
    );
    if (collegeUpdate && collegeUpdate.nom !== nomCollege) {
      setNomCollege(collegeUpdate.nom);
      setBonusCollege(collegeUpdate.bonus);
      if (!collegesMultiples) {
        setNomCollegeSecteur(collegeUpdate.nom);
        props.onChange(collegeUpdate);
      } else {
        if (nomCollegeSecteur && bonusCollege !== collegeUpdate.bonus) {
          props.onChange({
            nom: nomCollegeSecteur,
            bonus: collegeUpdate.bonus,
          });
        }
      }
    }
  };

  const onCollegeSecteurChange = (collegeUpdate) => {
    console.log(
      "onCollegeSectorisationChange " + JSON.stringify(collegeUpdate)
    );
    if (collegeUpdate && collegeUpdate.nom !== nomCollegeSecteur) {
      setNomCollegeSecteur(collegeUpdate.nom);
      props.onChange({ nom: collegeUpdate.nom, bonus: bonusCollege });
    }
  };

  const handleCollegesMultiples = (event) => {
    setCollegesMultiples(event.target.checked);
    setNomCollegeSecteur(event.target.checked ? "" : nomCollege);
    if (event.target.checked && nomCollegeSecteur && bonusCollege) {
      props.onChange({ nom: nomCollegeSecteur, bonus: bonusCollege });
    } else if (!event.target.checked && nomCollege && bonusCollege) {
      props.onChange({ nom: nomCollege, bonus: bonusCollege });
    }
  };

  useEffect(() => {
    props.onChange({ nom: nomCollegeSecteur, bonus: bonusCollege });
  }, [nomCollegeSecteur, bonusCollege, props]);

  return (
    <div className="col-md-6 mx-auto p-0">
    <Card className="p-1 bg-primary bg-opacity-10">
      <div className="p-2 w-100">
        <CollegeSelector
          type="scolarisation"
          onChange={onCollegeScolarisationChange}
          college={nomCollege}
        />
        <Form.Group className="mb-3">Bonus IPS : {bonusCollege} { nomCollegeSecteur && <CheckLg color="green" width="28" height="28" />}</Form.Group>
        <Form.Group className="mb-3">
          <Form.Switch
            id="collegesMultiples"
            label="collège de secteur différent"
            defaultChecked={collegesMultiples}
            onChange={handleCollegesMultiples}
          />
        </Form.Group>
        {collegesMultiples && (
          <CollegeSelector
            type="secteur"
            onChange={onCollegeSecteurChange}
            college={nomCollegeSecteur}
          />
        )}
      </div>
    </Card>
    </div>
  );
};

export default MesColleges;
