/* import storage from 'random-access-rn-file';

const file = storage('login_logs.txt');

export const logLogin = (username: string): void => {
  file.write(0, username, console.error);
};

export const getLoginHistory = (callback: (data: string | Buffer) => void): void => {
  file.read(0, 50, (err: Error | null, data: string | Buffer) => {
    if (err) {
      console.error(err);
    } else {
      callback(data);
    }
  });
};
 */

import { Platform } from "react-native";

/**
 * Conditional requirement for a file, depending on if the current platform is web or mobile.  If mobile, require the file.  If not, file is not required for app start.
 */

const file =
  Platform.OS !== "web"
    ? require("random-access-rn-file")("login_logs.txt")
    : null;

/**
 * Defines a  logLogin function to write username to a file with an offset of zero (start of file), if the file exists.
 * @param username 
 * @returns Null
 */

export const logLogin = (username: string): void => {
  if (!file) return; // no-op on web
  file.write(0, username, console.error);
};

/**
 * Defines a function to read the first 50 bytes from the login file, if it exists.  This data is now availabe to other parts of the app via getLoginHistory.
 * @param callback 
 * @returns Null
 */

export const getLoginHistory = (
  callback: (data: string | Buffer) => void
): void => {
  if (!file) {
    callback(""); // empty fallback on web
    return;
  }
  file.read(0, 50, (err: Error | null, data: string | Buffer) => {
    if (err) console.error(err);
    else callback(data);
  });
};
