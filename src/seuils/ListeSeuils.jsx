import { useEffect, useState } from "react";
import { Alert, Card, Figure, Form, Image, Table } from "react-bootstrap";
import {
  ArrowReturnRight,
  CheckLg,
  ExclamationCircle,
  ExclamationLg,
} from "react-bootstrap-icons";
import { listeLycees, urlsLyceesMap } from "../data/lycees";
import { formatFloat, formatInt, formatVariation } from "../services/helper";
import "./ListeSeuils.css";

function useSeuils(sorting = "byLycee") {
  const [lycees, setLycees] = useState([]);

  useEffect(() => {
    const newSeuils = listeLycees.map((doc) => ({
      id: doc.code,
      nom: doc.nom,
      seuil_prev_prev: doc.seuils[0] > 0 ? Math.round(doc.seuils[0]) : 0,
      seuil_prev: doc.seuils[1] > 0 ? Math.round(doc.seuils[1]) : 0,
      delta: (doc.seuils[1] > 0) && (doc.seuils[2] > 0) ? Math.round(doc.seuils[2] - doc.seuils[1]) : null,
      url: urlsLyceesMap.get(doc.code),
      seuil2023: doc.seuils[2] > 0 ? doc.seuils[2] : 0,
    }));
    switch (sorting) {
      case "bySeuilPrevPrev":
        newSeuils.sort((a, b) =>
          a.seuil_prev_prev < b.seuil_prev_prev ? 1 : -1
        );
        break;
      case "bySeuilPrev":
        newSeuils.sort((a, b) => (a.seuil_prev < b.seuil_prev ? 1 : -1));
        break;
      case "bySeuil":
        newSeuils.sort((a, b) => {
          if (isNaN(a.seuil2023)) return 1;
          if (isNaN(b.seuil2023)) return -1;
          return a.seuil2023 < b.seuil2023 ? 1 : -1;
        });
        break;
      case "byVariation":
        newSeuils.sort((a, b) => {
          if (isNaN(a.delta)) return 1;
          if (isNaN(b.delta)) return -1;
          return a.delta < b.delta ? 1 : -1;
        });
        break;
      default:
        newSeuils.sort((a, b) => (a.nom < b.nom ? -1 : 1));
    }
    setLycees(newSeuils);
  }, [sorting]);
  return lycees;
}

const ListeSeuils = (props) => {
  const [sorting, setSorting] = useState("byLycee");

  /* const determineVariationStyle = (prev, next) => {
    if (next > 0 && prev > 0) {
      return next > prev ? "variation text-danger" : "variation text-success";
    } else
    return "variation text-primary";
  }; */

  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const lycees = useSeuils(sorting);

  useEffect(() => {
    let newNumberSeuils = 0;
    lycees.forEach((item) => {
      if (item.seuil2023 > 0) newNumberSeuils++;
    });
    props.onChange(newNumberSeuils);
  }, [props, lycees]);

  return (
    <div>
      <div className="mb-3">
        <ArrowReturnRight /> Cette section liste les scores d'admission{" "}
        <strong>non-boursiers</strong> de chaque lycée parisien lors des 2
        dernières sessions, ainsi que l'évolution par rapport à l'an dernier. La
        source de ces seuils est l'ensemble des fiches-barème reçues du Rectorat
        et ensuite partagées par les parents. Figure également un lien vers la
        fiche descriptive du lycée produite par la FCPE. Les seuils des
        anciennes années sont arrondis.
      </div>
      <div className="combo">
        <Form.Select size="sm" value={sorting} onChange={handleSortChange}>
          <option value="byLycee">trier par lycée</option>
          <option value="bySeuil">trier par seuil 2023</option>
          <option value="bySeuilPrev">trier par seuil 2022</option>
          <option value="bySeuilPrevPrev">trier par seuil 2021</option>
          <option value="byVariation">trier par variation</option>
        </Form.Select>
      </div>

      <Card className="mb-0 mt-3">
        <Table striped borderless hover responsive="lg" className="mb-0">
          <thead>
            <tr>
              <th className="lycee">Lycée</th>
              <th className="seuil">seuil 2021</th>
              <th className="seuil">seuil 2022</th>
              <th className="seuil">seuil 2023</th>
              <th className="variation">+/-</th>
            </tr>
          </thead>
          <tbody>
            {lycees.map((lycee, index) => (
              <tr key={lycee.id}>
                <td className="lycee">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={lycee.url}
                    aria-label="lien fiche FCPE du lycée"
                  >
                    {lycee.nom}
                  </a>
                  &nbsp;
                  {lycee.seuil2023 > 1000000 && (
                    <CheckLg color="green" width="20" height="20" />
                  )}
                  {lycee.seuil2023 === 0 && (
                    <ExclamationLg color="red" width="20" height="20" />
                  )}
                </td>
                <td className="seuil text-muted">
                  {lycee.seuil_prev > 0
                    ? formatInt(lycee.seuil_prev_prev)
                    : "?"}
                </td>
                <td className="seuil text-muted">
                  {lycee.seuil_prev > 0 ? formatInt(lycee.seuil_prev) : "?"}
                </td>
                <td className="seuil text-success">
                  {lycee.seuil2023 > 0 ? formatFloat(lycee.seuil2023) : "?"}
                </td>
                <td className="seuil text-primary">
                  {lycee.delta !== null ? formatVariation(lycee.delta) : "?"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <div className="mt-5 mb-3">
        <Alert variant="warning">
          <div className="mb-2">
            <ExclamationCircle
              width="32"
              height="32"
              className="text-danger me-1"
            />{" "}
            Les seuils d'admission sont des scores Affelnet réels, donc ils
            prennent en compte les <strong>bonus IPS</strong>. Ils ne
            constituent donc absolument{" "}
            <strong>pas un indicateur du niveau scolaire</strong> du dernier
            collégien admis et donc du lycée. Un seuil élevé indique une forte
            pression des collégiens bénéficiant de bonus IPS (cf. situation des
            lycées Turgot, Condorcet ou Hélène Boucher par exemple). La section
            "Secteurs" plus bas permet de se faire une idée du poids des 2
            groupes de collégiens avec bonus sur un lycée donné.
          </div>
          <div>
            De plus, comme le montre la figure ci-dessous, le domaine de valeur
            des scores Affelnet est <strong>loin d'être continu</strong>, donc
            une variation de seuil d'une année sur l'autre ne doit pas être
            sur-interpreté non plus (par exemple on voit sur le schéma
            ci-dessous (à l'échelle) qu'aucun collégien ne peut avoir un score
            entre 27 000 et 37 000).
          </div>
        </Alert>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-8 col-xxl-8 mx-auto">
          <Figure>
            <Image
              src="/images/score-discontinu.png"
              className="img-fluid"
              alt="Domaine de valeurs des scores Affelnet"
            />
            <Figure.Caption className="text-center">
              Fig. 1 : valeurs possibles pour un score Affelnet en 2022
            </Figure.Caption>
          </Figure>
        </div>
      </div>
    </div>
  );
};

export default ListeSeuils;
