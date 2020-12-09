import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDcVGLYOZkTPydtJAgn2bNnGOxxQS2hPPU",
    authDomain: "crwn-db-a359a.firebaseapp.com",
    databaseURL: "https://crwn-db-a359a.firebaseio.com",
    projectId: "crwn-db-a359a",
    storageBucket: "crwn-db-a359a.appspot.com",
    messagingSenderId: "505086556164",
    appId: "1:505086556164:web:ab61fa60ad8c1744bedd51",
    measurementId: "G-EZ5NX7W0T1"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;