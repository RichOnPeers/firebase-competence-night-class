import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: 'XXXXXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXXXXX.firebaseapp.com',
  databaseURL: 'XXXXXXXXXXXXXX.firebaseio.com',
  projectId: 'XXXXXXXXXXXXXX',
  storageBucket: 'gs://XXXXXXXXXXXXXX.appspot.com/'
};

firebase.initializeApp(config);

export default firebase;
