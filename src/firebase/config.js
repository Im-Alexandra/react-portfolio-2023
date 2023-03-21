import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxOB-Lkf55oo7nY8mPydUO0NkGXCSQUvU",
  authDomain: "portfolio2019-d7f05.firebaseapp.com",
  databaseURL: "https://portfolio2019-d7f05.firebaseio.com",
  projectId: "portfolio2019-d7f05",
  storageBucket: "portfolio2019-d7f05.appspot.com",
  messagingSenderId: "664054683206",
  appId: "1:664054683206:web:fe6993c2a7af9157",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const storage = getStorage(app);

//timestamp
//const timestamp = getFirestore().timestamp;
const timestamp = serverTimestamp();

export { db, timestamp, storage };
