import axios from "axios";
import {
  nomsLyceesMap,
  urlsLyceesMap,
  tousSecteurs,
} from "../data/lycees";

const fetchLycees = async (nomCollegeSecteur, historySeuilsLyceesMap, seuilsRecentsLyceesMap) => {
  //console.log('fetch historySeuilsLyceesMap', historySeuilsLyceesMap);
  //console.log('fetch seuilsRecentsLyceesMap', seuilsRecentsLyceesMap);
  if (nomCollegeSecteur) {
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
        const historySeuilsLycee = historySeuilsLyceesMap.get(codelycee);
        const nbSeuils = historySeuilsLycee.length;
        const seuilPrecedent = historySeuilsLycee[nbSeuils - 2];
        return {
          code: codelycee,
          secteur: parseInt(item.attributes.secteur),
          nom: nomsLyceesMap.get(codelycee),
//          seuils: historySeuilsLyceesMap.get(codelycee),
          seuilRecent: seuilsRecentsLyceesMap.get(codelycee),
          seuilPrecedent: seuilPrecedent,
          url: urlsLyceesMap.get(codelycee),
        };
      });

      // ajout des lycées multisecteurs 1
      tousSecteurs.forEach((codelycee) => {
        const historySeuilsLycee = historySeuilsLyceesMap.get(codelycee);
        const nbSeuils = historySeuilsLycee.length;
        const seuilPrecedent = historySeuilsLycee[nbSeuils - 2];
        newLycees.push({
          code: codelycee,
          secteur: 1,
          nom: nomsLyceesMap.get(codelycee),
          //          seuils: historySeuilsLyceesMap.get(codelycee),
          seuilRecent: seuilsRecentsLyceesMap.get(codelycee),
          seuilPrecedent: seuilPrecedent,
          url: urlsLyceesMap.get(codelycee),
        });
      });

      // tri par seuil décroissant
      newLycees.sort((fa, fb) => {
        if (fa.seuilRecent !== 0 && fb.seuilRecent !== 0) {
          if (fa.seuilRecent < fb.seuilRecent) {
            return 1;
          }
          if (fa.seuilRecent > fb.seuilRecent) {
            return -1;
          }
        } else {
          if (fa.seuilPrecedent < fb.seuilPrecedent) {
            return 1;
          }
          if (fa.seuilPrecedent > fb.seuilPrecedent) {
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
