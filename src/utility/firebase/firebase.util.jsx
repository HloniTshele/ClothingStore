
import {initializeApp} from  'firebase/app';
import {getAuth, 
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnYBVHk3nokeh-UQoE1XLFNU-6OmnAkF0",
  authDomain: "crw-clothing-db-9d109.firebaseapp.com",
  projectId: "crw-clothing-db-9d109",
  storageBucket: "crw-clothing-db-9d109.appspot.com",
  messagingSenderId: "904934879047",
  appId: "1:904934879047:web:0b8173fd3c99fc75706662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup =()=> signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
  if(!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);


  const userSnapshot = await getDoc(userDocRef)
// If user data does not exist
    if(!userSnapshot.exists()){
      const { displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {displayName, email, createdAt,
        ...additionalInformation})
      }catch(error){
        console.log("error creating the user", error.message)
      }
    }
  // If user data exist
// Return userDocRef
return userDocRef;

}

// Creating an authenticated user using Firebase
export const createdAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}
