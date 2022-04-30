import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import { useLocalStorage } from '../useLocalStorage';
import seuilsMap from '../data/seuils';
import { bonusSecteur } from "../data/affelnet";
import './ListeLycees.css';

const ListeLycees = (props, ref) => {

    const cacheLyceeSecteur = new Map();
 
    const [lycees, setLycees] = useLocalStorage('lycees/secteur-' + props.secteur, []);
    const [filtres, setFiltres] = useState([]);
    const [lyceesBySpecialiteMap, setLyceesBySpecialiteMap] = useState(new Map());

    useImperativeHandle(ref, () => ({
        setFromOutside (newFiltres, newLyceesBySpecialiteMap) {
            setFiltres(newFiltres);
            setLyceesBySpecialiteMap(newLyceesBySpecialiteMap);
        }
    }), [setFiltres, setLyceesBySpecialiteMap])
 
    const fetchData = React.useCallback(() => {
        let key = props.inputLycees.nomCollegeSecteur + props.secteur;
        let newLycees = cacheLyceeSecteur.get(key);
        if (newLycees) {
            setLycees(newLycees);
            props.onChange(props.secteur, newLycees);
        }
        else {
            axios({
                "method": "GET",
                "url": "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query",
                "headers": {},
                "params": {
                  outFields : 'Nom',
                  returnGeometry : 'false',
                  f : 'pjson',
                  where : `secteur='${props.secteur}' and Nom_tete='${props.inputLycees.nomCollegeSecteur}'`
                }
              })
              .then((response) => {
                  const payload = response.data.features;
                  //console.log(payload);
                  if (payload) {
                      const newLycees = payload.map((item) => {
                          return {
                            'nom' : item.attributes.Nom,
                            'seuil' : seuilsMap.get(item.attributes.Nom) ? seuilsMap.get(item.attributes.Nom) : 0};
                      });
                      newLycees.sort((fa,fb) => {
                        if (fa.seuil < fb.seuil) {
                            return 1;
                        }
                        if (fa.seuil > fb.seuil) {
                            return -1;
                        }
                        return 0;
                      })
                      setLycees(newLycees);
                      props.onChange(props.secteur, newLycees);
                      let key = props.inputLycees.nomCollegeSecteur + props.secteur;
                      cacheLyceeSecteur.set(key, newLycees);
                  }
              })
              .catch((error) => {
                console.log(error);
              });
              }
      }, [props.inputLycees.nomCollegeSecteur]);

    useEffect(() => {
        console.log('ListeLycees.useEffect called: ' + props.inputLycees.nomCollegeSecteur);
        props.inputLycees.nomCollegeSecteur && fetchData();
    }, [fetchData, props.inputLycees.nomCollegeSecteur, props.inputLycees.score])


      const computeDiff = (lycee, seuil) => {
        let result = '?';
        if (seuil !== 0) {
            result =  parseInt((props.inputLycees.score + bonusSecteur.get(props.secteur)) - seuil);
            if (result >= 0) {
                result = ('+' + result);
            }
        }
        return result;
    }  

    const determineVariant = (lycee, seuil) => {
        let className = 'light';
        if (seuil !== 0) {
            className = 'warning';
            let diff = props.inputLycees.score + bonusSecteur.get(props.secteur) - seuil;        
            if (diff >= 0) {
                className = 'success';
            } else if (diff < -50) {
                className = 'danger';
            }
        }
        return className;
    }

    const hasSpecialite = (lycee, spe) => {
        if (lyceesBySpecialiteMap && lyceesBySpecialiteMap.get(spe)) {
            const lyceeSpes = lyceesBySpecialiteMap.get(spe);
            return lyceeSpes.includes(lycee);
        }
        else {
            return true;
        }
    }

    const lyceeHasAllFilteredSpecialites = (lycee, thefiltres) => {
        for (let spe of thefiltres) {
            if (!hasSpecialite(lycee, spe)) return false;
        }
        return true;
    }

    const determineFiltered = (lycee, thefiltres) => {
        return lyceeHasAllFilteredSpecialites(lycee, thefiltres) ? '' : 'filtered';
    }

    return (
        <Container fluid>
            <ListGroup>
                {lycees.map(lycee => (
                    <ListGroup.Item key={lycee.nom} variant={determineVariant(lycee.nom, lycee.seuil)}>
                        <span className={determineFiltered(lycee.nom, filtres)} >
                            {lycee.nom}&nbsp;
                            ({computeDiff(lycee.nom, lycee.seuil)})
                        </span>
                    </ListGroup.Item>))}
            </ListGroup>
        </Container>
    )
}
export default forwardRef(ListeLycees);