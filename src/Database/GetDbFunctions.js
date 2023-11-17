import {useEffect, useState} from "react";
import database from "./InitDb"

//put all db functions in here
function GetDbFunctions () {

    const [db, setDb] = useState(null);

    useEffect(() => {
        setDb(database)
    }, [db]);

    const authorizeUser = async (email) => {
        const querySnapshot = await db.collection('Accounts').where('Email', '==', email).get();
        let res;

        if (querySnapshot.empty)
            res = 'Account not found'

        querySnapshot.forEach((doc) => {
            res = JSON.stringify(doc.data());
        });

        return res;
    }

    return{
        authorizeUser
    }
}

export default GetDbFunctions;