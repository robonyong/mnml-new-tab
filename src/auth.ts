import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar.events.readonly");

initializeApp(firebaseConfig);

const auth = getAuth();
auth.useDeviceLanguage();

export const signIn = async function (): Promise<string | undefined> {
  const result = await signInWithPopup(auth, provider);
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) {
    throw Error("No credential received from provider");
  }
  const token = credential.accessToken;
  return token;
};
