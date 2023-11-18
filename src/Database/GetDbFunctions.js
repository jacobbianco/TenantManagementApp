import {useEffect, useState} from "react";
import database from "./InitDb"
import {ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';


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

    const getApartment = async (ID) => {
        if(db === null) return null
        const querySnapshot = await db.collection('Apartments').where('RenterID', '==', ID).get();
        let res;

        if (querySnapshot.empty)
            res = 'Account not found'

        querySnapshot.forEach((doc) => {
            res = JSON.stringify(doc.data());
        });

        return res;
    }

    const createAccount = async (email, name, phone) => {
        try {
            db.collection('Accounts').add({
                Email: email,
                ID: Date.now(),
                Name: name,
                PhoneNumber: phone,
                Type: "Tenant"
            })
        }
        catch (error) {
            console.error('Error creating account:', error.message);
        }
    }
    const createRequest = async (aptNum, description, location, imageData) => {
            try {
                let imageLink = '';
                if (imageData !== null) {
                    const storage = getStorage();
                    const storageRef = ref(storage, imageData.name);
                    await uploadBytes(storageRef, imageData);
                    imageLink = await getDownloadURL(storageRef);
                }
                const timestamp = Date.now();
                const dateObject = new Date(timestamp);
                const formattedDate = dateObject.toLocaleDateString();
                const formattedTime = dateObject.toLocaleTimeString();

                db.collection('Requests').add({
                    ApartmentNumber: aptNum,
                    Area: location,
                    Date: formattedDate,
                    Time: formattedTime,
                    Description: description,
                    ID: timestamp, //works fine as a unique identifier(for now)
                    Photo: imageLink,
                    Status: 'Pending'
                });
            }

            catch (error) {
                console.error('Error creating account:', error.message);
            }
    }

    return{
        authorizeUser,
        createAccount,
        createRequest,
        getApartment
    }
}

export default GetDbFunctions;