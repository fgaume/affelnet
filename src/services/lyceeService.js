import axios from "axios";

const fetchLycees = async (collegeSecteur, lyceesMap, seuilsRecents) => {
  if (collegeSecteur) {
    const response = await axios({
      method: "GET",
      url: "https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0/query",
      headers: {},
      params: {
        outFields: "UAI,secteur",
        returnGeometry: "false",
        f: "pjson",
        orderByFields: "secteur",
        where: `secteur<>'Tête' and Réseau='${collegeSecteur.code}'`,
      },
    });

    const payload = response.data.features;
    if (payload) {
      let newLycees = payload.map((item) => {
        const codelycee = item.attributes.UAI;
        const lycee = lyceesMap.get(codelycee);

        const historySeuilsLycee = lycee.seuils;
        const nbSeuils = historySeuilsLycee.length;

        let seuilRecent = 0;
        let seuilPrecedent = 0;

        if (seuilsRecents && seuilsRecents.length > 0) {
          const seuilRecentObject = seuilsRecents.find(
            (lycee) => lycee.code === codelycee
          );
          if (seuilRecentObject) {
            seuilRecent = seuilRecentObject.seuil;
          }

          seuilPrecedent = historySeuilsLycee.at(-1);
        }
        else {
          seuilRecent = historySeuilsLycee.at(-1);
          seuilPrecedent = historySeuilsLycee[nbSeuils - 2];
        }

        /* if (codelycee === '0750675B') {
          console.log("seuilRecent", seuilRecent);
          console.log("seuilPrecedent", seuilPrecedent);
        } */

        return {
          code: codelycee,
          secteur: parseInt(item.attributes.secteur),
          nom: lycee.nom,
          //          seuils: historySeuilsLyceesMap.get(codelycee),
          seuilRecent: seuilRecent,
          seuilPrecedent: seuilPrecedent,
          url: lycee.url,
        };
      });

      // ajout des lycées multisecteurs 1
      const tousSecteurs = ["0750655E", "0750654D", "0750685M"];
      tousSecteurs.forEach((codelycee) => {
        const lycee = lyceesMap.get(codelycee);
        const historySeuilsLycee = lycee.seuils;
        const nbSeuils = historySeuilsLycee.length;
        const seuilPrecedent = historySeuilsLycee[nbSeuils - 2];
        newLycees.push({
          code: codelycee,
          secteur: 1,
          nom: lycee.nom,
          //          seuils: historySeuilsLyceesMap.get(codelycee),
          seuilRecent: lycee.seuils.at(-1),
          seuilPrecedent: seuilPrecedent,
          url: lycee.url,
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
        collegeSecteur.nom
      );
      return [];
    }
  }
};

export default fetchLycees;
