import {useState} from "react";
import {Button} from "react-bootstrap";
import GetDbFunctions from "../Database/GetDbFunctions";

function TenantView(props) {

    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [imageData, setImageData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const dbFunctions = GetDbFunctions();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageData(file);
    };

    const handleSubmit = () => {
        description.trim(); location.trim();
        if(description === '' && location === ''){
            setErrorMessage('* Please enter a description and a location')
        }
        else if(description === ''){
            setErrorMessage('* Please enter a description')
        }
        else if(location === ''){
            setErrorMessage('* Please enter a location')
        }
        else{//figure this part out
           dbFunctions.createRequest(description, location, imageData)
                .then((res) => {
                    setErrorMessage('Request submitted')
                    setDescription(''); setLocation(''); setImageData([]);
                })
        }
    };

    return (
        <div>
            <h3>Maintenance Request Form</h3>
            <form onSubmit={handleSubmit}>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}
                    onKeyDown={(event) => {
                        if(event.key === 'Enter'){
                            event.preventDefault();
                            handleSubmit();   }}}
                className="bg-light text-dark w-100 mt-3 " placeholder="Enter Description"/>
                <input value={location} onChange={(event) => setLocation(event.target.value)}
                       onKeyDown={(event) => {
                           if(event.key === 'Enter'){
                               event.preventDefault();
                               handleSubmit();   }}}
                          className="bg-light text-dark w-25 mt-2" placeholder="Enter Location"/>
                <input className="bg-light text-dark w-25 mt-2 mx-2 small" type="file" accept="image/*" onChange={handleImageChange}/>
                <span className={errorMessage === '' ? "text-white" : (errorMessage === 'Request submitted' ? "text-success mx-5" : "text-danger fw-semibold mx-5")}> {errorMessage} </span>
                <Button className="bg-dark border-0 mx-2 float-end"
                        onClick={handleSubmit}> Submit Request </Button>
            </form>
        </div>
    );
}
//URL.createObjectURL(new Blob(imageData, {type: "application/zip"})) can be useful later
export default TenantView;