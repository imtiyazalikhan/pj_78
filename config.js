import firebase from 'firebase';
require ('@firebase/firestore');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCN4Io1MLAhs13sqkaSfRxbvVM6-ZsuzbU",
    authDomain: "barter-system-7c634.firebaseapp.com",
    projectId: "barter-system-7c634",
    storageBucket: "barter-system-7c634.appspot.com",
    messagingSenderId: "704479822887",
    appId: "1:704479822887:web:3ac966066a07b375a43a02"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase . firestore() ;