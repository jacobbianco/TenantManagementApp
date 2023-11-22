import {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";

function TenantView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const [apartment, setApartment] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const dbFunctions = GetDbFunctions();

    const fileInputRef = useRef(null);
    const [canShow , setCanShow] = useState(false);

    // Set Time out
    useEffect(()=>{
        const timer = setTimeout( () => setCanShow(true) , 1000)
        return () => clearTimeout(timer);
    })

    //Set the user when the component mounts, we only do this to prevent infinite loop of getting apt w/o dependency
    useEffect(() => {
        setUser(props.user)
    },[props.user])

    //Set the user's apartment when the user changes
    useEffect(() => {
        dbFunctions.getApartment(props.user.ID).then(
            apt => {
                if(apt === 'Account not found') apt = null
                setApartment(JSON.parse(apt))
                }
        ).catch(error => console.log('Error getting apartment: ', error))

    },[user]);

    //Set the user's apartment when the user changes
    useEffect(() => {
        if (apartment !== null) {
            dbFunctions.getRequests(apartment.Number).then(
                reqs => {
                    setRequests([reqs])
                }
            ).catch(error => console.log('Error getting requests: ', error))
        }
    },[apartment]);

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
           dbFunctions.createRequest(apartment.Number, description, location, imageData)
                .then((res) => {
                    setErrorMessage('Request submitted')
                    setDescription(''); setLocation(''); setImageData(null);
                    fileInputRef.current.value = ''
                })
        }
    };

    if(apartment === null)
        return(<> {canShow ? <h4> You currently aren't renting an apartment. Please contact the property manager </h4> :
            <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div>}  </>);
    else
        return (
        <div className="my-3">
            <RequestsTable changeStatus={null} showCompleteButton={false} requests={requests}/>
            <h3 className="text-center mt-5">Maintenance Request Form</h3>
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
//work on employee views next
export default TenantView;