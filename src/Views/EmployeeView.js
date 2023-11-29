import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import RequestsTable from "../Components/RequestsTable";
import ConfirmationModal from "../Modals/ConfirmationModal";
import {Button} from "react-bootstrap";
import RequestsFilter from "../Components/RequestsFilter";

function EmployeeView(props) {

    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState(undefined);
    const [filteredRequests, setFilteredRequests] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [Id, setId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
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
    const resetFilters = () =>{
        setSelectedStatus(''); setSelectedArea(''); setSelectedDateRange(''); setAptNumber('');
        setFilteredRequests(requests);
    }
    const inRange = (req) =>{
        const requestDateTime = new Date(req.Date + ' ' + req.Time);
        // Check if the date is within the selected range
        if (selectedDateRange === 'Today') {
            const today = new Date();
            return requestDateTime.getFullYear() === today.getFullYear() &&
                   requestDateTime.getMonth() === today.getMonth() &&
                   requestDateTime.getDate() === today.getDate();
        }
        if (selectedDateRange === 'Week') {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return requestDateTime >= oneWeekAgo;
        }

        if (selectedDateRange === 'Year') {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            return requestDateTime >= oneYearAgo;
        }
        return false;
    }

    //Set the user when the component mounts
    useEffect(() => {
        setUser(props.user)
    },[props.user])

    //Get requests when user is logged in
    useEffect(() => {
        dbFunctions.getAllRequests().then(
            reqs => {
                setRequests(reqs);
                setFilteredRequests(reqs);
                setSelectedStatus(''); setSelectedArea(''); setSelectedDateRange(''); setAptNumber('');
            }
        ).catch(error => console.log('Error getting requests: ', error))
    },[user])

    //Filter requests on any filter variable change
    useEffect(()=> {
        //If undefined or no apt number, show all requests
        if(filteredRequests === undefined) {
            setFilteredRequests(requests);
        }
        //Otherwise, filter requests
        else {
            setFilteredRequests(requests.filter(req => {
                if (aptNumber === '' || req.ApartmentNumber === aptNumber)
                    if(selectedStatus === '' || req.Status === selectedStatus)
                        if(selectedArea === '' || req.Area === selectedArea)
                            if(selectedDateRange === '' || inRange(req))
                                return true;
                return false;
                }
            ));
        }
    }, [aptNumber, selectedArea, selectedStatus, selectedDateRange])

    if(user === null || requests === undefined)
        return(<> <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div> </>);
    else
        return (
            <div>
                {showModal ? <ConfirmationModal showModal={handleShowModal} handleClose={handleClose} handleConfirm={changeRequestStatus} type="request"/> : <> </> }
                        <h3 className="text-center"> Maintenance Requests </h3>
                <div className="row">
                    <div className="col-2">
                        <Button className="bg-secondary border-0 m-1" onClick={() => resetFilters()}> Reset Filters </Button>
                    </div>
                    <div className="col-2">
                        <Button className="bg-secondary border-0 m-1" onClick={() => setShowFilters(!showFilters)}> { showFilters ? "Hide Filters" : "Show Filters"}  </Button>
                    </div>
                    <div  className={showFilters? "col-8 " : "my-3"}>
                {showFilters ? <RequestsFilter selectedStatus={selectedStatus} handleStatusSelect={handleStatusSelect}
                                selectedArea={selectedArea} handleAreaSelect={handleAreaSelect}
                                selectedDateRange={selectedDateRange} handleDateRangeSelect={handleDateRangeSelect}
                                aptNumber={aptNumber} handleAptNumberSearch={handleAptNumberSearch}/>
                            :   <> </> }
                    </div>
                </div>
                <RequestsTable changeStatus={handleShowModal} showCompleteButton={true} requests={filteredRequests}/>
                <div className="my-5"></div>
            </div>
        );
}

export default EmployeeView;
