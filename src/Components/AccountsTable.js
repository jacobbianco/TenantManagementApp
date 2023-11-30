import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

function AccountsTable (props) {

    const [accountList, setAccountList] = useState(undefined);

    useEffect(() => {
        setAccountList(props.accounts.map(acc => {
            let apt = props.apartments.find(apt => apt.RenterID === acc.ID);
            if(apt) acc = {...acc,
                                ApartmentNumber: apt.Number,
                                InDate: apt.InDate,
                                OutDate: apt.OutDate        }
            return acc;
        }));
    }, [props]);

    if(accountList === undefined) return (<></>)
    else {
        return (
            <div>
                <table className="table border table-light">
                    <thead className="bg-dark">
                    <tr>
                        <th scope="col" className="text-center"> ID </th>
                        <th scope="col" className="text-center"> Name</th>
                        <th scope="col" className="text-center"> Phone Number</th>
                        <th scope="col" className="text-center"> Email</th>
                        <th scope="col" className="text-center"> Account Type</th>
                        <th scope="col" className="text-center"> Apartment Number</th>
                        <th scope="col" className="text-center"> Check In Date</th>
                        <th scope="col" className="text-center"> Check Out Date</th>
                        <th scope="col" className="text-center"> </th>
                        <th scope="col" className="text-center"> </th>
                    </tr>
                    </thead>
                    <tbody className="bg-light">
                    {accountList.map(acc => (
                        <tr key= {acc.ID} className="border-bottom border-top">
                            <td className="text-center align-middle">{acc.ID}</td>
                            <td className="text-center align-middle">{acc.Name}</td>
                            <td className="text-center align-middle">{acc.PhoneNumber}</td>
                            <td className="text-center align-middle">{acc.Email}</td>
                            <td className="text-center align-middle">{acc.Type}</td>
                            <td className="text-center align-middle">{acc.ApartmentNumber ? acc.ApartmentNumber : "N/A"} </td>
                            <td className="text-center align-middle">{acc.ApartmentNumber && acc.InDate !== 'null' ? acc.InDate : "N/A"} </td>
                            <td className="text-center align-middle">{acc.ApartmentNumber && acc.OutDate !== 'null' ? acc.OutDate : "N/A"} </td>
                            <td> <Button className="bg-success text-light border-0 m-1 btn-sm" onClick={() => props.handleEditUserModalOpen(acc.ID)}> Edit </Button> </td>
                            <td> <Button className="bg-danger text-light border-0 m-1 btn-sm" onClick={() => props.handleRemoveUserModalOpen(acc.ID)}> Remove </Button> </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AccountsTable;