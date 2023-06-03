import axios from "axios";
import {
  nomsLyceesMap,
  seuilsLyceesMap,
  urlsLyceesMap,
  tousSecteurs,
} from "../data/lycees";

//const cacheKey = "cache/lycees-secteur";
//const cacheActivated = false;

const fetchLycees = async (nomCollegeSecteur) => {
  if (nomCollegeSecteur) {
    /* const fromCache = localStorage.getItem(cacheKey);
    const cacheData = fromCache ? JSON.parse(fromCache) : null;
    const cacheExpires = cacheData ? new Date(cacheData.expires) : null;
    if (cacheExpires && cacheExpires > new Date()) {
      console.log("fetchLycees found cache expires at : " + cacheExpires);
      return cacheData.data;
    } else {
      if (cacheExpires)
        console.log(
          "fetchLycees cache expiré, appel API lycees secteur: " + cacheExpires
        ); */
    const response = await axios({
      method: "GET",
      url: "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query",
      headers: {},
      params: {
        outFields: "UAI,secteur",
        returnGeometry: "false",
        f: "pjson",
        orderByFields: "secteur",
        where: `secteur<>'Tête' and Nom_tete='${nomCollegeSecteur}'`,
      },
    });

    const payload = response.data.features;
    if (payload) {
      let newLycees = payload.map((item) => {
        const codelycee = item.attributes.UAI;
        return {
          code: codelycee,
          secteur: parseInt(item.attributes.secteur),
          nom: nomsLyceesMap.get(codelycee),
          seuils: seuilsLyceesMap.get(codelycee),
          url: urlsLyceesMap.get(codelycee),
        };
      });

      // ajout des lycées multisecteurs 1
      tousSecteurs.forEach((codelycee) => {
        newLycees.push({
          code: codelycee,
          secteur: 1,
          nom: nomsLyceesMap.get(codelycee),
          seuils: seuilsLyceesMap.get(codelycee),
          url: urlsLyceesMap.get(codelycee),
        });
      });

      // tri par seuil décroissant
      newLycees.sort((fa, fb) => {
        if (fa.seuils[1] !== 0 && fb.seuils[1] !== 0) {
          if (fa.seuils[1] < fb.seuils[1]) {
            return 1;
          }
          if (fa.seuils[1] > fb.seuils[1]) {
            return -1;
          }
        } else {
          if (fa.seuils[0] < fb.seuils[0]) {
            return 1;
          }
          if (fa.seuils[0] > fb.seuils[0]) {
            return -1;
          }
        }
        return 0;
      });

      // regroupement par secteurs
      const lyceeArray = [
        newLycees.filter((lycee) => lycee.secteur === 1),
        newLycees.filter((lycee) => lycee.secteur === 2),
        newLycees.filter((lycee) => lycee.secteur === 3),
      ];

      // add a day
      /* if (cacheActivated) {
        let date = new Date();
        date.setDate(date.getDate());
        console.log("expire in : " + date);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ expires: date, data: lyceeArray })
        );
      } */

      return lyceeArray;
    } else {
      console.log(
        "erreur : pas de réponse de l'API de secteurs pour ",
        nomCollegeSecteur
      );
      return [];
    }
  }
};

export default fetchLycees;
