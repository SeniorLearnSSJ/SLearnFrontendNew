/**
 * This imports React and React Native components, along with nav props, context, custom types and a custom hook.
 */

import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/TypeNavigation";
import { BulletinContext } from "../../context/BulletinContext";
import { IBulletinContext, IMemberBulletin } from "../../types/Interfaces";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontContext } from "../../context/FontSizeContext";
import { StyleSheet } from "react-native";
import {API_Endpoint} from "../../Endpoints";
/**
 * This makes the URL readable and easier to handle
 */

const API_URL = "http://192.168.1.244:5143/api/bulletins/member";

/**
 * This adds the screen to the navigation stack.
 */

type MemberBulletinDetailsScreenProps = NativeStackScreenProps<RootStackParamList,"MemberBulletinDetail">;

/**
 * This functional component takes navigation props and route params, and returns a UI.
 * @param param0 nav props, route params
 * @returns UI
 */
export default function MemberBulletinDetailScreen({navigation,route,}: MemberBulletinDetailsScreenProps) {
  const context = useContext(BulletinContext);
  const { token, role } = useAuth();
  const fontContext = useContext(FontContext);
  const { username } = useAuth();

  if (!context) {
    return <Text> Loading....</Text>;
  }
  const { bulletins, deleteBulletin, loadingMember } = context;
  const itemBulletin :IMemberBulletin = route.params.item;
  console.log("item content:", itemBulletin.content);

  /**
   * This function identifies an item by ID and deletes it by calling the deleteBulletin function from context. DeleteItem removes the data from the backend, while deleteBulletin updates context and therefore the live state of the app.
   * @param idToDelete
   */
  const deleteItem = async (idToDelete: string) => {
    try {
      const response = await fetch(`${API_Endpoint.Member}/${idToDelete}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`, // <-- Add this header
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      deleteBulletin(idToDelete);
      navigation.navigate("MemberBulletinListType");

      console.log(`Item with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    /*     deleteBulletin(idToDelete);
    navigation.navigate("MemberBulletinListType"); */
  };

  if (loadingMember) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  /**
   * This is the UI.
   */
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.headerRow}>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
          Member bulletin details
        </Text>

        {username && (
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              ID: {username}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {itemBulletin.category}
      </Text>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>{itemBulletin.id}</Text>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {" "}
        {itemBulletin.title}
      </Text>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {" "}
        {itemBulletin.content}{" "}
      </Text>

      <View style={styles.bottomButtons}>
        {token && (role === "Member" || role === "Administrator") && (
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => navigation.navigate("EditMemberBulletin", { memberBulletin: itemBulletin })}
          >
            <Text
              style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        )}
        {/* 
        <Button
          title="Edit"
          onPress={() => navigation.navigate("Edit", { item })}
        />
      )}
 */}
        {token && (role === "Member" || role === "Administrator") && (
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={() => {
              deleteItem(itemBulletin.id);
            }}
          >
            <Text
              style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.buttonLeft, { marginTop: 30 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}>
          Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/**
 * This is the styling.
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#FFF5E6",
  },

  input: {
    backgroundColor: "blue",
    borderRadius: 10,
    margin: 20,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  buttonLeft: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },

  buttonRight: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "black",
    borderRadius: 15,
  },
});
