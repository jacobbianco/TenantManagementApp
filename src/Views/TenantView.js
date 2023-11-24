import {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";
import RequestForm from "../Components/RequestForm";

function TenantView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const [apartment, setApartment] = useState(null);
    const [canShow , setCanShow] = useState(false);
    const dbFunctions = GetDbFunctions();

    // Set Time out
    useEffect(()=>{
        const timer = setTimeout( () => setCanShow(true) , 1000)
        return () => clearTimeout(timer);
    })

    //Set the user when the component mounts
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
                    setRequests(reqs)
                }
            ).catch(error => console.log('Error getting requests: ', error))
        }
    },[apartment]);


    if(apartment === null)
        return(<> {canShow ? <h4> You currently aren't renting an apartment. Please contact the property manager </h4> :
            <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div>}  </>);
    else
        return (
        <div>
            <RequestForm aptNum={apartment.Number} dbFunctions ={dbFunctions}/>
            <div className="my-5"></div>
            <RequestsTable changeStatus={null} showCompleteButton={false} requests={requests}/>
            <div className="my-5"></div>
        </div>
    );
}

export default TenantView;