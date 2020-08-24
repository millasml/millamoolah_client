import * as firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAUjBL5JnANZN2EeRB5un8S3rnuwiIK1pY",
  authDomain: "millamoolah.firebaseapp.com",
  databaseURL: "https://millamoolah.firebaseio.com",
  projectId: "millamoolah",
  storageBucket: "millamoolah.appspot.com",
  messagingSenderId: "119001529989",
  appId: "1:119001529989:web:79c45d9967a5ad9867b3ec",
  measurementId: "G-78CGCSG3PX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
