import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const authData = sessionStorage.getItem("auth_data");

    if (authData) {
      const parsedData = JSON.parse(authData);
      setIsAuthenticated(!!parsedData.access_token);
      setUser(parsedData.user); 
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    console.log("AuthProvider carregado com:", { authData });
  }, []);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);

    const authData = sessionStorage.getItem("auth_data");
    const parsedData = authData ? JSON.parse(authData) : {};
    sessionStorage.setItem(
      "auth_data",
      JSON.stringify({ ...parsedData, user: userData })
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    sessionStorage.removeItem("auth_data");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
