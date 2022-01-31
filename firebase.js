import firebase from 'firebase'
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANbNAUINEHgLaptjN22CmRL-hUgzFTK_A",
    authDomain: "facebook-clone-a4cbe.firebaseapp.com",
    projectId: "facebook-clone-a4cbe",
    storageBucket: "facebook-clone-a4cbe.appspot.com",
    messagingSenderId: "503496558709",
    appId: "1:503496558709:web:7104aae46106df9ec1d03c",
    measurementId: "G-YVHJ2MEGRF"
};

// checking if the firebase instance is already installed or not
// !firebase.apps.length >> we dont have any firebase.app then we will intialize new instance else we will use our existed one

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// setting up the connection to firestore
const db = app.firestore()

const storage = firebase.storage()

export { db, storage };