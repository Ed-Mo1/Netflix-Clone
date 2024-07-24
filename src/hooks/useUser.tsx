import { onAuthStateChanged, User } from "firebase/auth";
import  { useEffect, useState } from "react";
import { auth } from "../config/fire-base";

const useUser = (): { user: User | null; loading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return { user, loading };
};

export default useUser;
