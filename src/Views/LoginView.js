import '../App.css';
import {Button, Container} from "react-bootstrap";
import {useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import {Navigate} from "react-router-dom";
import SignUpModal from "../Components/SignUpModal";

function LoginView() {

    const [input, setInput] = useState('');
    const [queryResponse, setQueryResponse] = useState('');
    const [user, setUser] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const dbFunctions = GetDbFunctions();

    const handleSubmit = (input) => {
        input.trim();
        if(input === ''){
            setQueryResponse('Please enter an email');
            return;
        }
        dbFunctions.authorizeUser(input)
            .then((res) => {
                res === 'Account not found' ? setQueryResponse(res) : setUser(JSON.parse(res))
                setInput('')
            })
    };

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    //if user logged in redirect them to their view
    if (user) {
        return <Navigate replace to="/Home" state={user}/>;
    }
    //else display their login page
    else {
        return (
            <div>
                <Container data-bs-theme="dark">
                    <div>
                        <h1 className="text-center my-lg-5"> Welcome to the Tenant Management Application</h1>
                        <form>
                            <div className="text-center mt-lg-5 mb-2">
                                <h5> Please Sign In </h5>
                                <div>
                                    <input value={input} onChange={(event) => setInput(event.target.value)}
                                           onKeyDown={(event) => {
                                               if(event.key === 'Enter'){
                                                   event.preventDefault();
                                                   handleSubmit(input);   }}}
                                           className="bg-light text-dark w-50 mt-3 " type="email" placeholder="Enter email"/>
                                    <Button className="bg-dark border-0 mx-2"
                                            onClick={() => handleSubmit(input)}> Submit </Button>
                                </div>
                                <div className={queryResponse === '' ? "text-white" : "text-danger fw-semibold"} >
                                    {queryResponse === '' ? 'Placeholder' : '*' + queryResponse}
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            <p> Don't have an account? Click here to
                                <button onClick={handleModalOpen} className="btn-link text-primary bg-white border-0" > Sign Up </button>
                            </p>
                        </div>
                    </div>
                    <SignUpModal
                        modalOpen={modalOpen}
                        handleModalOpen={handleModalOpen}
                    />
                </Container>
            </div>
        );
    }
}

export default LoginView;