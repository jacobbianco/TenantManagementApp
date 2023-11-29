import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";

function ManagerView(props) {

    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState(undefined);
    const [canShow, setCanShow] = useState(true);
    const dbFunctions = GetDbFunctions();

    // Set Time out
    useEffect(()=>{
        const timer = setTimeout( () => setCanShow(false) , 1000)
        return () => clearTimeout(timer);
    })

    //Set the user when the component mounts
    useEffect(() => {
        setUser(props.user)
    },[props.user])

    //Set the accounts user list when the user changes
    useEffect(() => {
        dbFunctions.getAllAccounts().then(
                accs => {
                    setAccounts(accs)
                }
            ).catch(error => console.log('Error getting accounts: ', error))
    },[user]);


    if(accounts === null && canShow)
        return(<> <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div>  </>);
    else
        return (
        <div>
            <h1 className="my-5 text-center"> Users </h1>
            <div className="my-5"></div>
            <h1> user list </h1>
        </div>
    );
}

export default ManagerView;