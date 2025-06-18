import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { CheckCircleFill, ExclamationCircle } from "react-bootstrap-icons";
import { formatFloat } from "../services/helper";
import {
  computeStats,
  saveStats,
  useStatsChamp,
} from "../services/statistiques";
import "./ListeStatsChamp.css";
import StatsEditor from "./StatsEditor";

const ListeStatsChamp = (props) => {
  const champ = props.champ;
  const notes = useStatsChamp(champ);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (notes.length > 1) {
      // console.log("computeStats called ...")
      const stat = computeStats(notes);
      // console.log("stats", stat)
      setStats(stat);
      saveStats(champ, stat);
    } else {
      setStats(null);
    }
  }, [notes, champ]);

  return (
    <Card className="mb-0 mt-3 bg-primary bg-opacity-10 mt-0">
      <Card.Subtitle className="text-center my-2">
        {champ}
        {notes.length > 1 ? (
          <CheckCircleFill
            color="green"
            width="24"
            height="24"
            className="mb-1 ms-1"
          />
        ) : (
          <ExclamationCircle
            color="red"
            width="24"
            height="24"
            className="mb-1 ms-2"
          />
        )}
      </Card.Subtitle>
      {stats && (
        <Card.Subtitle className="text-center mb-2 mt-0 text-success">
          Moyenne: {formatFloat(stats.moyenne)} &nbsp;&nbsp; | &nbsp;&nbsp;
          Ecart-type: {formatFloat(stats.ecart_type)}
        </Card.Subtitle>
      )}
      {notes.length > 0 && (
        <Table hover responsive="lg" className="mb-0 bg-transparent">
          <thead>
            <tr>
              <th className="seuil">Note brute</th>
              <th className="seuil">Note harmonisée</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td className="seuil text-success">
                  {note.brute > 0 ? formatFloat(note.brute) : "?"}
                </td>
                <td className="seuil text-success">
                  {note.harmonisee > 0 ? formatFloat(note.harmonisee) : "?"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <StatsEditor champ={champ} contributeur={props.contributeur} />
    </Card>
  );
};

export default ListeStatsChamp;
