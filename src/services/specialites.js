import axios from "axios";
import { codesSpecialitesMap } from "../data/specialites";

const baseCacheKey = "cache/lycees-specialites-";

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

const fetchLyceesHavingSpecialite = async (spe) => {
  if (spe) {
    const cacheKey = baseCacheKey + spe;
    const fromCache = localStorage.getItem(cacheKey);
    const cacheData = fromCache ? JSON.parse(fromCache) : null;
    const cacheExpires = cacheData ? new Date(cacheData.expires) : null;

    if (cacheExpires && cacheExpires > new Date()) {
      console.log(
        "fetchLyceesHavingSpecialite found cache expires at : " + cacheExpires
      );
      return cacheData.data;
    } else {
      if (cacheExpires)
        console.log(
          "fetchLyceesHavingSpecialite cache expiré, appel API lycees secteur: " +
            cacheExpires
        );
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

        // add a day
        let date = new Date();
        date.setDate(date.getDate() + 1);
        console.log("expire in : " + date);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ expires: date, data: newLycees })
        );

        return newLycees;
      }
    }
  }
};

export { resetExclu, setExclu, fetchLyceesHavingSpecialite };
