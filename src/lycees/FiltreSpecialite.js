import React from 'react';
import { useLocalStorage } from '../useLocalStorage';
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { specialitesMap } from '../data/specialites';
import { Form } from 'react-bootstrap';
import { Funnel } from 'react-bootstrap-icons';

const FiltreSpecialite = (props) => {

    const specialites = [...specialitesMap.keys()];

    const [filtres, setFiltres] = useLocalStorage('lycees/filtres', []);

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

    return (
    <div>
        <Funnel width='20' height='20' />&nbsp;Filtrage par spécialités : &nbsp;
        {
        specialites.map((value, index) => {
            return <OverlayTrigger key={index} placement="top" overlay={
                props => (
                    <Tooltip {...props}>{specialitesMap.get(value)}</Tooltip>
                  )
            }>
            <Form.Check inline
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
