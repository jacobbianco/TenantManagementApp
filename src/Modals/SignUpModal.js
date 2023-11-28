import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import GetDbFunctions from "../Database/GetDbFunctions";

function SignUpModal (props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [queryResponse, setQueryResponse] = useState('');
    const dbFunctions = GetDbFunctions();

    const handleSubmit = (email, name, phone) => {
        email.trim(); name.trim(); phone.trim();
        if(email === '' || name === '' || phone === '') {
            setQueryResponse('Please fill out all input fields');
            return;
        }
        dbFunctions.authorizeUser(email)
            .then((res) => {
                res === 'Account not found' ? createAccount(email, name, phone) : setQueryResponse('Account already exists with this email')
                setEmail(''); setName(''); setPhone('')
            })
    };
    const createAccount = (email, name, phone) => {
        setQueryResponse('Account created')
        dbFunctions.createAccount(email, name, phone);
    }

    return (
        <div>
            <Modal show={props.modalOpen} onHide={props.handleModalOpen} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center"> Sign Up </Modal.Title>
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
                            <div className="w-100">
                            <label htmlFor="phonenumber" className=""> Phone Number: </label>
                            <input value={phone} onChange={(event) => setPhone(event.target.value)}
                                   onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault(); }}
                                   className="bg-light text-dark w-50 m-3 " name="phonenumber" placeholder="e.g. 111-111-1111"/>
                            <Button className="bg-success border-0 mx-2"
                                    onClick={() => handleSubmit(email, name, phone)}> Submit </Button>
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
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUpModal;