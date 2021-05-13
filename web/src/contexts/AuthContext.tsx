import React, { ReactElement } from "react";
import firebase from "firebase";

interface AuthContextValues {
  user: firebase.User | null;
  loading: boolean;
  login: Function;
  logout: Function;
}

const AuthContext = React.createContext<AuthContextValues>({
  user: null,
  loading: true,
  login: (email: string, password: string) => Promise,
  logout: () => null,
});

function AuthProvider({ children }: { children: ReactElement }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  async function login(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const user = firebase.auth().currentUser;

    await user?.updateProfile({
      displayName: firstName + " " + lastName,
    });
  }

  async function logout() {
    await firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
