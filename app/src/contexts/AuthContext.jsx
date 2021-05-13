import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = firebase.auth();
  auth.useDeviceLanguage();

  const [isSignedIn, setSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  function addAuthObserver() {
    const authObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setSignedIn(true);
      } else {
        setUser(null);
        setSignedIn(false);
      }
    });

    return authObserver;
  }

  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function register(name, email, password) {
    await auth.createUserWithEmailAndPassword(email, password);

    await auth.currentUser.updateProfile({
      displayName: name,
    });

    setUser({ ...auth.currentUser });

    return auth.currentUser;
  }

  async function updateProfile(name) {
    await auth.currentUser.updateProfile({
      displayName: name,
    });

    setUser({ ...auth.currentUser });

    return user;
  }

  async function updatePassword(oldPassword, password) {
    const user = auth.currentUser;

    const credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      oldPassword
    );

    await user.reauthenticateWithCredential(credential);

    return auth.currentUser.updatePassword(password);
  }

  async function logout() {
    return auth.signOut();
  }

  React.useEffect(() => {
    const authObserver = addAuthObserver();

    // auth.signOut();

    return () => authObserver();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn,
        addAuthObserver,

        login,
        register,
        updateProfile,
        updatePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
