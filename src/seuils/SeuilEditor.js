import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

import { listeLyceesSeuils as lycees } from "../data/lycees";

import { ArrowReturnRight, EmojiSmile } from "react-bootstrap-icons";
import { Typeahead } from "react-bootstrap-typeahead";
import { saveSeuil } from "../services/seuils";

const SeuilEditor = (props) => {
  const typeaheadRef = useRef(null);
  const [lyceeSeuil, setLyceeSeuil] = useState("");
  const [seuilLycee, setSeuilLycee] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const onLyceeChange = (lyceeUpdate) => {
    setLyceeSeuil(lyceeUpdate[0]);
  };

  const onSeuilLyceeChange = (event) => {
    const newSeuil = event.target.value;
    const cleanSeuil = parseFloat(newSeuil.replace(",", ".").replace(" ", ""));
    setSeuilLycee(cleanSeuil);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSeuil(lyceeSeuil.code, seuilLycee, props.contributeur);
    //props.onSeuilUpdated(lyceeSeuil.code, seuilLycee);
    typeaheadRef.current.clear();
    document.getElementById("seuilLycee").value = "";
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <Card className="p-1 bg-primary bg-opacity-10">
      <Card.Subtitle className="mx-2 mt-3 mb-0">
        <ArrowReturnRight /> Ajoutez ici un nouveau seuil d'admission :{" "}
      </Card.Subtitle>
      <Card.Body  className="mt-0">
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
              className="mt-1 mb-0"
              type="submit"
              disabled={
                seuilLycee === 0 || isNaN(seuilLycee) || seuilLycee < 4000
              }
            >
              Ajouter
            </Button>
            &nbsp;
            {showConfirm && (
              <Alert key="confirm" variant="success" className="ms-3 my-0">
                Les données ont été ajoutées. Merci de votre contribution{" "}
                  <EmojiSmile /> !
              </Alert>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SeuilEditor;
