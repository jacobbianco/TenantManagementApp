import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";

function EmployeeView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const dbFunctions = GetDbFunctions();
    const changeRequestStatus = (ID) =>{
        dbFunctions.changeStatus(ID).then().catch(error => console.log('Error deleting request: ', error))
    }

    //Set the user when the component mounts
    useEffect(() => {
        setUser(props.user)
    },[props.user])

    useEffect(() => {
        dbFunctions.getAllRequests().then(
            reqs => {
                setRequests(reqs)
            }
        ).catch(error => console.log('Error getting requests: ', error))
    },[user])

    if(user === null || requests === undefined)
        return(<> <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div> </>);
    else
        return (
            <div>
                <RequestsTable changeStatus={changeRequestStatus} showCompleteButton={true} requests={requests}/>
                <div className="my-5"></div>
            </div>
        );
}

export default EmployeeView;
