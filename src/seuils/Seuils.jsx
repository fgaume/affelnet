import React, { useState, useMemo } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { GraphUp, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { linearRegression } from "simple-statistics";
import GraphiqueSeuils from "./GraphiqueSeuils";
import "./Seuils.css";

const Seuils = ({ listeLycees, seuilsRecents, enableSeuilsRecents }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLycee, setSelectedLycee] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "nom",
    direction: "ascending",
  });

  // L'année du seuil courant est l'année actuelle
  //const anneeCourante = new Date().getFullYear();
  //const anneeCourante = 
  // On va mapper currentSeuils par code de lycée pour un accès plus rapide
  const seuilsRecentsMap = useMemo(() => {
    const map = new Map();
    if (seuilsRecents) {
      seuilsRecents.forEach(({ code, seuil }) => {
        map.set(code, seuil);
      });
    }
    return map;
  }, [seuilsRecents]);

  // Trouver l'année la plus récente dans les données historiques
  const anneeRecente = useMemo(() => {
    if (!listeLycees || listeLycees.length === 0) return null;
    let maxAnnee = 0;
    listeLycees.forEach((lycee) => {
      if (lycee.seuilsMap) {
        const annees = Array.from(lycee.seuilsMap.keys()).map(Number);
        const max = Math.max(...annees);
        maxAnnee = Math.max(maxAnnee, max);
      }
    });
    return maxAnnee;
  }, [listeLycees]);

  // Trouver l'année précédente (par rapport à l'année la plus récente dans les données historiques)
  const anneePrecedente = useMemo(() => {
    if (!anneeRecente) return null;
    let anneePrec = 0;
    listeLycees.forEach((lycee) => {
      if (lycee.seuilsMap) {
        const annees = Array.from(lycee.seuilsMap.keys())
          .map(Number)
          .filter((annee) => annee < anneeRecente);
        const max = Math.max(...annees);
        anneePrec = Math.max(anneePrec, max);
      }
    });
    return anneePrec;
  }, [anneeRecente, listeLycees]);

  // Calculer la variation relative et la pente de régression pour chaque lycée
  const lyceesData = useMemo(() => {
    return listeLycees.map((lycee) => {
      const seuilsMap = new Map();
      for (const [annee, seuil] of lycee.seuilsMap.entries()) {
        seuilsMap.set(Number(annee), Number(seuil));
      }
      const seuilRecent = seuilsMap.get(anneeRecente);
      const seuilPrecedent = seuilsMap.get(anneePrecedente);
      // On calcule la difference brute :
      const difference =
        seuilRecent && seuilPrecedent ? seuilRecent - seuilPrecedent : null;

      const seuilsArray = Array.from(seuilsMap.entries()).map(
        ([annee, seuil]) => ({
          annee: Number(annee),
          seuil: Number(seuil),
        })
      );
      seuilsArray.sort((a, b) => a.annee - b.annee);
      const dataForRegression = seuilsArray.map((s) => [
        Number(s.annee),
        Number(s.seuil),
      ]);
      const regression = linearRegression(dataForRegression);
      const pente = regression.m;

      // Récupérer le seuil de l'année courante si disponible
      const seuilCourant = seuilsRecentsMap.get(lycee.code) || null;

      return {
        ...lycee,
        seuilsMap,
        seuilRecent,
        difference,
        pente,
        seuilsArray,
        seuilCourant,
      };
    });
  }, [listeLycees, anneeRecente, anneePrecedente, seuilsRecentsMap]);

  // Trier les données
  const sortedLycees = useMemo(() => {
    if (!sortConfig.key) return lyceesData;

    return [...lyceesData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Traitement des cas spéciaux pour les colonnes calculées
      if (sortConfig.key === "difference") {
        aValue = a.difference;
        bValue = b.difference;
      } else if (sortConfig.key === "seuilRecent") {
        aValue = a.seuilRecent;
        bValue = b.seuilRecent;
      } else if (sortConfig.key === "seuilCourant" && enableSeuilsRecents) {
        aValue = a.seuilCourant;
        bValue = b.seuilCourant;
      } else if (sortConfig.key === "nom") {
        // pour la colonne 'nom' on va comparer les chaines en tenant compte des minuscules, majuscules et accents
        aValue = a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
        bValue = 0; // on compare 'a' à lui-même pour obtenir une valeur neutre
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [lyceesData, sortConfig, enableSeuilsRecents]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp size={12} />
    ) : (
      <ChevronDown size={12} />
    );
  };

  const handleShowModal = (lycee) => {
    setSelectedLycee(lycee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Trouver l'année min pour le titre de la modale
  const anneeMin = useMemo(() => {
    if (!selectedLycee) return null;
    return Math.min(...Array.from(selectedLycee.seuilsMap.keys()).map(Number));
  }, [selectedLycee]);

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center" onClick={() => requestSort("nom")}>
              Lycée {getSortIndicator("nom")}
            </th>
            {/* Colonne "Seuil courant" conditionnelle */}
            {enableSeuilsRecents && (
              <th onClick={() => requestSort("seuilCourant")} className="text-center">
                Seuil {1+anneeRecente} {getSortIndicator("seuilCourant")}
              </th>
            )}
            <th onClick={() => requestSort("seuilRecent")} className="text-center">
              Seuil {anneeRecente} {getSortIndicator("seuilRecent")}
            </th>
            {!enableSeuilsRecents && (
            <th onClick={() => requestSort("difference")} className="text-center">
              +/- {anneeRecente}/{anneePrecedente} {getSortIndicator("difference")}
            </th>
            )}
            <th onClick={() => requestSort("pente")} className="text-center">
              Tendance {getSortIndicator("pente")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLycees.map(lycee => (
            <tr key={lycee.code} className="my-0">
              <td className="text-center text-icon-aligned" >
                <a href={lycee.url} target="_blank" rel="noopener noreferrer">
                  {lycee.nom}
                </a>
              </td>
              {/* Cellule "Seuil courant" conditionnelle avec toLocaleString() */}
              {enableSeuilsRecents && (
                <td className="text-center text-danger text-icon-aligned">
                  {lycee.seuilCourant !== null ? lycee.seuilCourant.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "?"}
                </td>
              )}
              <td className="text-center text-primary" style={{ verticalAlign: '0.2em' }}>
                {/* Utilisation de toLocaleString() pour les seuils récents */}
                {lycee.seuilRecent === null ? "?" : lycee.seuilRecent === 0 ? "-" : lycee.seuilRecent.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </td>
              {!enableSeuilsRecents && (
              <td className="text-center" style={{ verticalAlign: '0.2em' }}>
                {/* Utilisation de toLocaleString() pour la différence */}
                <span className="text-primary">
                  {lycee.difference > 0 ? "+" : ""}
                  {lycee.difference !== null ? lycee.difference.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "?"}{" "}
                  {lycee.difference > 0 ? "↑" : lycee.difference < 0 ? "↓" : ""}
                </span>
              </td>
              )}
              <td className="text-center" style={{ verticalAlign: '20px' }}>
                <Button
                  variant="link"
                  onClick={() => handleShowModal(lycee)}
                  className="graph-icon-button mt-0 mb-0"
                >
                  <GraphUp size={20}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Seuil de {selectedLycee?.nom} depuis {anneeMin}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
          {selectedLycee && (
            <GraphiqueSeuils
              seuils={selectedLycee.seuilsArray}
              lyceeNom={selectedLycee.nom}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Seuils;
