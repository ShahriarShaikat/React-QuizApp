import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

export function UseAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  //const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //Sign Up
  async function SignUp(email, password, userName) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    //Update Profile
    await updateProfile(auth.currentUser, { displayName: userName });
    const user = auth.currentUser;
    setCurrentUser({ ...user });
  }

  //Sign In
  function SignIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log Out
  function SignOut(email, password) {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    SignIn,
    SignOut,
    SignUp,
    currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
