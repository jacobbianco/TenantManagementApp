import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function SettingsModal (props) {

return (
    <div>
        <Modal show={props.modalOpen} onHide={props.handleModalOpen} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center"> Settings </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <table className="table table-borderless">
                        <thead className="thead-dark">
                        <tr> <th scope="col" className="text-center align-middle"> Name </th><th scope="col" className="text-center align-middle"> Email</th>
                            <th scope="col" className="text-center align-middle"> Phone Number </th><th scope="col" className="text-center align-middle"> ID Number </th> </tr>
                        </thead>
                        <tbody>
                        <tr> <td className="text-center align-middle">{props.user.Name}</td><td className="text-center align-middle">{props.user.Email}</td>
                            <td className="text-center align-middle">{props.user.PhoneNumber}</td><td className="text-center align-middle">{props.user.ID}</td> </tr>
                        </tbody>
                    </table>
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

export default SettingsModal;