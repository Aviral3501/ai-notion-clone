// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADilWMVsMUnHEbAu_izPEsyLjZC-wGRDo",
  authDomain: "notionx-3601a.firebaseapp.com",
  projectId: "notionx-3601a",
  storageBucket: "notionx-3601a.appspot.com",
  messagingSenderId: "386452266175",
  appId: "1:386452266175:web:1179f37e68576a31fb7a0a"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// only create one instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig):getApp();

// connect with db
const db = getFirestore(app);
// export the db
export {db};
