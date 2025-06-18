/**
 * This imports React and React Native components, as well as navigation props, context and authorisation hook useAuth.
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
import { RootStackParamList } from "../../types/TypeNavigation";
import { BulletinContext } from "../../context/BulletinContext";
import { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontContext } from "../../context/FontSizeContext";
import { ScrollView } from "react-native";
import { styles } from "../../styles";

/**
 * This adds the screen to the navigation stack.
 */

type EditOfficialScreenProps = NativeStackScreenProps<RootStackParamList,"EditOfficialBulletin">;

/**
 * This makes the URL readable.
 */
const API_BASE = "http://192.168.1.244:5143/api/bulletins/official";

/**
 * This functional component takes navigation props and route parameters. It returns the UI and manages state.
 * @param param0 Navigation props and route params
 * @returns UI
 */

export default function EditOfficialBulletinScreen({navigation,route,}: EditOfficialScreenProps) {
  const context = useContext(BulletinContext);
  const { token } = useAuth();

  if (!context) {
    return <Text> Loading</Text>;
  }

  const { officialBulletin } = route.params;
  const [title, setTitle] = useState(officialBulletin?.title ?? "");
  const [datetime, setDateTime] = useState<Date | null>(
    officialBulletin?.createdAt ? new Date(officialBulletin.createdAt) : null
  );
  const [content, setContent] = useState(officialBulletin.content ?? "");
  const { saveOfficialBulletins, deleteOfficialBulletins } = context;
  const fontContext = useContext(FontContext);
  const { username } = useAuth();

  /**
   * This function handles form submission.
   * @returns It has no return value.
   */
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Fill all fields");
      return;
    }

    const updatedBulletin = {
      id: officialBulletin?.id ?? Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdById: officialBulletin.createdById,
      createdByUsername: officialBulletin.createdByUsername,
      createdAt: officialBulletin.createdAt,
      updatedAt:new Date(),
    };

    try {
      const response = await fetch(`${API_BASE}/${updatedBulletin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBulletin),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated item:", data);

      await saveOfficialBulletins(updatedBulletin);
      navigation.navigate("OfficialBulletinList");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update bulletin");
    }
  };

  /**
   * This function takes the ID as string.  It implements the delete method on the bulletin with the matching ID on the backend.
   * @param id
   */
  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`Item with ID ${id} deleted successfully.`);
      deleteOfficialBulletins(id);
      navigation.navigate("OfficialBulletinList");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  /**
   * This is the user interface.
   */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.centerer}>
        <View style={styles.headerRow}>
          <View style={styles.topHeader}>
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
        </View>
        <View>

          <View>
          <Text
            style={[
              styles.headerText,
              { fontSize: fontContext?.fontSize || 16 },
            ]}
          >
            Official bulletin details
          </Text>
        </View>

        <Text
          style={[styles.headerText, { fontSize: fontContext?.fontSize || 16 }]}
        >
          {new Date(officialBulletin.createdAt).toLocaleDateString()}
        </Text>
</View>
        <TextInput
        multiline = {true}
          style={[styles.skinnyButton, { fontSize: fontContext?.fontSize || 16 }]}
          value={title}
          onChangeText={setTitle}
        ></TextInput>

        <TextInput
        multiline = {true}
          style={[styles.skinnyButton, { fontSize: fontContext?.fontSize || 16 }]}
          value={content}
          onChangeText={setContent}
        ></TextInput>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.buttonLeft} onPress={handleSubmit}>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              Submit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRight}
            onPress={() => deleteItem(officialBulletin.id)}
          >
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
