import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firbase";

 const userAuthContext = createContext();

export function UserAuthContextProvider( props ) {
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    async function signUp(email, password) {
        const actionCodeSettings = {
            url: 'https://twitter-xlive.vercel.app',
            handleCodeInApp: true,
        };
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
        return userCredential;
    }
    function logOut() {
        return signOut(auth);
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, logOut, googleSignIn }}
        >
            {props.children}
        </userAuthContext.Provider>
    );
}
// export default UserAuthContextProvider
export function useUserAuth() {
    return useContext(userAuthContext);
}