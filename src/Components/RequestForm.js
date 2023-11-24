import {Button} from "react-bootstrap";
import {useState} from "react";


function RequestForm (props){

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    //Set the image when a file is uploaded
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
        else{
            props.dbFunctions.createRequest(props.aptNum, description, location, imageData)
                .then((res) => {
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
                <input value={location} onChange={(event) => setLocation(event.target.value)}
                           onKeyDown={(event) => {
                               if(event.key === 'Enter'){
                                   event.preventDefault();
                                   handleSubmit();
                               }
                           }}
                           className="bg-light text-dark w-25 mt-2" placeholder="Enter Location"/>
                <input id="tenant_image" className="bg-light text-dark w-25 mt-2 mx-2 small" type="file" accept="image/*" onChange={handleImageChange} />
                <span className={errorMessage === '' ? "text-white" : (errorMessage === 'Request submitted' ? "text-success mx-5" : "text-danger fw-semibold mx-5")}> {errorMessage} </span>
                <Button className="bg-dark border-0 mx-2 float-end" onClick={handleSubmit}> Submit Request </Button>
            </form>
        </div>
)
}

export default RequestForm;