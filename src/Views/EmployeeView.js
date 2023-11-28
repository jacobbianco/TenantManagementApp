import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";
import ConfirmationModal from "../Modals/ConfirmationModal";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import RequestsFilter from "../Components/RequestsFilter";

function EmployeeView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [Id, setId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedArea, setSelectedArea] = useState('All');
    const [selectedDateRange, setSelectedDateRange] = useState('All');
    const [aptNumber, setAptNumber] = useState('');

    const handleAptNumberSearch = (aptNum) => setAptNumber(aptNum);
    const handleStatusSelect = (status) => setSelectedStatus(status);
    const handleAreaSelect = (area) => setSelectedArea(area);
    const handleDateRangeSelect = (dateRange) => setSelectedDateRange(dateRange);
    const handleShowModal = (ID) => {
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
                {showModal ? <ConfirmationModal showModal={handleShowModal} handleClose={handleClose} handleConfirm={changeRequestStatus} type="request"/> : <> </> }
                        <h3 className="text-center"> Maintenance Requests </h3>
                <div className="row">
                    <div className="col-2">
                <Button className="bg-secondary border-0 m-1" onClick={() => setShowFilters(!showFilters)}> { showFilters ? "Hide Filters" : "Show Filters"}  </Button>
                    </div>
                    <div  className="col-10">
                {showFilters ? <RequestsFilter selectedStatus={selectedStatus} handleStatusSelect={handleStatusSelect}
                                selectedArea={selectedArea} handleAreaSelect={handleAreaSelect}
                                selectedDateRange={selectedDateRange} handleDateRangeSelect={handleDateRangeSelect}
                                aptNumber={aptNumber} handleAptNumberSearch={handleAptNumberSearch}/>
                            :   <> </> }
                    </div>
                </div>
                <RequestsTable changeStatus={handleShowModal} showCompleteButton={true} requests={requests}/>
                <div className="my-5"></div>
            </div>
        );
}

export default EmployeeView;
