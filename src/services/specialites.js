import axios from "axios";
import { codesSpecialitesMap } from "../data/specialites";

const setExclu = (lycees, lyceesWithSpe) => {
  lycees.forEach((lycee) => {
    lycee.exclu = lycee.exclu || !lyceesWithSpe.includes(lycee.code);
  });
};

const resetExclu = (lycees) => {
  lycees.forEach((lycee) => {
    lycee.exclu = false;
  });
};

const intersection = (sets) => {
  let intersectionSet = sets.pop();
  let nextSet = sets.pop();
  while (nextSet !== undefined && intersectionSet.length !== 0) {
    // eslint-disable-next-line no-loop-func
    intersectionSet = intersectionSet.filter((x) => nextSet.includes(x));
    nextSet = sets.pop();
  }
  return intersectionSet;
};

const fetchLyceesHavingSpecialites = async (spes) => {
  const allresults = await Promise.all(
    spes.map(async (spe) => {
      const response = await fetchLyceesHavingSpecialite(spe);
      return response;
    })
  );
  return intersection(allresults);
};

const fetchLyceesHavingSpecialite = async (spe) => {
  if (spe) {
    const response = await axios({
      method: "GET",
      url: "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/LES_ENSEIGNEMENTS_DE_SPECIALITE_EN_CLASSE_DE_PREMIERE_RS_2021/FeatureServer/0/query",
      headers: {},
      params: {
        outFields: "UAI",
        returnGeometry: "false",
        f: "pjson",
        where: `ENSEIGNEMENT_DE_SPECIALITE='${codesSpecialitesMap.get(spe)}'`,
      },
    });

    if (response.data && response.data.features) {
      const payload = response.data.features;
      let newLycees = payload.map((item) => {
        return item.attributes.UAI;
      });
      return newLycees;
    } else {
      console.log("erreur : pas de réponse de l'API de spécialité pour ", spe);
      return [];
    }
  }
};

export { resetExclu, setExclu, fetchLyceesHavingSpecialites };
