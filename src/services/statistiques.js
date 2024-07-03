import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../services/firebase";
import { useEffect, useState } from "react";
import { ecartsAcademiques, moyennesAcademiques } from "../data/stats";
import {
  computeBilanPeriodique,
  mergeEcartsTypes,
  mergeMoyennes,
} from "./bilan";
import { CDs } from "../data/bilan";

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
  let stats = { moyenne: moyenne, ecartType: ecartType };
  //console.log("stats=", stats);
  return stats;
};

const saveChampIfNotExists = async (nomChamp) => {
  console.log("check firestore existence champ stats: " + nomChamp);
  const docRef = doc(firestore, "stats", nomChamp);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("does not exist");
    const moyennesValides = moyennesAcademiques.get(2023);
    const ecartsValides = ecartsAcademiques.get(2023);
    setDoc(doc(firestore, "stats", nomChamp), {
      moyenne: moyennesValides.get(nomChamp),
      ecartType: ecartsValides.get(nomChamp),
    });
  }
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

const saveStats = (champ, stats) => {
  console.log("saving in firestore stats for " + champ);
  setDoc(doc(firestore, "stats", champ), {
    moyenne: stats.moyenne,
    ecartType: stats.ecartType,
  });
};

function useStatsChamp(champ, annee) {
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

const localStats = (annee) => {
  const scoreBPMax = computeBilanPeriodique(
    CDs,
    moyennesAcademiques.get(annee),
    ecartsAcademiques.get(annee)
  );
  return {
    moyennes: moyennesAcademiques.get(annee),
    ecarttypes: ecartsAcademiques.get(annee),
    scoreMax: scoreBPMax,
  }
}

function useOngoingStats(annee) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    console.log("loading ongoing stats from firestore");
    const unsubscribe = onSnapshot(
      collection(firestore, "stats"),
      (snapshot) => {
        const newStats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moyennesMap = mergeMoyennes(
          moyennesAcademiques.get(annee),
          newStats
        );
        const ecarttypesMap = mergeEcartsTypes(
          ecartsAcademiques.get(annee),
          newStats
        );
        const scoreBPMax = computeBilanPeriodique(
          CDs,
          moyennesMap,
          ecarttypesMap
        );
        console.log("score BP next max = " + scoreBPMax);
        setStats({
          moyennes: moyennesMap,
          ecarttypes: ecarttypesMap,
          scoreMax: scoreBPMax,
        });
        console.log("firestore stats: ", newStats);
      },
      (error) => {
        console.log("erreur firestore: ", error);
      }
    );
    return () => unsubscribe();
  }, [annee]);

  return stats;
}

const statsCompleted = (annee) => {
  const moyennes = moyennesAcademiques.get(annee);
  const ecartTypes = ecartsAcademiques.get(annee);
  CDs.forEach( cd => {
    if (moyennes.get(cd) === null || moyennes.get(cd) === 0) return false;
    if (ecartTypes.get(cd) === null || ecartTypes.get(cd) === 0) return false;
  });
  return true;
}

export {
  computeStats,
  saveChampIfNotExists,
  appendNewNote,
  useStatsChamp,
  saveStats,
  useOngoingStats,
  localStats,
  statsCompleted,
};
