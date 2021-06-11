import firebase from 'firebase';
import secret from './firebasesecret.json'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = secret.config;

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //const Analytics = firebaseApp.analytics();
  const Database = firebaseApp.firestore();
  //const Auth = firebaseApp.auth();


  export default { Database };