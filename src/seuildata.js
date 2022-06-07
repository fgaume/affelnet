import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { listeLycees as lycees } from "./data/lycees";

export const createSeuils = async () => {
    const lyceeRef = collection(firestore, "seuils");
    debugger
    lycees.forEach((lycee) => {
        setDoc(doc(lyceeRef, lycee.code), {
            seuil : 0
             });
        });
};  

export const getAllSeuils = async () => {
    console.log("getAllSeuils called");
    let remoteSeuils = new Map();
    const itemsColRef = collection(firestore, 'seuils');
    let snap = await getDocs(itemsColRef);
    snap.forEach((doc) => {
        remoteSeuils.set(doc.id, doc.data().seuil);
    });
    return remoteSeuils;
}


/* export const getSeuils = async (codeLycee) => {
    const docRef = doc(db, "seuils", codeLycee);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}; */

export const updateSeuil = (codeLycee, seuil) => {
    const docRef = doc(firestore, "seuils", codeLycee);

    // Set the "capital" field of the city 'DC'
    updateDoc(docRef, {
        seuil: parseInt(seuil)
    });
}
