import axios from "axios";
import {
  nomsLyceesMap,
  seuilsLyceesMap,
  urlsLyceesMap,
  tousSecteurs,
} from "../data/lycees";

const fetchLycees = async (nomCollegeSecteur) => {
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
