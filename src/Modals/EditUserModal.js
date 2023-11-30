import { Modal } from "react-bootstrap";
import {Dropdown, DropdownButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";


function EditUserModal(props) {

    const [type, setType] = useState(null)
    const [apartmentNumber, setApartmentNumber] = useState(null)
    const [openApartments, setOpenApartments] = useState(null)
    const [queryResponse, setQueryResponse] = useState('')
    const dbFunctions = GetDbFunctions();

    const handleSubmit = () => {
        dbFunctions.changeAccountInfo(props.editedUser.ID, 'Type', type).then();
        if(apartmentNumber !== null && apartmentNumber !== undefined && apartmentNumber !== '')
            dbFunctions.changeApartmentInfo(apartmentNumber, 'RenterID', props.editedUser.ID).then();
        setQueryResponse('Account updated')
    }

    useEffect(()=>{
        if(props.editedUser) {
            setQueryResponse('')
            setType(props.editedUser.Type)
            props.editedUser.ApartmentNumber ? setApartmentNumber(props.editedUser.ApartmentNumber) : setApartmentNumber('')
        }
        dbFunctions.getAllApartments().then(res =>{
            setOpenApartments(res.filter(apt => apt.RenterID === 'null'))
        })
    },[props.editedUser])

    if(props.editedUser === null || props.editedUser === undefined) return(<></>);
    return (
        <div>
            <Modal show={props.modalOpen} onHide={props.handleModalOpen} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center"> Edit User {openApartments.Number}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <table className="table table-borderless">
                            <thead className="thead-dark">
                            <tr><th scope="col" className="text-center align-middle">ID</th><th scope="col" className="text-center align-middle">Name</th>
                                <th scope="col" className="text-center align-middle">Type</th><th scope="col" className="text-center align-middle">Apartment Number</th></tr>
                            </thead>
                            <tbody>
                            <tr><td className="text-center align-middle">{props.editedUser.ID}</td>
                                <td className="text-center align-middle">{props.editedUser.Name}</td>
                                <td className="text-center align-middle">
                                    <DropdownButton title={`Type: ${type}`} variant="secondary" onSelect={(type) => setType(type)} className="m-3">
                                        <Dropdown.Item eventKey="Tenant">Tenant</Dropdown.Item>
                                        <Dropdown.Item eventKey="Employee">Employee</Dropdown.Item>
                                        <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                                    </DropdownButton></td>
                                <td className="text-center align-middle">
                                    <DropdownButton title={`Apartment Number: ${apartmentNumber}`} variant="secondary"
                                                    onSelect={(apartmentNumber) => setApartmentNumber(apartmentNumber)} className="m-3">
                                        {openApartments.length > 0 ? openApartments.map(apt => <Dropdown.Item key={apt.Number} eventKey={apt.Number}>{apt.Number}</Dropdown.Item>)
                                                                   : <> </>}
                                    </DropdownButton></td></tr>
                            </tbody>
                        </table>
                        <div className={queryResponse === '' ? "text-white" : "text-success" } >
                            {queryResponse === '' ? 'Placeholder' : "*" + queryResponse}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleModalOpen}>
                        Cancel
                    </Button>
                    <Button className="bg-success border-0 mx-2" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUserModal;