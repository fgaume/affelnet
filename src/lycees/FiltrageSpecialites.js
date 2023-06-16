import React, { useEffect, useState } from "react";
import { Button, Collapse, Popover, Stack } from "react-bootstrap";
import { Funnel, QuestionCircleFill } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { specialites } from "../data/specialites";

import "bootstrap/dist/css/bootstrap.css";
import MyToggle from "../components/MyToggle";
import { useLocalStorage } from "../services/useLocalStorage";
import "./FiltrageSpecialites.css";

// remonte une liste à jour des specialités filtrées
const FiltrageSpecialites = (props) => {
  const [filtres, setFiltres] = useLocalStorage("filtrageSpecialites", []);
  const [spesOpen, setSpesOpen] = useState(false);

  const onFiltreChange = (newChecked, spe) => {
    const filterAdded = newChecked;
    let newFiltres = filtres.filter((e) => e !== spe);
    if (filterAdded) {
      newFiltres.push(spe);
    }
    setFiltres(newFiltres);
    props.onChange(newFiltres);
    //filterAdded ? props.filterAdded(newFiltre, spe) : props.filterRemoved(newFiltre, spe);
  };

  const onCollapseChange = () => {
    setSpesOpen(!spesOpen);
  };

  const popover = (
    <Popover id="popover-specialite">
      <Popover.Header as="h3">Filtrage par spécialités</Popover.Header>
      <Popover.Body>
        Permet d'exclure les lycées ne proposant pas les spécialités
        sélectionnées en 1ère (ils seront barrés de la liste). Les spécialités
        Mathématiques et SVT sont absentes des filtres car tous les lycées
        parisiens les proposent. La source de données est la{" "}
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Lien vers la carte des spécialités du Rectorat"
          href="https://rectoratparis.maps.arcgis.com/apps/webappviewer/index.html?id=47c86e32215248a0a6846e098890e13c"
        >
          carte des spécialités du Rectorat</a>
          . Recoupez avec la fiche descriptive
          le cas échéant en cliquant sur le nom du lycée pour être certain des
          spécialités proposées, ainsi que de leur combinatoire autorisée.
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    props.onChange(filtres);
  }, [filtres, props]);

  return (
    <div className="bg-primary text-dark bg-opacity-10 rounded p-1 my-2">
      <div className="p-2 my-1">
        <Button variant="outline-primary" onClick={onCollapseChange}>
          <Funnel width="20" height="20" className="me-1" />
          Filtrage par spécialités
        </Button>{" "}
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          rootCloseEvent="mousedown"
          rootClose="true"
        >
          <QuestionCircleFill width="20" height="20" className="ms-2"/>
        </OverlayTrigger>{" "}
      </div>
      <Collapse in={spesOpen}>
        <div className="ms-2 mb-2" id="speToggles">
          <Stack direction="horizontal" gap={4} className="flex-wrap">
            {specialites.map((spe, index) => {
              return (
                <span key={index}>
                  <MyToggle
                    id={spe.acronyme}
                    key={spe.acronyme}
                    label={spe.acronyme}
                    onChange={onFiltreChange}
                    defaultChecked={filtres.includes(spe.acronyme)}
                    className="mx-3 my-2"
                    tip={spe.nom}
                  />
                </span>
              );
            })}
          </Stack>
        </div>
      </Collapse>
    </div>
  );
};

export default FiltrageSpecialites;
