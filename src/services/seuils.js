import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "./firebase";
import { seuilsLyceesMap } from "../data/lycees";

const saveSeuil = (codeLycee, seuil, contributeur) => {
  console.log("saving seuil in firestore");
  const docRef = doc(firestore, "seuils", codeLycee);
  updateDoc(docRef, {
    seuilRecent: seuil,
    contributeur: contributeur,
  });
};

function useSeuilsRecents() {
    const [seuilsRecentsLyceesMap, setSeuilsRecentsLyceesMap] = useState([]);
  
    useEffect(() => {
      console.log("seuils firestore called ");
      const unsubscribe = onSnapshot(
        collection(firestore, "seuils"),
        (snapshot) => {
          const newSeuils = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let newMap = new Map();
          newSeuils.forEach((seuil) => {
              newMap.set(seuil.id, seuil.seuilRecent);
          });
          setSeuilsRecentsLyceesMap(newMap);
          //console.log("seuils firestore: ", newMap);
        },
        (error) => {
          console.log("erreur firestore: ", error);
        }
      );
      return () => unsubscribe();
    }, []);
    return seuilsRecentsLyceesMap;
  }

  const getSeuil = (annee, codeLycee, recentMap) => {
    //console.log("getSeuil: " + annee);
    const seuilMap = seuilsLyceesMap.get(codeLycee);
    const existingSeuil = seuilMap[annee - 2021]; // on tente seuil connu
    if (existingSeuil && existingSeuil > 0) return existingSeuil;
    if (recentMap !== null && recentMap !== undefined) {
      const recentSeuil = recentMap.get(codeLycee); // on tente seuil recent
      if (recentSeuil && recentSeuil > 0) return recentSeuil;
    }
    return 0.0;
  }

  export { useSeuilsRecents, saveSeuil, getSeuil }
