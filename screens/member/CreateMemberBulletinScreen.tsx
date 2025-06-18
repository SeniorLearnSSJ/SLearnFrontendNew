/**
 * Imports React and React Native components, as well as custom types and interfaces.
 */
import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList} from "../../types/TypeNavigation";
import { useState } from "react";
import { BulletinContext } from "../../context/BulletinContext";
import { IBulletinContext, IMemberBulletin } from "../../types/Interfaces";
import { useContext } from "react";
import { FontContext } from "../../context/FontSizeContext";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet } from "react-native";
import { styles } from "../../styles";
import { MemberBulletinCategory } from "../../types/Enums";

/**
 * Adds the screen to navigation stack.
 */
type AddScreenProps = NativeStackScreenProps<RootStackParamList, "CreateMemberBulletin">;

/**
 * Makes the API readable.
 */
const API_URL = "http://192.168.1.244:5143/api/bulletins/member";

/**
 * A functioanl component.  Makes state management and context available to all its child components.
 * @param param0 Takes navigation props.
 * @returns The UI for the screen.
 */
export default function CreateMemberBulletinScreen({ navigation }: AddScreenProps) {
  const context = useContext(BulletinContext);
  const { token, username, userId } = useAuth();

  if (!context) {
    alert("Context not avaialble");
    return null;
  }
  const { refreshBulletins } = context;

  //  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const fontContext = useContext(FontContext);

  /**
   * This function handles form submission, with validation for form fields and token and navigation after validation.
   * @returns No specific return value here
   */

  const handleSubmit = async () => {
    if (!token) {
      alert("You must be logged in to submit.");
      return;
    }

    if (!title.trim() || category == null) {
      alert("Fill all fields");
      return;
    }

      const newBulletin: IMemberBulletin = {
      id: Date.now().toString(),
      title: title.trim(),
      category: Number(category),
      content: content.trim(),
      createdById: userId,
      createdByUsername: username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Submitting bulletin:", newBulletin);
    console.log("Payload JSON:", JSON.stringify(newBulletin));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBulletin),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
        console.log("Item created:", data);

      if (!context) {
        alert("Context not avaialable");
        return;
      }

      const { saveBulletins } = context;

      await saveBulletins(data.data);

      await refreshBulletins();

      navigation.navigate("MemberBulletinListType");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function sets the cateogry on button press in the UI.
   * @param category
   */
  const handleTypeSelect = (category: number) => {
    setCategory(category);
  };

  /**
   * This is the user interface, containing text input fields and pressable areas.
   */
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Image
              source={require("../Back02.png")} // or your image path
              style={styles.logo}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Atrium")}
          >
            <Image
              source={require("../Logo2.png")} // or your image path
              style={styles.logo}
            />
          </TouchableOpacity>

          {username && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Image
                source={require("../Profile.png")} // or your image path
                style={styles.logo}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerRow}>
          <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
            Add Screen
          </Text>

          {username && (
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
              <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
                ID: {username}
              </Text>
            </TouchableOpacity>
          )}
        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
           
              style={[styles.event, category === MemberBulletinCategory.Interest && styles.selectedCategory]}
            onPress={() => handleTypeSelect(MemberBulletinCategory.Interest)}
          >
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {" "}
              Interest{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
           style={[styles.event, category === MemberBulletinCategory.Update && styles.selectedCategory]}
            onPress={() => handleTypeSelect(MemberBulletinCategory.Update)}
          >
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {" "}
              Update{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.event, category === MemberBulletinCategory.Event && styles.selectedCategory]}
            onPress={() => handleTypeSelect(MemberBulletinCategory.Event)}
          >
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {" "}
              Event{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Enter title"
          style={[
            { fontSize: fontContext?.fontSize || 16, color: "black" },
            styles.input,
          ]}
          onChangeText={(newText) => setTitle(newText)}
        />

        <TextInput
          placeholder="Enter content"
          style={[
            { fontSize: fontContext?.fontSize || 16, color: "black" },
            styles.input,
          ]}
          onChangeText={(newText) => setContent(newText)}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonRight}>
          <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
            {" "}
            Submit{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
