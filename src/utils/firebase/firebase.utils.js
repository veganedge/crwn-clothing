// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// This web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHnP5EjhA_W6uzn6u0A_h6I75yH0P7lV8",
    authDomain: "crwn-clothing-db-f1e83.firebaseapp.com",
    projectId: "crwn-clothing-db-f1e83",
    storageBucket: "crwn-clothing-db-f1e83.appspot.com",
    messagingSenderId: "118325986313",
    appId: "1:118325986313:web:74d4e942a12efd40c564d8"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize GoogleAuth provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exist
    // create and set the document with data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    // if user data exists
    // return userRefDoc
    return userDocRef;
};