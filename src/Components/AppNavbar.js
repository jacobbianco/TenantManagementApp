import {Container, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import SettingsModal from "./SettingsModal";


const AppNavbar = (props) => {

    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand> Tenant Management App </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link onClick={handleModalOpen}> Settings </Nav.Link>
                    <Nav.Link href="/Login">Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <SettingsModal
                modalOpen={modalOpen}
                handleModalOpen={handleModalOpen}
                user={props.user}
            />
        </Navbar>
    );
}

export default AppNavbar;