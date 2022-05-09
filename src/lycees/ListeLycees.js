import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import { Check2, Check2All , ExclamationLg, Question, X } from 'react-bootstrap-icons';

import seuilsMap from '../data/seuils';
import { bonusSecteur } from "../data/affelnet";
import { lyceesTousSecteurs } from '../data/lycees';

import './ListeLycees.css';

const ListeLycees = (props, ref) => {
 
    const [lycees, setLycees] = useState([]);
    const [lyceesBySpecialiteMap, setLyceesBySpecialiteMap] = useState(props.filter);
    const [cacheLyceeSecteur, setCacheLyceeSecteur] = useState(new Map());

    useImperativeHandle(ref, () => ({
        setFilter(newLyceesBySpecialiteMap) {
            console.log("sect " + props.secteur + " received: specMap = ....");
            console.log(newLyceesBySpecialiteMap);
            setLyceesBySpecialiteMap(newLyceesBySpecialiteMap);
        }
    }), [setLyceesBySpecialiteMap])
 
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
                  if (payload) {
                      let newLycees = payload.map((item) => {
                          return {
                            'nom' : item.attributes.Nom,
                            'seuil' : seuilsMap.get(item.attributes.Nom) ? seuilsMap.get(item.attributes.Nom) : 0};
                      });
                      if (props.secteur === '1') {
                         lyceesTousSecteurs.forEach((lycee) => {
                            newLycees.push({ 'nom': lycee, 'seuil' : 0});
                         });
                      }
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
                      let newCacheLyceeSecteur = new Map(cacheLyceeSecteur);
                      newCacheLyceeSecteur.set(key, newLycees);
                      setCacheLyceeSecteur(newCacheLyceeSecteur);
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
        let result = '';
        if (seuil !== 0) {
            result =  parseInt((props.inputLycees.score + bonusSecteur.get(props.secteur)) - seuil);
            let formattedResult = result.toLocaleString();
            if (result >= 0) {
                result = ('+' + formattedResult);
            }
            else {
                result = formattedResult;
            }
            result = '(' + result + ') ';
        }
        return result;
    }  

    const determineVariant = (lycee, seuil) => {
        let className = 'light';
        if (seuil !== 0) {
            let diff = parseInt(props.inputLycees.score + bonusSecteur.get(props.secteur) - seuil);        
            if (diff > 50) {
                className = 'success';
            } else if (diff > -150) {
                className = 'warning';
            } else {
                className = 'danger';
            }
        }
        return className;
    }

    const lyceeHasAllFilteredSpecialites = (lycee) => {
        if (lyceesBySpecialiteMap && lyceesBySpecialiteMap.size > 0) {
            const keys = lyceesBySpecialiteMap.keys();
            if (keys) {
                for (let spe of keys) {
                    const lyceeSpes = lyceesBySpecialiteMap.get(spe);
                    if (lyceeSpes && !lyceeSpes.includes(lycee)) return false;
                }
            }
        }
        return true;
    }

    const determineFiltered = (lycee) => {
        return lyceeHasAllFilteredSpecialites(lycee) ? '' : 'filtered';
    }

    return (
        <Container fluid>
            <ListGroup>
                {lycees.map(lycee => (
                    <ListGroup.Item key={lycee.nom} variant={determineVariant(lycee.nom, lycee.seuil)}>
                        <span className={determineFiltered(lycee.nom)} >
                            {lycee.nom}&nbsp;
                            {computeDiff(lycee.nom, lycee.seuil)}
                            {(() => {
                                if (lycee.seuil !== 0) {
                                    let diff = parseInt((props.inputLycees.score + bonusSecteur.get(props.secteur)) - lycee.seuil);
                                    if (diff > 400) {
                                        return <Check2All color='green' width='20' height='20' />
                                    } else if (diff > 50) {
                                        return <Check2 color='green' width='20' height='20'/>
                                    } else if (diff > -150) {
                                        return <ExclamationLg color='orange' width='20' height='20'/>
                                    } else {
                                        return <X color='red' width='20' height='20'/>
                                    }
                                }
                                else {
                                    return <Question color='gray' width='20' height='20'/>
                                }
                            })()}
                        </span>
                    </ListGroup.Item>))}
            </ListGroup>
        </Container>
    )
}

export default forwardRef(ListeLycees);