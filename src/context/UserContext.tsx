import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the User Interface
interface User {
  id: string;
  name: string;
  photo: string;
}

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
  };
  

// Create User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create UserProvider Component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load User from localStorage on App Initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout Functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Save User to localStorage on Login

  const saveUser: React.Dispatch<React.SetStateAction<User | null>> = (newUser) => {
    setUser(newUser); // Assuming setUser is defined and updates the state
  };
  

  return (
    <UserContext.Provider value={{ user, setUser: saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to Use UserContext
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
  };
  