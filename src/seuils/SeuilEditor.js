import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { Alert, Button, Card, Form } from "react-bootstrap";

import { listeLycees as lycees } from "../data/lycees";

import { Typeahead } from "react-bootstrap-typeahead";

const SeuilEditor = () => {
  const typeaheadRef = useRef(null);
  const [lyceeSeuil, setLyceeSeuil] = useState("");
  const [seuilLycee, setSeuilLycee] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const updateSeuil = (codeLycee, seuil) => {
    const docRef = doc(firestore, "seuils", codeLycee);
    updateDoc(docRef, {
      seuil: parseFloat(seuil.replace(",", ".")),
    });
  };

  const onLyceeChange = (lyceeUpdate) => {
    setLyceeSeuil(lyceeUpdate[0]);
  };

  const onSeuilLyceeChange = (event) => {
    setSeuilLycee(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSeuil(lyceeSeuil.code, seuilLycee);
    typeaheadRef.current.clear();
    document.getElementById("seuilLycee").value = "";
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <Card className="bg-primary p-2 text-dark bg-opacity-10 rounded mb-3">
      <Form onSubmit={handleSubmit}>
        <div className="p-2 w-75">
          <Typeahead
            id="lyceeSeuil"
            labelKey="nom"
            onChange={onLyceeChange}
            options={lycees}
            placeholder="nom du lycée"
            ref={typeaheadRef}
          />
        </div>
        <div className="p-2 w-75">
          <Form.Control
            id="seuilLycee"
            placeholder="seuil d'admission du lycée"
            type="float"
            onChange={onSeuilLyceeChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <Button
            className="my-2"
            type="submit"
            disabled={seuilLycee < 1000 || seuilLycee > 42000}
          >
            Ajouter
          </Button>
          &nbsp;
          {showConfirm && (
            <Alert key="confirm" variant="success" className="my-0">
              Le seuil du lycée a été ajouté. Merci de votre contribution !
            </Alert>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default SeuilEditor;
