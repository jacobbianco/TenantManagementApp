import {Button} from "react-bootstrap";
import {useState} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";


function RequestsForm (props){

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Kitchen');
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    //Set the image when a file is uploaded
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageData(file);
    };

    const handleSubmit = () => {
        description.trim();
        if(description === ''){
            setErrorMessage('* Please enter a description')
        }
        else{
            props.dbFunctions.createRequest(props.aptNum, description, location, imageData)
                .then(() => {
                    setErrorMessage('Request submitted')
                    setDescription(''); setLocation(''); setImageData(null);
                    setTimeout(() => window.location.reload(), 500);
                })
        }
    };

    return (
        <div> 
            <h3 className="text-center">Maintenance Request Form</h3>
            <form onSubmit={handleSubmit}>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}
                          onKeyDown={(event) => {
                              if(event.key === 'Enter'){
                                  event.preventDefault();
                                  handleSubmit();
                              }
                          }}
                          className="bg-light text-dark w-100 mt-3 " placeholder="Enter Description"/>
                <div className="row"> 
                <div className="col-2">
                <DropdownButton title={`Area: ${location}`} variant="dark" onSelect={(location) => setLocation(location)} className="col">
                    <Dropdown.Item eventKey="Kitchen">Kitchen</Dropdown.Item>
                    <Dropdown.Item eventKey="Living Room">Living Room</Dropdown.Item>
                    <Dropdown.Item eventKey="Bedroom">Bedroom</Dropdown.Item>
                    <Dropdown.Item eventKey="Bathroom">Bathroom</Dropdown.Item>
                </DropdownButton>
                </div>
                <div className="col-4"> <input id="tenant_image" className="bg-light text-dark mt-2 mx-2 small" type="file" accept="image/*" onChange={handleImageChange} /> </div>
                <div className="col-4 d-flex align-items-center"> <span className={errorMessage === '' ? "text-white" 
                : (errorMessage === 'Request submitted' ? "text-success" : "text-danger fw-semibold")}> {errorMessage} </span> </div>
                <div className="col-2"><Button className="bg-dark border-0 mx-2 float-end" onClick={handleSubmit}> Submit Request </Button> </div>
                </div>
            </form>
        </div>
)
}

export default RequestsForm;