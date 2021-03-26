import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDgMQ9w56S1WZsmGn-0naU6Tse3jyTeBZk",
    authDomain: "barter-system-ad00d.firebaseapp.com",
    projectId: "barter-system-ad00d",
    storageBucket: "barter-system-ad00d.appspot.com",
    messagingSenderId: "899916214733",
    appId: "1:899916214733:web:74436d28c3039aba53d484"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();