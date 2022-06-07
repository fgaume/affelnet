import { useState, useEffect} from 'react';
import { firestore } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { nomsLyceesMap, seuilsLyceesMap }  from '../data/lycees'
import { CheckLg, ExclamationLg } from 'react-bootstrap-icons';
import { createSeuils } from '../seuildata';
import './ListeSeuils.css';


function useSeuils(sorting = 'byLycee') {
    const [lycees, setLycees] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'seuils'), (snapshot) => {
            const newSeuils = snapshot.docs.map((doc) => ({
                id: doc.id,
                nom: nomsLyceesMap.get(doc.id),
                seuil_prev: seuilsLyceesMap.get(doc.id),
                ...doc.data()
            }));
            switch(sorting) {
                case 'bySeuilPrev' :
                    newSeuils.sort((a, b) => (a.seuil_prev < b.seuil_prev) ? 1 : -1);
                    break;
                case 'bySeuil' :
                    newSeuils.sort((a, b) => (a.seuil < b.seuil) ? 1 : -1);
                    break;
                case 'byVariation' :
                    newSeuils.sort((a, b) => (a.variation < b.variation) ? 1 : -1);
                    break;
                default :
                    newSeuils.sort((a, b) => (a.nom < b.nom) ? -1 : 1);
            }
            setLycees(newSeuils);
        });
        return () => unsubscribe();
    }, [sorting]);
    return lycees;
}

const ListeSeuils = () => {

    const [sorting, setSorting] = useState('byLycee');

    /* const handleClick = () => {
        createSeuils();
    } */
    
    const handleSortChange = (event) => {
        setSorting(event.target.value);
    }

    const lycees = useSeuils(sorting);

  return (
    <Container>
        <Row>
            <Col>
                <Form.Select size="sm" value={sorting} onChange={handleSortChange}>
                    <option value='byLycee'>tri par lycée</option>
                    <option value='bySeuilPrev'>tri par seuil 2021</option>
                    <option value='bySeuil'>tri par seuil 2022</option>
                    <option value='byVariation'>tri par variation</option>
                </Form.Select>
            </Col>
            <Col>&nbsp;</Col>
            <Col>&nbsp;</Col>
        </Row>
        <Row>
            <Col xs lg="2">&nbsp;
            </Col>
        </Row>

    <Table striped bordered hover>
     <thead>
    <tr>
      <th className='lycee'><Button variant='outline-primary'>Lycée</Button></th>
      <th className='seuil'><Button variant='outline-primary'>seuil 2021</Button></th>
      <th className='seuil'><Button variant='outline-primary'>seuil 2022</Button></th>
      <th className='variation'><Button variant='outline-primary'>+/-</Button></th>
    </tr>
  </thead>
  <tbody>
  {lycees.map((lycee, index) => (
      <tr key={lycee.id}>
          <td className='lycee'>{lycee.nom}&nbsp;
                {lycee.seuil > 0 && (
                  <CheckLg color="green" width="20" height="20" />
                )}
                {lycee.seuil === 0 && (
                  <ExclamationLg color="red" width="20" height="20" />
                )}
                </td>
          <td className='seuil'>
          {lycee.seuil_prev > 0 && parseInt(lycee.seuil_prev).toLocaleString()}
          </td>
          <td className='seuil'>
          {lycee.seuil > 0 && parseInt(lycee.seuil).toLocaleString()}
          </td>
          <td className='variation'>
          {lycee.seuil > 0 && lycee.seuil_prev > 0 && parseInt(lycee.seuil - lycee.seuil_prev).toLocaleString()}
          </td>
      </tr>
      ))}
      </tbody>
     </Table>
     </Container>
  );
};

export default ListeSeuils;