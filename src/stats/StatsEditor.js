import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Button, Collapse, Form } from "react-bootstrap";
import { EmojiSmile, PlusCircle } from "react-bootstrap-icons";
import { firestore } from "../services/firebase";

const StatsEditor = (props) => {
  const [noteBrute, setNoteBrute] = useState(0);
  const [noteHarmonisee, setNoteHarmonisee] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  /* const updateSeuil = (codeLycee, seuil) => {
    const docRef = doc(firestore, "seuils", codeLycee);
    updateDoc(docRef, {
      seuil2023: parseFloat(seuil.replace(",", ".")),
    });
  }; */

  const appendNewNote = (brute, harmonisee) => {
    const collectionRef = collection(firestore, "stats", props.champ, "notes");
    setDoc(doc(collectionRef, "CD" + 100*brute), {
      brute: parseFloat(brute.replace(",", ".")),
      harmonisee: parseFloat(harmonisee.replace(",", ".")),
      timestamp: serverTimestamp(),
    });
  };

  const onNoteBruteChange = (event) => {
    setNoteBrute(event.target.value);
  };

  const onNoteHarmoniseeChange = (event) => {
    setNoteHarmonisee(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    appendNewNote(noteBrute, noteHarmonisee);
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
      setOpen(false);
    }, 4000);
    e.target.reset();
  };

  const handleAjouter = (e) => {
    setOpen(!open);
  };

  return (
    <div className="my-2 text-center">
      <Button
        variant="outline-primary"
        onClick={handleAjouter}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="mb-2"
      >
        <PlusCircle width="20" height="20" className="me-2" />
        Ajouter
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form onSubmit={handleSubmit}>
            <div className="p-2">
              <Form.Control
                id="noteBrute"
                placeholder="note brute"
                type="float"
                onChange={onNoteBruteChange}
              />
            </div>
            <div className="p-2">
              <Form.Control
                id="noteHarmonisee"
                placeholder="note harmonisée"
                type="float"
                onChange={onNoteHarmoniseeChange}
              />
            </div>
            <div className="text-center p-2">
              <Button
                type="submit"
                disabled={
                  noteHarmonisee < 80 ||
                  noteHarmonisee > 120 ||
                  noteBrute > 16 ||
                  noteBrute < 3
                }
              >
                Valider
              </Button>
              &nbsp;
              {showConfirm && (
                <Alert key="confirm" variant="success" className="my-3">
                  Les données ont été ajoutées. Merci de votre contribution{" "}
                  <EmojiSmile /> !
                </Alert>
              )}
            </div>
          </Form>
        </div>
      </Collapse>
    </div>
  );
};

export default StatsEditor;
