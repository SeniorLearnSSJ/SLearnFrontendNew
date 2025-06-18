import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {FontSizeProvider} from "./context/FontSizeContext";
import ScreenNavigator from "./ScreenNavigator";
import {AuthProvider, AuthContext} from "./context/AuthContext";
import {BulletinProvider} from "./context/BulletinContext";
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <FontSizeProvider>
          <AuthContext.Consumer>
            {(auth) => auth?.isLoggedIn?.() ? (
              <BulletinProvider>
                <ScreenNavigator />
              </BulletinProvider>
            ) : (
              <ScreenNavigator />
            )
            }
          </AuthContext.Consumer>
        </FontSizeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

