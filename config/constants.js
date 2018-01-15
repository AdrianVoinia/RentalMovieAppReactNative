import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAVpa87IFC18L3oNK9vSgtxv8ZoVXwi4O0",
    authDomain: "rentalapp-3bfff.firebaseapp.com",
    databaseURL: "https://rentalapp-3bfff.firebaseio.com",
    projectId: "rentalapp-3bfff",
    storageBucket: "rentalapp-3bfff.appspot.com",
    messagingSenderId: "1049133672758"
};
  firebase.initializeApp(config);
  
  export default db=firebase.database()
 