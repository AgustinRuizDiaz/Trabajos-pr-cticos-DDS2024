import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  return (
    <UserContext.Provider value={{ user, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
