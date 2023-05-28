import { useState, useEffect } from "react";
import { firestore } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, Form, Table } from "react-bootstrap";
import { nomsLyceesMap, seuilsLyceesMap, urlsLyceesMap } from "../data/lycees";
import {
  ArrowDownRight,
  ArrowReturnRight,
  ArrowUpRight,
  CheckLg,
  ExclamationLg,
} from "react-bootstrap-icons";
import "./ListeSeuils.css";
import { formatFloat, formatInt, formatVariation } from "../services/helper";

function useSeuils(sorting = "byLycee") {
  const [lycees, setLycees] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "seuils"),
      (snapshot) => {
        const newSeuils = snapshot.docs.map((doc) => ({
          id: doc.id,
          nom: nomsLyceesMap.get(doc.id),
          seuil_prev: seuilsLyceesMap.get(doc.id)[0],
          url: urlsLyceesMap.get(doc.id),
          ...doc.data(),
        }));
        switch (sorting) {
          case "bySeuilPrev":
            newSeuils.sort((a, b) => (a.seuil_prev < b.seuil_prev ? 1 : -1));
            break;
          case "bySeuil":
            newSeuils.sort((a, b) => (a.seuil < b.seuil ? 1 : -1));
            break;
          case "byVariation":
            newSeuils.sort((a, b) => {
              if (a.seuil_prev === 0 || b.seuil_prev === 0) return 1;
              if (a.seuil - a.seuil_prev > b.seuil - b.seuil_prev) return -1;
              else return 1;
            });
            break;
          default:
            newSeuils.sort((a, b) => (a.nom < b.nom ? -1 : 1));
        }
        setLycees(newSeuils);
      }
    );
    return () => unsubscribe();
  }, [sorting]);
  return lycees;
}

const ListeSeuils = (props) => {
  const [sorting, setSorting] = useState("byLycee");

  /* const handleClick = () => {
        createSeuils();
    } */

  const determineVariationStyle = (prev, next) => {
    /* if (next > 0 && prev > 0) {
      return next > prev ? "variation text-danger" : "variation text-success";
    } else */
    return "variation text-primary";
  };

  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const lycees = useSeuils(sorting);

  useEffect(() => {
    let newNumberSeuils = 0;
    lycees.forEach((item) => {
      if (item.seuil > 0) newNumberSeuils++;
    })
    props.onChange(newNumberSeuils);
  }, [props, lycees]);

  return (
    <div>
      <div className="mb-3"><ArrowReturnRight /> Cette section liste les scores d'admission de chaque lycée parisien lors des 2 dernières sessions,
      ainsi que l'évolution par rapport à 2021.
      La source de ces seuils est l'ensemble des fiches-barème reçues du Rectorat et ensuite partagées par les parents.
      Figure également un lien vers la fiche descriptive du lycée produite par la FCPE.
    </div>
      <div className="w-50">
        <Form.Select size="sm" value={sorting} onChange={handleSortChange}>
          <option value="byLycee">trier par lycée</option>
          <option value="bySeuilPrev">trier par seuil 2021</option>
          <option value="bySeuil">trier par seuil 2022</option>
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
              <th className="variation">+/-</th>
            </tr>
          </thead>
          <tbody>
            {lycees.map((lycee, index) => (
              <tr key={lycee.id}>
                <td className="lycee">
                <a target="_blank" rel="noreferrer" href={lycee.url}>{lycee.nom}</a>&nbsp;
                  {lycee.seuil > 1000000 && (
                    <CheckLg color="green" width="20" height="20" />
                  )}
                  {lycee.seuil === 0 && (
                    <ExclamationLg color="red" width="20" height="20" />
                  )}
                </td>
                <td className="seuil text-muted">
                  {lycee.seuil_prev > 0 ? formatInt(lycee.seuil_prev) : "?"}
                </td>
                <td className="seuil text-success">
                  {lycee.seuil > 0 ? formatFloat(lycee.seuil) : "?"}
                </td>
                <td
                  className={determineVariationStyle(
                    lycee.seuil_prev,
                    lycee.seuil
                  )}
                >
                  {lycee.seuil_prev > 0 &&
                    lycee.seuil > 0 &&
                    formatVariation(lycee.seuil - lycee.seuil_prev)}{" "}
                  {lycee.seuil_prev > 0 &&
                    lycee.seuil > 0 &&
                    (lycee.seuil > lycee.seuil_prev ? (
                      <ArrowUpRight />
                    ) : (
                      <ArrowDownRight />
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default ListeSeuils;
