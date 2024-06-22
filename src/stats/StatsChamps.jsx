import { Col, Figure, Image, Row } from "react-bootstrap";
import ListeStatsChamp from "./ListeStatsChamp";
import "./ListeStatsChamp.css";
import { ArrowReturnRight } from "react-bootstrap-icons";
import { champsDisciplinaires } from "../data/stats";

const StatsChamps = (props) => {

  return (
    <>
      <div className="mb-3">
        <ArrowReturnRight /> L'interface ci-dessous vous permet de saisir les
        données nécessaires au calcul de la moyenne et écarts-types des champs
        disciplinaires. Ces données sont indispensables pour calculer le score
        Affelnet. Deux couples de données différentes par champ disciplinaire
        suffisent (plus ils sont éloignés, mieux c'est, donc n'hésitez pas à un ajouter un 3e !).
        Ces couples (note brute, note harmonisée) sont indiqués sur ce tableau
        de votre fiche barème :
      </div>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-8 col-xxl-8 mx-auto mb-4">
        <Figure>
          <Image
            src="/images/stats-cds.png"
            className="img-fluid"
            alt="Extrait fiche barème montrant les champs disciplinaires"
          />
          <Figure.Caption className="text-center">
            Fig. 2 : extrait d'une fiche barème listant les notes brutes et
            harmonisées des champs disciplinaires
          </Figure.Caption>
        </Figure>
      </div>
      {/* <Alert variant="danger">Il n'est plus nécessaire de saisir d'autres données ici. Merci infiniment pour vos contributions !</Alert> */}
        
      <Row xs={1} sm={1} md={2} lg={3} xl={3} className="g-4">
        {champsDisciplinaires.map((champ, idx) => {
          return (
            <Col key={idx} className="mt-2">
              <ListeStatsChamp
                key={champ}
                champ={champ}
                contributeur={props.contributeur}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default StatsChamps;
