import axios from "axios";

import { formatInt } from "../services/helper";

/*
  fetchCollegesSecteur appelle l'API Rectorat pour récupérer la liste des collèges associés
  à un lycée donné (codeLyceeSecteur), triée par secteur (1/2/3)
*/
const fetchCollegesSecteur = async (codeLyceeSecteur, collegesMap) => {
  if (codeLyceeSecteur) {
    const response = await axios({
      method: "GET",
      url: "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query",
      headers: {},
      params: {
        outFields: "Réseau",
        returnGeometry: "false",
        f: "pjson",
        orderByFields: "secteur",
        where: `secteur='1' and UAI='${codeLyceeSecteur}'`,
      },
    });

    const payload = response.data.features;
    if (payload) {
      let colleges = payload.map((item) => {
        const codeCollege = item.attributes["Réseau"];
        return collegesMap.get(codeCollege);
      });

      let effectifTotal = 0;

      colleges.forEach((college) => {
        effectifTotal += college.dnb_admis;
      });

      const collegesArray = [];
      const collegesPieArray = [];

      let groups = [1200, 600, 0];

      groups.forEach((bonus) => {
        let group = colleges.filter((college) => college.bonus === bonus);
        let effectif = 0;
        group.forEach((college) => {
          effectif += college.dnb_admis;
        });
        group.sort((fa, fb) => {
          if (fa.dnb_admis < fb.dnb_admis) {
            return 1;
          }
          if (fa.dnb_admis > fb.dnb_admis) {
            return -1;
          }
          return 0;
        });
        if (effectif !== 0) {
          collegesArray.push({
            bonus: bonus,
            effectif: effectif,
            part: (effectifTotal === 0) ? "0 %" : formatInt((100 * effectif) / effectifTotal) + " %",
            colleges: group,
          });
          collegesPieArray.push({
            title: bonus,
            value: effectif,
            color: bonus === 1200 ? "#008001" : (bonus === 0 ? "#FB824A" : "#0C6FFD")
          });
          }
      });

      return { collegesArray: collegesArray, collegesPieArray: collegesPieArray }
    }
  }
};

export default fetchCollegesSecteur;
