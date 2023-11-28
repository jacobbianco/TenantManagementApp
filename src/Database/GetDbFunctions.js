import {useEffect, useState} from "react";
import database from "./InitDb"
import {ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

function GetDbFunctions () {

    const [db, setDb] = useState(null);

    useEffect(() => {
        setDb(database)
    },[db]);

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

    const getRequests = async (aptNum) => {
        if(db === null || aptNum === undefined) return []
        const querySnapshot = await db.collection('Requests').where('ApartmentNumber', '==', aptNum).get();
        let res = [];

        querySnapshot.forEach((doc) => {
            res.push(doc.data());
        });
        res.sort((a, b) => {
            const dateA = new Date(`${a.Date} ${a.Time}`);
            const dateB = new Date(`${b.Date} ${b.Time}`);
            return dateB - dateA;
        });
        res.sort((a, b) => {
            if (a.Status === 'Completed' && b.Status === 'Pending') {
                return 1;
            } else if (a.Status === 'Pending' && b.Status === 'Completed') {
                return -1;
            } else {
                return 0;
            }
        });
        return res;
    }

    const getAllRequests = async () => {
        if(db === null) return []
        const querySnapshot = await db.collection('Requests').get();
        let res = [];
        querySnapshot.forEach((doc) => {
            res.push(doc.data());
        });
        res.sort((a, b) => {
            const dateA = new Date(`${a.Date} ${a.Time}`);
            const dateB = new Date(`${b.Date} ${b.Time}`);
            return dateB - dateA;
        });
        res.sort((a, b) => {
            if (a.Status === 'Completed' && b.Status === 'Pending') {
                return 1;
            } else if (a.Status === 'Pending' && b.Status === 'Completed') {
                return -1;
            } else {
                return 0;
                }
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
                const timestamp = (Date.now());
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
                console.error('Error creating request:', error.message);
            }
    }
    const changeStatus = async (ID) => {
        const querySnapshot = await db.collection('Requests').where('ID', '==', ID).get();

        if (!querySnapshot.empty) {
            const documentSnapshot = querySnapshot.docs[0];
            await documentSnapshot.ref.update({
                Status: "Completed"
            });
            console.log(`Status for document changed`);
        } else {
            console.log(`Document not found`);
        }
    }

    /*
    const deleteRequest = async (ID) => {
        try {
            db.collection('Requests').where('ID', '==', ID).get().then(res => {
                let docId = res.docs[0].id;
                db.collection('Requests').doc(docId).delete();
            })
            console.log('deleted', ID)
        }
        catch (error) {
            console.error('Error deleting request:', error.message);
        }
    }
    */



    return{
        authorizeUser,
        createAccount,
        createRequest,
        changeStatus,
        getApartment,
        getRequests,
        getAllRequests
    }
}

export default GetDbFunctions;