import {useEffect, useState} from "react";
import GetDbFunctions from "../Database/GetDbFunctions";
import AccountsTable from "../Components/AccountsTable";
import SignUpModal from "../Modals/SignUpModal";
import Button from "react-bootstrap/Button";
import EditUserModal from "../Modals/EditUserModal";
import ConfirmationModal from "../Modals/ConfirmationModal";

function ManagerView(props) {

    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState(undefined);
    const [apartments, setApartments] = useState(undefined);
    const [canShow, setCanShow] = useState(true);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [editUserModalOpen, setEditUserModalOpen] = useState(false);
    const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [removedUser, setRemovedUser] = useState(null);
    const dbFunctions = GetDbFunctions();

    const handleAddUserModalOpen = () => {
        setAddUserModalOpen(!addUserModalOpen);
    }

    const handleEditUserModalOpen = (ID) => {
        if(editUserModalOpen){
            setEditedUser(null);
            setEditUserModalOpen(!editUserModalOpen);
        }
        else {
            dbFunctions.getAccount(ID).then(res => setEditedUser(res))
            setEditUserModalOpen(!editUserModalOpen);
        }
    }

    const handleRemoveUserModalOpen = (ID) =>{
        setRemoveUserModalOpen(true);
        setRemovedUser(ID)
    }
    const handleRemoveUserModalClosed = () =>{
        setRemoveUserModalOpen(false);
        setRemovedUser(null)
    }

    const deleteAccount = () => {
        dbFunctions.deleteAccount(removedUser).then(() =>
            setTimeout(() => window.location.reload(), 500))
    }


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
        dbFunctions.getAllApartments().then(
            apts => {
                setApartments(apts)
            }
        ).catch(error => console.log('Error getting apartments: ', error))
    },[user]);


    if(accounts === undefined && canShow)
        return(<> <div className="d-flex justify-content-center"> <div className="spinner-border" role="status"> </div> </div>  </>);
    else
        return (
        <div>
            <SignUpModal
                modalOpen={addUserModalOpen}
                handleModalOpen={handleAddUserModalOpen}
                showType={true}
            />
            <EditUserModal
                modalOpen={editUserModalOpen}
                handleModalOpen={handleEditUserModalOpen}
                handleRemoveUserModalOpen={handleRemoveUserModalOpen}
                editedUser={editedUser}
            />
            {removeUserModalOpen ? <ConfirmationModal
                showModal={handleRemoveUserModalOpen}
                handleClose={handleRemoveUserModalClosed}
                handleConfirm={deleteAccount}
                type="account"/> : <></>}
            <h3 className="text-center"> Users
                <Button onClick={handleAddUserModalOpen} className="bg-secondary border-0 float-end" > Create User </Button> </h3>
            <AccountsTable accounts={accounts} apartments={apartments} handleEditUserModalOpen={handleEditUserModalOpen} handleRemoveUserModalOpen={handleRemoveUserModalOpen}/>
            <div className="my-5"></div>
        </div>
    );
}

export default ManagerView;