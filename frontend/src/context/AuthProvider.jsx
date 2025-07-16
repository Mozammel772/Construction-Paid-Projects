import axios from "axios";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      setUser({
        name,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        imageUrl: photo,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.email) {
          await currentUser.reload();
          const refreshedUser = auth.currentUser;

          setUser({
            name: refreshedUser.displayName || "",
            email: refreshedUser.email,
            uid: refreshedUser.uid,
            imageUrl: refreshedUser.photoURL || "",
          });

          await axios.post(
            `https://construction-paid-projects-6aga.vercel.app/auth/jwt`,
            { email: refreshedUser.email },
            { withCredentials: true }
          );
        } else {
          setUser(null);
          await axios.get(
            `https://construction-paid-projects-6aga.vercel.app/auth/logout`,
            {
              withCredentials: true,
            }
          );
        }
      } catch (error) {
        console.error("Auth state error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
