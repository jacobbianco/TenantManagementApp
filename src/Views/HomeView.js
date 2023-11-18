import {Container} from "react-bootstrap";
import {Navigate, useLocation} from "react-router-dom";
import AppNavbar from "../Components/AppNavbar";
import TenantView from "./TenantView";
import EmployeeView from "./EmployeeView";
import ManagerView from "./ManagerView";

function HomeView() {
    const user = useLocation().state

    if(user === null) return <Navigate replace to="/Login"/>;
    return (
        <div data-bs-theme="dark">
            <AppNavbar user={user}/>
            <Container>
                <h2 className="my-4"> Welcome, {user.Name} </h2>
                {user.Type === "Tenant" ? <TenantView user={user}/> : (user.Type === "Employee" ? <EmployeeView user={user}/> : <ManagerView user={user}/>) }
            </Container>
        </div>
    );
}

export default HomeView;