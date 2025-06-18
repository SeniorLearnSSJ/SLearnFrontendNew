import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiLogin } from "../helperFunctions/Login";
import { parseJwt, extractRoleFromJwt } from "../helperFunctions/util";
import { AuthContextType } from "../types/Interfaces";

/**
 * This variable holds the value of the auth data string.
 */
const AUTH_KEY = "auth_data";

/**
 * This module creates a context of type AuthContextType.  It is a React context container allowing for shared data and functions between the app components.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * This provider encapsulates state management, providing token, role and username state management to the context.
 * @param param0 It contains ReactNode childrent to be rendered inside this component by the UI that the component wraps around.  The object param0 has a property named children.
 * @returns It returns a React element that wraps children with the authentication context.Specifically, it produces JSX with children wrapped by the context provider itself, allowing context info to be transferred to the wrapped code.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"Administrator" | "Member" | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  //const [user, setUser] = useState<User | null>(null);

  /**
   * The useEffect hook for getAuthstate runs after component first mounts.
   * The useEffect hook for setAuthState runs after username, token or role changes.
   */
  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    setAuthState(token, role, username);
  }, [username, token, role]);

  /**
   * This functional component retrieves data from async storage and sets the token as well as the role and username to the local data values.
   */
  const getAuthState = async () => {
    try {
      console.log("Fetching stored authentication data...");
      const stored = await AsyncStorage.getItem(AUTH_KEY);

      if (stored) {
        const data = JSON.parse(stored);
        console.log("Retrieved Auth Data:", data);

        setToken(data.token || null);
        setUsername(data.username || null);
        setUserId(data.userId || null);
        if (data.token) {
          const decoded = parseJwt(data.token);
          console.log("Decoded Token on App Load:", decoded);
          const role = extractRoleFromJwt(decoded);
          setRole(role);
        } else {
          console.warn(
            "Token not found in stored auth, skipping role decoded."
          );
          setRole(null);
        }
      } else {
        console.warn("No stored auth data found.");
      }
    } catch (err) {
      console.error("Error retrieving auth state:", err);
      setToken(null);
      setRole(null);
      setUsername(null);
      setUserId(null);
    }
  };

  /**This functional component saves the token, role and username to local storage.
   *
   * @param token
   * @param role
   * @param username
   */
  const setAuthState = async (
    token: string | null,
    role: "Administrator" | "Member" | null,
    username: string | null
  ) => {
    try {
      const data = JSON.stringify({ token, role, username });
      console.log("Saving authentication data:", data);

      await AsyncStorage.setItem(AUTH_KEY, data);
      console.log("Authentication data saved successfully.");
    } catch (error) {
      console.error("Failed to save auth state:", error);
    }
  };

  /**This function verifies the username and password against the backend response.
   * If successful, it stores the JWT token, decodes it to extract user role and udpates authentication state (token, role, username)
   * @param username
   * @param password
   * @returns Boolean indicating true if successful, false if unsuccessful login.
   */
  const login = async (username: string, password: string) => {
    console.log(`Attempting login with username: ${username}`);

    try {
      const response = await ApiLogin(username, password);
      console.log("API Login Response:", response);

      console.log("Full API Response:", response);
      console.log("Raw Token:", response?.token);
      console.log(response);
      if (response.success && response.token) {
        const accessToken = response.token;
        setToken(accessToken);

        const decoded = parseJwt(accessToken);
        console.log("Full Decoded JWT Payload:", decoded);

        const role = extractRoleFromJwt(decoded);
        console.log("Extracted role from token:", role);

        if (role === "Administrator" || role === "Member") {
          setRole(role);
        } else {
          setRole(null);
        }
        setUsername(username);

        return true;
      } else {
        console.warn("Login failed:", response.message || "Missing token");
        return false;
      }
    } catch (error: any) {
      console.error("Login error:", error?.message || error);
      return false;
    }
  };

  /**
   * This function wipes the authentication state on logout.
   */
  const isLoggedIn = () => !!username && !!token;

  const logout = () => {
    console.log("Logging out user...");
    setUsername(null), setToken(null);
    setRole(null);

    AsyncStorage.removeItem(AUTH_KEY)
      .then(() => console.log("Auth state cleared successfully."))
      .catch((err) => console.error("Failed to clear auth state:", err));
  };

  /**
   * This gives whatever is wrapped in the auth context provider access to the values passed in here.
   */
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        isLoggedIn,
        role,
        setRole,
        username,
        setUsername,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * This function allows the creation of context from the auth context parent component.
 * @returns It retruns a context object, or nothing/error message if the component calling it is not wrapped in the provider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
