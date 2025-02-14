import React, { useState } from "react";
import { Alert, Button, Collapse, Form } from "react-bootstrap";
import { EmojiSmile, PlusCircle } from "react-bootstrap-icons";
import { appendNewNote } from "../services/statistiques";

const StatsEditor = (props) => {
  const [noteBrute, setNoteBrute] = useState("");
  const [noteHarmonisee, setNoteHarmonisee] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState(false);

  const onNoteBruteChange = (event) => {
    setNoteBrute(event.target.value);
  };

  const onNoteHarmoniseeChange = (event) => {
    setNoteHarmonisee(event.target.value);
  };

  const isValid = (brute, harmo) => {
    let isValid = false;
    if (brute >= 3 && brute <= 16) {
      if (harmo > 85 && harmo < 120) {
        const harmoString = harmo.toString();
        const frac = harmoString.split(".")[1];
        //console.log("frac=", frac);
        if (frac && frac.length > 1) {
          isValid = true;
          //console.log("notes valides");
        } else {
          setErrorMessage(
            "Note harmonisée incorrecte : doit avoir 3 décimales"
          );
        }
      } else {
        setErrorMessage(
          "Note harmonisée incorrecte : doit être entre 85 et 120"
        );
      }
    } else {
      setErrorMessage("Note brute incorrecte : doit être entre 3 et 16");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteBruteFloat = parseFloat(noteBrute.replace(",", "."));
    const noteHarmoniseeFloat = parseFloat(noteHarmonisee.replace(",", "."));
    if (isValid(noteBruteFloat, noteHarmoniseeFloat)) {
      setShowError(false);
      appendNewNote(
        noteBruteFloat,
        noteHarmoniseeFloat,
        props.champ,
        props.contributeur
      );
      setShowConfirm(true);
      setTimeout(() => {
        setShowConfirm(false);
        setOpen(false);
      }, 3500);
      e.target.reset();
    } else {
      setShowError(true);
    }
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
                type="number"
                step="0.01"
                onChange={onNoteBruteChange}
              />
            </div>
            <div className="p-2">
              <Form.Control
                id="noteHarmonisee"
                placeholder="note harmonisée"
                type="number"
                step="0.001"
                onChange={onNoteHarmoniseeChange}
              />
            </div>
            <div className="text-center p-2">
              <Button type="submit">Valider</Button>
              &nbsp;
              {showConfirm && (
                <Alert key="confirm" variant="success" className="my-3">
                  Les données ont été ajoutées. Merci de votre contribution{" "}
                  <EmojiSmile /> !
                </Alert>
              )}
              {showError && (
                <Alert key="confirm" variant="danger" className="my-3">
                  {errorMessage}
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
