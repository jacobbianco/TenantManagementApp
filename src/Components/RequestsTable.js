import {Button} from "react-bootstrap";

function RequestsTable (props) {

    if(props.requests === undefined) return (<></>)
    else {
        return (
            <div>
                <h3 className="text-center"> Maintenance Requests </h3>
                <table className="table border table-light">
                    <thead className="bg-dark">
                    <tr>
                        <th scope="col" className="text-center"> Status</th>
                        <th scope="col" className="text-center"> Apartment Number</th>
                        <th scope="col" className="text-center"> Area</th>
                        <th scope="col" className="text-center"> Description</th>
                        <th scope="col" className="text-center"> Date</th>
                        <th scope="col" className="text-center"> Time</th>
                        <th scope="col" className="text-center"> Photo</th>
                    </tr>
                    </thead>
                    <tbody className="bg-light">
                    {props.requests.map(req => (
                        <tr key= {req.ID} className="border-bottom border-top">
                            <td className={req.Status === 'Pending' ? "text-danger fw-semibold text-center align-middle" : "text-success fw-semibold text-center align-middle"}> {req.Status}
                                {props.showCompleteButton && req.Status === 'Pending'? <Button className="bg-success border-0 mx-2 btn-sm" onClick={() => props.changeStatus(req.ID)}> Complete </Button> : <></>}</td>
                            <td className="text-center align-middle">{req.ApartmentNumber}</td>
                            <td className="text-center align-middle">{req.Area}</td>
                            <td className="text-center align-middle">{req.Description}</td>
                            <td className="text-center align-middle">{req.Date}</td>
                            <td className="text-center align-middle">{req.Time}</td>
                            <td className="text-center align-middle"> <img
                                src={req.Photo}
                                alt="Request Photo"
                                style={{ maxWidth: "200px", maxHeight: "100px"}}
                                className = "my-0"
                            /> </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RequestsTable;