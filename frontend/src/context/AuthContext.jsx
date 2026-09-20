import { createContext, useContext,useRef, useEffect, useState } from "react";
import {
  refreshSession,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const didRestore = useRef(false);

useEffect(() => {
  if (didRestore.current) return;
  didRestore.current = true;

  const restoreSession = async () => {
    try {
      const data = await refreshSession();

      if (data?.success && data?.user) {
        setUser(data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  restoreSession();
}, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}