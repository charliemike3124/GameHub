import firebase from 'firebase';
import secret from './firebasesecret.json'
import firestore from 'firebase/firestore';

  var firebaseConfig = secret.config;

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const Database = firebaseApp.firestore();
  //const Auth = firebaseApp.auth();


  export default { Database };