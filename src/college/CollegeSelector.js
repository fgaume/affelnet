import React, { useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLocalStorage } from "../useLocalStorage";
import colleges from "../data/colleges";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './MonCollege.css';

const CollegeSelector = (props) => {

    const [college, setCollege] = useLocalStorage('CollegeSelector/college-' + props.type, []);
    const placeholder = 'Saisir le collège de ' + props.type + '...';
    const labelCollege = 'Collège de ' + props.type + ' :';
    const inputRef = useRef();

    const onCollegeChange = (collegeUpdate) => {
        setCollege(collegeUpdate);
        props.onChange(collegeUpdate[0]);
    }

    useEffect(() => {
        if (!college || (college.length === 0)) {
            inputRef.current.focus();
        } 
    }, [college]);


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
                        ref={inputRef}
                    />
            </Row>
        </Form.Group>
    )
}
export default CollegeSelector;
