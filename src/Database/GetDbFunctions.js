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
    const createRequest = async (description, location, imageData) => {
            try {
                console.log(description, location, imageData)
                if (imageData) {
                    const storage = getStorage();
                    const storageRef = ref(storage, imageData.name);
                    await uploadBytes(storageRef, imageData);
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log(downloadURL)
                }
            }
                //db.collection('Requests').add({
            catch (error) {
                console.error('Error creating account:', error.message);
            }
    }

    return{
        authorizeUser,
        createAccount,
        createRequest
    }
}

export default GetDbFunctions;