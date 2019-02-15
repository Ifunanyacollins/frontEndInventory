import firebase from 'firebase'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "listinghippo",
  storageBucket: "",
  messagingSenderId: ""
};
  firebase.initializeApp(config)

  export const storage = firebase.storage()
