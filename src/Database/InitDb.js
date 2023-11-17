import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyATwWd1VHfdzg3cz-UuAAloqTf4b2SzclI",
    authDomain: "wproject3-bf0c3.firebaseapp.com",
    projectId: "wproject3-bf0c3",
    storageBucket: "wproject3-bf0c3.appspot.com",
    messagingSenderId: "133387533822",
    appId: "1:133387533822:web:7349ac4d92d9626ace94af",
    measurementId: "G-JNQ07H8NJS"
};

const app = firebase.initializeApp(firebaseConfig)
const database = app.firestore();

export default database