import React, { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Form, Popover } from "react-bootstrap";
import { Funnel, QuestionCircleFill } from "react-bootstrap-icons";

import { specialites } from "../data/specialites";

import "bootstrap/dist/css/bootstrap.css";
import { useLocalStorage } from "../services/useLocalStorage";

// remonte une liste à jour des specialités filtrées
const FiltrageSpecialites = (props) => {
  const [filtres, setFiltres] = useLocalStorage("filtrageSpecialites", []);

  const onFiltreChange = (event) => {
    const spe = event.target.id;
    const filterAdded = event.target.checked;
    let newFiltres = filtres.filter((e) => e !== spe);
    if (filterAdded) {
      newFiltres.push(spe);
    }
    setFiltres(newFiltres);
    props.onChange(newFiltres);
    //filterAdded ? props.filterAdded(newFiltre, spe) : props.filterRemoved(newFiltre, spe);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Filtrage par spécialités</Popover.Header>
      <Popover.Body>
        Permet d'exclure les lycées ne proposant pas les spécialités
        sélectionnées. Les spécialités Mathématiques et SVT sont absentes des
        filtres car tous les lycées parisiens les proposent.
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    props.onChange(filtres);
  }, [filtres, props]);

  return (
    <div className="bg-primary p-2 text-dark bg-opacity-10 rounded mb-3">
      <div className="p-2">
        <Funnel width="20" height="20" />
        &nbsp;Filtrage par spécialités{" "}
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <QuestionCircleFill width="20" height="20" />
        </OverlayTrigger>{" "}
        :
      </div>
      <div className="p-2">
        {specialites.map((spe, index) => {
          return (
            <span key={index}>
              <OverlayTrigger
                key={spe.acronyme}
                placement="top"
                trigger="click"
                rootCloseEvent="mousedown"
                overlay={(props) => <Tooltip {...props}>{spe.nom}</Tooltip>}
                rootClose="true"
              >
                <Form.Switch
                  inline
                  type="checkbox"
                  id={spe.acronyme}
                  key={spe.acronyme}
                  label={spe.acronyme}
                  onChange={onFiltreChange}
                  defaultChecked={filtres.includes(spe.acronyme)}
                />
              </OverlayTrigger>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FiltrageSpecialites;
