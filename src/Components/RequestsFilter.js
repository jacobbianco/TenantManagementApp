import {Dropdown, DropdownButton} from "react-bootstrap";


function RequestsFilter (props){
    return(
    <div className="row justify-content-left my-3">
        <div className="col-3 justify-content-center">
            <input onChange={(event) => props.handleAptNumberSearch(event.target.value)} value={props.aptNumber}
                   onKeyDown={(event) => { if(event.key === 'Enter') event.preventDefault() }}
                   className="bg-light text-dark m-2" placeholder="Enter an apt. number" size="12"/>
        </div>
        <div className="col-3 justify-content-center">
            <DropdownButton title={`Status: ${props.selectedStatus}`} variant="secondary" onSelect={props.handleStatusSelect}>
                <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
            </DropdownButton>
        </div>
        <div className="col-3 justify-content-center">
            <DropdownButton title={`Area: ${props.selectedArea}`} variant="secondary" onSelect={props.handleAreaSelect}>
                <Dropdown.Item eventKey="Kitchen">Kitchen</Dropdown.Item>
                <Dropdown.Item eventKey="Living Room">Living Room</Dropdown.Item>
                <Dropdown.Item eventKey="Bedroom">Bedroom</Dropdown.Item>
                <Dropdown.Item eventKey="Bathroom">Bathroom</Dropdown.Item>
            </DropdownButton>
        </div>
        <div className="col-3 justify-content-center">
            <DropdownButton title={`Date Range: ${props.selectedDateRange}`} variant="secondary" onSelect={props.handleDateRangeSelect}>
                <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
                <Dropdown.Item eventKey="Week">Within 1 Week</Dropdown.Item>
                <Dropdown.Item eventKey="Year">Within 1 Year</Dropdown.Item>
            </DropdownButton>
        </div>
    </div>
    );
}

export default RequestsFilter;