/* import { useEffect, useState } from "react";
import { Alert, Card, Figure, Form, Image, Table } from "react-bootstrap";
import {
  ArrowReturnRight,
  CheckLg,
  ExclamationCircle,
  ExclamationLg,
} from "react-bootstrap-icons";
import { formatFloat, formatInt, formatVariation } from "../services/helper";
import "./ListeSeuils.css";
import { getSeuil } from "../services/seuils";

// Classe inutilisée

function useSeuils(
  anneeN,
  listeLyceesSeuils,
  lyceesMap,
  sorting = "byLycee"
) {
  const [lycees, setLycees] = useState([]);

  useEffect(() => {
      const newSeuils = listeLyceesSeuils?.map((lycee) => {
        const seuilPrecedent = Math.round(
          getSeuil(anneeN - 1, lycee.code, lyceesMap)
        );
        const seuilPrecedent2 = Math.round(
          getSeuil(anneeN - 2, lycee.code, lyceesMap)
        );
        const seuilRecent = getSeuil(
          anneeN,
          lycee.code,
          lyceesMap
        );
        return {
          id: lycee.code,
          nom: lycee.nom,
          seuilPrecedent2: seuilPrecedent2,
          // lycee.seuils[nbSeuils - 3] > 0
          //   ? Math.round(lycee.seuils[nbSeuils - 3])
          //   : 0,
          seuilPrecedent: seuilPrecedent,
          seuilRecent: seuilRecent,
          delta:
            seuilPrecedent && seuilRecent
              ? Math.round(seuilRecent - seuilPrecedent)
              : null,
          url: (lyceesMap.get(lycee.code))?.url
          //      seuilRecent: lycee.seuils[nbSeuils - 1] > 0 ? lycee.seuils[nbSeuils - 1] : 0,
        };
      });
      switch (sorting) {
        case "bySeuilPrecedent2":
          newSeuils.sort((a, b) =>
            a.seuilPrecedent2 < b.seuilPrecedent2 ? 1 : -1
          );
          break;
        case "bySeuilPrecedent":
          newSeuils.sort((a, b) =>
            a.seuilPrecedent < b.seuilPrecedent ? 1 : -1
          );
          break;
        case "bySeuilRecent":
          newSeuils.sort((a, b) => {
            if (isNaN(a.seuilRecent)) return 1;
            if (isNaN(b.seuilRecent)) return -1;
            return a.seuilRecent < b.seuilRecent ? 1 : -1;
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
          newSeuils?.sort((a, b) => (a.nom < b.nom ? -1 : 1));
      }
      setLycees(newSeuils);
      }
  , [anneeN, listeLyceesSeuils, lyceesMap, sorting]);
  return lycees;
}

const ListeSeuils = (props) => {
  
  const scoreMax = props.scoreMax;
  const anneeN = props.anneeN;
  const lyceesMap = props.lyceesMap;
  const listeLyceesSeuils = props.listeLycees;
  //console.log("listeSeuils avec seuil: ", listeLyceesSeuils);


  const nbSeuils = listeLyceesSeuils?.[0]?.seuils?.length ?? 0;
  const [sorting, setSorting] = useState("byLycee");

  const handleSortChange = (event) => {
    setSorting(event.target.value);
  };

  const lycees = useSeuils(
    anneeN,
    listeLyceesSeuils,
    lyceesMap,
    sorting
  );

  useEffect(() => {
    let newNumberSeuils = 0;
    lycees?.forEach((item) => {
      if (item.seuilRecent > 0) newNumberSeuils++;
    });
    props.onChange(newNumberSeuils);
  }, [props, lycees]);

  return (
    <div>
      <div className="mb-3">
        <ArrowReturnRight /> Cette section liste les scores d'admission{" "}
        <strong>non-boursiers</strong> de chaque lycée parisien lors des 3
        dernières sessions, ainsi que l'évolution par rapport à l'an dernier. La
        source de ces seuils est l'ensemble des fiches-barème reçues du Rectorat
        et ensuite partagées par les parents. Figure également un lien vers la
        fiche descriptive du lycée produite par la FCPE. Les seuils des
        anciennes années sont arrondis.
      </div>
      <div className="mb-3">
        <ArrowReturnRight /> Pour ajouter un nouveau seuil d'admission grâce à
        votre fiche-barème, se rendre à la section "Mes Contributions" tout en
        bas.
      </div>
      <div className="combo">
        <Form.Select size="sm" value={sorting} onChange={handleSortChange}>
          <option value="byLycee">trier par lycée</option>
          <option value="bySeuilRecent">
            trier par seuil {2020 + nbSeuils}
          </option>
          <option value="bySeuilPrecedent">
            trier par seuil {2019 + nbSeuils}
          </option>
          <option value="bySeuilPrecedent2">
            trier par seuil {2018 + nbSeuils}
          </option>
          <option value="byVariation">trier par variation</option>
        </Form.Select>
      </div>

      <Card className="mb-0 mt-3">
        <Table striped borderless hover responsive="lg" className="mb-0">
          <thead>
            <tr>
              <th className="lycee">Lycée</th>
              <th className="variation">+/-</th>
              <th className="seuil">seuil {2020 + nbSeuils}</th>
              <th className="seuil">seuil {2019 + nbSeuils}</th>
              <th className="seuil">seuil {2018 + nbSeuils}</th>
            </tr>
          </thead>
          <tbody>
            {lycees?.map((lycee, index) => (
              <tr key={lycee.id}>
                <td className="lycee">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={lycee.url}
                    aria-label="lien fiche du lycée"
                  >
                    {lycee.nom}
                  </a>
                  &nbsp;
                  {lycee.seuilRecent > 1000000 && (
                    <CheckLg color="green" width="20" height="20" />
                  )}
                  {lycee.seuilRecent === 0 && (
                    <ExclamationLg
                      className="text-danger mb-1"
                      width="20"
                      height="20"
                    />
                  )}
                </td>
                <td className="seuil text-primary">
                  {lycee.delta !== null ? formatVariation(lycee.delta) : "?"}
                </td>
                {lycee.seuilRecent <= scoreMax && (
                  <td className="seuil text-success">
                    {lycee.seuilRecent > 0
                      ? formatFloat(lycee.seuilRecent)
                      : "?"}
                  </td>
                )}
                {lycee.seuilRecent > scoreMax && (
                  <td className="seuil text-danger">
                    {lycee.seuilRecent > 0
                      ? formatFloat(lycee.seuilRecent)
                      : "?"}
                  </td>
                )}
                <td className="seuil text-muted">
                  {lycee.seuilPrecedent > 0
                    ? formatInt(lycee.seuilPrecedent)
                    : "?"}
                </td>
                <td className="seuil text-muted">
                  {lycee.seuilPrecedent > 0
                    ? formatInt(lycee.seuilPrecedent2)
                    : "?"}
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
*/