/**
 * This imports React/React Native componnets, along with nav props, context and functions.
 */

import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity, ScrollView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOfficialBulletin } from "../../types/Interfaces";
import { RootStackParamList } from "../../types/TypeNavigation";
import { BulletinContext } from "../../context/BulletinContext";
import { useContext } from "react";
import { ListNode, DoublyLinkedList } from "../../types/CustomListType";
import { useAuth } from "../../context/AuthContext";
import { FontContext } from "../../context/FontSizeContext";
import { StyleSheet } from "react-native";

/**
 * This adds the screen to the navigation stack.
 */

type OfficialBulletinsDetailsScreenProps = NativeStackScreenProps<RootStackParamList,"OfficialBulletinDetail">;

/**
 * This makes the API readable.
 */

const API_URL = "http://192.168.1.244:5143/api/bulletins/official";

/**
 * This functional commponent renders the screen UI.
 * @param param0 Nav props, route params
 * @returns UI
 */

export default function OfficialBulletinDetailsScreen({
  navigation,
  route,
}: OfficialBulletinsDetailsScreenProps) {
  const context = useContext(BulletinContext);
  const { token, role } = useAuth();
  const fontContext = useContext(FontContext);

  if (!context) {
    return <Text> Loading....</Text>;
  }
  const {
    officialBulletins,
    officialBulletinList,
    deleteOfficialBulletins,
    loadingOfficial,
  } = context;
  const {item}  = route.params;
  const currentNode = officialBulletinList.getNodeById(item.id);
  const { username } = useAuth();

  /**
   * This deletes the item corresponding to the parameter.
   * @param idToDelete
   */
  const deleteItem = async (idToDelete: string) => {
    try {
      const response = await fetch(`${API_URL}/${idToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- Add this line
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`Item with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    deleteOfficialBulletins(idToDelete);
    navigation.navigate("OfficialBulletinList");
  };

  /**
   * This function takes a node as param and navigates to the item matching the selected id, replacing the current screen with the screen correspoding to the id.  The selected node's data is displayed.
   * @param node
   */

  const handleNavigate = (node: ListNode) => {
    navigation.replace("OfficialBulletinDetail", {
    item: {
    id: node.id,
    title: node.title,
    content: node.content,
    createdAt: node.datetime instanceof Date ? node.datetime : new Date(node.datetime),
    updatedAt: node.updatedAt ? new Date(node.updatedAt) : new Date(node.datetime),
    createdById: node.createdById ?? null,
    createdByUsername: node.createdByUsername ?? null,
    },
  });
  };

  /**
   * This defines the state of the node. CanPrev states indicate that there is a previous node.  CanNext indicates that there is a next node.
   */
  const canPrev = !!currentNode?.prev;
  const canNext = !!currentNode?.next;

  if (loadingOfficial) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  /**
   * This is this UI.  If a node is not selected or there is no next/previous node, the next/prev buttons are greyed out.  Otherwise, nodes are used to navigate back and forth through the linked list.
   */
  return (
    <ScrollView>
    <View>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Official bulletin details
      </Text>

      {username && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              ID: {username}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 
      <Text>{item.datetime.toDateString()}</Text> */}

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {new Date(item.createdAt).toDateString()}
      </Text>

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>{item.id}</Text>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {" "}
        {item.title}
      </Text>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        {" "}
        {item.content}
      </Text>

      <View style={styles.bottomButtons}>
        {token && role === "Administrator" && (
          <TouchableOpacity
            style={[styles.buttonLeft, { marginTop: 30 }]}
            onPress={() => navigation.navigate("EditOfficialBulletin", { officialBulletin:item })}
          >
            <Text
              style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
            >
              Edit
            </Text>
          </TouchableOpacity>

          /* 

        <Button
          title="Edit"
          onPress={() => navigation.navigate("EditOfficial", { item })}
        />
 */
        )}

        {token && role === "Administrator" && (
          <TouchableOpacity
            style={[styles.buttonRight, { marginTop: 30 }]}
            onPress={() => deleteItem(item.id)}
          >
            <Text
              style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
            >
              Delete
            </Text>
          </TouchableOpacity>

          /*         <Button
          title="Delete"
          onPress={() => {
            deleteItem(item.id);
          }}
        />
 */
        )}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[
            styles.buttonLeft,
            !canPrev && styles.buttonDisabled,
            { marginTop: 30 },
          ]}
          onPress={() => currentNode?.prev && handleNavigate(currentNode.prev)}
          disabled={!currentNode || !currentNode.prev}
        >
          <Text
            style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
          >
            Previous
          </Text>
        </TouchableOpacity>

        {/*    <Button
        title="Previous"
        disabled={!currentNode || !currentNode.prev}
        onPress={() => currentNode?.prev && handleNavigate(currentNode.prev)}
      />
 */}

        <TouchableOpacity
          style={[
            styles.buttonRight,
            !canNext && styles.buttonDisabled,
            { marginTop: 30 },
          ]}
          disabled={!currentNode || !currentNode.next}
          onPress={() => currentNode?.next && handleNavigate(currentNode.next)}
        >
          <Text
            style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => navigation.navigate("OfficialBulletinList")}
        >
          <Text
            style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
          >
            Back to summary
          </Text>
        </TouchableOpacity>

        {/*       <Button
        title="Next"
        disabled={!currentNode || !currentNode.next}
        onPress={() => currentNode?.next && handleNavigate(currentNode.next)}
      /> */}
      </View>
    </View>
    </ScrollView>
  );
}

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
  buttonDisabled: {
    backgroundColor: "grey",
  },
});
