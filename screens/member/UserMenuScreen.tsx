import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/TypeNavigation";
import { FontContext } from "../../context/FontSizeContext";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { styles } from "../../styles";

/**
 * Adds the screen to the navigation stack.
 */
type BulletinChoiceScreenProps = NativeStackScreenProps<RootStackParamList, "UserMenu">;

/**
 * This functional component takes navigation props as a parameter and returns the UI.
 * @param param0 Navigation props
 * @returns User interface
 */

export default function UserMenuScreen({
  navigation,
}: BulletinChoiceScreenProps) {
  const fontContext = useContext(FontContext);
  const { username } = useAuth(); // 👈 this gives you access to the user object

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Image
              source={require("../../assets/Back02.png")} // or your image path
              style={styles.logo}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Atrium")}
          >
            <Image
              source={require("../../assets/Logo2.png")} // or your image path
              style={styles.logo}
            />
          </TouchableOpacity>

          {username && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Image
                source={require("../../assets/Profile.png")} // or your image path
                style={styles.logo}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
          Would you like to read:
        </Text>

        <View style={styles.centerer}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("MemberBulletinListType")}
          >
            <Text
              style={{
                fontSize: fontContext?.fontSize || 16,
              }}
            >
              Member Bulletins
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("OfficialBulletinList")}
          >
            <Text
              style={{
                fontSize: fontContext?.fontSize || 16,
              }}
            >
              Official Bulletins
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
