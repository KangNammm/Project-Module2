import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCnqyOBGHnk9Hm1CNf4ubeWhIufGyu6Jq8",
  authDomain: "fir-login-with-90b10.firebaseapp.com",
  projectId: "fir-login-with-90b10",
  storageBucket: "fir-login-with-90b10.appspot.com",
  messagingSenderId: "153610227505",
  appId: "1:153610227505:web:7a35aac1635fa36e7fea10"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { storage };