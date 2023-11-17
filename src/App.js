import LoginView from "./Views/LoginView";
import TenantView from "./Views/TenantView";
import ManagerView from "./Views/ManagerView";
import EmployeeView from "./Views/EmployeeView";
import PageNotFound from "./Views/PageNotFound";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/Login" />} />
                <Route path="/Login" element={<LoginView/>} />
                <Route path="/TenantHome" element={<TenantView/>} />
                <Route path="/ManagerHome" element={<ManagerView/>} />
                <Route path="/EmployeeHome" element={<EmployeeView/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
