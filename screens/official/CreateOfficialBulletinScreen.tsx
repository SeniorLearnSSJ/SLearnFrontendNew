/**
 * These import statements import in-built React and React Native components such as View/Text.  It also imports custom types and interfaces and context providers.
 */

import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/TypeNavigation";
import { IOfficialBulletin } from "../../types/Interfaces";
import { useState } from "react";
import { BulletinContext } from "../../context/BulletinContext";
import { useContext } from "react";
import { FontContext } from "../../context/FontSizeContext";
import { useAuth } from "../../context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../styles";

/**
 * This constant sets the backend API to a more readable format.
 */
const API_URL = "http://192.168.1.244:5143/api/bulletins/official";

/**
 * This code adds the screen to the navigation stack.
 */

type AddOfficialScreenProps = NativeStackScreenProps<RootStackParamList,"CreateOfficialBulletin">;

/**
 * This is a functional component that takes navigation props as a parameter.
 * It provides state management and context to every component within itself.  It returns a UI element.
 * @param param0 Navigation properties
 * @returns A react element rendering the AddOfficial screen UI.
 */

export default function CreateOfficialBulletinScreen({
  navigation,
}: AddOfficialScreenProps) {
  const context = useContext(BulletinContext);

  //  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fontContext = useContext(FontContext);
  const { token, username, userId } = useAuth();


  /* const [officialBulletins, setOfficialBulletins] = useState<
    IOfficialBulletin[]
  >([]);
  const [loading, setLoading] = useState(true); */

  /**
   * This is a function that validates data submitted via a form.  It validates such things as field entries and tokens and navigates away to another screen on form submission.
   */
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }
    const newBulletin: IOfficialBulletin = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdById: userId,
      createdByUsername: username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const headers: any = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newBulletin),
      });

      if (!response.ok) {
        throw new Error(`API error`);
      }
      const data = await response.json();
      if (context) {
        await context.saveOfficialBulletins(newBulletin);
      }
      navigation.navigate("OfficialBulletinList");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This return is the UI element of the add official bulletin screen.  It contains both text input elements and pressable areas.
   */

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.headerRow}>
          <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
            Post official bulletin
          </Text>
        </View>

        <TextInput
          placeholder="Enter title"
          style={[{ fontSize: fontContext?.fontSize || 16 }, styles.input]}
          onChangeText={(newText) => setTitle(newText)}
        />

        <TextInput
          placeholder="Enter content"
          style={[{ fontSize: fontContext?.fontSize || 16 }, styles.input]}
          onChangeText={(newText) => setContent(newText)}
        />

        <TouchableOpacity style={styles.buttonRight} onPress={handleSubmit}>
          <Text style={{ fontSize: fontContext?.fontSize || 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
