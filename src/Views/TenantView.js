import {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import GetDbFunctions from "../Database/GetDbFunctions";

function TenantView(props) {

    const [apartment, setApartment] = useState(null)
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const dbFunctions = GetDbFunctions();
    const fileInputRef = useRef(null);

    useEffect(() => {
        dbFunctions.getApartment(props.user.ID).then(
            apt => {
                if(apt === 'Account not found') apt = null
                setApartment(JSON.parse(apt))
            }
        ).catch(error => console.log('Error getting apartment: ', error))
    })

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
           dbFunctions.createRequest(apartment.Number, description, location, imageData)
                .then((res) => {
                    setErrorMessage('Request submitted')
                    setDescription(''); setLocation(''); setImageData(null);
                    fileInputRef.current.value = ''
                })
        }
    };

    if(apartment === null)
        return(<> <h4> You currently aren't renting an apartment. Please contact the property manager. </h4> </>);
    else
        return (
        <div>
            <h4>Maintenance Request Form</h4>
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
                <input id="tenant_image" className="bg-light text-dark w-25 mt-2 mx-2 small" type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef}/>
                <span className={errorMessage === '' ? "text-white" : (errorMessage === 'Request submitted' ? "text-success mx-5" : "text-danger fw-semibold mx-5")}> {errorMessage} </span>
                <Button className="bg-dark border-0 mx-2 float-end"
                        onClick={handleSubmit}> Submit Request </Button>
            </form>
        </div>
    );
}

export default TenantView;