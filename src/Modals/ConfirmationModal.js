import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmationModal(props){
return (
    <div>
        <Modal show={props.showModal} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center w-100">Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">Are you sure you would like to complete that {props.type}?</Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <Button variant="danger" onClick={props.handleClose}> No </Button>
                <Button variant="success" onClick={props.handleConfirm}> Yes </Button>
            </Modal.Footer>
        </Modal>
    </div>
);

}

export default ConfirmationModal;