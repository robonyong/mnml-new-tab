import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar.events.readonly");

const app = initializeApp(firebaseConfig);

const auth = getAuth();
auth.useDeviceLanguage();

export const signIn = async function () {
  const result = await signInWithPopup(auth, provider);
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) {
    throw Error("No credential received from provider");
  }
  const token = credential.accessToken;
  const user = result.user;

  console.log(user);
  return token;
};
