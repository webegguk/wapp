import firebase from 'firebase'
var config = {
    apiKey: "XXXXXXXXXXXXXX;)",
    authDomain: "wapp.firebaseapp.com",
    databaseURL: "https://wapp.firebaseio.com",
    projectId: "wapp",
    storageBucket: "wapp.appspot.com",
    messagingSenderId: "1234567890"
};
var fire = firebase.initializeApp(config);
export default fire;