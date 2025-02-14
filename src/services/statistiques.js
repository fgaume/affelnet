import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../services/firebase";
import { useEffect, useState } from "react";
import { computeBilanPeriodique } from "./bilan";
import { CDs } from "../data/bilan";

const saveStats = async (champ, newStats) => {
  // Renommer 'stats' en 'newStats' pour plus de clarté
  console.log("checking firestore stats for " + champ + " before saving...");

  const docRef = doc(firestore, "stats", champ);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Le document existe déjà, on va comparer les données

      const existingStats = docSnap.data();

      // Comparer les nouvelles stats (newStats) avec les stats existantes (existingStats)
      if (
        existingStats.moyenne === newStats.moyenne &&
        existingStats.ecart_type === newStats.ecart_type
      ) {
        console.log("Stats for " + champ + " are unchanged. No save needed.");
        return; // Sortir de la fonction sans sauvegarder car les données sont identiques
      } else {
        console.log(
          "Stats for " + champ + " have changed. Saving to Firestore..."
        );
        // Les stats sont différentes, on procède à la sauvegarde
        await setDoc(docRef, {
          moyenne: newStats.moyenne,
          ecart_type: newStats.ecart_type,
          timestamp: serverTimestamp(),
        });
        console.log("Stats for " + champ + " saved successfully in Firestore.");
      }
    } else {
      // Le document n'existe pas encore, il faut le créer (première sauvegarde)
      console.log(
        "Stats for " +
          champ +
          " do not exist yet. Saving to Firestore for the first time..."
      );
      await setDoc(docRef, {
        moyenne: newStats.moyenne,
        ecart_type: newStats.ecart_type,
      });
      console.log(
        "Stats for " + champ + " saved for the first time in Firestore."
      );
    }
  } catch (error) {
    console.error(
      "Error checking or saving stats for " + champ + " in Firestore:",
      error
    );
    // Gérer l'erreur ici (afficher un message à l'utilisateur, etc.)
  }
};

const computeStats = (notes) => {
  //console.log("computeStats : ", notes.toString());
  notes.sort((a, b) => (a.brute < b.brute ? 1 : -1));
  let smallPair = notes[0];
  //console.log("smallPair=", smallPair);
  let bigPair = notes[notes.length - 1];
  //console.log("bigPair=", bigPair);
  let x1 = smallPair.brute;
  //console.log("x1=", x1);
  let y1 = smallPair.harmonisee / 10 - 10;
  //console.log("y1=", y1);
  let x2 = bigPair.brute;
  //console.log("x2=", x2);
  let y2 = bigPair.harmonisee / 10 - 10;
  //console.log("y2=", y2);
  let ecartType = (x1 - x2) / (y1 - y2);
  let moyenne = x1 - y1 * ecartType;

  // Conserver 4 decimales pour la moyenne et 5 pour l'ecart_type
  let moyenneArrondie = parseFloat(moyenne.toFixed(4));
  let ecartTypeArrondi = parseFloat(ecartType.toFixed(5));

  let stats = {
    moyenne: moyenneArrondie,
    ecart_type: ecartTypeArrondi,
  };
  //console.log("stats=", stats);
  return stats;
};

const appendNewNote = (brute, harmonisee, champ, contributeur) => {
  console.log("saving in firestore new note pair for " + champ);
  const collectionRef = collection(firestore, "stats", champ, "notes");
  setDoc(doc(collectionRef, "CD" + 100 * brute), {
    brute: brute,
    harmonisee: harmonisee,
    timestamp: serverTimestamp(),
    contributeur: contributeur,
  });
};

function useStatsChamp(champ) {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    console.log("loading stats from firestore");
    const unsubscribe = onSnapshot(
      collection(firestore, "stats", champ, "notes"),
      (snapshot) => {
        const newNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(newNotes);
      },
      (error) => {
        console.log("erreur firestore: ", error);
      }
    );
    return () => unsubscribe();
  }, [champ]);
  return notes;
}

const localStats = (statsMap, pAnnee, derniereAnnee) => {
  const annee = pAnnee ? pAnnee : derniereAnnee;
  const statsCDs = statsMap.get(annee);

  const scoreBPMax = computeBilanPeriodique(CDs, statsCDs);
  return {
    statsCDs: statsCDs,
    scoreMax: scoreBPMax,
  };
};

// function useOngoingStats(statsMap, pAnnee, derniereAnnee) {
//   const annee = pAnnee ? pAnnee : derniereAnnee;
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     console.log("loading ongoing stats from firestore");
//     const unsubscribe = onSnapshot(
//       collection(firestore, "stats"),
//       (snapshot) => {
//         const newStats = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         const mergedMap = mergeStats(statsMap.get(annee), newStats);
//         const scoreBPMax = computeBilanPeriodique(CDs, statsMap(annee));
//         console.log("score BP next max = " + scoreBPMax);
//         setStats({
//           statsCD: mergedMap,
//           scoreMax: scoreBPMax,
//         });
//         console.log("firestore stats: ", newStats);
//       },
//       (error) => {
//         console.log("erreur firestore: ", error);
//       }
//     );
//     return () => unsubscribe();
//   }, [annee, statsMap]);

//   return stats;
// }

/* const statsCompleted = (pAnnee) => {
  const annee = pAnnee ? pAnnee : derniereAnnee;
  const moyennes = moyennesAcademiques.get(annee);
  const ecartTypes = ecartsAcademiques.get(annee);
  CDs.forEach( cd => {
    if (moyennes.get(cd) === null || moyennes.get(cd) === 0) return false;
    if (ecartTypes.get(cd) === null || ecartTypes.get(cd) === 0) return false;
  });
  return true;
} */

// const saveChampIfNotExists = async (nomChamp, statsMap, anneeN1) => {
//   console.log("check firestore existence champ stats: " + nomChamp);
//   const docRef = doc(firestore, "stats", nomChamp);
//   const docSnap = await getDoc(docRef);
//   if (!docSnap.exists()) {
//     console.log("does not exist");
//     const statsCDs = statsMap.get(anneeN1);
//     const statCD = statsCDs.get(nomChamp);
//     setDoc(doc(firestore, "stats", nomChamp), {
//       moyenne: statCD.moyenne,
//       ecart_type: statCD.ecart_type,
//     });
//   }
// };

export { computeStats, appendNewNote, useStatsChamp, saveStats, localStats };
