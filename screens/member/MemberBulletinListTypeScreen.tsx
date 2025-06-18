/**
 * Imports React and React Native components, custom types, context, navigation props.
 */

import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FontContext } from "../../context/FontSizeContext";
import { StyleSheet } from "react-native";

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput, ScrollView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/TypeNavigation";
import { useContext } from "react";
import { BulletinContext } from "../../context/BulletinContext";
import TabMenu from "../../UIComponents/tabs";
import { IMemberBulletin, IBulletinContext } from "../../types/Interfaces";
import { Trie, TrieNode } from "../../types/Trie";
import { useAuth } from "../../context/AuthContext";
import { MemberBulletinCategory } from "../../types/Enums";

/**
 * This enumerable mapper maps the enums from string to number.
 */

const categoryEnumMap: Record<string, number> = {
  Interest: MemberBulletinCategory.Interest,
  Event: MemberBulletinCategory.Event,
  Update: MemberBulletinCategory.Update,
};

/**
 * This makes the URL easier to handle.
 */

const API_URL = "http://192.168.1.244:5143/api/bulletins/member";

/**
 * This adds the screen to the navigation stack.
 */

type Props = NativeStackScreenProps<RootStackParamList,"MemberBulletinListType">;

/**
 * This defines the functional component for the screen.
 * @param param0 It takes nav props.
 * @returns It returns the UI.
 */

const MemberBulletinListType: React.FC<Props> = ({ navigation }) => {
  const context = useContext(BulletinContext);
  const loadingOfficial = context?.loadingOfficial;
  const fontContext = useContext(FontContext);

  const tabs = ["Interest", "Event", "Update"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const { username } = useAuth();

  if (!context) {
    return <Text> Loading ...</Text>;
  }

  //const { bulletins, loadingMember } = context;

  const [bulletins, setBulletins] = useState<IMemberBulletin[]>([]);

  //const { bulletins, loadingMember } = context;
  const { loadingMember } = context;

  // const [loading, setLoading] = useState(true);

  const [trie, setTrie] = useState<Trie>(new Trie());
  const { token, role } = useAuth();

  console.log("token:", token, "role:", role);

  /**
   * This hook iterates through the list of bulletins and appends each title to the Trie.
   */

  useEffect(() => {
    const newTrie = new Trie();
    bulletins.forEach((bulletin) => newTrie.insert(bulletin.title));
    setTrie(newTrie);
  }, [bulletins]);

  /**
   * This hook sets the suggestion property of the setSuggestion helper to input, whenever input is greater than zero, ie not null.
   */

  useEffect(() => {
    if (input.length > 0) {
      setSuggestion(trie.suggest(input));
    } else {
      setSuggestion([]);
    }
  }, [input]);

  /**
   * This hook is triggerd whenever screen rerenders.  The call back function checks is there is a token. If there is no valid token, it stops the rest of the function to prevent fetching of data.
   */

  useFocusEffect(
    useCallback(() => {
      console.log("Token at fetch time:", token);
      if (!token) {
        //setLoading(false); // stop loading if no token
        return; // skip fetch if token is not available yet
      }

      //setLoading(true);

      /**
       * This function fetches data from the backend and sets bulletins to the values on the data, if such data exists.  It reruns on every change of token.
       */

      const fetchData = async (): Promise<void> => {
        console.log("Token:", token);

        try {
          //const response = await fetch(API_URL);
          const response = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          console.log("Fetched result:", result);

          if (result.data) {
            setBulletins(result.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          //setLoading(false);
        }
      };

      fetchData();
    }, [token])
  );

  /**
   * This sets the selected tab index constant to a number matching an enum in the enum constant.
   * The bulletins are filtered by the category indicated by  the selected tab index.
   * If a tab has been selected and the input from the trie is null (does not exist), the bulletins belonging to the index are displayed.  If input is not empty, bulletins with titles matching the input for the search filter are displayed.  This means that the bulletins are dynamically selected, filtering for category enum and for substring search input for title.
   */

  const selectedTabIndex = categoryEnumMap[selectedTab];
  //MemberBulletinCategory[selectedTab as keyof typeof MemberBulletinCategory];
  const filteredBulletins = bulletins.filter(
    (item) =>
      categoryEnumMap[item.category] === selectedTabIndex &&
      (input.length === 0 ||
        item.title.toLowerCase().includes(input.toLowerCase()))
  );

  /**
   * This function returns a bulletin with a title matching a selection.
   * @param title (selected by user on press)
   * @returns  Matching bulletin
   */

  const findBulletinByTitle = (title: string) =>
    bulletins.find((b) => b.title === title);

  /**
   * This function renders the suggestions returned by the Trie prefix search.  It renders pressable areas that allow navigation to the details of the item.
   * @param param0 It takes a string as a parameter.
   * @returns It returns all items with a title matching the string.
   */

  const renderSuggestions = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setInput(item);
        setSuggestion([]);

        const bulletin = findBulletinByTitle(item);
        if (bulletin) {
          console.log("Navigating with item:", item);
          navigation.navigate("MemberBulletinDetail", { item: bulletin });
        }
      }}
    > 
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>{item}</Text>
    </TouchableOpacity>
  );

  /**
   * This function is similar the one above, but it returns instead the bulletins filtered by the category and substring search.
   * @param param0
   * @returns
   */
  const renderItem = ({ item }: { item: IMemberBulletin }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MemberBulletinDetail", { item })}
    >
      <View>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loadingMember) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  /**
   * This UI has conditioanl rendering.  If a suggestion is entered in the search bar AND there is a prefix match, the UI renders those suggestions.  If no prefix matches are found, the UI renders the bulletins filtered by category and also by substring match.
   */
  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
  
      {username && (
        <View style = {{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
              ID: {username}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TabMenu
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TextInput
        style={{ fontSize: fontContext?.fontSize || 16 }}
        placeholder="Search bulletins"
        value={input}
        onChangeText={setInput}
      />

      {suggestion.length > 0 ? (
        <FlatList
          data={suggestion}
          keyExtractor={(item) => item}
          renderItem={renderSuggestions}
        />
      ) : (
        <FlatList
          data={filteredBulletins}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.buttonLeft, { marginTop: 30 }]}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
          >
            Back
          </Text>
        </TouchableOpacity>

        {token && (role === "Member" || role === "Administrator") && (
          <TouchableOpacity
            style={[styles.buttonRight, { marginTop: 30 }]}
            onPress={() => navigation.navigate("CreateMemberBulletin")}
          >
            <Text
              style={{ fontSize: fontContext?.fontSize || 16, color: "white" }}
            >
              Add
            </Text>
          </TouchableOpacity>

          // <Button title="Add" onPress={() => navigation.navigate("Add")} />
        )}
      </View>
    </View>
    </ScrollView>
  );
};

export default MemberBulletinListType;

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
