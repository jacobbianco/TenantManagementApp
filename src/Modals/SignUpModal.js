import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import GetDbFunctions from "../Database/GetDbFunctions";
import {Dropdown, DropdownButton} from "react-bootstrap";

function SignUpModal (props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('Tenant');
    const [queryResponse, setQueryResponse] = useState('');
    const dbFunctions = GetDbFunctions();

    const handleSubmit = (email, name, phone, type) => {
        email.trim(); name.trim(); phone.trim();
        if(email === '' || name === '' || phone === '') {
            setQueryResponse('Please fill out all input fields');
            return;
        }
        dbFunctions.authorizeUser(email)
            .then((res) => {
                res === 'Account not found' ? createAccount(email, name, phone, type) : setQueryResponse('Account already exists with this email')
                setEmail(''); setName(''); setPhone(''); setType('Tenant')
            })
    };
    const createAccount = (email, name, phone, type) => {
        setQueryResponse('Account created')
        dbFunctions.createAccount(email, name, phone, type);
    }

    return (
        <div>
            <Modal show={props.modalOpen} onHide={props.handleModalOpen} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center"> {props.showType ? "Create User" : "Sign Up" } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div>
                            <div className="w-100">
                            <label htmlFor="email"> Email: </label>
                            <input value={email} onChange={(event) => setEmail(event.target.value)}
                                   onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault(); }}
                                   className="bg-light text-dark w-75 m-3" name="email" type="email" placeholder="e.g. johndoe@gmail.com"/>
                            </div>
                            <div className="w-100">
                            <label htmlFor="fullname"> Full Name: </label>
                            <input value={name} onChange={(event) => setName(event.target.value)}
                                   onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault(); }}
                                   className="bg-light text-dark w-75 m-3" name="fullname" placeholder="e.g. John Doe"/>
                            </div>
                            <div className="row">
                            <div className='col-8'>
                            <label htmlFor="phonenumber" className="m-3"> Phone Number: </label>
                            <input value={phone} onChange={(event) => setPhone(event.target.value)}
                                   onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault(); }}
                                   className="bg-light text-dark m-3 " name="phonenumber" placeholder="e.g. 111-111-1111"/>
                            </div>
                            {props.showType? <DropdownButton title={`Type: ${type}`} variant="secondary" onSelect={(type) => setType(type)} className="col-2 m-3">
                                <Dropdown.Item eventKey="Tenant">Tenant</Dropdown.Item>
                                <Dropdown.Item eventKey="Employee">Employee</Dropdown.Item>
                                <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                            </DropdownButton> : <></>}
                            </div>
                        </div>
                        <div className={queryResponse === '' ? "text-white" : (queryResponse === 'Account created' ? "text-success" : "text-danger fw-semibold")} >
                            {queryResponse === '' ? 'Placeholder' : (queryResponse === 'Account created' ? queryResponse : '*' + queryResponse)}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleModalOpen}>
                        Close
                    </Button>
                    <Button className="bg-success border-0 mx-2" onClick={() => handleSubmit(email, name, phone, type)}>
                         Submit 
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUpModal;