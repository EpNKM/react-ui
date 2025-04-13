import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const [open, setIsOpen] = useState(false);
const openForm = () => setIsOpen(true);

const FormsElements2 = () => {
    const [validated, setValidated] = useState(false);
    const [validatedTooltip, setValidatedTooltip] = useState(false);
    const [supportedCheckbox, setSupportedCheckbox] = useState(false);
    const [supportedRadio, setSupportedRadio] = useState(false);
    const [supportedSelect, setSupportedSelect] = useState(0);
    const [supportedFile, setSupportedFile] = useState(0);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleSubmitTooltip = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidatedTooltip(true);
    };

    const supportedSelectHandler = (event) => {
        setSupportedSelect(parseInt(event.target.value));
    };

    const supportedFileHandler = (event) => {
        setSupportedFile(!!event.target.value);
    };

    return (
<Form.Control as="select" className="mb-3">
                                        <option>Default select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                        );
                                    };
export default FormsElements2;