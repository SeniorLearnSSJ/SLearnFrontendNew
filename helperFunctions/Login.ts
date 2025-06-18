import axios from "axios";
import {IResponseLogin} from "../types/Interfaces";
// Create Axios instance

/**
 * Creating an instance of axios
 */
export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Defines ApiLogin function.  Sends login request to backend via sign-in endpoint.
 * @param username 
 * @param password 
 * @returns An object with succcess (Boolean), token (string), role (string), message (string)
 */

export async function ApiLogin(username: string, password: string): 
Promise<{ success: boolean; token?: string; role?: string; message?: string }> {
  try {
    const response = await api.post<IResponseLogin>("http://192.168.1.244:5143/api/auth/sign-in", {
      username,
      password,
    });

    const data = response.data;
console.log("Shape of data", data);
    // Check if API returned success true and data with token & role
    if (response.status === 200 && data?.success && data?.data?.accessToken && data?.data?.role) {
      // Set default Authorization header for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;

      return {
        success: true,
        token: data.data.accessToken,
        role: data.data.role,
        message: data.message,
      };
    } else {
      // API responded but with success false or missing token/role
      return {
        success: false,
        message: data?.message || "Unexpected response format",
      };
    }
  } catch (error: any) {
    // Catch network or other errors
    console.error("ApiLogin error:", error?.response?.data || error.message);
    return {
      success: false,
      message:
        error?.response?.data?.message || error.message || "Login request failed",
    };
  }
}
