import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CDs } from "./data/bilan";
import { computeBilanPeriodique } from "./services/bilan";

const SharedContext = createContext([]);

export const SharedProvider = ({ children }) => {
  const [data, setData] = useState({ completed: false, callsCompleted: 0 });

  useEffect(() => {
    let callsCompleted = 0; // Compteur local à useEffect

    const affelnetParisHostname =
      window.location.hostname === "localhost"
        ? "http://127.0.0.1:8080"
        : "https://affelnet-paris.web.app";

    const fetchAppInfos = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/app.json`
        );
        // Mise à jour de l'état avec les infos app
        setData((prevData) => ({ ...prevData, infos: response.data }));
        if (response.data.seuils_editables === true) {
          fetchSeuilsRecents();
        }
        else {
          console.log("fetchSeuilsRecents skipped");
          // callsCompleted++;
          // checkCompletion();
          }
        if (response.data.stats_editables === true) {
          fetchStatsRecentes();
        }
        else {
          console.log("fetchStatsRecentes skipped");
          // callsCompleted++;
          // checkCompletion();
        }
      } catch (error) {
        console.error("error fetchAppInfos", error);
      } finally {
        console.log("fetchAppInfos OK");
        callsCompleted++;
        checkCompletion();
      }
    };

    const fetchSeuilsRecents = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/seuils_recents.json`
        );
        // Mise à jour de l'état avec les seuils_recents
        setData((prevData) => ({ ...prevData, seuilsRecents: response.data }));
      } catch (error) {
        console.error("error fetchSeuilsRecents", error);
      } finally {
        console.log("fetchSeuilsRecents OK");
        // callsCompleted++;
        // checkCompletion();
      }
    };

    const fetchStatsRecentes = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/stats_recentes.json`
        );

        const statsMap = new Map();

        response.data.forEach((item) => {
          const annee = item.annee;
          const champ = item.champ;
          const moyenne = item.moyenne;
          const ecartType = item["ecart-type"];

          if (!statsMap.has(annee)) {
            statsMap.set(annee, new Map());
          }

          statsMap.get(annee).set(champ, { moyenne, ecart_type: ecartType });
        });

        if (statsMap.size !== 0) {

          // Mise à jour de l'état avec les stats_recentes
          setData((prevData) => ({
            ...prevData,
            recentStatsMap: statsMap,
          }));
        }
      } catch (error) {
        console.error("error fetchStatsRecentes", error);
      } finally {
        console.log("fetchStatsRecentes OK");
        // callsCompleted++;
        // checkCompletion();
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/statistiques.json`
        );

        const statsMap = new Map();

        response.data.forEach((item) => {
          const annee = item.annee;
          const champ = item.champ;
          const moyenne = item.moyenne;
          const ecartType = item["ecart-type"];

          if (!statsMap.has(annee)) {
            statsMap.set(annee, new Map());
          }

          statsMap.get(annee).set(champ, { moyenne, ecart_type: ecartType });
        });
        //console.log("statsMap: ", statsMap);

        const annees = Array.from(statsMap.keys()); // Obtenir un tableau des années
        const derniereAnnee = Math.max(...annees); // Trouver l'année maximale

        const scoreMaxAnneeN = computeBilanPeriodique(
          CDs,
          statsMap.get(derniereAnnee)
        );
        const scoreMaxAnneeN1 = computeBilanPeriodique(
          CDs,
          statsMap.get(derniereAnnee - 1)
        );

        // Mise à jour de l'état avec les stats
        setData((prevData) => ({
          ...prevData,
          statsMap: statsMap,
          derniereAnnee: derniereAnnee,
          scoreMaxAnneeN: scoreMaxAnneeN,
          scoreMaxAnneeN1: scoreMaxAnneeN1,
        }));
      } catch (error) {
        console.error("error fetchStats", error);
      } finally {
        console.log("fetchStats OK");
        callsCompleted++;
        checkCompletion();
      }
    };

    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/colleges.json`
        );
        // Mise à jour de l'état avec les collèges
        setData((prevData) => ({ ...prevData, listeColleges: response.data }));
      } catch (error) {
        console.error("error fetchLycees", error);
      } finally {
        console.log("fetchColleges OK");
        callsCompleted++;
        checkCompletion();
      }
    };

    const fetchLycees = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/lycees.json`
        );
        const listeLycees = response.data;
        const anneeN = 2020 + listeLycees[0].seuils.length;

        const lyceesMap = new Map();
        let nombreSeuils = 0;
        listeLycees.forEach((item) => {
          // from item : code/nom/seuils[]/capacite
          item.url = `https://data.education.gouv.fr/pages/fiche-etablissement/?code_etab=${item.code}`;
          // LLG et H4 n'ont pas de seuils car hors algo
          item.hasSeuil = item.code !== "0750655E" && item.code !== "0750654D";
          // to item : code/nom/seuils[]/capacite/url/hasSeuil
          const seuilsMap = item.seuils.reduce((map, seuil, index) => {
            map.set(2021 + index, seuil);
            return map;
          }, new Map());
          item.seuilsMap = seuilsMap;
          lyceesMap.set(item.code, item);

          const seuils = item.seuils;
          if (seuils && seuils.length > 0) {
            const dernierSeuil = seuils[seuils.length - 1];
            if (dernierSeuil > 0) {
              nombreSeuils++;
            }
          }
        });

        // Mise à jour de l'état avec les lycées
        setData((prevData) => ({
          ...prevData,
          anneeN: anneeN,
          lyceesMap: lyceesMap,
          listeLycees: listeLycees,
          nombreSeuils: nombreSeuils,
        }));
      } catch (error) {
        console.error("error fetchLycees", error);
      } finally {
        console.log("fetchLycees OK");
        callsCompleted++;
        checkCompletion();
      }
    };

    // NOUVEAU : Fonction pour charger les barèmes de notes
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${affelnetParisHostname}/api/notes.json`
        );
        const baremesData = response.data.baremes;

        // On transforme l'objet en une Map de Maps pour une utilisation optimisée
        // La structure sera : Map<NomMatiere, Map<NoteBrute, NoteHarmonisee>>
        const baremesMap = new Map();
        for (const [matiere, points] of Object.entries(baremesData)) {
          baremesMap.set(matiere, new Map(points));
        }

        // Mise à jour de l'état avec les barèmes de notes
        setData((prevData) => ({
          ...prevData,
          baremesMap: baremesMap,
        }));
      } catch (error) {
        console.error("error fetchNotes", error);
      } finally {
        console.log("fetchNotes OK");
        callsCompleted++;
        checkCompletion();
      }
    };

    const checkCompletion = () => {
      if (callsCompleted === 5) {
        // gerer ici les stats recentes extrapolées et scores max
        /* const annee = data.recentStatsMap.keys().next().value;
        const scoreMaxAnneeN = computeBilanPeriodique(
          CDs,
          data.statsMap.get(annee-1),
          data.recentStatsMap.get(annee)
        ); */
        setData((prevData) => ({ ...prevData, completed: true}));
        console.log("completed: ", callsCompleted);
      }
    };

    fetchAppInfos();
    fetchStats();
    fetchColleges();
    fetchLycees();
    fetchNotes();
  }, []);

  return (
    <SharedContext.Provider value={{ data }}>{children}</SharedContext.Provider>
  );
};

export default SharedContext;
