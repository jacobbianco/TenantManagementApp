import LoginView from "./Views/LoginView";
import PageNotFound from "./Views/PageNotFound";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import HomeView from "./Views/HomeView";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/Login" />} />
                <Route path="/Login" element={<LoginView/>} />
                <Route path="/Home" element={<HomeView/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
