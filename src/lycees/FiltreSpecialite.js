import React from 'react';
import { useState } from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Form, Popover } from 'react-bootstrap';
import { Funnel, QuestionCircleFill } from 'react-bootstrap-icons';

import { specialitesMap } from '../data/specialites';

import "bootstrap/dist/css/bootstrap.css";

const FiltreSpecialite = (props) => {

    const specialites = [...specialitesMap.keys()];

    const [filtres, setFiltres] = useState([]);

    const onFiltreChange = (event) => {
        const spe = event.target.id;
        const filterAdded = event.target.checked;
        let newFiltre = filtres.filter(e => e !== spe);
        if (filterAdded) {
            newFiltre.push(spe);
        }
        setFiltres(newFiltre);
        filterAdded ? props.filterAdded(newFiltre, spe) : props.filterRemoved(newFiltre, spe);
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Filtrage par spécialités</Popover.Header>
          <Popover.Body>
            Permet d'exclure les lycées proposant les spécialités sélectionnées.
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
                return <OverlayTrigger key={index} placement="top" trigger='click' rootCloseEvent="mousedown" overlay={
                    props => (
                        <Tooltip {...props}>{specialitesMap.get(value)}</Tooltip>
                    )
                } rootClose='true'>
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
