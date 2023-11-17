import '../App.css';
import {Button, Container} from "react-bootstrap";
import {useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import {Navigate} from "react-router-dom";




function LoginView() {

    const [input, setInput] = useState('');
    const [queryResponse, setQueryResponse] = useState('');
    const [user, setUser] = useState(null)
    const dbFunctions = GetDbFunctions();

    const handleSubmit = (input) => {
        dbFunctions.authorizeUser(input)
            .then((res) => {
                res === 'Account not found' ? setQueryResponse(res) : setUser(JSON.parse(res))
                setInput('')
            })
    };

    //if user logged in redirect them to their view
    if (user) {
        if (user.Type === 'Tenant')
            return <Navigate replace to="/TenantHome"/>;
        else if (user.Type === 'Employee')
            return <Navigate replace to="/EmployeeHome"/>;
        else
            return <Navigate replace to="/ManagerHome"/>;
    }
    //else display their login page
    else {
        return (
            <div>
                <Container data-bs-theme="dark">
                    <div>
                        <h1 className="text-center my-lg-5"> Welcome to the Tenant Management Application</h1>
                        <form>
                            <div className="text-center my-lg-5">
                                <h5> Please Sign In </h5>
                                <div>
                                    <input onChange={(event) => setInput(event.target.value)}
                                           className="bg-light text-dark w-50" type="email" placeholder="Enter email"/>
                                    <Button className="bg-dark mx-2"
                                            onClick={() => handleSubmit(input)}> Submit </Button>
                                </div>
                                <div className="text-danger fw-semibold">
                                    {queryResponse !== '' ? '*' + queryResponse : ''}
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}

export default LoginView;