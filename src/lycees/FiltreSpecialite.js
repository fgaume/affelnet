import React from 'react';
import { useLocalStorage } from '../useLocalStorage';
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { specialitesMap } from '../data/specialites';
import { Form, Popover } from 'react-bootstrap';
import { Funnel, QuestionCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';

const FiltreSpecialite = (props) => {

    const specialites = [...specialitesMap.keys()];

    //const [filtres, setFiltres] = useLocalStorage('lycees/filtres', []);
    const [filtres, setFiltres] = useState([]);

    const onFiltreChange = (event) => {
        const spe = event.target.id;
        const filterAdded = event.target.checked;
        let newFiltre = filtres.filter(e => e !== spe);
        if (filterAdded) {
            //newFiltre = [...filtres];
            newFiltre.push(spe);
        }
        setFiltres(newFiltre);
        filterAdded ? props.filterAdded(newFiltre, spe) : props.filterRemoved(newFiltre, spe);
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Filtrage par spécialités</Popover.Header>
          <Popover.Body>
            Permet d'exclure les lycées ne proposant pas les spécialités sélectionnées.
            Les spécialités Mathématiques et SVT sont absentes des filtres car tous les lycées parisiens les proposent.
          </Popover.Body>
        </Popover>
      );


    return (
    <div>
        <Funnel width='20' height='20' />&nbsp;Filtrage par spécialités <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <QuestionCircleFill /></OverlayTrigger> : &nbsp;
        {
        specialites.map((value, index) => {
            return <OverlayTrigger key={index} placement="top" overlay={
                props => (
                    <Tooltip {...props}>{specialitesMap.get(value)}</Tooltip>
                  )
            }>
            <Form.Switch inline
                type='checkbox'
                id={value}
                key={value}
                label={value}
                onChange={onFiltreChange}
                defaultChecked={filtres.includes(value)}
            />
          </OverlayTrigger>
        })
        }
    </div>
    )
}

export default FiltreSpecialite;
