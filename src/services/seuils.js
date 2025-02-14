import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

/* const saveSeuil = (codeLycee, seuil, contributeur) => {
  console.log("saving seuil in firestore");
  const docRef = doc(firestore, "seuils", codeLycee);
  updateDoc(docRef, {
    seuilRecent: seuil,
    contributeur: contributeur,
  });
}; */

const saveSeuil = async (codeLycee, seuil, contributeur) => {
  console.log("saving seuil in firestore");
  const docRef = doc(firestore, "seuils", codeLycee);
  try {
    await setDoc(
      docRef,
      {
        // Utilisation de setDoc au lieu de updateDoc
        seuilRecent: seuil,
        contributeur: contributeur,
      },
      { merge: true }
    ); // Option merge: true pour créer si nécessaire et fusionner sinon
    console.log("Seuil sauvegardé avec succès pour le lycée :", codeLycee);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du seuil :", error);
  }
};

// function useSeuilsRecents() {
//     const [seuilsRecentsLyceesMap, setSeuilsRecentsLyceesMap] = useState([]);

//     useEffect(() => {
//       console.log("seuils firestore called ");
//       const unsubscribe = onSnapshot(
//         collection(firestore, "seuils"),
//         (snapshot) => {
//           const newSeuils = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           let newMap = new Map();
//           newSeuils.forEach((seuil) => {
//               newMap.set(seuil.id, seuil.seuilRecent);
//           });
//           setSeuilsRecentsLyceesMap(newMap);
//           //console.log("seuils firestore: ", newMap);
//         },
//         (error) => {
//           console.log("erreur firestore: ", error);
//         }
//       );
//       return () => unsubscribe();
//     }, []);
//     return seuilsRecentsLyceesMap;
//   }

// const getSeuil = (annee, codeLycee, lyceesMap, recentMap) => {
//   //console.log("getSeuil: " + annee);
//   //const seuilMap = seuilsLyceesMap.get(codeLycee);
//   if (lyceesMap === null) return 0.0;
//   const lycee = lyceesMap.get(codeLycee);
//   const lyceeSeuils = lycee.seuils;
//   const existingSeuil = lyceeSeuils[annee - 2021]; // on tente seuil connu
//   if (existingSeuil && existingSeuil > 0) return existingSeuil;
//   if (recentMap !== null && recentMap !== undefined) {
//     const recentSeuil = recentMap.get(codeLycee); // on tente seuil recent
//     if (recentSeuil && recentSeuil > 0) return recentSeuil;
//   }
//   return 0.0;
// }

export { saveSeuil };
