import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";
import ConfirmationModal from "../Components/ConfirmationModal";
import { Dropdown, DropdownButton } from "react-bootstrap";

function EmployeeView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [Id, setId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedArea, setSelectedArea] = useState('All');
    const [selectedDateRange, setSelectedDateRange] = useState('All');
    const [aptNumber, setAptNumber] = useState('');

    const handleStatusSelect = (status) => setSelectedStatus(status);
    const handleAreaSelect = (area) => setSelectedArea(area);
    const handleDateRangeSelect = (dateRange) => setSelectedDateRange(dateRange);
    const handleShow = (ID) => {
        setShowModal(true);
        setId(ID);
    }
    const handleClose = () => {
        setShowModal(false);
        setId(null);
    }
    const dbFunctions = GetDbFunctions();
    const changeRequestStatus = () =>{
        dbFunctions.changeStatus(Id).then().catch(error => console.log('Error deleting request: ', error))
        setRequests(requests.filter((req) => {
            if(req.ID === Id) {
                req.Status = 'Complete'
            }
            return req
        }));
        setId(null);
        setShowModal(false);
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
                {showModal ? <ConfirmationModal showModal={handleShow} handleClose={handleClose} handleConfirm={changeRequestStatus} type="request"/> : <> </> }
                        <h3 className="text-center"> Maintenance Requests </h3>
                <div className="row justify-content-center my-3">
                    <div className="col-2">
                    <input value={aptNumber} onChange={(event) => setAptNumber(event.target.value)}
                           onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault() }}
                           className="bg-light text-dark m-2" name="aptNumber" placeholder="Enter an apt. number"/>
                    </div>
                    <div className="col-2">
                        <DropdownButton title={`Status: ${selectedStatus}`} variant="secondary" onSelect={handleStatusSelect}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-2">
                        <DropdownButton title={`Area: ${selectedArea}`} variant="secondary" onSelect={handleAreaSelect}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Kitchen">Kitchen</Dropdown.Item>
                            <Dropdown.Item eventKey="Living Room">Living Room</Dropdown.Item>
                            <Dropdown.Item eventKey="Bedroom">Bedroom</Dropdown.Item>
                            <Dropdown.Item eventKey="Bathroom">Bathroom</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-2">
                        <DropdownButton title={`Date Range: ${selectedDateRange}`} variant="secondary" onSelect={handleDateRangeSelect}>
                            <Dropdown.Item eventKey="All">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
                            <Dropdown.Item eventKey="Week">Within 1 Week</Dropdown.Item>
                            <Dropdown.Item eventKey="Year">Within 1 Year</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <RequestsTable changeStatus={handleShow} showCompleteButton={true} requests={requests}/>
                <div className="my-5"></div>
            </div>
        );
}

export default EmployeeView;
