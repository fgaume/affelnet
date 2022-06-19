import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { listeLycees as lycees } from "../data/lycees";

import { Typeahead } from "react-bootstrap-typeahead";

const SeuilEditor = () => {
  const typeaheadRef = useRef(null);
  const [lyceeSeuil, setLyceeSeuil] = useState("");
  const [seuilLycee, setSeuilLycee] = useState(0);

  const updateSeuil = (codeLycee, seuil) => {
    const docRef = doc(firestore, "seuils", codeLycee);


    updateDoc(docRef, {
      seuil: parseFloat(seuil.replace(',','.')),
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
          <div className="p-2">
            <Button
              type="submit"
              disabled={seuilLycee < 1000 || seuilLycee > 42000}
            >
              Ajouter
            </Button>
          </div>
        </Form>
      </Card>
  );
};

export default SeuilEditor;
