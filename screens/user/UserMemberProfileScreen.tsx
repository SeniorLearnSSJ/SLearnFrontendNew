/**
 * Imports React and React Native components, along with navigation props, custom types and interfaces, and the logLogin function.
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/TypeNavigation";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { BulletinContext } from "../../context/BulletinContext";
import { FontContext } from "../../context/FontSizeContext";
import { StyleSheet } from "react-native";


/**
 * Adds screen to navigation stack.
 */
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "UserProfile">;

/**
 * Makes URL readable.
 */

const API_URL = "http://192.168.1.244:5143/api/profile";

/**
 * Defines functional component.
 * @param param0 Nav props
 * @returns UI
 */

export default function UserMemberProfileScreen({ navigation }: ProfileScreenProps) {
  const { login } = useAuth();
  const { logout } = useAuth();
  const authContext = useContext(AuthContext);
  const context = useContext(BulletinContext);
  if (!context) return null;
  //const { fontSize } = context;
  const fontContext = useContext(FontContext);

  if (!authContext) {
    return <Text>Loading...</Text>;
  }

  const [bulletins, setBulletins] = useState<
    {
      id: string;
      title: string;
      content: string;
      createdById: string;
      createdByUsername: string;
      createdAt: string;
      updatedAt: string;
      category: string;
    }[]
  >([]);

  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [membershipDate, setMembershipDate] = useState("");
  const [loading, setLoading] = useState(true);

  const { token, setToken } = authContext;
  /**
   * This hook fetches the profile from the backend, and updates the UI fields accordingly.  It runs whenever the token changes.
   */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error(`${response.status}`);

        //const data = await response.json();
        //console.log("Fetched profile data:", responseJson);

        const responseJson = await response.json();
        const userData = responseJson.data;
        setUsername(userData.username);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setRole(userData.role);
        setMembershipDate(userData.membershipDate);
        setBulletins(userData.myBulletins ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);


  /**
   * This function logs out by calling the logout function from authorisation context.
   */
  const handleLogout = () => {
    authContext.logout();
    navigation.reset({ index: 0, routes: [{ name: "Atrium" }] });
  };

  /**
   * This handles form submission with valdiation.
   * @returns no specific value
   */
  const handleSubmit = async () => {
    // Assuming you have form fields like 'username', 'email', etc.
    if (
      !username.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !role.trim() ||
      !membershipDate.trim()
    ) {
      window.alert("all fields necessary");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated item:", data);
      alert("Submit successful!");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
/**
 * This defines the UI.
 */
  return (
    <ScrollView>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Profile Screen
      </Text>

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Username: {username}
      </Text>

      <TextInput
        placeholder="Enter first name"
        value={firstName}
        onChangeText={(newText) => setFirstName(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter last name"
        value={lastName}
        onChangeText={(newText) => setLastName(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Membership date: {membershipDate}
      </Text>

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Role: {role}
      </Text>

      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Your bulletins
      </Text>

      {bulletins.length === 0 ? (
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
          No bulletins yet
        </Text>
      ) : (
        bulletins.map((bulletin) => (
          <View key={bulletin.id}>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {bulletin.title}
            </Text>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {bulletin.category}
            </Text>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {bulletin.content}
            </Text>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              {new Date(bulletin.createdAt).toLocaleDateString()}
            </Text>
          </View>
        ))
      )}


      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.buttonLeft} onPress={handleSubmit}>
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => navigation.navigate("UserSettings")}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRight} onPress={handleLogout}>
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/**
 * Styling
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#FFF5E6",
  },

  list: {},

  input: {
    backgroundColor: "blue",
    color: "white",
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
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },

  buttonRight: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
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
  bulletinButton: {
    backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
  },
  bulletinText: {
    color: "white",
  },
});
