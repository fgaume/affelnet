import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SharedContext = createContext([]);

export const SharedProvider = ({ children }) => {
  const [data, setData] = useState(null); // Un seul état pour les deux listes

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          "https://affelnet-paris.web.app/api/colleges.json"
        );
        // Mise à jour de l'état avec les collèges
        setData(prevData => ({ ...prevData, listeColleges: response.data })); 
      } catch (error) {
        console.error(error);
      } finally {
        console.log("appel colleges terminé");
      }
    };

    const fetchLycees = async () => {
      try {
        const response = await axios.get(
          "https://affelnet-paris.web.app/api/lycees.json"
        );
        // Mise à jour de l'état avec les lycées
        setData(prevData => ({ ...prevData, listeLycees: response.data })); 
      } catch (error) {
        console.error(error);
      } finally {
        console.log("appel lycees terminé");
      }
    };

    fetchColleges();
    fetchLycees();
  }, []);

  return (
    <SharedContext.Provider value={{ data }}> {/* Passage de l'objet data */}
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContext;