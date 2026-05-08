import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const storedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          if (!storedUser?.token) {
            setLoading(false);
            return;
          }

          const { data } =
            await API.get("/auth/me", {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            });

          const updatedUser = {
            ...data,
            token:
              storedUser.token,
          };

          localStorage.setItem(
            "user",
            JSON.stringify(
              updatedUser
            )
          );

          setUser(updatedUser);
        } catch (error) {
          localStorage.removeItem(
            "user"
          );

          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  const login = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);