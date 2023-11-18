import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function SettingsModal (props) {

return (
    <div>
        <Modal show={props.modalOpen} onHide={props.handleModalOpen} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title> Settings </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <table className="table table-borderless">
                        <thead className="thead-dark">
                        <tr> <th scope="col"> Name </th><th scope="col"> Email</th><th scope="col"> Phone Number </th><th scope="col"> ID Number </th> </tr>
                        </thead>
                        <tbody>
                        <tr> <td>{props.user.Name}</td><td>{props.user.Email}</td><td>{props.user.PhoneNumber}</td><td>{props.user.ID}</td> </tr>
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