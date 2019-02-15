import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC8-Zb33QVlaPviz2oMm8vOwcgPH-pf2gQ",
  authDomain: "listinghippo.firebaseapp.com",
  databaseURL: "https://listinghippo.firebaseio.com",
  projectId: "listinghippo",
  storageBucket: "listinghippo.appspot.com",
  messagingSenderId: "800244260981"
};
  firebase.initializeApp(config)

  export const storage = firebase.storage()