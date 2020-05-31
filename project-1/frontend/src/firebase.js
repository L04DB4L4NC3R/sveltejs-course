import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA86k-zB-bZOyef2C79rvTEyT9kjFO0oB4",
    authDomain: "todolistappsvelte.firebaseapp.com",
    databaseURL: "https://todolistappsvelte.firebaseio.com",
    projectId: "todolistappsvelte",
    storageBucket: "todolistappsvelte.appspot.com",
    messagingSenderId: "661644092560",
    appId: "1:661644092560:web:7f5a41fcb06bf37763a415",
    measurementId: "G-HFKVKPGSMB"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  export const db = firebase.firestore()

