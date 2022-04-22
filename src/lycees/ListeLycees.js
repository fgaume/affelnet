import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Form, ListGroup } from 'react-bootstrap';
import { useLocalStorage } from '../useLocalStorage';
import seuilsMap from '../data/seuils';
import { bonusSecteur } from "../data/affelnet";

const ListeLycees = (props) => {

    const [lycees, setLycees] = useLocalStorage('lycees/secteur-' + props.secteur, []);
    const cacheLyceeSecteur = new Map();
 
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
                console.log(error)
              })
              }
      }, [props.inputLycees.nomCollegeSecteur]);

    useEffect(() => {
        console.log('ListeLycees.useEffect called: ' + props.inputLycees.nomCollegeSecteur);
        props.inputLycees.nomCollegeSecteur && fetchData();
      }, [fetchData, props.inputLycees.nomCollegeSecteur, props.inputLycees.score])

    const computeDiff = (lycee, seuil) => {
        //console.log("secteur" + props.secteur + ", lycee = " + lycee + ", seuil = " + seuil);
        let result = '?';
        if (seuil !== 0) {
            result =  parseInt((props.inputLycees.score + bonusSecteur.get(props.secteur)) - seuil);
            if (result >= 0) result = '+'+result;
            //console.log("result = " + result);    
        }
        return result;
    }  

    const determineColor = (seuil) => {
        let className = 'text-secondary';
        if (seuil !== 0) {
            className = 'text-body';
            let diff = props.inputLycees.score + bonusSecteur.get(props.secteur) - seuil;        
            if (diff >= 0) {
                className = 'text-success';
            } else if (diff < -50) {
                className = 'text-danger';
            }
        }
        return className;
    }

    return (
        <Container fluid>
            <ListGroup>
                {lycees.map(lycee => (
                    <ListGroup.Item key={lycee.nom} className={determineColor(lycee.seuil)}>
                        {lycee.nom}&nbsp;
                        ({computeDiff(lycee.nom, lycee.seuil)})
                    </ListGroup.Item>))}
            </ListGroup>
        </Container>
    )
}
export default ListeLycees;