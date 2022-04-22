import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLocalStorage } from "../useLocalStorage";
import colleges from "../data/colleges";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './MonCollege.css';

const CollegeSelector = (props) => {

    const [college, setCollege] = useLocalStorage('CollegeSelector/college-' + props.type, []);
    const placeholder = 'Nom du collège de ' + props.type + '...';
    const labelCollege = 'Votre collège de ' + props.type + ':';

    const onCollegeChange = (collegeUpdate) => {
        setCollege(collegeUpdate);
        props.onChange(collegeUpdate[0]);
    }

    return (
        <Form.Group className="mb-3">
            <Row>
                <Form.Label>{labelCollege}</Form.Label>
            </Row>
            <Row>
                <Typeahead
                        id={props.type}
                        labelKey="nom"
                        onChange={onCollegeChange}
                        options={colleges}
                        placeholder={placeholder}
                        selected={college}
                    />
            </Row>
        </Form.Group>
    )
}
export default CollegeSelector;
