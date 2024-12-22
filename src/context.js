import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SharedContext = createContext([]);

export const SharedProvider = ({ children }) => {
  const [listeColleges, setListeColleges] = useState([]);
  const [collegesMap, setCollegesMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://affelnet-paris.web.app/api/colleges.json"
        );
        setListeColleges(response.data);
        setCollegesMap(collegesMap)
      } catch (error) {
        console.error(error);
      } finally {
        console.log("appel colleges terminé")
      }
    };

    fetchData();
  }, [collegesMap]); // Le tableau vide [] assure que useEffect ne s'exécute qu'une fois au montage

  return (
    <SharedContext.Provider value={{ listeColleges, collegesMap }}>
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContext;
